import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';
console.log(process.env.OPENAI_API_KEY);
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const assistant_id = 'asst_DkFLbzHboaLA6HXafHSDU6zL';

async function assistant(prompt) {
  const thread = await openai.beta.threads.create();

  const message = await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: prompt,
  });

  console.log(message);

  let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id,
  });

  if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    for (const message of messages.data.reverse()) {
      console.log(`${message.role} > ${message.content[0].text.value}`);
      if (message.role === 'assistant') {
        return message.content[0].text.value;
      }
    }
  } else {
    console.log(run.status);
  }
}
export {assistant};
