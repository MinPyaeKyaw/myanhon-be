import { type JWT_TYPES } from './enums'

export interface CreatedAdminResDataInterface {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface AdminResInterface {
  id: string
  name: string
  email: string
  hasLogin: boolean
  latestLogin: Date
  roleId: string
  createdAt: Date
  updatedAt: Date
}

export interface AdminObjInterface {
  id: string
  name: string
  email: string
  password: string
  loginTryCount: number
  roleId: string
  verificationCode: string
  hasLogin: boolean
  createdAt: Date
  updatedAt: Date
}

export interface RoleResInterface {
  id: string
  name: string
  permissions?: any
  createdAt: Date
  updatedAt: Date
}

export interface PermissionResInterface {
  id: string
  name: string
  roleId?: string
  createdAt: Date
  updatedAt: Date
}

export interface ResponseStandard<T> {
  status: number
  data?: T
  message: string
}

export interface Pagination<T> {
  totalItems: number
  totalPages: number
  page: number
  size: number
  data: T[]
}

export interface TokenResInterface {
  accessToken: string
  refreshToken: string
}

export interface TypesResInterface {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface LevelResInterface {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface ContentResInterface {
  id: string
  name: string
  thumbnail: string
  url: string
  isPublic: boolean
  courseId: string
  completedPercent?: number
  createdAt: Date
  updatedAt: Date
}

export interface ContentReqInterface {
  name: string
  thumbnail: string
  url: string
  isPublic: boolean
  courseId: string
}

export interface CourseResInterface {
  id: string
  name: string
  duration: number
  type: string
  level: string
  createdAt: Date
  updatedAt: Date
  courseType?: TypesResInterface
  courseLevel?: LevelResInterface
  contents?: ContentResInterface[]
}

export interface PaymentTokenInterface {
  code: string
  message: string
  time: string
  response: {
    paymentToken: string
    expireIn: string
  }
}

export interface QuestioniarAnswerResInterface {
  id: string
  answer: string
  count?: number
  questionId?: string
  createdAt: Date
  updatedAt: Date
}

export interface QuestioniarResInterface {
  id: string
  question: string
  answers?: QuestioniarAnswerResInterface[]
  createdAt: Date
  updatedAt: Date
}

export interface SuggestionResInterface {
  id: string
  title: string
  suggestion: string
  createdAt: Date
  updatedAt: Date
}

export interface ExamSectionResultResInterface {
  sectionId: string
  totalScore: number
  requiredMinScore: number
  userScore: number
}

export interface ExamResultResInterface {
  userScore: number
  totalScore: number
  requiredMinScore: number
  level: string
  type: string
  status: ExamResultStatus
  sections: ExamSectionResultResInterface[]
}

export type ExamResultStatus = 'Passed' | 'Failed'

export interface ExamAnswerResInterface {
  id: string
  answer: string
  isCorrect: boolean
  questionId: string
  createdAt: Date
  updatedAt: Date
}

export interface ExamQuestionResInterface {
  id: string
  question: string
  examSectionId: string
  answers: ExamAnswerResInterface[]
  createdAt: Date
  updatedAt: Date
}

export interface ExamSectionResInterface {
  id: string
  name: string
  questions: ExamQuestionResInterface[]
  typeId: string
  levelId: string
  createdAt: Date
  updatedAt: Date
}

export interface ContentTrackingResInterface {
  id: string
  userId: string
  contentId: string
  completedPercent: number
  createdAt: Date
  updatedAt: Date
}

export interface TestTrackingResInterface {
  id: string
  userId: string
  testId: string
  score: number
  createdAt: Date
  updatedAt: Date
}

export interface UserResInterface {
  id: string
  name: string
  email: string
  phone: string
  password?: string
  startDate: Date | null
  expiredDate: Date | null
  otpCode: string
  createdAt: Date
  updatedAt: Date
}

export interface sectionResultQuery {
  userScore: number
  sectionId: string
  status: ExamResultStatus
}

export interface examSectionResultResInterface {
  id: string
  userScore: number
  status: ExamResultStatus
  examResultId: string
  sectionId: string
  createdAt: Date
  updatedAt: Date
}

export interface examResultResInterface {
  id: string
  totalScore: number
  requiredMinScore: number
  userScore: number
  status: ExamResultStatus
  userId: string
  levelId: string
  typeId: string
  createdAt: Date
  updatedAt: Date
  sections?: examSectionResultResInterface[]
}

export type jwtType =
  | JWT_TYPES.ACCESS
  | JWT_TYPES.REFRESH
  | JWT_TYPES.RESET_PASSWORD
  | JWT_TYPES.OTP
