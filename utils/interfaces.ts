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

export interface TokenResInterface {
    token: string;
}

export interface TypesResInterface {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface LevelResInterface {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ContentResInterface {
    id: string;
    name: string;
    thumbnail: string;
    url: string;
    isPublic: boolean;
    courseId: string;
    completedPercent?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CourseResInterface {
    id: string;
    name: string;
    duration: number;
    type: string;
    level: string;
    createdAt: Date;
    updatedAt: Date;
    courseType: TypesResInterface;
    courseLevel: LevelResInterface;
    contents?: ContentResInterface[];
}