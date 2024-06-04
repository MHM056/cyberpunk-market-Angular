export interface User {
    _id: string,
    username: string,
    email: string,
    imageUrl: string,
    password: string,
    items: string[],
    created_at: string,
    updatedAt: string,
    __v: string,
}

export interface UserForAuth {
    _id: string,
    username: string,
    email: string,
    password: string
}