export interface ResponseStandard<T> {
    status: number;
    data?: T;
    message: string;
}

export interface Pagination<T> {
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    dataPerPage: number;
    data: T;
}

export interface LoginSuccessDataResponse {
    id: string;
    name: string;
    email: string;
    phone: string;
    photo: string;
    isPaid: boolean;
    startDate: string | null;
    endDate: string | null;
    token: string;
}