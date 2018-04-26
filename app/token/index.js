import log from './../log'

const errorHandle = (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401
            ctx.body = {
                error: err.originalError ? err.originalError.message : err.message
            }
        } else {
            ctx.body = err.message
        }
        // log.warn(__filename, JSON.stringify(err))
    })
}

export default errorHandle