export interface User {
    name: string;
    email: string;
    username: string;
    password: string;
}

export interface LoginInfo {
    username: string;
    password: string;
}

export interface UserNoPw {
    _id: string;
    name: string;
    email: string;
    username: string;
}