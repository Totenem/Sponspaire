import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"
import { createClient } from "@/app/utils/supabase/server"

const groq = new Groq();

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() // this will get the ingredients, diet, vibe, and country
        // now we need to get the ingredients, diet, vibe, and country from the body
        const diet = body.diet
        const vibe = body.vibe
        const country = body.country
        const ingredients = Array.isArray(body?.ingredients) ? body.ingredients : [];

        if (!diet || !vibe || !country || !ingredients) { // this will check if the diet, vibe, country, and ingredients are not empty
            return NextResponse.json({ error: "Missing required fields double check your request and try again" }, { status: 400 })
        }

        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "system", content: "You are a expert chef, nutritionist, and culinary artist. You are given a list of ingredients and a list of preferences and you need to generate a recipe that is both delicious and healthy. Follow this format for the response (No missing fields, No extra fields, No extra lines, No extra spaces, No extra characters, No extra anything): { title: string, servings: number, time: string, ingredients: string[], instructions: string[], nutrition: { calories: number, protein: number, carbs: number, fat: number, fiber: number } }" },
                { role: "user", content: `JSON: Generate a recipe for the following ingredients: ${ingredients.join(", ")}. The recipe should be for the following diet: ${diet}. The recipe should be for the following vibe: ${vibe}. The recipe should be for the following country: ${country}. .` }
            ],
            response_format: { type: "json_object" }
        })

        const content = completion.choices?.[0]?.message?.content ?? "{}"

        let json
        try { // check if the content is valid json
            json = JSON.parse(content)
        } catch {
            return NextResponse.json({ error: "Model returned invalid JSON" }, { status: 502 })
        }

        return NextResponse.json(json) // return the json
    } catch (error) {
        return NextResponse.json({ error: "Unexpected error: " + error }, { status: 500 }) // check if the route has an error
    }
}
