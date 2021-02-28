import { CredentialsStrategy } from './credentials';
declare type GraphQLBody<TInput = any> = {
    operationName: string;
    query: string;
    variables: TInput;
};
declare type GraphQLOptions = {
    ignoreErrors?: boolean;
};
export declare class GraphQLGateway {
    private credentialsStrategy;
    private uri;
    private region;
    constructor(credentialsStrategy: CredentialsStrategy, url?: string, region?: string);
    runQuery<TResult, TInput>(body: GraphQLBody, options?: GraphQLOptions): Promise<TResult>;
}
export {};
