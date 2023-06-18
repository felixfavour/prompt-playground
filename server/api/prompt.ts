import { OpenAIApi, Configuration } from 'openai'

export default defineEventHandler(async (event) => {
  const reqBody = await readBody(event)

  // INIT OPEN AI
  try {
    const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
    const openai = new OpenAIApi(configuration);
    const chatCompletion = await openai.createChatCompletion(reqBody);

    return {
      error: false,
      data: chatCompletion.data.choices[0].message
    }
  } catch (err: any) {
    setResponseStatus(event, err.status)
  }
})
