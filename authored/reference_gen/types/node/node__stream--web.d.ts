// stub module, pending copy&paste from .d.ts or manual impl
// copy from lib.dom.d.ts
export interface ReadableWritablePair<R = any, W = any> {
    readable: ReadableStream<R>;
    /**
     * Provides a convenient, chainable way of piping this readable stream
     * through a transform stream (or any other { writable, readable }
     * pair). It simply pipes the stream into the writable side of the
     * supplied pair, and returns the readable side for further use.
     *
     * Piping a stream will lock it for the duration of the pipe, preventing
     * any other consumer from acquiring a reader.
     */
    writable: WritableStream<W>;
}
export interface StreamPipeOptions {
    preventAbort?: boolean;
    preventCancel?: boolean;
    /**
     * Pipes this readable stream to a given writable stream destination.
     * The way in which the piping process behaves under various error
     * conditions can be customized with a number of passed options. It
     * returns a promise that fulfills when the piping process completes
     * successfully, or rejects if any errors were encountered.
     *
     * Piping a stream will lock it for the duration of the pipe, preventing
     * any other consumer from acquiring a reader.
     *
     * Errors and closures of the source and destination streams propagate
     * as follows:
     *
     * An error in this source readable stream will abort destination,
     * unless preventAbort is truthy. The returned promise will be rejected
     * with the source's error, or with any error that occurs during
     * aborting the destination.
     *
     * An error in destination will cancel this source readable stream,
     * unless preventCancel is truthy. The returned promise will be rejected
     * with the destination's error, or with any error that occurs during
     * canceling the source.
     *
     * When this source readable stream closes, destination will be closed,
     * unless preventClose is truthy. The returned promise will be fulfilled
     * once this process completes, unless an error is encountered while
     * closing the destination, in which case it will be rejected with that
     * error.
     *
     * If destination starts out closed or closing, this source readable
     * stream will be canceled, unless preventCancel is true. The returned
     * promise will be rejected with an error indicating piping to a closed
     * stream failed, or with any error that occurs during canceling the
     * source.
     *
     * The signal option can be set to an AbortSignal to allow aborting an
     * ongoing pipe operation via the corresponding AbortController. In this
     * case, this source readable stream will be canceled, and destination
     * aborted, unless the respective options preventCancel or preventAbort
     * are set.
     */
    preventClose?: boolean;
    signal?: AbortSignal;
}
export interface ReadableStreamGenericReader {
    readonly closed: Promise<undefined>;
    cancel(reason?: any): Promise<void>;
}
export type ReadableStreamController<T> = ReadableStreamDefaultController<T>;
export interface ReadableStreamReadValueResult<T> {
    done: false;
    value: T;
}
export interface ReadableStreamReadDoneResult<T> {
    done: true;
    value?: T;
}
export type ReadableStreamReadResult<T> = ReadableStreamReadValueResult<T> | ReadableStreamReadDoneResult<T>;
export interface ReadableByteStreamControllerCallback {
    (controller: ReadableByteStreamController): void | PromiseLike<void>;
}
export interface UnderlyingSinkAbortCallback {
    (reason?: any): void | PromiseLike<void>;
}
export interface UnderlyingSinkCloseCallback {
    (): void | PromiseLike<void>;
}
export interface UnderlyingSinkStartCallback {
    (controller: WritableStreamDefaultController): any;
}
export interface UnderlyingSinkWriteCallback<W> {
    (chunk: W, controller: WritableStreamDefaultController): void | PromiseLike<void>;
}
export interface UnderlyingSourceCancelCallback {
    (reason?: any): void | PromiseLike<void>;
}
export interface UnderlyingSourcePullCallback<R> {
    (controller: ReadableStreamController<R>): void | PromiseLike<void>;
}
export interface UnderlyingSourceStartCallback<R> {
    (controller: ReadableStreamController<R>): any;
}
export interface TransformerFlushCallback<O> {
    (controller: TransformStreamDefaultController<O>): void | PromiseLike<void>;
}
export interface TransformerStartCallback<O> {
    (controller: TransformStreamDefaultController<O>): any;
}
export interface TransformerTransformCallback<I, O> {
    (chunk: I, controller: TransformStreamDefaultController<O>): void | PromiseLike<void>;
}
export interface UnderlyingByteSource {
    autoAllocateChunkSize?: number;
    cancel?: ReadableStreamErrorCallback;
    pull?: ReadableByteStreamControllerCallback;
    start?: ReadableByteStreamControllerCallback;
    type: "bytes";
}
export interface UnderlyingSource<R = any> {
    cancel?: UnderlyingSourceCancelCallback;
    pull?: UnderlyingSourcePullCallback<R>;
    start?: UnderlyingSourceStartCallback<R>;
    type?: undefined;
}
export interface UnderlyingSink<W = any> {
    abort?: UnderlyingSinkAbortCallback;
    close?: UnderlyingSinkCloseCallback;
    start?: UnderlyingSinkStartCallback;
    type?: undefined;
    write?: UnderlyingSinkWriteCallback<W>;
}
export interface ReadableStreamErrorCallback {
    (reason: any): void | PromiseLike<void>;
}
export interface ReadableStreamAsyncIterator<T> extends NodeJS.AsyncIterator<T, BuiltinIteratorReturn, unknown> {
    [Symbol.asyncIterator](): ReadableStreamAsyncIterator<T>;
}
/** This Streams API interface represents a readable stream of byte data. */
export interface ReadableStream<R = any> {
    readonly locked: boolean;
    cancel(reason?: any): Promise<void>;
    getReader(options: { mode: "byob" }): ReadableStreamBYOBReader;
    getReader(): ReadableStreamDefaultReader<R>;
    getReader(options?: ReadableStreamGetReaderOptions): ReadableStreamReader<R>;
    pipeThrough<T>(transform: ReadableWritablePair<T, R>, options?: StreamPipeOptions): ReadableStream<T>;
    pipeTo(destination: WritableStream<R>, options?: StreamPipeOptions): Promise<void>;
    tee(): [ReadableStream<R>, ReadableStream<R>];
    values(options?: { preventCancel?: boolean }): ReadableStreamAsyncIterator<R>;
    [Symbol.asyncIterator](): ReadableStreamAsyncIterator<R>;
}
export const ReadableStream: {
    prototype: ReadableStream;
    from<T>(iterable: Iterable<T> | AsyncIterable<T>): ReadableStream<T>;
    new(underlyingSource: UnderlyingByteSource, strategy?: QueuingStrategy<Uint8Array>): ReadableStream<Uint8Array>;
    new<R = any>(underlyingSource?: UnderlyingSource<R>, strategy?: QueuingStrategy<R>): ReadableStream<R>;
};
export type ReadableStreamReaderMode = "byob";
export interface ReadableStreamGetReaderOptions {
    /**
     * Creates a ReadableStreamBYOBReader and locks the stream to the new reader.
     *
     * This call behaves the same way as the no-argument variant, except that it only works on readable byte streams, i.e. streams which were constructed specifically with the ability to handle "bring your own buffer" reading. The returned BYOB reader provides the ability to directly read individual chunks from the stream via its read() method, into developer-supplied buffers, allowing more precise control over allocation.
     */
    mode?: ReadableStreamReaderMode;
}
export type ReadableStreamReader<T> = ReadableStreamDefaultReader<T> | ReadableStreamBYOBReader;
export interface ReadableStreamDefaultReader<R = any> extends ReadableStreamGenericReader {
    read(): Promise<ReadableStreamReadResult<R>>;
    releaseLock(): void;
}
/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader) */
export interface ReadableStreamBYOBReader extends ReadableStreamGenericReader {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader/read) */
    read<T extends ArrayBufferView>(
        view: T,
        options?: {
            min?: number;
        },
    ): Promise<ReadableStreamReadResult<T>>;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader/releaseLock) */
    releaseLock(): void;
}
export const ReadableStreamDefaultReader: {
    prototype: ReadableStreamDefaultReader;
    new<R = any>(stream: ReadableStream<R>): ReadableStreamDefaultReader<R>;
};
export const ReadableStreamBYOBReader: {
    prototype: ReadableStreamBYOBReader;
    new(stream: ReadableStream): ReadableStreamBYOBReader;
};
/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest) */
export interface ReadableStreamBYOBRequest {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest/view) */
    readonly view: ArrayBufferView | null;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest/respond) */
    respond(bytesWritten: number): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest/respondWithNewView) */
    respondWithNewView(view: ArrayBufferView): void;
}
export const ReadableStreamBYOBRequest: {
    prototype: ReadableStreamBYOBRequest;
    new(): ReadableStreamBYOBRequest;
};
export interface ReadableByteStreamController {
    readonly byobRequest: undefined;
    readonly desiredSize: number | null;
    close(): void;
    enqueue(chunk: ArrayBufferView): void;
    error(error?: any): void;
}
export const ReadableByteStreamController: {
    prototype: ReadableByteStreamController;
    new(): ReadableByteStreamController;
};
export interface ReadableStreamDefaultController<R = any> {
    readonly desiredSize: number | null;
    close(): void;
    enqueue(chunk?: R): void;
    error(e?: any): void;
}
export const ReadableStreamDefaultController: {
    prototype: ReadableStreamDefaultController;
    new(): ReadableStreamDefaultController;
};
export interface Transformer<I = any, O = any> {
    flush?: TransformerFlushCallback<O>;
    readableType?: undefined;
    start?: TransformerStartCallback<O>;
    transform?: TransformerTransformCallback<I, O>;
    writableType?: undefined;
}
export interface TransformStream<I = any, O = any> {
    readonly readable: ReadableStream<O>;
    readonly writable: WritableStream<I>;
}
export const TransformStream: {
    prototype: TransformStream;
    new<I = any, O = any>(
        transformer?: Transformer<I, O>,
        writableStrategy?: QueuingStrategy<I>,
        readableStrategy?: QueuingStrategy<O>,
    ): TransformStream<I, O>;
};
export interface TransformStreamDefaultController<O = any> {
    readonly desiredSize: number | null;
    enqueue(chunk?: O): void;
    error(reason?: any): void;
    terminate(): void;
}
export const TransformStreamDefaultController: {
    prototype: TransformStreamDefaultController;
    new(): TransformStreamDefaultController;
};
/**
 * This Streams API interface provides a standard abstraction for writing
 * streaming data to a destination, known as a sink. This object comes with
 * built-in back pressure and queuing.
 */
export interface WritableStream<W = any> {
    readonly locked: boolean;
    abort(reason?: any): Promise<void>;
    close(): Promise<void>;
    getWriter(): WritableStreamDefaultWriter<W>;
}
export const WritableStream: {
    prototype: WritableStream;
    new<W = any>(underlyingSink?: UnderlyingSink<W>, strategy?: QueuingStrategy<W>): WritableStream<W>;
};
/**
 * This Streams API interface is the object returned by
 * WritableStream.getWriter() and once created locks the < writer to the
 * WritableStream ensuring that no other streams can write to the underlying
 * sink.
 */
export interface WritableStreamDefaultWriter<W = any> {
    readonly closed: Promise<undefined>;
    readonly desiredSize: number | null;
    readonly ready: Promise<undefined>;
    abort(reason?: any): Promise<void>;
    close(): Promise<void>;
    releaseLock(): void;
    write(chunk?: W): Promise<void>;
}
export const WritableStreamDefaultWriter: {
    prototype: WritableStreamDefaultWriter;
    new<W = any>(stream: WritableStream<W>): WritableStreamDefaultWriter<W>;
};
/**
 * This Streams API interface represents a controller allowing control of a
 * WritableStream's state. When constructing a WritableStream, the
 * underlying sink is given a corresponding WritableStreamDefaultController
 * instance to manipulate.
 */
export interface WritableStreamDefaultController {
    error(e?: any): void;
}
export const WritableStreamDefaultController: {
    prototype: WritableStreamDefaultController;
    new(): WritableStreamDefaultController;
};
export interface QueuingStrategy<T = any> {
    highWaterMark?: number;
    size?: QueuingStrategySize<T>;
}
export interface QueuingStrategySize<T = any> {
    (chunk?: T): number;
}
export interface QueuingStrategyInit {
    /**
     * Creates a new ByteLengthQueuingStrategy with the provided high water
     * mark.
     *
     * Note that the provided high water mark will not be validated ahead of
     * time. Instead, if it is negative, NaN, or not a number, the resulting
     * ByteLengthQueuingStrategy will cause the corresponding stream
     * constructor to throw.
     */
    highWaterMark: number;
}
/**
 * This Streams API interface provides a built-in byte length queuing
 * strategy that can be used when constructing streams.
 */
export interface ByteLengthQueuingStrategy extends QueuingStrategy<ArrayBufferView> {
    readonly highWaterMark: number;
    readonly size: QueuingStrategySize<ArrayBufferView>;
}
export const ByteLengthQueuingStrategy: {
    prototype: ByteLengthQueuingStrategy;
    new(init: QueuingStrategyInit): ByteLengthQueuingStrategy;
};
/**
 * This Streams API interface provides a built-in byte length queuing
 * strategy that can be used when constructing streams.
 */
export interface CountQueuingStrategy extends QueuingStrategy {
    readonly highWaterMark: number;
    readonly size: QueuingStrategySize;
}
export const CountQueuingStrategy: {
    prototype: CountQueuingStrategy;
    new(init: QueuingStrategyInit): CountQueuingStrategy;
};
export interface TextEncoderStream {
    /** Returns "utf-8". */
    readonly encoding: "utf-8";
    readonly readable: ReadableStream<Uint8Array>;
    readonly writable: WritableStream<string>;
    readonly [Symbol.toStringTag]: string;
}
export const TextEncoderStream: {
    prototype: TextEncoderStream;
    new(): TextEncoderStream;
};
export interface TextDecoderOptions {
    fatal?: boolean;
    ignoreBOM?: boolean;
}
export type BufferSource = ArrayBufferView | ArrayBuffer;
export interface TextDecoderStream {
    /** Returns encoding's name, lower cased. */
    readonly encoding: string;
    /** Returns `true` if error mode is "fatal", and `false` otherwise. */
    readonly fatal: boolean;
    /** Returns `true` if ignore BOM flag is set, and `false` otherwise. */
    readonly ignoreBOM: boolean;
    readonly readable: ReadableStream<string>;
    readonly writable: WritableStream<BufferSource>;
    readonly [Symbol.toStringTag]: string;
}
export const TextDecoderStream: {
    prototype: TextDecoderStream;
    new(encoding?: string, options?: TextDecoderOptions): TextDecoderStream;
};
export interface CompressionStream {
    readonly readable: ReadableStream;
    readonly writable: WritableStream;
}
export const CompressionStream: {
    prototype: CompressionStream;
    new(format: "deflate" | "deflate-raw" | "gzip"): CompressionStream;
};
export interface DecompressionStream {
    readonly writable: WritableStream;
    readonly readable: ReadableStream;
}
export const DecompressionStream: {
    prototype: DecompressionStream;
    new(format: "deflate" | "deflate-raw" | "gzip"): DecompressionStream;
};

export interface ByteLengthQueuingStrategy extends _ByteLengthQueuingStrategy {}
/**
 * `ByteLengthQueuingStrategy` class is a global reference for `import { ByteLengthQueuingStrategy } from 'node:stream/web'`.
 * https://nodejs.org/api/globals.html#class-bytelengthqueuingstrategy
 * @since v18.0.0
 */
export var ByteLengthQueuingStrategy: typeof globalThis extends { onmessage: any; ByteLengthQueuingStrategy: infer T }
    ? T
    : typeof import("stream/web").ByteLengthQueuingStrategy;

export interface CompressionStream extends _CompressionStream {}
/**
 * `CompressionStream` class is a global reference for `import { CompressionStream } from 'node:stream/web'`.
 * https://nodejs.org/api/globals.html#class-compressionstream
 * @since v18.0.0
 */
export var CompressionStream: typeof globalThis extends {
    onmessage: any;
    // CompressionStream, DecompressionStream and ReportingObserver was introduced in the same commit.
    // If ReportingObserver check is removed, the type here will form a circular reference in TS5.0+lib.dom.d.ts
    ReportingObserver: any;
    CompressionStream: infer T;
} ? T
    // TS 4.8, 4.9, 5.0
    : typeof globalThis extends { onmessage: any; TransformStream: { prototype: infer T } } ? {
            prototype: T;
            new(format: "deflate" | "deflate-raw" | "gzip"): T;
        }
    : typeof import("stream/web").CompressionStream;

export interface CountQueuingStrategy extends _CountQueuingStrategy {}
/**
 * `CountQueuingStrategy` class is a global reference for `import { CountQueuingStrategy } from 'node:stream/web'`.
 * https://nodejs.org/api/globals.html#class-countqueuingstrategy
 * @since v18.0.0
 */
export var CountQueuingStrategy: typeof globalThis extends { onmessage: any; CountQueuingStrategy: infer T } ? T
    : typeof import("stream/web").CountQueuingStrategy;

export interface DecompressionStream extends _DecompressionStream {}
/**
 * `DecompressionStream` class is a global reference for `import { DecompressionStream } from 'node:stream/web'`.
 * https://nodejs.org/api/globals.html#class-decompressionstream
 * @since v18.0.0
 */
export var DecompressionStream: typeof globalThis extends {
    onmessage: any;
    // CompressionStream, DecompressionStream and ReportingObserver was introduced in the same commit.
    // If ReportingObserver check is removed, the type here will form a circular reference in TS5.0+lib.dom.d.ts
    ReportingObserver: any;
    DecompressionStream: infer T extends object;
} ? T
    // TS 4.8, 4.9, 5.0
    : typeof globalThis extends { onmessage: any; TransformStream: { prototype: infer T } } ? {
            prototype: T;
            new(format: "deflate" | "deflate-raw" | "gzip"): T;
        }
    : typeof import("stream/web").DecompressionStream;

export interface ReadableByteStreamController extends _ReadableByteStreamController {}
/**
 * `ReadableByteStreamController` class is a global reference for `import { ReadableByteStreamController } from 'node:stream/web'`.
 * https://nodejs.org/api/globals.html#class-readablebytestreamcontroller
 * @since v18.0.0
 */
export var ReadableByteStreamController: typeof globalThis extends
    { onmessage: any; ReadableByteStreamController: infer T } ? T
    : typeof import("stream/web").ReadableByteStreamController;

export interface ReadableStream<R = any> extends _ReadableStream<R> {}
/**
 * `ReadableStream` class is a global reference for `import { ReadableStream } from 'node:stream/web'`.
 * https://nodejs.org/api/globals.html#class-readablestream
 * @since v18.0.0
 */
export var ReadableStream: typeof globalThis extends { onmessage: any; ReadableStream: infer T } ? T
    : typeof import("stream/web").ReadableStream;

export interface ReadableStreamBYOBReader extends _ReadableStreamBYOBReader {}
/**
 * `ReadableStreamBYOBReader` class is a global reference for `import { ReadableStreamBYOBReader } from 'node:stream/web'`.
 * https://nodejs.org/api/globals.html#class-readablestreambyobreader
 * @since v18.0.0
 */
export var ReadableStreamBYOBReader: typeof globalThis extends { onmessage: any; ReadableStreamBYOBReader: infer T }
    ? T
    : typeof import("stream/web").ReadableStreamBYOBReader;

export interface ReadableStreamBYOBRequest extends _ReadableStreamBYOBRequest {}
/**
 * `ReadableStreamBYOBRequest` class is a global reference for `import { ReadableStreamBYOBRequest } from 'node:stream/web'`.
 * https://nodejs.org/api/globals.html#class-readablestreambyobrequest
 * @since v18.0.0
 */
export var ReadableStreamBYOBRequest: typeof globalThis extends { onmessage: any; ReadableStreamBYOBRequest: infer T }
    ? T
    : typeof import("stream/web").ReadableStreamBYOBRequest;

export interface ReadableStreamDefaultController<R = any> extends _ReadableStreamDefaultController<R> {}
/**
 * `ReadableStreamDefaultController` class is a global reference for `import { ReadableStreamDefaultController } from 'node:stream/web'`.
 * https://nodejs.org/api/globals.html#class-readablestreamdefaultcontroller
 * @since v18.0.0
 */
export var ReadableStreamDefaultController: typeof globalThis extends
    { onmessage: any; ReadableStreamDefaultController: infer T } ? T
    : typeof import("stream/web").ReadableStreamDefaultController;

export interface ReadableStreamDefaultReader<R = any> extends _ReadableStreamDefaultReader<R> {}
/**
 * `ReadableStreamDefaultReader` class is a global reference for `import { ReadableStreamDefaultReader } from 'node:stream/web'`.
 * https://nodejs.org/api/globals.html#class-readablestreamdefaultreader
 * @since v18.0.0
 */
export var ReadableStreamDefaultReader: typeof globalThis extends
    { onmessage: any; ReadableStreamDefaultReader: infer T } ? T
    : typeof import("stream/web").ReadableStreamDefaultReader;

export interface TextDecoderStream extends _TextDecoderStream {}
/**
 * `TextDecoderStream` class is a global reference for `import { TextDecoderStream } from 'node:stream/web'`.
 * https://nodejs.org/api/globals.html#class-textdecoderstream
 * @since v18.0.0
 */
export var TextDecoderStream: typeof globalThis extends { onmessage: any; TextDecoderStream: infer T } ? T
    : typeof import("stream/web").TextDecoderStream;

export interface TextEncoderStream extends _TextEncoderStream {}
/**
 * `TextEncoderStream` class is a global reference for `import { TextEncoderStream } from 'node:stream/web'`.
 * https://nodejs.org/api/globals.html#class-textencoderstream
 * @since v18.0.0
 */
export var TextEncoderStream: typeof globalThis extends { onmessage: any; TextEncoderStream: infer T } ? T
    : typeof import("stream/web").TextEncoderStream;

export interface TransformStream<I = any, O = any> extends _TransformStream<I, O> {}
/**
 * `TransformStream` class is a global reference for `import { TransformStream } from 'node:stream/web'`.
 * https://nodejs.org/api/globals.html#class-transformstream
 * @since v18.0.0
 */
export var TransformStream: typeof globalThis extends { onmessage: any; TransformStream: infer T } ? T
    : typeof import("stream/web").TransformStream;

export interface TransformStreamDefaultController<O = any> extends _TransformStreamDefaultController<O> {}
/**
 * `TransformStreamDefaultController` class is a global reference for `import { TransformStreamDefaultController } from 'node:stream/web'`.
 * https://nodejs.org/api/globals.html#class-transformstreamdefaultcontroller
 * @since v18.0.0
 */
export var TransformStreamDefaultController: typeof globalThis extends
    { onmessage: any; TransformStreamDefaultController: infer T } ? T
    : typeof import("stream/web").TransformStreamDefaultController;

export interface WritableStream<W = any> extends _WritableStream<W> {}
/**
 * `WritableStream` class is a global reference for `import { WritableStream } from 'node:stream/web'`.
 * https://nodejs.org/api/globals.html#class-writablestream
 * @since v18.0.0
 */
export var WritableStream: typeof globalThis extends { onmessage: any; WritableStream: infer T } ? T
    : typeof import("stream/web").WritableStream;

export interface WritableStreamDefaultController extends _WritableStreamDefaultController {}
/**
 * `WritableStreamDefaultController` class is a global reference for `import { WritableStreamDefaultController } from 'node:stream/web'`.
 * https://nodejs.org/api/globals.html#class-writablestreamdefaultcontroller
 * @since v18.0.0
 */
export var WritableStreamDefaultController: typeof globalThis extends
    { onmessage: any; WritableStreamDefaultController: infer T } ? T
    : typeof import("stream/web").WritableStreamDefaultController;

export interface WritableStreamDefaultWriter<W = any> extends _WritableStreamDefaultWriter<W> {}
/**
 * `WritableStreamDefaultWriter` class is a global reference for `import { WritableStreamDefaultWriter } from 'node:stream/web'`.
 * https://nodejs.org/api/globals.html#class-writablestreamdefaultwriter
 * @since v18.0.0
 */
export var WritableStreamDefaultWriter: typeof globalThis extends
    { onmessage: any; WritableStreamDefaultWriter: infer T } ? T
    : typeof import("stream/web").WritableStreamDefaultWriter;