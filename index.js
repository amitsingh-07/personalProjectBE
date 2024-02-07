const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express')
const app = express();
const port = 7070;

app.listen(
    port,
    () => console.log(`it's alive on localhost:${port}`)
    
)
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
const dotenv = require("dotenv")
dotenv.config()
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/submit', async (req, res) => {
    const input = req.body;
    let val = req;
    console.log("Input is received : ", input.name);
    console.log(input.name);
    console.log(typeof(input.name));
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(input.name);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.json({ message:'Form Data Has been submitted successfully', text });

});

// async function run() {
//   // For text-only input, use the gemini-pro model
//   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

//   const prompt = "Write a poem about lunar night"

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// run();