/**
 * The `node:test/reporters` module exposes the builtin-reporters for `node:test`.
 * To access it:
 *
 * ```js
 * import test from 'node:test/reporters';
 * ```
 *
 * This module is only available under the `node:` scheme. The following will not
 * work:
 *
 * ```js
 * import test from 'node:test/reporters';
 * ```
 * @since v19.9.0
 * @see [source](https://github.com/nodejs/node/blob/v22.x/lib/test/reporters.js)
 * @module
 */

import { Transform, TransformOptions } from "./node__stream.d.ts";

export type TestEvent =
    | { type: "test:coverage"; data: TestCoverage }
    | { type: "test:complete"; data: TestComplete }
    | { type: "test:dequeue"; data: TestDequeue }
    | { type: "test:diagnostic"; data: DiagnosticData }
    | { type: "test:enqueue"; data: TestEnqueue }
    | { type: "test:fail"; data: TestFail }
    | { type: "test:pass"; data: TestPass }
    | { type: "test:plan"; data: TestPlan }
    | { type: "test:start"; data: TestStart }
    | { type: "test:stderr"; data: TestStderr }
    | { type: "test:stdout"; data: TestStdout }
    | { type: "test:summary"; data: TestSummary }
    | { type: "test:watch:drained"; data: undefined };
export type TestEventGenerator = AsyncGenerator<TestEvent, void>;

export interface ReporterConstructorWrapper<T extends new(...args: any[]) => Transform> {
    new(...args: ConstructorParameters<T>): InstanceType<T>;
    (...args: ConstructorParameters<T>): InstanceType<T>;
}

/**
 * The `dot` reporter outputs the test results in a compact format,
 * where each passing test is represented by a `.`,
 * and each failing test is represented by a `X`.
 * @since v20.0.0
 */
export function dot(source: TestEventGenerator): AsyncGenerator<"\n" | "." | "X", void>;
/**
 * The `tap` reporter outputs the test results in the [TAP](https://testanything.org/) format.
 * @since v20.0.0
 */
export function tap(source: TestEventGenerator): AsyncGenerator<string, void>;
export class SpecReporter extends Transform {
    constructor();
}
/**
 * The `spec` reporter outputs the test results in a human-readable format.
 * @since v20.0.0
 */
export const spec: ReporterConstructorWrapper<typeof SpecReporter>;
/**
 * The `junit` reporter outputs test results in a jUnit XML format.
 * @since v21.0.0
 */
export function junit(source: TestEventGenerator): AsyncGenerator<string, void>;
export class LcovReporter extends Transform {
    constructor(opts?: Omit<TransformOptions, "writableObjectMode">);
}
/**
 * The `lcov` reporter outputs test coverage when used with the
 * [`--experimental-test-coverage`](https://nodejs.org/docs/latest-v22.x/api/cli.html#--experimental-test-coverage) flag.
 * @since v22.0.0
 */
// TODO: change the export to a wrapper function once node@0db38f0 is merged (breaking change)
// const lcov: ReporterConstructorWrapper<typeof LcovReporter>;
export const lcov: LcovReporter;

export { dot, junit, lcov, spec, tap, TestEvent };