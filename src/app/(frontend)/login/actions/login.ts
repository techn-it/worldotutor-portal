"use server"
import { getPayload } from "payload"
import  config  from "@payload-config"
import  {User} from "@/payload-types"
import { cookies } from "next/headers"

export interface LoginParams{
    email:string;
    password:string
}

export interface LoginResponse{
    success:boolean,
    error?:string
}

export type LoginResult = {
    exp?:number,
    token: string,
    user?:User
}

export async function loginCredential ({email,password}:LoginParams):Promise<LoginResponse>{
    const payload = await getPayload({config});
    try {
        const loginresult: LoginResult = await payload.login({
            collection:"users",
            data:{email,password}
        });
        if(loginresult.token){
             const cookieStore = await cookies();
             cookieStore.set("payload-token",loginresult.token,{
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",
                path:"/"
             })

               if(!loginresult.token){
                  return {success:false, error:"Invalid email or password"}
             }
             return {success:true, loginresult}
        }else{
           return {success:false, error:"Invalid email or password"}
        }
    } catch (error) {
         console.log("Login error",error);
         return {success:false, error:"An error occured"}
    }
}