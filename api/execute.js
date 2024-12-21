const path = require("path");
const fs = require("fs");
const shell = require("shelljs");
const execa = require("execa"); // Async command execution
let currentDir = process.cwd(); // Persistent directory

export default async function handler(req, res) {
    if (req.method === "POST") {
        const command = req.body.command;

        // Allowed commands for security
        const allowedCommands = [
            "ls", "mkdir", "rm", "curl", "npm", "git", "echo", "clear", "cd",
            "cat", "pwd", "touch", "cp", "mv", "chmod", "chown", "ln", "df", "du",
            "ps", "top", "kill", "ip", "hostname", "tar", "gzip", "gunzip", "zip",
            "unzip", "find", "grep", "awk", "sed", "man", "whoami", "uptime", "date",
            "mount", "umount", "service", "systemctl", "journalctl", "dmesg", "alias",
            "history", "bash", "sh", "scp", "rsync", "wget", "nc", "ssh", "iptables",
            "ufw", "ip link", "ip addr", "nmcli", "hostnamectl", "lscpu", "free",
            "vmstat", "mpstat", "iostat", "sar", "lsof", "strace", "tcpdump", "netstat",
            "ss", "dig", "nslookup", "traceroute", "ping", "mtr", "bzip2", "bunzip2",
            "xz", "unxz", "screen", "tmux", "htop", "nmap", "docker", "docker-compose",
            "vagrant", "kubectl", "ansible", "terraform", "python3", "python", "pip3",
            "pip", "java", "javac", "node", "perl", "ruby", "make", "g++", "gcc", "clang",
            "valgrind", "gdb", "svn", "hg", "lvm", "cryptsetup", "fuser", "dstat", "watch",
            "cal", "last", "w", "who", "finger", "id", "groups", "passwd", "usermod",
            "groupmod", "useradd", "groupadd", "userdel", "groupdel", "brew", "pacman",
            "zypper", "dnf", "yum", "snap", "flatpak", "port", "gem", "cargo", "composer",
            "pipenv", "conda", "nix", "opkg", "apk", "guix", "yay", "aurman", "rvm", "asdf",
            "pyenv", "nvm", "rbenv", "jenv", "sdkman", "fnm", "npm", "yarn", "pnpm", "bower",
            "jspm", "git lfs", "maven", "gradle", "lein", "cmake", "autoconf", "automake",
            "bld", "buildout", "shippable",
        ];

        // Security: Check if the command is in the allowed list
        if (!allowedCommands.some(cmd => command.startsWith(cmd))) {
            return res.status(403).send("Command not allowed");
        }

        // Handle the `cd` command separately
        if (command.startsWith("cd")) {
            const dir = command.split(" ")[1];

            if (!dir) {
                return res.status(400).send("No directory specified");
            }

            try {
                // Sanitize directory path to avoid directory traversal
                const resolvedDir = path.resolve(currentDir, dir);
                if (!resolvedDir.startsWith(currentDir)) {
                    return res.status(403).send("Directory traversal is not allowed");
                }

                // Check if the directory exists
                if (!fs.existsSync(resolvedDir) || !fs.lstatSync(resolvedDir).isDirectory()) {
                    return res.status(404).send("Directory not found");
                }

                // Update the current working directory
                currentDir = resolvedDir;
                process.chdir(currentDir); // Change the process's working directory
                return res.send(`Changed directory to ${currentDir}`);
            } catch (err) {
                return res.status(500).send(`Error: ${err.message}`);
            }
        }

        // Execute commands using shelljs for common commands like ls, pwd
        if (command.startsWith("ls") || command.startsWith("pwd")) {
            const result = shell.exec(command, { silent: true, cwd: currentDir });
            if (result.code !== 0) {
                return res.status(500).send(`Error: ${result.stderr}`);
            }
            return res.send(result.stdout.trim());
        }

        // Use execa for async commands that require more control or return structured output
        try {
            const { stdout, stderr } = await execa.command(command, { cwd: currentDir });

            if (stderr) {
                return res.status(500).send(`Stderr: ${stderr}`);
            }

            // Send the result back as response
            res.send(stdout.trim());
        } catch (error) {
            return res.status(500).send(`Error: ${error.message}`);
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
            }
                
