import {createServer} from 'http'
import {parse} from 'url'
import next from 'next'
import Fastify from 'fastify'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const fastify = Fastify();

fastify.register(async (fastify, opts) => {
    await app.prepare();
    fastify.all('/*', (req, reply) => {
        return handle(req.raw, reply.raw).then(() => {
            reply.hijack()
        })
    })

    /**
     * uncomment the code below to wire up a no-op content parser that prevents Fastify
     * from consuming the request body prior to handing the request off to Next.js
     */
    // async function noOpParser(req, payload) {
    //     return payload;
    // }
    //
    // fastify.addContentTypeParser('text/plain', noOpParser);
    // fastify.addContentTypeParser('application/json', noOpParser);

    console.log(
        `> Server listening at http://localhost:${port} as ${
            dev ? 'development' : process.env.NODE_ENV
        }`
    )
})

fastify.listen({port});
