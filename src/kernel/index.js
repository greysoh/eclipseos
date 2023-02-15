qb.enableRegularRequire();

const elemCreate = document.createElement;

require("./FrameSecurity/createElementInject.js");
require("./FrameSecurity/createElementSecurity.js");
require("./FrameSecurity/elementSentry.js");

document.getElementById("framebuffer_v2").createElement = createElementSec;
document.createElement = createElementSec;

let localStorage = self.localStorage;

if (typeof BL_CMDLINE !== 'undefined') {
  localStorage = {
    getItem: function(key) {
      return self.localStorage.getItem(prefix + key);
    },
    setItem: function(key, value) {
      self.localStorage.setItem(prefix + key, value);
    },
    removeItem: function(key) {
      self.localStorage.removeItem(prefix + key);
    }
  }
}

function isBootloader() {
  return typeof BL_CMDLINE !== "undefined";
}

const extensions = [];

const processTree = [];
let processCount = 0;

require("./ErrorHandler/panic.js");

self.Kernel = {
  kernelLevel: {
    panic: panic,
    assert: assert,
  },
  extensions: {
    load: function (name, data, isGenFunction) {
      require("./Kernel/extensions/load.js");
    },
    get: function (name, ...params) {
      require("./Kernel/extensions/get.js");
    },
  },
  process: {
    create(funcStr) {
      const AsyncFunction = Object.getPrototypeOf(
        async function () {}
      ).constructor;

      return AsyncFunction("argv", "Kernel", "pid", "localStorage", funcStr);
    },
    async spawn(name, func, argv, kernel) {
      require("./Kernel/process/spawn.js");
    },
    getTree: () => processTree,
    getPID: () => processCount,
  },
  display: {
    getFramebuffer(futureMode) {
      if (futureMode) {
        require("./Kernel/display/getFramebuffer.js");

        return true;
      }

      console.warn(" !! WARNING !! - Framebuffer has been loaded in legacy mode!");
      require("./Kernel/display/getLegacyFramebuffer.js");
    },
  },
};

const klog = [
  {
    msg: "Kernel loaded.",
    time: Date.now()
  }
];

const klogfb = document.createElement("div");
klogfb.style.fontFamily = "monospace";
klogfb.style.fontSize = "14px";

const testfb = self.Kernel.display.getFramebuffer(true);
testfb.appendChild(klogfb);

self.Kernel.extensions.load("kprint", {
  log(str) {
    if (typeof str != "string" && typeof str != "number") panic("Unknown argument specified in kprint call", "Kernel::extension::kprint", new Error("kperr"));

    const loggedData = {
      msg: str,
      time: Date.now()
    };

    klog.push(loggedData);

    console.log("[%s] %s", ((loggedData.time-klog[0].time)/1000).toFixed(3), loggedData.msg);
  },

  getLog: () => JSON.parse(JSON.stringify(klog)) // Since all objects are pointers, we don't want people polluting the kernel log directly.
})

const kprint = Kernel.extensions.get("kprint");

if (localStorage.getItem("panic.log")) {
  kprint.log(`Recovering from panic!\n\n${localStorage.getItem("panic.log")}`);
}

kprint.log("Loading Sentry...");
sentry();