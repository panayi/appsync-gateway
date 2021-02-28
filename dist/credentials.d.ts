import AWS from 'aws-sdk';
export interface CredentialsStrategy {
    sign(httpRequest: AWS.HttpRequest): Promise<void>;
}
export declare function getAWSDate(): Date;
export declare function signRequest(request: any, credentials: any): void;
export declare class GlobalCredentialsStrategy implements CredentialsStrategy {
    sign(httpRequest: AWS.HttpRequest): Promise<void>;
}
export declare class IAMCredentialsStrategy implements CredentialsStrategy {
    private credentials;
    constructor(key?: string, accessKey?: string, session?: string, region?: string);
    sign(httpRequest: AWS.HttpRequest): Promise<void>;
}
export declare class AuthHeaderCredentialsStrategy implements CredentialsStrategy {
    private authHeader;
    constructor(authHeader: string);
    sign(httpRequest: AWS.HttpRequest): Promise<void>;
}
export declare class APIKeyCredentialsStrategy implements CredentialsStrategy {
    private apiKey;
    constructor(apiKey: string);
    sign(httpRequest: AWS.HttpRequest): Promise<void>;
}
