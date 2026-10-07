/**
 * The utility consumer functions provide common options for consuming
 * streams.
 * @since v16.7.0
 * @module
 */

import { Blob as NodeBlob } from "./node__buffer.d.ts";
import { ReadableStream as WebReadableStream } from "./node__stream--web.d.ts";
/**
 * @since v16.7.0
 * @returns Fulfills with an `ArrayBuffer` containing the full contents of the stream.
 */
export function arrayBuffer(stream: WebReadableStream | ReadableStream | AsyncIterable<any>): Promise<ArrayBuffer>;
/**
 * @since v16.7.0
 * @returns Fulfills with a `Blob` containing the full contents of the stream.
 */
export function blob(stream: WebReadableStream | ReadableStream | AsyncIterable<any>): Promise<NodeBlob>;
/**
 * @since v16.7.0
 * @returns Fulfills with a `Buffer` containing the full contents of the stream.
 */
export function buffer(stream: WebReadableStream | ReadableStream | AsyncIterable<any>): Promise<Buffer>;
/**
 * @since v16.7.0
 * @returns Fulfills with the contents of the stream parsed as a
 * UTF-8 encoded string that is then passed through `JSON.parse()`.
 */
export function json(stream: WebReadableStream | ReadableStream | AsyncIterable<any>): Promise<unknown>;
/**
 * @since v16.7.0
 * @returns Fulfills with the contents of the stream parsed as a UTF-8 encoded string.
 */
export function text(stream: WebReadableStream | ReadableStream | AsyncIterable<any>): Promise<string>;