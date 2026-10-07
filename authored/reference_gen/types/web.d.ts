// Copyright 2018-2026 the Deno authors. MIT license.

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="deno.net" />

/** Deno provides extra properties on `import.meta`. These are included here
 * to ensure that these are still available when using the Deno namespace in
 * conjunction with other type libs, like `dom`.
 *
 * @category Platform
 */
interface ImportMeta {
  /** A string representation of the fully qualified module URL. When the
   * module is loaded locally, the value will be a file URL (e.g.
   * `file:///path/module.ts`).
   *
   * You can also parse the string as a URL to determine more information about
   * how the current module was loaded. For example to determine if a module was
   * local or not:
   *
   * ```ts
   * const url = new URL(import.meta.url);
   * if (url.protocol === "file:") {
   *   console.log("this module was loaded locally");
   * }
   * ```
   */
  url: string;

  /** The absolute path of the current module.
   *
   * This property is only provided for local modules (ie. using `file://` URLs).
   *
   * Example:
   * ```
   * // Unix
   * console.log(import.meta.filename); // /home/alice/my_module.ts
   *
   * // Windows
   * console.log(import.meta.filename); // C:\alice\my_module.ts
   * ```
   */
  filename?: string;

  /** The absolute path of the directory containing the current module.
   *
   * This property is only provided for local modules (ie. using `file://` URLs).
   *
   * * Example:
   * ```
   * // Unix
   * console.log(import.meta.dirname); // /home/alice
   *
   * // Windows
   * console.log(import.meta.dirname); // C:\alice
   * ```
   */
  dirname?: string;

  /** A flag that indicates if the current module is the main module that was
   * called when starting the program under Deno.
   *
   * ```ts
   * if (import.meta.main) {
   *   // this was loaded as the main module, maybe do some bootstrapping
   * }
   * ```
   */
  main: boolean;

  /** A function that returns resolved specifier as if it would be imported
   * using `import(specifier)`.
   *
   * ```ts
   * console.log(import.meta.resolve("./foo.js"));
   * // file:///dev/foo.js
   * ```
   */
  resolve(specifier: string): string;
}

/** Deno supports [User Timing Level 3](https://w3c.github.io/user-timing)
 * which is not widely supported yet in other runtimes.
 *
 * Check out the
 * [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
 * documentation on MDN for further information about how to use the API.
 *
 * @category Performance
 */
interface Performance {
  /** Stores a timestamp with the associated name (a "mark"). */
  mark(markName: string, options?: PerformanceMarkOptions): PerformanceMark;

  /** Stores the `DOMHighResTimeStamp` duration between two marks along with the
   * associated name (a "measure"). */
  measure(
    measureName: string,
    options?: PerformanceMeasureOptions,
  ): PerformanceMeasure;
}

/**
 * Options which are used in conjunction with `performance.mark`. Check out the
 * MDN
 * [`performance.mark()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark#markoptions)
 * documentation for more details.
 *
 * @category Performance
 */
interface PerformanceMarkOptions {
  /** Metadata to be included in the mark. */
  // deno-lint-ignore no-explicit-any
  detail?: any;

  /** Timestamp to be used as the mark time. */
  startTime?: number;
}

/**
 * Options which are used in conjunction with `performance.measure`. Check out the
 * MDN
 * [`performance.mark()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure#measureoptions)
 * documentation for more details.
 *
 * @category Performance
 */
interface PerformanceMeasureOptions {
  /** Metadata to be included in the measure. */
  // deno-lint-ignore no-explicit-any
  detail?: any;

  /** Timestamp to be used as the start time or string to be used as start
   * mark. */
  start?: string | number;

  /** Duration between the start and end times. */
  duration?: number;

  /** Timestamp to be used as the end time or string to be used as end mark. */
  end?: string | number;
}

// Copyright 2018-2026 the Deno authors. MIT license.

// deno-lint-ignore-file no-explicit-any

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

/**
 * The Console interface provides methods for logging information to the console,
 * as well as other utility methods for debugging and inspecting code.
 * Methods include logging, debugging, and timing functionality.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/console
 *
 * @category I/O
 */

interface Console {
  /**
   * Tests that an expression is true. If not, logs an error message
   * @param condition The expression to test for truthiness
   * @param data Additional arguments to be printed if the assertion fails
   * @example
   * ```ts
   * console.assert(1 === 1, "This won't show");
   * console.assert(1 === 2, "This will show an error");
   * ```
   */
  assert(condition?: boolean, ...data: any[]): void;

  /**
   * Clears the console if the environment allows it
   * @example
   * ```ts
   * console.clear();
   * ```
   */
  clear(): void;

  /**
   * Maintains an internal counter for a given label, incrementing it each time the method is called
   * @param label The label to count. Defaults to 'default'
   * @example
   * ```ts
   * console.count('myCounter');
   * console.count('myCounter'); // Will show: myCounter: 2
   * ```
   */
  count(label?: string): void;

  /**
   * Resets the counter for a given label
   * @param label The label to reset. Defaults to 'default'
   * @example
   * ```ts
   * console.count('myCounter');
   * console.countReset('myCounter'); // Resets to 0
   * ```
   */
  countReset(label?: string): void;

  /**
   * Outputs a debugging message to the console
   * @param data Values to be printed to the console
   * @example
   * ```ts
   * console.debug('Debug message', { detail: 'some data' });
   * ```
   */
  debug(...data: any[]): void;

  /**
   * Displays a list of the properties of a specified object
   * @param item Object to display
   * @param options Formatting options
   * @example
   * ```ts
   * console.dir({ name: 'object', value: 42 }, { depth: 1 });
   * ```
   */
  dir(item?: any, options?: any): void;

  /**
   * @ignore
   */
  dirxml(...data: any[]): void;

  /**
   * Outputs an error message to the console.
   * This method routes the output to stderr,
   * unlike other console methods that route to stdout.
   * @param data Values to be printed to the console
   * @example
   * ```ts
   * console.error('Error occurred:', new Error('Something went wrong'));
   * ```
   */
  error(...data: any[]): void;

  /**
   * Creates a new inline group in the console, indenting subsequent console messages
   * @param data Labels for the group
   * @example
   * ```ts
   * console.group('Group 1');
   * console.log('Inside group 1');
   * console.groupEnd();
   * ```
   */
  group(...data: any[]): void;

  /**
   * Creates a new inline group in the console that is initially collapsed
   * @param data Labels for the group
   * @example
   * ```ts
   * console.groupCollapsed('Details');
   * console.log('Hidden until expanded');
   * console.groupEnd();
   * ```
   */
  groupCollapsed(...data: any[]): void;

  /**
   * Exits the current inline group in the console
   * @example
   * ```ts
   * console.group('Group');
   * console.log('Grouped message');
   * console.groupEnd();
   * ```
   */
  groupEnd(): void;

  /**
   * Outputs an informational message to the console
   * @param data Values to be printed to the console
   * @example
   * ```ts
   * console.info('Application started', { version: '1.0.0' });
   * ```
   */
  info(...data: any[]): void;

  /**
   * Outputs a message to the console
   * @param data Values to be printed to the console
   * @example
   * ```ts
   * console.log('Hello', 'World', 123);
   * ```
   */
  log(...data: any[]): void;

  /**
   * Displays tabular data as a table
   * @param tabularData Data to be displayed in table format
   * @param properties Array of property names to be displayed
   * @example
   * ```ts
   * console.table([
   *   { name: 'John', age: 30 },
   *   { name: 'Jane', age: 25 }
   * ]);
   * ```
   */
  table(tabularData?: any, properties?: string[]): void;

  /**
   * Starts a timer you can use to track how long an operation takes
   * @param label Timer label. Defaults to 'default'
   * @example
   * ```ts
   * console.time('operation');
   * // ... some code
   * console.timeEnd('operation');
   * ```
   */
  time(label?: string): void;

  /**
   * Stops a timer that was previously started
   * @param label Timer label to stop. Defaults to 'default'
   * @example
   * ```ts
   * console.time('operation');
   * // ... some code
   * console.timeEnd('operation'); // Prints: operation: 1234ms
   * ```
   */
  timeEnd(label?: string): void;

  /**
   * Logs the current value of a timer that was previously started
   * @param label Timer label
   * @param data Additional data to log
   * @example
   * ```ts
   * console.time('process');
   * // ... some code
   * console.timeLog('process', 'Checkpoint A');
   * ```
   */
  timeLog(label?: string, ...data: any[]): void;

  /**
   * Outputs a stack trace to the console
   * @param data Values to be printed to the console
   * @example
   * ```ts
   * console.trace('Trace message');
   * ```
   */
  trace(...data: any[]): void;

  /**
   * Outputs a warning message to the console
   * @param data Values to be printed to the console
   * @example
   * ```ts
   * console.warn('Deprecated feature used');
   * ```
   */
  warn(...data: any[]): void;

  /**
   * Adds a marker to the DevTools Performance panel
   * @param label Label for the timestamp
   * @example
   * ```ts
   * console.timeStamp('Navigation Start');
   * ```
   */
  timeStamp(label?: string): void;

  /**
   * Starts recording a performance profile
   * @param label Profile label
   * @example
   * ```ts
   * console.profile('Performance Profile');
   * // ... code to profile
   * console.profileEnd('Performance Profile');
   * ```
   */
  profile(label?: string): void;

  /**
   * Stops recording a performance profile
   * @param label Profile label to stop
   * @example
   * ```ts
   * console.profile('Performance Profile');
   * // ... code to profile
   * console.profileEnd('Performance Profile');
   * ```
   */
  profileEnd(label?: string): void;
}

// Copyright 2018-2026 the Deno authors. MIT license.

// deno-lint-ignore-file no-explicit-any no-var

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

/**
 * Iterator for the URLSearchParams class, used to iterate over key-value pairs in search parameters.
 *
 * @example
 * ```ts
 * const url = new URL('https://example.org/path?a=1&b=2');
 * const queryString = url.search.substring(1); // Remove the leading '?'
 * const params = new URLSearchParams(queryString);
 * const iterator = params.entries();
 * console.log(iterator.next().value); // ['a', '1']
 * console.log(iterator.next().value); // ['b', '2']
 * ```
 *
 * @category URL
 */
interface URLSearchParamsIterator<T>
  extends IteratorObject<T, BuiltinIteratorReturn, unknown> {
  [Symbol.iterator](): URLSearchParamsIterator<T>;
}

/**
 * URLSearchParams provides methods for working with the query string of a URL.
 *
 * Use this interface to:
 * - Parse query parameters from URLs
 * - Build and modify query strings
 * - Handle form data (when used with FormData)
 * - Safely encode/decode URL parameter values
 *
 * @category URL
 */
interface URLSearchParams {
  /** Appends a specified key/value pair as a new search parameter.
   *
   * ```ts
   * let searchParams = new URLSearchParams();
   * searchParams.append('name', 'first');
   * searchParams.append('name', 'second');
   * ```
   */
  append(name: string, value: string): void;

  /** Deletes search parameters that match a name, and optional value,
   * from the list of all search parameters.
   *
   * ```ts
   * let searchParams = new URLSearchParams([['name', 'value']]);
   * searchParams.delete('name');
   * searchParams.delete('name', 'value');
   * ```
   */
  delete(name: string, value?: string): void;

  /** Returns all the values associated with a given search parameter
   * as an array.
   *
   * ```ts
   * searchParams.getAll('name');
   * ```
   */
  getAll(name: string): string[];

  /** Returns the first value associated to the given search parameter.
   *
   * ```ts
   * searchParams.get('name');
   * ```
   */
  get(name: string): string | null;

  /** Returns a boolean value indicating if a given parameter,
   * or parameter and value pair, exists.
   *
   * ```ts
   * searchParams.has('name');
   * searchParams.has('name', 'value');
   * ```
   */
  has(name: string, value?: string): boolean;

  /** Sets the value associated with a given search parameter to the
   * given value. If there were several matching values, this method
   * deletes the others. If the search parameter doesn't exist, this
   * method creates it.
   *
   * ```ts
   * searchParams.set('name', 'value');
   * ```
   */
  set(name: string, value: string): void;

  /** Sort all key/value pairs contained in this object in place and
   * return undefined. The sort order is according to Unicode code
   * points of the keys.
   *
   * ```ts
   * searchParams.sort();
   * ```
   */
  sort(): void;

  /** Calls a function for each element contained in this object in
   * place and return undefined. Optionally accepts an object to use
   * as this when executing callback as second argument.
   *
   * ```ts
   * const params = new URLSearchParams([["a", "b"], ["c", "d"]]);
   * params.forEach((value, key, parent) => {
   *   console.log(value, key, parent);
   * });
   * ```
   */
  forEach(
    callbackfn: (value: string, key: string, parent: this) => void,
    thisArg?: any,
  ): void;

  /** Returns an iterator allowing to go through all keys contained
   * in this object.
   *
   * ```ts
   * const params = new URLSearchParams([["a", "b"], ["c", "d"]]);
   * for (const key of params.keys()) {
   *   console.log(key);
   * }
   * ```
   */
  keys(): URLSearchParamsIterator<string>;

  /** Returns an iterator allowing to go through all values contained
   * in this object.
   *
   * ```ts
   * const params = new URLSearchParams([["a", "b"], ["c", "d"]]);
   * for (const value of params.values()) {
   *   console.log(value);
   * }
   * ```
   */
  values(): URLSearchParamsIterator<string>;

  /** Returns an iterator allowing to go through all key/value
   * pairs contained in this object.
   *
   * ```ts
   * const params = new URLSearchParams([["a", "b"], ["c", "d"]]);
   * for (const [key, value] of params.entries()) {
   *   console.log(key, value);
   * }
   * ```
   */
  entries(): URLSearchParamsIterator<[string, string]>;

  /** Returns an iterator allowing to go through all key/value
   * pairs contained in this object.
   *
   * ```ts
   * const params = new URLSearchParams([["a", "b"], ["c", "d"]]);
   * for (const [key, value] of params) {
   *   console.log(key, value);
   * }
   * ```
   */
  [Symbol.iterator](): URLSearchParamsIterator<[string, string]>;

  /** Returns a query string suitable for use in a URL.
   *
   * ```ts
   * searchParams.toString();
   * ```
   */
  toString(): string;

  /** Contains the number of search parameters
   *
   * ```ts
   * searchParams.size
   * ```
   */
  readonly size: number;
}

/** The URLSearchParams interface defines utility methods to work with the
 * query string of a URL. An object implementing URLSearchParams can directly
 * be used in a `for...of` structure to iterate over key/value pairs in the
 * same order as they appear in the query string.
 *
 * @see https://developer.mozilla.org/docs/Web/API/URLSearchParams
 *
 * @category URL
 */
declare var URLSearchParams: {
  readonly prototype: URLSearchParams;
  /**
   * Creates a new URLSearchParams object for parsing query strings.
   *
   * URLSearchParams is Deno's built-in query string parser, providing a standard
   * way to parse, manipulate, and stringify URL query parameters. Instead of manually
   * parsing query strings with regex or string operations, use this API for robust
   * handling of URL query parameters.
   *
   * @example
   * ```ts
   * // From a URL object's query string (recommended approach for parsing query strings in URLs)
   * const url = new URL('https://example.org/path?foo=bar&baz=qux');
   * const params = url.searchParams;  // No need to manually extract the query string
   * console.log(params.get('foo'));  // Logs "bar"
   *
   * // Manually parsing a query string from a URL
   * const urlString = 'https://example.org/path?foo=bar&baz=qux';
   * const queryString = urlString.split('?')[1];  // Extract query string part
   * const params2 = new URLSearchParams(queryString);
   * console.log(params2.get('foo'));  // Logs "bar"
   *
   * // Empty search parameters
   * const params3 = new URLSearchParams();
   * console.log(params3.toString());  // Logs ""
   *
   * // From a string
   * const params4 = new URLSearchParams("foo=bar&baz=qux");
   * console.log(params4.get("foo"));  // Logs "bar"
   *
   * // From an array of pairs
   * const params5 = new URLSearchParams([["foo", "1"], ["bar", "2"]]);
   * console.log(params5.toString());  // Logs "foo=1&bar=2"
   *
   * // From a record object
   * const params6 = new URLSearchParams({"foo": "1", "bar": "2"});
   * console.log(params6.toString());  // Logs "foo=1&bar=2"
   * ```
   */
  new (
    init?:
      | Iterable<string[]>
      | Record<string, string>
      | string
      | URLSearchParams,
  ): URLSearchParams;
};

/** The URL interface represents an object providing static methods used for
 * creating, parsing, and manipulating URLs in Deno.
 *
 * Use the URL API for safely parsing, constructing, normalizing, and encoding URLs.
 * This is the preferred way to work with URLs in Deno rather than manual string
 * manipulation which can lead to errors and security issues.
 *
 * @see https://developer.mozilla.org/docs/Web/API/URL
 *
 * @category URL
 */
interface URL {
  /**
   * The hash property of the URL interface is a string that starts with a `#` and is followed by the fragment identifier of the URL.
   * It returns an empty string if the URL does not contain a fragment identifier.
   *
   * @example
   * ```ts
   * const myURL = new URL('https://example.org/foo#bar');
   * console.log(myURL.hash);  // Logs "#bar"
   *
   * const myOtherURL = new URL('https://example.org');
   * console.log(myOtherURL.hash);  // Logs ""
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/hash
   */
  hash: string;

  /**
   * The `host` property of the URL interface is a string that includes the {@linkcode URL.hostname} and the {@linkcode URL.port} if one is specified in the URL includes by including a `:` followed by the port number.
   *
   * @example
   * ```ts
   * const myURL = new URL('https://example.org/foo');
   * console.log(myURL.host);  // Logs "example.org"
   *
   * const myOtherURL = new URL('https://example.org:8080/foo');
   * console.log(myOtherURL.host);  // Logs "example.org:8080"
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/host
   */
  host: string;

  /**
   * The `hostname` property of the URL interface is a string that represents the fully qualified domain name of the URL.
   *
   * @example
   * ```ts
   * const myURL = new URL('https://foo.example.org/bar');
   * console.log(myURL.hostname);  // Logs "foo.example.org"
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/hostname
   */
  hostname: string;

  /**
   * The `href` property of the URL interface is a string that represents the complete URL.
   *
   * @example
   * ```ts
   * const myURL = new URL('https://foo.example.org/bar?baz=qux#quux');
   * console.log(myURL.href);  // Logs "https://foo.example.org/bar?baz=qux#quux"
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/href
   */
  href: string;

  /**
   * The `toString()` method of the URL interface returns a string containing the complete URL.
   *
   * @example
   * ```ts
   * const myURL = new URL('https://foo.example.org/bar');
   * console.log(myURL.toString());  // Logs "https://foo.example.org/bar"
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/toString
   */
  toString(): string;

  /**
   * The `origin` property of the URL interface is a string that represents the origin of the URL, that is the {@linkcode URL.protocol}, {@linkcode URL.host}, and {@linkcode URL.port}.
   *
   * @example
   * ```ts
   * const myURL = new URL('https://foo.example.org/bar');
   * console.log(myURL.origin);  // Logs "https://foo.example.org"
   *
   * const myOtherURL = new URL('https://example.org:8080/foo');
   * console.log(myOtherURL.origin);  // Logs "https://example.org:8080"
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/origin
   */
  readonly origin: string;

  /**
   * The `password` property of the URL interface is a string that represents the password specified in the URL.
   *
   * @example
   * ```ts
   * const myURL = new URL('https://someone:somepassword@example.org/baz');
   * console.log(myURL.password);  // Logs "somepassword"
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/password
   */
  password: string;

  /**
   * The `pathname` property of the URL interface is a string that represents the path of the URL.
   *
   * @example
   * ```ts
   * const myURL = new URL('https://example.org/foo/bar');
   * console.log(myURL.pathname);  // Logs "/foo/bar"
   *
   * const myOtherURL = new URL('https://example.org');
   * console.log(myOtherURL.pathname);  // Logs "/"
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/pathname
   */
  pathname: string;

  /**
   * The `port` property of the URL interface is a string that represents the port of the URL if an explicit port has been specified in the URL.
   *
   * @example
   * ```ts
   * const myURL = new URL('https://example.org:8080/foo');
   * console.log(myURL.port);  // Logs "8080"
   *
   * const myOtherURL = new URL('https://example.org/foo');
   * console.log(myOtherURL.port);  // Logs ""
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/port
   */
  port: string;

  /**
   * The `protocol` property of the URL interface is a string that represents the protocol scheme of the URL and includes a trailing `:`.
   *
   * @example
   * ```ts
   * const myURL = new URL('https://example.org/foo');
   * console.log(myURL.protocol);  // Logs "https:"
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/protocol
   */
  protocol: string;

  /**
   * The `search` property of the URL interface is a string that represents the search string, or the query string, of the URL.
   * This includes the `?` character and the but excludes identifiers within the represented resource such as the {@linkcode URL.hash}. More granular control can be found using {@linkcode URL.searchParams} property.
   *
   * @example
   * ```ts
   * const myURL = new URL('https://example.org/foo?bar=baz');
   * console.log(myURL.search);  // Logs "?bar=baz"
   *
   * const myOtherURL = new URL('https://example.org/foo?bar=baz#quux');
   * console.log(myOtherURL.search);  // Logs "?bar=baz"
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/search
   */
  search: string;

  /**
   * The `searchParams` property of the URL interface provides a direct interface to
   * query parameters through a {@linkcode URLSearchParams} object.
   *
   * This property offers a convenient way to:
   * - Parse URL query parameters
   * - Manipulate query strings
   * - Add, modify, or delete URL parameters
   * - Work with form data in a URL-encoded format
   * - Handle query string encoding/decoding automatically
   *
   * @example
   * ```ts
   * // Parse and access query parameters from a URL
   * const myURL = new URL('https://example.org/search?term=deno&page=2&sort=desc');
   * const params = myURL.searchParams;
   *
   * console.log(params.get('term'));  // Logs "deno"
   * console.log(params.get('page'));  // Logs "2"
   *
   * // Check if a parameter exists
   * console.log(params.has('sort'));  // Logs true
   *
   * // Add or modify parameters (automatically updates the URL)
   * params.append('filter', 'recent');
   * params.set('page', '3');
   * console.log(myURL.href);  // URL is updated with new parameters
   *
   * // Remove a parameter
   * params.delete('sort');
   *
   * // Iterate over all parameters
   * for (const [key, value] of params) {
   *   console.log(`${key}: ${value}`);
   * }
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/searchParams
   */
  readonly searchParams: URLSearchParams;

  /**
   * The `username` property of the URL interface is a string that represents the username of the URL.
   *
   * @example
   * ```ts
   * const myURL = new URL('https://someone:somepassword@example.org/baz');
   * console.log(myURL.username);  // Logs "someone"
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/username
   */
  username: string;

  /**
   * The `toJSON()` method of the URL interface returns a JSON representation of the URL.
   *
   * @example
   * ```ts
   * const myURL = new URL('https://example.org/foo');
   * console.log(myURL.toJSON());   // Logs "https://example.org/foo"
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/toJSON
   */
  toJSON(): string;
}

/** The URL interface represents an object providing static methods used for
 * creating, parsing, and manipulating URLs.
 *
 * @see https://developer.mozilla.org/docs/Web/API/URL
 *
 * @category URL
 */
declare var URL: {
  readonly prototype: URL;
  /**
   * Creates a new URL object by parsing the specified URL string with an optional base URL.
   * Throws a TypeError If the URL is invalid or if a relative URL is provided without a base.
   *
   * Use this to parse and validate URLs safely. Use this instead of string
   * manipulation to ensure correct URL handling, proper encoding, and protection against
   * security issues like path traversal attacks.
   *
   * @example
   * ```ts
   * // Creating a URL from an absolute URL string
   * const url1 = new URL('https://example.org/foo');
   * console.log(url1.href);  // Logs "https://example.org/foo"
   *
   * // Creating a URL from a relative URL string with a base URL
   * const url2 = new URL('/bar', 'https://example.org');
   * console.log(url2.href);  // Logs "https://example.org/bar"
   *
   * // Joining path segments safely (prevents path traversal)
   * const baseUrl = 'https://api.example.com/v1';
   * const userInput = '../secrets'; // Potentially malicious input
   * const safeUrl = new URL(userInput, baseUrl);
   * console.log(safeUrl.href); // Correctly resolves to "https://api.example.com/secrets"
   *
   * // Constructing URLs with proper encoding
   * const search = 'query with spaces';
   * const url3 = new URL('https://example.org/search');
   * url3.searchParams.set('q', search); // Automatically handles URL encoding
   * console.log(url3.href); // "https://example.org/search?q=query+with+spaces"
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/URL
   */
  new (url: string | URL, base?: string | URL): URL;

  /**
   * Parses a URL string or URL object and returns a URL object.
   *
   * @example
   * ```ts
   * const myURL = URL.parse('https://example.org');
   * console.log(myURL.href);  // Logs "https://example.org/"
   * console.log(myURL.hostname);  // Logs "example.org"
   * console.log(myURL.pathname);  // Logs "/"
   * console.log(myURL.protocol);  // Logs "https:"
   *
   * const baseURL = new URL('https://example.org');
   * const myNewURL = URL.parse('/foo', baseURL);
   * console.log(myNewURL.href);  // Logs "https://example.org/foo"
   * console.log(myNewURL.hostname);  // Logs "example.org"
   * console.log(myNewURL.pathname);  // Logs "/foo"
   * console.log(myNewURL.protocol);  // Logs "https:"
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/parse_static
   */
  parse(url: string | URL, base?: string | URL): URL | null;

  /**
   * Returns a boolean value indicating if a URL string is valid and can be parsed.
   *
   * @example
   * ```ts
   * // Check if an absolute URL string is valid
   * console.log(URL.canParse('https://example.org'));  // Logs true
   * console.log(URL.canParse('https:://example.org'));  // Logs false
   *
   * // Check if a relative URL string with a base is valid
   * console.log(URL.canParse('/foo', 'https://example.org'));  // Logs true
   * console.log(URL.canParse('/foo', 'https:://example.org'));  // Logs false
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/canParse_static
   */
  canParse(url: string | URL, base?: string | URL): boolean;

  /**
   * Creates a unique, temporary URL that represents a given Blob, File, or MediaSource object.
   *
   * This method is particularly useful for:
   * - Creating URLs for dynamically generated content
   * - Working with blobs in a browser context
   * - Creating workers from dynamically generated code
   * - Setting up temporary URL references for file downloads
   *
   * Note: Always call URL.revokeObjectURL() when you're done using the URL to prevent memory leaks.
   *
   * @example
   * ```ts
   * // Create a URL string for a Blob
   * const blob = new Blob(["Hello, world!"], { type: "text/plain" });
   * const url = URL.createObjectURL(blob);
   * console.log(url);  // Logs something like "blob:null/1234-5678-9101-1121"
   *
   * // Dynamic web worker creation in Deno
   * const workerCode = `
   *   self.onmessage = (e) => {
   *     self.postMessage(e.data.toUpperCase());
   *   };
   * `;
   * const workerBlob = new Blob([workerCode], { type: "application/javascript" });
   * const workerUrl = URL.createObjectURL(workerBlob);
   * const worker = new Worker(workerUrl, { type: "module" });
   *
   * worker.onmessage = (e) => console.log(e.data);
   * worker.postMessage("hello from deno");
   *
   * // Always revoke when done to prevent memory leaks
   * URL.revokeObjectURL(workerUrl);
   * ```
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/createObjectURL_static
   */
  createObjectURL(blob: Blob): string;

  /**
   * Revokes a previously created object URL, freeing the memory associated with it.
   *
   * Important for memory management in applications that create dynamic URLs.
   * Once an object URL is revoked:
   * - It can no longer be used to fetch the content it referenced
   * - The browser/runtime is allowed to release the memory or resources associated with it
   * - Workers created via the URL will continue to run, but the URL becomes invalid for new creations
   *
   * For security and performance in Deno applications, always revoke object URLs as soon as
   * they're no longer needed, especially when processing large files or generating many URLs.
   *
   * @see https://developer.mozilla.org/docs/Web/API/URL/revokeObjectURL_static
   */
  revokeObjectURL(url: string): void;
};

/** @category URL */
interface URLPatternInit {
  protocol?: string;
  username?: string;
  password?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  search?: string;
  hash?: string;
  baseURL?: string;
}

/** @category URL */
type URLPatternInput = string | URLPatternInit;

/** @category URL */
interface URLPatternComponentResult {
  input: string;
  groups: Record<string, string | undefined>;
}

/** `URLPatternResult` is the object returned from `URLPattern.exec`.
 *
 * @category URL
 */
interface URLPatternResult {
  /** The inputs provided when matching. */
  inputs: [URLPatternInit] | [URLPatternInit, string];

  /** The matched result for the `protocol` matcher. */
  protocol: URLPatternComponentResult;
  /** The matched result for the `username` matcher. */
  username: URLPatternComponentResult;
  /** The matched result for the `password` matcher. */
  password: URLPatternComponentResult;
  /** The matched result for the `hostname` matcher. */
  hostname: URLPatternComponentResult;
  /** The matched result for the `port` matcher. */
  port: URLPatternComponentResult;
  /** The matched result for the `pathname` matcher. */
  pathname: URLPatternComponentResult;
  /** The matched result for the `search` matcher. */
  search: URLPatternComponentResult;
  /** The matched result for the `hash` matcher. */
  hash: URLPatternComponentResult;
}

/**
 * Options for the {@linkcode URLPattern} constructor.
 *
 * @category URL
 */
interface URLPatternOptions {
  /**
   * Enables case-insensitive matching.
   *
   * @default {false}
   */
  ignoreCase: boolean;
}

/**
 * The URLPattern API provides a web platform primitive for matching URLs based
 * on a convenient pattern syntax.
 *
 * Common use cases for URLPattern include:
 * - Building routers for web applications
 * - Pattern-matching URLs for middleware
 * - Extracting parameters from URL paths
 * - URL-based feature toggles
 * - Routing in serverless and edge functions
 *
 * The syntax is based on path-to-regexp, supporting wildcards, named capture groups,
 * regular groups, and group modifiers - similar to Express.js route patterns.
 *
 * @example
 * ```ts
 * // Basic routing with URLPattern (similar to Express.js)
 * const routes = [
 *   new URLPattern({ pathname: "/users" }),
 *   new URLPattern({ pathname: "/users/:id" }),
 *   new URLPattern({ pathname: "/products/:category/:id?" }),
 * ];
 *
 * // Check incoming request against routes
 * function handleRequest(req: Request) {
 *   const url = new URL(req.url);
 *
 *   for (const route of routes) {
 *     const match = route.exec(url);
 *     if (match) {
 *       // Extract parameters from the URL
 *       const params = match.pathname.groups;
 *       return new Response(`Matched: ${JSON.stringify(params)}`);
 *     }
 *   }
 *
 *   return new Response("Not found", { status: 404 });
 * }
 * ```
 *
 * @example
 * ```ts
 * // Matching different URL parts
 * const apiPattern = new URLPattern({
 *   protocol: "https",
 *   hostname: "api.example.com",
 *   pathname: "/v:version/:resource/:id?",
 *   search: "*", // Match any query string
 * });
 *
 * const match = apiPattern.exec("https://api.example.com/v1/users/123?format=json");
 * if (match) {
 *   console.log(match.pathname.groups.version); // "1"
 *   console.log(match.pathname.groups.resource); // "users"
 *   console.log(match.pathname.groups.id); // "123"
 * }
 * ```
 *
 * @category URL
 */
interface URLPattern {
  /**
   * Test if the given input matches the stored pattern.
   *
   * The input can either be provided as an absolute URL string with an optional base,
   * relative URL string with a required base, or as individual components
   * in the form of an `URLPatternInit` object.
   *
   * ```ts
   * const pattern = new URLPattern("https://example.com/books/:id");
   *
   * // Test an absolute url string.
   * console.log(pattern.test("https://example.com/books/123")); // true
   *
   * // Test a relative url with a base.
   * console.log(pattern.test("/books/123", "https://example.com")); // true
   *
   * // Test an object of url components.
   * console.log(pattern.test({ pathname: "/books/123" })); // true
   * ```
   */
  test(input: URLPatternInput, baseURL?: string): boolean;

  /**
   * Match the given input against the stored pattern.
   *
   * The input can either be provided as an absolute URL string with an optional base,
   * relative URL string with a required base, or as individual components
   * in the form of an `URLPatternInit` object.
   *
   * ```ts
   * const pattern = new URLPattern("https://example.com/books/:id");
   *
   * // Match an absolute url string.
   * let match = pattern.exec("https://example.com/books/123");
   * console.log(match.pathname.groups.id); // 123
   *
   * // Match a relative url with a base.
   * match = pattern.exec("/books/123", "https://example.com");
   * console.log(match.pathname.groups.id); // 123
   *
   * // Match an object of url components.
   * match = pattern.exec({ pathname: "/books/123" });
   * console.log(match.pathname.groups.id); // 123
   * ```
   */
  exec(input: URLPatternInput, baseURL?: string): URLPatternResult | null;

  /** The pattern string for the `protocol`. */
  readonly protocol: string;
  /** The pattern string for the `username`. */
  readonly username: string;
  /** The pattern string for the `password`. */
  readonly password: string;
  /** The pattern string for the `hostname`. */
  readonly hostname: string;
  /** The pattern string for the `port`. */
  readonly port: string;
  /** The pattern string for the `pathname`. */
  readonly pathname: string;
  /** The pattern string for the `search`. */
  readonly search: string;
  /** The pattern string for the `hash`. */
  readonly hash: string;

  /** Whether or not any of the specified groups use regexp groups. */
  readonly hasRegExpGroups: boolean;
}

/**
 * The URLPattern API provides a web platform primitive for matching URLs based
 * on a convenient pattern syntax.
 *
 * The syntax is based on path-to-regexp. Wildcards, named capture groups,
 * regular groups, and group modifiers are all supported.
 *
 * ```ts
 * // Specify the pattern as structured data.
 * const pattern = new URLPattern({ pathname: "/users/:user" });
 * const match = pattern.exec("https://blog.example.com/users/joe");
 * console.log(match.pathname.groups.user); // joe
 * ```
 *
 * ```ts
 * // Specify a fully qualified string pattern.
 * const pattern = new URLPattern("https://example.com/books/:id");
 * console.log(pattern.test("https://example.com/books/123")); // true
 * console.log(pattern.test("https://deno.land/books/123")); // false
 * ```
 *
 * ```ts
 * // Specify a relative string pattern with a base URL.
 * const pattern = new URLPattern("/article/:id", "https://blog.example.com");
 * console.log(pattern.test("https://blog.example.com/article")); // false
 * console.log(pattern.test("https://blog.example.com/article/123")); // true
 * ```
 *
 * @category URL
 */
declare var URLPattern: {
  readonly prototype: URLPattern;
  new (
    input: URLPatternInput,
    baseURL: string,
    options?: URLPatternOptions,
  ): URLPattern;
  new (input?: URLPatternInput, options?: URLPatternOptions): URLPattern;
};

// Copyright 2018-2026 the Deno authors. MIT license.

// deno-lint-ignore-file no-explicit-any no-var

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

/** @category Platform */
interface DOMException extends Error {
  readonly name: string;
  readonly message: string;
  /** @deprecated */
  readonly code: number;
  readonly INDEX_SIZE_ERR: 1;
  readonly DOMSTRING_SIZE_ERR: 2;
  readonly HIERARCHY_REQUEST_ERR: 3;
  readonly WRONG_DOCUMENT_ERR: 4;
  readonly INVALID_CHARACTER_ERR: 5;
  readonly NO_DATA_ALLOWED_ERR: 6;
  readonly NO_MODIFICATION_ALLOWED_ERR: 7;
  readonly NOT_FOUND_ERR: 8;
  readonly NOT_SUPPORTED_ERR: 9;
  readonly INUSE_ATTRIBUTE_ERR: 10;
  readonly INVALID_STATE_ERR: 11;
  readonly SYNTAX_ERR: 12;
  readonly INVALID_MODIFICATION_ERR: 13;
  readonly NAMESPACE_ERR: 14;
  readonly INVALID_ACCESS_ERR: 15;
  readonly VALIDATION_ERR: 16;
  readonly TYPE_MISMATCH_ERR: 17;
  readonly SECURITY_ERR: 18;
  readonly NETWORK_ERR: 19;
  readonly ABORT_ERR: 20;
  readonly URL_MISMATCH_ERR: 21;
  readonly QUOTA_EXCEEDED_ERR: 22;
  readonly TIMEOUT_ERR: 23;
  readonly INVALID_NODE_TYPE_ERR: 24;
  readonly DATA_CLONE_ERR: 25;
}

/** The constructor object for {@linkcode DOMException}, used to construct an
 * exception describing an abnormal event raised by a web API. It also exposes
 * the legacy numeric error code constants (e.g. `ABORT_ERR`).
 *
 * @category Platform */
declare var DOMException: {
  readonly prototype: DOMException;
  new (message?: string, name?: string): DOMException;
  readonly INDEX_SIZE_ERR: 1;
  readonly DOMSTRING_SIZE_ERR: 2;
  readonly HIERARCHY_REQUEST_ERR: 3;
  readonly WRONG_DOCUMENT_ERR: 4;
  readonly INVALID_CHARACTER_ERR: 5;
  readonly NO_DATA_ALLOWED_ERR: 6;
  readonly NO_MODIFICATION_ALLOWED_ERR: 7;
  readonly NOT_FOUND_ERR: 8;
  readonly NOT_SUPPORTED_ERR: 9;
  readonly INUSE_ATTRIBUTE_ERR: 10;
  readonly INVALID_STATE_ERR: 11;
  readonly SYNTAX_ERR: 12;
  readonly INVALID_MODIFICATION_ERR: 13;
  readonly NAMESPACE_ERR: 14;
  readonly INVALID_ACCESS_ERR: 15;
  readonly VALIDATION_ERR: 16;
  readonly TYPE_MISMATCH_ERR: 17;
  readonly SECURITY_ERR: 18;
  readonly NETWORK_ERR: 19;
  readonly ABORT_ERR: 20;
  readonly URL_MISMATCH_ERR: 21;
  readonly QUOTA_EXCEEDED_ERR: 22;
  readonly TIMEOUT_ERR: 23;
  readonly INVALID_NODE_TYPE_ERR: 24;
  readonly DATA_CLONE_ERR: 25;
};

/** @category Platform */
interface QuotaExceededErrorOptions {
  quota?: number;
  requested?: number;
}

/**
 * Represents an error when a quota has been exceeded.
 *
 * @category Platform
 */
interface QuotaExceededError extends DOMException {
  readonly quota: number | null;
  readonly requested: number | null;
}

/** The constructor object for {@linkcode QuotaExceededError}, used to construct
 * an error thrown when an operation would exceed an enforced quota.
 *
 * @category Platform */
declare var QuotaExceededError: {
  readonly prototype: QuotaExceededError;
  new (
    message?: string,
    options?: QuotaExceededErrorOptions,
  ): QuotaExceededError;
};

/** @category Events */
interface EventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

/** An event which takes place in the DOM.
 *
 * @category Events
 */
interface Event {
  /** Returns true or false depending on how event was initialized. True if
   * event goes through its target's ancestors in reverse tree order, and
   * false otherwise. */
  readonly bubbles: boolean;
  /** @deprecated */
  cancelBubble: boolean;
  /** Returns true or false depending on how event was initialized. Its return
   * value does not always carry meaning, but true can indicate that part of the
   * operation during which event was dispatched, can be canceled by invoking
   * the preventDefault() method. */
  readonly cancelable: boolean;
  /** Returns true or false depending on how event was initialized. True if
   * event invokes listeners past a ShadowRoot node that is the root of its
   * target, and false otherwise. */
  readonly composed: boolean;
  /** Returns the object whose event listener's callback is currently being
   * invoked. */
  readonly currentTarget: EventTarget | null;
  /** Returns true if preventDefault() was invoked successfully to indicate
   * cancellation, and false otherwise. */
  readonly defaultPrevented: boolean;
  /** Returns the event's phase, which is one of NONE, CAPTURING_PHASE,
   * AT_TARGET, and BUBBLING_PHASE. */
  readonly eventPhase: number;
  /** Returns true if event was dispatched by the user agent, and false
   * otherwise. */
  readonly isTrusted: boolean;
  /** @deprecated */
  returnValue: boolean;
  /** @deprecated */
  readonly srcElement: EventTarget | null;
  /** Returns the object to which event is dispatched (its target). */
  readonly target: EventTarget | null;
  /** Returns the event's timestamp as the number of milliseconds measured
   * relative to the time origin. */
  readonly timeStamp: number;
  /** Returns the type of event, e.g. "click", "hashchange", or "submit". */
  readonly type: string;
  /** Returns the invocation target objects of event's path (objects on which
   * listeners will be invoked), except for any nodes in shadow trees of which
   * the shadow root's mode is "closed" that are not reachable from event's
   * currentTarget. */
  composedPath(): EventTarget[];
  /** @deprecated */
  initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void;
  /** If invoked when the cancelable attribute value is true, and while
   * executing a listener for the event with passive set to false, signals to
   * the operation that caused event to be dispatched that it needs to be
   * canceled. */
  preventDefault(): void;
  /** Invoking this method prevents event from reaching any registered event
   * listeners after the current one finishes running and, when dispatched in a
   * tree, also prevents event from reaching any other objects. */
  stopImmediatePropagation(): void;
  /** When dispatched in a tree, invoking this method prevents event from
   * reaching any objects other than the current object. */
  stopPropagation(): void;
  readonly NONE: 0;
  readonly CAPTURING_PHASE: 1;
  readonly AT_TARGET: 2;
  readonly BUBBLING_PHASE: 3;
}

/** An event which takes place in the DOM.
 *
 * @category Events
 */
declare var Event: {
  readonly prototype: Event;
  new (type: string, eventInitDict?: EventInit): Event;
  readonly NONE: 0;
  readonly CAPTURING_PHASE: 1;
  readonly AT_TARGET: 2;
  readonly BUBBLING_PHASE: 3;
};

/**
 * EventTarget is a DOM interface implemented by objects that can receive events
 * and may have listeners for them.
 *
 * @category Events
 */
interface EventTarget {
  /** Appends an event listener for events whose type attribute value is type.
   * The callback argument sets the callback that will be invoked when the event
   * is dispatched.
   *
   * The options argument sets listener-specific options. For compatibility this
   * can be a boolean, in which case the method behaves exactly as if the value
   * was specified as options's capture.
   *
   * When set to true, options's capture prevents callback from being invoked
   * when the event's eventPhase attribute value is BUBBLING_PHASE. When false
   * (or not present), callback will not be invoked when event's eventPhase
   * attribute value is CAPTURING_PHASE. Either way, callback will be invoked if
   * event's eventPhase attribute value is AT_TARGET.
   *
   * When set to true, options's passive indicates that the callback will not
   * cancel the event by invoking preventDefault(). This is used to enable
   * performance optimizations described in § 2.8 Observing event listeners.
   *
   * When set to true, options's once indicates that the callback will only be
   * invoked once after which the event listener will be removed.
   *
   * The event listener is appended to target's event listener list and is not
   * appended if it has the same type, callback, and capture. */
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ): void;
  /** Dispatches a synthetic event to event target and returns true if either
   * event's cancelable attribute value is false or its preventDefault() method
   * was not invoked, and false otherwise. */
  dispatchEvent(event: Event): boolean;
  /** Removes the event listener in target's event listener list with the same
   * type, callback, and options. */
  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: EventListenerOptions | boolean,
  ): void;
}

/**
 * EventTarget is a DOM interface implemented by objects that can receive events
 * and may have listeners for them.
 *
 * @category Events
 */
declare var EventTarget: {
  readonly prototype: EventTarget;
  new (): EventTarget;
};

/** @category Events */
interface EventListener {
  /**
   * The `EventListener` interface represents a callback function to be called
   * whenever an event of a specific type occurs on a target object.
   *
   * This is a basic event listener, represented by a simple function
   * that receives an Event object as its only parameter.
   *
   * @example
   * ```ts
   * // Create an event listener function
   * const handleEvent = (event: Event) => {
   *   console.log(`Event of type "${event.type}" occurred`);
   *   console.log(`Event phase: ${event.eventPhase}`);
   *
   *   // Access event properties
   *   if (event.cancelable) {
   *     event.preventDefault();
   *   }
   * };
   *
   * // Attach the event listener to a target
   * const target = new EventTarget();
   * target.addEventListener('custom', handleEvent);
   *
   * // Or create a listener inline
   * target.addEventListener('message', (event) => {
   *   console.log('Message received:', event);
   * });
   * ```
   *
   * @category Events
   */
  (evt: Event): void;
}

/**
 * The `EventListenerObject` interface represents an object that can handle events
 * dispatched by an `EventTarget` object.
 *
 * This interface provides an alternative to using a function as an event listener.
 * When implementing an object with this interface, the `handleEvent()` method
 * will be called when the event is triggered.
 *
 * @example
 * ```ts
 * // Creating an object that implements `EventListenerObject`
 * const myEventListener = {
 *   handleEvent(event) {
 *     console.log(`Event of type ${event.type} occurred`);
 *
 *     // You can use 'this' to access other methods or properties
 *     this.additionalProcessing(event);
 *   },
 *
 *   additionalProcessing(event) {
 *     // Additional event handling logic
 *     console.log('Additional processing for:', event);
 *   }
 * };
 *
 * // Using with any EventTarget (server or client contexts)
 * const target = new EventTarget();
 * target.addEventListener('message', myEventListener);
 *
 * // Later, to remove it:
 * target.removeEventListener('message', myEventListener);
 * ```
 *
 * @category Events
 */
interface EventListenerObject {
  handleEvent(evt: Event): void;
}

/** @category Events */
type EventListenerOrEventListenerObject =
  | EventListener
  | EventListenerObject;

/**
 * Options for configuring an event listener via `addEventListener`.
 *
 * This interface extends `EventListenerOptions` and provides additional configuration
 * options to control event listener behavior.
 *
 * @example
 * ```ts
 * eventTarget.addEventListener('message', handler, {
 *   once: true,
 *   passive: true,
 *   signal: controller.signal
 * });
 * ```
 *
 * @category Events */
interface AddEventListenerOptions extends EventListenerOptions {
  /**
   * When set to true, the listener will automatically be removed after it has been invoked once.
   */
  once?: boolean;

  /**
   * When set to true, indicates that the listener will never call `preventDefault()`.
   * This provides a performance optimization opportunity for event processing.
   * If a passive listener attempts to call `preventDefault()`, the call will be ignored
   * and a warning may be generated.
   */
  passive?: boolean;

  /**
   * An `AbortSignal` that can be used to remove the event listener when aborted.
   *
   * @example
   * ```ts
   * const controller = new AbortController();
   * eventTarget.addEventListener('message', handler, { signal: controller.signal });
   *
   * // Later, to remove the listener:
   * controller.abort();
   * ```
   */
  signal?: AbortSignal;
}

/** @category Events */
interface EventListenerOptions {
  capture?: boolean;
}

/** @category Events */
interface ProgressEventInit extends EventInit {
  lengthComputable?: boolean;
  loaded?: number;
  total?: number;
}

/** Events measuring progress of an underlying process, like an HTTP request
 * (for an XMLHttpRequest, or the loading of the underlying resource of an
 * <img>, <audio>, <video>, <style> or <link>).
 *
 * @category Events
 */
interface ProgressEvent<T extends EventTarget = EventTarget> extends Event {
  readonly lengthComputable: boolean;
  readonly loaded: number;
  readonly target: T | null;
  readonly total: number;
}

/** Events measuring progress of an underlying process, like an HTTP request
 * (for an XMLHttpRequest, or the loading of the underlying resource of an
 * <img>, <audio>, <video>, <style> or <link>).
 *
 * @category Events
 */
declare var ProgressEvent: {
  readonly prototype: ProgressEvent;
  new (type: string, eventInitDict?: ProgressEventInit): ProgressEvent;
};

/** Decodes a string of data which has been encoded using base-64 encoding.
 *
 * ```
 * console.log(atob("aGVsbG8gd29ybGQ=")); // outputs 'hello world'
 * ```
 *
 * @category Encoding
 */
declare function atob(s: string): string;

/** Creates a base-64 ASCII encoded string from the input string.
 *
 * ```
 * console.log(btoa("hello world"));  // outputs "aGVsbG8gd29ybGQ="
 * ```
 *
 * @category Encoding
 */
declare function btoa(s: string): string;

/** @category Encoding */
interface TextDecoderOptions {
  fatal?: boolean;
  ignoreBOM?: boolean;
}

/** @category Encoding */
interface TextDecodeOptions {
  stream?: boolean;
}

/**
 * Represents a decoder for a specific text encoding, allowing you to convert
 * binary data into a string given the encoding.
 *
 * @example
 * ```ts
 * const decoder = new TextDecoder('utf-8');
 * const buffer = new Uint8Array([72, 101, 108, 108, 111]);
 * const decodedString = decoder.decode(buffer);
 * console.log(decodedString); // Outputs: "Hello"
 * ```
 *
 * @category Encoding
 */
interface TextDecoder extends TextDecoderCommon {
  /** Turns binary data, often in the form of a Uint8Array, into a string given
   * the encoding.
   */
  decode(input?: AllowSharedBufferSource, options?: TextDecodeOptions): string;
}

/** The constructor object for {@linkcode TextDecoder}, used to create a decoder
 * for a given text encoding (UTF-8 by default) that turns byte streams into
 * strings.
 *
 * @category Encoding */
declare var TextDecoder: {
  readonly prototype: TextDecoder;
  new (label?: string, options?: TextDecoderOptions): TextDecoder;
};

/** @category Encoding */
interface TextDecoderCommon {
  /** Returns encoding's name, lowercased. */
  readonly encoding: string;
  /** Returns true if error mode is "fatal", otherwise false. */
  readonly fatal: boolean;
  /** Returns the value of ignore BOM. */
  readonly ignoreBOM: boolean;
}

/** @category Encoding */
interface TextEncoderEncodeIntoResult {
  read: number;
  written: number;
}

/**
 * Allows you to convert a string into binary data (in the form of a Uint8Array)
 * given the encoding.
 *
 * @example
 * ```ts
 * const encoder = new TextEncoder();
 * const str = "Hello";
 * const encodedData = encoder.encode(str);
 * console.log(encodedData); // Outputs: Uint8Array(5) [72, 101, 108, 108, 111]
 * ```
 *
 * @category Encoding
 */
interface TextEncoder extends TextEncoderCommon {
  /** Turns a string into binary data (in the form of a Uint8Array) using UTF-8 encoding. */
  encode(input?: string): Uint8Array<ArrayBuffer>;

  /** Encodes a string into the destination Uint8Array and returns the result of the encoding. */
  encodeInto(
    input: string,
    dest: Uint8Array<ArrayBufferLike>,
  ): TextEncoderEncodeIntoResult;
}

/** The constructor object for {@linkcode TextEncoder}, used to create an
 * encoder that turns strings into UTF-8 encoded bytes.
 *
 * @category Encoding */
declare var TextEncoder: {
  readonly prototype: TextEncoder;
  new (): TextEncoder;
};

/** @category Encoding */
interface TextEncoderCommon {
  /** Returns "utf-8". */
  readonly encoding: string;
}

/** @category Encoding */
interface TextDecoderStream extends GenericTransformStream, TextDecoderCommon {
  readonly readable: ReadableStream<string>;
  readonly writable: WritableStream<AllowSharedBufferSource>;
}

/** The constructor object for {@linkcode TextDecoderStream}, used to create a
 * transform stream that decodes a stream of bytes into a stream of strings.
 *
 * @category Encoding */
declare var TextDecoderStream: {
  readonly prototype: TextDecoderStream;
  new (label?: string, options?: TextDecoderOptions): TextDecoderStream;
};

/** @category Encoding */
interface TextEncoderStream extends GenericTransformStream, TextEncoderCommon {
  readonly readable: ReadableStream<Uint8Array<ArrayBuffer>>;
  readonly writable: WritableStream<string>;
}

/** The constructor object for {@linkcode TextEncoderStream}, used to create a
 * transform stream that encodes a stream of strings into a stream of UTF-8
 * bytes.
 *
 * @category Encoding */
declare var TextEncoderStream: {
  readonly prototype: TextEncoderStream;
  new (): TextEncoderStream;
};

/** A controller object that allows you to abort one or more DOM requests as and
 * when desired.
 *
 * @category Platform
 */
interface AbortController {
  /** Returns the AbortSignal object associated with this object. */
  readonly signal: AbortSignal;
  /** Invoking this method will set this object's AbortSignal's aborted flag and
   * signal to any observers that the associated activity is to be aborted. */
  abort(reason?: any): void;
}

/** A controller object that allows you to abort one or more DOM requests as and
 * when desired.
 *
 * @category Platform
 */
declare var AbortController: {
  readonly prototype: AbortController;
  new (): AbortController;
};

/** @category Platform */
interface AbortSignalEventMap {
  abort: Event;
}

/** A signal object that allows you to communicate with a DOM request (such as a
 * Fetch) and abort it if required via an AbortController object.
 *
 * @category Platform
 */
interface AbortSignal extends EventTarget {
  /** Returns true if this AbortSignal's AbortController has signaled to abort,
   * and false otherwise. */
  readonly aborted: boolean;
  readonly reason: any;
  onabort: ((this: AbortSignal, ev: Event) => any) | null;
  addEventListener<K extends keyof AbortSignalEventMap>(
    type: K,
    listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof AbortSignalEventMap>(
    type: K,
    listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;

  /** Throws this AbortSignal's abort reason, if its AbortController has
   * signaled to abort; otherwise, does nothing. */
  throwIfAborted(): void;
}

/** The constructor object for {@linkcode AbortSignal}.
 *
 * `AbortSignal` instances are obtained from an `AbortController` or via the
 * static `abort`, `timeout`, and `any` factory methods rather than constructed
 * directly, so calling the constructor throws.
 *
 * @category Platform */
declare var AbortSignal: {
  readonly prototype: AbortSignal;
  new (): never;
  abort(reason?: any): AbortSignal;
  any(signals: AbortSignal[]): AbortSignal;
  timeout(milliseconds: number): AbortSignal;
};

/** @category File */
interface FileReaderEventMap {
  "abort": ProgressEvent<FileReader>;
  "error": ProgressEvent<FileReader>;
  "load": ProgressEvent<FileReader>;
  "loadend": ProgressEvent<FileReader>;
  "loadstart": ProgressEvent<FileReader>;
  "progress": ProgressEvent<FileReader>;
}

/** Lets web applications asynchronously read the contents of files (or raw data
 * buffers) stored on the user's computer, using File or Blob objects to specify
 * the file or data to read.
 *
 * @category File
 */
interface FileReader extends EventTarget {
  readonly error: DOMException | null;
  onabort: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
  onerror: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
  onload: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
  onloadend: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
  onloadstart:
    | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
    | null;
  onprogress: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
  readonly readyState:
    | typeof FileReader.EMPTY
    | typeof FileReader.LOADING
    | typeof FileReader.DONE;
  readonly result: string | ArrayBuffer | null;
  abort(): void;
  readAsArrayBuffer(blob: Blob): void;
  /** @deprecated */
  readAsBinaryString(blob: Blob): void;
  readAsDataURL(blob: Blob): void;
  readAsText(blob: Blob, encoding?: string): void;
  readonly EMPTY: 0;
  readonly LOADING: 1;
  readonly DONE: 2;
  addEventListener<K extends keyof FileReaderEventMap>(
    type: K,
    listener: (this: FileReader, ev: FileReaderEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof FileReaderEventMap>(
    type: K,
    listener: (this: FileReader, ev: FileReaderEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}

/** The constructor object for {@linkcode FileReader}, used to create a reader
 * that asynchronously reads the contents of a {@linkcode Blob} or
 * {@linkcode File} into memory.
 *
 * @category File */
declare var FileReader: {
  readonly prototype: FileReader;
  new (): FileReader;
  readonly EMPTY: 0;
  readonly LOADING: 1;
  readonly DONE: 2;
};

/** @category File */
type BlobPart = BufferSource | Blob | string;

/** @category File */
type EndingType = "transparent" | "native";

/** @category File */
interface BlobPropertyBag {
  type?: string;
  endings?: EndingType;
}

/** A file-like object of immutable, raw data. Blobs represent data that isn't
 * necessarily in a JavaScript-native format. The File interface is based on
 * Blob, inheriting blob functionality and expanding it to support files on the
 * user's system.
 *
 * @category File
 */
interface Blob {
  readonly size: number;
  readonly type: string;
  arrayBuffer(): Promise<ArrayBuffer>;
  bytes(): Promise<Uint8Array<ArrayBuffer>>;
  slice(start?: number, end?: number, contentType?: string): Blob;
  stream(): ReadableStream<Uint8Array<ArrayBuffer>>;
  text(): Promise<string>;
  /** Returns a `ReadableStream<string>` that streams the blob's data decoded
   * as UTF-8 text. */
  textStream(): ReadableStream<string>;
}

/** A file-like object of immutable, raw data. Blobs represent data that isn't
 * necessarily in a JavaScript-native format. The File interface is based on
 * Blob, inheriting blob functionality and expanding it to support files on the
 * user's system.
 *
 * @category File
 */
declare var Blob: {
  readonly prototype: Blob;
  new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
};

/** @category File */
interface FilePropertyBag extends BlobPropertyBag {
  lastModified?: number;
}

/** Provides information about files and allows JavaScript in a web page to
 * access their content.
 *
 * @category File
 */
interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
  readonly webkitRelativePath: string;
}

/** Provides information about files and allows JavaScript in a web page to
 * access their content.
 *
 * @category File
 */
declare var File: {
  readonly prototype: File;
  new (fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
};

/** @category Streams */
type ReadableStreamReader<T> =
  | ReadableStreamDefaultReader<T>
  | ReadableStreamBYOBReader;

/** @category Streams */
type ReadableStreamController<T> =
  | ReadableStreamDefaultController<T>
  | ReadableByteStreamController;

/** @category Streams */
interface ReadableStreamGenericReader {
  readonly closed: Promise<void>;
  cancel(reason?: any): Promise<void>;
}

/** @category Streams */
interface ReadableStreamReadDoneResult<T> {
  done: true;
  value?: T;
}

/** @category Streams */
interface ReadableStreamReadValueResult<T> {
  done: false;
  value: T;
}

/** @category Streams */
type ReadableStreamReadResult<T> =
  | ReadableStreamReadValueResult<T>
  | ReadableStreamReadDoneResult<T>;

/** @category Streams */
interface ReadableStreamDefaultReader<R = any>
  extends ReadableStreamGenericReader {
  read(): Promise<ReadableStreamReadResult<R>>;
  releaseLock(): void;
}

/** The constructor object for {@linkcode ReadableStreamDefaultReader}, used to
 * create a default reader locked to the given {@linkcode ReadableStream}. Most
 * code obtains one via {@linkcode ReadableStream.getReader} instead.
 *
 * @category Streams */
declare var ReadableStreamDefaultReader: {
  readonly prototype: ReadableStreamDefaultReader;
  new <R = any>(stream: ReadableStream<R>): ReadableStreamDefaultReader<R>;
};

/** @category Streams */
interface ReadableStreamBYOBReaderReadOptions {
  min?: number;
}

/** @category Streams */
interface ReadableStreamBYOBReader extends ReadableStreamGenericReader {
  read<T extends ArrayBufferView>(
    view: T,
    options?: ReadableStreamBYOBReaderReadOptions,
  ): Promise<ReadableStreamReadResult<T>>;
  releaseLock(): void;
}

/** The constructor object for {@linkcode ReadableStreamBYOBReader}, used to
 * create a "bring your own buffer" reader locked to the given byte stream. Most
 * code obtains one via `ReadableStream.getReader({ mode: "byob" })` instead.
 *
 * @category Streams */
declare var ReadableStreamBYOBReader: {
  readonly prototype: ReadableStreamBYOBReader;
  new (
    stream: ReadableStream<Uint8Array<ArrayBuffer>>,
  ): ReadableStreamBYOBReader;
};

/** @category Streams */
interface ReadableStreamBYOBRequest {
  readonly view: Uint8Array<ArrayBuffer> | null;
  respond(bytesWritten: number): void;
  respondWithNewView(view: ArrayBufferView): void;
}

/** The constructor object for {@linkcode ReadableStreamBYOBRequest}.
 *
 * Instances are provided to a byte stream's controller rather than constructed
 * directly, so calling the constructor throws.
 *
 * @category Streams */
declare var ReadableStreamBYOBRequest: {
  readonly prototype: ReadableStreamBYOBRequest;
  new (): never;
};

/** @category Streams */
interface UnderlyingByteSource {
  autoAllocateChunkSize?: number;
  cancel?: UnderlyingSourceCancelCallback;
  pull?: (controller: ReadableByteStreamController) => void | PromiseLike<void>;
  start?: (controller: ReadableByteStreamController) => any;
  type: "bytes";
}

/** @category Streams */
interface UnderlyingDefaultSource<R = any> {
  cancel?: UnderlyingSourceCancelCallback;
  pull?: (
    controller: ReadableStreamDefaultController<R>,
  ) => void | PromiseLike<void>;
  start?: (controller: ReadableStreamDefaultController<R>) => any;
  type?: undefined;
}

/** @category Streams */
interface UnderlyingSink<W = any> {
  abort?: UnderlyingSinkAbortCallback;
  close?: UnderlyingSinkCloseCallback;
  start?: UnderlyingSinkStartCallback;
  type?: undefined;
  write?: UnderlyingSinkWriteCallback<W>;
}

/** @category Streams */
type ReadableStreamType = "bytes";

/** @category Streams */
interface UnderlyingSource<R = any> {
  autoAllocateChunkSize?: number;
  cancel?: UnderlyingSourceCancelCallback;
  pull?: UnderlyingSourcePullCallback<R>;
  start?: UnderlyingSourceStartCallback<R>;
  type?: ReadableStreamType;
}

/** @category Streams */
interface UnderlyingSourceCancelCallback {
  (reason?: any): void | PromiseLike<void>;
}

/** @category Streams */
interface UnderlyingSourcePullCallback<R> {
  (controller: ReadableStreamController<R>): void | PromiseLike<void>;
}

/** @category Streams */
interface UnderlyingSourceStartCallback<R> {
  (controller: ReadableStreamController<R>): any;
}

/** @category Streams */
interface ReadableStreamDefaultController<R = any> {
  readonly desiredSize: number | null;
  close(): void;
  enqueue(chunk?: R): void;
  error(e?: any): void;
}

/** The constructor object for {@linkcode ReadableStreamDefaultController}.
 *
 * Instances are passed to a {@linkcode ReadableStream}'s underlying source
 * callbacks rather than constructed directly, so calling the constructor
 * throws.
 *
 * @category Streams */
declare var ReadableStreamDefaultController: {
  readonly prototype: ReadableStreamDefaultController;
  new (): never;
};

/** @category Streams */
interface ReadableByteStreamController {
  readonly byobRequest: ReadableStreamBYOBRequest | null;
  readonly desiredSize: number | null;
  close(): void;
  enqueue(chunk: ArrayBufferView): void;
  error(e?: any): void;
}

/** The constructor object for {@linkcode ReadableByteStreamController}.
 *
 * Instances are passed to a byte-oriented {@linkcode ReadableStream}'s
 * underlying source callbacks rather than constructed directly, so calling the
 * constructor throws.
 *
 * @category Streams */
declare var ReadableByteStreamController: {
  readonly prototype: ReadableByteStreamController;
  new (): never;
};

/** @category Streams */
interface StreamPipeOptions {
  preventAbort?: boolean;
  preventCancel?: boolean;
  preventClose?: boolean;
  signal?: AbortSignal;
}

/** @category Streams */
interface QueuingStrategySize<T = any> {
  (chunk: T): number;
}

/** @category Streams */
interface QueuingStrategy<T = any> {
  highWaterMark?: number;
  size?: QueuingStrategySize<T>;
}

/** This Streams API interface provides a built-in byte length queuing strategy
 * that can be used when constructing streams.
 *
 * @category Streams
 */
interface CountQueuingStrategy extends QueuingStrategy {
  readonly highWaterMark: number;
  readonly size: QueuingStrategySize;
}

/** The constructor object for {@linkcode CountQueuingStrategy}, used to create a
 * queuing strategy that counts each chunk as a single unit toward the stream's
 * high water mark.
 *
 * @category Streams */
declare var CountQueuingStrategy: {
  readonly prototype: CountQueuingStrategy;
  new (init: QueuingStrategyInit): CountQueuingStrategy;
};

/** @category Streams */
interface ByteLengthQueuingStrategy extends QueuingStrategy<ArrayBufferView> {
  readonly highWaterMark: number;
  readonly size: QueuingStrategySize<ArrayBufferView>;
}

/** The constructor object for {@linkcode ByteLengthQueuingStrategy}, used to
 * create a queuing strategy that measures each chunk by its `byteLength` toward
 * the stream's high water mark.
 *
 * @category Streams */
declare var ByteLengthQueuingStrategy: {
  readonly prototype: ByteLengthQueuingStrategy;
  new (init: QueuingStrategyInit): ByteLengthQueuingStrategy;
};

/** @category Streams */
interface QueuingStrategyInit {
  highWaterMark: number;
}

/** This Streams API interface represents a readable stream of byte data. The
 * Fetch API offers a concrete instance of a ReadableStream through the body
 * property of a Response object.
 *
 * @category Streams
 */
interface ReadableStream<R = any> {
  readonly locked: boolean;
  cancel(reason?: any): Promise<void>;
  getReader(options: { mode: "byob" }): ReadableStreamBYOBReader;
  getReader(): ReadableStreamDefaultReader<R>;
  getReader(options?: ReadableStreamGetReaderOptions): ReadableStreamReader<R>;
  pipeThrough<T>(
    transform: ReadableWritablePair<T, R>,
    options?: StreamPipeOptions,
  ): ReadableStream<T>;
  pipeTo(
    destination: WritableStream<R>,
    options?: StreamPipeOptions,
  ): Promise<void>;
  tee(): [ReadableStream<R>, ReadableStream<R>];
  values(options?: ReadableStreamIteratorOptions): AsyncIterableIterator<R>;
  [Symbol.asyncIterator](
    options?: ReadableStreamIteratorOptions,
  ): AsyncIterableIterator<R>;
}

/** The constructor object for {@linkcode ReadableStream}, used to create a
 * readable stream from an underlying source describing how data is enqueued and
 * consumed.
 *
 * @category Streams */
declare var ReadableStream: {
  readonly prototype: ReadableStream;
  new (
    underlyingSource: UnderlyingByteSource,
    strategy?: { highWaterMark?: number },
  ): ReadableStream<Uint8Array<ArrayBuffer>>;
  new <R = any>(
    underlyingSource: UnderlyingDefaultSource<R>,
    strategy?: QueuingStrategy<R>,
  ): ReadableStream<R>;
  new <R = any>(
    underlyingSource?: UnderlyingSource<R>,
    strategy?: QueuingStrategy<R>,
  ): ReadableStream<R>;
  from<R>(
    asyncIterable: AsyncIterable<R> | Iterable<R | PromiseLike<R>> & object,
  ): ReadableStream<R>;
};

/** @category Streams */
interface ReadableStreamIteratorOptions {
  preventCancel?: boolean;
}

/** @category Streams */
type ReadableStreamReaderMode = "byob";

/** @category Streams */
interface ReadableStreamGetReaderOptions {
  mode?: ReadableStreamReaderMode;
}

/** @category Streams */
interface ReadableWritablePair<R = any, W = any> {
  readable: ReadableStream<R>;
  writable: WritableStream<W>;
}

/** @category Streams */
interface UnderlyingSinkCloseCallback {
  (): void | PromiseLike<void>;
}

/** @category Streams */
interface UnderlyingSinkStartCallback {
  (controller: WritableStreamDefaultController): any;
}

/** @category Streams */
interface UnderlyingSinkWriteCallback<W> {
  (
    chunk: W,
    controller: WritableStreamDefaultController,
  ): void | PromiseLike<void>;
}

/** @category Streams */
interface UnderlyingSinkAbortCallback {
  (reason?: any): void | PromiseLike<void>;
}

/** This Streams API interface provides a standard abstraction for writing
 * streaming data to a destination, known as a sink. This object comes with
 * built-in backpressure and queuing.
 *
 * @category Streams
 */
interface WritableStream<W = any> {
  readonly locked: boolean;
  abort(reason?: any): Promise<void>;
  close(): Promise<void>;
  getWriter(): WritableStreamDefaultWriter<W>;
}

/** The constructor object for {@linkcode WritableStream}, used to create a
 * writable stream from an underlying sink describing how written chunks are
 * handled.
 *
 * @category Streams */
declare var WritableStream: {
  readonly prototype: WritableStream;
  new <W = any>(
    underlyingSink?: UnderlyingSink<W>,
    strategy?: QueuingStrategy<W>,
  ): WritableStream<W>;
};

/** This Streams API interface represents a controller allowing control of a
 * WritableStream's state. When constructing a WritableStream, the underlying
 * sink is given a corresponding WritableStreamDefaultController instance to
 * manipulate.
 *
 * @category Streams
 */
interface WritableStreamDefaultController {
  readonly signal: AbortSignal;
  error(e?: any): void;
}

/** The constructor object for {@linkcode WritableStreamDefaultController}.
 *
 * Instances are passed to a {@linkcode WritableStream}'s underlying sink
 * callbacks rather than constructed directly, so calling the constructor
 * throws.
 *
 * @category Streams */
declare var WritableStreamDefaultController: {
  readonly prototype: WritableStreamDefaultController;
  new (): never;
};

/** This Streams API interface is the object returned by
 * WritableStream.getWriter() and once created locks the < writer to the
 * WritableStream ensuring that no other streams can write to the underlying
 * sink.
 *
 * @category Streams
 */
interface WritableStreamDefaultWriter<W = any> {
  readonly closed: Promise<void>;
  readonly desiredSize: number | null;
  readonly ready: Promise<void>;
  abort(reason?: any): Promise<void>;
  close(): Promise<void>;
  releaseLock(): void;
  write(chunk?: W): Promise<void>;
}

/** The constructor object for {@linkcode WritableStreamDefaultWriter}, used to
 * create a writer locked to the given {@linkcode WritableStream}. Most code
 * obtains one via {@linkcode WritableStream.getWriter} instead.
 *
 * @category Streams */
declare var WritableStreamDefaultWriter: {
  readonly prototype: WritableStreamDefaultWriter;
  new <W = any>(stream: WritableStream<W>): WritableStreamDefaultWriter<W>;
};

/** @category Streams */
interface TransformStream<I = any, O = any> {
  readonly readable: ReadableStream<O>;
  readonly writable: WritableStream<I>;
}

/** The constructor object for {@linkcode TransformStream}, used to create a
 * transform stream from a transformer describing how chunks read from its
 * writable side are transformed before appearing on its readable side.
 *
 * @category Streams */
declare var TransformStream: {
  readonly prototype: TransformStream;
  new <I = any, O = any>(
    transformer?: Transformer<I, O>,
    writableStrategy?: QueuingStrategy<I>,
    readableStrategy?: QueuingStrategy<O>,
  ): TransformStream<I, O>;
};

/** @category Streams */
interface TransformStreamDefaultController<O = any> {
  readonly desiredSize: number | null;
  enqueue(chunk?: O): void;
  error(reason?: any): void;
  terminate(): void;
}

/** The constructor object for {@linkcode TransformStreamDefaultController}.
 *
 * Instances are passed to a {@linkcode TransformStream}'s transformer callbacks
 * rather than constructed directly, so calling the constructor throws.
 *
 * @category Streams */
declare var TransformStreamDefaultController: {
  readonly prototype: TransformStreamDefaultController;
  new (): never;
};

/** @category Streams */
interface Transformer<I = any, O = any> {
  flush?: TransformerFlushCallback<O>;
  readableType?: undefined;
  start?: TransformerStartCallback<O>;
  transform?: TransformerTransformCallback<I, O>;
  cancel?: TransformerCancelCallback;
  writableType?: undefined;
}

/** @category Streams */
interface TransformerFlushCallback<O> {
  (controller: TransformStreamDefaultController<O>): void | PromiseLike<void>;
}

/** @category Streams */
interface TransformerStartCallback<O> {
  (controller: TransformStreamDefaultController<O>): any;
}

/** @category Streams */
interface TransformerTransformCallback<I, O> {
  (
    chunk: I,
    controller: TransformStreamDefaultController<O>,
  ): void | PromiseLike<void>;
}

/** @category Streams */
interface TransformerCancelCallback {
  (reason: any): void | PromiseLike<void>;
}

/** @category Streams */
interface GenericTransformStream {
  readonly readable: ReadableStream;
  readonly writable: WritableStream;
}

/** @category Events */
type MessageEventSource = Window | MessagePort;

/** @category Events */
interface MessageEventInit<T = any> extends EventInit {
  data?: T;
  lastEventId?: string;
  origin?: string;
  ports?: MessagePort[];
  source?: MessageEventSource | null;
}

/** @category Events */
interface MessageEvent<T = any> extends Event {
  /**
   * Returns the data of the message.
   */
  readonly data: T;
  /**
   * Returns the origin of the message, for server-sent events.
   */
  readonly origin: string;
  /**
   * Returns the last event ID string, for server-sent events.
   */
  readonly lastEventId: string;
  readonly source: MessageEventSource | null;
  /**
   * Returns transferred ports.
   */
  readonly ports: ReadonlyArray<MessagePort>;
  /** @deprecated */
  initMessageEvent(
    type: string,
    bubbles?: boolean,
    cancelable?: boolean,
    data?: any,
    origin?: string,
    lastEventId?: string,
    source?: MessageEventSource | null,
    ports?: MessagePort[],
  ): void;
}

/** The constructor object for {@linkcode MessageEvent}, used to construct an
 * event carrying a message, such as those dispatched for `BroadcastChannel`,
 * `MessagePort`, and `Worker` messaging.
 *
 * @category Events */
declare var MessageEvent: {
  readonly prototype: MessageEvent;
  new <T>(type: string, eventInitDict?: MessageEventInit<T>): MessageEvent<T>;
};

/** @category Events */
type Transferable =
  | MessagePort
  | ArrayBuffer
  | ReadableStream
  | WritableStream
  | TransformStream;

/**
 * Options that control structured serialization operations such as
 * `structuredClone(value, options)` and `MessagePort.postMessage(message, options)`.
 *
 * The optional `transfer` array lists {@link Transferable} objects whose
 * underlying resources should be moved (transferred) to the receiving side
 * instead of being cloned. After a successful transfer:
 *
 * - For an `ArrayBuffer`, the original buffer becomes neutered (its
 *   `byteLength` is set to `0`).
 * - For a `MessagePort`, the port becomes unusable on the sending side and
 *   future events will arrive only on the transferred port at the receiver.
 *
 * Validation rules:
 * - Each transferable may appear only once in the `transfer` list.
 * - A `MessagePort` cannot be listed together with its counterpart port from
 *   the same `MessageChannel` in the same transfer operation.
 * - Duplicate or otherwise invalid entries will cause a `DataCloneError`
 *   `DOMException` to be thrown.
 *
 * Transferring improves performance for large binary data and allows moving
 * communication endpoints without copying.
 *
 * @example
 * ```ts
 * // Transferring an ArrayBuffer (zero-copy for large data)
 * const buffer = new ArrayBuffer(16);
 * const cloned = structuredClone(buffer, { transfer: [buffer] });
 *
 * // After transfer, the original buffer is neutered
 * console.log(buffer.byteLength); // 0
 * console.log(cloned.byteLength); // 16
 *
 * @category Platform
 */
interface StructuredSerializeOptions {
  /** List of transferable objects whose ownership is moved instead of cloned. */
  transfer?: Transferable[];
}

/** The MessageChannel interface of the Channel Messaging API allows us to
 * create a new message channel and send data through it via its two MessagePort
 * properties.
 *
 * @category Messaging
 */
interface MessageChannel {
  readonly port1: MessagePort;
  readonly port2: MessagePort;
}

/** The MessageChannel interface of the Channel Messaging API allows us to
 * create a new message channel and send data through it via its two MessagePort
 * properties.
 *
 * @category Messaging
 */
declare var MessageChannel: {
  readonly prototype: MessageChannel;
  new (): MessageChannel;
};

/** @category Messaging */
interface MessagePortEventMap {
  "message": MessageEvent;
  "messageerror": MessageEvent;
}

/** The MessagePort interface of the Channel Messaging API represents one of the
 * two ports of a MessageChannel, allowing messages to be sent from one port and
 * listening out for them arriving at the other.
 *
 * @category Messaging
 */
interface MessagePort extends EventTarget {
  onmessage: ((this: MessagePort, ev: MessageEvent) => any) | null;
  onmessageerror: ((this: MessagePort, ev: MessageEvent) => any) | null;
  /**
   * Disconnects the port, so that it is no longer active.
   */
  close(): void;
  /**
   * Posts a message through the channel. Objects listed in transfer are
   * transferred, not just cloned, meaning that they are no longer usable on the
   * sending side.
   *
   * Throws a "DataCloneError" DOMException if transfer contains duplicate
   * objects or port, or if message could not be cloned.
   */
  postMessage(message: any, transfer: Transferable[]): void;
  postMessage(message: any, options?: StructuredSerializeOptions): void;
  /**
   * Begins dispatching messages received on the port. This is implicitly called
   * when assigning a value to `this.onmessage`.
   */
  start(): void;
  addEventListener<K extends keyof MessagePortEventMap>(
    type: K,
    listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof MessagePortEventMap>(
    type: K,
    listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}

/** The MessagePort interface of the Channel Messaging API represents one of the
 * two ports of a MessageChannel, allowing messages to be sent from one port and
 * listening out for them arriving at the other.
 *
 * @category Messaging
 */
declare var MessagePort: {
  readonly prototype: MessagePort;
  new (): never;
};

/**
 * Creates a deep copy of a given value using the structured clone algorithm.
 *
 * Unlike a shallow copy, a deep copy does not hold the same references as the
 * source object, meaning its properties can be changed without affecting the
 * source. For more details, see
 * [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy).
 *
 * Throws a `DataCloneError` if any part of the input value is not
 * serializable.
 *
 * @example
 * ```ts
 * const object = { x: 0, y: 1 };
 *
 * const deepCopy = structuredClone(object);
 * deepCopy.x = 1;
 * console.log(deepCopy.x, object.x); // 1 0
 *
 * const shallowCopy = object;
 * shallowCopy.x = 1;
 * // shallowCopy.x is pointing to the same location in memory as object.x
 * console.log(shallowCopy.x, object.x); // 1 1
 * ```
 *
 * @category Platform
 */
declare function structuredClone<T = any>(
  value: T,
  options?: StructuredSerializeOptions,
): T;

/**
 * An API for compressing a stream of data.
 *
 * @example
 * ```ts
 * await Deno.stdin.readable
 *   .pipeThrough(new CompressionStream("gzip"))
 *   .pipeTo(Deno.stdout.writable);
 * ```
 *
 * @category Streams
 */
interface CompressionStream extends GenericTransformStream {
  readonly readable: ReadableStream<Uint8Array<ArrayBuffer>>;
  readonly writable: WritableStream<BufferSource>;
}

/** @category Streams */
type CompressionFormat = "deflate" | "deflate-raw" | "gzip" | "brotli";

/**
 * An API for compressing a stream of data.
 *
 * @example
 * ```ts
 * await Deno.stdin.readable
 *   .pipeThrough(new CompressionStream("gzip"))
 *   .pipeTo(Deno.stdout.writable);
 * ```
 *
 * @category Streams
 */
declare var CompressionStream: {
  readonly prototype: CompressionStream;
  /**
   * Creates a new `CompressionStream` object which compresses a stream of
   * data.
   *
   * Throws a `TypeError` if the format passed to the constructor is not
   * supported.
   */
  new (format: CompressionFormat): CompressionStream;
};

/**
 * An API for decompressing a stream of data.
 *
 * @example
 * ```ts
 * const input = await Deno.open("./file.txt.gz");
 * const output = await Deno.create("./file.txt");
 *
 * await input.readable
 *   .pipeThrough(new DecompressionStream("gzip"))
 *   .pipeTo(output.writable);
 * ```
 *
 * @category Streams
 */
interface DecompressionStream extends GenericTransformStream {
  readonly readable: ReadableStream<Uint8Array<ArrayBuffer>>;
  readonly writable: WritableStream<BufferSource>;
}

/**
 * An API for decompressing a stream of data.
 *
 * @example
 * ```ts
 * const input = await Deno.open("./file.txt.gz");
 * const output = await Deno.create("./file.txt");
 *
 * await input.readable
 *   .pipeThrough(new DecompressionStream("gzip"))
 *   .pipeTo(output.writable);
 * ```
 *
 * @category Streams
 */
declare var DecompressionStream: {
  readonly prototype: DecompressionStream;
  /**
   * Creates a new `DecompressionStream` object which decompresses a stream of
   * data.
   *
   * Throws a `TypeError` if the format passed to the constructor is not
   * supported.
   */
  new (format: CompressionFormat): DecompressionStream;
};

/** Dispatch an uncaught exception. Similar to a synchronous version of:
 * ```ts
 * setTimeout(() => { throw error; }, 0);
 * ```
 * The error can not be caught with a `try/catch` block. An error event will
 * be dispatched to the global scope. You can prevent the error from being
 * reported to the console with `Event.prototype.preventDefault()`:
 * ```ts
 * addEventListener("error", (event) => {
 *   event.preventDefault();
 * });
 * reportError(new Error("foo")); // Will not be reported.
 * ```
 * In Deno, this error will terminate the process if not intercepted like above.
 *
 * @category Platform
 */
declare function reportError(
  error: any,
): void;

/** @category Platform */
type PredefinedColorSpace = "srgb" | "display-p3";

/** @category Platform */
type ImageDataArray =
  | Uint8ClampedArray<ArrayBuffer>
  | Float16Array<ArrayBuffer>;

/** @category Platform */
type ImageDataPixelFormat = "rgba-unorm8" | "rgba-float16";

/** @category Platform */
interface ImageDataSettings {
  readonly colorSpace?: PredefinedColorSpace;
  readonly pixelFormat?: ImageDataPixelFormat;
}

/** @category Platform */
interface ImageData {
  readonly width: number;
  readonly height: number;
  readonly data: ImageDataArray;
  readonly pixelFormat: ImageDataPixelFormat;
  readonly colorSpace: PredefinedColorSpace;
}

/** The constructor object for {@linkcode ImageData}, used to create an object
 * holding the raw pixel data of a rectangular image region, either zero-filled
 * for the given dimensions or wrapping an existing pixel array.
 *
 * @category Platform */
declare var ImageData: {
  readonly prototype: ImageData;
  new (sw: number, sh: number, settings?: ImageDataSettings): ImageData;
  new (
    data: ImageDataArray,
    sw: number,
    sh?: number,
    settings?: ImageDataSettings,
  ): ImageData;
};

/** @category Platform */
interface WebTransportCloseInfo {
  closeCode?: number;
  reason?: string;
}

/** @category Platform */
interface WebTransportErrorOptions {
  source?: WebTransportErrorSource;
  streamErrorCode?: number | null;
}

/** @category Platform */
interface WebTransportHash {
  algorithm?: string;
  value?: BufferSource;
}

/** @category Platform */
interface WebTransportOptions {
  allowPooling?: boolean;
  congestionControl?: WebTransportCongestionControl;
  requireUnreliable?: boolean;
  serverCertificateHashes?: WebTransportHash[];
}

/** @category Platform */
interface WebTransportSendStreamOptions {
  sendGroup?: WebTransportSendGroup;
  sendOrder?: number;
  waitUntilAvailable?: boolean;
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransport)
 * @category Platform
 */
interface WebTransport {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransport/closed) */
  readonly closed: Promise<WebTransportCloseInfo>;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransport/datagrams) */
  readonly datagrams: WebTransportDatagramDuplexStream;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransport/incomingBidirectionalStreams) */
  readonly incomingBidirectionalStreams: ReadableStream<
    WebTransportBidirectionalStream
  >;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransport/incomingUnidirectionalStreams) */
  readonly incomingUnidirectionalStreams: ReadableStream<
    WebTransportReceiveStream
  >;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransport/ready) */
  readonly ready: Promise<void>;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransport/close) */
  close(closeInfo?: WebTransportCloseInfo): void;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransport/createBidirectionalStream) */
  createBidirectionalStream(
    options?: WebTransportSendStreamOptions,
  ): Promise<WebTransportBidirectionalStream>;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransport/createUnidirectionalStream) */
  createUnidirectionalStream(
    options?: WebTransportSendStreamOptions,
  ): Promise<WebTransportSendStream>;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransport/createSendGroup) */
  createSendGroup(): WebTransportSendGroup;
}

/** The constructor object for {@linkcode WebTransport}, used to open a new
 * WebTransport session to the server at the given `url`.
 *
 * @category Platform */
declare var WebTransport: {
  prototype: WebTransport;
  new (url: string | URL, options?: WebTransportOptions): WebTransport;
};

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportBidirectionalStream)
 * @category Platform
 */
interface WebTransportBidirectionalStream {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportBidirectionalStream/readable) */
  readonly readable: WebTransportReceiveStream;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportBidirectionalStream/writable) */
  readonly writable: WebTransportSendStream;
}

/** The constructor object for {@linkcode WebTransportBidirectionalStream}.
 *
 * Instances are obtained from a {@linkcode WebTransport} session rather than
 * constructed directly.
 *
 * @category Platform */
declare var WebTransportBidirectionalStream: {
  prototype: WebTransportBidirectionalStream;
  new (): WebTransportBidirectionalStream;
};

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportDatagramDuplexStream)
 * @category Platform
 */
interface WebTransportDatagramDuplexStream {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportDatagramDuplexStream/incomingHighWaterMark) */
  incomingHighWaterMark: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportDatagramDuplexStream/incomingMaxAge) */
  incomingMaxAge: number | null;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportDatagramDuplexStream/maxDatagramSize) */
  readonly maxDatagramSize: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportDatagramDuplexStream/outgoingHighWaterMark) */
  outgoingHighWaterMark: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportDatagramDuplexStream/outgoingMaxAge) */
  outgoingMaxAge: number | null;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportDatagramDuplexStream/readable) */
  readonly readable: WebTransportReceiveStream;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportDatagramDuplexStream/writable) */
  readonly writable: WebTransportSendStream;
}

/** The constructor object for {@linkcode WebTransportDatagramDuplexStream}.
 *
 * The datagram duplex stream is obtained from
 * {@linkcode WebTransport.datagrams} rather than constructed directly.
 *
 * @category Platform */
declare var WebTransportDatagramDuplexStream: {
  prototype: WebTransportDatagramDuplexStream;
  new (): WebTransportDatagramDuplexStream;
};

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportSendStream)
 * @category Platform
 */
interface WebTransportSendStream extends WritableStream<Uint8Array> {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportSendStream/sendOrder) */
  sendOrder: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportSendStream/sendGroup) */
  sendGroup?: WebTransportSendGroup;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportSendStream/getStats) */
  getStats(): Promise<WebTransportSendStreamStats>;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportSendStream/getWriter) */
  getWriter(): WebTransportWriter;
}

/** The constructor object for {@linkcode WebTransportSendStream}.
 *
 * Instances are obtained from a {@linkcode WebTransport} session rather than
 * constructed directly.
 *
 * @category Platform */
declare var WebTransportSendStream: {
  prototype: WebTransportSendStream;
  new (): WebTransportSendStream;
};

/** @category Platform */
interface WebTransportSendStreamStats {
  bytesWritten: number;
  bytesSent: number;
  bytesAcknowledged: number;
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportWriter)
 * @category Platform
 */
interface WebTransportWriter extends WritableStreamDefaultWriter<Uint8Array> {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportWriter/atomicWrite) */
  atomicWrite(chunk: any): Promise<undefined>;
}

/** The constructor object for {@linkcode WebTransportWriter}.
 *
 * Instances are obtained from a {@linkcode WebTransportSendStream} rather than
 * constructed directly.
 *
 * @category Platform */
declare var WebTransportWriter: {
  prototype: WebTransportWriter;
  new (): WebTransportWriter;
};

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportReceiveStream)
 * @category Platform
 */
interface WebTransportReceiveStream extends ReadableStream<Uint8Array> {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportReceiveStream/getStats) */
  getStats(): Promise<WebTransportReceiveStreamStats>;
}

/** The constructor object for {@linkcode WebTransportReceiveStream}.
 *
 * Instances are obtained from a {@linkcode WebTransport} session rather than
 * constructed directly.
 *
 * @category Platform */
declare var WebTransportReceiveStream: {
  prototype: WebTransportReceiveStream;
  new (): WebTransportReceiveStream;
};

/** @category Platform */
interface WebTransportReceiveStreamStats {
  bytesReceived: number;
  bytesRead: number;
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportSendGroup)
 * @category Platform
 */
interface WebTransportSendGroup {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportSendGroup/getStats) */
  getStats(): Promise<WebTransportSendStreamStats>;
}

/** The constructor object for {@linkcode WebTransportSendGroup}.
 *
 * Instances are obtained from a {@linkcode WebTransport} session rather than
 * constructed directly.
 *
 * @category Platform */
declare var WebTransportSendGroup: {
  prototype: WebTransportSendGroup;
  new (): WebTransportSendGroup;
};

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportError)
 * @category Platform
 */
interface WebTransportError extends DOMException {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportError/source) */
  readonly source: WebTransportErrorSource;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebTransportError/streamErrorCode) */
  readonly streamErrorCode: number | null;
}

/** The constructor object for {@linkcode WebTransportError}, used to construct
 * an error describing a failure of a {@linkcode WebTransport} session or one of
 * its streams.
 *
 * @category Platform */
declare var WebTransportError: {
  prototype: WebTransportError;
  new (message?: string, options?: WebTransportErrorOptions): WebTransportError;
};

/** @category Platform */
type WebTransportCongestionControl = "default" | "low-latency" | "throughput";

/** @category Platform */
type WebTransportErrorSource = "session" | "stream";

/**
 * @category Geometry Interfaces Module API
 * @experimental
 */
interface DOMMatrix2DInit {
  a?: number;
  b?: number;
  c?: number;
  d?: number;
  e?: number;
  f?: number;
  m11?: number;
  m12?: number;
  m21?: number;
  m22?: number;
  m41?: number;
  m42?: number;
}

/**
 * @category Geometry Interfaces Module API
 * @experimental
 */
interface DOMMatrixInit extends DOMMatrix2DInit {
  is2D?: boolean;
  m13?: number;
  m14?: number;
  m23?: number;
  m24?: number;
  m31?: number;
  m32?: number;
  m33?: number;
  m34?: number;
  m43?: number;
  m44?: number;
}

/**
 * The **`DOMMatrix`** interface represents 4×4 matrices, suitable for 2D and 3D operations including rotation and translation. It is a mutable version of the DOMMatrixReadOnly interface. The interface is available inside web workers.
 *
 * [MDN](https://developer.mozilla.org/docs/Web/API/DOMMatrix)
 *
 * ```
 * | m11 m21 m31 m41 |
 * | m12 m22 m32 m42 |
 * | m13 m23 m33 m43 |
 * | m14 m24 m34 m44 |
 * ```
 *
 * @category Geometry Interfaces Module API
 * @experimental
 */
interface DOMMatrix extends DOMMatrixReadOnly {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  a: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  b: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  c: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  d: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  e: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  f: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  m11: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  m12: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  m13: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  m14: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  m21: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  m22: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  m23: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  m24: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  m31: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  m32: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  m33: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  m34: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  m41: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  m42: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  m43: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties) */
  m44: number;
  /**
   * The **`invertSelf()`** method of the DOMMatrix interface inverts the original matrix. If the matrix cannot be inverted, the new matrix's components are all set to NaN and its is2D property is set to false.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/invertSelf)
   */
  invertSelf(): DOMMatrix;
  /**
   * The **`multiplySelf()`** method of the DOMMatrix interface multiplies a matrix by the otherMatrix parameter, computing the dot product of the original matrix and the specified matrix: A⋅B. If no matrix is specified as the multiplier, the matrix is multiplied by a matrix in which every element is 0 except the bottom-right corner and the element immediately above and to its left: m33 and m34. These have the default value of 1.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/multiplySelf)
   */
  multiplySelf(other?: DOMMatrixInit): DOMMatrix;
  /**
   * The **`preMultiplySelf()`** method of the DOMMatrix interface modifies the matrix by pre-multiplying it with the specified DOMMatrix. This is equivalent to the dot product B⋅A, where matrix A is the source matrix and B is the matrix given as an input to the method. If no matrix is specified as the multiplier, the matrix is multiplied by a matrix in which every element is 0 except the bottom-right corner and the element immediately above and to its left: m33 and m34. These have the default value of 1.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/preMultiplySelf)
   */
  preMultiplySelf(other?: DOMMatrixInit): DOMMatrix;
  /**
   * The **`rotateAxisAngleSelf()`** method of the DOMMatrix interface is a transformation method that rotates the source matrix by the given vector and angle, returning the altered matrix.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/rotateAxisAngleSelf)
   */
  rotateAxisAngleSelf(
    x?: number,
    y?: number,
    z?: number,
    angle?: number,
  ): DOMMatrix;
  /**
   * The **`rotateFromVectorSelf()`** method of the DOMMatrix interface is a mutable transformation method that modifies a matrix by rotating the matrix by the angle between the specified vector and (1, 0). The rotation angle is determined by the angle between the vector (1,0)T and (x,y)T in the clockwise direction, or (+/-)arctan(y/x). If x and y are both 0, the angle is specified as 0, and the matrix is not altered.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/rotateFromVectorSelf)
   */
  rotateFromVectorSelf(x?: number, y?: number): DOMMatrix;
  /**
   * The **`rotateSelf()`** method of the DOMMatrix interface is a mutable transformation method that modifies a matrix. It rotates the source matrix around each of its axes by the specified number of degrees and returns the rotated matrix.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/rotateSelf)
   */
  rotateSelf(rotX?: number, rotY?: number, rotZ?: number): DOMMatrix;
  /**
   * The **`scale3dSelf()`** method of the DOMMatrix interface is a mutable transformation method that modifies a matrix by applying a specified scaling factor to all three axes, centered on the given origin, with a default origin of (0, 0, 0), returning the 3D-scaled matrix.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/scale3dSelf)
   */
  scale3dSelf(
    scale?: number,
    originX?: number,
    originY?: number,
    originZ?: number,
  ): DOMMatrix;
  /**
   * The **`scaleSelf()`** method of the DOMMatrix interface is a mutable transformation method that modifies a matrix by applying a specified scaling factor, centered on the given origin, with a default origin of (0, 0), returning the scaled matrix.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/scaleSelf)
   */
  scaleSelf(
    scaleX?: number,
    scaleY?: number,
    scaleZ?: number,
    originX?: number,
    originY?: number,
    originZ?: number,
  ): DOMMatrix;
  /**
   * The **`setMatrixValue()`** method of the DOMMatrix interface replaces the contents of the matrix with the matrix described by the specified transform or transforms, returning itself.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/setMatrixValue)
   */
  setMatrixValue(transformList: string): DOMMatrix;
  /**
   * The **`skewXSelf()`** method of the DOMMatrix interface is a mutable transformation method that modifies a matrix. It skews the source matrix by applying the specified skew transformation along the X-axis and returns the skewed matrix.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/skewXSelf)
   */
  skewXSelf(sx?: number): DOMMatrix;
  /**
   * The **`skewYSelf()`** method of the DOMMatrix interface is a mutable transformation method that modifies a matrix. It skews the source matrix by applying the specified skew transformation along the Y-axis and returns the skewed matrix.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/skewYSelf)
   */
  skewYSelf(sy?: number): DOMMatrix;
  /**
   * The **`translateSelf()`** method of the DOMMatrix interface is a mutable transformation method that modifies a matrix. It applies the specified vectors and returns the updated matrix. The default vector is [0, 0, 0].
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/translateSelf)
   */
  translateSelf(tx?: number, ty?: number, tz?: number): DOMMatrix;
}

/**
 * The **`DOMMatrix`** interface represents 4×4 matrices, suitable for 2D and 3D operations including rotation and translation. It is a mutable version of the DOMMatrixReadOnly interface. The interface is available inside web workers.
 *
 * [MDN](https://developer.mozilla.org/docs/Web/API/DOMMatrix)
 *
 * ```
 * | m11 m21 m31 m41 |
 * | m12 m22 m32 m42 |
 * | m13 m23 m33 m43 |
 * | m14 m24 m34 m44 |
 * ```
 *
 * @category Geometry Interfaces Module API
 * @experimental
 */
declare var DOMMatrix: {
  prototype: DOMMatrix;
  new (init?: string | number[]): DOMMatrix;
  /**
   * The **`fromFloat32Array()`** static method of the DOMMatrix interface creates a new DOMMatrix object given an array of single-precision (32-bit) floating-point values.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/fromFloat32Array_static)
   */
  fromFloat32Array(array32: Float32Array<ArrayBuffer>): DOMMatrix;
  /**
   * The **`fromFloat64Array()`** static method of the DOMMatrix interface creates a new DOMMatrix object given an array of double-precision (64-bit) floating-point values.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/fromFloat64Array_static)
   */
  fromFloat64Array(array64: Float64Array<ArrayBuffer>): DOMMatrix;
  /**
   * The **`fromMatrix()`** static method of the DOMMatrix interface creates a new DOMMatrix object given an existing matrix or an object which provides the values for its properties.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/fromMatrix_static)
   */
  fromMatrix(other?: DOMMatrixInit): DOMMatrix;
};

/**
 * The **`DOMMatrixReadOnly`** interface represents a read-only 4×4 matrix, suitable for 2D and 3D operations. The DOMMatrix interface — which is based upon DOMMatrixReadOnly—adds mutability, allowing you to alter the matrix after creating it.
 *
 * [MDN](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly)
 *
 * ```
 * | m11 m21 m31 m41 |
 * | m12 m22 m32 m42 |
 * | m13 m23 m33 m43 |
 * | m14 m24 m34 m44 |
 * ```
 *
 * @category Geometry Interfaces Module API
 * @experimental
 */
interface DOMMatrixReadOnly {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly a: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly b: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly c: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly d: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly e: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly f: number;
  /**
   * The readonly **`is2D`** property of the DOMMatrixReadOnly interface is a Boolean flag that is true when the matrix is 2D. The value is true if the matrix was initialized as a 2D matrix and only 2D transformation operations were applied. Otherwise, the matrix is defined in 3D, and is2D is false.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/is2D)
   */
  readonly is2D: boolean;
  /**
   * The readonly **`isIdentity`** property of the DOMMatrixReadOnly interface is a Boolean whose value is true if the matrix is the identity matrix.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/isIdentity)
   */
  readonly isIdentity: boolean;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly m11: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly m12: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly m13: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly m14: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly m21: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly m22: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly m23: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly m24: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly m31: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly m32: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly m33: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly m34: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly m41: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly m42: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly m43: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties) */
  readonly m44: number;
  /**
   * The **`flipX()`** method of the DOMMatrixReadOnly interface creates a new matrix being the result of the original matrix flipped about the x-axis. This is equivalent to multiplying the matrix by DOMMatrix(-1, 0, 0, 1, 0, 0). The original matrix is not modified.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/flipX)
   */
  flipX(): DOMMatrix;
  /**
   * The **`flipY()`** method of the DOMMatrixReadOnly interface creates a new matrix being the result of the original matrix flipped about the y-axis. This is equivalent to multiplying the matrix by DOMMatrix(1, 0, 0, -1, 0, 0). The original matrix is not modified.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/flipY)
   */
  flipY(): DOMMatrix;
  /**
   * The **`inverse()`** method of the DOMMatrixReadOnly interface creates a new matrix which is the inverse of the original matrix. If the matrix cannot be inverted, the new matrix's components are all set to NaN and its is2D property is set to false. The original matrix is not changed.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/inverse)
   */
  inverse(): DOMMatrix;
  /**
   * The **`multiply()`** method of the DOMMatrixReadOnly interface creates and returns a new matrix which is the dot product of the matrix and the otherMatrix parameter. If otherMatrix is omitted, the matrix is multiplied by a matrix in which every element is 0 except the bottom-right corner and the element immediately above and to its left: m33 and m34. These have the default value of 1. The original matrix is not modified.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/multiply)
   */
  multiply(other?: DOMMatrixInit): DOMMatrix;
  /**
   * The **`rotate()`** method of the DOMMatrixReadOnly interface returns a new DOMMatrix created by rotating the source matrix around each of its axes by the specified number of degrees. The original matrix is not altered.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/rotate)
   */
  rotate(rotX?: number, rotY?: number, rotZ?: number): DOMMatrix;
  /**
   * The **`rotateAxisAngle()`** method of the DOMMatrixReadOnly interface returns a new DOMMatrix created by rotating the source matrix by the given vector and angle. The original matrix is not altered.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/rotateAxisAngle)
   */
  rotateAxisAngle(
    x?: number,
    y?: number,
    z?: number,
    angle?: number,
  ): DOMMatrix;
  /**
   * The **`rotateFromVector()`** method of the DOMMatrixReadOnly interface is returns a new DOMMatrix created by rotating the source matrix by the angle between the specified vector and (1, 0). The rotation angle is determined by the angle between the vector (1,0)T and (x,y)T in the clockwise direction, or (+/-)arctan(y/x). If x and y are both 0, the angle is specified as 0. The original matrix is not altered.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/rotateFromVector)
   */
  rotateFromVector(x?: number, y?: number): DOMMatrix;
  /**
   * The **`scale()`** method of the DOMMatrixReadOnly interface creates a new matrix being the result of the original matrix with a scale transform applied.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/scale)
   */
  scale(
    scaleX?: number,
    scaleY?: number,
    scaleZ?: number,
    originX?: number,
    originY?: number,
    originZ?: number,
  ): DOMMatrix;
  /**
   * The **`scale3d()`** method of the DOMMatrixReadOnly interface creates a new matrix which is the result of a 3D scale transform being applied to the matrix. It returns a new DOMMatrix created by scaling the source 3d matrix by the given scale factor centered on the origin point specified by the origin parameters, with a default origin of (0, 0, 0). The original matrix is not modified.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/scale3d)
   */
  scale3d(
    scale?: number,
    originX?: number,
    originY?: number,
    originZ?: number,
  ): DOMMatrix;
  /** @deprecated */
  scaleNonUniform(scaleX?: number, scaleY?: number): DOMMatrix;
  /**
   * The **`skewX()`** method of the DOMMatrixReadOnly interface returns a new DOMMatrix created by applying the specified skew transformation to the source matrix along its x-axis. The original matrix is not modified.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/skewX)
   */
  skewX(sx?: number): DOMMatrix;
  /**
   * The **`skewY()`** method of the DOMMatrixReadOnly interface returns a new DOMMatrix created by applying the specified skew transformation to the source matrix along its y-axis. The original matrix is not modified.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/skewY)
   */
  skewY(sy?: number): DOMMatrix;
  /**
   * The **`toFloat32Array()`** method of the DOMMatrixReadOnly interface returns a new Float32Array containing all 16 elements (m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) which comprise the matrix. The elements are stored into the array as single-precision floating-point numbers in column-major (colexographical access, or "colex") order. (In other words, down the first column from top to bottom, then the second column, and so forth.)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/toFloat32Array)
   */
  toFloat32Array(): Float32Array<ArrayBuffer>;
  /**
   * The **`toFloat64Array()`** method of the DOMMatrixReadOnly interface returns a new Float64Array containing all 16 elements (m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) which comprise the matrix. The elements are stored into the array as double-precision floating-point numbers in column-major (colexographical access, or "colex") order. (In other words, down the first column from top to bottom, then the second column, and so forth.)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/toFloat64Array)
   */
  toFloat64Array(): Float64Array<ArrayBuffer>;
  /**
   * The **`toJSON()`** method of the DOMMatrixReadOnly interface creates and returns a JSON object. The JSON object includes the 2D matrix elements a through f, the 16 elements of the 4X4 3D matrix, m[1-4][1-4], the boolean is2D property, and the boolean isIdentity property.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/toJSON)
   */
  toJSON(): any;
  /**
   * The **`transformPoint`** method of the DOMMatrixReadOnly interface creates a new DOMPoint object, transforming a specified point by the matrix. Neither the matrix nor the original point are altered.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/transformPoint)
   */
  transformPoint(point?: DOMPointInit): DOMPoint;
  /**
   * The **`translate()`** method of the DOMMatrixReadOnly interface creates a new matrix being the result of the original matrix with a translation applied.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/translate)
   */
  translate(tx?: number, ty?: number, tz?: number): DOMMatrix;
  toString(): string;
}

/**
 * The **`DOMMatrixReadOnly`** interface represents a read-only 4×4 matrix, suitable for 2D and 3D operations. The DOMMatrix interface — which is based upon DOMMatrixReadOnly—adds mutability, allowing you to alter the matrix after creating it.
 *
 * [MDN](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly)
 *
 * ```
 * | m11 m21 m31 m41 |
 * | m12 m22 m32 m42 |
 * | m13 m23 m33 m43 |
 * | m14 m24 m34 m44 |
 * ```
 *
 * @category Geometry Interfaces Module API
 * @experimental
 */
declare var DOMMatrixReadOnly: {
  prototype: DOMMatrixReadOnly;
  new (init?: string | number[]): DOMMatrixReadOnly;
  /**
   * The **`fromFloat32Array()`** static method of the DOMMatrixReadOnly interface creates a new DOMMatrixReadOnly object given an array of single-precision (32-bit) floating-point values.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/fromFloat32Array_static)
   */
  fromFloat32Array(array32: Float32Array<ArrayBuffer>): DOMMatrixReadOnly;
  /**
   * The **`fromFloat64Array()`** static method of the DOMMatrixReadOnly interface creates a new DOMMatrixReadOnly object given an array of double-precision (64-bit) floating-point values.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/fromFloat64Array_static)
   */
  fromFloat64Array(array64: Float64Array<ArrayBuffer>): DOMMatrixReadOnly;
  /**
   * The **`fromMatrix()`** static method of the DOMMatrixReadOnly interface creates a new DOMMatrixReadOnly object given an existing matrix or an object which provides the values for its properties.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/fromMatrix_static)
   */
  fromMatrix(other?: DOMMatrixInit): DOMMatrixReadOnly;
};

/**
 * @category Geometry Interfaces Module API
 * @experimental
 */
interface DOMPointInit {
  w?: number;
  x?: number;
  y?: number;
  z?: number;
}

/**
 * A **`DOMPoint`** object represents a 2D or 3D point in a coordinate system; it includes values for the coordinates in up to three dimensions, as well as an optional perspective value. DOMPoint is based on DOMPointReadOnly but allows its properties' values to be changed.
 *
 * [MDN](https://developer.mozilla.org/docs/Web/API/DOMPoint)
 *
 * @category Geometry Interfaces Module API
 * @experimental
 */
interface DOMPoint extends DOMPointReadOnly {
  /**
   * The DOMPoint interface's **`w`** property holds the point's perspective value, w, for a point in space.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPoint/w)
   */
  w: number;
  /**
   * The DOMPoint interface's **`x`** property holds the horizontal coordinate, x, for a point in space.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPoint/x)
   */
  x: number;
  /**
   * The DOMPoint interface's **`y`** property holds the vertical coordinate, y, for a point in space.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPoint/y)
   */
  y: number;
  /**
   * The DOMPoint interface's **`z`** property specifies the depth coordinate of a point in space.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPoint/z)
   */
  z: number;
}

/**
 * A **`DOMPoint`** object represents a 2D or 3D point in a coordinate system; it includes values for the coordinates in up to three dimensions, as well as an optional perspective value. DOMPoint is based on DOMPointReadOnly but allows its properties' values to be changed.
 *
 * [MDN](https://developer.mozilla.org/docs/Web/API/DOMPoint)
 *
 * @category Geometry Interfaces Module API
 * @experimental
 */
declare var DOMPoint: {
  prototype: DOMPoint;
  new (x?: number, y?: number, z?: number, w?: number): DOMPoint;
  /**
   * The **`fromPoint()`** static method of the DOMPoint interface creates and returns a new mutable DOMPoint object given a source point.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPoint/fromPoint_static)
   */
  fromPoint(other?: DOMPointInit): DOMPoint;
};

/**
 * The **`DOMPointReadOnly`** interface specifies the coordinate and perspective fields used by DOMPoint to define a 2D or 3D point in a coordinate system.
 *
 * [MDN](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly)
 *
 * @category Geometry Interfaces Module API
 * @experimental
 */
interface DOMPointReadOnly {
  /**
   * The DOMPointReadOnly interface's **`w`** property holds the point's perspective value, w, for a read-only point in space.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly/w)
   */
  readonly w: number;
  /**
   * The DOMPointReadOnly interface's **`x`** property holds the horizontal coordinate, x, for a read-only point in space. This property cannot be changed by JavaScript code in this read-only version of the DOMPoint object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly/x)
   */
  readonly x: number;
  /**
   * The DOMPointReadOnl**`y`** interface's y property holds the vertical coordinate, y, for a read-only point in space.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly/y)
   */
  readonly y: number;
  /**
   * The DOMPointReadOnly interface's **`z`** property holds the depth coordinate, z, for a read-only point in space.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly/z)
   */
  readonly z: number;
  /**
   * The **`matrixTransform()`** method of the DOMPointReadOnly interface applies a matrix transform specified as an object to the DOMPointReadOnly object, creating and returning a new DOMPointReadOnly object. Neither the matrix nor the point are altered.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly/matrixTransform)
   */
  matrixTransform(matrix?: DOMMatrixInit): DOMPoint;
  /**
   * The DOMPointReadOnly method **`toJSON()`** returns an object giving the JSON form of the point object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly/toJSON)
   */
  toJSON(): any;
}

/**
 * The **`DOMPointReadOnly`** interface specifies the coordinate and perspective fields used by DOMPoint to define a 2D or 3D point in a coordinate system.
 *
 * [MDN](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly)
 *
 * @category Geometry Interfaces Module API
 * @experimental
 */
declare var DOMPointReadOnly: {
  prototype: DOMPointReadOnly;
  new (x?: number, y?: number, z?: number, w?: number): DOMPointReadOnly;
  /**
   * The static DOMPointReadOnly method **`fromPoint()`** creates and returns a new DOMPointReadOnly object given a source point.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly/fromPoint_static)
   */
  fromPoint(other?: DOMPointInit): DOMPointReadOnly;
};

/**
 * @category Geometry Interfaces Module API
 * @experimental
 */
interface DOMQuadInit {
  p1?: DOMPointInit;
  p2?: DOMPointInit;
  p3?: DOMPointInit;
  p4?: DOMPointInit;
}

/**
 * A **`DOMQuad`** is a collection of four DOMPoints defining the corners of an arbitrary quadrilateral. Returning DOMQuads lets getBoxQuads() return accurate information even when arbitrary 2D or 3D transforms are present. It has a handy bounds attribute returning a DOMRectReadOnly for those cases where you just want an axis-aligned bounding rectangle.
 *
 * [MDN](https://developer.mozilla.org/docs/Web/API/DOMQuad)
 *
 * @category Geometry Interfaces Module API
 * @experimental
 */
interface DOMQuad {
  /**
   * The DOMQuad interface's **`p1`** property holds the DOMPoint object that represents one of the four corners of the DOMQuad. When created from DOMQuad.fromRect(), it is the point (x, y).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMQuad/p1)
   */
  readonly p1: DOMPoint;
  /**
   * The DOMQuad interface's **`p2`** property holds the DOMPoint object that represents one of the four corners of the DOMQuad. When created from DOMQuad.fromRect(), it is the point (x + width, y).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMQuad/p2)
   */
  readonly p2: DOMPoint;
  /**
   * The DOMQuad interface's **`p3`** property holds the DOMPoint object that represents one of the four corners of the DOMQuad. When created from DOMQuad.fromRect(), it is the point (x + width, y + height).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMQuad/p3)
   */
  readonly p3: DOMPoint;
  /**
   * The DOMQuad interface's **`p4`** property holds the DOMPoint object that represents one of the four corners of the DOMQuad. When created from DOMQuad.fromRect(), it is the point (x, y + height).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMQuad/p4)
   */
  readonly p4: DOMPoint;
  /**
   * The DOMQuad method **`getBounds()`** returns a DOMRect object representing the smallest rectangle that fully contains the DOMQuad object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMQuad/getBounds)
   */
  getBounds(): DOMRect;
  /**
   * The DOMQuad method **`toJSON()`** returns a JSON representation of the DOMQuad object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMQuad/toJSON)
   */
  toJSON(): any;
}

/**
 * A **`DOMQuad`** is a collection of four DOMPoints defining the corners of an arbitrary quadrilateral. Returning DOMQuads lets getBoxQuads() return accurate information even when arbitrary 2D or 3D transforms are present. It has a handy bounds attribute returning a DOMRectReadOnly for those cases where you just want an axis-aligned bounding rectangle.
 *
 * [MDN](https://developer.mozilla.org/docs/Web/API/DOMQuad)
 *
 * @category Geometry Interfaces Module API
 * @experimental
 */
declare var DOMQuad: {
  prototype: DOMQuad;
  new (
    p1?: DOMPointInit,
    p2?: DOMPointInit,
    p3?: DOMPointInit,
    p4?: DOMPointInit,
  ): DOMQuad;
  /**
   * The **`fromQuad()`** static method of the DOMQuad interface returns a new DOMQuad object based on the provided set of coordinates in the shape of another DOMQuad object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMQuad/fromQuad_static)
   */
  fromQuad(other?: DOMQuadInit): DOMQuad;
  /**
   * The **`fromRect()`** static method of the DOMQuad interface returns a new DOMQuad object based on the provided set of coordinates in the shape of a DOMRect object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMQuad/fromRect_static)
   */
  fromRect(other?: DOMRectInit): DOMQuad;
};

/**
 * @category Geometry Interfaces Module API
 * @experimental
 */
interface DOMRectInit {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}

/**
 * A **`DOMRect`** describes the size and position of a rectangle.
 *
 * [MDN](https://developer.mozilla.org/docs/Web/API/DOMRect)
 *
 * @category Geometry Interfaces Module API
 * @experimental
 */
interface DOMRect extends DOMRectReadOnly {
  /**
   * The **`height`** property of the DOMRect interface represents the height of the rectangle. The value can be negative.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRect/height)
   */
  height: number;
  /**
   * The **`width`** property of the DOMRect interface represents the width of the rectangle. The value can be negative.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRect/width)
   */
  width: number;
  /**
   * The **`x`** property of the DOMRect interface represents the x-coordinate of the rectangle, which is the horizontal distance between the viewport's left edge and the rectangle's origin.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRect/x)
   */
  x: number;
  /**
   * The **`y`** property of the DOMRect interface represents the y-coordinate of the rectangle, which is the vertical distance between the viewport's top edge and the rectangle's origin.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRect/y)
   */
  y: number;
}

/**
 * A **`DOMRect`** describes the size and position of a rectangle.
 *
 * [MDN](https://developer.mozilla.org/docs/Web/API/DOMRect)
 *
 * @category Geometry Interfaces Module API
 * @experimental
 */
declare var DOMRect: {
  prototype: DOMRect;
  new (x?: number, y?: number, width?: number, height?: number): DOMRect;
  /**
   * The **`fromRect()`** static method of the DOMRect object creates a new DOMRect object with a given location and dimensions.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRect/fromRect_static)
   */
  fromRect(other?: DOMRectInit): DOMRect;
};

/**
 * The **`DOMRectReadOnly`** interface specifies the standard properties (also used by DOMRect) to define a rectangle whose properties are immutable.
 *
 * [MDN](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly)
 *
 * @category Geometry Interfaces Module API
 * @experimental
 */
interface DOMRectReadOnly {
  /**
   * The **`bottom`** read-only property of the DOMRectReadOnly interface returns the bottom coordinate value of the DOMRect. (Has the same value as y + height, or y if height is negative.)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/bottom)
   */
  readonly bottom: number;
  /**
   * The **`height`** read-only property of the DOMRectReadOnly interface represents the height of the DOMRect.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/height)
   */
  readonly height: number;
  /**
   * The **`left`** read-only property of the DOMRectReadOnly interface returns the left coordinate value of the DOMRect. (Has the same value as x, or x + width if width is negative.)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/left)
   */
  readonly left: number;
  /**
   * The **`right`** read-only property of the DOMRectReadOnly interface returns the right coordinate value of the DOMRect. (Has the same value as x + width, or x if width is negative.)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/right)
   */
  readonly right: number;
  /**
   * The **`top`** read-only property of the DOMRectReadOnly interface returns the top coordinate value of the DOMRect. (Has the same value as y, or y + height if height is negative.)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/top)
   */
  readonly top: number;
  /**
   * The **`width`** read-only property of the DOMRectReadOnly interface represents the width of the DOMRect.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/width)
   */
  readonly width: number;
  /**
   * The **`x`** read-only property of the DOMRectReadOnly interface represents the x coordinate of the DOMRect's origin.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/x)
   */
  readonly x: number;
  /**
   * The **`y`** read-only property of the DOMRectReadOnly interface represents the y coordinate of the DOMRect's origin.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/y)
   */
  readonly y: number;
  /**
   * The DOMRectReadOnly method **`toJSON()`** returns a JSON representation of the DOMRectReadOnly object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/toJSON)
   */
  toJSON(): any;
}

/**
 * The **`DOMRectReadOnly`** interface specifies the standard properties (also used by DOMRect) to define a rectangle whose properties are immutable.
 *
 * [MDN](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly)
 *
 * @category Geometry Interfaces Module API
 * @experimental
 */
declare var DOMRectReadOnly: {
  prototype: DOMRectReadOnly;
  new (
    x?: number,
    y?: number,
    width?: number,
    height?: number,
  ): DOMRectReadOnly;
  /**
   * The **`fromRect()`** static method of the DOMRectReadOnly object creates a new DOMRectReadOnly object with a given location and dimensions.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/fromRect_static)
   */
  fromRect(other?: DOMRectInit): DOMRectReadOnly;
};

// Copyright 2018-2026 the Deno authors. MIT license.

// deno-lint-ignore-file no-explicit-any no-var

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

/** @category Platform */
interface DomIterable<K, V> {
  keys(): IterableIterator<K>;
  values(): IterableIterator<V>;
  entries(): IterableIterator<[K, V]>;
  [Symbol.iterator](): IterableIterator<[K, V]>;
  forEach(
    callback: (value: V, key: K, parent: this) => void,
    thisArg?: any,
  ): void;
}

/** @category Fetch */
type FormDataEntryValue = File | string;

/** Provides a way to easily construct a set of key/value pairs representing
 * form fields and their values, which can then be easily sent using the
 * XMLHttpRequest.send() method. It uses the same format a form would use if the
 * encoding type were set to "multipart/form-data".
 *
 * @category Fetch
 */
interface FormData extends DomIterable<string, FormDataEntryValue> {
  append(name: string, value: string | Blob, fileName?: string): void;
  delete(name: string): void;
  get(name: string): FormDataEntryValue | null;
  getAll(name: string): FormDataEntryValue[];
  has(name: string): boolean;
  set(name: string, value: string | Blob, fileName?: string): void;
}

/** Provides a way to construct a set of key/value pairs representing form
 * fields and their values, which can then be sent using the {@linkcode fetch}
 * API. It uses the same format a form would use if the encoding type were set
 * to `"multipart/form-data"`.
 *
 * @see https://developer.mozilla.org/docs/Web/API/FormData
 *
 * @category Fetch
 */
declare var FormData: {
  readonly prototype: FormData;
  new (): FormData;
};

/** @category Fetch */
interface Body {
  /** A simple getter used to expose a `ReadableStream` of the body contents. */
  readonly body: ReadableStream<Uint8Array<ArrayBuffer>> | null;
  /** Stores a `Boolean` that declares whether the body has been used in a
   * response yet.
   */
  readonly bodyUsed: boolean;
  /** Takes a `Response` stream and reads it to completion. It returns a promise
   * that resolves with an `ArrayBuffer`.
   */
  arrayBuffer(): Promise<ArrayBuffer>;
  /** Takes a `Response` stream and reads it to completion. It returns a promise
   * that resolves with a `Blob`.
   */
  blob(): Promise<Blob>;
  /** Takes a `Response` stream and reads it to completion. It returns a promise
   * that resolves with a `Uint8Array`.
   */
  bytes(): Promise<Uint8Array<ArrayBuffer>>;
  /** Takes a `Response` stream and reads it to completion. It returns a promise
   * that resolves with a `FormData` object.
   */
  formData(): Promise<FormData>;
  /** Takes a `Response` stream and reads it to completion. It returns a promise
   * that resolves with the result of parsing the body text as JSON.
   */
  json(): Promise<any>;
  /** Takes a `Response` stream and reads it to completion. It returns a promise
   * that resolves with a `USVString` (text).
   */
  text(): Promise<string>;
  /** Takes a `Response` body stream and returns a `ReadableStream<string>`
   * that streams the body decoded as UTF-8 text. */
  textStream(): ReadableStream<string>;
}

/** @category Fetch */
type HeadersInit = Iterable<string[]> | Record<string, string>;

/** This Fetch API interface allows you to perform various actions on HTTP
 * request and response headers. These actions include retrieving, setting,
 * adding to, and removing. A Headers object has an associated header list,
 * which is initially empty and consists of zero or more name and value pairs.
 * You can add to this using methods like append() (see Examples). In all
 * methods of this interface, header names are matched by case-insensitive byte
 * sequence.
 *
 * @category Fetch
 */
interface Headers extends DomIterable<string, string> {
  /** Appends a new value onto an existing header inside a `Headers` object, or
   * adds the header if it does not already exist.
   */
  append(name: string, value: string): void;
  /** Deletes a header from a `Headers` object. */
  delete(name: string): void;
  /** Returns a `ByteString` sequence of all the values of a header within a
   * `Headers` object with a given name.
   */
  get(name: string): string | null;
  /** Returns a boolean stating whether a `Headers` object contains a certain
   * header.
   */
  has(name: string): boolean;
  /** Sets a new value for an existing header inside a Headers object, or adds
   * the header if it does not already exist.
   */
  set(name: string, value: string): void;
  /** Returns an array containing the values of all `Set-Cookie` headers
   * associated with a response.
   */
  getSetCookie(): string[];
}

/** This Fetch API interface allows you to perform various actions on HTTP
 * request and response headers. These actions include retrieving, setting,
 * adding to, and removing. A Headers object has an associated header list,
 * which is initially empty and consists of zero or more name and value pairs.
 * You can add to this using methods like append() (see Examples). In all
 * methods of this interface, header names are matched by case-insensitive byte
 * sequence.
 *
 * @category Fetch
 */
declare var Headers: {
  readonly prototype: Headers;
  new (init?: HeadersInit): Headers;
};

/** @category Fetch */
type RequestInfo = Request | string;
/** @category Fetch */
type RequestCache =
  | "default"
  | "force-cache"
  | "no-cache"
  | "no-store"
  | "only-if-cached"
  | "reload";
/** @category Fetch */
type RequestCredentials = "include" | "omit" | "same-origin";
/** @category Fetch */
type RequestMode = "cors" | "navigate" | "no-cors" | "same-origin";
/** @category Fetch */
type RequestRedirect = "error" | "follow" | "manual";
/** @category Fetch */
type RequestPriority = "auto" | "high" | "low";
/** @category Fetch */
type ReferrerPolicy =
  | ""
  | "no-referrer"
  | "no-referrer-when-downgrade"
  | "origin"
  | "origin-when-cross-origin"
  | "same-origin"
  | "strict-origin"
  | "strict-origin-when-cross-origin"
  | "unsafe-url";
/** @category Fetch */
type BodyInit =
  | Blob
  | BufferSource
  | FormData
  | URLSearchParams
  | ReadableStream<Uint8Array>
  | Iterable<Uint8Array>
  | AsyncIterable<Uint8Array>
  | string;
/** @category Fetch */
type RequestDestination =
  | ""
  | "audio"
  | "audioworklet"
  | "document"
  | "embed"
  | "font"
  | "image"
  | "manifest"
  | "object"
  | "paintworklet"
  | "report"
  | "script"
  | "sharedworker"
  | "style"
  | "track"
  | "video"
  | "worker"
  | "xslt";

/** @category Fetch */
interface RequestInit {
  /**
   * A BodyInit object or null to set request's body.
   */
  body?: BodyInit | null;
  /**
   * A string indicating how the request will interact with the browser's cache
   * to set request's cache.
   */
  cache?: RequestCache;
  /**
   * A string indicating whether credentials will be sent with the request
   * always, never, or only when sent to a same-origin URL. Sets request's
   * credentials.
   */
  credentials?: RequestCredentials;
  /**
   * A Headers object, an object literal, or an array of two-item arrays to set
   * request's headers.
   */
  headers?: HeadersInit;
  /**
   * A cryptographic hash of the resource to be fetched by request. Sets
   * request's integrity.
   */
  integrity?: string;
  /**
   * A boolean to set request's keepalive.
   */
  keepalive?: boolean;
  /**
   * A string to set request's method.
   */
  method?: string;
  /**
   * A string to indicate whether the request will use CORS, or will be
   * restricted to same-origin URLs. Sets request's mode.
   */
  mode?: RequestMode;
  /**
   * A string indicating the relative priority of the request. Sets request's
   * priority.
   */
  priority?: RequestPriority;
  /**
   * A string indicating whether request follows redirects, results in an error
   * upon encountering a redirect, or returns the redirect (in an opaque
   * fashion). Sets request's redirect.
   */
  redirect?: RequestRedirect;
  /**
   * A string whose value is a same-origin URL, "about:client", or the empty
   * string, to set request's referrer.
   */
  referrer?: string;
  /**
   * A referrer policy to set request's referrerPolicy.
   */
  referrerPolicy?: ReferrerPolicy;
  /**
   * An AbortSignal to set request's signal.
   */
  signal?: AbortSignal | null;
  /**
   * Can only be null. Used to disassociate request from any Window.
   */
  window?: any;
}

/** This Fetch API interface represents a resource request.
 *
 * @category Fetch
 */
interface Request extends Body {
  /**
   * Returns the cache mode associated with request, which is a string
   * indicating how the request will interact with the browser's cache when
   * fetching.
   */
  readonly cache: RequestCache;
  /**
   * Returns the credentials mode associated with request, which is a string
   * indicating whether credentials will be sent with the request always, never,
   * or only when sent to a same-origin URL.
   */
  readonly credentials: RequestCredentials;
  /**
   * Returns the kind of resource requested by request, e.g., "document" or "script".
   */
  readonly destination: RequestDestination;
  /**
   * Returns a Headers object consisting of the headers associated with request.
   * Note that headers added in the network layer by the user agent will not be
   * accounted for in this object, e.g., the "Host" header.
   */
  readonly headers: Headers;
  /**
   * Returns request's subresource integrity metadata, which is a cryptographic
   * hash of the resource being fetched. Its value consists of multiple hashes
   * separated by whitespace. [SRI]
   */
  readonly integrity: string;
  /**
   * Returns a boolean indicating whether or not request is for a history
   * navigation (a.k.a. back-forward navigation).
   */
  readonly isHistoryNavigation: boolean;
  /**
   * Returns a boolean indicating whether or not request is for a reload
   * navigation, e.g. a refresh triggered via the browser's reload control or
   * by calling location.reload().
   */
  readonly isReloadNavigation: boolean;
  /**
   * Returns a boolean indicating whether or not request can outlive the global
   * in which it was created.
   */
  readonly keepalive: boolean;
  /**
   * Returns request's HTTP method, which is "GET" by default.
   */
  readonly method: string;
  /**
   * Returns the mode associated with request, which is a string indicating
   * whether the request will use CORS, or will be restricted to same-origin
   * URLs.
   */
  readonly mode: RequestMode;
  /**
   * Returns the redirect mode associated with request, which is a string
   * indicating how redirects for the request will be handled during fetching. A
   * request will follow redirects by default.
   */
  readonly redirect: RequestRedirect;
  /**
   * Returns the referrer of request. Its value can be a same-origin URL if
   * explicitly set in init, the empty string to indicate no referrer, and
   * "about:client" when defaulting to the global's default. This is used during
   * fetching to determine the value of the `Referer` header of the request
   * being made.
   */
  readonly referrer: string;
  /**
   * Returns the referrer policy associated with request. This is used during
   * fetching to compute the value of the request's referrer.
   */
  readonly referrerPolicy: ReferrerPolicy;
  /**
   * Returns the signal associated with request, which is an AbortSignal object
   * indicating whether or not request has been aborted, and its abort event
   * handler.
   */
  readonly signal: AbortSignal;
  /**
   * Returns the URL of request as a string.
   */
  readonly url: string;
  clone(): Request;
}

/** This Fetch API interface represents a resource request.
 *
 * @category Fetch
 */
declare var Request: {
  readonly prototype: Request;
  new (input: RequestInfo | URL, init?: RequestInit): Request;
};

/** @category Fetch */
interface ResponseInit {
  headers?: HeadersInit;
  status?: number;
  statusText?: string;
}

/** @category Fetch */
type ResponseType =
  | "basic"
  | "cors"
  | "default"
  | "error"
  | "opaque"
  | "opaqueredirect";

/** This Fetch API interface represents the response to a request.
 *
 * @category Fetch
 */
interface Response extends Body {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
}

/** This Fetch API interface represents the response to a request.
 *
 * @category Fetch
 */
declare var Response: {
  readonly prototype: Response;
  new (body?: BodyInit | null, init?: ResponseInit): Response;
  json(data: unknown, init?: ResponseInit): Response;
  error(): Response;
  redirect(url: string | URL, status?: number): Response;
};

/** Fetch a resource from the network. It returns a `Promise` that resolves to the
 * `Response` to that `Request`, whether it is successful or not.
 *
 * ```ts
 * const response = await fetch("http://my.json.host/data.json");
 * console.log(response.status);  // e.g. 200
 * console.log(response.statusText); // e.g. "OK"
 * const jsonData = await response.json();
 * ```
 *
 * @tags allow-net, allow-read
 * @category Fetch
 */
declare function fetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response>;

/**
 * @category Fetch
 */
interface EventSourceInit {
  withCredentials?: boolean;
  headers?: HeadersInit;
}

/**
 * @category Fetch
 */
interface EventSourceEventMap {
  "error": Event;
  "message": MessageEvent;
  "open": Event;
}

/** Represents a connection to a server that sends
 * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events),
 * receiving updates pushed by the server as a stream of `message` events over a
 * persistent HTTP connection that automatically reconnects when interrupted.
 *
 * @category Fetch
 */
interface EventSource extends EventTarget {
  onerror: ((this: EventSource, ev: Event) => any) | null;
  onmessage: ((this: EventSource, ev: MessageEvent) => any) | null;
  onopen: ((this: EventSource, ev: Event) => any) | null;
  /**
   * Returns the state of this EventSource object's connection. It can have the values described below.
   */
  readonly readyState: number;
  /**
   * Returns the URL providing the event stream.
   */
  readonly url: string;
  /**
   * Returns true if the credentials mode for connection requests to the URL providing the event stream is set to "include", and false otherwise.
   */
  readonly withCredentials: boolean;
  /**
   * Aborts any instances of the fetch algorithm started for this EventSource object, and sets the readyState attribute to CLOSED.
   */
  close(): void;
  readonly CONNECTING: 0;
  readonly OPEN: 1;
  readonly CLOSED: 2;
  addEventListener<K extends keyof EventSourceEventMap>(
    type: K,
    listener: (this: EventSource, ev: EventSourceEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: (this: EventSource, event: MessageEvent) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof EventSourceEventMap>(
    type: K,
    listener: (this: EventSource, ev: EventSourceEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: (this: EventSource, event: MessageEvent) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}

/** The `EventSource` interface is a web content's interface to server-sent
 * events. An `EventSource` instance opens a persistent connection to an HTTP
 * server, which sends events in `text/event-stream` format. The connection
 * remains open until closed by calling {@linkcode EventSource.close}.
 *
 * @see https://developer.mozilla.org/docs/Web/API/EventSource
 *
 * @category Fetch
 */
declare var EventSource: {
  prototype: EventSource;
  new (url: string | URL, eventSourceInitDict?: EventSourceInit): EventSource;
  readonly CONNECTING: 0;
  readonly OPEN: 1;
  readonly CLOSED: 2;
};

// Copyright 2018-2026 the Deno authors. MIT license.

// deno-lint-ignore-file no-explicit-any no-empty-interface

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

/** @category GPU */
interface GPUObjectBase {
  label: string;
}

/** @category GPU */
interface GPUObjectDescriptorBase {
  label?: string;
}

/** @category GPU */
declare class GPUSupportedLimits {
  readonly maxTextureDimension1D: number;
  readonly maxTextureDimension2D: number;
  readonly maxTextureDimension3D: number;
  readonly maxTextureArrayLayers: number;
  readonly maxBindGroups: number;
  // TODO(@crowlKats): support max_bind_groups_plus_vertex_buffers
  readonly maxBindGroupsPlusVertexBuffers: number;
  readonly maxBindingsPerBindGroup: number;
  readonly maxDynamicUniformBuffersPerPipelineLayout: number;
  readonly maxDynamicStorageBuffersPerPipelineLayout: number;
  readonly maxSampledTexturesPerShaderStage: number;
  readonly maxSamplersPerShaderStage: number;
  readonly maxStorageBuffersPerShaderStage: number;
  readonly maxStorageTexturesPerShaderStage: number;
  readonly maxUniformBuffersPerShaderStage: number;
  readonly maxUniformBufferBindingSize: number;
  readonly maxStorageBufferBindingSize: number;
  readonly minUniformBufferOffsetAlignment: number;
  readonly minStorageBufferOffsetAlignment: number;
  readonly maxVertexBuffers: number;
  readonly maxBufferSize: number;
  readonly maxVertexAttributes: number;
  readonly maxVertexBufferArrayStride: number;
  // TODO(@crowlKats): support max_inter_stage_shader_variables
  readonly maxInterStageShaderVariables: number;
  readonly maxColorAttachments: number;
  readonly maxColorAttachmentBytesPerSample: number;
  readonly maxComputeWorkgroupStorageSize: number;
  readonly maxComputeInvocationsPerWorkgroup: number;
  readonly maxComputeWorkgroupSizeX: number;
  readonly maxComputeWorkgroupSizeY: number;
  readonly maxComputeWorkgroupSizeZ: number;
  readonly maxComputeWorkgroupsPerDimension: number;
}

/** @category GPU */
declare class GPUSupportedFeatures {
  forEach(
    callbackfn: (
      value: GPUFeatureName,
      value2: GPUFeatureName,
      set: Set<GPUFeatureName>,
    ) => void,
    thisArg?: any,
  ): void;
  has(value: GPUFeatureName): boolean;
  size: number;
  [Symbol.iterator](): IterableIterator<GPUFeatureName>;
  entries(): IterableIterator<[GPUFeatureName, GPUFeatureName]>;
  keys(): IterableIterator<GPUFeatureName>;
  values(): IterableIterator<GPUFeatureName>;
}

/** @category GPU */
declare class GPUAdapterInfo {
  readonly vendor: string;
  readonly architecture: string;
  readonly device: string;
  readonly description: string;
  readonly subgroupMinSize: number;
  readonly subgroupMaxSize: number;
  readonly isFallbackAdapter: boolean;
}

/**
 * The entry point to WebGPU in Deno, accessed via the global navigator.gpu property.
 *
 * @example
 * ```ts
 * // Basic WebGPU initialization in Deno
 * const gpu = navigator.gpu;
 * if (!gpu) {
 *   console.error("WebGPU not supported in this Deno environment");
 *   Deno.exit(1);
 * }
 *
 * // Request an adapter (physical GPU device)
 * const adapter = await gpu.requestAdapter();
 * if (!adapter) {
 *   console.error("Couldn't request WebGPU adapter");
 *   Deno.exit(1);
 * }
 *
 * // Get the preferred format for canvas rendering
 * // Useful when working with canvas in browser/Deno environments
 * const preferredFormat = gpu.getPreferredCanvasFormat();
 * console.log(`Preferred canvas format: ${preferredFormat}`);
 *
 * // Create a device with default settings
 * const device = await adapter.requestDevice();
 * console.log("WebGPU device created successfully");
 * ```
 *
 * @category GPU
 */
declare class GPU {
  requestAdapter(
    options?: GPURequestAdapterOptions,
  ): Promise<GPUAdapter | null>;
  getPreferredCanvasFormat(): GPUTextureFormat;
}

/** @category GPU */
interface GPURequestAdapterOptions {
  powerPreference?: GPUPowerPreference;
  forceFallbackAdapter?: boolean;
}

/** @category GPU */
type GPUPowerPreference = "low-power" | "high-performance";

/**
 * Represents a physical GPU device that can be used to create a logical GPU device.
 *
 * @example
 * ```ts
 * // Request an adapter with specific power preference
 * const adapter = await navigator.gpu.requestAdapter({
 *   powerPreference: "high-performance"
 * });
 *
 * if (!adapter) {
 *   console.error("WebGPU not supported or no appropriate adapter found");
 *   Deno.exit(1);
 * }
 *
 * // Check adapter capabilities
 * if (adapter.features.has("shader-f16")) {
 *   console.log("Adapter supports 16-bit shader operations");
 * }
 *
 * console.log(`Maximum buffer size: ${adapter.limits.maxBufferSize} bytes`);
 *
 * // Get adapter info (vendor, device, etc.)
 * console.log(`GPU Vendor: ${adapter.info.vendor}`);
 * console.log(`GPU Device: ${adapter.info.device}`);
 *
 * // Request a logical device with specific features and limits
 * const device = await adapter.requestDevice({
 *   requiredFeatures: ["shader-f16"],
 *   requiredLimits: {
 *     maxStorageBufferBindingSize: 128 * 1024 * 1024, // 128MB
 *   }
 * });
 * ```
 *
 * @category GPU
 */
declare class GPUAdapter {
  readonly features: GPUSupportedFeatures;
  readonly limits: GPUSupportedLimits;
  readonly info: GPUAdapterInfo;

  requestDevice(descriptor?: GPUDeviceDescriptor): Promise<GPUDevice>;
}

/** @category GPU */
interface GPUDeviceDescriptor extends GPUObjectDescriptorBase {
  requiredFeatures?: GPUFeatureName[];
  requiredLimits?: Record<string, number | undefined>;
}

/** @category GPU */
type GPUFeatureName =
  | "depth-clip-control"
  | "timestamp-query"
  | "indirect-first-instance"
  | "shader-f16"
  | "depth32float-stencil8"
  | "texture-compression-bc"
  | "texture-compression-bc-sliced-3d"
  | "texture-compression-etc2"
  | "texture-compression-astc"
  | "rg11b10ufloat-renderable"
  | "bgra8unorm-storage"
  | "float32-filterable"
  | "dual-source-blending"
  | "subgroups"
  // extended from spec
  | "texture-format-16-bit-norm"
  | "texture-compression-astc-hdr"
  | "texture-adapter-specific-format-features"
  | "pipeline-statistics-query"
  | "timestamp-query-inside-passes"
  | "mappable-primary-buffers"
  | "texture-binding-array"
  | "buffer-binding-array"
  | "storage-resource-binding-array"
  | "sampled-texture-and-storage-buffer-array-non-uniform-indexing"
  | "uniform-buffer-and-storage-texture-array-non-uniform-indexing"
  | "partially-bound-binding-array"
  | "multi-draw-indirect"
  | "multi-draw-indirect-count"
  | "push-constants"
  | "address-mode-clamp-to-zero"
  | "address-mode-clamp-to-border"
  | "polygon-mode-line"
  | "polygon-mode-point"
  | "conservative-rasterization"
  | "vertex-writable-storage"
  | "clear-texture"
  | "spirv-shader-passthrough"
  | "multiview"
  | "vertex-attribute-64-bit"
  | "shader-f64"
  | "shader-i16"
  | "shader-primitive-index"
  | "shader-early-depth-test";

/**
 * The primary interface for interacting with a WebGPU device.
 *
 * @example
 * ```ts
 * // Request a GPU adapter from the browser/Deno
 * const adapter = await navigator.gpu.requestAdapter();
 * if (!adapter) throw new Error("WebGPU not supported");
 *
 * // Request a device from the adapter
 * const device = await adapter.requestDevice();
 *
 * // Create a buffer on the GPU
 * const buffer = device.createBuffer({
 *   size: 128,
 *   usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
 * });
 *
 * // Use device.queue to submit commands
 * device.queue.writeBuffer(buffer, 0, new Uint8Array([1, 2, 3, 4]));
 * ```
 *
 * @category GPU
 */
declare class GPUDevice extends EventTarget implements GPUObjectBase {
  label: string;

  readonly lost: Promise<GPUDeviceLostInfo>;
  pushErrorScope(filter: GPUErrorFilter): undefined;
  popErrorScope(): Promise<GPUError | null>;

  readonly features: GPUSupportedFeatures;
  readonly limits: GPUSupportedLimits;
  readonly adapterInfo: GPUAdapterInfo;
  readonly queue: GPUQueue;

  destroy(): undefined;

  createBuffer(descriptor: GPUBufferDescriptor): GPUBuffer;
  createTexture(descriptor: GPUTextureDescriptor): GPUTexture;
  createSampler(descriptor?: GPUSamplerDescriptor): GPUSampler;

  createBindGroupLayout(
    descriptor: GPUBindGroupLayoutDescriptor,
  ): GPUBindGroupLayout;
  createPipelineLayout(
    descriptor: GPUPipelineLayoutDescriptor,
  ): GPUPipelineLayout;
  createBindGroup(descriptor: GPUBindGroupDescriptor): GPUBindGroup;

  createShaderModule(descriptor: GPUShaderModuleDescriptor): GPUShaderModule;
  createComputePipeline(
    descriptor: GPUComputePipelineDescriptor,
  ): GPUComputePipeline;
  createRenderPipeline(
    descriptor: GPURenderPipelineDescriptor,
  ): GPURenderPipeline;
  createComputePipelineAsync(
    descriptor: GPUComputePipelineDescriptor,
  ): Promise<GPUComputePipeline>;
  createRenderPipelineAsync(
    descriptor: GPURenderPipelineDescriptor,
  ): Promise<GPURenderPipeline>;

  createCommandEncoder(
    descriptor?: GPUCommandEncoderDescriptor,
  ): GPUCommandEncoder;
  createRenderBundleEncoder(
    descriptor: GPURenderBundleEncoderDescriptor,
  ): GPURenderBundleEncoder;

  createQuerySet(descriptor: GPUQuerySetDescriptor): GPUQuerySet;
}

/**
 * Represents a block of memory allocated on the GPU.
 *
 * @example
 * ```ts
 * // Create a buffer that can be used as a vertex buffer and can be written to
 * const vertexBuffer = device.createBuffer({
 *   label: "Vertex Buffer",
 *   size: vertices.byteLength,
 *   usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
 * });
 *
 * // Write data to the buffer
 * device.queue.writeBuffer(vertexBuffer, 0, vertices);
 *
 * // Example of creating a mapped buffer for CPU access
 * const stagingBuffer = device.createBuffer({
 *   size: data.byteLength,
 *   usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC,
 *   mappedAtCreation: true,
 * });
 *
 * // Copy data to the mapped buffer
 * new Uint8Array(stagingBuffer.getMappedRange()).set(data);
 * stagingBuffer.unmap();
 * ```
 *
 * @category GPU
 */
declare class GPUBuffer implements GPUObjectBase {
  label: string;

  readonly size: number;
  readonly usage: GPUFlagsConstant;
  readonly mapState: GPUBufferMapState;

  mapAsync(
    mode: GPUMapModeFlags,
    offset?: number,
    size?: number,
  ): Promise<undefined>;
  getMappedRange(offset?: number, size?: number): ArrayBuffer;
  unmap(): undefined;

  destroy(): undefined;
}

/** @category GPU */
type GPUBufferMapState = "unmapped" | "pending" | "mapped";

/** @category GPU */
interface GPUBufferDescriptor extends GPUObjectDescriptorBase {
  size: number;
  usage: GPUBufferUsageFlags;
  mappedAtCreation?: boolean;
}

/** @category GPU */
type GPUBufferUsageFlags = number;

/** @category GPU */
type GPUFlagsConstant = number;

/** @category GPU */
declare class GPUBufferUsage {
  static MAP_READ: 0x0001;
  static MAP_WRITE: 0x0002;
  static COPY_SRC: 0x0004;
  static COPY_DST: 0x0008;
  static INDEX: 0x0010;
  static VERTEX: 0x0020;
  static UNIFORM: 0x0040;
  static STORAGE: 0x0080;
  static INDIRECT: 0x0100;
  static QUERY_RESOLVE: 0x0200;
}

/** @category GPU */
type GPUMapModeFlags = number;

/** @category GPU */
declare class GPUMapMode {
  static READ: 0x0001;
  static WRITE: 0x0002;
}

/**
 * Represents a texture (image) in GPU memory.
 *
 * @example
 * ```ts
 * // Create a texture to render to
 * const texture = device.createTexture({
 *   label: "Output Texture",
 *   size: { width: 640, height: 480 },
 *   format: "rgba8unorm",
 *   usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
 * });
 *
 * // Get a view of the texture (needed for most operations)
 * const textureView = texture.createView();
 *
 * // When the texture is no longer needed
 * texture.destroy();
 *
 * // Example: Creating a depth texture
 * const depthTexture = device.createTexture({
 *   size: { width: 640, height: 480 },
 *   format: "depth24plus",
 *   usage: GPUTextureUsage.RENDER_ATTACHMENT,
 * });
 * ```
 *
 * @category GPU
 */
declare class GPUTexture implements GPUObjectBase {
  label: string;

  createView(descriptor?: GPUTextureViewDescriptor): GPUTextureView;
  destroy(): undefined;

  readonly width: number;
  readonly height: number;
  readonly depthOrArrayLayers: number;
  readonly mipLevelCount: number;
  readonly sampleCount: number;
  readonly dimension: GPUTextureDimension;
  readonly format: GPUTextureFormat;
  readonly usage: GPUFlagsConstant;
}

/** @category GPU */
interface GPUTextureDescriptor extends GPUObjectDescriptorBase {
  size: GPUExtent3D;
  mipLevelCount?: number;
  sampleCount?: number;
  dimension?: GPUTextureDimension;
  format: GPUTextureFormat;
  usage: GPUTextureUsageFlags;
  viewFormats?: GPUTextureFormat[];
}

/** @category GPU */
type GPUTextureDimension = "1d" | "2d" | "3d";

/** @category GPU */
type GPUTextureUsageFlags = number;

/** @category GPU */
declare class GPUTextureUsage {
  static COPY_SRC: 0x01;
  static COPY_DST: 0x02;
  static TEXTURE_BINDING: 0x04;
  static STORAGE_BINDING: 0x08;
  static RENDER_ATTACHMENT: 0x10;
}

/** @category GPU */
declare class GPUTextureView implements GPUObjectBase {
  label: string;
}

/** @category GPU */
interface GPUTextureViewDescriptor extends GPUObjectDescriptorBase {
  format?: GPUTextureFormat;
  dimension?: GPUTextureViewDimension;
  usage?: GPUTextureUsageFlags;
  aspect?: GPUTextureAspect;
  baseMipLevel?: number;
  mipLevelCount?: number;
  baseArrayLayer?: number;
  arrayLayerCount?: number;
}

/** @category GPU */
type GPUTextureViewDimension =
  | "1d"
  | "2d"
  | "2d-array"
  | "cube"
  | "cube-array"
  | "3d";

/** @category GPU */
type GPUTextureAspect = "all" | "stencil-only" | "depth-only";

/** @category GPU */
type GPUTextureFormat =
  | "r8unorm"
  | "r8snorm"
  | "r8uint"
  | "r8sint"
  | "r16uint"
  | "r16sint"
  | "r16float"
  | "rg8unorm"
  | "rg8snorm"
  | "rg8uint"
  | "rg8sint"
  | "r32uint"
  | "r32sint"
  | "r32float"
  | "rg16uint"
  | "rg16sint"
  | "rg16float"
  | "rgba8unorm"
  | "rgba8unorm-srgb"
  | "rgba8snorm"
  | "rgba8uint"
  | "rgba8sint"
  | "bgra8unorm"
  | "bgra8unorm-srgb"
  | "rgb9e5ufloat"
  | "rgb10a2uint"
  | "rgb10a2unorm"
  | "rg11b10ufloat"
  | "rg32uint"
  | "rg32sint"
  | "rg32float"
  | "rgba16uint"
  | "rgba16sint"
  | "rgba16float"
  | "rgba32uint"
  | "rgba32sint"
  | "rgba32float"
  | "stencil8"
  | "depth16unorm"
  | "depth24plus"
  | "depth24plus-stencil8"
  | "depth32float"
  | "depth32float-stencil8"
  | "bc1-rgba-unorm"
  | "bc1-rgba-unorm-srgb"
  | "bc2-rgba-unorm"
  | "bc2-rgba-unorm-srgb"
  | "bc3-rgba-unorm"
  | "bc3-rgba-unorm-srgb"
  | "bc4-r-unorm"
  | "bc4-r-snorm"
  | "bc5-rg-unorm"
  | "bc5-rg-snorm"
  | "bc6h-rgb-ufloat"
  | "bc6h-rgb-float"
  | "bc7-rgba-unorm"
  | "bc7-rgba-unorm-srgb"
  | "etc2-rgb8unorm"
  | "etc2-rgb8unorm-srgb"
  | "etc2-rgb8a1unorm"
  | "etc2-rgb8a1unorm-srgb"
  | "etc2-rgba8unorm"
  | "etc2-rgba8unorm-srgb"
  | "eac-r11unorm"
  | "eac-r11snorm"
  | "eac-rg11unorm"
  | "eac-rg11snorm"
  | "astc-4x4-unorm"
  | "astc-4x4-unorm-srgb"
  | "astc-5x4-unorm"
  | "astc-5x4-unorm-srgb"
  | "astc-5x5-unorm"
  | "astc-5x5-unorm-srgb"
  | "astc-6x5-unorm"
  | "astc-6x5-unorm-srgb"
  | "astc-6x6-unorm"
  | "astc-6x6-unorm-srgb"
  | "astc-8x5-unorm"
  | "astc-8x5-unorm-srgb"
  | "astc-8x6-unorm"
  | "astc-8x6-unorm-srgb"
  | "astc-8x8-unorm"
  | "astc-8x8-unorm-srgb"
  | "astc-10x5-unorm"
  | "astc-10x5-unorm-srgb"
  | "astc-10x6-unorm"
  | "astc-10x6-unorm-srgb"
  | "astc-10x8-unorm"
  | "astc-10x8-unorm-srgb"
  | "astc-10x10-unorm"
  | "astc-10x10-unorm-srgb"
  | "astc-12x10-unorm"
  | "astc-12x10-unorm-srgb"
  | "astc-12x12-unorm"
  | "astc-12x12-unorm-srgb";

/** @category GPU */
declare class GPUSampler implements GPUObjectBase {
  label: string;
}

/** @category GPU */
interface GPUSamplerDescriptor extends GPUObjectDescriptorBase {
  addressModeU?: GPUAddressMode;
  addressModeV?: GPUAddressMode;
  addressModeW?: GPUAddressMode;
  magFilter?: GPUFilterMode;
  minFilter?: GPUFilterMode;
  mipmapFilter?: GPUMipmapFilterMode;
  lodMinClamp?: number;
  lodMaxClamp?: number;
  compare?: GPUCompareFunction;
  maxAnisotropy?: number;
}

/** @category GPU */
type GPUAddressMode = "clamp-to-edge" | "repeat" | "mirror-repeat";

/** @category GPU */
type GPUFilterMode = "nearest" | "linear";

/** @category GPU */
type GPUMipmapFilterMode = "nearest" | "linear";

/** @category GPU */
type GPUCompareFunction =
  | "never"
  | "less"
  | "equal"
  | "less-equal"
  | "greater"
  | "not-equal"
  | "greater-equal"
  | "always";

/** @category GPU */
declare class GPUBindGroupLayout implements GPUObjectBase {
  label: string;
}

/** @category GPU */
interface GPUBindGroupLayoutDescriptor extends GPUObjectDescriptorBase {
  entries: GPUBindGroupLayoutEntry[];
}

/** @category GPU */
interface GPUBindGroupLayoutEntry {
  binding: number;
  visibility: GPUShaderStageFlags;

  buffer?: GPUBufferBindingLayout;
  sampler?: GPUSamplerBindingLayout;
  texture?: GPUTextureBindingLayout;
  storageTexture?: GPUStorageTextureBindingLayout;
}

/** @category GPU */
type GPUShaderStageFlags = number;

/** @category GPU */
declare class GPUShaderStage {
  static VERTEX: 0x1;
  static FRAGMENT: 0x2;
  static COMPUTE: 0x4;
}

/** @category GPU */
interface GPUBufferBindingLayout {
  type?: GPUBufferBindingType;
  hasDynamicOffset?: boolean;
  minBindingSize?: number;
}

/** @category GPU */
type GPUBufferBindingType = "uniform" | "storage" | "read-only-storage";

/** @category GPU */
interface GPUSamplerBindingLayout {
  type?: GPUSamplerBindingType;
}

/** @category GPU */
type GPUSamplerBindingType =
  | "filtering"
  | "non-filtering"
  | "comparison";

/** @category GPU */
interface GPUTextureBindingLayout {
  sampleType?: GPUTextureSampleType;
  viewDimension?: GPUTextureViewDimension;
  multisampled?: boolean;
}

/** @category GPU */
type GPUTextureSampleType =
  | "float"
  | "unfilterable-float"
  | "depth"
  | "sint"
  | "uint";

/** @category GPU */
type GPUStorageTextureAccess =
  | "write-only"
  | "read-only"
  | "read-write";

/** @category GPU */
interface GPUStorageTextureBindingLayout {
  access?: GPUStorageTextureAccess;
  format: GPUTextureFormat;
  viewDimension?: GPUTextureViewDimension;
}

/** @category GPU */
declare class GPUBindGroup implements GPUObjectBase {
  label: string;
}

/** @category GPU */
interface GPUBindGroupDescriptor extends GPUObjectDescriptorBase {
  layout: GPUBindGroupLayout;
  entries: GPUBindGroupEntry[];
}

/** @category GPU */
type GPUBindingResource =
  | GPUSampler
  | GPUTextureView
  | GPUBufferBinding;

/** @category GPU */
interface GPUBindGroupEntry {
  binding: number;
  resource: GPUBindingResource;
}

/** @category GPU */
interface GPUBufferBinding {
  buffer: GPUBuffer;
  offset?: number;
  size?: number;
}

/** @category GPU */
declare class GPUPipelineLayout implements GPUObjectBase {
  label: string;
}

/** @category GPU */
interface GPUPipelineLayoutDescriptor extends GPUObjectDescriptorBase {
  bindGroupLayouts: GPUBindGroupLayout[];
}

/** @category GPU */
type GPUCompilationMessageType = "error" | "warning" | "info";

/** @category GPU */
declare class GPUCompilationMessage {
  readonly message: string;
  readonly type: GPUCompilationMessageType;
  readonly lineNum: number;
  readonly linePos: number;
  readonly offset: number;
  readonly length: number;
}

/** @category GPU */
declare class GPUCompilationInfo {
  readonly messages: ReadonlyArray<GPUCompilationMessage>;
}

/**
 * The **`GPUPipelineError`** interface of the WebGPU API describes a pipeline failure.
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUPipelineError)
 * @category GPU
 */
interface GPUPipelineError extends DOMException {
  /**
   * The **`reason`** read-only property of the GPUPipelineError interface defines the reason the pipeline creation failed in a machine-readable way.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUPipelineError/reason)
   */
  readonly reason: "validation" | "internal";
}

/** @category GPU */
declare var GPUPipelineError: {
  prototype: GPUPipelineError;
  new (message: string, options: GPUPipelineErrorInit): GPUPipelineError;
};

/** @category GPU */
interface GPUPipelineErrorInit {
  reason: "validation" | "internal";
}

/**
 * Represents a compiled shader module that can be used to create graphics or compute pipelines.
 *
 * @example
 * ```ts
 * // Create a shader module using WGSL (WebGPU Shading Language)
 * const shaderModule = device.createShaderModule({
 *   label: "My Shader",
 *   code: `
 *     @vertex
 *     fn vertexMain(@location(0) pos: vec2f) -> @builtin(position) vec4f {
 *       return vec4f(pos, 0.0, 1.0);
 *     }
 *
 *     @fragment
 *     fn fragmentMain() -> @location(0) vec4f {
 *       return vec4f(1.0, 0.0, 0.0, 1.0); // red color
 *     }
 *   `
 * });
 *
 * // Can optionally check for compilation errors/warnings
 * const compilationInfo = await shaderModule.getCompilationInfo();
 * for (const message of compilationInfo.messages) {
 *   console.log(`${message.type}: ${message.message} at ${message.lineNum}:${message.linePos}`);
 * }
 * ```
 *
 * @category GPU
 */
declare class GPUShaderModule implements GPUObjectBase {
  label: string;

  /**
   * Returns compilation messages for this shader module,
   * which can include errors, warnings and info messages.
   */
  getCompilationInfo(): Promise<GPUCompilationInfo>;
}

/** @category GPU */
interface GPUShaderModuleDescriptor extends GPUObjectDescriptorBase {
  code: string;
  sourceMap?: any;
}

/** @category GPU */
type GPUAutoLayoutMode = "auto";

/** @category GPU */
interface GPUPipelineDescriptorBase extends GPUObjectDescriptorBase {
  layout: GPUPipelineLayout | GPUAutoLayoutMode;
}

/** @category GPU */
interface GPUPipelineBase {
  getBindGroupLayout(index: number): GPUBindGroupLayout;
}

/** @category GPU */
interface GPUProgrammableStage {
  module: GPUShaderModule;
  entryPoint?: string;
  constants?: Record<string, number>;
}

/** @category GPU */
declare class GPUComputePipeline implements GPUObjectBase, GPUPipelineBase {
  label: string;

  getBindGroupLayout(index: number): GPUBindGroupLayout;
}

/** @category GPU */
interface GPUComputePipelineDescriptor extends GPUPipelineDescriptorBase {
  compute: GPUProgrammableStage;
}

/** @category GPU */
declare class GPURenderPipeline implements GPUObjectBase, GPUPipelineBase {
  label: string;

  getBindGroupLayout(index: number): GPUBindGroupLayout;
}

/** @category GPU */
interface GPURenderPipelineDescriptor extends GPUPipelineDescriptorBase {
  vertex: GPUVertexState;
  primitive?: GPUPrimitiveState;
  depthStencil?: GPUDepthStencilState;
  multisample?: GPUMultisampleState;
  fragment?: GPUFragmentState;
}

/** @category GPU */
interface GPUPrimitiveState {
  topology?: GPUPrimitiveTopology;
  stripIndexFormat?: GPUIndexFormat;
  frontFace?: GPUFrontFace;
  cullMode?: GPUCullMode;
  unclippedDepth?: boolean;
}

/** @category GPU */
type GPUPrimitiveTopology =
  | "point-list"
  | "line-list"
  | "line-strip"
  | "triangle-list"
  | "triangle-strip";

/** @category GPU */
type GPUFrontFace = "ccw" | "cw";

/** @category GPU */
type GPUCullMode = "none" | "front" | "back";

/** @category GPU */
interface GPUMultisampleState {
  count?: number;
  mask?: number;
  alphaToCoverageEnabled?: boolean;
}

/** @category GPU */
interface GPUFragmentState extends GPUProgrammableStage {
  targets: (GPUColorTargetState | null)[];
}

/** @category GPU */
interface GPUColorTargetState {
  format: GPUTextureFormat;

  blend?: GPUBlendState;
  writeMask?: GPUColorWriteFlags;
}

/** @category GPU */
interface GPUBlendState {
  color: GPUBlendComponent;
  alpha: GPUBlendComponent;
}

/** @category GPU */
type GPUColorWriteFlags = number;

/** @category GPU */
declare class GPUColorWrite {
  static RED: 0x1;
  static GREEN: 0x2;
  static BLUE: 0x4;
  static ALPHA: 0x8;
  static ALL: 0xF;
}

/** @category GPU */
interface GPUBlendComponent {
  operation?: GPUBlendOperation;
  srcFactor?: GPUBlendFactor;
  dstFactor?: GPUBlendFactor;
}

/** @category GPU */
type GPUBlendFactor =
  | "zero"
  | "one"
  | "src"
  | "one-minus-src"
  | "src-alpha"
  | "one-minus-src-alpha"
  | "dst"
  | "one-minus-dst"
  | "dst-alpha"
  | "one-minus-dst-alpha"
  | "src-alpha-saturated"
  | "constant"
  | "one-minus-constant"
  | "src1"
  | "one-minus-src1"
  | "src1-alpha"
  | "one-minus-src1-alpha";

/** @category GPU */
type GPUBlendOperation =
  | "add"
  | "subtract"
  | "reverse-subtract"
  | "min"
  | "max";

/** @category GPU */
interface GPUDepthStencilState {
  format: GPUTextureFormat;

  depthWriteEnabled?: boolean;
  depthCompare?: GPUCompareFunction;

  stencilFront?: GPUStencilFaceState;
  stencilBack?: GPUStencilFaceState;

  stencilReadMask?: number;
  stencilWriteMask?: number;

  depthBias?: number;
  depthBiasSlopeScale?: number;
  depthBiasClamp?: number;
}

/** @category GPU */
interface GPUStencilFaceState {
  compare?: GPUCompareFunction;
  failOp?: GPUStencilOperation;
  depthFailOp?: GPUStencilOperation;
  passOp?: GPUStencilOperation;
}

/** @category GPU */
type GPUStencilOperation =
  | "keep"
  | "zero"
  | "replace"
  | "invert"
  | "increment-clamp"
  | "decrement-clamp"
  | "increment-wrap"
  | "decrement-wrap";

/** @category GPU */
type GPUIndexFormat = "uint16" | "uint32";

/** @category GPU */
type GPUVertexFormat =
  | "uint8x2"
  | "uint8x4"
  | "sint8x2"
  | "sint8x4"
  | "unorm8x2"
  | "unorm8x4"
  | "snorm8x2"
  | "snorm8x4"
  | "uint16x2"
  | "uint16x4"
  | "sint16x2"
  | "sint16x4"
  | "unorm16x2"
  | "unorm16x4"
  | "snorm16x2"
  | "snorm16x4"
  | "float16x2"
  | "float16x4"
  | "float32"
  | "float32x2"
  | "float32x3"
  | "float32x4"
  | "uint32"
  | "uint32x2"
  | "uint32x3"
  | "uint32x4"
  | "sint32"
  | "sint32x2"
  | "sint32x3"
  | "sint32x4"
  | "unorm10-10-10-2";

/** @category GPU */
type GPUVertexStepMode = "vertex" | "instance";

/** @category GPU */
interface GPUVertexState extends GPUProgrammableStage {
  buffers?: (GPUVertexBufferLayout | null)[];
}

/** @category GPU */
interface GPUVertexBufferLayout {
  arrayStride: number;
  stepMode?: GPUVertexStepMode;
  attributes: GPUVertexAttribute[];
}

/** @category GPU */
interface GPUVertexAttribute {
  format: GPUVertexFormat;
  offset: number;

  shaderLocation: number;
}

/** @category GPU */
interface GPUTexelCopyBufferLayout {
  offset?: number;
  bytesPerRow?: number;
  rowsPerImage?: number;
}

/** @category GPU */
declare class GPUCommandBuffer implements GPUObjectBase {
  label: string;
}

/** @category GPU */
interface GPUCommandBufferDescriptor extends GPUObjectDescriptorBase {}

/**
 * Used to record GPU commands for later execution by the GPU.
 *
 * @example
 * ```ts
 * // Create a command encoder
 * const commandEncoder = device.createCommandEncoder({
 *   label: "Main Command Encoder"
 * });
 *
 * // Record a copy from one buffer to another
 * commandEncoder.copyBufferToBuffer(
 *   sourceBuffer, 0, // Source buffer and offset
 *   destinationBuffer, 0, // Destination buffer and offset
 *   sourceBuffer.size // Size to copy
 * );
 *
 * // Begin a compute pass to execute a compute shader
 * const computePass = commandEncoder.beginComputePass();
 * computePass.setPipeline(computePipeline);
 * computePass.setBindGroup(0, bindGroup);
 * computePass.dispatchWorkgroups(32, 1, 1); // Run 32 workgroups
 * computePass.end();
 *
 * // Begin a render pass to draw to a texture
 * const renderPass = commandEncoder.beginRenderPass({
 *   colorAttachments: [{
 *     view: textureView,
 *     clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
 *     loadOp: "clear",
 *     storeOp: "store"
 *   }]
 * });
 * renderPass.setPipeline(renderPipeline);
 * renderPass.draw(3, 1, 0, 0); // Draw a triangle
 * renderPass.end();
 *
 * // Finish encoding and submit to GPU
 * const commandBuffer = commandEncoder.finish();
 * device.queue.submit([commandBuffer]);
 * ```
 *
 * @category GPU
 */
declare class GPUCommandEncoder implements GPUObjectBase {
  label: string;

  beginRenderPass(descriptor: GPURenderPassDescriptor): GPURenderPassEncoder;
  beginComputePass(
    descriptor?: GPUComputePassDescriptor,
  ): GPUComputePassEncoder;

  copyBufferToBuffer(
    source: GPUBuffer,
    sourceOffset: number,
    destination: GPUBuffer,
    destinationOffset: number,
    size: number,
  ): undefined;

  copyBufferToTexture(
    source: GPUTexelCopyBufferInfo,
    destination: GPUTexelCopyTextureInfo,
    copySize: GPUExtent3D,
  ): undefined;

  copyTextureToBuffer(
    source: GPUTexelCopyTextureInfo,
    destination: GPUTexelCopyBufferInfo,
    copySize: GPUExtent3D,
  ): undefined;

  copyTextureToTexture(
    source: GPUTexelCopyTextureInfo,
    destination: GPUTexelCopyTextureInfo,
    copySize: GPUExtent3D,
  ): undefined;

  clearBuffer(
    destination: GPUBuffer,
    destinationOffset?: number,
    size?: number,
  ): undefined;

  pushDebugGroup(groupLabel: string): undefined;
  popDebugGroup(): undefined;
  insertDebugMarker(markerLabel: string): undefined;

  writeTimestamp(querySet: GPUQuerySet, queryIndex: number): undefined;

  resolveQuerySet(
    querySet: GPUQuerySet,
    firstQuery: number,
    queryCount: number,
    destination: GPUBuffer,
    destinationOffset: number,
  ): undefined;

  finish(descriptor?: GPUCommandBufferDescriptor): GPUCommandBuffer;
}

/** @category GPU */
interface GPUCommandEncoderDescriptor extends GPUObjectDescriptorBase {}

/** @category GPU */
interface GPUTexelCopyBufferInfo extends GPUTexelCopyBufferLayout {
  buffer: GPUBuffer;
}

/** @category GPU */
interface GPUTexelCopyTextureInfo {
  texture: GPUTexture;
  mipLevel?: number;
  origin?: GPUOrigin3D;
  aspect?: GPUTextureAspect;
}

/** @category GPU */
interface GPUProgrammablePassEncoder {
  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup | null,
    dynamicOffsets?: number[],
  ): undefined;

  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup | null,
    dynamicOffsetsData: Uint32Array,
    dynamicOffsetsDataStart: number,
    dynamicOffsetsDataLength: number,
  ): undefined;

  pushDebugGroup(groupLabel: string): undefined;
  popDebugGroup(): undefined;
  insertDebugMarker(markerLabel: string): undefined;
}

/** @category GPU */
declare class GPUComputePassEncoder
  implements GPUObjectBase, GPUProgrammablePassEncoder {
  label: string;
  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup | null,
    dynamicOffsets?: number[],
  ): undefined;
  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup | null,
    dynamicOffsetsData: Uint32Array,
    dynamicOffsetsDataStart: number,
    dynamicOffsetsDataLength: number,
  ): undefined;
  pushDebugGroup(groupLabel: string): undefined;
  popDebugGroup(): undefined;
  insertDebugMarker(markerLabel: string): undefined;
  setPipeline(pipeline: GPUComputePipeline): undefined;
  dispatchWorkgroups(x: number, y?: number, z?: number): undefined;
  dispatchWorkgroupsIndirect(
    indirectBuffer: GPUBuffer,
    indirectOffset: number,
  ): undefined;

  end(): undefined;
}

/** @category GPU */
interface GPUComputePassTimestampWrites {
  querySet: GPUQuerySet;
  beginningOfPassWriteIndex?: number;
  endOfPassWriteIndex?: number;
}

/** @category GPU */
interface GPUComputePassDescriptor extends GPUObjectDescriptorBase {
  timestampWrites?: GPUComputePassTimestampWrites;
}

/** @category GPU */
interface GPURenderEncoderBase {
  setPipeline(pipeline: GPURenderPipeline): undefined;

  setIndexBuffer(
    buffer: GPUBuffer,
    indexFormat: GPUIndexFormat,
    offset?: number,
    size?: number,
  ): undefined;
  setVertexBuffer(
    slot: number,
    buffer: GPUBuffer,
    offset?: number,
    size?: number,
  ): undefined;

  draw(
    vertexCount: number,
    instanceCount?: number,
    firstVertex?: number,
    firstInstance?: number,
  ): undefined;
  drawIndexed(
    indexCount: number,
    instanceCount?: number,
    firstIndex?: number,
    baseVertex?: number,
    firstInstance?: number,
  ): undefined;

  drawIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): undefined;
  drawIndexedIndirect(
    indirectBuffer: GPUBuffer,
    indirectOffset: number,
  ): undefined;
}

/** @category GPU */
declare class GPURenderPassEncoder
  implements GPUObjectBase, GPUProgrammablePassEncoder, GPURenderEncoderBase {
  label: string;
  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup | null,
    dynamicOffsets?: number[],
  ): undefined;
  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup | null,
    dynamicOffsetsData: Uint32Array,
    dynamicOffsetsDataStart: number,
    dynamicOffsetsDataLength: number,
  ): undefined;
  pushDebugGroup(groupLabel: string): undefined;
  popDebugGroup(): undefined;
  insertDebugMarker(markerLabel: string): undefined;
  setPipeline(pipeline: GPURenderPipeline): undefined;
  setIndexBuffer(
    buffer: GPUBuffer,
    indexFormat: GPUIndexFormat,
    offset?: number,
    size?: number,
  ): undefined;
  setVertexBuffer(
    slot: number,
    buffer: GPUBuffer,
    offset?: number,
    size?: number,
  ): undefined;
  draw(
    vertexCount: number,
    instanceCount?: number,
    firstVertex?: number,
    firstInstance?: number,
  ): undefined;
  drawIndexed(
    indexCount: number,
    instanceCount?: number,
    firstIndex?: number,
    baseVertex?: number,
    firstInstance?: number,
  ): undefined;
  drawIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): undefined;
  drawIndexedIndirect(
    indirectBuffer: GPUBuffer,
    indirectOffset: number,
  ): undefined;

  setViewport(
    x: number,
    y: number,
    width: number,
    height: number,
    minDepth: number,
    maxDepth: number,
  ): undefined;

  setScissorRect(
    x: number,
    y: number,
    width: number,
    height: number,
  ): undefined;

  setBlendConstant(color: GPUColor): undefined;
  setStencilReference(reference: number): undefined;

  beginOcclusionQuery(queryIndex: number): undefined;
  endOcclusionQuery(): undefined;

  executeBundles(bundles: GPURenderBundle[]): undefined;
  end(): undefined;
}

/** @category GPU */
interface GPURenderPassTimestampWrites {
  querySet: GPUQuerySet;
  beginningOfPassWriteIndex?: number;
  endOfPassWriteIndex?: number;
}

/** @category GPU */
interface GPURenderPassDescriptor extends GPUObjectDescriptorBase {
  colorAttachments: (GPURenderPassColorAttachment | null)[];
  depthStencilAttachment?: GPURenderPassDepthStencilAttachment;
  occlusionQuerySet?: GPUQuerySet;
  timestampWrites?: GPURenderPassTimestampWrites;
}

/** @category GPU */
interface GPURenderPassColorAttachment {
  view: GPUTextureView;
  resolveTarget?: GPUTextureView;

  clearValue?: GPUColor;
  loadOp: GPULoadOp;
  storeOp: GPUStoreOp;
}

/** @category GPU */
interface GPURenderPassDepthStencilAttachment {
  view: GPUTextureView;

  depthClearValue?: number;
  depthLoadOp?: GPULoadOp;
  depthStoreOp?: GPUStoreOp;
  depthReadOnly?: boolean;

  stencilClearValue?: number;
  stencilLoadOp?: GPULoadOp;
  stencilStoreOp?: GPUStoreOp;
  stencilReadOnly?: boolean;
}

/** @category GPU */
type GPULoadOp = "load" | "clear";

/** @category GPU */
type GPUStoreOp = "store" | "discard";

/** @category GPU */
declare class GPURenderBundle implements GPUObjectBase {
  label: string;
}

/** @category GPU */
interface GPURenderBundleDescriptor extends GPUObjectDescriptorBase {}

/** @category GPU */
declare class GPURenderBundleEncoder
  implements GPUObjectBase, GPUProgrammablePassEncoder, GPURenderEncoderBase {
  label: string;
  draw(
    vertexCount: number,
    instanceCount?: number,
    firstVertex?: number,
    firstInstance?: number,
  ): undefined;
  drawIndexed(
    indexCount: number,
    instanceCount?: number,
    firstIndex?: number,
    baseVertex?: number,
    firstInstance?: number,
  ): undefined;
  drawIndexedIndirect(
    indirectBuffer: GPUBuffer,
    indirectOffset: number,
  ): undefined;
  drawIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): undefined;
  insertDebugMarker(markerLabel: string): undefined;
  popDebugGroup(): undefined;
  pushDebugGroup(groupLabel: string): undefined;
  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup | null,
    dynamicOffsets?: number[],
  ): undefined;
  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup | null,
    dynamicOffsetsData: Uint32Array,
    dynamicOffsetsDataStart: number,
    dynamicOffsetsDataLength: number,
  ): undefined;
  setIndexBuffer(
    buffer: GPUBuffer,
    indexFormat: GPUIndexFormat,
    offset?: number,
    size?: number,
  ): undefined;
  setPipeline(pipeline: GPURenderPipeline): undefined;
  setVertexBuffer(
    slot: number,
    buffer: GPUBuffer,
    offset?: number,
    size?: number,
  ): undefined;

  finish(descriptor?: GPURenderBundleDescriptor): GPURenderBundle;
}

/** @category GPU */
interface GPURenderPassLayout extends GPUObjectDescriptorBase {
  colorFormats: (GPUTextureFormat | null)[];
  depthStencilFormat?: GPUTextureFormat;
  sampleCount?: number;
}

/** @category GPU */
interface GPURenderBundleEncoderDescriptor extends GPURenderPassLayout {
  depthReadOnly?: boolean;
  stencilReadOnly?: boolean;
}

/**
 * Represents a queue to submit commands to the GPU.
 *
 * @example
 * ```ts
 * // Get a queue from the device (each device has a default queue)
 * const queue = device.queue;
 *
 * // Write data to a buffer
 * const buffer = device.createBuffer({
 *   size: data.byteLength,
 *   usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE
 * });
 * queue.writeBuffer(buffer, 0, data);
 *
 * // Submit command buffers to the GPU for execution
 * const commandBuffer = commandEncoder.finish();
 * queue.submit([commandBuffer]);
 *
 * // Wait for all submitted operations to complete
 * await queue.onSubmittedWorkDone();
 *
 * // Example: Write data to a texture
 * const texture = device.createTexture({
 *   size: { width: 256, height: 256 },
 *   format: "rgba8unorm",
 *   usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST
 * });
 *
 * const data = new Uint8Array(256 * 256 * 4); // RGBA data
 * // Fill data with your texture content...
 *
 * queue.writeTexture(
 *   { texture },
 *   data,
 *   { bytesPerRow: 256 * 4 },
 *   { width: 256, height: 256 }
 * );
 * ```
 *
 * @category GPU
 */
declare class GPUQueue implements GPUObjectBase {
  label: string;

  submit(commandBuffers: GPUCommandBuffer[]): undefined;

  onSubmittedWorkDone(): Promise<undefined>;

  writeBuffer(
    buffer: GPUBuffer,
    bufferOffset: number,
    data: BufferSource,
    dataOffset?: number,
    size?: number,
  ): undefined;

  writeTexture(
    destination: GPUTexelCopyTextureInfo,
    data: BufferSource,
    dataLayout: GPUTexelCopyBufferLayout,
    size: GPUExtent3D,
  ): undefined;
}

/** @category GPU */
declare class GPUQuerySet implements GPUObjectBase {
  label: string;

  destroy(): undefined;

  readonly type: GPUQueryType;
  readonly count: number;
}

/** @category GPU */
interface GPUQuerySetDescriptor extends GPUObjectDescriptorBase {
  type: GPUQueryType;
  count: number;
}

/** @category GPU */
type GPUQueryType = "occlusion" | "timestamp";

/** @category GPU */
type GPUDeviceLostReason = "destroyed";

/** @category GPU */
interface GPUDeviceLostInfo {
  readonly reason: GPUDeviceLostReason;
  readonly message: string;
}

/**
 * The **`GPUError`** interface of the WebGPU API is the base interface for errors surfaced by GPUDevice.popErrorScope and the GPUDevice.uncapturederror_event event.
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUError)
 * @category GPU
 */
interface GPUError {
  /**
   * The **`message`** read-only property of the A string.
   * The **`message`** read-only property of the GPUError interface provides a human-readable message that explains why the error occurred.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUError/message)
   */
  readonly message: string;
}

/** @category GPU */
declare var GPUError: {
  prototype: GPUError;
  new (): GPUError;
};

/** @category GPU */
interface GPUOutOfMemoryError extends GPUError {}

/** @category GPU */
declare var GPUOutOfMemoryError: {
  prototype: GPUOutOfMemoryError;
  new (message?: string): GPUOutOfMemoryError;
};

/** @category GPU */
interface GPUValidationError extends GPUError {}

/** @category GPU */
declare var GPUValidationError: {
  prototype: GPUValidationError;
  new (message?: string): GPUValidationError;
};

/** @category GPU */
interface GPUInternalError extends GPUError {}

/** @category GPU */
declare var GPUInternalError: {
  prototype: GPUInternalError;
  new (message?: string): GPUInternalError;
};

/** @category GPU */
type GPUErrorFilter = "out-of-memory" | "validation" | "internal";

/** @category GPU */
declare class GPUUncapturedErrorEvent extends Event {
  constructor(
    type: string,
    gpuUncapturedErrorEventInitDict: GPUUncapturedErrorEventInit,
  );

  readonly error: GPUError;
}

/** @category GPU */
interface GPUUncapturedErrorEventInit extends EventInit {
  error: GPUError;
}

/** @category GPU */
interface GPUColorDict {
  r: number;
  g: number;
  b: number;
  a: number;
}

/** @category GPU */
type GPUColor = number[] | GPUColorDict;

/** @category GPU */
interface GPUOrigin3DDict {
  x?: number;
  y?: number;
  z?: number;
}

/** @category GPU */
type GPUOrigin3D = number[] | GPUOrigin3DDict;

/** @category GPU */
interface GPUExtent3DDict {
  width: number;
  height?: number;
  depthOrArrayLayers?: number;
}

/** @category GPU */
type GPUExtent3D = number[] | GPUExtent3DDict;

// Copyright 2018-2026 the Deno authors. MIT license.

// deno-lint-ignore-file no-explicit-any no-var

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

/**
 * Configuration options for a `WebSocket` "close" event.
 *
 * @example
 * ```ts
 * // Creating a custom close event with specific parameters
 * const closeEventInit: CloseEventInit = {
 *   code: 1000,
 *   reason: "Normal closure",
 *   wasClean: true,
 * };
 * const event = new CloseEvent("close", closeEventInit);
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent/CloseEvent
 * @category WebSockets
 */
interface CloseEventInit extends EventInit {
  code?: number;
  reason?: string;
  wasClean?: boolean;
}

/**
 * The `CloseEvent` interface represents an event that occurs when a `WebSocket` connection is closed.
 *
 * This event is sent to the client when the connection is closed, providing information about
 * why the connection was closed through the `code`, `reason`, and `wasClean` properties.
 *
 * @example
 * ```ts
 * // Handling a close event
 * ws.addEventListener("close", (event: CloseEvent) => {
 *   console.log(`Connection closed with code ${event.code}`);
 *   console.log(`Reason: ${event.reason}`);
 *   console.log(`Clean close: ${event.wasClean}`);
 *
 *   if (event.code === 1006) {
 *     console.log("Connection closed abnormally");
 *   }
 * });
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
 * @category WebSockets
 */
interface CloseEvent extends Event {
  /**
   * Returns the WebSocket connection close code provided by the server.
   */
  readonly code: number;
  /**
   * Returns the WebSocket connection close reason provided by the server.
   */
  readonly reason: string;
  /**
   * Returns true if the connection closed cleanly; false otherwise.
   */
  readonly wasClean: boolean;
}

/**
 * Constructor interface for creating `CloseEvent` instances.
 *
 * @example
 * ```ts
 * // Creating a custom close event
 * const event = new CloseEvent("close", {
 *   code: 1000,
 *   reason: "Normal closure",
 *   wasClean: true,
 * });
 *
 * // Dispatching the event
 * myWebSocket.dispatchEvent(event);
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent/CloseEvent
 * @category WebSockets
 */
declare var CloseEvent: {
  readonly prototype: CloseEvent;
  new (type: string, eventInitDict?: CloseEventInit): CloseEvent;
};

/**
 * Interface mapping `WebSocket` event names to their corresponding event types.
 * Used for strongly typed event handling with `addEventListener` and `removeEventListener`.
 *
 * @example
 * ```ts
 * // Using with TypeScript for strongly-typed event handling
 * const ws = new WebSocket("ws://localhost:8080");
 *
 * ws.addEventListener("open", (event) => {
 *   console.log("Connection established");
 * });
 *
 * ws.addEventListener("message", (event: MessageEvent) => {
 *   console.log(`Received: ${event.data}`);
 * });
 * ```
 *
 * @category WebSockets
 */
interface WebSocketEventMap {
  close: CloseEvent;
  error: Event;
  message: MessageEvent;
  open: Event;
}

/**
 * Provides the API for creating and managing a WebSocket connection to a
 * server, as well as for sending and receiving data on the connection.
 *
 * If you are looking to create a WebSocket server, please take a look at
 * `Deno.upgradeWebSocket()`.
 *
 * @example
 * ```ts
 * // Creating a WebSocket connection
 * const ws = new WebSocket("ws://localhost:8080");
 *
 * // Setting up event handlers
 * ws.onopen = (event) => {
 *   console.log("Connected to the server");
 *   ws.send("Hello Server!");
 * };
 *
 * ws.onmessage = (event) => {
 *   console.log(`Received: ${event.data}`);
 * };
 *
 * ws.onerror = (event) => {
 *   console.error("WebSocket error observed:", event);
 * };
 *
 * ws.onclose = (event) => {
 *   console.log(`WebSocket closed: Code=${event.code}, Reason=${event.reason}`);
 * };
 * ```
 *
 * @see https://developer.mozilla.org/docs/Web/API/WebSocket
 * @tags allow-net
 * @category WebSockets
 */
interface WebSocket extends EventTarget {
  /**
   * Returns a string that indicates how binary data from the WebSocket object is exposed to scripts:
   *
   * Can be set, to change how binary data is returned. The default is "blob".
   *
   * ```ts
   * const ws = new WebSocket("ws://localhost:8080");
   * ws.binaryType = "arraybuffer";
   * ```
   */
  binaryType: BinaryType;
  /**
   * Returns the number of bytes of application data (UTF-8 text and binary data) that have been queued using send() but not yet been transmitted to the network.
   *
   * If the WebSocket connection is closed, this attribute's value will only increase with each call to the send() method. (The number does not reset to zero once the connection closes.)
   *
   * ```ts
   * const ws = new WebSocket("ws://localhost:8080");
   * ws.send("Hello, world!");
   * console.log(ws.bufferedAmount); // 13
   * ```
   */
  readonly bufferedAmount: number;
  /**
   * Returns the extensions selected by the server, if any.
   *
   * WebSocket extensions add optional features negotiated during the handshake via
   * the `Sec-WebSocket-Extensions` header.
   *
   * At the time of writing, there are two registered extensions:
   *
   * - [`permessage-deflate`](https://www.rfc-editor.org/rfc/rfc7692.html): Enables per-message compression using DEFLATE.
   * - [`bbf-usp-protocol`](https://usp.technology/): Used by the Broadband Forum's User Services Platform (USP).
   *
   * See the full list at [IANA WebSocket Extensions](https://www.iana.org/assignments/websocket/websocket.xml#extension-name).
   *
   * Example:
   *
   * ```ts
   * const ws = new WebSocket("ws://localhost:8080");
   * console.log(ws.extensions); // e.g., "permessage-deflate"
   * ```
   */
  readonly extensions: string;
  onclose: ((this: WebSocket, ev: CloseEvent) => any) | null;
  onerror: ((this: WebSocket, ev: Event | ErrorEvent) => any) | null;
  onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null;
  onopen: ((this: WebSocket, ev: Event) => any) | null;
  /**
   * Returns the subprotocol selected by the server, if any. It can be used in conjunction with the array form of the constructor's second argument to perform subprotocol negotiation.
   */
  readonly protocol: string;
  /**
   * Returns the state of the WebSocket object's connection. It can have the values described below.
   */
  readonly readyState: number;
  /**
   * Returns the URL that was used to establish the WebSocket connection.
   */
  readonly url: string;
  /**
   * Closes the WebSocket connection, optionally using code as the WebSocket connection close code and reason as the WebSocket connection close reason.
   */
  close(code?: number, reason?: string): void;
  /**
   * Transmits data using the WebSocket connection. data can be a string, a Blob, an ArrayBuffer, or an ArrayBufferView.
   */
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
  readonly CLOSED: number;
  readonly CLOSING: number;
  readonly CONNECTING: number;
  readonly OPEN: number;
  addEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}

/**
 * Constructor interface for creating `WebSocket` instances.
 *
 * The `WebSocket` constructor creates and returns a new `WebSocket` object
 * that represents a connection to a `WebSocket` server.
 *
 * @example
 * ```ts
 * // Basic WebSocket connection
 * const ws = new WebSocket("ws://localhost:8080");
 *
 * // WebSocket with protocol specification
 * const wsWithProtocol = new WebSocket("ws://localhost:8080", "json");
 *
 * // WebSocket with multiple protocol options (server will select one)
 * const wsWithProtocols = new WebSocket("ws://localhost:8080", ["json", "xml"]);
 *
 * // Using URL object instead of string
 * const url = new URL("ws://localhost:8080/path");
 * const wsWithUrl = new WebSocket(url);
 *
 * // WebSocket with headers
 * const wsWithProtocols = new WebSocket("ws://localhost:8080", {
 *   headers: {
 *     "Authorization": "Bearer foo",
 *   },
 * });
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket
 * @category WebSockets
 */
declare var WebSocket: {
  readonly prototype: WebSocket;
  new (
    url: string | URL,
    protocolsOrOptions?: string | string[] | WebSocketOptions,
  ): WebSocket;
  readonly CLOSED: number;
  readonly CLOSING: number;
  readonly CONNECTING: number;
  readonly OPEN: number;
};

/**
 * Options for a WebSocket instance.
 * This feature is non-standard.
 *
 * @category WebSockets
 */
interface WebSocketOptions {
  /**
   * The sub-protocol(s) that the client would like to use, in order of preference.
   */
  protocols?: string | string[];
  /**
   * A Headers object, an object literal, or an array of two-item arrays to set handshake's headers.
   * This feature is non-standard.
   */
  headers?: HeadersInit;
  /**
   * An `HttpClient` instance to use when creating the WebSocket connection.
   * This is useful when you need to connect through a proxy or customize TLS settings.
   *
   * ```ts
   * const client = Deno.createHttpClient({
   *   proxy: {
   *     transport: "unix",
   *     path: "/path/to/socket",
   *   },
   * });
   *
   * const ws = new WebSocket("ws://localhost:8000/socket", { client });
   * ```
   *
   * @experimental
   */
  client?: Deno.HttpClient;
}

/**
 * Specifies the type of binary data being received over a `WebSocket` connection.
 *
 * - `"blob"`: Binary data is returned as `Blob` objects
 * - `"arraybuffer"`: Binary data is returned as `ArrayBuffer` objects
 *
 * @example
 * ```ts
 * // Setting up WebSocket for binary data as ArrayBuffer
 * const ws = new WebSocket("ws://localhost:8080");
 * ws.binaryType = "arraybuffer";
 *
 * ws.onmessage = (event) => {
 *   if (event.data instanceof ArrayBuffer) {
 *     // Process binary data
 *     const view = new Uint8Array(event.data);
 *     console.log(`Received binary data of ${view.length} bytes`);
 *   } else {
 *     // Process text data
 *     console.log(`Received text: ${event.data}`);
 *   }
 * };
 *
 * // Sending binary data
 * const binaryData = new Uint8Array([1, 2, 3, 4]);
 * ws.send(binaryData.buffer);
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/binaryType
 * @category WebSockets
 */
type BinaryType = "arraybuffer" | "blob";

// Copyright 2018-2026 the Deno authors. MIT license.

// deno-lint-ignore-file no-explicit-any no-var

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

/** This Web Storage API interface provides access to a particular domain's
 * session or local storage. It allows, for example, the addition, modification,
 * or deletion of stored data items.
 *
 * @category Storage
 */
interface Storage {
  /**
   * Returns the number of key/value pairs currently present in the list associated with the object.
   */
  readonly length: number;
  /**
   * Empties the list associated with the object of all key/value pairs, if there are any.
   */
  clear(): void;
  /**
   * Returns the current value associated with the given key, or null if the given key does not exist in the list associated with the object.
   */
  getItem(key: string): string | null;
  /**
   * Returns the name of the nth key in the list, or null if n is greater than or equal to the number of key/value pairs in the object.
   */
  key(index: number): string | null;
  /**
   * Removes the key/value pair with the given key from the list associated with the object, if a key/value pair with the given key exists.
   */
  removeItem(key: string): void;
  /**
   * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
   *
   * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
   */
  setItem(key: string, value: string): void;
  [name: string]: any;
}

/** This Web Storage API interface provides access to a particular domain's
 * session or local storage. Instances of this interface are not constructable
 * and are accessed through the {@linkcode localStorage} and
 * {@linkcode sessionStorage} globals.
 *
 * @see https://developer.mozilla.org/docs/Web/API/Storage
 *
 * @category Storage
 */
declare var Storage: {
  readonly prototype: Storage;
  new (): never;
};

// Copyright 2018-2026 the Deno authors. MIT license.

// deno-lint-ignore-file no-var

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

/**
 * Specifies whether the image should be decoded using color space conversion.
 * Either none or default (default). The value default indicates that
 * implementation-specific behavior is used.
 *
 * @category Canvas
 */
type ColorSpaceConversion = "default" | "none";

/**
 * Specifies how the bitmap image should be oriented.
 *
 * @category Canvas
 */
type ImageOrientation = "flipY" | "from-image" | "none";

/**
 * Specifies whether the bitmap's color channels should be premultiplied by
 * the alpha channel.
 *
 * @category Canvas
 */
type PremultiplyAlpha = "default" | "none" | "premultiply";

/**
 * Specifies the algorithm to be used for resizing the input to match the
 * output dimensions. One of `pixelated`, `low` (default), `medium`, or `high`.
 *
 * @category Canvas
 */
type ResizeQuality = "high" | "low" | "medium" | "pixelated";

/**
 * The `ImageBitmapSource` type represents an image data source that can be
 * used to create an `ImageBitmap`.
 *
 * @category Canvas */
type ImageBitmapSource = Blob | ImageData | ImageBitmap;

/**
 * The options of {@linkcode createImageBitmap}.
 *
 * @category Canvas */
interface ImageBitmapOptions {
  /**
   * Specifies whether the image should be decoded using color space
   * conversion. Either none or default (default). The value default
   * indicates that implementation-specific behavior is used.
   */
  colorSpaceConversion?: ColorSpaceConversion;
  /** Specifies how the bitmap image should be oriented. */
  imageOrientation?: ImageOrientation;
  /**
   * Specifies whether the bitmap's color channels should be premultiplied
   * by the alpha channel. One of none, premultiply, or default (default).
   */
  premultiplyAlpha?: PremultiplyAlpha;
  /** The output height. */
  resizeHeight?: number;
  /**
   * Specifies the algorithm to be used for resizing the input to match the
   * output dimensions. One of pixelated, low (default), medium, or high.
   */
  resizeQuality?: ResizeQuality;
  /** The output width. */
  resizeWidth?: number;
}

/**
 * Create a new {@linkcode ImageBitmap} object from a given source.
 *
 * @param image The image to create an {@linkcode ImageBitmap} from.
 * @param options The options for creating the {@linkcode ImageBitmap}.
 *
 * @category Canvas
 *
 * @example
 * ```ts
 * try {
 *   // Fetch an image
 *   const response = await fetch("https://example.com/image.png");
 *   const blob = await response.blob();
 *
 *   // Basic usage
 *   const basicBitmap = await createImageBitmap(blob);
 *   console.log("Basic bitmap size:", basicBitmap.width, basicBitmap.height);
 *
 *   // With options
 *   const resizedBitmap = await createImageBitmap(blob, {
 *     resizeWidth: 100,
 *     resizeHeight: 100,
 *     resizeQuality: "high",
 *     imageOrientation: "flipY"
 *   });
 *
 *   // Cleanup when done
 *   basicBitmap.close();
 *   resizedBitmap.close();
 * } catch (error) {
 *   console.error("Failed to create ImageBitmap:", error);
 * }
 * ```
 * @see https://developer.mozilla.org/en-US/docs/Web/API/createImageBitmap
 */
declare function createImageBitmap(
  image: ImageBitmapSource,
  options?: ImageBitmapOptions,
): Promise<ImageBitmap>;
/**
 * Create a new {@linkcode ImageBitmap} object from a given source, cropping
 * to the specified rectangle.
 *
 * @param image The image to create an {@linkcode ImageBitmap} from.
 * @param sx The x coordinate of the top-left corner of the sub-rectangle from
 *           which the {@linkcode ImageBitmap} will be cropped.
 * @param sy The y coordinate of the top-left corner of the sub-rectangle from
 *           which the {@linkcode ImageBitmap} will be cropped.
 * @param sw The width of the sub-rectangle from which the
 *           {@linkcode ImageBitmap} will be cropped.
 * @param sh The height of the sub-rectangle from which the
 *           {@linkcode ImageBitmap} will be cropped.
 * @param options The options for creating the {@linkcode ImageBitmap}.
 *
 * @category Canvas
 *
 * @example
 * ```ts
 * try {
 *   // Fetch an image
 *   const response = await fetch("https://example.com/image.png");
 *   const blob = await response.blob();
 *
 *   // Cropping parameters
 *   const croppedBitmap = await createImageBitmap(
 *     blob,
 *     0,    // sx: start x
 *     0,    // sy: start y
 *     50,   // sw: source width
 *     50,   // sh: source height
 *   );
 *
 *   // Cleanup when done
 *   croppedBitmap.close();
 * } catch (error) {
 *   console.error("Failed to create ImageBitmap:", error);
 * }
 * ```
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/createImageBitmap
 */
declare function createImageBitmap(
  image: ImageBitmapSource,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  options?: ImageBitmapOptions,
): Promise<ImageBitmap>;

/**
 * `ImageBitmap` interface represents a bitmap image which can be drawn to a canvas.
 *
 * @category Canvas
 */
interface ImageBitmap {
  /**
   * The height of the bitmap.
   */
  readonly height: number;
  /**
   * The width of the bitmap.
   */
  readonly width: number;
  /**
   * Releases imageBitmap's resources.
   */
  close(): void;
}

/**
 * `ImageBitmap` represents a bitmap image which can be drawn to a canvas.
 *
 * @category Canvas
 */
declare var ImageBitmap: {
  prototype: ImageBitmap;
  new (): ImageBitmap;
};

/** @category Canvas */
type OffscreenRenderingContextId = "bitmaprenderer" | "webgpu";
/** @category Canvas */
type OffscreenRenderingContext = ImageBitmapRenderingContext | GPUCanvasContext;

/** @category Canvas */
interface ImageEncodeOptions {
  quality?: number;
  type?: string;
}

/** @category Canvas */
type GPUCanvasAlphaMode = "opaque" | "premultiplied";

/** @category Canvas */
type GPUPresentMode =
  | "auto-vsync"
  | "auto-no-vsync"
  | "fifo"
  | "fifo-relaxed"
  | "immediate"
  | "mailbox";

/** @category Canvas */
interface GPUCanvasConfiguration {
  device: GPUDevice;
  format: GPUTextureFormat;
  usage?: GPUTextureUsageFlags;
  viewFormats?: GPUTextureFormat[];
  colorSpace?: "srgb" | "display-p3";
  alphaMode?: GPUCanvasAlphaMode;

  // extended from spec
  presentMode?: GPUPresentMode;
}

/** The rendering context that presents WebGPU-rendered images on an
 * {@linkcode OffscreenCanvas}. Obtained from
 * {@linkcode OffscreenCanvas.getContext} with the `"webgpu"` context id.
 *
 * @category Canvas */
interface GPUCanvasContext {
  /** The canvas that this context is bound to. */
  readonly canvas: OffscreenCanvas;

  configure(configuration: GPUCanvasConfiguration): undefined;
  getConfiguration(): GPUCanvasConfiguration | null;
  unconfigure(): undefined;
  getCurrentTexture(): GPUTexture;
}
/** The constructor object for {@linkcode GPUCanvasContext}.
 *
 * A `GPUCanvasContext` is obtained from
 * {@linkcode OffscreenCanvas.getContext} with the `"webgpu"` context id rather
 * than constructed directly.
 *
 * @category Canvas */
declare var GPUCanvasContext: {
  prototype: GPUCanvasContext;
};

/** A rendering context that displays the contents of an {@linkcode ImageBitmap}
 * on an {@linkcode OffscreenCanvas}. Obtained from
 * {@linkcode OffscreenCanvas.getContext} with the `"bitmaprenderer"` context
 * id.
 *
 * @category Canvas */
interface ImageBitmapRenderingContext {
  /** The canvas that this context is bound to. */
  readonly canvas: OffscreenCanvas;

  transferFromImageBitmap(bitmap: ImageBitmap | null): undefined;
}
/** The constructor object for {@linkcode ImageBitmapRenderingContext}.
 *
 * An `ImageBitmapRenderingContext` is obtained from
 * {@linkcode OffscreenCanvas.getContext} with the `"bitmaprenderer"` context id
 * rather than constructed directly.
 *
 * @category Canvas */
declare var ImageBitmapRenderingContext: {
  prototype: ImageBitmapRenderingContext;
};

/** A canvas that can be rendered to off the main thread and without being
 * attached to the DOM. It exposes drawing contexts via
 * {@linkcode OffscreenCanvas.getContext} and can produce a {@linkcode Blob} or
 * {@linkcode ImageBitmap} from its contents.
 *
 * @category Canvas
 * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
 */
interface OffscreenCanvas extends EventTarget {
  /** The height of the canvas. */
  height: number;
  /** The width of the canvas. */
  width: number;

  /** Create a Blob object representing the image contained in the canvas. */
  convertToBlob(options?: ImageEncodeOptions): Promise<Blob>;

  /**
   * Get a drawing context for the canvas.
   * If this was previously called, it will return the same context.
   */
  getContext(
    contextId: "bitmaprenderer",
    options?: any,
  ): ImageBitmapRenderingContext | null;
  getContext(contextId: "webgpu", options?: any): GPUCanvasContext | null;
  getContext(
    contextId: OffscreenRenderingContextId,
    options?: any,
  ): OffscreenRenderingContext | null;
  // Spec also defines "2d", "webgl", and "webgl2" context ids; Deno does
  // not implement those and getContext returns null for them.
  getContext(
    contextId: "2d" | "webgl" | "webgl2",
    options?: any,
  ): null;

  /**
   * Create an ImageBitmap object representing the image contained in the canvas.
   */
  transferToImageBitmap(): ImageBitmap;
}

/** The constructor object for {@linkcode OffscreenCanvas}, used to create a new
 * offscreen canvas with the given `width` and `height` that can be rendered to
 * without being attached to the DOM.
 *
 * @category Canvas
 * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
 */
declare var OffscreenCanvas: {
  prototype: OffscreenCanvas;
  new (width: number, height: number): OffscreenCanvas;
};

// Copyright 2018-2026 the Deno authors. MIT license.

// deno-lint-ignore-file no-var

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

/** The global instance of {@linkcode Crypto} that provides access to the Web
 * Crypto API, including cryptographically secure random number generation via
 * {@linkcode Crypto.getRandomValues}, random UUID generation via
 * {@linkcode Crypto.randomUUID}, and the low-level primitives exposed by
 * {@linkcode SubtleCrypto} through {@linkcode Crypto.subtle}.
 *
 * @category Crypto */
declare var crypto: Crypto;

/** @category Crypto */
interface Algorithm {
  name: string;
}

/** @category Crypto */
interface KeyAlgorithm {
  name: string;
}

/** @category Crypto */
type AlgorithmIdentifier = string | Algorithm;
/** @category Crypto */
type HashAlgorithmIdentifier = AlgorithmIdentifier;
/** @category Crypto */
type KeyType = "private" | "public" | "secret";
/** @category Crypto */
type KeyUsage =
  | "decrypt"
  | "deriveBits"
  | "deriveKey"
  | "encrypt"
  | "sign"
  | "unwrapKey"
  | "verify"
  | "wrapKey";
/** @category Crypto */
type KeyFormat =
  | "jwk"
  | "pkcs8"
  | "raw"
  | "raw-secret"
  | "raw-public"
  | "raw-private"
  | "raw-seed"
  | "spki";
/** @category Crypto */
type NamedCurve = string;
/** @category Crypto */
type BigInteger = Uint8Array<ArrayBuffer>;

/** @category Crypto */
interface RsaOtherPrimesInfo {
  d?: string;
  r?: string;
  t?: string;
}

/** @category Crypto */
interface JsonWebKey {
  alg?: string;
  crv?: string;
  d?: string;
  dp?: string;
  dq?: string;
  e?: string;
  ext?: boolean;
  k?: string;
  // deno-lint-ignore camelcase
  key_ops?: string[];
  kty?: string;
  n?: string;
  oth?: RsaOtherPrimesInfo[];
  p?: string;
  q?: string;
  qi?: string;
  use?: string;
  x?: string;
  y?: string;
}

/** @category Crypto */
interface AesCbcParams extends Algorithm {
  iv: BufferSource;
}

/** @category Crypto */
interface AesGcmParams extends Algorithm {
  iv: BufferSource;
  additionalData?: BufferSource;
  tagLength?: number;
}

/** @category Crypto */
interface AesCtrParams extends Algorithm {
  counter: BufferSource;
  length: number;
}

/** @category Crypto */
interface HmacKeyGenParams extends Algorithm {
  hash: HashAlgorithmIdentifier;
  length?: number;
}

/** @category Crypto */
interface EcKeyGenParams extends Algorithm {
  namedCurve: NamedCurve;
}

/** @category Crypto */
interface EcKeyImportParams extends Algorithm {
  namedCurve: NamedCurve;
}

/** @category Crypto */
interface EcdsaParams extends Algorithm {
  hash: HashAlgorithmIdentifier;
}

/** @category Crypto */
interface RsaHashedImportParams extends Algorithm {
  hash: HashAlgorithmIdentifier;
}

/** @category Crypto */
interface RsaHashedKeyGenParams extends RsaKeyGenParams {
  hash: HashAlgorithmIdentifier;
}

/** @category Crypto */
interface RsaKeyGenParams extends Algorithm {
  modulusLength: number;
  publicExponent: BigInteger;
}

/** @category Crypto */
interface RsaPssParams extends Algorithm {
  saltLength: number;
}

/** @category Crypto */
interface RsaOaepParams extends Algorithm {
  label?: BufferSource;
}

/** @category Crypto */
interface HmacImportParams extends Algorithm {
  hash: HashAlgorithmIdentifier;
  length?: number;
}

/** @category Crypto */
interface EcKeyAlgorithm extends KeyAlgorithm {
  namedCurve: NamedCurve;
}

/** @category Crypto */
interface HmacKeyAlgorithm extends KeyAlgorithm {
  hash: KeyAlgorithm;
  length: number;
}

/** @category Crypto */
interface RsaHashedKeyAlgorithm extends RsaKeyAlgorithm {
  hash: KeyAlgorithm;
}

/** @category Crypto */
interface RsaKeyAlgorithm extends KeyAlgorithm {
  modulusLength: number;
  publicExponent: BigInteger;
}

/** @category Crypto */
interface HkdfParams extends Algorithm {
  hash: HashAlgorithmIdentifier;
  info: BufferSource;
  salt: BufferSource;
}

/** @category Crypto */
interface Pbkdf2Params extends Algorithm {
  hash: HashAlgorithmIdentifier;
  iterations: number;
  salt: BufferSource;
}

/** @category Crypto */
interface AesDerivedKeyParams extends Algorithm {
  length: number;
}

/** @category Crypto */
interface EcdhKeyDeriveParams extends Algorithm {
  public: CryptoKey;
}

/** @category Crypto */
interface AesKeyGenParams extends Algorithm {
  length: number;
}

/** @category Crypto */
interface AesKeyAlgorithm extends KeyAlgorithm {
  length: number;
}

/** The CryptoKey dictionary of the Web Crypto API represents a cryptographic
 * key.
 *
 * @category Crypto
 */
interface CryptoKey {
  readonly algorithm: KeyAlgorithm;
  readonly extractable: boolean;
  readonly type: KeyType;
  readonly usages: KeyUsage[];
}

/** The constructor object for {@linkcode CryptoKey}.
 *
 * `CryptoKey` instances cannot be created directly; they are produced by
 * {@linkcode SubtleCrypto} methods such as `generateKey`, `importKey`, and
 * `deriveKey`, so calling the constructor throws.
 *
 * @category Crypto */
declare var CryptoKey: {
  readonly prototype: CryptoKey;
  new (): never;
};

/** The CryptoKeyPair dictionary of the Web Crypto API represents a key pair for
 * an asymmetric cryptography algorithm, also known as a public-key algorithm.
 *
 * @category Crypto
 */
interface CryptoKeyPair {
  privateKey: CryptoKey;
  publicKey: CryptoKey;
}

/** The constructor object for {@linkcode CryptoKeyPair}.
 *
 * `CryptoKeyPair` objects are returned by {@linkcode SubtleCrypto.generateKey}
 * for asymmetric algorithms and cannot be constructed directly, so calling the
 * constructor throws.
 *
 * @category Crypto */
declare var CryptoKeyPair: {
  readonly prototype: CryptoKeyPair;
  new (): never;
};

/** This Web Crypto API interface provides a number of low-level cryptographic
 * functions. It is accessed via the Crypto.subtle properties available in a
 * window context (via globalThis.crypto).
 *
 * @category Crypto
 */
interface SubtleCrypto {
  /**
   * Generates an asymmetric cryptographic key pair for encryption, signing, or
   * key exchange.
   *
   * This overload is used for generating key pairs with RSA or elliptic curve
   * algorithms.
   *
   * @example
   * ```ts
   * // RSA key generation
   * const key = await crypto.subtle.generateKey(
   *   {
   *     name: "RSA-OAEP",
   *     modulusLength: 4096,
   *     publicExponent: new Uint8Array([1, 0, 1]),
   *     hash: "SHA-256",
   *   },
   *   true,
   *   ["encrypt", "decrypt"]
   * );
   * ```
   *
   * @example
   * ```ts
   * // Elliptic curve (ECDSA) key pair generation
   * const key = await crypto.subtle.generateKey(
   *   {
   *     name: "ECDSA",
   *     namedCurve: "P-384",
   *   },
   *   true,
   *   ["sign", "verify"]
   * );
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
   */
  generateKey(
    algorithm: RsaHashedKeyGenParams | EcKeyGenParams,
    extractable: boolean,
    keyUsages: KeyUsage[],
  ): Promise<CryptoKeyPair>;
  /**
   * Generates a symmetric cryptographic key for encryption, authentication, or
   * hashing.
   *
   * This overload is used for algorithms such as AES and HMAC.
   *
   * @example
   * ```ts
   * const key = await crypto.subtle.generateKey(
   *  {
   *    name: "AES-GCM",
   *    length: 256,
   *  },
   *  true,
   *  ["encrypt", "decrypt"]
   * );
   * ```
   *
   * @example
   * ```ts
   * // HMAC key generation
   * const key = await crypto.subtle.generateKey(
   *  {
   *    name: "HMAC",
   *    hash: { name: "SHA-512" },
   *  },
   *  true,
   *  ["sign", "verify"]
   * );
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
   */
  generateKey(
    algorithm: AesKeyGenParams | HmacKeyGenParams,
    extractable: boolean,
    keyUsages: KeyUsage[],
  ): Promise<CryptoKey>;
  /**
   * Generates a cryptographic key or key pair for a given algorithm.
   *
   * This generic overload handles any key generation request, returning either
   * a symmetric key or an asymmetric key pair based on the provided algorithm.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
   */
  generateKey(
    algorithm: AlgorithmIdentifier,
    extractable: boolean,
    keyUsages: KeyUsage[],
  ): Promise<CryptoKeyPair | CryptoKey>;

  /**
   * Imports a cryptographic key in JSON Web Key (JWK) format.
   *
   * This method is used to import an asymmetric key (e.g., RSA or ECDSA) from a JWK object.
   * JWK allows structured representation of keys, making them portable across different systems.
   *
   * @example
   * ```ts
   * // Import an ECDSA private signing key where `jwk` is an object describing a private key
   * crypto.subtle.importKey(
   *   "jwk",
   *   jwk,
   *   {
   *     name: "ECDSA",
   *     namedCurve: "P-384",
   *   },
   *   true,
   *   ["sign"],
   * );
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey
   */
  importKey(
    format: "jwk",
    keyData: JsonWebKey,
    algorithm:
      | AlgorithmIdentifier
      | HmacImportParams
      | RsaHashedImportParams
      | EcKeyImportParams,
    extractable: boolean,
    keyUsages: KeyUsage[],
  ): Promise<CryptoKey>;
  /**
   * Imports a cryptographic key in raw, PKCS8, or SPKI format.
   *
   * This method is used to import symmetric keys (e.g., AES), private keys (PKCS8), or public keys (SPKI).
   *
   * @example
   * ```ts
   * // Import an AES-GCM secret key where `rawKey` is an ArrayBuffer string
   * crypto.subtle.importKey("raw", rawKey, "AES-GCM", true, [
   *   "encrypt",
   *   "decrypt",
   * ]);
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey
   */
  importKey(
    format: Exclude<KeyFormat, "jwk">,
    keyData: BufferSource,
    algorithm:
      | AlgorithmIdentifier
      | HmacImportParams
      | RsaHashedImportParams
      | EcKeyImportParams,
    extractable: boolean,
    keyUsages: KeyUsage[],
  ): Promise<CryptoKey>;
  /**
   * Exports a cryptographic key in JSON Web Key (JWK) format.
   *
   * This method allows exporting an asymmetric key (e.g., RSA, ECDSA) into a JSON-based representation,
   * making it easy to store and transfer across systems.
   *
   * @example
   * ```ts
   * await crypto.subtle.exportKey("jwk", key);
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey
   */
  exportKey(format: "jwk", key: CryptoKey): Promise<JsonWebKey>;
  /**
   * Exports a cryptographic key in raw, PKCS8, or SPKI format.
   *
   * This method is used to export symmetric keys (AES), private keys (PKCS8), or public keys (SPKI) in binary form.
   *
   * @example
   * ```ts
   * await crypto.subtle.exportKey("raw", key);
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey
   */
  exportKey(
    format: Exclude<KeyFormat, "jwk">,
    key: CryptoKey,
  ): Promise<ArrayBuffer>;
  /**
   * Generates a digital signature using a private cryptographic key.
   *
   * This method is used to sign data with an asymmetric key (e.g., RSA-PSS, ECDSA).
   *
   * @example
   * ```ts
   * await crypto.subtle.sign("ECDSA", key, data);
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign
   */
  sign(
    algorithm: AlgorithmIdentifier | RsaPssParams | EcdsaParams,
    key: CryptoKey,
    data: BufferSource,
  ): Promise<ArrayBuffer>;
  /**
   * Verifies a digital signature using a public cryptographic key.
   *
   * This method checks whether a signature is valid for the given data.
   *
   * @example
   * ```ts
   * await crypto.subtle.verify("ECDSA", key, signature, data);
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify
   */
  verify(
    algorithm: AlgorithmIdentifier | RsaPssParams | EcdsaParams,
    key: CryptoKey,
    signature: BufferSource,
    data: BufferSource,
  ): Promise<boolean>;
  /**
   * Computes a cryptographic hash (digest) of the given data.
   *
   * This method is commonly used for verifying data integrity.
   *
   * @example
   * ```ts
   * // Compute the digest of given data using a cryptographic algorithm
   * await crypto.subtle.digest("SHA-256", data);
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
   */
  digest(
    algorithm: AlgorithmIdentifier,
    data: BufferSource,
  ): Promise<ArrayBuffer>;
  /**
   * Encrypts data using a cryptographic key.
   *
   * This method is used with both symmetric (AES) and asymmetric (RSA) encryption.
   *
   * @example
   * ```ts
   * await crypto.subtle.encrypt("RSA-OAEP", key, data);
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt
   */
  encrypt(
    algorithm:
      | AlgorithmIdentifier
      | RsaOaepParams
      | AesCbcParams
      | AesGcmParams
      | AesCtrParams,
    key: CryptoKey,
    data: BufferSource,
  ): Promise<ArrayBuffer>;
  /**
   * Decrypts previously encrypted data using a cryptographic key.
   *
   * @example
   * ```ts
   * await crypto.subtle.decrypt("RSA-OAEP", key, data);
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt
   */
  decrypt(
    algorithm:
      | AlgorithmIdentifier
      | RsaOaepParams
      | AesCbcParams
      | AesGcmParams
      | AesCtrParams,
    key: CryptoKey,
    data: BufferSource,
  ): Promise<ArrayBuffer>;
  /**
   * This method is used to derive a key from a base key using a cryptographic algorithm.
   *
   * @example
   * ```ts
   * await crypto.subtle.deriveBits("HKDF", baseKey, length);
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveBits
   */
  deriveBits(
    algorithm:
      | AlgorithmIdentifier
      | HkdfParams
      | Pbkdf2Params
      | EcdhKeyDeriveParams,
    baseKey: CryptoKey,
    length: number,
  ): Promise<ArrayBuffer>;
  /**
   * This method is used to derive a secret key from a base or master key using a cryptographic algorithm.
   * It returns a Promise which fulfils with an object of the new key.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey
   *
   * @example
   * ```ts
   * // Derive a key using an HKDF algorithm
   * await crypto.subtle.deriveKey("HKDF", baseKey, derivedKeyType, extractable, keyUsages);
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey
   */
  deriveKey(
    algorithm:
      | AlgorithmIdentifier
      | HkdfParams
      | Pbkdf2Params
      | EcdhKeyDeriveParams,
    baseKey: CryptoKey,
    derivedKeyType:
      | AlgorithmIdentifier
      | AesDerivedKeyParams
      | HmacImportParams
      | HkdfParams
      | Pbkdf2Params,
    extractable: boolean,
    keyUsages: KeyUsage[],
  ): Promise<CryptoKey>;
  /**
   * Wraps (encrypts) a cryptographic key for secure storage or transmission
   *
   * @example
   * ```ts
   * await crypto.subtle.wrapKey("jwk", key, wrappingKey, "RSA-OAEP");
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/wrapKey
   */
  wrapKey(
    format: KeyFormat,
    key: CryptoKey,
    wrappingKey: CryptoKey,
    wrapAlgorithm:
      | AlgorithmIdentifier
      | RsaOaepParams
      | AesCbcParams
      | AesCtrParams,
  ): Promise<ArrayBuffer>;
  /**
   * Unwraps (decrypts) a previously wrapped key.
   *
   * @example
   * ```ts
   * // Unwrap an AES-GCM key wrapped with AES-KW
   * const unwrappedKey = await crypto.subtle.unwrapKey(
   *   "jwk", // Format of the key to import
   *   wrappedKey, // Encrypted key data as ArrayBuffer
   *   unwrappingKey, // CryptoKey used for unwrapping
   *   { name: "AES-KW" }, // Unwrapping algorithm
   *   { name: "AES-GCM", length: 256 }, // Algorithm for unwrapped key
   *   true, // Whether the unwrapped key is extractable
   *   ["encrypt", "decrypt"] // Allowed key usages
   * );
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey
   */
  unwrapKey(
    format: KeyFormat,
    wrappedKey: BufferSource,
    unwrappingKey: CryptoKey,
    unwrapAlgorithm:
      | AlgorithmIdentifier
      | RsaOaepParams
      | AesCbcParams
      | AesCtrParams,
    unwrappedKeyAlgorithm:
      | AlgorithmIdentifier
      | HmacImportParams
      | RsaHashedImportParams
      | EcKeyImportParams,
    extractable: boolean,
    keyUsages: KeyUsage[],
  ): Promise<CryptoKey>;
}

/** The constructor object for {@linkcode SubtleCrypto}.
 *
 * The `SubtleCrypto` instance is accessed via {@linkcode Crypto.subtle}
 * (`crypto.subtle`) rather than constructed directly, so calling the
 * constructor throws.
 *
 * @category Crypto */
declare var SubtleCrypto: {
  readonly prototype: SubtleCrypto;
  new (): never;
  /**
   * Synchronous feature detection for Web Crypto algorithm/operation
   * combinations, per the WICG "Modern Algorithms in the Web Crypto API"
   * proposal. Returns `true` when this runtime implements the requested
   * combination, `false` otherwise.
   *
   * The third argument is interpreted as the derived-bit length when it is
   * a number (relevant for `"deriveBits"`), and as a related algorithm —
   * e.g. the derived-key algorithm for `"deriveKey"`, the wrapped/unwrapped
   * key algorithm for `"wrapKey"` / `"unwrapKey"`, or the shared-key
   * algorithm for `"encapsulateKey"` / `"decapsulateKey"` — otherwise.
   *
   * @see https://wicg.github.io/webcrypto-modern-algos/#dom-subtlecrypto-supports
   */
  supports(
    operation:
      | "encrypt"
      | "decrypt"
      | "sign"
      | "verify"
      | "digest"
      | "generateKey"
      | "deriveKey"
      | "deriveBits"
      | "importKey"
      | "exportKey"
      | "wrapKey"
      | "unwrapKey"
      | "encapsulateKey"
      | "encapsulateBits"
      | "decapsulateKey"
      | "decapsulateBits"
      | "getPublicKey",
    algorithm: string | object,
    lengthOrHash?: number | string | object | null,
  ): boolean;
};

/** This Web Crypto API interface provides basic cryptographic functionality.
 * It is accessed via the global {@linkcode crypto} property, which gives access
 * to cryptographically strong random number generation and to the low-level
 * primitives exposed by {@linkcode SubtleCrypto} through {@linkcode Crypto.subtle}.
 *
 * @category Crypto */
interface Crypto {
  readonly subtle: SubtleCrypto;

  /**
   * Mutates the provided typed array with cryptographically secure random
   * values.
   *
   * @returns The same typed array, now populated with random values.
   *
   * @example
   * ```ts
   * const array = new Uint32Array(4);
   * crypto.getRandomValues(array);
   * console.log(array);
   * // output: Uint32Array(4) [ 3629234207, 1947236412, 3171234560, 4294901234 ]
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
   */
  getRandomValues<T extends ArrayBufferView>(array: T): T;

  /**
   * Generates a random RFC 4122 version 4 UUID using a cryptographically
   * secure random number generator.
   *
   * @returns A randomly generated, 36-character long v4 UUID.
   *
   * @example
   * ```ts
   * const uuid = crypto.randomUUID();
   * console.log(uuid);
   * // Example output: '36b8f84d-df4e-4d49-b662-bcde71a8764f'
   * ```
   *
   * The `randomUUID` method generates a version 4 UUID, which is purely
   * random. If you require other versions of UUIDs, such as time-based (v1) or
   * name-based (v3 and v5), consider using the `@std/uuid` package available
   * at {@link https://jsr.io/@std/uuid}.
   *
   * @example
   * ```ts
   * import { v1 } from 'jsr:@std/uuid';
   *
   * // Generate a time-based UUID (v1)
   * const uuidV1 = v1.generate();
   * console.log(uuidV1);
   * // output: 'a0c74f7e-82f1-11eb-8dcd-0242ac130003'
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
   */
  randomUUID(): `${string}-${string}-${string}-${string}-${string}`;
}

/** The constructor object for {@linkcode Crypto}.
 *
 * The `Crypto` instance is accessed via the global {@linkcode crypto} property
 * rather than constructed directly, so calling the constructor throws.
 *
 * @category Crypto */
declare var Crypto: {
  readonly prototype: Crypto;
  new (): never;
};

// Copyright 2018-2026 the Deno authors. MIT license.

// deno-lint-ignore-file no-explicit-any no-var

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

/**
 * @category Messaging
 */
interface BroadcastChannelEventMap {
  "message": MessageEvent;
  "messageerror": MessageEvent;
}

/** Represents a named channel that any
 * {@linkcode BroadcastChannel} with the same name (across workers or isolates
 * in the same Deno process) can use to send and receive messages, allowing
 * one-to-many communication between execution contexts.
 *
 * @category Messaging
 */
interface BroadcastChannel extends EventTarget {
  /**
   * Returns the channel name (as passed to the constructor).
   */
  readonly name: string;
  onmessage: ((this: BroadcastChannel, ev: MessageEvent) => any) | null;
  onmessageerror: ((this: BroadcastChannel, ev: MessageEvent) => any) | null;
  /**
   * Closes the BroadcastChannel object, opening it up to garbage collection.
   */
  close(): void;
  /**
   * Sends the given message to other BroadcastChannel objects set up for
   * this channel. Messages can be structured objects, e.g. nested objects
   * and arrays.
   */
  postMessage(message: any): void;
  addEventListener<K extends keyof BroadcastChannelEventMap>(
    type: K,
    listener: (this: BroadcastChannel, ev: BroadcastChannelEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof BroadcastChannelEventMap>(
    type: K,
    listener: (this: BroadcastChannel, ev: BroadcastChannelEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}

/** The constructor object for {@linkcode BroadcastChannel}.
 *
 * Construct a channel with `new BroadcastChannel(name)` to join the channel
 * identified by `name`; messages posted on it are delivered to every other
 * `BroadcastChannel` connected to the same name.
 *
 * @category Messaging
 */
declare var BroadcastChannel: {
  readonly prototype: BroadcastChannel;
  new (name: string): BroadcastChannel;
};

// Copyright 2018-2026 the Deno authors. MIT license.

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="esnext.disposable" />
// Copyright 2018-2026 the Deno authors. MIT license.

// Documentation partially adapted from [MDN](https://developer.mozilla.org/),
// by Mozilla Contributors, which is licensed under CC-BY-SA 2.5.

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="deno.console" />
/// <reference lib="deno.url" />
/// <reference lib="deno.web" />
/// <reference lib="deno.webgpu" />
/// <reference lib="deno.canvas" />
/// <reference lib="deno.fetch" />
/// <reference lib="deno.websocket" />
/// <reference lib="deno.crypto" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.broadcast_channel" />
/// <reference lib="node" />

/** The `WebAssembly` JavaScript object acts as the namespace for all
 * [WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)-related
 * functionality. Unlike most global objects, it is not a constructor; it groups
 * the functions used to compile and instantiate WebAssembly modules together
 * with the classes (`Module`, `Instance`, `Memory`, `Table`, `Global`) and
 * error types used to work with them.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly)
 *
 * @category Wasm */
declare namespace WebAssembly {
  /**
   * The `WebAssembly.CompileError` object indicates an error during WebAssembly decoding or validation.
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/CompileError)
   *
   * @category Wasm
   */
  export class CompileError extends Error {
    /** Creates a new `WebAssembly.CompileError` object. */
    constructor(message?: string, options?: ErrorOptions);
  }

  /**
   * A `WebAssembly.Global` object represents a global variable instance, accessible from
   * both JavaScript and importable/exportable across one or more `WebAssembly.Module`
   * instances. This allows dynamic linking of multiple modules.
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Global)
   *
   * @category Wasm
   */
  export class Global {
    /** Creates a new `Global` object. */
    constructor(descriptor: GlobalDescriptor, v?: any);

    /**
     * The value contained inside the global variable — this can be used to directly set
     * and get the global's value.
     */
    value: any;

    /** Old-style method that returns the value contained inside the global variable. */
    valueOf(): any;
  }

  /**
   * A `WebAssembly.Instance` object is a stateful, executable instance of a `WebAssembly.Module`.
   * Instance objects contain all the Exported WebAssembly functions that allow calling into
   * WebAssembly code from JavaScript.
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Instance)
   *
   * @category Wasm
   */
  export class Instance {
    /** Creates a new Instance object. */
    constructor(module: Module, importObject?: Imports);

    /**
     * Returns an object containing as its members all the functions exported from the
     * WebAssembly module instance, to allow them to be accessed and used by JavaScript.
     * Read-only.
     */
    readonly exports: Exports;
  }

  /**
   * The `WebAssembly.LinkError` object indicates an error during module instantiation
   * (besides traps from the start function).
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/LinkError)
   *
   * @category Wasm
   */
  export class LinkError extends Error {
    /** Creates a new WebAssembly.LinkError object. */
    constructor(message?: string, options?: ErrorOptions);
  }

  /**
   * The `WebAssembly.Memory` object is a resizable `ArrayBuffer` or `SharedArrayBuffer` that
   * holds the raw bytes of memory accessed by a WebAssembly Instance.
   *
   * A memory created by JavaScript or in WebAssembly code will be accessible and mutable
   * from both JavaScript and WebAssembly.
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Memory)
   *
   * @category Wasm
   */
  export class Memory {
    /** Creates a new `Memory` object. */
    constructor(descriptor: MemoryDescriptor);

    /** An accessor property that returns the buffer contained in the memory. */
    readonly buffer: ArrayBuffer | SharedArrayBuffer;

    /**
     * Increases the size of the memory instance by a specified number of WebAssembly
     * pages (each one is 64KB in size).
     */
    grow(delta: number): number;
  }

  /**
   * A `WebAssembly.Module` object contains stateless WebAssembly code that has already been compiled
   * by the browser — this can be efficiently shared with Workers, and instantiated multiple times.
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Module)
   *
   * @category Wasm
   */
  export class Module {
    /** Creates a new `Module` object. */
    constructor(bytes: BufferSource);

    /**
     * Given a `Module` and string, returns a copy of the contents of all custom sections in the
     * module with the given string name.
     */
    static customSections(
      moduleObject: Module,
      sectionName: string,
    ): ArrayBuffer[];

    /** Given a `Module`, returns an array containing descriptions of all the declared exports. */
    static exports(moduleObject: Module): ModuleExportDescriptor[];

    /** Given a `Module`, returns an array containing descriptions of all the declared imports. */
    static imports(moduleObject: Module): ModuleImportDescriptor[];
  }

  /**
   * The `WebAssembly.RuntimeError` object is the error type that is thrown whenever WebAssembly
   * specifies a trap.
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/RuntimeError)
   *
   * @category Wasm
   */
  export class RuntimeError extends Error {
    /** Creates a new `WebAssembly.RuntimeError` object. */
    constructor(message?: string, options?: ErrorOptions);
  }

  /**
   * The `WebAssembly.Table()` object is a JavaScript wrapper object — an array-like structure
   * representing a WebAssembly Table, which stores function references. A table created by
   * JavaScript or in WebAssembly code will be accessible and mutable from both JavaScript
   * and WebAssembly.
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Table)
   *
   * @category Wasm
   */
  export class Table {
    /** Creates a new `Table` object. */
    constructor(descriptor: TableDescriptor);

    /** Returns the length of the table, i.e. the number of elements. */
    readonly length: number;

    /** Accessor function — gets the element stored at a given index. */
    get(index: number): Function | null;

    /** Increases the size of the `Table` instance by a specified number of elements. */
    grow(delta: number): number;

    /** Sets an element stored at a given index to a given value. */
    set(index: number, value: Function | null): void;
  }

  /** The `GlobalDescriptor` describes the options you can pass to
   * `new WebAssembly.Global()`.
   *
   * @category Wasm
   */
  export interface GlobalDescriptor {
    /** Whether the global variable can be modified after creation. Defaults to
     * `false`. */
    mutable?: boolean;
    /** The data type of the global variable. */
    value: ValueType;
  }

  /** The `MemoryDescriptor` describes the options you can pass to
   * `new WebAssembly.Memory()`.
   *
   * @category Wasm
   */
  export interface MemoryDescriptor {
    /** The initial size of the memory, in units of WebAssembly pages (64KB
     * each). */
    initial: number;
    /** The maximum size the memory is allowed to grow to, in units of
     * WebAssembly pages. */
    maximum?: number;
    /** Whether the memory is shared between agents (backed by a
     * `SharedArrayBuffer`). Defaults to `false`. */
    shared?: boolean;
  }

  /** A `ModuleExportDescriptor` is the description of a declared export in a
   * `WebAssembly.Module`.
   *
   * @category Wasm
   */
  export interface ModuleExportDescriptor {
    /** The kind of entity being exported. */
    kind: ImportExportKind;
    /** The name under which the entity is exported. */
    name: string;
  }

  /** A `ModuleImportDescriptor` is the description of a declared import in a
   * `WebAssembly.Module`.
   *
   * @category Wasm
   */
  export interface ModuleImportDescriptor {
    /** The kind of entity being imported. */
    kind: ImportExportKind;
    /** The name of the module the entity is imported from. */
    module: string;
    /** The name of the imported entity within its module. */
    name: string;
  }

  /** The `TableDescriptor` describes the options you can pass to
   * `new WebAssembly.Table()`.
   *
   * @category Wasm
   */
  export interface TableDescriptor {
    /** The type of value stored in the table. */
    element: TableKind;
    /** The initial number of elements in the table. */
    initial: number;
    /** The maximum number of elements the table is allowed to grow to. */
    maximum?: number;
  }

  /** The value returned from `WebAssembly.instantiate`.
   *
   * @category Wasm
   */
  export interface WebAssemblyInstantiatedSource {
    /** A `WebAssembly.Instance` object that contains all the exported WebAssembly functions. */
    instance: Instance;

    /**
     * A `WebAssembly.Module` object representing the compiled WebAssembly module.
     * This `Module` can be instantiated again, or shared via postMessage().
     */
    module: Module;
  }

  /** The kind of entity referenced by a module import or export descriptor.
   *
   * @category Wasm */
  export type ImportExportKind = "function" | "global" | "memory" | "table";
  /** The type of value stored in a `WebAssembly.Table`.
   *
   * @category Wasm */
  export type TableKind = "anyfunc";
  /** The data type of a WebAssembly value, used to describe globals.
   *
   * @category Wasm */
  export type ValueType = "f32" | "f64" | "i32" | "i64";
  /** A value that can be exported from a WebAssembly module instance.
   *
   * @category Wasm */
  export type ExportValue = Function | Global | Memory | Table;
  /** The set of values exported by a WebAssembly module instance, keyed by
   * export name.
   *
   * @category Wasm */
  export type Exports = Record<string, ExportValue>;
  /** A value that can be supplied to a WebAssembly module as an import.
   *
   * @category Wasm */
  export type ImportValue = ExportValue | number;
  /** The set of values imported from a single module, keyed by import name.
   *
   * @category Wasm */
  export type ModuleImports = Record<string, ImportValue>;
  /** The import object supplied when instantiating a WebAssembly module,
   * grouping imported values by module name.
   *
   * @category Wasm */
  export type Imports = Record<string, ModuleImports>;

  /**
   * The `WebAssembly.compile()` function compiles WebAssembly binary code into a
   * `WebAssembly.Module` object. This function is useful if it is necessary to compile
   * a module before it can be instantiated (otherwise, the `WebAssembly.instantiate()`
   * function should be used).
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/compile)
   *
   * @category Wasm
   */
  export function compile(bytes: BufferSource): Promise<Module>;

  /**
   * The `WebAssembly.compileStreaming()` function compiles a `WebAssembly.Module`
   * directly from a streamed underlying source. This function is useful if it is
   * necessary to a compile a module before it can be instantiated (otherwise, the
   * `WebAssembly.instantiateStreaming()` function should be used).
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/compileStreaming)
   *
   * @category Wasm
   */
  export function compileStreaming(
    source: Response | Promise<Response>,
  ): Promise<Module>;

  /**
   * The WebAssembly.instantiate() function allows you to compile and instantiate
   * WebAssembly code.
   *
   * This overload takes the WebAssembly binary code, in the form of a typed
   * array or ArrayBuffer, and performs both compilation and instantiation in one step.
   * The returned Promise resolves to both a compiled WebAssembly.Module and its first
   * WebAssembly.Instance.
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiate)
   *
   * @category Wasm
   */
  export function instantiate(
    bytes: BufferSource,
    importObject?: Imports,
  ): Promise<WebAssemblyInstantiatedSource>;

  /**
   * The WebAssembly.instantiate() function allows you to compile and instantiate
   * WebAssembly code.
   *
   * This overload takes an already-compiled WebAssembly.Module and returns
   * a Promise that resolves to an Instance of that Module. This overload is useful
   * if the Module has already been compiled.
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiate)
   *
   * @category Wasm
   */
  export function instantiate(
    moduleObject: Module,
    importObject?: Imports,
  ): Promise<Instance>;

  /**
   * The `WebAssembly.instantiateStreaming()` function compiles and instantiates a
   * WebAssembly module directly from a streamed underlying source. This is the most
   * efficient, optimized way to load wasm code.
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiateStreaming)
   *
   * @category Wasm
   */
  export function instantiateStreaming(
    response: Response | PromiseLike<Response>,
    importObject?: Imports,
  ): Promise<WebAssemblyInstantiatedSource>;

  /**
   * The `WebAssembly.validate()` function validates a given typed array of
   * WebAssembly binary code, returning whether the bytes form a valid wasm
   * module (`true`) or not (`false`).
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/validate)
   *
   * @category Wasm
   */
  export function validate(bytes: BufferSource): boolean;
}

/** @category Platform */
interface VoidFunction {
  (): void;
}

/** A microtask is a short function which is executed after the function or
 * module which created it exits and only if the JavaScript execution stack is
 * empty, but before returning control to the event loop being used to drive the
 * script's execution environment. This event loop may be either the main event
 * loop or the event loop driving a web worker.
 *
 * ```ts
 * queueMicrotask(() => { console.log('This event loop stack is complete'); });
 * ```
 *
 * @category Platform
 */
declare function queueMicrotask(func: VoidFunction): void;

/** Dispatches an event in the global scope, synchronously invoking any
 * registered event listeners for this event in the appropriate order. Returns
 * false if event is cancelable and at least one of the event handlers which
 * handled this event called Event.preventDefault(). Otherwise it returns true.
 *
 * ```ts
 * dispatchEvent(new Event('unload'));
 * ```
 *
 * @category Events
 */
declare function dispatchEvent(event: Event): boolean;

/**
 * A global console object that provides methods for logging, debugging, and error reporting.
 * The console object provides access to the browser's or runtime's debugging console functionality.
 * It allows developers to output text and data for debugging purposes.
 *
 * @example
 * ```typescript
 * console.log("Hello, world!");
 * console.error("An error occurred");
 * console.warn("Warning message");
 * console.debug("Debug information");
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/console
 *
 * @category I/O
 */
declare var console: Console;

/**
 * A brand and version pair describing a user agent, as returned by
 * {@linkcode NavigatorUAData}.
 *
 * @category Platform
 */
interface NavigatorUABrandVersion {
  readonly brand: string;
  readonly version: string;
}

/**
 * The values returned by {@linkcode NavigatorUAData.getHighEntropyValues}.
 *
 * @category Platform
 */
interface UADataValues {
  readonly brands?: NavigatorUABrandVersion[];
  readonly mobile?: boolean;
  readonly platform?: string;
  readonly architecture?: string;
  readonly bitness?: string;
  readonly formFactors?: string[];
  readonly fullVersionList?: NavigatorUABrandVersion[];
  readonly model?: string;
  readonly platformVersion?: string;
  readonly uaFullVersion?: string;
  readonly wow64?: boolean;
}

/**
 * The low-entropy values returned by {@linkcode NavigatorUAData.toJSON}.
 *
 * @category Platform
 */
interface UALowEntropyJSON {
  readonly brands: NavigatorUABrandVersion[];
  readonly mobile: boolean;
  readonly platform: string;
}

/**
 * Gives access to information about the runtime's user agent, exposed via
 * {@linkcode Navigator.userAgentData}. This is the
 * [User-Agent Client Hints API](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData).
 *
 * @category Platform
 */
interface NavigatorUAData {
  /** A list of the runtime's brand and major version. */
  readonly brands: NavigatorUABrandVersion[];
  /** Whether the runtime reports itself as a mobile device. Always `false` in Deno. */
  readonly mobile: boolean;
  /** The platform the runtime is running on (e.g. `"Linux"`, `"macOS"`, `"Windows"`). */
  readonly platform: string;
  /**
   * Resolves with the requested high-entropy values. Unrecognized hints are
   * ignored. The low-entropy values (`brands`, `mobile`, `platform`) are always
   * included.
   */
  getHighEntropyValues(hints: string[]): Promise<UADataValues>;
  /** Returns a JSON representation of the low-entropy values. */
  toJSON(): UALowEntropyJSON;
}

/**
 * Constructor for {@linkcode NavigatorUAData} objects.
 *
 * Note: This constructor cannot be used to create new `NavigatorUAData`
 * instances in Deno.
 *
 * @category Platform
 */
declare var NavigatorUAData: {
  readonly prototype: NavigatorUAData;
  new (): never;
};

/** @category Platform */
interface DOMStringList {
  /** Returns the number of strings in strings. */
  readonly length: number;
  /** Returns true if strings contains string, and false otherwise. */
  contains(string: string): boolean;
  /** Returns the string with index index from strings. */
  item(index: number): string | null;
  [index: number]: string;
}

/** @category Platform */
type BufferSource = ArrayBufferView<ArrayBuffer> | ArrayBuffer;

/** @category Platform */
type AllowSharedBufferSource = ArrayBufferView | ArrayBufferLike;

/** @category Events */
interface ErrorEventInit extends EventInit {
  message?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  error?: any;
}

/** @category Events */
interface ErrorEvent extends Event {
  readonly message: string;
  readonly filename: string;
  readonly lineno: number;
  readonly colno: number;
  readonly error: any;
}

/** The constructor object for {@linkcode ErrorEvent}, used to construct an
 * event describing an uncaught error, such as the one dispatched on the global
 * scope as `error`.
 *
 * @category Events */
declare var ErrorEvent: {
  readonly prototype: ErrorEvent;
  new (type: string, eventInitDict?: ErrorEventInit): ErrorEvent;
};

/** @category Events */
interface PromiseRejectionEventInit extends EventInit {
  promise: Promise<any>;
  reason?: any;
}

/** @category Events */
interface PromiseRejectionEvent extends Event {
  readonly promise: Promise<any>;
  readonly reason: any;
}

/** The constructor object for {@linkcode PromiseRejectionEvent}, used to
 * construct the event dispatched on the global scope as `unhandledrejection`
 * and `rejectionhandled` when a promise is rejected without a handler.
 *
 * @category Events */
declare var PromiseRejectionEvent: {
  readonly prototype: PromiseRejectionEvent;
  new (
    type: string,
    eventInitDict?: PromiseRejectionEventInit,
  ): PromiseRejectionEvent;
};

/** @category Workers */
interface AbstractWorkerEventMap {
  "error": ErrorEvent;
}

/** @category Workers */
interface WorkerEventMap extends AbstractWorkerEventMap {
  "message": MessageEvent;
  "messageerror": MessageEvent;
}

/** @category Workers */
interface WorkerOptions {
  type?: "classic" | "module";
  name?: string;
}

/**
 * The Worker interface represents a background task that can be created via the
 * `new Worker()` constructor. Workers run in a separate thread, allowing for parallel execution
 * without blocking the main thread.
 *
 * Workers can be used to:
 * - Perform CPU-intensive calculations
 * - Process large datasets
 * - Handle tasks in parallel with the main execution thread
 * - Run code in isolation with its own event loop
 *
 * @example
 * ```ts
 * // Creating a basic worker (main.ts)
 * const worker = new Worker(new URL("./worker.ts", import.meta.url).href, {
 *   type: "module"
 * });
 *
 * // Send data to the worker
 * worker.postMessage({ command: "start", data: [1, 2, 3, 4] });
 *
 * // Receive messages from the worker
 * worker.onmessage = (e) => {
 *   console.log("Result from worker:", e.data);
 *   worker.terminate(); // Stop the worker when done
 * };
 *
 * // Handle worker errors
 * worker.onerror = (e) => {
 *   console.error("Worker error:", e.message);
 * };
 * ```
 *
 * @example
 * ```ts
 * // Worker file (worker.ts)
 * // Worker context: self refers to the worker's global scope
 * self.onmessage = (e) => {
 *   if (e.data.command === "start") {
 *     // Perform calculation with the data
 *     const result = e.data.data.reduce((sum, num) => sum + num, 0);
 *     // Send result back to main thread
 *     self.postMessage(result);
 *   }
 * };
 * ```
 *
 * @category Workers
 */
interface Worker extends EventTarget {
  /** Event handler for error events. Fired when an error occurs in the worker's execution context. */
  onerror: ((this: Worker, e: ErrorEvent) => any) | null;

  /** Event handler for message events. Fired when the worker sends data back to the main thread. */
  onmessage: ((this: Worker, e: MessageEvent) => any) | null;

  /** Event handler for message error events. Fired when a message cannot be deserialized. */
  onmessageerror: ((this: Worker, e: MessageEvent) => any) | null;

  /**
   * Sends a message to the worker, transferring ownership of the specified transferable objects.
   *
   * @example
   * ```ts
   * // Create a buffer to transfer (not copy) to the worker
   * const buffer = new ArrayBuffer(1024);
   * worker.postMessage({ data: buffer }, [buffer]);
   * // After transfer, buffer is no longer usable in the main thread
   * ```
   */
  postMessage(message: any, transfer: Transferable[]): void;

  /**
   * Sends a message to the worker.
   *
   * @example
   * ```ts
   * // Send a simple message with data
   * worker.postMessage({
   *   command: "process",
   *   data: [1, 2, 3, 4],
   *   settings: { optimize: true }
   * });
   * ```
   */
  postMessage(message: any, options?: StructuredSerializeOptions): void;

  /** Adds an event listener to the worker. */
  addEventListener<K extends keyof WorkerEventMap>(
    type: K,
    listener: (this: Worker, ev: WorkerEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;

  /** Adds an event listener for events whose type attribute value is type. */
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;

  /** Removes an event listener from the worker. */
  removeEventListener<K extends keyof WorkerEventMap>(
    type: K,
    listener: (this: Worker, ev: WorkerEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void;

  /** Removes an event listener from the worker. */
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;

  /**
   * Immediately terminates the worker.
   * This does not offer the worker an opportunity to finish its operations;
   * it is stopped at once.
   *
   * @example
   * ```ts
   * // Create a worker
   * const worker = new Worker(new URL("./worker.ts", import.meta.url).href, {
   *   type: "module"
   * });
   *
   * // Some time later, when you're done with the worker
   * worker.terminate();
   * // The worker is now terminated and its resources are freed
   * ```
   */
  terminate(): void;
}

/**
 * The Worker constructor creates a new Worker object that executes code in a separate thread.
 *
 * Workers can import ES modules when created with the `type: "module"` option.
 *
 * @category Workers
 */
declare var Worker: {
  readonly prototype: Worker;

  /**
   * Creates a new Worker object.
   *
   * @param specifier - URL or file path for the worker's script.
   *                    When using a relative path, use `new URL("./worker.ts", import.meta.url)`
   *                    to ensure the path is correctly resolved relative to the current module.
   * @param options - Worker options including type and name
   *
   * @example Module worker with URL resolution
   * ```ts
   * // Create a worker that can use ES modules
   * const worker = new Worker(
   *   new URL("./workers/heavy_computation.ts", import.meta.url).href,
   *   { type: "module", name: "computation-worker" }
   * );
   * ```
   *
   * @example Worker communication pattern
   * ```ts
   * // Main thread
   * const worker = new Worker(new URL("./worker.ts", import.meta.url).href, { type: "module" });
   *
   * // Set up communication
   * worker.postMessage({ action: "start", data: [1, 2, 3, 4, 5] });
   *
   * worker.onmessage = (e) => {
   *   console.log("Worker result:", e.data);
   *   if (e.data.status === "complete") {
   *     worker.terminate();
   *   }
   * };
   *
   * // Worker file (worker.ts)
   * // self.onmessage = (e) => {
   * //   if (e.data.action === "start") {
   * //     const result = e.data.data.reduce((a, b) => a + b, 0);
   * //     self.postMessage({ status: "complete", result });
   * //   }
   * // };
   * ```
   */
  new (specifier: string | URL, options?: WorkerOptions): Worker;
};

/** @category Performance */
type PerformanceEntryList = PerformanceEntry[];

/** @category Performance */
interface Performance extends EventTarget {
  /** Returns a timestamp representing the start of the performance measurement. */
  readonly timeOrigin: number;

  /** Removes the stored timestamp with the associated name. */
  clearMarks(markName?: string): void;

  /** Removes stored timestamp with the associated name. */
  clearMeasures(measureName?: string): void;

  /** Removes all performance entries with an entryType of "resource" from the
   * performance timeline and sets the size of the performance resource data
   * buffer to zero.
   *
   * Note: Deno does not currently track resource timings, so this method has
   * no observable effect. It is provided for API compatibility.
   */
  clearResourceTimings(): void;

  /** Sets the desired size of the browser's resource timing buffer which
   * stores the "resource" performance entries.
   *
   * Note: Deno does not currently track resource timings, so this method has
   * no observable effect. It is provided for API compatibility.
   */
  setResourceTimingBufferSize(maxSize: number): void;

  getEntries(): PerformanceEntryList;
  getEntriesByName(name: string, type?: string): PerformanceEntryList;
  getEntriesByType(type: string): PerformanceEntryList;

  /** Stores a timestamp with the associated name (a "mark"). */
  mark(markName: string, options?: PerformanceMarkOptions): PerformanceMark;

  /** Stores the `DOMHighResTimeStamp` duration between two marks along with the
   * associated name (a "measure"). */
  measure(
    measureName: string,
    options?: PerformanceMeasureOptions,
  ): PerformanceMeasure;
  /** Stores the `DOMHighResTimeStamp` duration between two marks along with the
   * associated name (a "measure"). */
  measure(
    measureName: string,
    startMark?: string,
    endMark?: string,
  ): PerformanceMeasure;

  /** Returns a current time from Deno's start in fractional milliseconds.
   *
   * ```ts
   * const t = performance.now();
   * console.log(`${t} ms since start!`);
   * ```
   */
  now(): number;

  /** Returns a JSON representation of the performance object. */
  toJSON(): any;
}

/** The constructor object for {@linkcode Performance}.
 *
 * The `Performance` instance is accessed via the global {@linkcode performance}
 * property rather than constructed directly, so calling the constructor throws.
 *
 * @category Performance */
declare var Performance: {
  readonly prototype: Performance;
  new (): never;
};

/** The global {@linkcode Performance} instance, providing access to
 * high-resolution timing via `performance.now()` and the user-timing marks and
 * measures APIs.
 *
 * @category Performance */
declare var performance: Performance;

/** @category Performance */
interface PerformanceMarkOptions {
  /** Metadata to be included in the mark. */
  detail?: any;

  /** Timestamp to be used as the mark time. */
  startTime?: number;
}

/** @category Performance */
interface PerformanceMeasureOptions {
  /** Metadata to be included in the measure. */
  detail?: any;

  /** Timestamp to be used as the start time or string to be used as start
   * mark. */
  start?: string | number;

  /** Duration between the start and end times. */
  duration?: number;

  /** Timestamp to be used as the end time or string to be used as end mark. */
  end?: string | number;
}

/** Encapsulates a single performance metric that is part of the performance
 * timeline. A performance entry can be directly created by making a performance
 * mark or measure (for example by calling the `.mark()` method) at an explicit
 * point in an application.
 *
 * @category Performance
 */
interface PerformanceEntry {
  readonly duration: number;
  readonly entryType: string;
  readonly name: string;
  readonly startTime: number;
  toJSON(): any;
}

/** Encapsulates a single performance metric that is part of the performance
 * timeline. A performance entry can be directly created by making a performance
 * mark or measure (for example by calling the `.mark()` method) at an explicit
 * point in an application.
 *
 * @category Performance
 */
declare var PerformanceEntry: {
  readonly prototype: PerformanceEntry;
  new (): never;
};

/** `PerformanceMark` is an abstract interface for `PerformanceEntry` objects
 * with an entryType of `"mark"`. Entries of this type are created by calling
 * `performance.mark()` to add a named `DOMHighResTimeStamp` (the mark) to the
 * performance timeline.
 *
 * @category Performance
 */
interface PerformanceMark extends PerformanceEntry {
  readonly detail: any;
  readonly entryType: "mark";
}

/** `PerformanceMark` is an abstract interface for `PerformanceEntry` objects
 * with an entryType of `"mark"`. Entries of this type are created by calling
 * `performance.mark()` to add a named `DOMHighResTimeStamp` (the mark) to the
 * performance timeline.
 *
 * @category Performance
 */
declare var PerformanceMark: {
  readonly prototype: PerformanceMark;
  new (name: string, options?: PerformanceMarkOptions): PerformanceMark;
};

/** `PerformanceMeasure` is an abstract interface for `PerformanceEntry` objects
 * with an entryType of `"measure"`. Entries of this type are created by calling
 * `performance.measure()` to add a named `DOMHighResTimeStamp` (the measure)
 * between two marks to the performance timeline.
 *
 * @category Performance
 */
interface PerformanceMeasure extends PerformanceEntry {
  readonly detail: any;
  readonly entryType: "measure";
}

/** `PerformanceMeasure` is an abstract interface for `PerformanceEntry` objects
 * with an entryType of `"measure"`. Entries of this type are created by calling
 * `performance.measure()` to add a named `DOMHighResTimeStamp` (the measure)
 * between two marks to the performance timeline.
 *
 * @category Performance
 */
declare var PerformanceMeasure: {
  readonly prototype: PerformanceMeasure;
  new (): never;
};

/** A list of {@linkcode PerformanceEntry} objects passed to a
 * {@linkcode PerformanceObserver} callback via its `observe()` method.
 *
 * @category Performance
 */
interface PerformanceObserverEntryList {
  /** Returns all explicitly observed performance entries. */
  getEntries(): PerformanceEntry[];
  /** Returns the observed performance entries with the given name. */
  getEntriesByName(name: string, type?: string): PerformanceEntry[];
  /** Returns the observed performance entries with the given entry type. */
  getEntriesByType(type: string): PerformanceEntry[];
}

/** A list of {@linkcode PerformanceEntry} objects passed to a
 * {@linkcode PerformanceObserver} callback via its `observe()` method.
 *
 * @category Performance
 */
declare var PerformanceObserverEntryList: {
  readonly prototype: PerformanceObserverEntryList;
  new (): never;
};

/** The callback invoked when the observed set of performance entries grows.
 *
 * @category Performance
 */
interface PerformanceObserverCallback {
  (list: PerformanceObserverEntryList, observer: PerformanceObserver): void;
}

/** Observes performance measurement events and is notified of new
 * {@linkcode PerformanceEntry} objects as they are recorded in the performance
 * timeline.
 *
 * @category Performance
 */
interface PerformanceObserver {
  /** Stops the observer from receiving any further performance entries. */
  disconnect(): void;
  /** Specifies the set of performance entry types to observe. */
  observe(
    options?: {
      entryTypes?: string[];
      type?: string;
      buffered?: boolean;
    },
  ): void;
  /** Returns the current list of buffered performance entries, emptying it. */
  takeRecords(): PerformanceEntry[];
}

/** Observes performance measurement events and is notified of new
 * {@linkcode PerformanceEntry} objects as they are recorded in the performance
 * timeline.
 *
 * @category Performance
 */
declare var PerformanceObserver: {
  readonly prototype: PerformanceObserver;
  readonly supportedEntryTypes: readonly string[];
  new (callback: PerformanceObserverCallback): PerformanceObserver;
};

/** @category Events */
interface CustomEventInit<T = any> extends EventInit {
  detail?: T;
}

/** @category Events */
interface CustomEvent<T = any> extends Event {
  /** Returns any custom data event was created with. Typically used for
   * synthetic events. */
  readonly detail: T;
}

/** The constructor object for {@linkcode CustomEvent}, used to construct an
 * event that can carry arbitrary application-defined data via its `detail`
 * property.
 *
 * @category Events */
declare var CustomEvent: {
  readonly prototype: CustomEvent;
  new <T>(typeArg: string, eventInitDict?: CustomEventInit<T>): CustomEvent<T>;
};

/** @category Platform */
interface ErrorConstructor {
  /** See https://v8.dev/docs/stack-trace-api#stack-trace-collection-for-custom-exceptions. */
  captureStackTrace(error: Object, constructor?: Function): void;
  stackTraceLimit: number;
  // TODO(nayeemrmn): Support `Error.prepareStackTrace()`. We currently use this
  // internally in a way that makes it unavailable for users.
}

/** The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
 * which also supports setting a {@linkcode Deno.HttpClient} which provides a
 * way to connect via proxies and use custom TLS certificates.
 *
 * @tags allow-net, allow-read
 * @category Fetch
 */
declare function fetch(
  input: RequestInfo | URL,
  init?: RequestInit & { client?: Deno.HttpClient },
): Promise<Response>;

/** @category Platform */
interface Math {
  /**
   * Returns the sum of the given values using a more precise algorithm than a
   * naive `+`-based reduction, avoiding the floating-point rounding errors
   * that accumulate when summing many numbers.
   *
   * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sumPrecise)
   */
  sumPrecise(values: Iterable<number>): number;
}

/** The `Intl` namespace groups the
 * [ECMAScript Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
 * constructors and functions.
 *
 * This declaration augments the standard `Intl` namespace with members that are
 * not yet part of the bundled TypeScript library definitions.
 *
 * @category Intl */
declare namespace Intl {
  /** Augments the standard {@linkcode Intl.Locale} interface with members not
   * yet present in the bundled TypeScript library definitions.
   *
   * @category Intl */
  export interface Locale {
    /**
     * Returns the variant subtags of the locale as a single string, with
     * subtags separated by `-`. Returns `undefined` if the locale has no
     * variant subtags.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/variants)
     */
    readonly variants: string | undefined;
  }
}

// Copyright 2018-2026 the Deno authors. MIT license.

// deno-lint-ignore-file no-var

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

/** The global {@linkcode CacheStorage} instance, providing access to the named
 * {@linkcode Cache} objects used to store and retrieve `Request`/`Response`
 * pairs.
 *
 * @category Cache */
declare var caches: CacheStorage;

/** Represents the storage for named {@linkcode Cache} objects. It provides the
 * methods used to open, enumerate, look up, and delete caches, and is accessed
 * via the global {@linkcode caches} property.
 *
 * @category Cache */
interface CacheStorage {
  /** Open a cache storage for the provided name. */
  open(cacheName: string): Promise<Cache>;
  /** Check if cache already exists for the provided name. */
  has(cacheName: string): Promise<boolean>;
  /** Delete cache storage for the provided name. */
  delete(cacheName: string): Promise<boolean>;
  /** Return an array of all cache names tracked by the cache storage. */
  keys(): Promise<string[]>;
  /**
   * Check if a given `Request` or URL string is a key for a stored `Response`.
   * Returns the matching `Response`, or `undefined` if no match is found.
   *
   * If `options.cacheName` is provided, only the cache with that name is
   * searched. Otherwise, all caches are searched in creation order.
   */
  match(
    request: RequestInfo | URL,
    options?: MultiCacheQueryOptions,
  ): Promise<Response | undefined>;
}

/** Represents a single named store of `Request`/`Response` pairs. Obtain a
 * `Cache` via {@linkcode CacheStorage.open} and use it to persist responses and
 * later match incoming requests against them.
 *
 * @category Cache */
interface Cache {
  /**
   * Put the provided request/response into the cache.
   *
   * How is the API different from browsers?
   * 1. You cannot match cache objects using relative paths.
   * 2. You cannot pass options like `ignoreVary`, `ignoreMethod`, `ignoreSearch`.
   */
  put(request: RequestInfo | URL, response: Response): Promise<void>;
  /**
   * Return cache object matching the provided request.
   *
   * How is the API different from browsers?
   * 1. You cannot match cache objects using relative paths.
   * 2. You cannot pass options like `ignoreVary`, `ignoreMethod`, `ignoreSearch`.
   */
  match(
    request: RequestInfo | URL,
    options?: CacheQueryOptions,
  ): Promise<Response | undefined>;
  /**
   * Delete cache object matching the provided request.
   *
   * How is the API different from browsers?
   * 1. You cannot delete cache objects using relative paths.
   * 2. You cannot pass options like `ignoreVary`, `ignoreMethod`, `ignoreSearch`.
   */
  delete(
    request: RequestInfo | URL,
    options?: CacheQueryOptions,
  ): Promise<boolean>;
  /**
   * Return the {@linkcode Request} keys stored in the cache, in insertion
   * order. When a `request` is provided, only the matching keys are returned.
   *
   * How is the API different from browsers?
   * 1. You cannot match cache objects using relative paths.
   * 2. You cannot pass options like `ignoreVary`, `ignoreMethod`, `ignoreSearch`.
   */
  keys(
    request?: RequestInfo | URL,
    options?: CacheQueryOptions,
  ): Promise<ReadonlyArray<Request>>;
}

/** The constructor object for {@linkcode Cache}.
 *
 * `Cache` instances are obtained via {@linkcode CacheStorage.open} rather than
 * constructed directly, so calling the constructor throws.
 *
 * @category Cache */
declare var Cache: {
  readonly prototype: Cache;
  new (): never;
};

/** The constructor object for {@linkcode CacheStorage}.
 *
 * The `CacheStorage` instance is accessed via the global {@linkcode caches}
 * property rather than constructed directly, so calling the constructor throws.
 *
 * @category Cache */
declare var CacheStorage: {
  readonly prototype: CacheStorage;
  new (): never;
};

/** @category Cache */
interface CacheQueryOptions {
  ignoreMethod?: boolean;
  ignoreSearch?: boolean;
  ignoreVary?: boolean;
}

/** @category Cache */
interface MultiCacheQueryOptions extends CacheQueryOptions {
  cacheName?: string;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABILITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */


/// <reference lib="es2015.symbol.wellknown" />
/// <reference lib="es2020.intl" />
/// <reference lib="es2025.intl" />

declare namespace Temporal {
    type CalendarLike = PlainDate | PlainDateTime | PlainMonthDay | PlainYearMonth | ZonedDateTime | string;
    type DurationLike = Duration | DurationLikeObject | string;
    type InstantLike = Instant | ZonedDateTime | string;
    type PlainDateLike = PlainDate | ZonedDateTime | PlainDateTime | DateLikeObject | string;
    type PlainDateTimeLike = PlainDateTime | ZonedDateTime | PlainDate | DateTimeLikeObject | string;
    type PlainMonthDayLike = PlainMonthDay | DateLikeObject | string;
    type PlainTimeLike = PlainTime | PlainDateTime | ZonedDateTime | TimeLikeObject | string;
    type PlainYearMonthLike = PlainYearMonth | YearMonthLikeObject | string;
    type TimeZoneLike = ZonedDateTime | string;
    type ZonedDateTimeLike = ZonedDateTime | ZonedDateTimeLikeObject | string;

    type PartialTemporalLike<T extends object> = {
        [P in Exclude<keyof T, "calendar" | "timeZone">]?: T[P] | undefined;
    };

    interface DateLikeObject {
        year?: number | undefined;
        era?: string | undefined;
        eraYear?: number | undefined;
        month?: number | undefined;
        monthCode?: string | undefined;
        day: number;
        calendar?: string | undefined;
    }

    interface DateTimeLikeObject extends DateLikeObject, TimeLikeObject {}

    interface DurationLikeObject {
        years?: number | undefined;
        months?: number | undefined;
        weeks?: number | undefined;
        days?: number | undefined;
        hours?: number | undefined;
        minutes?: number | undefined;
        seconds?: number | undefined;
        milliseconds?: number | undefined;
        microseconds?: number | undefined;
        nanoseconds?: number | undefined;
    }

    interface TimeLikeObject {
        hour?: number | undefined;
        minute?: number | undefined;
        second?: number | undefined;
        millisecond?: number | undefined;
        microsecond?: number | undefined;
        nanosecond?: number | undefined;
    }

    interface YearMonthLikeObject extends Omit<DateLikeObject, "day"> {}

    interface ZonedDateTimeLikeObject extends DateTimeLikeObject {
        timeZone: TimeZoneLike;
        offset?: string | undefined;
    }

    type DateUnit = "year" | "month" | "week" | "day";
    type TimeUnit = "hour" | "minute" | "second" | "millisecond" | "microsecond" | "nanosecond";
    type PluralizeUnit<T extends DateUnit | TimeUnit> =
        | T
        | {
            year: "years";
            month: "months";
            week: "weeks";
            day: "days";
            hour: "hours";
            minute: "minutes";
            second: "seconds";
            millisecond: "milliseconds";
            microsecond: "microseconds";
            nanosecond: "nanoseconds";
        }[T];

    interface DisambiguationOptions {
        disambiguation?: "compatible" | "earlier" | "later" | "reject" | undefined;
    }

    interface OverflowOptions {
        overflow?: "constrain" | "reject" | undefined;
    }

    interface TransitionOptions {
        direction: "next" | "previous";
    }

    interface RoundingOptions<Units extends DateUnit | TimeUnit> {
        smallestUnit?: PluralizeUnit<Units> | undefined;
        roundingIncrement?: number | undefined;
        roundingMode?: "ceil" | "floor" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined;
    }

    interface RoundingOptionsWithLargestUnit<Units extends DateUnit | TimeUnit> extends RoundingOptions<Units> {
        largestUnit?: "auto" | PluralizeUnit<Units> | undefined;
    }

    interface ToStringRoundingOptions<Units extends DateUnit | TimeUnit> extends Pick<RoundingOptions<Units>, "smallestUnit" | "roundingMode"> {}

    interface ToStringRoundingOptionsWithFractionalSeconds<Units extends DateUnit | TimeUnit> extends ToStringRoundingOptions<Units> {
        fractionalSecondDigits?: "auto" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;
    }

    namespace Now {
        function timeZoneId(): string;
        function instant(): Instant;
        function plainDateTimeISO(timeZone?: TimeZoneLike): PlainDateTime;
        function zonedDateTimeISO(timeZone?: TimeZoneLike): ZonedDateTime;
        function plainDateISO(timeZone?: TimeZoneLike): PlainDate;
        function plainTimeISO(timeZone?: TimeZoneLike): PlainTime;
    }

    interface PlainDateToStringOptions {
        calendarName?: "auto" | "always" | "never" | "critical" | undefined;
    }

    interface PlainDateToZonedDateTimeOptions {
        plainTime?: PlainTimeLike | undefined;
        timeZone: TimeZoneLike;
    }

    interface PlainDate {
        readonly calendarId: string;
        readonly era: string | undefined;
        readonly eraYear: number | undefined;
        readonly year: number;
        readonly month: number;
        readonly monthCode: string;
        readonly day: number;
        readonly dayOfWeek: number;
        readonly dayOfYear: number;
        readonly weekOfYear: number | undefined;
        readonly yearOfWeek: number | undefined;
        readonly daysInWeek: number;
        readonly daysInMonth: number;
        readonly daysInYear: number;
        readonly monthsInYear: number;
        readonly inLeapYear: boolean;
        toPlainYearMonth(): PlainYearMonth;
        toPlainMonthDay(): PlainMonthDay;
        add(duration: DurationLike, options?: OverflowOptions): PlainDate;
        subtract(duration: DurationLike, options?: OverflowOptions): PlainDate;
        with(dateLike: PartialTemporalLike<DateLikeObject>, options?: OverflowOptions): PlainDate;
        withCalendar(calendarLike: CalendarLike): PlainDate;
        until(other: PlainDateLike, options?: RoundingOptionsWithLargestUnit<DateUnit>): Duration;
        since(other: PlainDateLike, options?: RoundingOptionsWithLargestUnit<DateUnit>): Duration;
        equals(other: PlainDateLike): boolean;
        toPlainDateTime(time?: PlainTimeLike): PlainDateTime;
        toZonedDateTime(timeZone: TimeZoneLike): ZonedDateTime;
        toZonedDateTime(item: PlainDateToZonedDateTimeOptions): ZonedDateTime;
        toString(options?: PlainDateToStringOptions): string;
        toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
        toJSON(): string;
        valueOf(): never;
        readonly [Symbol.toStringTag]: "Temporal.PlainDate";
    }

    interface PlainDateConstructor {
        new (isoYear: number, isoMonth: number, isoDay: number, calendar?: string): PlainDate;
        readonly prototype: PlainDate;
        from(item: PlainDateLike, options?: OverflowOptions): PlainDate;
        compare(one: PlainDateLike, two: PlainDateLike): number;
    }
    var PlainDate: PlainDateConstructor;

    interface PlainTimeToStringOptions extends ToStringRoundingOptionsWithFractionalSeconds<Exclude<TimeUnit, "hour">> {}

    interface PlainTime {
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        readonly millisecond: number;
        readonly microsecond: number;
        readonly nanosecond: number;
        add(duration: DurationLike): PlainTime;
        subtract(duration: DurationLike): PlainTime;
        with(timeLike: PartialTemporalLike<TimeLikeObject>, options?: OverflowOptions): PlainTime;
        until(other: PlainTimeLike, options?: RoundingOptionsWithLargestUnit<TimeUnit>): Duration;
        since(other: PlainTimeLike, options?: RoundingOptionsWithLargestUnit<TimeUnit>): Duration;
        equals(other: PlainTimeLike): boolean;
        round(roundTo: PluralizeUnit<TimeUnit>): PlainTime;
        round(roundTo: RoundingOptions<TimeUnit>): PlainTime;
        toString(options?: PlainTimeToStringOptions): string;
        toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
        toJSON(): string;
        valueOf(): never;
        readonly [Symbol.toStringTag]: "Temporal.PlainTime";
    }

    interface PlainTimeConstructor {
        new (hour?: number, minute?: number, second?: number, millisecond?: number, microsecond?: number, nanosecond?: number): PlainTime;
        readonly prototype: PlainTime;
        from(item: PlainTimeLike, options?: OverflowOptions): PlainTime;
        compare(one: PlainTimeLike, two: PlainTimeLike): number;
    }
    var PlainTime: PlainTimeConstructor;

    interface PlainDateTimeToStringOptions extends PlainDateToStringOptions, PlainTimeToStringOptions {}

    interface PlainDateTime {
        readonly calendarId: string;
        readonly era: string | undefined;
        readonly eraYear: number | undefined;
        readonly year: number;
        readonly month: number;
        readonly monthCode: string;
        readonly day: number;
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        readonly millisecond: number;
        readonly microsecond: number;
        readonly nanosecond: number;
        readonly dayOfWeek: number;
        readonly dayOfYear: number;
        readonly weekOfYear: number | undefined;
        readonly yearOfWeek: number | undefined;
        readonly daysInWeek: number;
        readonly daysInMonth: number;
        readonly daysInYear: number;
        readonly monthsInYear: number;
        readonly inLeapYear: boolean;
        with(dateTimeLike: PartialTemporalLike<DateTimeLikeObject>, options?: OverflowOptions): PlainDateTime;
        withPlainTime(plainTime?: PlainTimeLike): PlainDateTime;
        withCalendar(calendar: CalendarLike): PlainDateTime;
        add(duration: DurationLike, options?: OverflowOptions): PlainDateTime;
        subtract(duration: DurationLike, options?: OverflowOptions): PlainDateTime;
        until(other: PlainDateTimeLike, options?: RoundingOptionsWithLargestUnit<DateUnit | TimeUnit>): Duration;
        since(other: PlainDateTimeLike, options?: RoundingOptionsWithLargestUnit<DateUnit | TimeUnit>): Duration;
        round(roundTo: PluralizeUnit<"day" | TimeUnit>): PlainDateTime;
        round(roundTo: RoundingOptions<"day" | TimeUnit>): PlainDateTime;
        equals(other: PlainDateTimeLike): boolean;
        toString(options?: PlainDateTimeToStringOptions): string;
        toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
        toJSON(): string;
        valueOf(): never;
        toZonedDateTime(timeZone: TimeZoneLike, options?: DisambiguationOptions): ZonedDateTime;
        toPlainDate(): PlainDate;
        toPlainTime(): PlainTime;
        readonly [Symbol.toStringTag]: "Temporal.PlainDateTime";
    }

    interface PlainDateTimeConstructor {
        new (isoYear: number, isoMonth: number, isoDay: number, hour?: number, minute?: number, second?: number, millisecond?: number, microsecond?: number, nanosecond?: number, calendar?: string): PlainDateTime;
        readonly prototype: PlainDateTime;
        from(item: PlainDateTimeLike, options?: OverflowOptions): PlainDateTime;
        compare(one: PlainDateTimeLike, two: PlainDateTimeLike): number;
    }
    var PlainDateTime: PlainDateTimeConstructor;

    interface ZonedDateTimeToStringOptions extends PlainDateTimeToStringOptions {
        offset?: "auto" | "never" | undefined;
        timeZoneName?: "auto" | "never" | "critical" | undefined;
    }

    interface ZonedDateTimeFromOptions extends OverflowOptions, DisambiguationOptions {
        offset?: "use" | "ignore" | "prefer" | "reject" | undefined;
    }

    interface ZonedDateTime {
        readonly calendarId: string;
        readonly timeZoneId: string;
        readonly era: string | undefined;
        readonly eraYear: number | undefined;
        readonly year: number;
        readonly month: number;
        readonly monthCode: string;
        readonly day: number;
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        readonly millisecond: number;
        readonly microsecond: number;
        readonly nanosecond: number;
        readonly epochMilliseconds: number;
        readonly epochNanoseconds: bigint;
        readonly dayOfWeek: number;
        readonly dayOfYear: number;
        readonly weekOfYear: number | undefined;
        readonly yearOfWeek: number | undefined;
        readonly hoursInDay: number;
        readonly daysInWeek: number;
        readonly daysInMonth: number;
        readonly daysInYear: number;
        readonly monthsInYear: number;
        readonly inLeapYear: boolean;
        readonly offsetNanoseconds: number;
        readonly offset: string;
        with(zonedDateTimeLike: PartialTemporalLike<ZonedDateTimeLikeObject>, options?: ZonedDateTimeFromOptions): ZonedDateTime;
        withPlainTime(plainTime?: PlainTimeLike): ZonedDateTime;
        withTimeZone(timeZone: TimeZoneLike): ZonedDateTime;
        withCalendar(calendar: CalendarLike): ZonedDateTime;
        add(duration: DurationLike, options?: OverflowOptions): ZonedDateTime;
        subtract(duration: DurationLike, options?: OverflowOptions): ZonedDateTime;
        until(other: ZonedDateTimeLike, options?: RoundingOptionsWithLargestUnit<DateUnit | TimeUnit>): Duration;
        since(other: ZonedDateTimeLike, options?: RoundingOptionsWithLargestUnit<DateUnit | TimeUnit>): Duration;
        round(roundTo: PluralizeUnit<"day" | TimeUnit>): ZonedDateTime;
        round(roundTo: RoundingOptions<"day" | TimeUnit>): ZonedDateTime;
        equals(other: ZonedDateTimeLike): boolean;
        toString(options?: ZonedDateTimeToStringOptions): string;
        toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
        toJSON(): string;
        valueOf(): never;
        startOfDay(): ZonedDateTime;
        getTimeZoneTransition(direction: "next" | "previous"): ZonedDateTime | null;
        getTimeZoneTransition(direction: TransitionOptions): ZonedDateTime | null;
        toInstant(): Instant;
        toPlainDate(): PlainDate;
        toPlainTime(): PlainTime;
        toPlainDateTime(): PlainDateTime;
        readonly [Symbol.toStringTag]: "Temporal.ZonedDateTime";
    }

    interface ZonedDateTimeConstructor {
        new (epochNanoseconds: bigint, timeZone: string, calendar?: string): ZonedDateTime;
        readonly prototype: ZonedDateTime;
        from(item: ZonedDateTimeLike, options?: ZonedDateTimeFromOptions): ZonedDateTime;
        compare(one: ZonedDateTimeLike, two: ZonedDateTimeLike): number;
    }
    var ZonedDateTime: ZonedDateTimeConstructor;

    interface DurationRelativeToOptions {
        relativeTo?: ZonedDateTimeLike | PlainDateLike | undefined;
    }

    interface DurationRoundingOptions extends DurationRelativeToOptions, RoundingOptionsWithLargestUnit<DateUnit | TimeUnit> {}

    interface DurationToStringOptions extends ToStringRoundingOptionsWithFractionalSeconds<Exclude<TimeUnit, "hour" | "minute">> {}

    interface DurationTotalOptions extends DurationRelativeToOptions {
        unit: PluralizeUnit<DateUnit | TimeUnit>;
    }

    interface Duration {
        readonly years: number;
        readonly months: number;
        readonly weeks: number;
        readonly days: number;
        readonly hours: number;
        readonly minutes: number;
        readonly seconds: number;
        readonly milliseconds: number;
        readonly microseconds: number;
        readonly nanoseconds: number;
        readonly sign: number;
        readonly blank: boolean;
        with(durationLike: PartialTemporalLike<DurationLikeObject>): Duration;
        negated(): Duration;
        abs(): Duration;
        add(other: DurationLike): Duration;
        subtract(other: DurationLike): Duration;
        round(roundTo: PluralizeUnit<"day" | TimeUnit>): Duration;
        round(roundTo: DurationRoundingOptions): Duration;
        total(totalOf: PluralizeUnit<"day" | TimeUnit>): number;
        total(totalOf: DurationTotalOptions): number;
        toString(options?: DurationToStringOptions): string;
        toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DurationFormatOptions): string;
        toJSON(): string;
        valueOf(): never;
        readonly [Symbol.toStringTag]: "Temporal.Duration";
    }

    interface DurationConstructor {
        new (years?: number, months?: number, weeks?: number, days?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number, microseconds?: number, nanoseconds?: number): Duration;
        readonly prototype: Duration;
        from(item: DurationLike): Duration;
        compare(one: DurationLike, two: DurationLike, options?: DurationRelativeToOptions): number;
    }
    var Duration: DurationConstructor;

    interface InstantToStringOptions extends PlainTimeToStringOptions {
        timeZone?: TimeZoneLike | undefined;
    }

    interface Instant {
        readonly epochMilliseconds: number;
        readonly epochNanoseconds: bigint;
        add(duration: DurationLike): Instant;
        subtract(duration: DurationLike): Instant;
        until(other: InstantLike, options?: RoundingOptionsWithLargestUnit<TimeUnit>): Duration;
        since(other: InstantLike, options?: RoundingOptionsWithLargestUnit<TimeUnit>): Duration;
        round(roundTo: PluralizeUnit<TimeUnit>): Instant;
        round(roundTo: RoundingOptions<TimeUnit>): Instant;
        equals(other: InstantLike): boolean;
        toString(options?: InstantToStringOptions): string;
        toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
        toJSON(): string;
        valueOf(): never;
        toZonedDateTimeISO(timeZone: TimeZoneLike): ZonedDateTime;
        readonly [Symbol.toStringTag]: "Temporal.Instant";
    }

    interface InstantConstructor {
        new (epochNanoseconds: bigint): Instant;
        readonly prototype: Instant;
        from(item: InstantLike): Instant;
        fromEpochMilliseconds(epochMilliseconds: number): Instant;
        fromEpochNanoseconds(epochNanoseconds: bigint): Instant;
        compare(one: InstantLike, two: InstantLike): number;
    }
    var Instant: InstantConstructor;

    interface PlainYearMonthToPlainDateOptions {
        day: number;
    }

    interface PlainYearMonth {
        readonly calendarId: string;
        readonly era: string | undefined;
        readonly eraYear: number | undefined;
        readonly year: number;
        readonly month: number;
        readonly monthCode: string;
        readonly daysInYear: number;
        readonly daysInMonth: number;
        readonly monthsInYear: number;
        readonly inLeapYear: boolean;
        with(yearMonthLike: PartialTemporalLike<YearMonthLikeObject>, options?: OverflowOptions): PlainYearMonth;
        add(duration: DurationLike, options?: OverflowOptions): PlainYearMonth;
        subtract(duration: DurationLike, options?: OverflowOptions): PlainYearMonth;
        until(other: PlainYearMonthLike, options?: RoundingOptionsWithLargestUnit<"year" | "month">): Duration;
        since(other: PlainYearMonthLike, options?: RoundingOptionsWithLargestUnit<"year" | "month">): Duration;
        equals(other: PlainYearMonthLike): boolean;
        toString(options?: PlainDateToStringOptions): string;
        toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
        toJSON(): string;
        valueOf(): never;
        toPlainDate(item: PlainYearMonthToPlainDateOptions): PlainDate;
        readonly [Symbol.toStringTag]: "Temporal.PlainYearMonth";
    }

    interface PlainYearMonthConstructor {
        new (isoYear: number, isoMonth: number, calendar?: string, referenceISODay?: number): PlainYearMonth;
        readonly prototype: PlainYearMonth;
        from(item: PlainYearMonthLike, options?: OverflowOptions): PlainYearMonth;
        compare(one: PlainYearMonthLike, two: PlainYearMonthLike): number;
    }
    var PlainYearMonth: PlainYearMonthConstructor;

    interface PlainMonthDayToPlainDateOptions {
        era?: string | undefined;
        eraYear?: number | undefined;
        year?: number | undefined;
    }

    interface PlainMonthDay {
        readonly calendarId: string;
        readonly monthCode: string;
        readonly day: number;
        with(monthDayLike: PartialTemporalLike<DateLikeObject>, options?: OverflowOptions): PlainMonthDay;
        equals(other: PlainMonthDayLike): boolean;
        toString(options?: PlainDateToStringOptions): string;
        toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
        toJSON(): string;
        valueOf(): never;
        toPlainDate(item: PlainMonthDayToPlainDateOptions): PlainDate;
        readonly [Symbol.toStringTag]: "Temporal.PlainMonthDay";
    }

    interface PlainMonthDayConstructor {
        new (isoMonth: number, isoDay: number, calendar?: string, referenceISOYear?: number): PlainMonthDay;
        readonly prototype: PlainMonthDay;
        from(item: PlainMonthDayLike, options?: OverflowOptions): PlainMonthDay;
    }
    var PlainMonthDay: PlainMonthDayConstructor;
}

// Copyright 2018-2026 the Deno authors. MIT license.

/// <reference no-default-lib="true" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.shared_globals" />
/// <reference lib="deno.webstorage" />
/// <reference lib="esnext" />
/// <reference lib="deno.cache" />

/**
 * Defines the mapping between event names and their corresponding event types
 * for the `Window` interface in Deno.
 *
 * This interface provides type safety for event handlers by associating event names
 * with their proper event types.
 *
 * @category Platform
 */
interface WindowEventMap {
  "error": ErrorEvent;
  "unhandledrejection": PromiseRejectionEvent;
  "rejectionhandled": PromiseRejectionEvent;
}

/**
 * Represents the global window object in the Deno runtime environment.
 *
 * While Deno doesn't have a browser window, this interface mimics browser window
 * functionality for compatibility with web APIs. It provides access to global
 * properties and methods such as timers, storage, and event handling.
 *
 * @example
 * ```ts
 * // Accessing global objects
 * const localStorage = window.localStorage;
 *
 * // Event handling
 * window.addEventListener("unhandledrejection", (event) => {
 *   console.log("Unhandled promise rejection:", event.reason);d
 * });
 * ```
 *
 * @category Platform
 */
interface Window extends EventTarget {
  readonly window: Window & typeof globalThis;
  readonly self: Window & typeof globalThis;
  onerror: ((this: Window, ev: ErrorEvent) => any) | null;
  onload: ((this: Window, ev: Event) => any) | null;
  onbeforeunload: ((this: Window, ev: Event) => any) | null;
  onunload: ((this: Window, ev: Event) => any) | null;
  onunhandledrejection:
    | ((this: Window, ev: PromiseRejectionEvent) => any)
    | null;
  onrejectionhandled:
    | ((this: Window, ev: PromiseRejectionEvent) => any)
    | null;
  close: () => void;
  readonly closed: boolean;
  alert: (message?: string) => void;
  confirm: (message?: string) => boolean;
  prompt: (message?: string, defaultValue?: string) => string | null;
  Deno: typeof Deno;
  Navigator: typeof Navigator;
  navigator: Navigator;
  Location: typeof Location;
  location: Location;
  localStorage: Storage;
  sessionStorage: Storage;
  caches: CacheStorage;
  name: string;

  addEventListener<K extends keyof WindowEventMap>(
    type: K,
    listener: (
      this: Window,
      ev: WindowEventMap[K],
    ) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof WindowEventMap>(
    type: K,
    listener: (
      this: Window,
      ev: WindowEventMap[K],
    ) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}

/**
 * Constructor for `Window` objects.
 *
 * Note: This constructor cannot be used to create new `Window` instances in Deno.
 * The global `window` object is pre-defined in the runtime environment.
 *
 * @category Platform
 */
declare var Window: {
  readonly prototype: Window;
  new (): never;
};

/**
 * The window variable was removed in Deno 2. This declaration should be
 * removed at some point, but we're leaving it in out of caution.
 * @ignore
 * @category Platform
 */
declare var window: Window & typeof globalThis;

/**
 * Reference to the global object itself.
 * Equivalent to the global `window` object in browser environments.
 *
 * @category Platform
 */
declare var self: Window & typeof globalThis;

/**
 * Indicates whether the current window (context) is closed.
 * In Deno, this property is primarily for API compatibility with browsers.
 *
 * @category Platform
 */
declare var closed: boolean;

/**
 * Exits the current Deno process.
 *
 * This function terminates the process by signaling the runtime to exit.
 * Similar to exit(0) in posix. Its behavior is similar to the `window.close()`
 * method in the browser, but specific to the Deno runtime.
 *
 * Note: Use this function cautiously, as it will stop the execution of the
 * entire Deno program immediately.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/close
 *
 * @example
 * ```ts
 * console.log("About to close the Deno process.");
 * close(); // The process will terminate here.
 * console.log("This will not be logged."); // This line will never execute.
 * ```
 *
 * @category Platform
 */
declare function close(): void;

/**
 * Error event handler for the window.
 * Triggered when an uncaught error occurs in the global scope.
 *
 * @example
 * ```ts
 * onerror = (event) => {
 *   console.log(`Error occurred: ${event.message}`);
 *   return true; // Prevents the default error handling
 * };
 * ```
 *
 * @category Events
 */
declare var onerror: ((this: Window, ev: ErrorEvent) => any) | null;

/**
 * Load event handler for the window.
 * In Deno, this is primarily for API compatibility with browsers.
 *
 * @category Events
 */
declare var onload: ((this: Window, ev: Event) => any) | null;

/**
 * Before unload event handler for the window.
 * In Deno, this is primarily for API compatibility with browsers.
 *
 * @category Events
 */
declare var onbeforeunload: ((this: Window, ev: Event) => any) | null;

/**
 * Unload event handler for the window.
 * In Deno, this is primarily for API compatibility with browsers.
 *
 * @category Events
 */
declare var onunload: ((this: Window, ev: Event) => any) | null;

/**
 * Event handler for unhandled promise rejections.
 * Triggered when a `Promise` is rejected and no rejection handler is attached to it.
 *
 * @example
 * ```ts
 * onunhandledrejection = (event) => {
 *   console.log("Unhandled rejection:", event.reason);
 *   event.preventDefault(); // Prevents the default handling
 * };
 *
 * // This will trigger the event handler
 * Promise.reject(new Error("Example error"));
 * ```
 *
 * @category Events
 */
declare var onunhandledrejection:
  | ((this: Window, ev: PromiseRejectionEvent) => any)
  | null;

/**
 * Deno's `localStorage` API provides a way to store key-value pairs in a
 * web-like environment, similar to the Web Storage API found in browsers.
 * It allows developers to persist data across sessions in a Deno application.
 * This API is particularly useful for applications that require a simple
 * and effective way to store data locally.
 *
 * - Key-Value Storage: Stores data as key-value pairs.
 * - Persistent: Data is retained even after the application is closed.
 * - Synchronous API: Operations are performed synchronously.
 *
 * `localStorage` is similar to {@linkcode sessionStorage}, and shares the same
 * API methods, visible in the {@linkcode Storage} type.
 *
 * When using the `--location` flag, the origin for the location is used to
 * uniquely store the data. That means a location of http://example.com/a.ts
 * and http://example.com/b.ts and http://example.com:80/ would all share the
 * same storage, but https://example.com/ would be different.
 *
 * For more information, see the reference guide for
 * [Web Storage](https://docs.deno.com/runtime/reference/web_platform_apis/#web-storage)
 * and using
 * [the `--location` flag](https://docs.deno.com/runtime/reference/web_platform_apis/#location-flag).
 *
 * @example
 * ```ts
 * // Set a value in localStorage
 * localStorage.setItem("key", "value");
 *
 * // Get a value from localStorage
 * const value = localStorage.getItem("key");
 * console.log(value); // Output: "value"
 *
 * // Remove a value from localStorage
 * localStorage.removeItem("key");
 *
 * // Clear all values from localStorage
 * localStorage.clear();
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 * @category Storage */
declare var localStorage: Storage;

/**
 * Deno's `sessionStorage` API operates similarly to the {@linkcode localStorage} API,
 * but it is intended for storing data temporarily for the duration of a session.
 * Data stored in sessionStorage is cleared when the application session or
 * process ends. This makes it suitable for temporary data that you do not need
 * to persist across user sessions.
 *
 * - Key-Value Storage: Stores data as key-value pairs.
 * - Session-Based: Data is only available for the duration of the page session.
 * - Synchronous API: Operations are performed synchronously.
 *
 * `sessionStorage` is similar to {@linkcode localStorage}, and shares the same API
 * methods, visible in the {@linkcode Storage} type.
 *
 * For more information, see the reference guide for
 * [Web Storage](https://docs.deno.com/runtime/reference/web_platform_apis/#web-storage)
 *
 * @example
 * ```ts
 * // Set a value in sessionStorage
 * sessionStorage.setItem("key", "value");
 *
 * // Get a value from sessionStorage
 * const value = sessionStorage.getItem("key");
 * console.log(value); // Output: "value"
 *
 * // Remove a value from sessionStorage
 * sessionStorage.removeItem("key");
 *
 * // Clear all the values from sessionStorage
 * sessionStorage.clear();
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
 * @category Storage
 */
declare var sessionStorage: Storage;
/** @category Cache */
/**
 * Provides access to the Cache API. Returns a CacheStorage object, which enables storing, retrieving, and managing request/response pairs in a cache.
 *
 * @example
 * ```ts
 * // Open (or create) a cache
 * const cache = await caches.open('v1');
 *
 * // Store a response
 * await cache.put('/api/data', new Response('Hello World'));
 *
 * // Retrieve from cache with fallback
 * const response = await caches.match('/api/data') || await fetch('/api/data');
 *
 * // Delete specific cache
 * await caches.delete('v1');
 *
 * // List all cache names
 * const cacheNames = await caches.keys();
 *
 * // Cache-first strategy
 * async function fetchWithCache(request) {
 *   const cached = await caches.match(request);
 *   if (cached) return cached;
 *
 *   const response = await fetch(request);
 *   const cache = await caches.open('v1');
 *   await cache.put(request, response.clone());
 *   return response;
 * }
 * ```
 *
 * @see  https://developer.mozilla.org/en-US/docs/Web/API/Window/caches
 */
declare var caches: CacheStorage;

/**
 * Provides information about the Deno runtime environment and the system
 * on which it's running. Similar to the browser `Navigator` object but
 * adapted for the Deno context.
 *
 * @example
 * ```ts
 * // Check available CPU cores
 * console.log(`Available CPU cores: ${navigator.hardwareConcurrency}`);
 *
 * // Check user agent
 * console.log(`User agent: ${navigator.userAgent}`);
 *
 * // Check language settings
 * console.log(`Language: ${navigator.language}`);
 * ```
 *
 * @category Platform
 */
interface Navigator {
  readonly gpu: GPU;
  readonly hardwareConcurrency: number;
  readonly userAgent: string;
  readonly language: string;
  readonly languages: string[];
  readonly platform: string;
  readonly userAgentData: NavigatorUAData;
}

/**
 * Constructor for `Navigator` objects.
 *
 * Note: This constructor cannot be used to create new `Navigator` instances in Deno.
 * The global `navigator` object is pre-defined in the runtime environment.
 *
 * @category Platform
 */
declare var Navigator: {
  readonly prototype: Navigator;
  new (): never;
};

/**
 * Provides access to the Deno runtime's `Navigator` interface, which contains
 * information about the environment in which the script is running.
 *
 * @example
 * ```ts
 * // Log information about the runtime environment
 * console.log(`Hardware concurrency: ${navigator.hardwareConcurrency}`);
 * console.log(`User agent: ${navigator.userAgent}`);
 * ```
 *
 * @category Platform
 */
declare var navigator: Navigator;

/**
 * Shows the given message and waits for the enter key pressed.
 *
 * If the stdin is not interactive, it does nothing.
 *
 * @example
 * ```ts
 * // Displays the message "Acknowledge me! [Enter]" and waits for the enter key to be pressed before continuing.
 * alert("Acknowledge me!");
 * ```
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/alert
 * @category Platform
 *
 * @param message
 */
declare function alert(message?: string): void;

/**
 * Shows the given message and waits for the answer. Returns the user's answer as boolean.
 *
 * Only `y` and `Y` are considered as true.
 *
 * If the stdin is not interactive, it returns false.
 *
 * @example
 * ```ts
 * const shouldProceed = confirm("Do you want to proceed?");
 *
 * // If the user presses 'y' or 'Y', the result will be true
 * // If the user presses 'n' or 'N', the result will be false
 * console.log("Should proceed?", shouldProceed);
 * ```
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
 * @category Platform
 *
 * @param message
 */
declare function confirm(message?: string): boolean;

/**
 * Shows the given message and waits for the user's input. Returns the user's input as string.
 *
 * If the default value is given and the user inputs the empty string, then it returns the given
 * default value.
 *
 * If the default value is not given and the user inputs the empty string, it returns the empty
 * string.
 *
 * If the stdin is not interactive, it returns null.
 *
 * @example
 * ```ts
 * const pet = prompt("Cats or dogs?", "It's fine to love both!");
 *
 * // Displays the user's input or the default value of "It's fine to love both!"
 * console.log("Best pet:", pet);
 * ```
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt
 *
 * @category Platform
 *
 * @param message
 * @param defaultValue
 */
declare function prompt(message?: string, defaultValue?: string): string | null;

/** Registers an event listener in the global scope, which will be called
 * synchronously whenever the event `type` is dispatched.
 *
 * ```ts
 * addEventListener('unload', () => { console.log('All finished!'); });
 * ...
 * dispatchEvent(new Event('unload'));
 * ```
 *
 * @category Events
 */
declare function addEventListener<
  K extends keyof WindowEventMap,
>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
): void;
/** Registers an event listener for an arbitrary event `type` on the global
 * scope.
 *
 * @category Events
 */
declare function addEventListener(
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
): void;

/** Remove a previously registered event listener from the global scope
 *
 * ```ts
 * const listener = () => { console.log('hello'); };
 * addEventListener('load', listener);
 * removeEventListener('load', listener);
 * ```
 *
 * @category Events
 */
declare function removeEventListener<
  K extends keyof WindowEventMap,
>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | EventListenerOptions,
): void;
/** Removes a previously registered event listener for an arbitrary event
 * `type` from the global scope.
 *
 * @category Events
 */
declare function removeEventListener(
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOptions,
): void;

// TODO(nayeemrmn): Move this to `extensions/web` where its implementation is.
// The types there must first be split into window, worker and global types.
/** The location (URL) of the object it is linked to. Changes done on it are
 * reflected on the object it relates to. Accessible via
 * `globalThis.location`.
 *
 * @category Platform
 */
interface Location {
  /** Returns a DOMStringList object listing the origins of the ancestor
   * browsing contexts, from the parent browsing context to the top-level
   * browsing context.
   *
   * Always empty in Deno. */
  readonly ancestorOrigins: DOMStringList;
  /** Returns the Location object's URL's fragment (includes leading "#" if
   * non-empty).
   *
   * Cannot be set in Deno. */
  hash: string;
  /** Returns the Location object's URL's host and port (if different from the
   * default port for the scheme).
   *
   * Cannot be set in Deno. */
  host: string;
  /** Returns the Location object's URL's host.
   *
   * Cannot be set in Deno. */
  hostname: string;
  /** Returns the Location object's URL.
   *
   * Cannot be set in Deno. */
  href: string;
  toString(): string;
  /** Returns the Location object's URL's origin. */
  readonly origin: string;
  /** Returns the Location object's URL's path.
   *
   * Cannot be set in Deno. */
  pathname: string;
  /** Returns the Location object's URL's port.
   *
   * Cannot be set in Deno. */
  port: string;
  /** Returns the Location object's URL's scheme.
   *
   * Cannot be set in Deno. */
  protocol: string;
  /** Returns the Location object's URL's query (includes leading "?" if
   * non-empty).
   *
   * Cannot be set in Deno. */
  search: string;
  /** Navigates to the given URL.
   *
   * Cannot be set in Deno. */
  assign(url: string): void;
  /** Reloads the current page.
   *
   * Disabled in Deno. */
  reload(): void;
  /** @deprecated */
  reload(forcedReload: boolean): void;
  /** Removes the current page from the session history and navigates to the
   * given URL.
   *
   * Disabled in Deno. */
  replace(url: string): void;
}

// TODO(nayeemrmn): Move this to `extensions/web` where its implementation is.
// The types there must first be split into window, worker and global types.
/** The location (URL) of the object it is linked to. Changes done on it are
 * reflected on the object it relates to. Accessible via
 * `globalThis.location`.
 *
 * @category Platform
 */
declare var Location: {
  readonly prototype: Location;
  new (): never;
};

// TODO(nayeemrmn): Move this to `extensions/web` where its implementation is.
// The types there must first be split into window, worker and global types.
/** The {@linkcode Location} object describing the absolute URL of the main
 * module, available when the program is started with the `--location` flag.
 * Accessing it without `--location` throws.
 *
 * @category Platform */
declare var location: Location;

/** Gets or sets the name of the global scope's browsing context.
 *
 * Provided for web compatibility; Deno has no browsing context, so this is an
 * empty string by default.
 *
 * @category Platform */
declare var name: string;

// Copyright 2018-2026 the Deno authors. MIT license.

/// <reference no-default-lib="true" />
/// <reference lib="deno.ns" />
/// <reference lib="esnext" />
/// <reference lib="es2022.intl" />

/** 
 *
 * @category Workers
 * @experimental
 */
interface WorkerOptions {
  /** 
       *
       * Configure permissions options to change the level of access the worker will
       * have. By default it will inherit permissions. Note that the permissions
       * of a worker can't be extended beyond its parent's permissions reach.
       *
       * - `"inherit"` will use the default behavior and take the permissions of the
       *   thread the worker is created in
       * - `"none"` will have no permissions
       * - A list of routes can be provided that are relative to the file the worker
       *   is created in to limit the access of the worker (read/write permissions
       *   only)
       *
       * Example:
       *
       * ```ts
       * // mod.ts
       * const worker = new Worker(
       *   new URL("deno_worker.ts", import.meta.url).href, {
       *     type: "module",
       *     deno: {
       *       permissions: {
       *         read: true,
       *       },
       *     },
       *   }
       * );
       * ```
       */
  deno?: {
    /** Set to `"none"` to disable all the permissions in the worker. */
    permissions?: Deno.PermissionOptions;
  };
}

/** 
 *
 * @category WebSockets
 * @experimental
 */
interface WebSocketStreamOptions {
  protocols?: string[];
  signal?: AbortSignal;
  headers?: HeadersInit;
}

/** 
 *
 * @category WebSockets
 * @experimental
 */
interface WebSocketConnection {
  readable: ReadableStream<string | Uint8Array<ArrayBuffer>>;
  writable: WritableStream<string | Uint8Array<ArrayBufferLike>>;
  extensions: string;
  protocol: string;
}

/** 
 *
 * @category WebSockets
 * @experimental
 */
interface WebSocketCloseInfo {
  code?: number;
  reason?: string;
}

/** 
 *
 * @tags allow-net
 * @category WebSockets
 * @experimental
 */
interface WebSocketStream {
  url: string;
  opened: Promise<WebSocketConnection>;
  closed: Promise<WebSocketCloseInfo>;
  close(closeInfo?: WebSocketCloseInfo): void;
}

/** 
 *
 * @tags allow-net
 * @category WebSockets
 * @experimental
 */
declare var WebSocketStream: {
  readonly prototype: WebSocketStream;
  new (url: string, options?: WebSocketStreamOptions): WebSocketStream;
};

/** 
 *
 * @tags allow-net
 * @category WebSockets
 * @experimental
 */
interface WebSocketError extends DOMException {
  readonly closeCode: number;
  readonly reason: string;
}

/** 
 *
 * @tags allow-net
 * @category WebSockets
 * @experimental
 */
declare var WebSocketError: {
  readonly prototype: WebSocketError;
  new (message?: string, init?: WebSocketCloseInfo): WebSocketError;
};

/**
 * @category Intl
 * @experimental
 */
declare namespace Intl {
  /**
   * Types that can be formatted using Intl.DateTimeFormat methods.
   *
   * This type defines what values can be passed to Intl.DateTimeFormat methods
   * for internationalized date and time formatting. It includes standard Date objects
   * and Temporal API date/time types.
   *
   * @example
   * ```ts
   * // Using with Date object
   * const date = new Date();
   * const formatter = new Intl.DateTimeFormat('en-US');
   * console.log(formatter.format(date));
   *
   * // Using with Temporal types (when available)
   * const instant = Temporal.Now.instant();
   * console.log(formatter.format(instant));
   * ```
   *
   * @category Intl
   * @experimental
   */
  export type Formattable =
    | Date
    | Temporal.Instant
    | Temporal.ZonedDateTime
    | Temporal.PlainDate
    | Temporal.PlainTime
    | Temporal.PlainDateTime
    | Temporal.PlainYearMonth
    | Temporal.PlainMonthDay;

  /**
   * Represents a part of a formatted date range produced by Intl.DateTimeFormat.formatRange().
   *
   * Each part has a type and value that describes its role within the formatted string.
   * The source property indicates whether the part comes from the start date, end date, or
   * is shared between them.
   *
   * @example
   * ```ts
   * const dtf = new Intl.DateTimeFormat('en', {
   *   dateStyle: 'long',
   *   timeStyle: 'short'
   * });
   * const parts = dtf.formatRangeToParts(
   *   new Date(2023, 0, 1, 12, 0),
   *   new Date(2023, 0, 3, 15, 30)
   * );
   * console.log(parts);
   * // Parts might include elements like:
   * // { type: 'month', value: 'January', source: 'startRange' }
   * // { type: 'day', value: '1', source: 'startRange' }
   * // { type: 'literal', value: ' - ', source: 'shared' }
   * // { type: 'day', value: '3', source: 'endRange' }
   * // ...
   * ```
   *
   * @category Intl
   * @experimental
   */
  export interface DateTimeFormatRangePart {
    /**
     * The type of date or time component this part represents.
     * Possible values: 'day', 'dayPeriod', 'era', 'fractionalSecond', 'hour',
     * 'literal', 'minute', 'month', 'relatedYear', 'second', 'timeZoneName',
     * 'weekday', 'year', etc.
     */
    type: string;

    /** The string value of this part. */
    value: string;

    /**
     * Indicates which date in the range this part comes from.
     * - 'startRange': The part is from the start date
     * - 'endRange': The part is from the end date
     * - 'shared': The part is shared between both dates (like separators)
     */
    source: "shared" | "startRange" | "endRange";
  }

  /**
   * @category Intl
   * @experimental
   */
  export interface DateTimeFormat {
    /**
     * Format a date into a string according to the locale and formatting
     * options of this `Intl.DateTimeFormat` object.
     *
     * @example
     * ```ts
     * const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' });
     * const date = new Date(2023, 0, 1);
     * console.log(formatter.format(date)); // Output: "Sunday, January 1, 2023"
     * ```
     */
    format(date?: Formattable | number): string;

    /**
     * Allow locale-aware formatting of strings produced by
     * `Intl.DateTimeFormat` formatters.
     *
     * @example
     * ```ts
     * const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' });
     * const date = new Date(2023, 0, 1);
     * console.log(formatter.format(date)); // Output: "Sunday, January 1, 2023"
     * ```
     */
    formatToParts(
      date?: Formattable | number,
    ): globalThis.Intl.DateTimeFormatPart[];

    /**
     * Format a date range in the most concise way based on the locale and
     * options provided when instantiating this `Intl.DateTimeFormat` object.
     *
     * @param startDate The start date of the range to format.
     * @param endDate The start date of the range to format. Must be the same
     * type as `startRange`.
     *
     * @example
     * ```ts
     * const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' });
     * const startDate = new Date(2023, 0, 1);
     * const endDate = new Date(2023, 0, 5);
     * console.log(formatter.formatRange(startDate, endDate));
     * // Output: "January 1 – 5, 2023"
     * ```
     */
    formatRange<T extends Formattable>(startDate: T, endDate: T): string;
    formatRange(startDate: Date | number, endDate: Date | number): string;

    /**
     * Allow locale-aware formatting of tokens representing each part of the
     * formatted date range produced by `Intl.DateTimeFormat` formatters.
     *
     * @param startDate The start date of the range to format.
     * @param endDate The start date of the range to format. Must be the same
     * type as `startRange`.
     *
     * @example
     * ```ts
     * const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' });
     * const startDate = new Date(2023, 0, 1);
     * const endDate = new Date(2023, 0, 5);
     * const parts = formatter.formatRangeToParts(startDate, endDate);
     * console.log(parts);
     * // Output might include:
     * // [
     * //   { type: 'month', value: 'January', source: 'startRange' },
     * //   { type: 'literal', value: ' ', source: 'shared' },
     * //   { type: 'day', value: '1', source: 'startRange' },
     * //   { type: 'literal', value: ' – ', source: 'shared' },
     * //   { type: 'day', value: '5', source: 'endRange' },
     * //   { type: 'literal', value: ', ', source: 'shared' },
     * //   { type: 'year', value: '2023', source: 'shared' }
     * // ]
     * ```
     */
    formatRangeToParts<T extends Formattable>(
      startDate: T,
      endDate: T,
    ): DateTimeFormatRangePart[];
    formatRangeToParts(
      startDate: Date | number,
      endDate: Date | number,
    ): DateTimeFormatRangePart[];
  }

  /**
   * @category Intl
   * @experimental
   */
  export interface DateTimeFormatOptions {
    // TODO: remove the props below after TS lib declarations are updated
    dayPeriod?: "narrow" | "short" | "long";
    dateStyle?: "full" | "long" | "medium" | "short";
    timeStyle?: "full" | "long" | "medium" | "short";
  }
}

/**
 * @category Platform
 * @experimental
 */
interface RegExpConstructor {
  /**
   * Returns a new string in which characters that are potentially special in a
   * regular expression pattern are replaced with escape sequences.
   * @param string The string to escape.
   *
   * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/escape)
   */
  escape(string: string): string;
}

/**
 * @category Platform
 * @experimental
 */
interface Uint8Array {
  /**
   * Converts this `Uint8Array` object to a base64 string.
   *
   * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/toBase64)
   */
  toBase64(options?: {
    alphabet?: "base64" | "base64url";
    omitPadding?: boolean;
  }): string;
  /**
   * Populates this `Uint8Array` object with data from a base64 string.
   *
   * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/setFromBase64)
   */
  setFromBase64(string: string, options?: {
    alphabet?: "base64" | "base64url";
    lastChunkHandling?: "loose" | "strict" | "stop-before-partial";
  }): { read: number; written: number };
  /**
   * Converts this `Uint8Array` object to a hex string.
   *
   * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/toHex)
   */
  toHex(): string;
  /**
   * Populates this `Uint8Array` object with data from a hex string.
   *
   * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/setFromHex)
   */
  setFromHex(string: string): { read: number; written: number };
}

/**
 * @category Platform
 * @experimental
 */
interface Uint8ArrayConstructor {
  /**
   * Creates a new `Uint8Array` object from a base64 string.
   *
   * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/fromBase64)
   */
  fromBase64(string: string, options?: {
    alphabet?: "base64" | "base64url";
    lastChunkHandling?: "loose" | "strict" | "stop-before-partial";
  }): Uint8Array<ArrayBuffer>;
  /**
   * Creates a new `Uint8Array` object from a hex string.
   *
   * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/fromHex)
   */
  fromHex(string: string): Uint8Array<ArrayBuffer>;
}

/** 
 *
 * A single CSS rule of a {@linkcode CSSStyleSheet}, as returned from its
 * `cssRules` property. Available only when the `--unstable-raw-imports` flag
 * is enabled.
 *
 * Note: `cssText` is the verbatim text of one top-level rule of the style
 * sheet; Deno does not implement a full CSS object model.
 *
 * @category Platform
 * @experimental
 */
interface CSSRule {
  readonly cssText: string;
}

/** 
 *
 * @category Platform
 * @experimental
 */
declare var CSSRule: {
  readonly prototype: CSSRule;
  new (): never;
};

/** 
 *
 * A style sheet backing a CSS module script. This is what a
 * `import sheet from "./styles.css" with { type: "css" }` import evaluates
 * to. Available only when the `--unstable-raw-imports` flag is enabled.
 *
 * Deno has no DOM, so a sheet can't be adopted anywhere; the implementation
 * is backed by the raw CSS text.
 *
 * Note: `cssRules` returns a frozen array of {@linkcode CSSRule} instead of a
 * live `CSSRuleList`.
 *
 * @category Platform
 * @experimental
 */
interface CSSStyleSheet {
  readonly cssRules: readonly CSSRule[];
  replace(text: string): Promise<CSSStyleSheet>;
  replaceSync(text: string): void;
}

/** 
 *
 * @category Platform
 * @experimental
 */
declare var CSSStyleSheet: {
  readonly prototype: CSSStyleSheet;
  new (): CSSStyleSheet;
};
