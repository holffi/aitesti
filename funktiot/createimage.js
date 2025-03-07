import OpenAI from 'openai';
const openai = new OpenAI();

const createImage = async (prompt) => {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size: '1024x1024',
  });

  console.log(response);
  return response.data[0].url;
};

export {createImage};
