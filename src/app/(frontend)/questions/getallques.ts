"use server"

import { getPayload } from "payload"
import config from "@payload-config"
import { Question } from "@/payload-types"

export interface DatResponse {
  success: boolean
  error?: string
  questions?:Partial<Question[]>
}

export async function getQuestion(): Promise<DatResponse> {
  const payload = await getPayload({ config })
 
  try {
    // Fetch all questions
    const allQuestions = await payload.find({
      collection: "questions",       
    })

    return {
      success: true,
      questions: allQuestions.docs, // payload.find returns { docs: [...] }
    }
  } catch (error) {
    console.log("internal error", error)
    return { success: false, error: "An error occurred" }
  }
}
