import mongoose from "mongoose";

export interface IJsonApiResource {
    type: string,
    _id: mongoose.Types.ObjectId,
    attributes: any,
    relationships: any,
    meta: {
        createdAt: Date,
        updatedAt: Date
    }
}

export interface IPaginationResponse {
    currentPage: number,
    itemCount: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number
}

export interface IJsonApiCollection {
    data: Array<IJsonApiResource>,
    links: {
        self: string,
        first: string,
        last: string,
        next: string,
        previous: string
    }
    meta: IPaginationResponse
}
