import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";
const token = process.env.OPENAI_API_KEY;
const apiKey = process.env.UPC_LOOKUP_KEY;

export async function POST(req: NextRequest) {
    const body = await req.json()
    try {
        const response = await fetch(`https://api.barcodelookup.com/v3/products?barcode=${body.UPC}&key=${apiKey}`)

        const json = await response.json();

        const client = new OpenAI({
            baseURL: "https://models.github.ai/inference",
            apiKey: token
        });
        const textData = JSON.stringify(json);


        const prompt = `
You are a strict data processor.

Arrange the data, remove the unneeded data, this is the layout:

Extract and return ONLY a JSON object with these fields:  
- product_id 
- product_name  
- product_image  
- price  
- description  
- brand  
- category

Map the product category to exactly one of the following (choose the best fit):
use barcode_number as product_id

"Desktop" | "Laptop" | "Pc Case" | "CPU" | "Motherboard" | "Memory" | "Storage" | "GPU" | "PowerSupply" | "Monitor" | "Keyboard" | "Mouse" | "Headphone" | "Microphone" | "Router" | "Switch"

convert the price to ph currency but the data type is number remove the currency

complete other details if none base on product name
Return strictly valid JSON with no extra text.

Here is the product data: ${textData}
`;

        const result = await client.chat.completions.create({
            model: "openai/gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are a strict data processor. Return ONLY JSON with the requested fields, no extra text."
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        });
        let content = result.choices[0].message.content ?? "";

        // Remove ```json and ``` if present
        content = content.replace(/```json\s*/, "").replace(/```/g, "").trim();

        let parsedData;
        try {
            parsedData = JSON.parse(content);
        } catch (err) {
            console.error("Failed to parse JSON:", err);
            return NextResponse.json({ status: 500, error: "Invalid JSON from AI" });
        }

        return NextResponse.json({ status: 200, data: parsedData });

    } catch (err) {
        console.log(err)
        console.error(err)
        return NextResponse.json({ status: 500 })
    }
}