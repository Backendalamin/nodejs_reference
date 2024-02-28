import {Router} from "express"

const router = Router()

router.get("/api/products", (req, res) => {
    res.send({id: "hjv4e78v", prodName: "Iphone 13"})
})

export default router