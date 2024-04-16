export const setAllUserInfo = (user: any) => {
    let stringifyUser = JSON.stringify(user);
    localStorage.setItem("allUser", stringifyUser);
}
export const getAllUserInfo = () => {
    if (typeof window !== 'undefined') {
        let stringifyUser: any = localStorage.getItem("allUser");
        return JSON.parse(stringifyUser);
    }
    return null; // Or handle the case where localStorage is not available
}
export const setUserInfo = (user: any) => {
    let stringifyUser = JSON.stringify(user);
    localStorage.setItem("user", stringifyUser);
}
export const getUserInfo = () => {
    let stringifyUser: any = localStorage.getItem("user");
    return JSON.parse(stringifyUser);
}