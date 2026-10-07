import {
    FinishedOptions as _FinishedOptions,
    PipelineDestination,
    PipelineOptions,
    PipelinePromise,
    PipelineSource,
    PipelineTransform,
} from "./node__stream.d.ts";
export interface FinishedOptions extends _FinishedOptions {
    /**
     * If true, removes the listeners registered by this function before the promise is fulfilled.
     * @default false
     */
    cleanup?: boolean | undefined;
}
export function finished(
    stream: ReadableStream | WritableStream | ReadWriteStream,
    options?: FinishedOptions,
): Promise<void>;
export function pipeline<A extends PipelineSource<any>, B extends PipelineDestination<A, any>>(
    source: A,
    destination: B,
    options?: PipelineOptions,
): PipelinePromise<B>;
export function pipeline<
    A extends PipelineSource<any>,
    T1 extends PipelineTransform<A, any>,
    B extends PipelineDestination<T1, any>,
>(
    source: A,
    transform1: T1,
    destination: B,
    options?: PipelineOptions,
): PipelinePromise<B>;
export function pipeline<
    A extends PipelineSource<any>,
    T1 extends PipelineTransform<A, any>,
    T2 extends PipelineTransform<T1, any>,
    B extends PipelineDestination<T2, any>,
>(
    source: A,
    transform1: T1,
    transform2: T2,
    destination: B,
    options?: PipelineOptions,
): PipelinePromise<B>;
export function pipeline<
    A extends PipelineSource<any>,
    T1 extends PipelineTransform<A, any>,
    T2 extends PipelineTransform<T1, any>,
    T3 extends PipelineTransform<T2, any>,
    B extends PipelineDestination<T3, any>,
>(
    source: A,
    transform1: T1,
    transform2: T2,
    transform3: T3,
    destination: B,
    options?: PipelineOptions,
): PipelinePromise<B>;
export function pipeline<
    A extends PipelineSource<any>,
    T1 extends PipelineTransform<A, any>,
    T2 extends PipelineTransform<T1, any>,
    T3 extends PipelineTransform<T2, any>,
    T4 extends PipelineTransform<T3, any>,
    B extends PipelineDestination<T4, any>,
>(
    source: A,
    transform1: T1,
    transform2: T2,
    transform3: T3,
    transform4: T4,
    destination: B,
    options?: PipelineOptions,
): PipelinePromise<B>;
export function pipeline(
    streams: ReadonlyArray<ReadableStream | WritableStream | ReadWriteStream>,
    options?: PipelineOptions,
): Promise<void>;
export function pipeline(
    stream1: ReadableStream,
    stream2: ReadWriteStream | WritableStream,
    ...streams: Array<ReadWriteStream | WritableStream | PipelineOptions>
): Promise<void>;