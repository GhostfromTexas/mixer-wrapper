/// <reference types="node" />
import { EventEmitter } from 'events';
export declare enum PacketState {
    Pending = 1,
    Sending = 2,
    Replied = 3,
}
/**
 * A Packet is a data type that can be sent over the wire to Constellation.
 */
export declare class Packet extends EventEmitter {
    private static packetIncr;
    private state;
    private timeout;
    private data;
    constructor(method: string, params: {
        [key: string]: any;
    });
    /**
     * Returns the randomly-assigned numeric ID of the packet.
     * @return {number}
     */
    id(): number;
    /**
     * toJSON implements is called in JSON.stringify.
     */
    toJSON(): {
        [key: string]: any;
    };
    /**
     * Sets the timeout duration on the packet. It defaults to the socket's
     * timeout duration.
     */
    setTimeout(duration: number): void;
    /**
     * Returns the packet's timeout duration, or the default if undefined.
     */
    getTimeout(defaultTimeout: number): number;
    /**
     * Returns the current state of the packet.
     * @return {PacketState}
     */
    getState(): PacketState;
    /**
     * Updates the state of the packet.
     * @param {PacketState} state
     */
    setState(state: PacketState): void;
}
/**
 * Call represents a Constellation method call.
 */
export declare class Call extends Packet {
}
