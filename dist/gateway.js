"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLGateway = void 0;
const process_1 = require("process");
const node_fetch_1 = __importDefault(require("node-fetch"));
const url_1 = __importDefault(require("url"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
class GraphQLGateway {
    constructor(credentialsStrategy, url = null, region = null) {
        this.credentialsStrategy = credentialsStrategy;
        url = url || process_1.env.API_API_GRAPHQLAPIENDPOINTOUTPUT;
        this.uri = url_1.default.parse(url);
        this.region = region || process_1.env.REGION;
    }
    async runQuery(body, options = { ignoreErrors: false }) {
        let result;
        try {
            const uri = this.uri;
            // Reference: https://aws-amplify.github.io/docs/cli-toolchain/quickstart#graphql-from-lambda
            const endpoint = new aws_sdk_1.default.Endpoint(uri.href);
            const httpRequest = new aws_sdk_1.default.HttpRequest(endpoint, this.region);
            httpRequest.headers.host = uri.host;
            httpRequest.headers['Content-Type'] = 'application/json';
            httpRequest.method = 'POST';
            httpRequest.body = JSON.stringify(body);
            await this.credentialsStrategy.sign(httpRequest);
            const res = await node_fetch_1.default(uri.href, {
                method: httpRequest.method,
                body: httpRequest.body,
                headers: httpRequest.headers
            });
            result = await res.json();
        }
        catch (err) {
            throw err;
        }
        if (!options.ignoreErrors && result.errors && result.errors.length) {
            throw new Error(`GraphQL Errors[${body.operationName}]: ${JSON.stringify(result.errors)}`);
        }
        return result.data;
    }
}
exports.GraphQLGateway = GraphQLGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZXdheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9nYXRld2F5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFDQUE4QjtBQUM5Qiw0REFBK0I7QUFDL0IsOENBQXNCO0FBQ3RCLHNEQUEwQjtBQWtCMUIsTUFBYSxjQUFjO0lBSXpCLFlBQ1UsbUJBQXdDLEVBQ2hELE1BQWMsSUFBSSxFQUNsQixTQUFpQixJQUFJO1FBRmIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUloRCxHQUFHLEdBQUcsR0FBRyxJQUFJLGFBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQztRQUNsRCxJQUFJLENBQUMsR0FBRyxHQUFHLGFBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksYUFBRyxDQUFDLE1BQU0sQ0FBQztJQUNyQyxDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQVEsQ0FBa0IsSUFBaUIsRUFBRSxVQUF5QixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUU7UUFDakcsSUFBSSxNQUE4QixDQUFDO1FBRW5DLElBQUk7WUFDRixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBRXJCLDZGQUE2RjtZQUM3RixNQUFNLFFBQVEsR0FBRyxJQUFJLGlCQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxNQUFNLFdBQVcsR0FBRyxJQUFJLGlCQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFL0QsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNwQyxXQUFXLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLGtCQUFrQixDQUFDO1lBQ3pELFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQzVCLFdBQVcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV4QyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFakQsTUFBTSxHQUFHLEdBQUcsTUFBTSxvQkFBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hDLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTTtnQkFDMUIsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO2dCQUN0QixPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87YUFDN0IsQ0FBQyxDQUFDO1lBRUgsTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzNCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixNQUFNLEdBQUcsQ0FBQztTQUNYO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNsRSxNQUFNLElBQUksS0FBSyxDQUNiLGtCQUFrQixJQUFJLENBQUMsYUFBYSxNQUFNLElBQUksQ0FBQyxTQUFTLENBQ3RELE1BQU0sQ0FBQyxNQUFNLENBQ2QsRUFBRSxDQUNKLENBQUM7U0FDSDtRQUVELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0NBQ0Y7QUFwREQsd0NBb0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZW52IH0gZnJvbSAncHJvY2Vzcyc7XG5pbXBvcnQgZmV0Y2ggZnJvbSAnbm9kZS1mZXRjaCc7XG5pbXBvcnQgVVJMIGZyb20gJ3VybCc7XG5pbXBvcnQgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgQ3JlZGVudGlhbHNTdHJhdGVneSB9IGZyb20gJy4vY3JlZGVudGlhbHMnO1xuXG50eXBlIEdyYXBoUUxCb2R5PFRJbnB1dCA9IGFueT4gPSB7XG4gIG9wZXJhdGlvbk5hbWU6IHN0cmluZztcbiAgcXVlcnk6IHN0cmluZztcbiAgdmFyaWFibGVzOiBUSW5wdXQ7XG59O1xuXG50eXBlIEdyYXBoUUxSZXN1bHQ8VD4gPSB7XG4gIGRhdGE/OiBUO1xuICBlcnJvcnM/OiBhbnlbXTtcbn07XG5cbnR5cGUgR3JhcGhRTE9wdGlvbnMgPSB7XG4gIGlnbm9yZUVycm9ycz86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgY2xhc3MgR3JhcGhRTEdhdGV3YXkge1xuICBwcml2YXRlIHVyaTogVVJMLlVybFdpdGhTdHJpbmdRdWVyeTtcbiAgcHJpdmF0ZSByZWdpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNyZWRlbnRpYWxzU3RyYXRlZ3k6IENyZWRlbnRpYWxzU3RyYXRlZ3ksXG4gICAgdXJsOiBzdHJpbmcgPSBudWxsLFxuICAgIHJlZ2lvbjogc3RyaW5nID0gbnVsbFxuICApIHtcbiAgICB1cmwgPSB1cmwgfHwgZW52LkFQSV9BUElfR1JBUEhRTEFQSUVORFBPSU5UT1VUUFVUO1xuICAgIHRoaXMudXJpID0gVVJMLnBhcnNlKHVybCk7XG4gICAgdGhpcy5yZWdpb24gPSByZWdpb24gfHwgZW52LlJFR0lPTjtcbiAgfVxuXG4gIGFzeW5jIHJ1blF1ZXJ5PFRSZXN1bHQsIFRJbnB1dD4oYm9keTogR3JhcGhRTEJvZHksIG9wdGlvbnM6IEdyYXBoUUxPcHRpb25zPSB7IGlnbm9yZUVycm9yczogZmFsc2UgfSkge1xuICAgIGxldCByZXN1bHQ6IEdyYXBoUUxSZXN1bHQ8VFJlc3VsdD47XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdXJpID0gdGhpcy51cmk7XG5cbiAgICAgIC8vIFJlZmVyZW5jZTogaHR0cHM6Ly9hd3MtYW1wbGlmeS5naXRodWIuaW8vZG9jcy9jbGktdG9vbGNoYWluL3F1aWNrc3RhcnQjZ3JhcGhxbC1mcm9tLWxhbWJkYVxuICAgICAgY29uc3QgZW5kcG9pbnQgPSBuZXcgQVdTLkVuZHBvaW50KHVyaS5ocmVmKTtcbiAgICAgIGNvbnN0IGh0dHBSZXF1ZXN0ID0gbmV3IEFXUy5IdHRwUmVxdWVzdChlbmRwb2ludCwgdGhpcy5yZWdpb24pO1xuXG4gICAgICBodHRwUmVxdWVzdC5oZWFkZXJzLmhvc3QgPSB1cmkuaG9zdDtcbiAgICAgIGh0dHBSZXF1ZXN0LmhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgaHR0cFJlcXVlc3QubWV0aG9kID0gJ1BPU1QnO1xuICAgICAgaHR0cFJlcXVlc3QuYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuXG4gICAgICBhd2FpdCB0aGlzLmNyZWRlbnRpYWxzU3RyYXRlZ3kuc2lnbihodHRwUmVxdWVzdCk7XG5cbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVyaS5ocmVmLCB7XG4gICAgICAgIG1ldGhvZDogaHR0cFJlcXVlc3QubWV0aG9kLFxuICAgICAgICBib2R5OiBodHRwUmVxdWVzdC5ib2R5LFxuICAgICAgICBoZWFkZXJzOiBodHRwUmVxdWVzdC5oZWFkZXJzXG4gICAgICB9KTtcblxuICAgICAgcmVzdWx0ID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JzICYmIHJlc3VsdC5lcnJvcnMgJiYgcmVzdWx0LmVycm9ycy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEdyYXBoUUwgRXJyb3JzWyR7Ym9keS5vcGVyYXRpb25OYW1lfV06ICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgcmVzdWx0LmVycm9yc1xuICAgICAgICApfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xuICB9XG59XG4iXX0=