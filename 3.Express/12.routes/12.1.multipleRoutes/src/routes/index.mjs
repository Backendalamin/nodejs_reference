
import {Router} from "express"
// custom index page to import all routers here 
import prodductRouter from "./productRoutes.mjs"
import userRouter from "./users.mjs"

const router = Router()
router.use(prodductRouter)
router.use(userRouter)

export default router
