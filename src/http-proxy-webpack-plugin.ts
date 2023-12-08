import {
    HttpProxyServer,
    Proxy,
} from './http-proxy-server'
import fs from 'fs'
import { Compiler } from 'webpack'

const pluginName = 'HttpProxyWebpackPlugin'

type HttpProxyWebpackPluginOptions = {
    port: number;
    watchFile: string;
}

class HttpProxyWebpackPlugin {
    private port: number;
    private watchFile: string;

    constructor(options: HttpProxyWebpackPluginOptions) {
        const {
            port,
            watchFile,
        } = options
        this.port = port
        this.watchFile = watchFile
    }

    apply(compiler: Compiler) {
        compiler.hooks.done.tap(pluginName, () => {
            const server = new HttpProxyServer({
                port: this.port,
            })
            const createServer = () => {
                if (!fs.existsSync(this.watchFile)) {
                    // TODO
                }
                else {
                    const proxies = eval(fs.readFileSync(this.watchFile, {
                        encoding: 'utf-8',
                    })) as Record<string, Proxy>
                    server.setProxy(proxies)
                    server.start()
                }
            }
            fs.watchFile(this.watchFile, () => {
                server.stop().then(createServer)
            })
            createServer()
        })
    }
}

export default HttpProxyWebpackPlugin
