import './App.css';
import { Configuration, OpenAIApi } from 'openai';
import { generateChatCompletion, generateImage } from './openaiUtils';
import { useState } from 'react';

const PROMPT_RECIPE =
  'Give me a recipe title and list of ingredients that dont fit together';

function App() {
  const [generatedDinner, setGeneratedDinner] = useState('');
  const [generatedDinnerImageSrc, setGeneratedDinnerImageSrc] = useState('');

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const generateDinner = async (chatPrompt: string) => {
    await generateChatCompletion(chatPrompt, openai)
      .then((data) => {
        data && setGeneratedDinner(data);
        data &&
          generateImage(`Cartoon image of ${data}`, openai).then(
            (url) => url && setGeneratedDinnerImageSrc(url)
          );
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <h1>Finn middag her</h1>
      <button onClick={async () => generateDinner(PROMPT_RECIPE)}>
        Finn middag
      </button>
      <p>{generatedDinner}</p>
      {generatedDinnerImageSrc && <img src={generatedDinnerImageSrc} />}
    </>
  );
}

export default App;
