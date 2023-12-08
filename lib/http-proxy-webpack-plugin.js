"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_proxy_server_1 = require("./http-proxy-server");
const fs_1 = __importDefault(require("fs"));
const pluginName = 'HttpProxyWebpackPlugin';
class HttpProxyWebpackPlugin {
    constructor(options) {
        const { port, watchFile, } = options;
        this.port = port;
        this.watchFile = watchFile;
    }
    apply(compiler) {
        compiler.hooks.done.tap(pluginName, () => {
            const server = new http_proxy_server_1.HttpProxyServer({
                port: this.port,
            });
            const createServer = () => {
                if (!fs_1.default.existsSync(this.watchFile)) {
                    // TODO
                }
                else {
                    const proxies = eval(fs_1.default.readFileSync(this.watchFile, {
                        encoding: 'utf-8',
                    }));
                    server.setProxy(proxies);
                    server.start();
                }
            };
            fs_1.default.watchFile(this.watchFile, () => {
                server.stop().then(createServer);
            });
            createServer();
        });
    }
}
exports.default = HttpProxyWebpackPlugin;
