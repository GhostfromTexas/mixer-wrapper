/// <reference types="node" />
import { ReconnectionPolicy } from './reconnection';
import { EventEmitter } from 'events';
import { Packet } from './packets';
/**
 * The GzipDetector is used to determine whether packets should be compressed
 * before sending to Constellation.
 */
export interface GzipDetector {
    /**
     * shouldZip returns true if the packet, encoded as a string, should
     * be gzipped before sending to Constellation.
     * @param {string} packet `raw` encoded as a string
     * @param {any}    raw    the JSON-serializable object to be sent
     */
    shouldZip(packet: string, raw: any): boolean;
}
/**
 * SizeThresholdGzipDetector is a GzipDetector which zips all packets longer
 * than a certain number of bytes.
 */
export declare class SizeThresholdGzipDetector implements GzipDetector {
    private threshold;
    constructor(threshold: number);
    shouldZip(packet: string): boolean;
}
/**
 * SocketOptions are passed to the
 */
export interface SocketOptions {
    isBot?: boolean;
    userAgent?: string;
    reconnectionPolicy?: ReconnectionPolicy;
    autoReconnect?: boolean;
    url?: string;
    gzip?: GzipDetector;
    jwt?: string;
    authToken?: string;
    replyTimeout?: number;
    pingInterval?: number;
}
/**
 * State is used to record the status of the websocket connection.
 */
export declare enum State {
    Idle = 1,
    Connecting = 2,
    Connected = 3,
    Closing = 4,
    Reconnecting = 5,
    Refreshing = 6,
}
/**
 * The ConstellationSocket provides a somewhat low-level RPC framework for
 * interacting with Constellation over a websocket. It also provides
 * reconnection logic.
 */
export declare class ConstellationSocket extends EventEmitter {
    static WebSocket: any;
    private reconnectTimeout;
    private pingTimeout;
    private options;
    private state;
    private socket;
    constructor(options?: SocketOptions);
    /**
     * Set the given options.
     * Defaults and previous option values will be used if not supplied.
     */
    setOptions(options: SocketOptions): void;
    /**
     * Open a new socket connection. By default, the socket will auto
     * connect when creating a new instance.
     */
    connect(): this;
    /**
     * Returns the current state of the socket.
     * @return {State}
     */
    getState(): State;
    /**
     * Close gracefully shuts down the websocket.
     */
    close(): void;
    /**
     * Executes an RPC method on the server. Returns a promise which resolves
     * after it completes, or after a timeout occurs.
     */
    execute(method: string, params?: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Send emits a packet over the websocket.
     */
    send(packet: Packet): Promise<any>;
    private setState(state);
    private sendPacketInner(packet);
    private extractMessage(packet);
    private rebroadcastEvent(name);
    private schedulePing();
}
