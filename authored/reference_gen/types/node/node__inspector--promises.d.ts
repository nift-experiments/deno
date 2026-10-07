/**
 * The `node:inspector/promises` module provides an API for interacting with the V8
 * inspector.
 * @see [source](https://github.com/nodejs/node/blob/v22.x/lib/inspector/promises.js)
 * @since v19.0.0
 * @module
 */

import EventEmitter = require('node:events');
import {
    open,
    close,
    url,
    waitForDebugger,
    console,
    InspectorNotification,
    Schema,
    Runtime,
    Debugger,
    Console,
    Profiler,
    HeapProfiler,
    NodeTracing,
    NodeWorker,
    Network,
    NodeRuntime,
} from './node__inspector.d.ts';

/**
 * The `inspector.Session` is used for dispatching messages to the V8 inspector
 * back-end and receiving message responses and notifications.
 * @since v19.0.0
 */
export class Session extends EventEmitter {
    /**
     * Create a new instance of the `inspector.Session` class.
     * The inspector session needs to be connected through `session.connect()` before the messages can be dispatched to the inspector backend.
     */
    constructor();

    /**
     * Connects a session to the inspector back-end.
     */
    connect(): void;

    /**
     * Connects a session to the inspector back-end.
     * An exception will be thrown if this API was not called on a Worker thread.
     */
    connectToMainThread(): void;

    /**
     * Immediately close the session. All pending message callbacks will be called with an error.
     * `session.connect()` will need to be called to be able to send messages again.
     * Reconnected session will lose all inspector state, such as enabled agents or configured breakpoints.
     */
    disconnect(): void;

    /**
     * Posts a message to the inspector back-end.
     *
     * ```js
     * import { Session } from 'node:inspector/promises';
     * try {
     *   const session = new Session();
     *   session.connect();
     *   const result = await session.post('Runtime.evaluate', { expression: '2 + 2' });
     *   console.log(result);
     * } catch (error) {
     *   console.error(error);
     * }
     * // Output: { result: { type: 'number', value: 4, description: '4' } }
     * ```
     *
     * The latest version of the V8 inspector protocol is published on the
     * [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/v8/).
     *
     * Node.js inspector supports all the Chrome DevTools Protocol domains declared
     * by V8. Chrome DevTools Protocol domain provides an interface for interacting
     * with one of the runtime agents used to inspect the application state and listen
     * to the run-time events.
     */
    post(method: string, params?: object): Promise<void>;
    /**
     * Returns supported domains.
     */
    post(method: 'Schema.getDomains'): Promise<Schema.GetDomainsReturnType>;
    /**
     * Evaluates expression on global object.
     */
    post(method: 'Runtime.evaluate', params?: Runtime.EvaluateParameterType): Promise<Runtime.EvaluateReturnType>;
    /**
     * Add handler to promise with given promise object id.
     */
    post(method: 'Runtime.awaitPromise', params?: Runtime.AwaitPromiseParameterType): Promise<Runtime.AwaitPromiseReturnType>;
    /**
     * Calls function with given declaration on the given object. Object group of the result is inherited from the target object.
     */
    post(method: 'Runtime.callFunctionOn', params?: Runtime.CallFunctionOnParameterType): Promise<Runtime.CallFunctionOnReturnType>;
    /**
     * Returns properties of a given object. Object group of the result is inherited from the target object.
     */
    post(method: 'Runtime.getProperties', params?: Runtime.GetPropertiesParameterType): Promise<Runtime.GetPropertiesReturnType>;
    /**
     * Releases remote object with given id.
     */
    post(method: 'Runtime.releaseObject', params?: Runtime.ReleaseObjectParameterType): Promise<void>;
    /**
     * Releases all remote objects that belong to a given group.
     */
    post(method: 'Runtime.releaseObjectGroup', params?: Runtime.ReleaseObjectGroupParameterType): Promise<void>;
    /**
     * Tells inspected instance to run if it was waiting for debugger to attach.
     */
    post(method: 'Runtime.runIfWaitingForDebugger'): Promise<void>;
    /**
     * Enables reporting of execution contexts creation by means of <code>executionContextCreated</code> event. When the reporting gets enabled the event will be sent immediately for each existing execution context.
     */
    post(method: 'Runtime.enable'): Promise<void>;
    /**
     * Disables reporting of execution contexts creation.
     */
    post(method: 'Runtime.disable'): Promise<void>;
    /**
     * Discards collected exceptions and console API calls.
     */
    post(method: 'Runtime.discardConsoleEntries'): Promise<void>;
    /**
     * @experimental
     */
    post(method: 'Runtime.setCustomObjectFormatterEnabled', params?: Runtime.SetCustomObjectFormatterEnabledParameterType): Promise<void>;
    /**
     * Compiles expression.
     */
    post(method: 'Runtime.compileScript', params?: Runtime.CompileScriptParameterType): Promise<Runtime.CompileScriptReturnType>;
    /**
     * Runs script with given id in a given context.
     */
    post(method: 'Runtime.runScript', params?: Runtime.RunScriptParameterType): Promise<Runtime.RunScriptReturnType>;
    post(method: 'Runtime.queryObjects', params?: Runtime.QueryObjectsParameterType): Promise<Runtime.QueryObjectsReturnType>;
    /**
     * Returns all let, const and class variables from global scope.
     */
    post(method: 'Runtime.globalLexicalScopeNames', params?: Runtime.GlobalLexicalScopeNamesParameterType): Promise<Runtime.GlobalLexicalScopeNamesReturnType>;
    /**
     * Enables debugger for the given page. Clients should not assume that the debugging has been enabled until the result for this command is received.
     */
    post(method: 'Debugger.enable'): Promise<Debugger.EnableReturnType>;
    /**
     * Disables debugger for given page.
     */
    post(method: 'Debugger.disable'): Promise<void>;
    /**
     * Activates / deactivates all breakpoints on the page.
     */
    post(method: 'Debugger.setBreakpointsActive', params?: Debugger.SetBreakpointsActiveParameterType): Promise<void>;
    /**
     * Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc).
     */
    post(method: 'Debugger.setSkipAllPauses', params?: Debugger.SetSkipAllPausesParameterType): Promise<void>;
    /**
     * Sets JavaScript breakpoint at given location specified either by URL or URL regex. Once this command is issued, all existing parsed scripts will have breakpoints resolved and returned in <code>locations</code> property. Further matching script parsing will result in subsequent <code>breakpointResolved</code> events issued. This logical breakpoint will survive page reloads.
     */
    post(method: 'Debugger.setBreakpointByUrl', params?: Debugger.SetBreakpointByUrlParameterType): Promise<Debugger.SetBreakpointByUrlReturnType>;
    /**
     * Sets JavaScript breakpoint at a given location.
     */
    post(method: 'Debugger.setBreakpoint', params?: Debugger.SetBreakpointParameterType): Promise<Debugger.SetBreakpointReturnType>;
    /**
     * Removes JavaScript breakpoint.
     */
    post(method: 'Debugger.removeBreakpoint', params?: Debugger.RemoveBreakpointParameterType): Promise<void>;
    /**
     * Returns possible locations for breakpoint. scriptId in start and end range locations should be the same.
     */
    post(method: 'Debugger.getPossibleBreakpoints', params?: Debugger.GetPossibleBreakpointsParameterType): Promise<Debugger.GetPossibleBreakpointsReturnType>;
    /**
     * Continues execution until specific location is reached.
     */
    post(method: 'Debugger.continueToLocation', params?: Debugger.ContinueToLocationParameterType): Promise<void>;
    /**
     * @experimental
     */
    post(method: 'Debugger.pauseOnAsyncCall', params?: Debugger.PauseOnAsyncCallParameterType): Promise<void>;
    /**
     * Steps over the statement.
     */
    post(method: 'Debugger.stepOver'): Promise<void>;
    /**
     * Steps into the function call.
     */
    post(method: 'Debugger.stepInto', params?: Debugger.StepIntoParameterType): Promise<void>;
    /**
     * Steps out of the function call.
     */
    post(method: 'Debugger.stepOut'): Promise<void>;
    /**
     * Stops on the next JavaScript statement.
     */
    post(method: 'Debugger.pause'): Promise<void>;
    /**
     * This method is deprecated - use Debugger.stepInto with breakOnAsyncCall and Debugger.pauseOnAsyncTask instead. Steps into next scheduled async task if any is scheduled before next pause. Returns success when async task is actually scheduled, returns error if no task were scheduled or another scheduleStepIntoAsync was called.
     * @experimental
     */
    post(method: 'Debugger.scheduleStepIntoAsync'): Promise<void>;
    /**
     * Resumes JavaScript execution.
     */
    post(method: 'Debugger.resume'): Promise<void>;
    /**
     * Returns stack trace with given <code>stackTraceId</code>.
     * @experimental
     */
    post(method: 'Debugger.getStackTrace', params?: Debugger.GetStackTraceParameterType): Promise<Debugger.GetStackTraceReturnType>;
    /**
     * Searches for given string in script content.
     */
    post(method: 'Debugger.searchInContent', params?: Debugger.SearchInContentParameterType): Promise<Debugger.SearchInContentReturnType>;
    /**
     * Edits JavaScript source live.
     */
    post(method: 'Debugger.setScriptSource', params?: Debugger.SetScriptSourceParameterType): Promise<Debugger.SetScriptSourceReturnType>;
    /**
     * Restarts particular call frame from the beginning.
     */
    post(method: 'Debugger.restartFrame', params?: Debugger.RestartFrameParameterType): Promise<Debugger.RestartFrameReturnType>;
    /**
     * Returns source for the script with given id.
     */
    post(method: 'Debugger.getScriptSource', params?: Debugger.GetScriptSourceParameterType): Promise<Debugger.GetScriptSourceReturnType>;
    /**
     * Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions or no exceptions. Initial pause on exceptions state is <code>none</code>.
     */
    post(method: 'Debugger.setPauseOnExceptions', params?: Debugger.SetPauseOnExceptionsParameterType): Promise<void>;
    /**
     * Evaluates expression on a given call frame.
     */
    post(method: 'Debugger.evaluateOnCallFrame', params?: Debugger.EvaluateOnCallFrameParameterType): Promise<Debugger.EvaluateOnCallFrameReturnType>;
    /**
     * Changes value of variable in a callframe. Object-based scopes are not supported and must be mutated manually.
     */
    post(method: 'Debugger.setVariableValue', params?: Debugger.SetVariableValueParameterType): Promise<void>;
    /**
     * Changes return value in top frame. Available only at return break position.
     * @experimental
     */
    post(method: 'Debugger.setReturnValue', params?: Debugger.SetReturnValueParameterType): Promise<void>;
    /**
     * Enables or disables async call stacks tracking.
     */
    post(method: 'Debugger.setAsyncCallStackDepth', params?: Debugger.SetAsyncCallStackDepthParameterType): Promise<void>;
    /**
     * Replace previous blackbox patterns with passed ones. Forces backend to skip stepping/pausing in scripts with url matching one of the patterns. VM will try to leave blackboxed script by performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
     * @experimental
     */
    post(method: 'Debugger.setBlackboxPatterns', params?: Debugger.SetBlackboxPatternsParameterType): Promise<void>;
    /**
     * Makes backend skip steps in the script in blackboxed ranges. VM will try leave blacklisted scripts by performing 'step in' several times, finally resorting to 'step out' if unsuccessful. Positions array contains positions where blackbox state is changed. First interval isn't blackboxed. Array should be sorted.
     * @experimental
     */
    post(method: 'Debugger.setBlackboxedRanges', params?: Debugger.SetBlackboxedRangesParameterType): Promise<void>;
    /**
     * Enables console domain, sends the messages collected so far to the client by means of the <code>messageAdded</code> notification.
     */
    post(method: 'Console.enable'): Promise<void>;
    /**
     * Disables console domain, prevents further console messages from being reported to the client.
     */
    post(method: 'Console.disable'): Promise<void>;
    /**
     * Does nothing.
     */
    post(method: 'Console.clearMessages'): Promise<void>;
    post(method: 'Profiler.enable'): Promise<void>;
    post(method: 'Profiler.disable'): Promise<void>;
    /**
     * Changes CPU profiler sampling interval. Must be called before CPU profiles recording started.
     */
    post(method: 'Profiler.setSamplingInterval', params?: Profiler.SetSamplingIntervalParameterType): Promise<void>;
    post(method: 'Profiler.start'): Promise<void>;
    post(method: 'Profiler.stop'): Promise<Profiler.StopReturnType>;
    /**
     * Enable precise code coverage. Coverage data for JavaScript executed before enabling precise code coverage may be incomplete. Enabling prevents running optimized code and resets execution counters.
     */
    post(method: 'Profiler.startPreciseCoverage', params?: Profiler.StartPreciseCoverageParameterType): Promise<void>;
    /**
     * Disable precise code coverage. Disabling releases unnecessary execution count records and allows executing optimized code.
     */
    post(method: 'Profiler.stopPreciseCoverage'): Promise<void>;
    /**
     * Collect coverage data for the current isolate, and resets execution counters. Precise code coverage needs to have started.
     */
    post(method: 'Profiler.takePreciseCoverage'): Promise<Profiler.TakePreciseCoverageReturnType>;
    /**
     * Collect coverage data for the current isolate. The coverage data may be incomplete due to garbage collection.
     */
    post(method: 'Profiler.getBestEffortCoverage'): Promise<Profiler.GetBestEffortCoverageReturnType>;
    post(method: 'HeapProfiler.enable'): Promise<void>;
    post(method: 'HeapProfiler.disable'): Promise<void>;
    post(method: 'HeapProfiler.startTrackingHeapObjects', params?: HeapProfiler.StartTrackingHeapObjectsParameterType): Promise<void>;
    post(method: 'HeapProfiler.stopTrackingHeapObjects', params?: HeapProfiler.StopTrackingHeapObjectsParameterType): Promise<void>;
    post(method: 'HeapProfiler.takeHeapSnapshot', params?: HeapProfiler.TakeHeapSnapshotParameterType): Promise<void>;
    post(method: 'HeapProfiler.collectGarbage'): Promise<void>;
    post(method: 'HeapProfiler.getObjectByHeapObjectId', params?: HeapProfiler.GetObjectByHeapObjectIdParameterType): Promise<HeapProfiler.GetObjectByHeapObjectIdReturnType>;
    /**
     * Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions).
     */
    post(method: 'HeapProfiler.addInspectedHeapObject', params?: HeapProfiler.AddInspectedHeapObjectParameterType): Promise<void>;
    post(method: 'HeapProfiler.getHeapObjectId', params?: HeapProfiler.GetHeapObjectIdParameterType): Promise<HeapProfiler.GetHeapObjectIdReturnType>;
    post(method: 'HeapProfiler.startSampling', params?: HeapProfiler.StartSamplingParameterType): Promise<void>;
    post(method: 'HeapProfiler.stopSampling'): Promise<HeapProfiler.StopSamplingReturnType>;
    post(method: 'HeapProfiler.getSamplingProfile'): Promise<HeapProfiler.GetSamplingProfileReturnType>;
    /**
     * Gets supported tracing categories.
     */
    post(method: 'NodeTracing.getCategories'): Promise<NodeTracing.GetCategoriesReturnType>;
    /**
     * Start trace events collection.
     */
    post(method: 'NodeTracing.start', params?: NodeTracing.StartParameterType): Promise<void>;
    /**
     * Stop trace events collection. Remaining collected events will be sent as a sequence of
     * dataCollected events followed by tracingComplete event.
     */
    post(method: 'NodeTracing.stop'): Promise<void>;
    /**
     * Sends protocol message over session with given id.
     */
    post(method: 'NodeWorker.sendMessageToWorker', params?: NodeWorker.SendMessageToWorkerParameterType): Promise<void>;
    /**
     * Instructs the inspector to attach to running workers. Will also attach to new workers
     * as they start
     */
    post(method: 'NodeWorker.enable', params?: NodeWorker.EnableParameterType): Promise<void>;
    /**
     * Detaches from all running workers and disables attaching to new workers as they are started.
     */
    post(method: 'NodeWorker.disable'): Promise<void>;
    /**
     * Detached from the worker with given sessionId.
     */
    post(method: 'NodeWorker.detach', params?: NodeWorker.DetachParameterType): Promise<void>;
    /**
     * Disables network tracking, prevents network events from being sent to the client.
     */
    post(method: 'Network.disable'): Promise<void>;
    /**
     * Enables network tracking, network events will now be delivered to the client.
     */
    post(method: 'Network.enable'): Promise<void>;
    /**
     * Enable the NodeRuntime events except by `NodeRuntime.waitingForDisconnect`.
     */
    post(method: 'NodeRuntime.enable'): Promise<void>;
    /**
     * Disable NodeRuntime events
     */
    post(method: 'NodeRuntime.disable'): Promise<void>;
    /**
     * Enable the `NodeRuntime.waitingForDisconnect`.
     */
    post(method: 'NodeRuntime.notifyWhenWaitingForDisconnect', params?: NodeRuntime.NotifyWhenWaitingForDisconnectParameterType): Promise<void>;

    addListener(event: string, listener: (...args: any[]) => void): this;
    /**
     * Emitted when any notification from the V8 Inspector is received.
     */
    addListener(event: 'inspectorNotification', listener: (message: InspectorNotification<object>) => void): this;
    /**
     * Issued when new execution context is created.
     */
    addListener(event: 'Runtime.executionContextCreated', listener: (message: InspectorNotification<Runtime.ExecutionContextCreatedEventDataType>) => void): this;
    /**
     * Issued when execution context is destroyed.
     */
    addListener(event: 'Runtime.executionContextDestroyed', listener: (message: InspectorNotification<Runtime.ExecutionContextDestroyedEventDataType>) => void): this;
    /**
     * Issued when all executionContexts were cleared in browser
     */
    addListener(event: 'Runtime.executionContextsCleared', listener: () => void): this;
    /**
     * Issued when exception was thrown and unhandled.
     */
    addListener(event: 'Runtime.exceptionThrown', listener: (message: InspectorNotification<Runtime.ExceptionThrownEventDataType>) => void): this;
    /**
     * Issued when unhandled exception was revoked.
     */
    addListener(event: 'Runtime.exceptionRevoked', listener: (message: InspectorNotification<Runtime.ExceptionRevokedEventDataType>) => void): this;
    /**
     * Issued when console API was called.
     */
    addListener(event: 'Runtime.consoleAPICalled', listener: (message: InspectorNotification<Runtime.ConsoleAPICalledEventDataType>) => void): this;
    /**
     * Issued when object should be inspected (for example, as a result of inspect() command line API call).
     */
    addListener(event: 'Runtime.inspectRequested', listener: (message: InspectorNotification<Runtime.InspectRequestedEventDataType>) => void): this;
    /**
     * Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger.
     */
    addListener(event: 'Debugger.scriptParsed', listener: (message: InspectorNotification<Debugger.ScriptParsedEventDataType>) => void): this;
    /**
     * Fired when virtual machine fails to parse the script.
     */
    addListener(event: 'Debugger.scriptFailedToParse', listener: (message: InspectorNotification<Debugger.ScriptFailedToParseEventDataType>) => void): this;
    /**
     * Fired when breakpoint is resolved to an actual script and location.
     */
    addListener(event: 'Debugger.breakpointResolved', listener: (message: InspectorNotification<Debugger.BreakpointResolvedEventDataType>) => void): this;
    /**
     * Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
     */
    addListener(event: 'Debugger.paused', listener: (message: InspectorNotification<Debugger.PausedEventDataType>) => void): this;
    /**
     * Fired when the virtual machine resumed execution.
     */
    addListener(event: 'Debugger.resumed', listener: () => void): this;
    /**
     * Issued when new console message is added.
     */
    addListener(event: 'Console.messageAdded', listener: (message: InspectorNotification<Console.MessageAddedEventDataType>) => void): this;
    /**
     * Sent when new profile recording is started using console.profile() call.
     */
    addListener(event: 'Profiler.consoleProfileStarted', listener: (message: InspectorNotification<Profiler.ConsoleProfileStartedEventDataType>) => void): this;
    addListener(event: 'Profiler.consoleProfileFinished', listener: (message: InspectorNotification<Profiler.ConsoleProfileFinishedEventDataType>) => void): this;
    addListener(event: 'HeapProfiler.addHeapSnapshotChunk', listener: (message: InspectorNotification<HeapProfiler.AddHeapSnapshotChunkEventDataType>) => void): this;
    addListener(event: 'HeapProfiler.resetProfiles', listener: () => void): this;
    addListener(event: 'HeapProfiler.reportHeapSnapshotProgress', listener: (message: InspectorNotification<HeapProfiler.ReportHeapSnapshotProgressEventDataType>) => void): this;
    /**
     * If heap objects tracking has been started then backend regularly sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.
     */
    addListener(event: 'HeapProfiler.lastSeenObjectId', listener: (message: InspectorNotification<HeapProfiler.LastSeenObjectIdEventDataType>) => void): this;
    /**
     * If heap objects tracking has been started then backend may send update for one or more fragments
     */
    addListener(event: 'HeapProfiler.heapStatsUpdate', listener: (message: InspectorNotification<HeapProfiler.HeapStatsUpdateEventDataType>) => void): this;
    /**
     * Contains an bucket of collected trace events.
     */
    addListener(event: 'NodeTracing.dataCollected', listener: (message: InspectorNotification<NodeTracing.DataCollectedEventDataType>) => void): this;
    /**
     * Signals that tracing is stopped and there is no trace buffers pending flush, all data were
     * delivered via dataCollected events.
     */
    addListener(event: 'NodeTracing.tracingComplete', listener: () => void): this;
    /**
     * Issued when attached to a worker.
     */
    addListener(event: 'NodeWorker.attachedToWorker', listener: (message: InspectorNotification<NodeWorker.AttachedToWorkerEventDataType>) => void): this;
    /**
     * Issued when detached from the worker.
     */
    addListener(event: 'NodeWorker.detachedFromWorker', listener: (message: InspectorNotification<NodeWorker.DetachedFromWorkerEventDataType>) => void): this;
    /**
     * Notifies about a new protocol message received from the session
     * (session ID is provided in attachedToWorker notification).
     */
    addListener(event: 'NodeWorker.receivedMessageFromWorker', listener: (message: InspectorNotification<NodeWorker.ReceivedMessageFromWorkerEventDataType>) => void): this;
    /**
     * Fired when page is about to send HTTP request.
     */
    addListener(event: 'Network.requestWillBeSent', listener: (message: InspectorNotification<Network.RequestWillBeSentEventDataType>) => void): this;
    /**
     * Fired when HTTP response is available.
     */
    addListener(event: 'Network.responseReceived', listener: (message: InspectorNotification<Network.ResponseReceivedEventDataType>) => void): this;
    addListener(event: 'Network.loadingFailed', listener: (message: InspectorNotification<Network.LoadingFailedEventDataType>) => void): this;
    addListener(event: 'Network.loadingFinished', listener: (message: InspectorNotification<Network.LoadingFinishedEventDataType>) => void): this;
    /**
     * This event is fired instead of `Runtime.executionContextDestroyed` when
     * enabled.
     * It is fired when the Node process finished all code execution and is
     * waiting for all frontends to disconnect.
     */
    addListener(event: 'NodeRuntime.waitingForDisconnect', listener: () => void): this;
    /**
     * This event is fired when the runtime is waiting for the debugger. For
     * example, when inspector.waitingForDebugger is called
     */
    addListener(event: 'NodeRuntime.waitingForDebugger', listener: () => void): this;
    emit(event: string | symbol, ...args: any[]): boolean;
    emit(event: 'inspectorNotification', message: InspectorNotification<object>): boolean;
    emit(event: 'Runtime.executionContextCreated', message: InspectorNotification<Runtime.ExecutionContextCreatedEventDataType>): boolean;
    emit(event: 'Runtime.executionContextDestroyed', message: InspectorNotification<Runtime.ExecutionContextDestroyedEventDataType>): boolean;
    emit(event: 'Runtime.executionContextsCleared'): boolean;
    emit(event: 'Runtime.exceptionThrown', message: InspectorNotification<Runtime.ExceptionThrownEventDataType>): boolean;
    emit(event: 'Runtime.exceptionRevoked', message: InspectorNotification<Runtime.ExceptionRevokedEventDataType>): boolean;
    emit(event: 'Runtime.consoleAPICalled', message: InspectorNotification<Runtime.ConsoleAPICalledEventDataType>): boolean;
    emit(event: 'Runtime.inspectRequested', message: InspectorNotification<Runtime.InspectRequestedEventDataType>): boolean;
    emit(event: 'Debugger.scriptParsed', message: InspectorNotification<Debugger.ScriptParsedEventDataType>): boolean;
    emit(event: 'Debugger.scriptFailedToParse', message: InspectorNotification<Debugger.ScriptFailedToParseEventDataType>): boolean;
    emit(event: 'Debugger.breakpointResolved', message: InspectorNotification<Debugger.BreakpointResolvedEventDataType>): boolean;
    emit(event: 'Debugger.paused', message: InspectorNotification<Debugger.PausedEventDataType>): boolean;
    emit(event: 'Debugger.resumed'): boolean;
    emit(event: 'Console.messageAdded', message: InspectorNotification<Console.MessageAddedEventDataType>): boolean;
    emit(event: 'Profiler.consoleProfileStarted', message: InspectorNotification<Profiler.ConsoleProfileStartedEventDataType>): boolean;
    emit(event: 'Profiler.consoleProfileFinished', message: InspectorNotification<Profiler.ConsoleProfileFinishedEventDataType>): boolean;
    emit(event: 'HeapProfiler.addHeapSnapshotChunk', message: InspectorNotification<HeapProfiler.AddHeapSnapshotChunkEventDataType>): boolean;
    emit(event: 'HeapProfiler.resetProfiles'): boolean;
    emit(event: 'HeapProfiler.reportHeapSnapshotProgress', message: InspectorNotification<HeapProfiler.ReportHeapSnapshotProgressEventDataType>): boolean;
    emit(event: 'HeapProfiler.lastSeenObjectId', message: InspectorNotification<HeapProfiler.LastSeenObjectIdEventDataType>): boolean;
    emit(event: 'HeapProfiler.heapStatsUpdate', message: InspectorNotification<HeapProfiler.HeapStatsUpdateEventDataType>): boolean;
    emit(event: 'NodeTracing.dataCollected', message: InspectorNotification<NodeTracing.DataCollectedEventDataType>): boolean;
    emit(event: 'NodeTracing.tracingComplete'): boolean;
    emit(event: 'NodeWorker.attachedToWorker', message: InspectorNotification<NodeWorker.AttachedToWorkerEventDataType>): boolean;
    emit(event: 'NodeWorker.detachedFromWorker', message: InspectorNotification<NodeWorker.DetachedFromWorkerEventDataType>): boolean;
    emit(event: 'NodeWorker.receivedMessageFromWorker', message: InspectorNotification<NodeWorker.ReceivedMessageFromWorkerEventDataType>): boolean;
    emit(event: 'Network.requestWillBeSent', message: InspectorNotification<Network.RequestWillBeSentEventDataType>): boolean;
    emit(event: 'Network.responseReceived', message: InspectorNotification<Network.ResponseReceivedEventDataType>): boolean;
    emit(event: 'Network.loadingFailed', message: InspectorNotification<Network.LoadingFailedEventDataType>): boolean;
    emit(event: 'Network.loadingFinished', message: InspectorNotification<Network.LoadingFinishedEventDataType>): boolean;
    emit(event: 'NodeRuntime.waitingForDisconnect'): boolean;
    emit(event: 'NodeRuntime.waitingForDebugger'): boolean;
    on(event: string, listener: (...args: any[]) => void): this;
    /**
     * Emitted when any notification from the V8 Inspector is received.
     */
    on(event: 'inspectorNotification', listener: (message: InspectorNotification<object>) => void): this;
    /**
     * Issued when new execution context is created.
     */
    on(event: 'Runtime.executionContextCreated', listener: (message: InspectorNotification<Runtime.ExecutionContextCreatedEventDataType>) => void): this;
    /**
     * Issued when execution context is destroyed.
     */
    on(event: 'Runtime.executionContextDestroyed', listener: (message: InspectorNotification<Runtime.ExecutionContextDestroyedEventDataType>) => void): this;
    /**
     * Issued when all executionContexts were cleared in browser
     */
    on(event: 'Runtime.executionContextsCleared', listener: () => void): this;
    /**
     * Issued when exception was thrown and unhandled.
     */
    on(event: 'Runtime.exceptionThrown', listener: (message: InspectorNotification<Runtime.ExceptionThrownEventDataType>) => void): this;
    /**
     * Issued when unhandled exception was revoked.
     */
    on(event: 'Runtime.exceptionRevoked', listener: (message: InspectorNotification<Runtime.ExceptionRevokedEventDataType>) => void): this;
    /**
     * Issued when console API was called.
     */
    on(event: 'Runtime.consoleAPICalled', listener: (message: InspectorNotification<Runtime.ConsoleAPICalledEventDataType>) => void): this;
    /**
     * Issued when object should be inspected (for example, as a result of inspect() command line API call).
     */
    on(event: 'Runtime.inspectRequested', listener: (message: InspectorNotification<Runtime.InspectRequestedEventDataType>) => void): this;
    /**
     * Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger.
     */
    on(event: 'Debugger.scriptParsed', listener: (message: InspectorNotification<Debugger.ScriptParsedEventDataType>) => void): this;
    /**
     * Fired when virtual machine fails to parse the script.
     */
    on(event: 'Debugger.scriptFailedToParse', listener: (message: InspectorNotification<Debugger.ScriptFailedToParseEventDataType>) => void): this;
    /**
     * Fired when breakpoint is resolved to an actual script and location.
     */
    on(event: 'Debugger.breakpointResolved', listener: (message: InspectorNotification<Debugger.BreakpointResolvedEventDataType>) => void): this;
    /**
     * Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
     */
    on(event: 'Debugger.paused', listener: (message: InspectorNotification<Debugger.PausedEventDataType>) => void): this;
    /**
     * Fired when the virtual machine resumed execution.
     */
    on(event: 'Debugger.resumed', listener: () => void): this;
    /**
     * Issued when new console message is added.
     */
    on(event: 'Console.messageAdded', listener: (message: InspectorNotification<Console.MessageAddedEventDataType>) => void): this;
    /**
     * Sent when new profile recording is started using console.profile() call.
     */
    on(event: 'Profiler.consoleProfileStarted', listener: (message: InspectorNotification<Profiler.ConsoleProfileStartedEventDataType>) => void): this;
    on(event: 'Profiler.consoleProfileFinished', listener: (message: InspectorNotification<Profiler.ConsoleProfileFinishedEventDataType>) => void): this;
    on(event: 'HeapProfiler.addHeapSnapshotChunk', listener: (message: InspectorNotification<HeapProfiler.AddHeapSnapshotChunkEventDataType>) => void): this;
    on(event: 'HeapProfiler.resetProfiles', listener: () => void): this;
    on(event: 'HeapProfiler.reportHeapSnapshotProgress', listener: (message: InspectorNotification<HeapProfiler.ReportHeapSnapshotProgressEventDataType>) => void): this;
    /**
     * If heap objects tracking has been started then backend regularly sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.
     */
    on(event: 'HeapProfiler.lastSeenObjectId', listener: (message: InspectorNotification<HeapProfiler.LastSeenObjectIdEventDataType>) => void): this;
    /**
     * If heap objects tracking has been started then backend may send update for one or more fragments
     */
    on(event: 'HeapProfiler.heapStatsUpdate', listener: (message: InspectorNotification<HeapProfiler.HeapStatsUpdateEventDataType>) => void): this;
    /**
     * Contains an bucket of collected trace events.
     */
    on(event: 'NodeTracing.dataCollected', listener: (message: InspectorNotification<NodeTracing.DataCollectedEventDataType>) => void): this;
    /**
     * Signals that tracing is stopped and there is no trace buffers pending flush, all data were
     * delivered via dataCollected events.
     */
    on(event: 'NodeTracing.tracingComplete', listener: () => void): this;
    /**
     * Issued when attached to a worker.
     */
    on(event: 'NodeWorker.attachedToWorker', listener: (message: InspectorNotification<NodeWorker.AttachedToWorkerEventDataType>) => void): this;
    /**
     * Issued when detached from the worker.
     */
    on(event: 'NodeWorker.detachedFromWorker', listener: (message: InspectorNotification<NodeWorker.DetachedFromWorkerEventDataType>) => void): this;
    /**
     * Notifies about a new protocol message received from the session
     * (session ID is provided in attachedToWorker notification).
     */
    on(event: 'NodeWorker.receivedMessageFromWorker', listener: (message: InspectorNotification<NodeWorker.ReceivedMessageFromWorkerEventDataType>) => void): this;
    /**
     * Fired when page is about to send HTTP request.
     */
    on(event: 'Network.requestWillBeSent', listener: (message: InspectorNotification<Network.RequestWillBeSentEventDataType>) => void): this;
    /**
     * Fired when HTTP response is available.
     */
    on(event: 'Network.responseReceived', listener: (message: InspectorNotification<Network.ResponseReceivedEventDataType>) => void): this;
    on(event: 'Network.loadingFailed', listener: (message: InspectorNotification<Network.LoadingFailedEventDataType>) => void): this;
    on(event: 'Network.loadingFinished', listener: (message: InspectorNotification<Network.LoadingFinishedEventDataType>) => void): this;
    /**
     * This event is fired instead of `Runtime.executionContextDestroyed` when
     * enabled.
     * It is fired when the Node process finished all code execution and is
     * waiting for all frontends to disconnect.
     */
    on(event: 'NodeRuntime.waitingForDisconnect', listener: () => void): this;
    /**
     * This event is fired when the runtime is waiting for the debugger. For
     * example, when inspector.waitingForDebugger is called
     */
    on(event: 'NodeRuntime.waitingForDebugger', listener: () => void): this;
    once(event: string, listener: (...args: any[]) => void): this;
    /**
     * Emitted when any notification from the V8 Inspector is received.
     */
    once(event: 'inspectorNotification', listener: (message: InspectorNotification<object>) => void): this;
    /**
     * Issued when new execution context is created.
     */
    once(event: 'Runtime.executionContextCreated', listener: (message: InspectorNotification<Runtime.ExecutionContextCreatedEventDataType>) => void): this;
    /**
     * Issued when execution context is destroyed.
     */
    once(event: 'Runtime.executionContextDestroyed', listener: (message: InspectorNotification<Runtime.ExecutionContextDestroyedEventDataType>) => void): this;
    /**
     * Issued when all executionContexts were cleared in browser
     */
    once(event: 'Runtime.executionContextsCleared', listener: () => void): this;
    /**
     * Issued when exception was thrown and unhandled.
     */
    once(event: 'Runtime.exceptionThrown', listener: (message: InspectorNotification<Runtime.ExceptionThrownEventDataType>) => void): this;
    /**
     * Issued when unhandled exception was revoked.
     */
    once(event: 'Runtime.exceptionRevoked', listener: (message: InspectorNotification<Runtime.ExceptionRevokedEventDataType>) => void): this;
    /**
     * Issued when console API was called.
     */
    once(event: 'Runtime.consoleAPICalled', listener: (message: InspectorNotification<Runtime.ConsoleAPICalledEventDataType>) => void): this;
    /**
     * Issued when object should be inspected (for example, as a result of inspect() command line API call).
     */
    once(event: 'Runtime.inspectRequested', listener: (message: InspectorNotification<Runtime.InspectRequestedEventDataType>) => void): this;
    /**
     * Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger.
     */
    once(event: 'Debugger.scriptParsed', listener: (message: InspectorNotification<Debugger.ScriptParsedEventDataType>) => void): this;
    /**
     * Fired when virtual machine fails to parse the script.
     */
    once(event: 'Debugger.scriptFailedToParse', listener: (message: InspectorNotification<Debugger.ScriptFailedToParseEventDataType>) => void): this;
    /**
     * Fired when breakpoint is resolved to an actual script and location.
     */
    once(event: 'Debugger.breakpointResolved', listener: (message: InspectorNotification<Debugger.BreakpointResolvedEventDataType>) => void): this;
    /**
     * Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
     */
    once(event: 'Debugger.paused', listener: (message: InspectorNotification<Debugger.PausedEventDataType>) => void): this;
    /**
     * Fired when the virtual machine resumed execution.
     */
    once(event: 'Debugger.resumed', listener: () => void): this;
    /**
     * Issued when new console message is added.
     */
    once(event: 'Console.messageAdded', listener: (message: InspectorNotification<Console.MessageAddedEventDataType>) => void): this;
    /**
     * Sent when new profile recording is started using console.profile() call.
     */
    once(event: 'Profiler.consoleProfileStarted', listener: (message: InspectorNotification<Profiler.ConsoleProfileStartedEventDataType>) => void): this;
    once(event: 'Profiler.consoleProfileFinished', listener: (message: InspectorNotification<Profiler.ConsoleProfileFinishedEventDataType>) => void): this;
    once(event: 'HeapProfiler.addHeapSnapshotChunk', listener: (message: InspectorNotification<HeapProfiler.AddHeapSnapshotChunkEventDataType>) => void): this;
    once(event: 'HeapProfiler.resetProfiles', listener: () => void): this;
    once(event: 'HeapProfiler.reportHeapSnapshotProgress', listener: (message: InspectorNotification<HeapProfiler.ReportHeapSnapshotProgressEventDataType>) => void): this;
    /**
     * If heap objects tracking has been started then backend regularly sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.
     */
    once(event: 'HeapProfiler.lastSeenObjectId', listener: (message: InspectorNotification<HeapProfiler.LastSeenObjectIdEventDataType>) => void): this;
    /**
     * If heap objects tracking has been started then backend may send update for one or more fragments
     */
    once(event: 'HeapProfiler.heapStatsUpdate', listener: (message: InspectorNotification<HeapProfiler.HeapStatsUpdateEventDataType>) => void): this;
    /**
     * Contains an bucket of collected trace events.
     */
    once(event: 'NodeTracing.dataCollected', listener: (message: InspectorNotification<NodeTracing.DataCollectedEventDataType>) => void): this;
    /**
     * Signals that tracing is stopped and there is no trace buffers pending flush, all data were
     * delivered via dataCollected events.
     */
    once(event: 'NodeTracing.tracingComplete', listener: () => void): this;
    /**
     * Issued when attached to a worker.
     */
    once(event: 'NodeWorker.attachedToWorker', listener: (message: InspectorNotification<NodeWorker.AttachedToWorkerEventDataType>) => void): this;
    /**
     * Issued when detached from the worker.
     */
    once(event: 'NodeWorker.detachedFromWorker', listener: (message: InspectorNotification<NodeWorker.DetachedFromWorkerEventDataType>) => void): this;
    /**
     * Notifies about a new protocol message received from the session
     * (session ID is provided in attachedToWorker notification).
     */
    once(event: 'NodeWorker.receivedMessageFromWorker', listener: (message: InspectorNotification<NodeWorker.ReceivedMessageFromWorkerEventDataType>) => void): this;
    /**
     * Fired when page is about to send HTTP request.
     */
    once(event: 'Network.requestWillBeSent', listener: (message: InspectorNotification<Network.RequestWillBeSentEventDataType>) => void): this;
    /**
     * Fired when HTTP response is available.
     */
    once(event: 'Network.responseReceived', listener: (message: InspectorNotification<Network.ResponseReceivedEventDataType>) => void): this;
    once(event: 'Network.loadingFailed', listener: (message: InspectorNotification<Network.LoadingFailedEventDataType>) => void): this;
    once(event: 'Network.loadingFinished', listener: (message: InspectorNotification<Network.LoadingFinishedEventDataType>) => void): this;
    /**
     * This event is fired instead of `Runtime.executionContextDestroyed` when
     * enabled.
     * It is fired when the Node process finished all code execution and is
     * waiting for all frontends to disconnect.
     */
    once(event: 'NodeRuntime.waitingForDisconnect', listener: () => void): this;
    /**
     * This event is fired when the runtime is waiting for the debugger. For
     * example, when inspector.waitingForDebugger is called
     */
    once(event: 'NodeRuntime.waitingForDebugger', listener: () => void): this;
    prependListener(event: string, listener: (...args: any[]) => void): this;
    /**
     * Emitted when any notification from the V8 Inspector is received.
     */
    prependListener(event: 'inspectorNotification', listener: (message: InspectorNotification<object>) => void): this;
    /**
     * Issued when new execution context is created.
     */
    prependListener(event: 'Runtime.executionContextCreated', listener: (message: InspectorNotification<Runtime.ExecutionContextCreatedEventDataType>) => void): this;
    /**
     * Issued when execution context is destroyed.
     */
    prependListener(event: 'Runtime.executionContextDestroyed', listener: (message: InspectorNotification<Runtime.ExecutionContextDestroyedEventDataType>) => void): this;
    /**
     * Issued when all executionContexts were cleared in browser
     */
    prependListener(event: 'Runtime.executionContextsCleared', listener: () => void): this;
    /**
     * Issued when exception was thrown and unhandled.
     */
    prependListener(event: 'Runtime.exceptionThrown', listener: (message: InspectorNotification<Runtime.ExceptionThrownEventDataType>) => void): this;
    /**
     * Issued when unhandled exception was revoked.
     */
    prependListener(event: 'Runtime.exceptionRevoked', listener: (message: InspectorNotification<Runtime.ExceptionRevokedEventDataType>) => void): this;
    /**
     * Issued when console API was called.
     */
    prependListener(event: 'Runtime.consoleAPICalled', listener: (message: InspectorNotification<Runtime.ConsoleAPICalledEventDataType>) => void): this;
    /**
     * Issued when object should be inspected (for example, as a result of inspect() command line API call).
     */
    prependListener(event: 'Runtime.inspectRequested', listener: (message: InspectorNotification<Runtime.InspectRequestedEventDataType>) => void): this;
    /**
     * Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger.
     */
    prependListener(event: 'Debugger.scriptParsed', listener: (message: InspectorNotification<Debugger.ScriptParsedEventDataType>) => void): this;
    /**
     * Fired when virtual machine fails to parse the script.
     */
    prependListener(event: 'Debugger.scriptFailedToParse', listener: (message: InspectorNotification<Debugger.ScriptFailedToParseEventDataType>) => void): this;
    /**
     * Fired when breakpoint is resolved to an actual script and location.
     */
    prependListener(event: 'Debugger.breakpointResolved', listener: (message: InspectorNotification<Debugger.BreakpointResolvedEventDataType>) => void): this;
    /**
     * Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
     */
    prependListener(event: 'Debugger.paused', listener: (message: InspectorNotification<Debugger.PausedEventDataType>) => void): this;
    /**
     * Fired when the virtual machine resumed execution.
     */
    prependListener(event: 'Debugger.resumed', listener: () => void): this;
    /**
     * Issued when new console message is added.
     */
    prependListener(event: 'Console.messageAdded', listener: (message: InspectorNotification<Console.MessageAddedEventDataType>) => void): this;
    /**
     * Sent when new profile recording is started using console.profile() call.
     */
    prependListener(event: 'Profiler.consoleProfileStarted', listener: (message: InspectorNotification<Profiler.ConsoleProfileStartedEventDataType>) => void): this;
    prependListener(event: 'Profiler.consoleProfileFinished', listener: (message: InspectorNotification<Profiler.ConsoleProfileFinishedEventDataType>) => void): this;
    prependListener(event: 'HeapProfiler.addHeapSnapshotChunk', listener: (message: InspectorNotification<HeapProfiler.AddHeapSnapshotChunkEventDataType>) => void): this;
    prependListener(event: 'HeapProfiler.resetProfiles', listener: () => void): this;
    prependListener(event: 'HeapProfiler.reportHeapSnapshotProgress', listener: (message: InspectorNotification<HeapProfiler.ReportHeapSnapshotProgressEventDataType>) => void): this;
    /**
     * If heap objects tracking has been started then backend regularly sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.
     */
    prependListener(event: 'HeapProfiler.lastSeenObjectId', listener: (message: InspectorNotification<HeapProfiler.LastSeenObjectIdEventDataType>) => void): this;
    /**
     * If heap objects tracking has been started then backend may send update for one or more fragments
     */
    prependListener(event: 'HeapProfiler.heapStatsUpdate', listener: (message: InspectorNotification<HeapProfiler.HeapStatsUpdateEventDataType>) => void): this;
    /**
     * Contains an bucket of collected trace events.
     */
    prependListener(event: 'NodeTracing.dataCollected', listener: (message: InspectorNotification<NodeTracing.DataCollectedEventDataType>) => void): this;
    /**
     * Signals that tracing is stopped and there is no trace buffers pending flush, all data were
     * delivered via dataCollected events.
     */
    prependListener(event: 'NodeTracing.tracingComplete', listener: () => void): this;
    /**
     * Issued when attached to a worker.
     */
    prependListener(event: 'NodeWorker.attachedToWorker', listener: (message: InspectorNotification<NodeWorker.AttachedToWorkerEventDataType>) => void): this;
    /**
     * Issued when detached from the worker.
     */
    prependListener(event: 'NodeWorker.detachedFromWorker', listener: (message: InspectorNotification<NodeWorker.DetachedFromWorkerEventDataType>) => void): this;
    /**
     * Notifies about a new protocol message received from the session
     * (session ID is provided in attachedToWorker notification).
     */
    prependListener(event: 'NodeWorker.receivedMessageFromWorker', listener: (message: InspectorNotification<NodeWorker.ReceivedMessageFromWorkerEventDataType>) => void): this;
    /**
     * Fired when page is about to send HTTP request.
     */
    prependListener(event: 'Network.requestWillBeSent', listener: (message: InspectorNotification<Network.RequestWillBeSentEventDataType>) => void): this;
    /**
     * Fired when HTTP response is available.
     */
    prependListener(event: 'Network.responseReceived', listener: (message: InspectorNotification<Network.ResponseReceivedEventDataType>) => void): this;
    prependListener(event: 'Network.loadingFailed', listener: (message: InspectorNotification<Network.LoadingFailedEventDataType>) => void): this;
    prependListener(event: 'Network.loadingFinished', listener: (message: InspectorNotification<Network.LoadingFinishedEventDataType>) => void): this;
    /**
     * This event is fired instead of `Runtime.executionContextDestroyed` when
     * enabled.
     * It is fired when the Node process finished all code execution and is
     * waiting for all frontends to disconnect.
     */
    prependListener(event: 'NodeRuntime.waitingForDisconnect', listener: () => void): this;
    /**
     * This event is fired when the runtime is waiting for the debugger. For
     * example, when inspector.waitingForDebugger is called
     */
    prependListener(event: 'NodeRuntime.waitingForDebugger', listener: () => void): this;
    prependOnceListener(event: string, listener: (...args: any[]) => void): this;
    /**
     * Emitted when any notification from the V8 Inspector is received.
     */
    prependOnceListener(event: 'inspectorNotification', listener: (message: InspectorNotification<object>) => void): this;
    /**
     * Issued when new execution context is created.
     */
    prependOnceListener(event: 'Runtime.executionContextCreated', listener: (message: InspectorNotification<Runtime.ExecutionContextCreatedEventDataType>) => void): this;
    /**
     * Issued when execution context is destroyed.
     */
    prependOnceListener(event: 'Runtime.executionContextDestroyed', listener: (message: InspectorNotification<Runtime.ExecutionContextDestroyedEventDataType>) => void): this;
    /**
     * Issued when all executionContexts were cleared in browser
     */
    prependOnceListener(event: 'Runtime.executionContextsCleared', listener: () => void): this;
    /**
     * Issued when exception was thrown and unhandled.
     */
    prependOnceListener(event: 'Runtime.exceptionThrown', listener: (message: InspectorNotification<Runtime.ExceptionThrownEventDataType>) => void): this;
    /**
     * Issued when unhandled exception was revoked.
     */
    prependOnceListener(event: 'Runtime.exceptionRevoked', listener: (message: InspectorNotification<Runtime.ExceptionRevokedEventDataType>) => void): this;
    /**
     * Issued when console API was called.
     */
    prependOnceListener(event: 'Runtime.consoleAPICalled', listener: (message: InspectorNotification<Runtime.ConsoleAPICalledEventDataType>) => void): this;
    /**
     * Issued when object should be inspected (for example, as a result of inspect() command line API call).
     */
    prependOnceListener(event: 'Runtime.inspectRequested', listener: (message: InspectorNotification<Runtime.InspectRequestedEventDataType>) => void): this;
    /**
     * Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger.
     */
    prependOnceListener(event: 'Debugger.scriptParsed', listener: (message: InspectorNotification<Debugger.ScriptParsedEventDataType>) => void): this;
    /**
     * Fired when virtual machine fails to parse the script.
     */
    prependOnceListener(event: 'Debugger.scriptFailedToParse', listener: (message: InspectorNotification<Debugger.ScriptFailedToParseEventDataType>) => void): this;
    /**
     * Fired when breakpoint is resolved to an actual script and location.
     */
    prependOnceListener(event: 'Debugger.breakpointResolved', listener: (message: InspectorNotification<Debugger.BreakpointResolvedEventDataType>) => void): this;
    /**
     * Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
     */
    prependOnceListener(event: 'Debugger.paused', listener: (message: InspectorNotification<Debugger.PausedEventDataType>) => void): this;
    /**
     * Fired when the virtual machine resumed execution.
     */
    prependOnceListener(event: 'Debugger.resumed', listener: () => void): this;
    /**
     * Issued when new console message is added.
     */
    prependOnceListener(event: 'Console.messageAdded', listener: (message: InspectorNotification<Console.MessageAddedEventDataType>) => void): this;
    /**
     * Sent when new profile recording is started using console.profile() call.
     */
    prependOnceListener(event: 'Profiler.consoleProfileStarted', listener: (message: InspectorNotification<Profiler.ConsoleProfileStartedEventDataType>) => void): this;
    prependOnceListener(event: 'Profiler.consoleProfileFinished', listener: (message: InspectorNotification<Profiler.ConsoleProfileFinishedEventDataType>) => void): this;
    prependOnceListener(event: 'HeapProfiler.addHeapSnapshotChunk', listener: (message: InspectorNotification<HeapProfiler.AddHeapSnapshotChunkEventDataType>) => void): this;
    prependOnceListener(event: 'HeapProfiler.resetProfiles', listener: () => void): this;
    prependOnceListener(event: 'HeapProfiler.reportHeapSnapshotProgress', listener: (message: InspectorNotification<HeapProfiler.ReportHeapSnapshotProgressEventDataType>) => void): this;
    /**
     * If heap objects tracking has been started then backend regularly sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.
     */
    prependOnceListener(event: 'HeapProfiler.lastSeenObjectId', listener: (message: InspectorNotification<HeapProfiler.LastSeenObjectIdEventDataType>) => void): this;
    /**
     * If heap objects tracking has been started then backend may send update for one or more fragments
     */
    prependOnceListener(event: 'HeapProfiler.heapStatsUpdate', listener: (message: InspectorNotification<HeapProfiler.HeapStatsUpdateEventDataType>) => void): this;
    /**
     * Contains an bucket of collected trace events.
     */
    prependOnceListener(event: 'NodeTracing.dataCollected', listener: (message: InspectorNotification<NodeTracing.DataCollectedEventDataType>) => void): this;
    /**
     * Signals that tracing is stopped and there is no trace buffers pending flush, all data were
     * delivered via dataCollected events.
     */
    prependOnceListener(event: 'NodeTracing.tracingComplete', listener: () => void): this;
    /**
     * Issued when attached to a worker.
     */
    prependOnceListener(event: 'NodeWorker.attachedToWorker', listener: (message: InspectorNotification<NodeWorker.AttachedToWorkerEventDataType>) => void): this;
    /**
     * Issued when detached from the worker.
     */
    prependOnceListener(event: 'NodeWorker.detachedFromWorker', listener: (message: InspectorNotification<NodeWorker.DetachedFromWorkerEventDataType>) => void): this;
    /**
     * Notifies about a new protocol message received from the session
     * (session ID is provided in attachedToWorker notification).
     */
    prependOnceListener(event: 'NodeWorker.receivedMessageFromWorker', listener: (message: InspectorNotification<NodeWorker.ReceivedMessageFromWorkerEventDataType>) => void): this;
    /**
     * Fired when page is about to send HTTP request.
     */
    prependOnceListener(event: 'Network.requestWillBeSent', listener: (message: InspectorNotification<Network.RequestWillBeSentEventDataType>) => void): this;
    /**
     * Fired when HTTP response is available.
     */
    prependOnceListener(event: 'Network.responseReceived', listener: (message: InspectorNotification<Network.ResponseReceivedEventDataType>) => void): this;
    prependOnceListener(event: 'Network.loadingFailed', listener: (message: InspectorNotification<Network.LoadingFailedEventDataType>) => void): this;
    prependOnceListener(event: 'Network.loadingFinished', listener: (message: InspectorNotification<Network.LoadingFinishedEventDataType>) => void): this;
    /**
     * This event is fired instead of `Runtime.executionContextDestroyed` when
     * enabled.
     * It is fired when the Node process finished all code execution and is
     * waiting for all frontends to disconnect.
     */
    prependOnceListener(event: 'NodeRuntime.waitingForDisconnect', listener: () => void): this;
    /**
     * This event is fired when the runtime is waiting for the debugger. For
     * example, when inspector.waitingForDebugger is called
     */
    prependOnceListener(event: 'NodeRuntime.waitingForDebugger', listener: () => void): this;
}

export {
    Session,
    open,
    close,
    url,
    waitForDebugger,
    console,
    InspectorNotification,
    Schema,
    Runtime,
    Debugger,
    Console,
    Profiler,
    HeapProfiler,
    NodeTracing,
    NodeWorker,
    Network,
    NodeRuntime,
};