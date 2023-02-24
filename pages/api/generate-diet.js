import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
const { vezesAcad, peso, altura, nivel, objetivo } = req.body;
    const prompt = generatePrompt(vezesAcad, peso, altura, nivel, objetivo)
    console.log(req.body);
    
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 2048,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(vezesAcad, peso, altura, nivel, objetivo) {
  return `Crie uma série de academia ${vezesAcad} vezes na semana, sendo cada dia um grupamento muscular diferente, com ${nivel} exercícios por dia, para uma pessoa que tem ${peso} kilos, ${altura} centimetros de altura que busca ${objetivo}`;
}
