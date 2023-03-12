/* Defines the user entity */
export interface User {
    id: number;
    userName: string;
    isAdmin: boolean;
}

export interface AuthUser {
    userName: string;
    password: string;
}
