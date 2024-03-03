import {Router} from "express"

//imports all your routes
import productsRouter from "./productRouter.mjs"
import userRouter from  "./userRoutes.mjs"
import authRouter from "./authRouter.mjs"
const router = Router()

//putting routes in one line middleware
router.use(productsRouter,userRouter, authRouter)

export default router