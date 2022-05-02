kernel.fb.wmMode();
let fb = kernel.fb.getWMObject();

let windows = [];
let windowsTrackOf = [];

windowServer = {
  async newWindow(name, callback) {
    let windowUUID = "";

    // Crypto is not in some browsers (and only for https), so we try catch it
    try {
      windowUUID = crypto.randomUUID();

      for (i in windows) {
        if (windows[i].uuid == windowUUID) {
          windowUUID = crypto.randomUUID();
        }
      }
    } catch (e) {
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }

      windowUUID = getRandomInt(10000000, 99999999) + "-" + getRandomInt(1000, 9999) + "-" + getRandomInt(1000, 9999) + "-" + getRandomInt(1000, 9999) + "-" + getRandomInt(100000000000, 999999999999);

      for (i in windows) {
        if (windows[i].uuid == windowUUID) {
          windowUUID = windowUUID = getRandomInt(10000000, 99999999) + "-" + getRandomInt(1000, 9999) + "-" + getRandomInt(1000, 9999) + "-" + getRandomInt(1000, 9999) + "-" + getRandomInt(100000000000, 999999999999);
        }
      }
    }

    let windowElement = document.createElement("div");

    windowElement.className = "window";
    windowElement.id = windowUUID;

    windowElement.style.backgroundColor = "#1c1e1f";
    windowElement.style.border = "1px solid #303d3d";
    windowElement.style.position = "absolute";

    windowElement.style.top = "1px";
    windowElement.style.left = "1px";
    windowElement.style.width = "640px";
    windowElement.style.height = "360px";

    windowElement.style.color = "#ffffff";
    windowElement.style.fontFamily = "monospace";
    
    windowElement.style.overflow = "hidden";
    
    fb.appendChild(windowElement);

    windows.push({
      isActive: false,
      windowTitle: name,
      uuid: windowUUID
    });

    windowsTrackOf.push(name);
    await kernel.pexec(name, callback, windowUUID);

    delete windowsTrackOf[windowsTrackOf.indexOf(name)];
    document.getElementById(windowUUID).remove();
    return;
  },
  setDesktopWallpaper(hex) {
    fb.style.backgroundColor = hex;
  },
  getWinID(name) {
    if (windowsTrackOf.indexOf(name) == -1) {
      return null;
    }

    return windowsTrackOf.indexOf(name);
  },
  getWinDetails(name) {
    if (windowsTrackOf.indexOf(name) == -1) {
      throw "Window does not exist";
    }

    return windows[windowsTrackOf.indexOf(name)];
  },
  setWindowTitle(name, title) {
    if (windowsTrackOf.indexOf(name) == -1) {
      throw "Window does not exist";
    }

    windows[windowsTrackOf.indexOf(name)].windowTitle = title;
  },
};

while (true) {
  await sleep(1000);
}
