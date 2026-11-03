let { GoogleGenAI, Type } = require("@google/genai");

let genAI = new GoogleGenAI({});

let userInput = 'eggs and broccoli and leftover chicken';

let prompt = `Suggest one recipe that uses these ingredients: ${userInput}`;

genAI.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: prompt,
    config: {
        systemInstruction: `You are a recipe suggestion bot for a health-conscious,
        budget-friendly website. Suggest recipes that are low cost but use healthy ingredients.`,
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                recipeName: {
                    type: Type.STRING
                },
                description: {
                    type: Type.STRING
                },
                ingredients: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                },
                instructions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                }
            },
            // Makes sure Gemini always fills in all three fields
            // required: ["recipeName", "ingredients", "instructions"]
        }
    }
}).then(response => {
    let recipe = JSON.parse(response.text)
    console.log(recipe.recipeName)
    console.log(recipe.ingredients)
    console.log(recipe.instructions)
}).catch(err => {
    // 503 = Gemini overloaded, just try again in a bit
    console.error(`Request failed (${err.status}): ${err.message}`)
});