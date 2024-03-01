import {Router} from "express"

//imports all your routes
import productsRouter from "./productRouter.mjs"
import userRouter from  "./userRoutes.mjs"

const router = Router()

router.use(productsRouter)
router.use(userRouter)

export default router