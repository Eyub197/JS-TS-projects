/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type'
  }
  
export default {
	async fetch(request, env, ctx) {
	 
	if(request.method === "OPTIONS") {
		return new Response(null, {headers: corsHeaders})
	}

	if (request.method !== 'POST') {
		return new Response(JSON.stringify({ error: `${request.method} method not allowed.`}), { status: 405, headers: corsHeaders })
	}

	 const genAI = new GoogleGenerativeAI(env.GEMENI_AI_API_KEY);
	 const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

	 try {
		const prompt = await request.json()
		const result = await model.generateContent(prompt)
		const message = result.response.text()

		return new Response(JSON.stringify(message), {headers: corsHeaders})
		} catch (error) {
		 	return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
		}

	}
}