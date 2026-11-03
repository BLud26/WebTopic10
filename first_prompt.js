let { GoogleGenAI } = require("@google/genai");

let genAI = new GoogleGenAI( {} );

genAI.models.generateContent( {
    model: 'gemini-3.8-flash',
    contents: 'what is an environment variable?'
} ).then ( response => console.log(response.text))