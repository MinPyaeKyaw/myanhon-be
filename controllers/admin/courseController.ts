// import { type Request, type Response } from 'express'

// import { PrismaClient } from '@prisma/client'

// import { logError, writeJsonRes } from '../../utils/functions'
// import {
//   type ContentReqInterface,
//   type ContentResInterface,
//   type CourseResInterface,
// } from '../../utils/interfaces'

// const prisma: PrismaClient = new PrismaClient()

// export const testUpload = async (req: Request, res: Response) => {
//   try {
//     return writeJsonRes<null>(res, 201, null, 'Successfully uploaded!')
//   } catch (error) {
//     logError(error, 'Admin Create Course Controller')
//     return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
//   }
// }

// export const createCourse = async (req: Request, res: Response) => {
//   try {
//     const existedCourse = await prisma.courses.findFirst({
//       where: {
//         name: req.body.name,
//       },
//     })

//     if (existedCourse) {
//       return writeJsonRes<null>(
//         res,
//         400,
//         null,
//         'This course is already existed!',
//       )
//     }

//     const createdCourse = await prisma.$transaction(async prisma => {
//       const course = await prisma.courses.create({
//         data: {
//           name: req.body.name,
//           duration: req.body.duration,
//           isPublic: req.body.isPublic,
//           type: req.body.type,
//           level: req.body.level,
//         },
//       })

//       await prisma.courses.update({
//         where: {
//           id: course.id,
//         },
//         data: {
//           instructors: {
//             connect: req.body.instructors.map((inst: string) => ({ id: inst })),
//           },
//         },
//       })

//       const contentReqData: ContentReqInterface[] = []
//       req.body.contents.forEach((c: ContentReqInterface) => {
//         c.courseId = course.id
//         contentReqData.push(c)
//       })

//       await prisma.contents.createMany({
//         data: contentReqData,
//       })

//       return course
//     })

//     return writeJsonRes<CourseResInterface>(
//       res,
//       201,
//       createdCourse,
//       'Successfully created!',
//     )
//   } catch (error) {
//     logError(error, 'Admin Create Course Controller')
//     return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
//   }
// }

// export const addContent = async (req: Request, res: Response) => {
//   try {
//     const existedContent = await prisma.contents.findFirst({
//       where: {
//         name: req.body.name,
//         courseId: req.params.courseId,
//       },
//     })

//     if (existedContent) {
//       return writeJsonRes<null>(
//         res,
//         400,
//         null,
//         'This content name is already used!',
//       )
//     }

//     const content = await prisma.contents.create({
//       data: {
//         name: req.body.name,
//         thumbnail: req.body.thumbnail,
//         url: req.body.url,
//         isPublic: req.body.isPublic,
//         courseId: req.params.courseId,
//       },
//     })

//     return writeJsonRes<ContentResInterface>(
//       res,
//       201,
//       content,
//       'Successfully created!',
//     )
//   } catch (error) {
//     logError(error, 'Admin Add Content Controller')
//     return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
//   }
// }

// export const removeContent = async (req: Request, res: Response) => {
//   try {
//     await prisma.contents.delete({
//       where: {
//         id: req.body.contentId,
//       },
//     })

//     return writeJsonRes<null>(res, 200, null, 'Successfully removed!')
//   } catch (error) {
//     logError(error, 'Admin Remove Content Controller')
//     return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
//   }
// }

// export const addInstructor = async (req: Request, res: Response) => {
//   try {
//     const existedInstructor = await prisma.instructors.findFirst({
//       where: {
//         id: req.body.instructorId,
//         courses: {
//           some: {
//             id: req.params.coruseId,
//           },
//         },
//       },
//     })

//     if (existedInstructor) {
//       return writeJsonRes<null>(
//         res,
//         400,
//         null,
//         'This instructor is already exist!',
//       )
//     }

//     await prisma.instructors.update({
//       where: {
//         id: req.body.instructorId,
//       },
//       data: {
//         courses: {
//           connect: {
//             id: req.params.courseId,
//           },
//         },
//       },
//     })

//     return writeJsonRes<null>(res, 201, null, 'Successfully added!')
//   } catch (error) {
//     logError(error, 'Admin Remove Content Controller')
//     return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
//   }
// }

// export const removeInstructor = async (req: Request, res: Response) => {
//   try {
//     await prisma.instructors.update({
//       where: { id: req.body.instructorId },
//       data: {
//         courses: {
//           disconnect: { id: req.params.coruseId },
//         },
//       },
//     })

//     return writeJsonRes<null>(res, 200, null, 'Successfully removed!')
//   } catch (error) {
//     logError(error, 'Admin Remove Content Controller')
//     return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
//   }
// }
