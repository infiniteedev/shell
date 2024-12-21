const { exec } = require('child_process');
const path = require('path');

export default function handler(req, res) {
    if (req.method === 'POST') {
        const command = req.body.command;

        const allowedCommands = [
    'ls',            // List directory contents
    'mkdir',         // Create a new directory
    'rm',            // Remove files or directories
    'apt',           // Package manager for Debian-based systems
    'sudo',          // Execute a command as another user (typically root)
    'curl',          // Transfer data from or to a server
    'npm',           // Node.js package manager
    'git',           // Version control
    'echo',          // Display a line of text
    'clear',         // Clear the terminal screen
    'cd',            // Change the current directory
    'cat',           // Concatenate and display file content
    'pwd',           // Print working directory
    'touch',         // Create an empty file
    'cp',            // Copy files or directories
    'mv',            // Move or rename files or directories
    'chmod',         // Change file permissions
    'chown',         // Change file owner and group
    'ln',            // Create hard and symbolic links
    'df',            // Display disk space usage
    'du',            // Estimate file space usage
    'ps',            // Report a snapshot of current processes
    'top',           // Display real-time system processes
    'kill',          // Terminate processes
    'ifconfig',      // Configure network interfaces (deprecated, use 'ip' instead)
    'ip',            // Show/manipulate networking devices, routing, and tunnels
    'hostname',      // Show or set the system's hostname
    'tar',           // Archive files
    'gzip',          // Compress files
    'gunzip',        // Decompress files
    'zip',           // Package and compress files
    'unzip',         // Extract compressed files
    'find',          // Search for files in a directory hierarchy
    'grep',          // Search text using patterns
    'awk',           // Pattern scanning and processing language
    'sed',           // Stream editor for filtering and transforming text
    'man',           // Display manual pages for commands
    'whoami',        // Display current logged-in user
    'uptime',        // Show system uptime
    'date',          // Display or set the system date and time
    'shutdown',      // Shut down the system
    'reboot',        // Reboot the system
    'mount',         // Mount filesystems
    'umount',        // Unmount filesystems
    'service',       // Manage system services
    'systemctl',     // Control the systemd system and service manager
    'journalctl',    // Query and view logs in systemd-based systems
    'dmesg',         // Print kernel ring buffer messages
    'ln',            // Create symbolic links
    'alias',         // Create command aliases
    'history',       // Show command history
    'bash',          // Start a new Bash shell
    'sh',            // Start a new shell
    'exit',           // Exit the shell
    'scp',            // Secure copy (remote file copy)
    'rsync',          // Remote file and directory synchronization
    'wget',           // Download files from the web
    'nc',             // Netcat, used for network diagnostics and communication
    'ssh',            // Secure shell for remote login
    'iptables',       // Configure IP packet filter rules
    'ufw',            // Uncomplicated firewall configuration tool
    'firewalld',      // Firewall management tool
    'route',          // Show/manipulate the IP routing table
    'ip link',        // Show or manipulate network interfaces
    'ip addr',        // Show or manipulate IP addresses
    'nmcli',          // NetworkManager command-line interface
    'hostnamectl',    // Control the system hostname
    'systemd-analyze',// Analyze system boot-up performance
    'lscpu',          // Display CPU architecture information
    'free',           // Display memory usage
    'vmstat',         // Report virtual memory statistics
    'mpstat',         // Report CPU statistics
    'iostat',         // Report CPU and I/O statistics
    'sar',            // Collect, report, or save system activity information
    'lsof',           // List open files
    'strace',         // Trace system calls and signals
    'tcpdump',        // Network packet analyzer
    'netstat',        // Network statistics
    'ss',             // Socket statistics
    'dig',            // DNS lookup
    'nslookup',       // Query Internet name servers interactively
    'traceroute',     // Trace the route packets take to a network host
    'ping',           // Send ICMP ECHO_REQUEST to network hosts
    'mtr',            // Network diagnostic tool
    'bzip2',          // Compress files
    'bunzip2',        // Decompress files
    'xz',             // Compress files
    'unxz',           // Decompress files
    'screen',         // Terminal multiplexing
    'tmux',           // Terminal multiplexer
    'htop',           // Interactive process viewer (enhanced top)
    'nmap',           // Network exploration tool
    'docker',         // Docker container management
    'docker-compose', // Docker container orchestration
    'vagrant',        // Manage virtual machines
    'kubectl',        // Kubernetes command-line tool
    'ansible',        // Automation tool for IT tasks
    'terraform',      // Infrastructure as code tool
    'python3',        // Python 3 interpreter
    'python',         // Python interpreter (usually Python 2.x)
    'pip3',           // Python 3 package installer
    'pip',            // Python package installer (usually Python 2.x)
    'java',           // Java runtime environment
    'javac',          // Java compiler
    'node',           // Node.js JavaScript runtime
    'npm',            // Node.js package manager
    'perl',           // Perl interpreter
    'ruby',           // Ruby interpreter
    'make',           // Build automation tool
    'g++',            // GNU C++ compiler
    'gcc',            // GNU C compiler
    'clang',          // C, C++, and Objective-C compiler
    'valgrind',       // Memory debugging, memory leak detection
    'strace',         // Trace system calls and signals
    'gdb',            // GNU debugger
    'git',            // Version control system
    'svn',            // Subversion version control system
    'hg',             // Mercurial version control system
    'docker',         // Container management
    'vagrant',        // Virtual machine management
    'df',             // Display disk space usage
    'du',             // Display file space usage
    'mount',          // Mount a filesystem
    'umount',         // Unmount a filesystem
    'lvm',            // LVM management tool (Logical Volume Manager)
    'cryptsetup',     // LUKS disk encryption
    'fuser',          // Identify processes using files or sockets
    'lsof',           // List open files
    'mount',          // Mount a filesystem
    'umount',         // Unmount a filesystem
    'dstat',          // Versatile resource statistics
    'watch',          // Execute a program periodically
    'date',           // Display or set the system date and time
    'cal',            // Display calendar
    'uptime',         // Show system uptime
    'last',           // Show last logins
    'w',              // Who is logged in
    'who',            // Who is logged in
    'finger',         // Display user information
    'id',             // Print user and group ID
    'groups',         // Show user’s groups
    'sudo',           // Run a command as another user (usually root)
    'passwd',         // Change user password
    'chpasswd',       // Update password in batch
    'usermod',        // Modify a user account
    'groupmod',       // Modify a group account
    'useradd',        // Add a user
    'groupadd',       // Add a group
    'userdel',        // Delete a user
    'groupdel',       // Delete a group
    'brew',           // Homebrew package manager (Linuxbrew on Linux)
    'pacman',         // Package manager for Arch Linux and derivatives
    'zypper',         // Package manager for openSUSE and SUSE Linux Enterprise
    'dnf',            // Package manager for Fedora and Red Hat-based systems
    'yum',            // Package manager for Red Hat-based systems (older versions)
    'snap',           // Snap package manager for universal package management
    'flatpak',        // Universal package manager for Linux
    'port',           // MacPorts package manager (also available on Linux)
    'gem',            // Ruby package manager
    'cargo',          // Rust package manager
    'composer',       // PHP dependency manager
    'cargo',          // Rust package manager
    'pipenv',         // Python dependency management tool for virtual environments
    'conda',          // Package manager for Python and data science packages
    'nix',            // Package manager for NixOS and other Linux distributions
    'opkg',           // Package manager for embedded Linux systems
    'apk',            // Alpine Linux package manager
    'guix',           // Package manager for the Guix System
    'pacman',         // Package manager for Arch Linux and derivatives
    'yay',            // AUR helper for Arch Linux
    'aurman',         // AUR helper for Arch Linux
    'rvm',            // Ruby Version Manager
    'asdf',           // Version manager for multiple languages
    'pyenv',          // Python version manager
    'nvm',            // Node version manager
    'rbenv',          // Ruby version manager
    'jenv',           // Java version manager
    'sdkman',         // Software Development Kit Manager for JVM languages
    'fnm',            // Fast Node Version Manager
    'npm',            // Node.js package manager (for JavaScript)
    'yarn',           // Alternative JavaScript package manager
    'pnpm',           // Fast, disk space-efficient package manager for JavaScript
    'composer',       // PHP dependency manager
    'bower',          // Front-end package manager
    'jspm',           // Front-end package manager (deprecated)
    'git lfs',        // Git extension for managing large files
    'maven',          // Build automation tool for Java projects
    'gradle',         // Build automation tool for Java and other languages
    'lein',           // Clojure build automation tool
    'make',           // Build automation tool
    'cmake',          // Cross-platform build automation tool
    'autoconf',       // Tool for generating configuration scripts
    'automake',       // Tool to generate Makefile.in files
    'bld',            // Build system for Node.js
    'buildout',       // Build system for Python
    'shippable',      // Continuous integration service
];


        if (!allowedCommands.some(cmd => command.startsWith(cmd))) {
            return res.status(403).send('Command not allowed');
        }

        if (command === 'clear') {
            return res.send({ clear: true });
        }

        if (command.startsWith('cd')) {
            const dir = command.split(' ')[1];
            if (!dir) {
                return res.status(400).send('No directory specified');
            }

            try {
                process.chdir(dir);
                return res.send(`Changed directory to ${process.cwd()}`);
            } catch (err) {
                return res.status(500).send(`Error: ${err.message}`);
            }
        }

        // Execute other commands
        exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
            if (error) {
                return res.status(500).send(`Error: ${error.message}`);
            }
            if (stderr) {
                return res.status(500).send(`Stderr: ${stderr}`);
            }

            // Process output to remove unnecessary newlines
            const output = stdout.trim(); // Remove leading/trailing whitespace

            res.send(output); // Send only the output
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
