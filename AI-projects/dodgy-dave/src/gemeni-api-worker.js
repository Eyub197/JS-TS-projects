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

export default {
	async fetch(request, env, ctx) {
	 try {
		const genAI = new GoogleGenerativeAI(env.GEMENI_AI_API_KEY);
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
		const prompt = "Should I trust stock predictions from Dodgy Dave"
		const result = await model.generateContent(prompt)
		return new Response(JSON.stringify(result.response.text()))
		} catch (error) {
			return new Response(error)
		}

	}
}