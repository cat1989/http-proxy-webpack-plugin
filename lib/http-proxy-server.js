"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpProxyServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
class HttpProxyServer {
    constructor(options) {
        const { port, } = options;
        this.port = port;
    }
    setProxy(proxies) {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        Object.keys(proxies).forEach((key) => {
            app.use(key, (0, http_proxy_middleware_1.createProxyMiddleware)(proxies[key]));
        });
        this.server = http_1.default.createServer(app);
    }
    start() {
        return new Promise((resolve, reject) => {
            if (this.server) {
                this.server.listen(this.port, () => {
                    resolve(void 0);
                });
            }
            else {
                reject(void 0);
            }
        });
    }
    stop() {
        return new Promise((resolve, reject) => {
            if (this.server) {
                this.server.close(() => {
                    resolve(void 0);
                });
            }
            else {
                reject(void 0);
            }
        });
    }
}
exports.HttpProxyServer = HttpProxyServer;
