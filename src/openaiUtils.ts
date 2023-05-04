import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generateChatCompletion = async (prompt: string) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    temperature: 1.2,
    max_tokens: 1000,
  });

  return response.data.choices[0].text;
};

export const generateImage = async (prompt: string) => {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: '256x256',
  });
  return response.data.data[0].url;
};
