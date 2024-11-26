import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"

if(!import.meta.env.VITE_OPENAI_API_KEY) { throw new Error("Missing OPEN_AI_API_KEY") }

export const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

const privateKey = import.meta.env.VITE_SUPABASE_API_KEY

if(!privateKey) { throw new Error("Missing SUPABASE_API_KEY") }

const url = import.meta.env.VITE_SUPABASE_URL

if(!url) { throw new Error("Missing SUPABASE_URL") }

export const supabase = createClient(url, privateKey)

