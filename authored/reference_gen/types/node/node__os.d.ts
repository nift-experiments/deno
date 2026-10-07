/**
 * The `node:os` module provides operating system-related utility methods and
 * properties. It can be accessed using:
 *
 * ```js
 * import os from 'node:os';
 * ```
 * @see [source](https://github.com/nodejs/node/blob/v22.x/lib/os.js)
 * @module
 */

export interface CpuInfo {
    model: string;
    speed: number;
    times: {
        /** The number of milliseconds the CPU has spent in user mode. */
        user: number;
        /** The number of milliseconds the CPU has spent in nice mode. */
        nice: number;
        /** The number of milliseconds the CPU has spent in sys mode. */
        sys: number;
        /** The number of milliseconds the CPU has spent in idle mode. */
        idle: number;
        /** The number of milliseconds the CPU has spent in irq mode. */
        irq: number;
    };
}
export interface NetworkInterfaceBase {
    address: string;
    netmask: string;
    mac: string;
    internal: boolean;
    cidr: string | null;
}
export interface NetworkInterfaceInfoIPv4 extends NetworkInterfaceBase {
    family: "IPv4";
    scopeid?: undefined;
}
export interface NetworkInterfaceInfoIPv6 extends NetworkInterfaceBase {
    family: "IPv6";
    scopeid: number;
}
export interface UserInfo<T> {
    username: T;
    uid: number;
    gid: number;
    shell: T | null;
    homedir: T;
}
export type NetworkInterfaceInfo = NetworkInterfaceInfoIPv4 | NetworkInterfaceInfoIPv6;
/**
 * Returns the host name of the operating system as a string.
 * @since v0.3.3
 */
export function hostname(): string;
/**
 * Returns an array containing the 1, 5, and 15 minute load averages.
 *
 * The load average is a measure of system activity calculated by the operating
 * system and expressed as a fractional number.
 *
 * The load average is a Unix-specific concept. On Windows, the return value is
 * always `[0, 0, 0]`.
 * @since v0.3.3
 */
export function loadavg(): number[];
/**
 * Returns the system uptime in number of seconds.
 * @since v0.3.3
 */
export function uptime(): number;
/**
 * Returns the amount of free system memory in bytes as an integer.
 * @since v0.3.3
 */
export function freemem(): number;
/**
 * Returns the total amount of system memory in bytes as an integer.
 * @since v0.3.3
 */
export function totalmem(): number;
/**
 * Returns an array of objects containing information about each logical CPU core.
 * The array will be empty if no CPU information is available, such as if the `/proc` file system is unavailable.
 *
 * The properties included on each object include:
 *
 * ```js
 * [
 *   {
 *     model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
 *     speed: 2926,
 *     times: {
 *       user: 252020,
 *       nice: 0,
 *       sys: 30340,
 *       idle: 1070356870,
 *       irq: 0,
 *     },
 *   },
 *   {
 *     model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
 *     speed: 2926,
 *     times: {
 *       user: 306960,
 *       nice: 0,
 *       sys: 26980,
 *       idle: 1071569080,
 *       irq: 0,
 *     },
 *   },
 *   {
 *     model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
 *     speed: 2926,
 *     times: {
 *       user: 248450,
 *       nice: 0,
 *       sys: 21750,
 *       idle: 1070919370,
 *       irq: 0,
 *     },
 *   },
 *   {
 *     model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
 *     speed: 2926,
 *     times: {
 *       user: 256880,
 *       nice: 0,
 *       sys: 19430,
 *       idle: 1070905480,
 *       irq: 20,
 *     },
 *   },
 * ]
 * ```
 *
 * `nice` values are POSIX-only. On Windows, the `nice` values of all processors
 * are always 0.
 *
 * `os.cpus().length` should not be used to calculate the amount of parallelism
 * available to an application. Use {@link availableParallelism} for this purpose.
 * @since v0.3.3
 */
export function cpus(): CpuInfo[];
/**
 * Returns an estimate of the default amount of parallelism a program should use.
 * Always returns a value greater than zero.
 *
 * This function is a small wrapper about libuv's [`uv_available_parallelism()`](https://docs.libuv.org/en/v1.x/misc.html#c.uv_available_parallelism).
 * @since v19.4.0, v18.14.0
 */
export function availableParallelism(): number;
/**
 * Returns the operating system name as returned by [`uname(3)`](https://linux.die.net/man/3/uname). For example, it
 * returns `'Linux'` on Linux, `'Darwin'` on macOS, and `'Windows_NT'` on Windows.
 *
 * See [https://en.wikipedia.org/wiki/Uname#Examples](https://en.wikipedia.org/wiki/Uname#Examples) for additional information
 * about the output of running [`uname(3)`](https://linux.die.net/man/3/uname) on various operating systems.
 * @since v0.3.3
 */
export function type(): string;
/**
 * Returns the operating system as a string.
 *
 * On POSIX systems, the operating system release is determined by calling [`uname(3)`](https://linux.die.net/man/3/uname). On Windows, `GetVersionExW()` is used. See
 * [https://en.wikipedia.org/wiki/Uname#Examples](https://en.wikipedia.org/wiki/Uname#Examples) for more information.
 * @since v0.3.3
 */
export function release(): string;
/**
 * Returns an object containing network interfaces that have been assigned a
 * network address.
 *
 * Each key on the returned object identifies a network interface. The associated
 * value is an array of objects that each describe an assigned network address.
 *
 * The properties available on the assigned network address object include:
 *
 * ```js
 * {
 *   lo: [
 *     {
 *       address: '127.0.0.1',
 *       netmask: '255.0.0.0',
 *       family: 'IPv4',
 *       mac: '00:00:00:00:00:00',
 *       internal: true,
 *       cidr: '127.0.0.1/8'
 *     },
 *     {
 *       address: '::1',
 *       netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
 *       family: 'IPv6',
 *       mac: '00:00:00:00:00:00',
 *       scopeid: 0,
 *       internal: true,
 *       cidr: '::1/128'
 *     }
 *   ],
 *   eth0: [
 *     {
 *       address: '192.168.1.108',
 *       netmask: '255.255.255.0',
 *       family: 'IPv4',
 *       mac: '01:02:03:0a:0b:0c',
 *       internal: false,
 *       cidr: '192.168.1.108/24'
 *     },
 *     {
 *       address: 'fe80::a00:27ff:fe4e:66a1',
 *       netmask: 'ffff:ffff:ffff:ffff::',
 *       family: 'IPv6',
 *       mac: '01:02:03:0a:0b:0c',
 *       scopeid: 1,
 *       internal: false,
 *       cidr: 'fe80::a00:27ff:fe4e:66a1/64'
 *     }
 *   ]
 * }
 * ```
 * @since v0.6.0
 */
export function networkInterfaces(): Dict<NetworkInterfaceInfo[]>;
/**
 * Returns the string path of the current user's home directory.
 *
 * On POSIX, it uses the `$HOME` environment variable if defined. Otherwise it
 * uses the [effective UID](https://en.wikipedia.org/wiki/User_identifier#Effective_user_ID) to look up the user's home directory.
 *
 * On Windows, it uses the `USERPROFILE` environment variable if defined.
 * Otherwise it uses the path to the profile directory of the current user.
 * @since v2.3.0
 */
export function homedir(): string;
/**
 * Returns information about the currently effective user. On POSIX platforms,
 * this is typically a subset of the password file. The returned object includes
 * the `username`, `uid`, `gid`, `shell`, and `homedir`. On Windows, the `uid` and `gid` fields are `-1`, and `shell` is `null`.
 *
 * The value of `homedir` returned by `os.userInfo()` is provided by the operating
 * system. This differs from the result of `os.homedir()`, which queries
 * environment variables for the home directory before falling back to the
 * operating system response.
 *
 * Throws a [`SystemError`](https://nodejs.org/docs/latest-v22.x/api/errors.html#class-systemerror) if a user has no `username` or `homedir`.
 * @since v6.0.0
 */
export function userInfo(options: { encoding: "buffer" }): UserInfo<Buffer>;
export function userInfo(options?: { encoding: BufferEncoding }): UserInfo<string>;
export type SignalConstants = {
    [key in Signals]: number;
};
export namespace constants {
    export const UV_UDP_REUSEADDR: number;
    export namespace signals {}
    export const signals: SignalConstants;
    export namespace errno {
        export const E2BIG: number;
        export const EACCES: number;
        export const EADDRINUSE: number;
        export const EADDRNOTAVAIL: number;
        export const EAFNOSUPPORT: number;
        export const EAGAIN: number;
        export const EALREADY: number;
        export const EBADF: number;
        export const EBADMSG: number;
        export const EBUSY: number;
        export const ECANCELED: number;
        export const ECHILD: number;
        export const ECONNABORTED: number;
        export const ECONNREFUSED: number;
        export const ECONNRESET: number;
        export const EDEADLK: number;
        export const EDESTADDRREQ: number;
        export const EDOM: number;
        export const EDQUOT: number;
        export const EEXIST: number;
        export const EFAULT: number;
        export const EFBIG: number;
        export const EHOSTUNREACH: number;
        export const EIDRM: number;
        export const EILSEQ: number;
        export const EINPROGRESS: number;
        export const EINTR: number;
        export const EINVAL: number;
        export const EIO: number;
        export const EISCONN: number;
        export const EISDIR: number;
        export const ELOOP: number;
        export const EMFILE: number;
        export const EMLINK: number;
        export const EMSGSIZE: number;
        export const EMULTIHOP: number;
        export const ENAMETOOLONG: number;
        export const ENETDOWN: number;
        export const ENETRESET: number;
        export const ENETUNREACH: number;
        export const ENFILE: number;
        export const ENOBUFS: number;
        export const ENODATA: number;
        export const ENODEV: number;
        export const ENOENT: number;
        export const ENOEXEC: number;
        export const ENOLCK: number;
        export const ENOLINK: number;
        export const ENOMEM: number;
        export const ENOMSG: number;
        export const ENOPROTOOPT: number;
        export const ENOSPC: number;
        export const ENOSR: number;
        export const ENOSTR: number;
        export const ENOSYS: number;
        export const ENOTCONN: number;
        export const ENOTDIR: number;
        export const ENOTEMPTY: number;
        export const ENOTSOCK: number;
        export const ENOTSUP: number;
        export const ENOTTY: number;
        export const ENXIO: number;
        export const EOPNOTSUPP: number;
        export const EOVERFLOW: number;
        export const EPERM: number;
        export const EPIPE: number;
        export const EPROTO: number;
        export const EPROTONOSUPPORT: number;
        export const EPROTOTYPE: number;
        export const ERANGE: number;
        export const EROFS: number;
        export const ESPIPE: number;
        export const ESRCH: number;
        export const ESTALE: number;
        export const ETIME: number;
        export const ETIMEDOUT: number;
        export const ETXTBSY: number;
        export const EWOULDBLOCK: number;
        export const EXDEV: number;
        export const WSAEINTR: number;
        export const WSAEBADF: number;
        export const WSAEACCES: number;
        export const WSAEFAULT: number;
        export const WSAEINVAL: number;
        export const WSAEMFILE: number;
        export const WSAEWOULDBLOCK: number;
        export const WSAEINPROGRESS: number;
        export const WSAEALREADY: number;
        export const WSAENOTSOCK: number;
        export const WSAEDESTADDRREQ: number;
        export const WSAEMSGSIZE: number;
        export const WSAEPROTOTYPE: number;
        export const WSAENOPROTOOPT: number;
        export const WSAEPROTONOSUPPORT: number;
        export const WSAESOCKTNOSUPPORT: number;
        export const WSAEOPNOTSUPP: number;
        export const WSAEPFNOSUPPORT: number;
        export const WSAEAFNOSUPPORT: number;
        export const WSAEADDRINUSE: number;
        export const WSAEADDRNOTAVAIL: number;
        export const WSAENETDOWN: number;
        export const WSAENETUNREACH: number;
        export const WSAENETRESET: number;
        export const WSAECONNABORTED: number;
        export const WSAECONNRESET: number;
        export const WSAENOBUFS: number;
        export const WSAEISCONN: number;
        export const WSAENOTCONN: number;
        export const WSAESHUTDOWN: number;
        export const WSAETOOMANYREFS: number;
        export const WSAETIMEDOUT: number;
        export const WSAECONNREFUSED: number;
        export const WSAELOOP: number;
        export const WSAENAMETOOLONG: number;
        export const WSAEHOSTDOWN: number;
        export const WSAEHOSTUNREACH: number;
        export const WSAENOTEMPTY: number;
        export const WSAEPROCLIM: number;
        export const WSAEUSERS: number;
        export const WSAEDQUOT: number;
        export const WSAESTALE: number;
        export const WSAEREMOTE: number;
        export const WSASYSNOTREADY: number;
        export const WSAVERNOTSUPPORTED: number;
        export const WSANOTINITIALISED: number;
        export const WSAEDISCON: number;
        export const WSAENOMORE: number;
        export const WSAECANCELLED: number;
        export const WSAEINVALIDPROCTABLE: number;
        export const WSAEINVALIDPROVIDER: number;
        export const WSAEPROVIDERFAILEDINIT: number;
        export const WSASYSCALLFAILURE: number;
        export const WSASERVICE_NOT_FOUND: number;
        export const WSATYPE_NOT_FOUND: number;
        export const WSA_E_NO_MORE: number;
        export const WSA_E_CANCELLED: number;
        export const WSAEREFUSED: number;
    }
    export namespace dlopen {
        export const RTLD_LAZY: number;
        export const RTLD_NOW: number;
        export const RTLD_GLOBAL: number;
        export const RTLD_LOCAL: number;
        export const RTLD_DEEPBIND: number;
    }
    export namespace priority {
        export const PRIORITY_LOW: number;
        export const PRIORITY_BELOW_NORMAL: number;
        export const PRIORITY_NORMAL: number;
        export const PRIORITY_ABOVE_NORMAL: number;
        export const PRIORITY_HIGH: number;
        export const PRIORITY_HIGHEST: number;
    }
}
export const devNull: string;
/**
 * The operating system-specific end-of-line marker.
 * * `\n` on POSIX
 * * `\r\n` on Windows
 */
export const EOL: string;
/**
 * Returns the operating system CPU architecture for which the Node.js binary was
 * compiled. Possible values are `'arm'`, `'arm64'`, `'ia32'`, `'loong64'`, `'mips'`, `'mipsel'`, `'ppc'`, `'ppc64'`, `'riscv64'`, `'s390'`, `'s390x'`,
 * and `'x64'`.
 *
 * The return value is equivalent to [process.arch](https://nodejs.org/docs/latest-v22.x/api/process.html#processarch).
 * @since v0.5.0
 */
export function arch(): string;
/**
 * Returns a string identifying the kernel version.
 *
 * On POSIX systems, the operating system release is determined by calling [`uname(3)`](https://linux.die.net/man/3/uname). On Windows, `RtlGetVersion()` is used, and if it is not
 * available, `GetVersionExW()` will be used. See [https://en.wikipedia.org/wiki/Uname#Examples](https://en.wikipedia.org/wiki/Uname#Examples) for more information.
 * @since v13.11.0, v12.17.0
 */
export function version(): string;
/**
 * Returns a string identifying the operating system platform for which
 * the Node.js binary was compiled. The value is set at compile time.
 * Possible values are `'aix'`, `'darwin'`, `'freebsd'`, `'linux'`, `'openbsd'`, `'sunos'`, and `'win32'`.
 *
 * The return value is equivalent to `process.platform`.
 *
 * The value `'android'` may also be returned if Node.js is built on the Android
 * operating system. [Android support is experimental](https://github.com/nodejs/node/blob/HEAD/BUILDING.md#androidandroid-based-devices-eg-firefox-os).
 * @since v0.5.0
 */
export function platform(): Platform;
/**
 * Returns the machine type as a string, such as `arm`, `arm64`, `aarch64`, `mips`, `mips64`, `ppc64`, `ppc64le`, `s390`, `s390x`, `i386`, `i686`, `x86_64`.
 *
 * On POSIX systems, the machine type is determined by calling [`uname(3)`](https://linux.die.net/man/3/uname). On Windows, `RtlGetVersion()` is used, and if it is not
 * available, `GetVersionExW()` will be used. See [https://en.wikipedia.org/wiki/Uname#Examples](https://en.wikipedia.org/wiki/Uname#Examples) for more information.
 * @since v18.9.0, v16.18.0
 */
export function machine(): string;
/**
 * Returns the operating system's default directory for temporary files as a
 * string.
 * @since v0.9.9
 */
export function tmpdir(): string;
/**
 * Returns a string identifying the endianness of the CPU for which the Node.js
 * binary was compiled.
 *
 * Possible values are `'BE'` for big endian and `'LE'` for little endian.
 * @since v0.9.4
 */
export function endianness(): "BE" | "LE";
/**
 * Returns the scheduling priority for the process specified by `pid`. If `pid` is
 * not provided or is `0`, the priority of the current process is returned.
 * @since v10.10.0
 * @param [pid=0] The process ID to retrieve scheduling priority for.
 */
export function getPriority(pid?: number): number;
/**
 * Attempts to set the scheduling priority for the process specified by `pid`. If `pid` is not provided or is `0`, the process ID of the current process is used.
 *
 * The `priority` input must be an integer between `-20` (high priority) and `19` (low priority). Due to differences between Unix priority levels and Windows
 * priority classes, `priority` is mapped to one of six priority constants in `os.constants.priority`. When retrieving a process priority level, this range
 * mapping may cause the return value to be slightly different on Windows. To avoid
 * confusion, set `priority` to one of the priority constants.
 *
 * On Windows, setting priority to `PRIORITY_HIGHEST` requires elevated user
 * privileges. Otherwise the set priority will be silently reduced to `PRIORITY_HIGH`.
 * @since v10.10.0
 * @param [pid=0] The process ID to set scheduling priority for.
 * @param priority The scheduling priority to assign to the process.
 */
export function setPriority(priority: number): void;
export function setPriority(pid: number, priority: number): void;