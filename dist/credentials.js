"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIKeyCredentialsStrategy = exports.AuthHeaderCredentialsStrategy = exports.IAMCredentialsStrategy = exports.GlobalCredentialsStrategy = exports.signRequest = exports.getAWSDate = void 0;
const process_1 = require("process");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
function getAWSDate() {
    if (aws_sdk_1.default.config.systemClockOffset) {
        // use offset when non-zero
        return new Date(new Date().getTime() + aws_sdk_1.default.config.systemClockOffset);
    }
    else {
        return new Date();
    }
}
exports.getAWSDate = getAWSDate;
function signRequest(request, credentials) {
    const signer = new aws_sdk_1.default.Signers.V4(request, 'appsync', true);
    signer.addAuthorization(credentials, getAWSDate());
}
exports.signRequest = signRequest;
class GlobalCredentialsStrategy {
    async sign(httpRequest) {
        return signRequest(httpRequest, aws_sdk_1.default.config.credentials);
    }
}
exports.GlobalCredentialsStrategy = GlobalCredentialsStrategy;
class IAMCredentialsStrategy {
    constructor(key = null, accessKey = null, session = null, region = null) {
        key = key || process_1.env.AWS_ACCESS_KEY_ID || '';
        accessKey = accessKey || process_1.env.AWS_SECRET_ACCESS_KEY || '';
        session = session || process_1.env.AWS_SESSION_TOKEN || '';
        region = region || process_1.env.AWS_REGION || process_1.env.REGION;
        this.credentials = new aws_sdk_1.default.Credentials(key, accessKey, session);
        aws_sdk_1.default.config.update({
            region,
            credentials: this.credentials
        });
    }
    async sign(httpRequest) {
        return signRequest(httpRequest, this.credentials);
    }
}
exports.IAMCredentialsStrategy = IAMCredentialsStrategy;
class AuthHeaderCredentialsStrategy {
    constructor(authHeader) {
        this.authHeader = authHeader;
    }
    async sign(httpRequest) {
        httpRequest.headers['authorization'] = this.authHeader;
    }
}
exports.AuthHeaderCredentialsStrategy = AuthHeaderCredentialsStrategy;
class APIKeyCredentialsStrategy {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    async sign(httpRequest) {
        httpRequest.headers['x-api-key'] = this.apiKey;
    }
}
exports.APIKeyCredentialsStrategy = APIKeyCredentialsStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlZGVudGlhbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY3JlZGVudGlhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEscUNBQThCO0FBQzlCLHNEQUEwQjtBQU0xQixTQUFnQixVQUFVO0lBQ3hCLElBQUksaUJBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUU7UUFDaEMsMkJBQTJCO1FBQzNCLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxpQkFBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQ3RFO1NBQU07UUFDTCxPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7S0FDbkI7QUFDSCxDQUFDO0FBUEQsZ0NBT0M7QUFFRCxTQUFnQixXQUFXLENBQUMsT0FBTyxFQUFFLFdBQVc7SUFDOUMsTUFBTSxNQUFNLEdBQUcsSUFBVSxpQkFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUhELGtDQUdDO0FBRUQsTUFBYSx5QkFBeUI7SUFDcEMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUE0QjtRQUNyQyxPQUFPLFdBQVcsQ0FBQyxXQUFXLEVBQUUsaUJBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUQsQ0FBQztDQUNGO0FBSkQsOERBSUM7QUFFRCxNQUFhLHNCQUFzQjtJQUdqQyxZQUNFLE1BQWMsSUFBSSxFQUNsQixZQUFvQixJQUFJLEVBQ3hCLFVBQWtCLElBQUksRUFDdEIsU0FBaUIsSUFBSTtRQUVyQixHQUFHLEdBQUcsR0FBRyxJQUFJLGFBQUcsQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUU7UUFDMUMsU0FBUyxHQUFHLFNBQVMsSUFBSSxhQUFHLENBQUMscUJBQXFCLElBQUksRUFBRSxDQUFDO1FBQ3pELE9BQU8sR0FBRyxPQUFPLElBQUksYUFBRyxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQztRQUNqRCxNQUFNLEdBQUcsTUFBTSxJQUFJLGFBQUcsQ0FBQyxVQUFVLElBQUksYUFBRyxDQUFDLE1BQU0sQ0FBQztRQUVoRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksaUJBQUcsQ0FBQyxXQUFXLENBQ3BDLEdBQUcsRUFDSCxTQUFTLEVBQ1QsT0FBTyxDQUNSLENBQUM7UUFFRixpQkFBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDaEIsTUFBTTtZQUNOLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM5QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUE0QjtRQUNyQyxPQUFPLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FDRjtBQTdCRCx3REE2QkM7QUFFRCxNQUFhLDZCQUE2QjtJQUN4QyxZQUFvQixVQUFrQjtRQUFsQixlQUFVLEdBQVYsVUFBVSxDQUFRO0lBQUcsQ0FBQztJQUUxQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQTRCO1FBQ3JDLFdBQVcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6RCxDQUFDO0NBQ0Y7QUFORCxzRUFNQztBQUVELE1BQWEseUJBQXlCO0lBQ3BDLFlBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQztJQUV0QyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQTRCO1FBQ3JDLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNqRCxDQUFDO0NBQ0Y7QUFORCw4REFNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVudiB9IGZyb20gJ3Byb2Nlc3MnO1xuaW1wb3J0IEFXUyBmcm9tICdhd3Mtc2RrJztcblxuZXhwb3J0IGludGVyZmFjZSBDcmVkZW50aWFsc1N0cmF0ZWd5IHtcbiAgc2lnbihodHRwUmVxdWVzdDogQVdTLkh0dHBSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFXU0RhdGUoKSB7XG4gIGlmIChBV1MuY29uZmlnLnN5c3RlbUNsb2NrT2Zmc2V0KSB7XG4gICAgLy8gdXNlIG9mZnNldCB3aGVuIG5vbi16ZXJvXG4gICAgcmV0dXJuIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgQVdTLmNvbmZpZy5zeXN0ZW1DbG9ja09mZnNldCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNpZ25SZXF1ZXN0KHJlcXVlc3QsIGNyZWRlbnRpYWxzKSB7XG4gIGNvbnN0IHNpZ25lciA9IG5ldyAoPGFueT5BV1MpLlNpZ25lcnMuVjQocmVxdWVzdCwgJ2FwcHN5bmMnLCB0cnVlKTtcbiAgc2lnbmVyLmFkZEF1dGhvcml6YXRpb24oY3JlZGVudGlhbHMsIGdldEFXU0RhdGUoKSk7XG59XG5cbmV4cG9ydCBjbGFzcyBHbG9iYWxDcmVkZW50aWFsc1N0cmF0ZWd5IGltcGxlbWVudHMgQ3JlZGVudGlhbHNTdHJhdGVneSB7XG4gIGFzeW5jIHNpZ24oaHR0cFJlcXVlc3Q6IEFXUy5IdHRwUmVxdWVzdCkge1xuICAgIHJldHVybiBzaWduUmVxdWVzdChodHRwUmVxdWVzdCwgQVdTLmNvbmZpZy5jcmVkZW50aWFscyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIElBTUNyZWRlbnRpYWxzU3RyYXRlZ3kgaW1wbGVtZW50cyBDcmVkZW50aWFsc1N0cmF0ZWd5IHtcbiAgcHJpdmF0ZSBjcmVkZW50aWFsczogQVdTLkNyZWRlbnRpYWxzO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGtleTogc3RyaW5nID0gbnVsbCxcbiAgICBhY2Nlc3NLZXk6IHN0cmluZyA9IG51bGwsXG4gICAgc2Vzc2lvbjogc3RyaW5nID0gbnVsbCxcbiAgICByZWdpb246IHN0cmluZyA9IG51bGxcbiAgKSB7XG4gICAga2V5ID0ga2V5IHx8IGVudi5BV1NfQUNDRVNTX0tFWV9JRCB8fCAnJyA7XG4gICAgYWNjZXNzS2V5ID0gYWNjZXNzS2V5IHx8IGVudi5BV1NfU0VDUkVUX0FDQ0VTU19LRVkgfHwgJyc7XG4gICAgc2Vzc2lvbiA9IHNlc3Npb24gfHwgZW52LkFXU19TRVNTSU9OX1RPS0VOIHx8ICcnO1xuICAgIHJlZ2lvbiA9IHJlZ2lvbiB8fCBlbnYuQVdTX1JFR0lPTiB8fCBlbnYuUkVHSU9OO1xuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG5ldyBBV1MuQ3JlZGVudGlhbHMoXG4gICAgICBrZXksXG4gICAgICBhY2Nlc3NLZXksXG4gICAgICBzZXNzaW9uXG4gICAgKTtcblxuICAgIEFXUy5jb25maWcudXBkYXRlKHtcbiAgICAgIHJlZ2lvbixcbiAgICAgIGNyZWRlbnRpYWxzOiB0aGlzLmNyZWRlbnRpYWxzXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBzaWduKGh0dHBSZXF1ZXN0OiBBV1MuSHR0cFJlcXVlc3QpIHtcbiAgICByZXR1cm4gc2lnblJlcXVlc3QoaHR0cFJlcXVlc3QsIHRoaXMuY3JlZGVudGlhbHMpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBdXRoSGVhZGVyQ3JlZGVudGlhbHNTdHJhdGVneSBpbXBsZW1lbnRzIENyZWRlbnRpYWxzU3RyYXRlZ3kge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhIZWFkZXI6IHN0cmluZykge31cblxuICBhc3luYyBzaWduKGh0dHBSZXF1ZXN0OiBBV1MuSHR0cFJlcXVlc3QpIHtcbiAgICBodHRwUmVxdWVzdC5oZWFkZXJzWydhdXRob3JpemF0aW9uJ10gPSB0aGlzLmF1dGhIZWFkZXI7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFQSUtleUNyZWRlbnRpYWxzU3RyYXRlZ3kgaW1wbGVtZW50cyBDcmVkZW50aWFsc1N0cmF0ZWd5IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGlLZXk6IHN0cmluZykge31cblxuICBhc3luYyBzaWduKGh0dHBSZXF1ZXN0OiBBV1MuSHR0cFJlcXVlc3QpIHtcbiAgICBodHRwUmVxdWVzdC5oZWFkZXJzWyd4LWFwaS1rZXknXSA9IHRoaXMuYXBpS2V5O1xuICB9XG59XG4iXX0=