import dotenv from "dotenv"


dotenv.config()
import {InferenceClient}  from "@huggingface/inference"


const hf= new InferenceClient(
    process.env.HF_API_KEY
)


export const createEmbeddings= async (text:string):Promise<number[]>=>{
    
    const result = await hf.featureExtraction({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        inputs: text,
    })


    return result as number[]
}
