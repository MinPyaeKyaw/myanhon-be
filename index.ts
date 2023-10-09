import express, { type Application } from 'express'
import path from 'path'

import i18n from 'i18n'
import * as dotenv from 'dotenv'

import authRouter from './routes/auth'
import courseRouter from './routes/courses'
import typeRouter from './routes/courseTypes'
import levelRouter from './routes/courseLevels'
import userRouter from './routes/user'
// import adminAuthRoute from './routes/admin/auth'
// import roleRoutes from './routes/admin/roles'
// import permissionRoutes from './routes/admin/permissions'
// import adminRoutes from './routes/admin/admins'
// import adminCourseRoute from './routes/admin/courses'
import paymentRouter from './routes/payment/payment'
import questioniarRouter from './routes/questioniar'
import suggestionRouter from './routes/suggestoin'
import examRouter from './routes/exam'
import { apiKeyMiddleware } from './middlewares/jwt/apiKeyMiddleware'
import trackingRouter from './routes/tracking'
import { setPreferedLang } from './middlewares/i18n/setPreferedLang'

dotenv.config({ path: path.join(__dirname, "/.env'") })
dotenv.config()

i18n.configure({
  locales: ['en', 'mm'], // Supported locales
  defaultLocale: 'en', // Default locale
  directory: path.join(__dirname, '/locales'), // Directory containing translation files
})

const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(i18n.init)
app.use(apiKeyMiddleware)
app.use(setPreferedLang)

app.get('/test', (req, res) => {
  res.json({ hello: res.__('hello') })
})

// Admin routes
// const adminAPIPrefix: string = process.env.API_PREFIX + '/admin'
// app.use(adminAPIPrefix + '/auth', adminAuthRoute)
// app.use(adminAPIPrefix, roleRoutes)
// app.use(adminAPIPrefix, permissionRoutes)
// app.use(adminAPIPrefix, adminRoutes)
// app.use(adminAPIPrefix, adminCourseRoute)

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
app.use(process.env.API_PREFIX as string, trackingRouter)

app.listen(4000, () => {
  console.log('now listening to 4000')
})

export default app
