import { rest } from 'msw'
import { user } from '../data/user'

export const handlers = [
    rest.post("/login", (req, res, ctx) => {
        sessionStorage.setItem("is-authenticated", true)
        return res(
            ctx.status(200),
        )
    }),
    rest.get("/users", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                user
            })
        )
    })
]