import express from 'express'

const router = express.Router()

router.use('/', ( req: any,res: any) => {
    return res.json({message: 'Hello from temp route'})
})

// @ts-ignore
export default router as tempRouter
