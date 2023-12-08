import express from 'express'
import cors from 'cors'
import http from 'http'
import {
    createProxyMiddleware,
} from 'http-proxy-middleware'

type HttpProxyServerOptions = {
    port: number;
}

type Proxy = {
    target: string;
    changeOrigin?: boolean;
    pathRewrite?: Record<string, string>;
}

class HttpProxyServer {
    private port: number;
    private server?: http.Server;

    constructor(options: HttpProxyServerOptions) {
        const {
            port,
        } = options
        this.port = port
    }

    setProxy(proxies: Record<string, Proxy>) {
        const app = express()
        app.use(cors())
        Object.keys(proxies).forEach((key) => {
            app.use(key, createProxyMiddleware(proxies[key]))
        })
        this.server = http.createServer(app)
    }

    start() {
        return new Promise((resolve, reject) => {
            if (this.server) {
                this.server.listen(this.port, () => {
                    resolve(void 0)
                })
            }
            else {
                reject(void 0)
            }
        })
    }

    stop() {
        return new Promise((resolve, reject) => {
            if (this.server) {
                this.server.close(() => {
                    resolve(void 0)
                })
            }
            else {
                reject(void 0)
            }
        })
    }
}

export {
    HttpProxyServer,
    HttpProxyServerOptions,
    Proxy,
}
