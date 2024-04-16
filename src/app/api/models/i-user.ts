import { Role } from "./roles";

export interface IUser {
    idUser: number;
    username?: string;
    password?: string;
    role?: Role;
    name?: string;
    lastName?: string;
    token?: string;
    company?: number;
}