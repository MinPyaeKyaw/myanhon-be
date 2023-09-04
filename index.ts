import express, { type Application } from 'express'

import * as dotenv from 'dotenv'

import authRouter from './routes/auth'
import courseRouter from './routes/courses'
import typeRouter from './routes/courseTypes'
import levelRouter from './routes/courseLevels'
import userRouter from './routes/user'
import adminAuthRoute from './routes/admin/auth'
import roleRoutes from './routes/admin/roles'
import permissionRoutes from './routes/admin/permissions'
import adminRoutes from './routes/admin/admins'
import adminCourseRoute from './routes/admin/courses'
import paymentRouter from './routes/payment/payment'
import questioniarRouter from './routes/questioniar'
import suggestionRouter from './routes/suggestoin'
import examRouter from './routes/exam'
import path from 'path'
import { apiKeyMiddleware } from './middlewares/apiKeyMiddleware'

dotenv.config({ path: path.join(__dirname, "/.env'") })
dotenv.config()

const app: Application = express()
app.use(express.json())
app.use(apiKeyMiddleware)

// Admin routes
const adminAPIPrefix: string = process.env.API_PREFIX + '/admin'
app.use(adminAPIPrefix + '/auth', adminAuthRoute)
app.use(adminAPIPrefix, roleRoutes)
app.use(adminAPIPrefix, permissionRoutes)
app.use(adminAPIPrefix, adminRoutes)
app.use(adminAPIPrefix, adminCourseRoute)

// User routes
app.use(process.env.API_PREFIX + '/auth', authRouter)
app.use(process.env.API_PREFIX as string, courseRouter)
app.use(process.env.API_PREFIX as string, typeRouter)
app.use(process.env.API_PREFIX as string, levelRouter)
app.use(process.env.API_PREFIX as string, userRouter)
app.use(process.env.API_PREFIX as string, paymentRouter)
app.use(process.env.API_PREFIX as string, questioniarRouter)
app.use(process.env.API_PREFIX as string, suggestionRouter)
app.use(process.env.API_PREFIX as string, examRouter)

app.listen(4000, () => {
  console.log('now listening to 4000')
})

export default app
