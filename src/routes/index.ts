import { authRouter } from "./authRoute";
import { userRouter } from "./userRoute";
import { productRouter } from "./productRoute";
import { cartRouter } from "./cartRoute";
import { Router } from "express";

const router = Router()

router.use("/auth", authRouter)
router.use("/cart", cartRouter)
router.use("/user", userRouter)
router.use("/product", productRouter)
