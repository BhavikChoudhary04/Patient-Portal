export interface RegisterUser {
        id: number,
        firstName: string,
        lastName: string,
        userName: string,
        email: string,
        role: string,
        dob: string,
        mobile: string,
        password: string,
        isAuthenticated: boolean
}

export interface LoginUser {
        email: string,
        password: string
}
