import { account } from "../appwrite";

export const loginService = async (email: string, password: string) => {
    await account.createEmailPasswordSession(email, password);
    const user= await account.get()
    return user
}

export const logoutService = async()=>{
    await account.deleteSession('current')
}

export const checkSessionService = async()=>{
    const user = account.get()
    return user
}