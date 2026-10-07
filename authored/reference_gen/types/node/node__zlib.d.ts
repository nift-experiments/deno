/**
 * The `node:zlib` module provides compression functionality implemented using
 * Gzip, Deflate/Inflate, and Brotli.
 *
 * To access it:
 *
 * ```js
 * import zlib from 'node:zlib';
 * ```
 *
 * Compression and decompression are built around the Node.js
 * [Streams API](https://nodejs.org/docs/latest-v22.x/api/stream.html).
 *
 * Compressing or decompressing a stream (such as a file) can be accomplished by
 * piping the source stream through a `zlib` `Transform` stream into a destination
 * stream:
 *
 * ```js
 * import { createGzip } from 'node:zlib';
 * import { pipeline } from 'node:stream';
 * import {
 *   createReadStream,
 *   createWriteStream,
 * } from 'node:fs';
 *
 * const gzip = createGzip();
 * const source = createReadStream('input.txt');
 * const destination = createWriteStream('input.txt.gz');
 *
 * pipeline(source, gzip, destination, (err) => {
 *   if (err) {
 *     console.error('An error occurred:', err);
 *     process.exitCode = 1;
 *   }
 * });
 *
 * // Or, Promisified
 *
 * import { promisify } from 'node:util';
 * const pipe = promisify(pipeline);
 *
 * async function do_gzip(input, output) {
 *   const gzip = createGzip();
 *   const source = createReadStream(input);
 *   const destination = createWriteStream(output);
 *   await pipe(source, gzip, destination);
 * }
 *
 * do_gzip('input.txt', 'input.txt.gz')
 *   .catch((err) => {
 *     console.error('An error occurred:', err);
 *     process.exitCode = 1;
 *   });
 * ```
 *
 * It is also possible to compress or decompress data in a single step:
 *
 * ```js
 * import { deflate, unzip } from 'node:zlib';
 *
 * const input = '.................................';
 * deflate(input, (err, buffer) => {
 *   if (err) {
 *     console.error('An error occurred:', err);
 *     process.exitCode = 1;
 *   }
 *   console.log(buffer.toString('base64'));
 * });
 *
 * const buffer = Buffer.from('eJzT0yMAAGTvBe8=', 'base64');
 * unzip(buffer, (err, buffer) => {
 *   if (err) {
 *     console.error('An error occurred:', err);
 *     process.exitCode = 1;
 *   }
 *   console.log(buffer.toString());
 * });
 *
 * // Or, Promisified
 *
 * import { promisify } from 'node:util';
 * const do_unzip = promisify(unzip);
 *
 * do_unzip(buffer)
 *   .then((buf) => console.log(buf.toString()))
 *   .catch((err) => {
 *     console.error('An error occurred:', err);
 *     process.exitCode = 1;
 *   });
 * ```
 * @since v0.5.8
 * @see [source](https://github.com/nodejs/node/blob/v22.x/lib/zlib.js)
 * @module
 */

import * as stream from "./node__stream.d.ts";
export interface ZlibOptions {
    /**
     * @default constants.Z_NO_FLUSH
     */
    flush?: number | undefined;
    /**
     * @default constants.Z_FINISH
     */
    finishFlush?: number | undefined;
    /**
     * @default 16*1024
     */
    chunkSize?: number | undefined;
    windowBits?: number | undefined;
    level?: number | undefined; // compression only
    memLevel?: number | undefined; // compression only
    strategy?: number | undefined; // compression only
    dictionary?: ArrayBufferView | ArrayBuffer | undefined; // deflate/inflate only, empty dictionary by default
    /**
     * If `true`, returns an object with `buffer` and `engine`.
     */
    info?: boolean | undefined;
    /**
     * Limits output size when using convenience methods.
     * @default buffer.kMaxLength
     */
    maxOutputLength?: number | undefined;
}
/**
 * :::caution Deno compatibility
 *
 * This class is not supported.
 *
 * :::
 *
 */
export interface BrotliOptions {
    /**
     * @default constants.BROTLI_OPERATION_PROCESS
     */
    flush?: number | undefined;
    /**
     * @default constants.BROTLI_OPERATION_FINISH
     */
    finishFlush?: number | undefined;
    /**
     * @default 16*1024
     */
    chunkSize?: number | undefined;
    params?:
        | {
            /**
             * Each key is a `constants.BROTLI_*` constant.
             */
            [key: number]: boolean | number;
        }
        | undefined;
    /**
     * Limits output size when using [convenience methods](https://nodejs.org/docs/latest-v22.x/api/zlib.html#convenience-methods).
     * @default buffer.kMaxLength
     */
    maxOutputLength?: number | undefined;
}
export interface Zlib {
    /** @deprecated Use bytesWritten instead. */
    readonly bytesRead: number;
    readonly bytesWritten: number;
    shell?: boolean | string | undefined;
    close(callback?: () => void): void;
    flush(kind?: number, callback?: () => void): void;
    flush(callback?: () => void): void;
}
export interface ZlibParams {
    params(level: number, strategy: number, callback: () => void): void;
}
export interface ZlibReset {
    reset(): void;
}
/**
 * :::caution Deno compatibility
 *
 * This class is not supported.
 *
 * :::
 *
 */
export interface BrotliCompress extends stream.Transform, Zlib {}
/**
 * :::caution Deno compatibility
 *
 * This class is not supported.
 *
 * :::
 *
 */
export interface BrotliDecompress extends stream.Transform, Zlib {}
export interface Gzip extends stream.Transform, Zlib {}
export interface Gunzip extends stream.Transform, Zlib {}
export interface Deflate extends stream.Transform, Zlib, ZlibReset, ZlibParams {}
export interface Inflate extends stream.Transform, Zlib, ZlibReset {}
export interface DeflateRaw extends stream.Transform, Zlib, ZlibReset, ZlibParams {}
export interface InflateRaw extends stream.Transform, Zlib, ZlibReset {}
export interface Unzip extends stream.Transform, Zlib {}
/**
 * Computes a 32-bit [Cyclic Redundancy Check](https://en.wikipedia.org/wiki/Cyclic_redundancy_check) checksum of `data`.
 * If `value` is specified, it is used as the starting value of the checksum, otherwise, 0 is used as the starting value.
 * @param data When `data` is a string, it will be encoded as UTF-8 before being used for computation.
 * @param value An optional starting value. It must be a 32-bit unsigned integer. @default 0
 * @returns A 32-bit unsigned integer containing the checksum.
 * @since v22.2.0
 */
export function crc32(data: string | Buffer | ArrayBufferView, value?: number): number;
/**
 * Creates and returns a new `BrotliCompress` object.
 * @since v11.7.0, v10.16.0
 */
export function createBrotliCompress(options?: BrotliOptions): BrotliCompress;
/**
 * Creates and returns a new `BrotliDecompress` object.
 * @since v11.7.0, v10.16.0
 */
export function createBrotliDecompress(options?: BrotliOptions): BrotliDecompress;
/**
 * Creates and returns a new `Gzip` object.
 * See `example`.
 * @since v0.5.8
 */
export function createGzip(options?: ZlibOptions): Gzip;
/**
 * Creates and returns a new `Gunzip` object.
 * @since v0.5.8
 */
export function createGunzip(options?: ZlibOptions): Gunzip;
/**
 * Creates and returns a new `Deflate` object.
 * @since v0.5.8
 */
export function createDeflate(options?: ZlibOptions): Deflate;
/**
 * Creates and returns a new `Inflate` object.
 * @since v0.5.8
 */
export function createInflate(options?: ZlibOptions): Inflate;
/**
 * Creates and returns a new `DeflateRaw` object.
 *
 * An upgrade of zlib from 1.2.8 to 1.2.11 changed behavior when `windowBits` is set to 8 for raw deflate streams. zlib would automatically set `windowBits` to 9 if was initially set to 8. Newer
 * versions of zlib will throw an exception,
 * so Node.js restored the original behavior of upgrading a value of 8 to 9,
 * since passing `windowBits = 9` to zlib actually results in a compressed stream
 * that effectively uses an 8-bit window only.
 * @since v0.5.8
 */
export function createDeflateRaw(options?: ZlibOptions): DeflateRaw;
/**
 * Creates and returns a new `InflateRaw` object.
 * @since v0.5.8
 */
export function createInflateRaw(options?: ZlibOptions): InflateRaw;
/**
 * Creates and returns a new `Unzip` object.
 * @since v0.5.8
 */
export function createUnzip(options?: ZlibOptions): Unzip;
export type InputType = string | ArrayBuffer | ArrayBufferView;
export type CompressCallback = (error: Error | null, result: Buffer) => void;
/**
 * @since v11.7.0, v10.16.0
 */
export function brotliCompress(buf: InputType, options: BrotliOptions, callback: CompressCallback): void;
export function brotliCompress(buf: InputType, callback: CompressCallback): void;
/**
 * Compress a chunk of data with `BrotliCompress`.
 * @since v11.7.0, v10.16.0
 */
export function brotliCompressSync(buf: InputType, options?: BrotliOptions): Buffer;
/**
 * @since v11.7.0, v10.16.0
 */
export function brotliDecompress(buf: InputType, options: BrotliOptions, callback: CompressCallback): void;
export function brotliDecompress(buf: InputType, callback: CompressCallback): void;
/**
 * Decompress a chunk of data with `BrotliDecompress`.
 * @since v11.7.0, v10.16.0
 */
export function brotliDecompressSync(buf: InputType, options?: BrotliOptions): Buffer;
/**
 * @since v0.6.0
 */
export function deflate(buf: InputType, callback: CompressCallback): void;
export function deflate(buf: InputType, options: ZlibOptions, callback: CompressCallback): void;
/**
 * Compress a chunk of data with `Deflate`.
 * @since v0.11.12
 */
export function deflateSync(buf: InputType, options?: ZlibOptions): Buffer;
/**
 * @since v0.6.0
 */
export function deflateRaw(buf: InputType, callback: CompressCallback): void;
export function deflateRaw(buf: InputType, options: ZlibOptions, callback: CompressCallback): void;
/**
 * Compress a chunk of data with `DeflateRaw`.
 * @since v0.11.12
 */
export function deflateRawSync(buf: InputType, options?: ZlibOptions): Buffer;
/**
 * @since v0.6.0
 */
export function gzip(buf: InputType, callback: CompressCallback): void;
export function gzip(buf: InputType, options: ZlibOptions, callback: CompressCallback): void;
/**
 * Compress a chunk of data with `Gzip`.
 * @since v0.11.12
 */
export function gzipSync(buf: InputType, options?: ZlibOptions): Buffer;
/**
 * @since v0.6.0
 */
export function gunzip(buf: InputType, callback: CompressCallback): void;
export function gunzip(buf: InputType, options: ZlibOptions, callback: CompressCallback): void;
/**
 * Decompress a chunk of data with `Gunzip`.
 * @since v0.11.12
 */
export function gunzipSync(buf: InputType, options?: ZlibOptions): Buffer;
/**
 * @since v0.6.0
 */
export function inflate(buf: InputType, callback: CompressCallback): void;
export function inflate(buf: InputType, options: ZlibOptions, callback: CompressCallback): void;
/**
 * Decompress a chunk of data with `Inflate`.
 * @since v0.11.12
 */
export function inflateSync(buf: InputType, options?: ZlibOptions): Buffer;
/**
 * @since v0.6.0
 */
export function inflateRaw(buf: InputType, callback: CompressCallback): void;
export function inflateRaw(buf: InputType, options: ZlibOptions, callback: CompressCallback): void;
/**
 * Decompress a chunk of data with `InflateRaw`.
 * @since v0.11.12
 */
export function inflateRawSync(buf: InputType, options?: ZlibOptions): Buffer;
/**
 * @since v0.6.0
 */
export function unzip(buf: InputType, callback: CompressCallback): void;
export function unzip(buf: InputType, options: ZlibOptions, callback: CompressCallback): void;
/**
 * Decompress a chunk of data with `Unzip`.
 * @since v0.11.12
 */
export function unzipSync(buf: InputType, options?: ZlibOptions): Buffer;
export namespace constants {
    export const BROTLI_DECODE: number;
    export const BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES: number;
    export const BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP: number;
    export const BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES: number;
    export const BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1: number;
    export const BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2: number;
    export const BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS: number;
    export const BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET: number;
    export const BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1: number;
    export const BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2: number;
    export const BROTLI_DECODER_ERROR_FORMAT_CL_SPACE: number;
    export const BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT: number;
    export const BROTLI_DECODER_ERROR_FORMAT_DICTIONARY: number;
    export const BROTLI_DECODER_ERROR_FORMAT_DISTANCE: number;
    export const BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE: number;
    export const BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE: number;
    export const BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE: number;
    export const BROTLI_DECODER_ERROR_FORMAT_PADDING_1: number;
    export const BROTLI_DECODER_ERROR_FORMAT_PADDING_2: number;
    export const BROTLI_DECODER_ERROR_FORMAT_RESERVED: number;
    export const BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET: number;
    export const BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME: number;
    export const BROTLI_DECODER_ERROR_FORMAT_TRANSFORM: number;
    export const BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS: number;
    export const BROTLI_DECODER_ERROR_INVALID_ARGUMENTS: number;
    export const BROTLI_DECODER_ERROR_UNREACHABLE: number;
    export const BROTLI_DECODER_NEEDS_MORE_INPUT: number;
    export const BROTLI_DECODER_NEEDS_MORE_OUTPUT: number;
    export const BROTLI_DECODER_NO_ERROR: number;
    export const BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: number;
    export const BROTLI_DECODER_PARAM_LARGE_WINDOW: number;
    export const BROTLI_DECODER_RESULT_ERROR: number;
    export const BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT: number;
    export const BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT: number;
    export const BROTLI_DECODER_RESULT_SUCCESS: number;
    export const BROTLI_DECODER_SUCCESS: number;
    export const BROTLI_DEFAULT_MODE: number;
    export const BROTLI_DEFAULT_QUALITY: number;
    export const BROTLI_DEFAULT_WINDOW: number;
    export const BROTLI_ENCODE: number;
    export const BROTLI_LARGE_MAX_WINDOW_BITS: number;
    export const BROTLI_MAX_INPUT_BLOCK_BITS: number;
    export const BROTLI_MAX_QUALITY: number;
    export const BROTLI_MAX_WINDOW_BITS: number;
    export const BROTLI_MIN_INPUT_BLOCK_BITS: number;
    export const BROTLI_MIN_QUALITY: number;
    export const BROTLI_MIN_WINDOW_BITS: number;
    export const BROTLI_MODE_FONT: number;
    export const BROTLI_MODE_GENERIC: number;
    export const BROTLI_MODE_TEXT: number;
    export const BROTLI_OPERATION_EMIT_METADATA: number;
    export const BROTLI_OPERATION_FINISH: number;
    export const BROTLI_OPERATION_FLUSH: number;
    export const BROTLI_OPERATION_PROCESS: number;
    export const BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: number;
    export const BROTLI_PARAM_LARGE_WINDOW: number;
    export const BROTLI_PARAM_LGBLOCK: number;
    export const BROTLI_PARAM_LGWIN: number;
    export const BROTLI_PARAM_MODE: number;
    export const BROTLI_PARAM_NDIRECT: number;
    export const BROTLI_PARAM_NPOSTFIX: number;
    export const BROTLI_PARAM_QUALITY: number;
    export const BROTLI_PARAM_SIZE_HINT: number;
    export const DEFLATE: number;
    export const DEFLATERAW: number;
    export const GUNZIP: number;
    export const GZIP: number;
    export const INFLATE: number;
    export const INFLATERAW: number;
    export const UNZIP: number;
    // Allowed flush values.
    export const Z_NO_FLUSH: number;
    export const Z_PARTIAL_FLUSH: number;
    export const Z_SYNC_FLUSH: number;
    export const Z_FULL_FLUSH: number;
    export const Z_FINISH: number;
    export const Z_BLOCK: number;
    export const Z_TREES: number;
    // Return codes for the compression/decompression functions.
    // Negative values are errors, positive values are used for special but normal events.
    export const Z_OK: number;
    export const Z_STREAM_END: number;
    export const Z_NEED_DICT: number;
    export const Z_ERRNO: number;
    export const Z_STREAM_ERROR: number;
    export const Z_DATA_ERROR: number;
    export const Z_MEM_ERROR: number;
    export const Z_BUF_ERROR: number;
    export const Z_VERSION_ERROR: number;
    // Compression levels.
    export const Z_NO_COMPRESSION: number;
    export const Z_BEST_SPEED: number;
    export const Z_BEST_COMPRESSION: number;
    export const Z_DEFAULT_COMPRESSION: number;
    // Compression strategy.
    export const Z_FILTERED: number;
    export const Z_HUFFMAN_ONLY: number;
    export const Z_RLE: number;
    export const Z_FIXED: number;
    export const Z_DEFAULT_STRATEGY: number;
    export const Z_DEFAULT_WINDOWBITS: number;

    export const Z_MIN_WINDOWBITS: number;
    export const Z_MAX_WINDOWBITS: number;
    export const Z_MIN_CHUNK: number;
    export const Z_MAX_CHUNK: number;
    export const Z_DEFAULT_CHUNK: number;
    export const Z_MIN_MEMLEVEL: number;
    export const Z_MAX_MEMLEVEL: number;
    export const Z_DEFAULT_MEMLEVEL: number;
    export const Z_MIN_LEVEL: number;
    export const Z_MAX_LEVEL: number;
    export const Z_DEFAULT_LEVEL: number;
    export const ZLIB_VERNUM: number;
}
// Allowed flush values.
/** @deprecated Use `constants.Z_NO_FLUSH` */
export const Z_NO_FLUSH: number;
/** @deprecated Use `constants.Z_PARTIAL_FLUSH` */
export const Z_PARTIAL_FLUSH: number;
/** @deprecated Use `constants.Z_SYNC_FLUSH` */
export const Z_SYNC_FLUSH: number;
/** @deprecated Use `constants.Z_FULL_FLUSH` */
export const Z_FULL_FLUSH: number;
/** @deprecated Use `constants.Z_FINISH` */
export const Z_FINISH: number;
/** @deprecated Use `constants.Z_BLOCK` */
export const Z_BLOCK: number;
/** @deprecated Use `constants.Z_TREES` */
export const Z_TREES: number;
// Return codes for the compression/decompression functions.
// Negative values are errors, positive values are used for special but normal events.
/** @deprecated Use `constants.Z_OK` */
export const Z_OK: number;
/** @deprecated Use `constants.Z_STREAM_END` */
export const Z_STREAM_END: number;
/** @deprecated Use `constants.Z_NEED_DICT` */
export const Z_NEED_DICT: number;
/** @deprecated Use `constants.Z_ERRNO` */
export const Z_ERRNO: number;
/** @deprecated Use `constants.Z_STREAM_ERROR` */
export const Z_STREAM_ERROR: number;
/** @deprecated Use `constants.Z_DATA_ERROR` */
export const Z_DATA_ERROR: number;
/** @deprecated Use `constants.Z_MEM_ERROR` */
export const Z_MEM_ERROR: number;
/** @deprecated Use `constants.Z_BUF_ERROR` */
export const Z_BUF_ERROR: number;
/** @deprecated Use `constants.Z_VERSION_ERROR` */
export const Z_VERSION_ERROR: number;
// Compression levels.
/** @deprecated Use `constants.Z_NO_COMPRESSION` */
export const Z_NO_COMPRESSION: number;
/** @deprecated Use `constants.Z_BEST_SPEED` */
export const Z_BEST_SPEED: number;
/** @deprecated Use `constants.Z_BEST_COMPRESSION` */
export const Z_BEST_COMPRESSION: number;
/** @deprecated Use `constants.Z_DEFAULT_COMPRESSION` */
export const Z_DEFAULT_COMPRESSION: number;
// Compression strategy.
/** @deprecated Use `constants.Z_FILTERED` */
export const Z_FILTERED: number;
/** @deprecated Use `constants.Z_HUFFMAN_ONLY` */
export const Z_HUFFMAN_ONLY: number;
/** @deprecated Use `constants.Z_RLE` */
export const Z_RLE: number;
/** @deprecated Use `constants.Z_FIXED` */
export const Z_FIXED: number;
/** @deprecated Use `constants.Z_DEFAULT_STRATEGY` */
export const Z_DEFAULT_STRATEGY: number;
/** @deprecated */
export const Z_BINARY: number;
/** @deprecated */
export const Z_TEXT: number;
/** @deprecated */
export const Z_ASCII: number;
/** @deprecated  */
export const Z_UNKNOWN: number;
/** @deprecated */
export const Z_DEFLATED: number;