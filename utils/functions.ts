import { Pagination, ResponseStandard } from "./interfaces"

export const response = <ResDataType>(status:number, data:ResDataType, message:string): ResponseStandard<ResDataType> => {
    return {
        status,
        data,
        message,
    }
}

// export const pagination = <T>(data: T): Pagination<T> => {
//     return {
        
//     }
// }