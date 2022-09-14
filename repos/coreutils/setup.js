const args = argv;
const input = args.shift();

const users = Kernel.extensions.get("users");
const VFS = Kernel.extensions.get("Vfs");

function ok() {
  input.stdout(" [OK]\n");
}

async function exec(path, args) {
  const file = VFS.read(path);
  await Kernel.process.spawn(path, file.replace("UWU;;\n\n"), [input, ...args]);
}

input.stdout("Welcome to EclipseOS! Please wait while I get things ready for you...\n");
input.stdout(" - Creating basic user accounts");

await users.addUser("nobody", ["nobody"], 1, "browhatrudoinglmao");

ok();

input.stdout(" - Initializing package manager\n\n");

await exec("/bin/pkg", ["init"]);

input.stdout("\n");
input.stdout("Welcome to EclipseOS! What do you want your username and password to be?\n\nUsername: ");
const username = await input.stdin();

input.stdout("Password: ");
const password = await input.stdin();

input.stdout("\nPlease wait, adding profile...\n");
await users.addUser(username, [username], 1, password);

input.stdout("Would you like to enable a desktop environment to start on startup?\n> ");
const opt = await input.stdin();

input.stdout("Loading your desktop...\n");

if (opt.toLowerCase().startsWith("y")) {
  await exec("/bin/pkg", ["install", "tinyws"]);
  await exec("/bin/pkg", ["install", "dusk"]);
  await exec("/bin/pkg", ["install", "dawn"]);

  VFS.write("/etc/init.d/init.conf", "/bin/dawn\n/bin/tinyws");
  VFS.write("/etc/init.d/initcmd.txt", "/bin/ttysh");
  VFS.write("/etc/ttysh.conf", "shell=/bin/dusk");

  await exec("/bin/dusk", []);
} else {
  VFS.write("/etc/ttysh.conf", "shell=/bin/login");

  await exec("/bin/login", []);
}