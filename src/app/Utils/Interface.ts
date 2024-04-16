export interface isSuccessType {
    add: boolean,
    delete: boolean,
    edit: boolean
}
export interface userDetailsType {
    email: string | null,
    name: string | null,
    age: number | string | null,
}
export interface loginInputsTypes {
    email: string | null,
    password: string | null
}
export interface signupInputsTypes {
    email: string | null,
    password: string | null,
    roleId: number | string | null
}
export interface forgotInputsTypes {
    email: string | null,
    password: string | null,
    roleId: number | string | null,
    otp: number | string | null,
}