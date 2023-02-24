import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
const { diasDieta, numRefeicoes, numOpcoes, doencas, peso, altura, idade, numExercicios, alergias } = req.body;
    const prompt = generatePrompt(diasDieta, numRefeicoes, numOpcoes, doencas, peso, altura, idade, numExercicios, alergias)
    console.log(req.body);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 2048,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(diasDieta, numRefeicoes, numOpcoes, doencas, peso, altura, idade, numExercicios, alergias) {
  return `Crie uma dieta completa por ${diasDieta} dias com ${numRefeicoes} refeições por dia com ${numOpcoes} opções diferentes para cada refeição, para uma pessoa que possui ${doencas} e tem ${peso} kilos e ${altura} centímetros de altura, ${idade} anos de idade, que faz ${numExercicios} exercícios por semana e tem alergia a ${alergias}`;

}
