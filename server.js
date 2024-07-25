const fs = require('fs')
const NextServer = require('next/dist/server/next-server').default
const http = require("http")
const path = require("path")
const url = require("url")
const nextConfig = require('./next.config.json');
const { NextServer } = require("next/dist/server/next");

const getPort = process.env.PORT || 8080

const getEnv = process.env.NODE_ENV

let nextRequestHandler

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const filePath = path.join(__dirname, 'public', parsedUrl.pathname)
    try {
        if(parsedUrl.pathname.startsWith('/')) {
            if (fs.existsSync(filePath)) {
                const mimeTypes = {
                    '.svg': 'image/svg+xml',
                    '.png': 'image/png',
                    '.jpg': 'image/jpeg',
                    '.gif': 'image/gif',
                    // Agrega más tipos de contenido si es necesario
                };
                const ext = path.extname(filePath)
                const contentType = mimeTypes[ext] || 'application/octet-stream';
                res.writeHead(200, { 'Content-Type': contentType })
                return fs.createReadStream(filePath).pipe(res)
            }
        }
        await nextRequestHandler(req, res, parsedUrl)
    } catch (err) {
        console.error(err)
        res.statusCode=500
        res.end('Internal server error')
    }
})

const serverEnv = getEnv

const serverConfig = {
    hostname: '0.0.0.0',
    port: getPort,
    dir: path.join(__dirname),
    dev: serverEnv === 'development',
    conf: nextConfig
}

server.listen(serverConfig.port, serverConfig.hostname, (err) => {
    if (err) {
        console.error('Failed to start server', err)
        process.exit(1)
    }
    const nextServer = new NextServer(serverConfig)
    nextRequestHandler = nextServer.getRequestHandler()
    console.log(
        `> Server listening at http://${serverConfig.hostname}:${serverConfig.port} as ${serverEnv} env`
    )
})