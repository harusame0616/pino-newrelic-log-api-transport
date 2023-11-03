/// <reference types="node" />
import build from 'pino-abstract-transport';
export declare const endpointEnum: {
    eu: string;
    us: string;
    fedRAMP: string;
};
type EndpointEnum = typeof endpointEnum;
type Endpoint = EndpointEnum[keyof EndpointEnum];
export type NewrelicLogAPITransportOption = {
    licenseKey?: string;
    endpoint: Endpoint | string;
    headerLessAuth?: boolean;
};
export default function newRelicTransport({ licenseKey, endpoint, headerLessAuth, }: NewrelicLogAPITransportOption): Promise<import("stream").Transform & build.OnUnknown>;
export {};
