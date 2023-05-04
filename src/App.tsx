import './App.css';
import { generateChatCompletion, generateImage } from './openaiUtils';
import { useState } from 'react';

const PROMPT_RECIPE =
  'Give me a recipe title and list of ingredients that dont fit together';

const App = () => {
  const [generatedDinner, setGeneratedDinner] = useState('');
  const [generatedDinnerImageSrc, setGeneratedDinnerImageSrc] = useState('');

  const generateDinner = async (chatPrompt: string) => {
    await generateChatCompletion(chatPrompt)
      .then((data) => {
        data && setGeneratedDinner(data);
        data &&
          generateImage(`Cartoon image of ${data}`).then(
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
};

export default App;
