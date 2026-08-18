# === GETTING HELP ===
man <command>                                    # [#man-db] Opens the official manual page for a command (arrows to scroll, "/" to search, "q" to quit)
tldr <command>                                   # [#tealdeer] Displays simplified examples of how to use a command
<command> --help / -h                            # Prints a summary of a command's usage and available flags directly in the terminal

# === NAVIGATION & FILES ===
pwd                                              # Prints the absolute file path of the current working directory
ls [-la|-lh|-R|--tree]                           # Lists directory contents (`-l`: long format with details; `-a`: include hidden files; `-h`: human-readable file sizes; `-R`: recursively list subdirectories)
cd <dir>                                         # Changes the current working directory to the specified folder path
cp [-r|-i] <src> <dst>                           # Copies files or directories (`-r`: recursive copy for folders; `-i`: prompt before overwriting existing files)
mv [-i] <src> <dst>                              # Moves or renames files and directories (`-i`: prompt before overwriting existing destination files)
rm [-rf|-i] <file>                               # Removes files or directories (`-rf`: delete files and folders without prompting; `-i`: prompt before every removal)
mkdir [-p] <dir>                                 # Creates a new directory (`-p`: create parent directories as needed without throwing errors if they exist)
touch <file>                                     # Creates a new empty file or updates the access and modification timestamps of an existing one
ln [-s] <target> <link_name>                     # Creates links between files (`-s`: creates a symbolic/soft link pointing to a path, rather than a hard link)
du [-h|-s|-d <num>] [<path>]                     # Estimates disk space usage (`-h`: human readable; `-s`: summary only; append `*` for dir items)
df -h                                            # Displays filesystem disk space usage summaries in human-readable units
cat <file>                                       # Outputs the entire contents of a file directly to the standard output stream
less <file>                                      # Opens a file for interactive, page-by-page viewing (use arrow keys to scroll, "/" to search, press "q" to exit)
head [-n <num>] <file>                           # Outputs the first lines of a file (defaults to 10 lines; use `-n` to specify a custom line count)
tail [-n <num>|-f] <file>                        # Outputs the final lines of a file (`-n`: specify line count; `-f`: append output as the file grows, used for logs)
grep [-i|-r] <term> <file>                       # Searches for text patterns matching a regular expression (`-i`: case-insensitive search; `-r`: recursive search through directories)
find <dir> -name <pattern>                       # Searches for files within a directory hierarchy based on a filename pattern
which <command>                                  # Locates and prints the full path of the executable file associated with a given command
file <file>                                      # Identifies the data type and format of a file, ignoring its extension
wc -l <file>                                     # Counts and outputs the number of lines in a file
basename <path> [<suffix>]                       # Strips path to filename (`<suffix>`: strips matching file extension, e.g. `.txt`)
dirname <path>                                   # Strips filename to parent path (no common flags needed)
realpath [-e|-m] <path>                          # Resolves path to canonical form (`-e`: target must exist; `-m`: path can be missing)
stat [-c <fmt>|-f] <file>                        # Displays file details (`-c`: custom output format; `-f`: display filesystem status)
xargs [-I {}|-0|-n <num>] <cmd>                  # Converts stdin to cmd args (`-I {}`: placeholder replacement; `-0`: null-separated input; `-n`: max args per command)

# === GENERAL FLAGS===
<command> --verbose / -v                         # Outputs detailed (verbose) diagnostic information and log
<command> --version / -V                         # Prints the version number and build information of the command
<command> --dry-run                              # Simulates execution without making any actual changes or writing files
<command> --force / -f                           # Forces the command to execute, bypassing warnings or existing file checks
<command> --quiet / -q                           # Suppresses all standard output and non-error messages (silent mode)
<command> --yes / -y                             # Automatically answers "yes" (or confirms) to

# === PIPES & REDIRECTION ===
|                                                # The pipe: takes the output of the left command and feeds it as input to the right command (e.g., ls -la | grep "txt")
> <file>                                         # Redirects output to a file, overwriting any existing contents in that file
>> <file>                                        # Redirects output to a file, appending it to the bottom without erasing existing content
2> <file>                                        # Redirects only standard error (stderr) to a file, leaving standard output untouched
&> <file>                                        # Redirects both standard output (stdout) and standard error (stderr) to a file
2>&1                                             # Merges standard error into standard output (e.g., `cmd > file 2>&1`)
&>> <file>                                       # Appends both standard output and standard error to the bottom of a file
< <file>                                         # Feeds the contents of a file into a command's standard input (input redirection)
<<< "<text>"                                     # Here-string: passes a literal string directly into a command's standard input
<< <delimiter>                                   # Here-doc: passes multi-line blocks of text into a command until the delimiter keyword is matched (often EOF)
tee <file>                                       # Reads from standard input and writes to both standard output and files (use `-a` to append)
echo "<text>"                                    # Prints a string of text to the terminal (combined with > or >> to write notes to files)

# === SHELL VARIABLES & SUBSTITUTION ===
$?                                               # Returns the exit status of the immediately preceding command (0 for success, non-zero for error)
$$                                               # Expands to the process ID (PID) of the current shell session
$USER / $UID                                     # Expands to the username and numeric user ID of the currently logged-in user
$HOME / $PWD                                     # Expands to the current user's home directory and absolute working directory path
$PATH                                            # Colon-separated list of directories where the shell searches for executable command binaries
$<var> / ${<var>}                                # Expands the value of a stored shell variable (braces are useful for concatenation or defaults)
$(<command>)                                     # Command substitution: executes a command and replaces it with its standard output string
$((<expression>>)                                # Arithmetic expansion: evaluates mathematical expressions inside the shell

# === PATHS, WILDCARDS & SPECIAL CHARACTERS ===
~                                                # Expands to the home directory of the current user (e.g., /home/username)
.                                                # Represents the current working directory in file paths
..                                               # Represents the parent directory (one level up in the directory tree)
/                                                # Directory path separator and the absolute root directory of the file system
*                                                # Wildcard: matches any string of characters (including an empty string) in filenames
?                                                # Wildcard: matches any single character in filenames
[<set>]                                          # Wildcard: matches any one of the characters enclosed within the brackets (e.g., [a-z])

# === TEXT PROCESSING & FILTERING ===
awk '{print $<num>}' <file>                      # Pattern scanning and text processing language for fields and columns
sed 's/<old>/<new>/g' <file>                     # Stream editor for filtering and transforming text (search and replace)
cut [-d <delim>] -f <num> <file>                 # Removes sections from each line of files based on delimiters
sort [-n|-r] <file>                              # Sorts lines of text files (`-n`: numeric sort; `-r`: reverse order)
uniq [-c] <file>                                 # Reports or omits repeated lines in a file (`-c`: count occurrences)
tr <set1> <set2>                                 # Translate, squeeze, or delete characters from standard input
diff <file1> <file2>                             # Compares files line by line

# === TERMINAL SHORTCUTS & MOUSE BEHAVIOR ===
Tab                                              # Auto-completes file, folder, and command names as you type
Ctrl + C                                         # Cancels, stops, or terminates the running command or process currently freezing the terminal
Ctrl + D                                         # Closes the current terminal session, shell tab, or exits out of programs (acts as EOF)
Ctrl + R                                         # Reverse-i-search: searches backwards through terminal command history as you type
Ctrl + L                                         # Clears the terminal screen completely (identical to typing the "clear" command)
Ctrl + A (or Home)                               # Moves the text cursor to the beginning of the current line
Ctrl + E (or End)                                # Moves the text cursor to the end of the current line
Ctrl + U                                         # Deletes everything from the cursor to the start of the line
Ctrl + W                                         # Deletes the word immediately to the left of the cursor
Ctrl + Shift + C                                 # Copies currently highlighted text in the terminal window to the system clipboard
Ctrl + Shift + V                                 # Pastes text from the system clipboard directly into the terminal command line
Middle Mouse Click                               # Pastes text currently highlighted or selected in the system primary selection buffer
Shift + Mouse Scroll                             # Scrolls terminal output history page-by-page when alternate screen buffer is not captured

# === SHELL & COMMAND HISTORY ===
history                                          # Displays the command history list for the current session
history -c                                       # Clears the history list by deleting all entries from the current session history file
history | grep <term>                            # Searches command history for a specific past command or keyword
!<number>                                        # Executes a specific command from the history list using its index number
!!                                               # Re-runs the immediately preceding command from shell history
alias <name>="<command>"                         # Defines a custom shortcut or alternative name for a longer shell command
clear                                            # Clears all previous terminal output from the screen
exit                                             # Closes the terminal window or disconnects the current shell session
shopt -s checkwinsize                            # Automatically updates terminal line and column dimensions after each command if the window size changes
shopt -s cdspell                                 # Automatically corrects minor spelling errors and typos in directory names passed to cd
shopt -s extglob                                 # Enables extended regular expression pattern matching features within the shell
shopt -s histappend                              # Appends the current session command history to the history file rather than overwriting it on exit
shopt -s histverify                              # Loads history expansions into the readline editing buffer to review before execution

# === JOB CONTROL & MULTITASKING ===
jobs                                             # Lists active background jobs and their job numbers
bg [%job]                                        # Resumes a suspended job and runs it in the background
fg [%job]                                        # Brings a background or suspended job into the foreground
<command> &                                      # Runs a command immediately in the background
screen / tmux                                    # [#tmux] Terminal multiplexers for running multiple persistent sessions in one window

# === ALTERNATIVE CLI TOOLS ===
eza [<dir>]                                      # [#eza] A replacement for ls featuring grid layouts, colors, and git integration
bat <file>                                       # [#bat] A replacement for cat featuring syntax highlighting, git integration, and line numbers
ripgrep (rg) <term>                              # [#ripgrep] A fast, recursive line-oriented search tool designed as a grep alternative
fd <pattern>                                     # [#fd] A fast alternative to the traditional find command
ncdu [<dir>]                                     # [#ncdu] An interactive TUI tool to analyze disk space usage with percentage bars (press "q" to quit)
duf                                              # [#duf] A disk usage utility with a colorful interface for monitoring storage volumes
procs                                            # [#procs] A replacement for ps that provides colorized output, search, and tree views
zoxide query <dir> / z <dir>                     # [#zoxide] A cd command that tracks frequently used directories for fast navigation
dust                                             # [#dust] Visual replacement for du with tree-based disk usage
sd <find> <replace> <file>                       # [#sd] Fast, intuitive replacement for sed
doggo <domain>                                   # [#doggo] Modern CLI DNS client replacement for dig
bottom / btm                                     # [#bottom] Graphical process/system monitor replacement for top
hyperfine '<cmd>'                                # [#hyperfine] Command-line benchmarking tool replacement for time
curlie <url>                                     # [#curlie] HTTP client combining curl features with httpie usability
delta <file1> <file2>                            # [#git-delta] Syntax-highlighting pager for git and diff output
lazygit                                          # [#lazygit] Terminal UI for git commands
micro <file>                                     # [#micro] Terminal text editor with standard keybindings and mouse support
zellij                                           # [#zellij] Terminal workspace manager and alternative to tmux

# === PACKAGE MANAGEMENT: PACMAN ===
sudo pacman -Syu                                 # Synchronizes repository databases and updates all installed system packages
sudo pacman -S <pkg>                             # Downloads and installs a specified package along with its required dependencies
sudo pacman -Syyu                                # Forces a complete refresh of local repository databases before performing a system update
sudo pacman -R <pkg>                             # Removes a specified package from the system while leaving its dependencies intact
sudo pacman -Rs <pkg>                            # Removes a package and cleans up orphaned dependencies that are no longer needed
sudo pacman -Rns <pkg>                           # Removes a package, unneeded dependencies, and remaining configuration files completely
sudo pacman -Rnsu <pkg>                          # Uninstalls a package, cleans up orphan dependencies, deletes config files, and updates the system
sudo pacman -Rdd <pkg>                           # Forcefully uninstalls a package without checking dependency relationships
sudo pacman -Ss <term>                           # Searches remote package databases for packages matching a specific keyword
sudo pacman -Si <pkg>                            # Displays package metadata and installation statistics for a repository package
pacman -Q [-qe|-qt|-qi]                          # Queries installed packages (`-qe`: explicitly installed packages; `-qt`: orphaned packages; `-qi`: package details)
sudo pacman -Sc                                  # Removes old, uninstalled package files from the local cache to free up disk space
sudo pacman -Scc                                 # Deletes all cached package files from local storage entirely to maximize free disk space

# === PACKAGE MANAGEMENT: FLATPAK ===
flatpak search <term>                            # [#flatpak] Searches configured remote repositories for applications matching a specific keyword
flatpak install <app>                            # [#flatpak] Downloads and installs an application or runtime from a configured remote repository (like Flathub)
flatpak uninstall <app>                          # [#flatpak] Removes an installed Flatpak application or runtime from the system
flatpak uninstall --unused                       # [#flatpak] Cleans up and removes orphaned runtimes and extensions not used by any installed app
flatpak update                                   # [#flatpak] Updates all installed Flatpak applications and runtimes to their latest versions
flatpak list [--app]                             # [#flatpak] Lists installed packages (`--app`: only show installed GUI applications, ignoring runtimes)
flatpak run <app_id>                             # [#flatpak] Launches a Flatpak application using its full reverse-DNS identifier (e.g., org.gimp.GIMP)
flatpak remotes                                  # [#flatpak] Lists all configured remote repositories where applications and runtimes are fetched from
flatpak override <app_id>                        # [#flatpak] Modifies sandbox permissions for a specific app (consider using Flatseal for a GUI alternative)

# === AUR HELPERS (YAY / PARU) ===
# NOTE: The AUR can have dangerous scripts, try to only install from official repositories pretty please :3
paru -Syu                                        # [#yay or paru] Updates all official repository packages as well as installed AUR packages
paru <pkg>                                       # [#yay or paru] Searches, downloads and installs software packages from official repositories or the AUR
paru -Sc                                         # [#yay or paru] Clears out old cached AUR build files and downloaded tarballs
paru -Scc                                        # [#yay or paru] Completely wipes all cached packages, build directories, and archives

# === SYSTEM & SERVICES (SYSTEMD) ===
sudo systemctl start <service>                   # Immediately starts a specified systemd background service unit
sudo systemctl stop <service>                    # Immediately stops a running systemd background service unit
sudo systemctl restart <service>                 # Restarts a systemd service by stopping and starting it back up sequentially
sudo systemctl enable [--now] <service>          # Configures a service to start automatically at boot (`--now`: also starts the service immediately)
sudo systemctl disable <service>                 # Prevents a systemd service from starting automatically during system boot
sudo systemctl status <service>                  # Displays runtime status information, health, and recent logs for a service
journalctl -u <service> [-f]                     # Queries systemd journal logs for a specific service (`-f`: stream live log updates)
systemctl failed                                 # Lists all systemd service units that have encountered failures or crashed
timedatectl status                               # Displays current system time, timezone, and NTP synchronization status
localectl status                                 # Displays current system locale, keyboard mapping, and X11 keymap settings
reboot                                           # Reboots the computer immediately
poweroff                                         # Shuts down and turns off the power to the computer immediately
shutdown now                                     # An alternative command to immediately shut down the system

# === SYSTEM AUDITING & LOGS ===
last                                             # Shows a listing of last logged-in users and system reboots
lastb                                            # Shows a listing of failed login attempts, useful for detecting brute-force SSH attacks
w                                                # Displays currently logged-in users, their active terminal sessions, and system load
lsof [-i|-u]                                     # Lists open files and the processes that opened them (`-i`: list network connections)
dmesg [-w]                                       # Prints or controls the kernel ring buffer to inspect hardware and driver messages (`-w`: wait/follow)
journalctl [-b|-p 3|-xe]                         # Queries systemd logs (`-b`: since current boot; `-p 3`: errors only; `-xe`: end of log with details)
strace [-p <pid>] <cmd>                          # Traces system calls and signals for a command or running PID to audit process behavior
watch [-n <sec>] <cmd>                           # Executes a command periodically and displays the output fullscreen to monitor live changes
tail -f /var/log/pacman.log                      # Monitors the Arch package manager log in real-time to audit software installations and updates

# === PERMISSIONS & OWNERSHIP ===
sudo <command>                                   # Executes a single command with administrative superuser (root) privileges
su [-] <user>                                    # Switches the current user session context (run plain "su" or "su -" to switch to root)
chmod [-R] <perms> <file>                        # Modifies file access permissions (`-R`: recursive; e.g., 755 for scripts, 644 for files, +x to make executable)
chown [-R] <user>:<group> <file>                 # Changes the user and group ownership of a file or directory (`-R`: apply recursively)
passwd [<user>]                                  # Changes the password for the current user (or a specified user if run with sudo)
id [<user>]                                      # Prints the user ID (UID), group ID (GID), and all supplementary group memberships
sudo usermod -aG <group> <user>                  # Appends a user to a supplementary group (e.g., adding a user to `wheel` or `docker`)
chattr [+|-]i <file>                             # Modifies advanced file attributes (`+i`: makes a file immutable, preventing edits or deletion even by root)
lsattr <file>                                    # Lists advanced file attributes (useful for checking if a file has been made immutable)
umask [<octal>]                                  # Displays or sets the default file creation permission mask for the current shell session

# === NETWORKING, DNS & SSH ===
nmtui                                            # Opens an interactive text-based user interface to manage network connections and Wi-Fi
nmcli device status                              # Displays a tabular list of network interface devices and their current connection states
ip a                                             # Displays network interface configurations, hardware addresses, and local IP assignments
ip link [set <dev> <up|down>]                    # Displays Layer 2 MAC status, or enables (up)/disables (down) a specific network interface
ip route                                         # Displays and modifies the kernel network routing table and gateway settings
ip neigh                                         # Displays the neighbor/ARP table showing IP address to MAC address mappings on the local network
ifconfig [-a|<dev> <up|down>]                    # [#net-tools] Legacy tool for network interfaces (replaced by ip; `-a`: show all, including down)
ping [-c <count>] <host>                         # Sends ICMP echo request packets to test network connectivity (`-c`: limit packet count)
traceroute <host>                                # [#traceroute] Tracks the route packets take to reach a remote host, displaying hop delays
tracepath <host>                                 # Traces the network path discovering MTU along the way (does not require root privileges)
ss -tulpn                                        # Displays socket statistics, listing active listening ports and their associated processes
netstat [-tulpn]                                 # [#net-tools] Legacy tool for network connections (`-tulpn`: active TCP/UDP listening processes)
sudo tcpdump [-i <dev>]                          # [#tcpdump] Captures and displays real-time network packets (`-i`: specify network interface)
nmap [-p <port>|-sV|-O|-A|-sn] <target-net>      # [#nmap] Scans a host (`-p`: specify ports; `-sV`: service versions; `-O`: OS detect; `-A`: aggressive; `-sn`: ping scan/host discovery)
dig <domain>                                     # [#bind] Queries DNS name servers for information regarding host addresses, MX records, and zone lookups
nslookup <domain>                                # [#bind] Queries internet name servers interactively or directly to find IP addresses
whois <domain>                                   # [#whois] Queries the WHOIS database to retrieve domain registration and ownership information
curl -O <url>                                    # Transfers data from or to a server, downloading a file using its remote filename
wget [-O <file>] <url>                           # [#wget] A non-interactive network downloader for retrieving files (`-O`: save under a custom filename)
perf3 -s [-p <port>]                             # [#iperf3] Starts a network performance server (`-p`: specify custom port)
iperf3 -c <host> [-u|-R|-P <num>|-t <sec>]       # [#iperf3] Tests bandwidth against a server (`-u`: UDP; `-R`: reverse mode; `-P`: parallel streams; `-t`: duration)
ssh [-p <port>] <user>@<host>                    # Establishes an encrypted secure shell session on a remote server (`-p`: specify custom port)
scp [-r] <src> <user>@<host>:<dest>              # Securely copies files over an SSH network connection (`-r`: recursively copy directories)

# === STORAGE, DRIVES & MOUNTING ===
lsblk [-f]                                       # Lists information about available block storage devices (`-f`: output filesystems and UUIDs)
blkid                                            # Prints block device attributes including filesystem types and unique identifiers (UUIDs)
mount [-t <type>] [-o <opts>] <dev> <dir>        # Attaches a storage filesystem from a device to a designated directory tree path
umount <dir>                                     # Detaches a currently mounted filesystem from the directory tree
findmnt                                          # Lists currently mounted filesystems in an organized, searchable tree format

# === DISK PARTITIONING & FORMATTING ===
fdisk [-l] /dev/<sdX>                            # Manages partitions (`-l`: list tables; run without flags for interactive editor)
parted -s /dev/<sdX> mklabel gpt                 # [#parted] Non-interactively creates a fresh GPT partition table on a disk
parted -s /dev/<sdX> mkpart primary <fs> 0% 100% # [#parted] Non-interactively creates a single partition spanning the entire disk
mkfs.<ext4|btrfs|vfat|xfs> /dev/<sdX1>           # Formats a partition with a specified filesystem type (ext4, btrfs, vfat/FAT32, xfs)
mkswap <dev_or_file>                             # Sets up a Linux swap area on a partition or a pre-allocated file
swapon <dev_or_file>                             # Activates a designated swap partition or file so the kernel can use it for virtual memory
smartctl -a /dev/<sdX>                           # [#smartmontools] Displays detailed SMART health status, temperature, and diagnostics for a drive

# === SYSTEM INFO & HARDWARE MONITORING ===
fastfetch                                        # [#fastfetch] Displays system information, OS details, and hardware specs alongside an ASCII logo
btop                                             # [#btop] A terminal-based resource monitor for tracking CPU, memory, disks, and processes (Esc for menu, "q" to quit)
htop                                             # [#htop] An interactive process viewer providing an interface for managing system tasks (F3 to search, F9 to kill, F10 or "q" to quit)
nvtop                                            # [#nvtop] A terminal-based monitoring tool for tracking GPU utilization, temperature, and VRAM usage
top                                              # Displays a dynamic, real-time view of running system processes and resource usage (Press "k" to kill a PID, "q" to quit)
free -h                                          # Displays total, used, and available system memory metrics in readable units
uname -r                                         # Prints the release version of the running Linux kernel
uptime                                           # Displays how long the system has been running and the current load average
whoami                                           # Prints the username associated with the currently logged-in user
ps aux                                           # Generates a detailed snapshot of all running processes across all users
kill [-9] <PID>                                  # Sends a termination signal to a process using its Process ID (`-9`: force kill)
killall <process_name>                           # Terminates all running processes matching a given executable name

# === CODE EXECUTION & RUNTIMES ===
python3 <script.py> [<args>]                     # [#python] Executes a Python script via the interpreter
python -m <module>                               # [#python] Runs an installed library module as a CLI tool
node <script.js>                                 # [#nodejs] Executes a JavaScript file server-side
deno run [-A] <script.ts|js>                     # [#deno] Runs TypeScript/JavaScript (`-A`: grant all permissions)
bash <script.sh>                                 # [#bash] Runs a shell script directly
sh <script.sh>                                   # [#bash] Runs a script using POSIX shell compatibility
perl <script.pl>                                 # [#perl] Executes a Perl script
ruby <script.rb>                                 # [#ruby] Executes a Ruby script
luajit <script.lua>                              # [#luajit] Executes a Lua script using the JIT compiler
java -jar <file.jar>                             # [#jdk-openjdk] Runs a packaged Java application (.jar file)
java <MainClass>                                 # [#jdk-openjdk] Runs a compiled Java class file directly
./<executable_file>                              # Running compiled binaries/scripts directly (needs `chmod +x`)

# === CORE SYSTEM, BOOT & KERNEL ===
sudo grub-mkconfig -o /boot/grub/grub.cfg        # Generates a new GRUB bootloader configuration file based on current settings and kernels (based on settings in /etc/default/grub)
sudo grub-install <device>                       # Installs the GRUB bootloader to the specified block device (e.g., /dev/sda)
sudo mkinitcpio -P                               # Rebuilds the initial ramdisk environment (initramfs) for all installed kernels
lsmod                                            # Formats and displays a list of currently loaded kernel modules (drivers)
sudo modprobe <module>                           # Loads a kernel module and its dependencies into the running kernel
sudo rmmod <module>                              # Removes or unloads a currently active module from the Linux kernel

# === DOCKER & CONTAINERIZATION ===
docker run [options] <image>                     # [#docker] Creates and starts a new container from a specified Docker image
docker ps [-a]                                   # [#docker] Lists running containers (`-a`: include stopped containers)
docker start <container>                         # [#docker] Starts one or more already created containers
docker stop <container>                          # [#docker] Stops a running container by sending a SIGTERM signal
docker restart <container>                       # [#docker] Restarts a running or stopped container
docker rm [-f] <container>                       # [#docker] Deletes a stopped container (`-f`: force remove a running container)
docker images                                    # [#docker] Lists locally stored Docker images available on the system
docker rmi <image>                               # [#docker] Deletes one or more local Docker images
docker logs [-f] <container>                     # [#docker] Fetches logs from a container (`-f`: follow live log output)
docker exec -it <container> <command>            # [#docker] Runs an interactive command (e.g., /bin/bash) inside a running container
docker build [-t <name>] <dir>                   # [#docker] Builds a Docker image from a Dockerfile in the specified directory
docker system prune [-a]                         # [#docker] Cleans up unused containers, networks, and images (`-a`: remove all unused images)

# === DOCKER COMPOSE ===
docker compose up [-d]                           # [#docker-compose] Builds, (re)creates, and starts containers defined in a compose file (`-d`: run in background/detached mode)
docker compose down                              # [#docker-compose] Stops and removes containers, networks, and default volumes created by up
docker compose ps                                # [#docker-compose] Lists containers managed by the current compose project
docker compose logs [-f]                         # [#docker-compose] Views output logs from compose services (`-f`: follow live output)
docker compose restart                           # [#docker-compose] Restarts all or specified services within the compose stack
docker compose pull                              # [#docker-compose] Downloads newer versions of the images specified in the compose file

# === DOCKER TERMINAL TOOLS ===
lazydocker                                       # [#lazydocker] A TUI dashboard for managing Docker and Docker compose containers, images, and volumes
ctop                                             # [#ctop] A top-like terminal interface for monitoring metrics of multiple running containers

# === KDE PLASMA ENVIRONMENT & UTILITIES ===
kstart5 / kstart                                 # Launches an application with specific startup window properties
yakuake                                          # [#yakuake] A drop-down terminal emulator for KDE Plasma (press F12 to toggle)
qdbus                                            # Queries and calls D-Bus interfaces to interact with running KDE Plasma applications and system services
kquitapp5 <service>                              # Requests a KDE application or daemon to close via D-Bus
kscreen-console                                  # Diagnostic utility for inspecting KDE screen layouts, outputs, and connector statuses
plasmoidviewer                                   # Testbed utility to run and debug individual KDE Plasma widgets outside of the desktop shell
kde-open5 <url_or_file>                          # Opens a file or URL using the user's default KDE desktop application handlers
kwriteconfig5 --file <cfg> --group <g>...        # Reads or writes entries into KDE configuration files directly from the command line
plasmashell --replace &                          # Restarts the KDE Plasma desktop shell in the background (useful if the panel or desktop freezes)
kbuildsycoca5 / kbuildsycoca6                    # Rebuilds the KDE system configuration cache (fixes missing app icons or broken application menus)
kdialog --msgbox "<text>"                        # Displays native KDE Plasma graphical dialog boxes and prompts from shell scripts or the terminal
kdeconnect-cli -l                                # [#kdeconnect] Lists all paired and available mobile devices on the local network via KDE Connect
kdeconnect-cli --ring <id>                       # [#kdeconnect] Rings a specific paired mobile device at full volume (useful for finding a misplaced phone)
spectacle -r -b -c                               # [#spectacle] Takes a rectangular region screenshot in the background and copies it directly to the clipboard
kinfo                                            # Displays a summary of your system information, KDE Plasma version, and Frameworks details

# === DESKTOP, MEDIA & UTILITIES ===
ffmpeg -i <in> <out>                             # [#ffmpeg] Converts, records, and streams audio and video file formats via the command line
magick <in> <out>                                # [#imagemagick] Creates, edits, and converts bitmap images via the command line
pandoc <in> -o <out>                             # [#pandoc-cli] Converts document formats (Markdown, PDF, HTML, Docx)
pdftoppm -png <file.pdf> <prefix>                # [#poppler] Converts PDF pages to PNG images
pdfunite <in1> <in2> <out.pdf>                   # [#poppler] Merges PDFs into a single file
yt-dlp <url>                                     # [#yt-dlp] Downloads videos and audio from YouTube and other streaming sites
mpv <file_or_url>                                # [#mpv] A command-line media player for audio and video streams (Space to pause, "q" to quit)
tar [-xzf|-czf] <archive> <files>                # Utility to manipulate archive files (`-xzf`: extract a gzip compressed tarball; `-czf`: create a new tarball)
zip -r <archive.zip> <dir>                       # [#zip] Packages and compresses a directory into a standard ZIP archive
unzip <archive.zip>                              # [#unzip] Extracts compressed files from a standard ZIP archive into the current directory
7z [a|x] <archive> <target>                      # [#7zip] A high-compression archiving tool (`a`: add/compress files into an archive; `-x`: extract files)
nano <file>                                      # Opens a terminal-based text editor for editing files (Ctrl+O to save, Enter to confirm, Ctrl+X to exit)
vim <file>                                       # [#vim] Opens a modal keyboard-driven text editor (press "i" to insert, ESC then ":wq" to save and quit, ":q!" to quit without saving)
rsync [-avP] <src> <dst>                         # [#rsync] Syncs and copies files locally or over a network (`-a`: archive mode; `-v`: verbose; `-P`: show progress)
exiftool <file>                                  # [#perl-image-exiftool] Reads, writes, and modifies metadata tags across a vast range of media files

# === GIT & VERSION CONTROL ===
git init                                         # [#git] Initializes a new, empty Git repository in the current directory
git clone <url>                                  # [#git] Clones a remote repository down to your local machine
git status                                       # [#git] Displays the state of the working directory and staging area
git add <file>                                   # [#git] Adds file changes in the working directory to the staging area (use `.` for all)
git commit -m "<message>"                        # [#git] Records staged snapshots permanently into the repository history with a message
git push [remote] [branch]                       # [#git] Uploads local branch commits to a remote repository (e.g., origin main)
git pull [remote] [branch]                       # [#git] Fetches and merges changes from a remote repository into the current branch
git branch [-a]                                  # [#git] Lists, creates, or deletes branches (`-a`: list both local and remote branches)
git checkout <branch> / switch <branch>          # [#git] Switches to a specified branch or restores working tree files
git log [--oneline]                              # [#git] Displays the commit history (`--oneline`: condenses each commit to a single line)
git diff [<file>]                                # [#git] Shows line changes made in files that are not yet staged or between commits
git stash                                        # [#git] Temporarily shelves uncommitted changes to work on something else (pop to restore)

# === ESSENTIAL DIRECTORIES & SYSTEM FILES ===
/dev/                                            # Device files: maps hardware components like disks and terminals to accessible file nodes
/etc/                                            # Configuration files: houses system-wide configuration files and plain-text settings
/home/                                           # User home folders: contains personal files, configurations, and documents for local users
/var/                                            # Variable data: stores dynamic files such as system logs, mail spools, and temporary caches
/usr/                                            # User programs: holds read-only user applications, binaries, shared libraries, and manual pages
/proc/                                           # Process info: a virtual filesystem exposing kernel statistics and running process states
/sys/                                            # System info: a virtual filesystem used for querying and configuring kernel and hardware devices
/tmp/                                            # Temporary files: a scratchpad directory for transient application files cleared on reboot
/boot/                                           # Boot files: stores the Linux kernel images, initial RAM disks, and bootloader configurations
/mnt/ or /media/                                 # Mount points: temporary mount directories used for attaching external storage media
~/.bashrc                                        # Personal shell startup script containing environment variables, functions, and aliases
~/.bash_history                                  # Hidden file where the bash shell records command history
/etc/fstab                                       # Static file system information used by the operating system to mount storage drives at boot
/etc/sudoers                                     # Security policy file defining which users and groups are permitted to execute sudo commands
/etc/os-release                                  # Operating system identification data containing distribution names and version numbers
/etc/pacman.conf                                 # Configuration file controlling the behavior of the Arch Linux package manager
/etc/pacman.d/mirrorlist                         # List of server URLs that pacman queries to download software packages
/etc/resolv.conf                                 # Configuration file containing DNS server IP addresses used for domain name resolution
/etc/hostname                                    # Plain-text file defining the network host name assigned to the computer
/etc/hosts                                       # Static table lookup file mapping hostnames to numerical IP addresses manually
/etc/passwd                                      # System user database file defining user accounts, numeric UIDs, and shell paths

# === ADDITIONAL ESSENTIAL DIRECTORIES & SYSTEM FILES ===
/bin/ and /sbin/                                 # Symlinks to /usr/bin and /usr/sbin on modern Linux systems containing essential command binaries
/opt/                                            # Optional software: directory for installing standalone, third-party application packages
/root/                                           # Home directory for the administrative superuser (root) account
/srv/                                            # Service data: holds site-specific data served by the system (e.g., web server or FTP files)
/run/                                            # Runtime data: volatile memory-backed filesystem storing state information since boot

# === USER ACCOUNTS & SECURITY CONFIGURATIONS ===
/etc/shadow                                      # Encrypted password hashes and account expiration details (accessible only by root)
/etc/group                                       # Group definitions, listing system groups and their associated user members
/etc/gshadow                                     # Secure group information containing encrypted group passwords
/etc/environment                                 # System-wide environment variables set for all users upon login
/etc/profile                                     # System-wide startup script executed for login shells
/etc/profile.d/                                  # Directory containing custom shell scripts executed during system-wide login initialization
~/.ssh/                                          # Hidden user directory housing SSH keys, authorized keys, and host configuration files
~/.config/                                       # User-specific configuration directory following XDG Base Directory standards

# === SYSTEMD & SERVICE MANAGEMENT ===
/etc/systemd/system/                             # Custom and administrator-defined systemd unit files and service configurations
/lib/systemd/system/                             # Package-installed systemd unit files shipped by default with software
/var/log/                                        # Central directory for application and system log files (e.g., /var/log/journal/)

# === NETWORK & HARDWARE CONFIGURATIONS ===
/etc/network/interfaces or /etc/netplan/         # Traditional network interface configuration files (Debian/Ubuntu systems)
/etc/NetworkManager/NetworkManager.conf          # Primary configuration file for systems managing networks via NetworkManager
/etc/crontab                                     # System-wide table file for scheduling automated background tasks
/etc/cron.*/                                     # Periodic directories (cron.hourly, cron.daily, etc.) for scheduled execution scripts
/etc/modprobe.d/                                 # Configuration directory for customizing kernel module options and blocklists
