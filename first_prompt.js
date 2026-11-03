let { GoogleGenAI } = require("@google/genai");

let genAI = new GoogleGenAI( {} );

genAI.models.generateContent( {
    model: 'gemini-3.8-flash',
    contents: `What promotional items should we give out at our conference booth?
    We are a startup company selling logging and monitoring products.
    We'll be attending VueConf US this year.
    Last year we gaeve out pens and tote bags.
    The pens were not popular. The tote bags were popular but expensive.`
} ).then ( response => console.log(response.text))