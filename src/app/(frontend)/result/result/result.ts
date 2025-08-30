"use server"
import { getPayload } from "payload"
import config from '@payload-config'
import {User} from "@/payload-types"
import { Exam } from "@/payload-types"
export interface ResultResponse{
    success:boolean,
    error?:string,
    result?:Partial<User>
}