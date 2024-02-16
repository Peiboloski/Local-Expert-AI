'use server'
import OpenAI from "openai";
import { MessageInterface } from "../types/types";

interface getAssistantMessageProps {
    title: string,
    municipality: string,
    countrySecondarySubdivision: string,
    countrySubdivision: string,
    country: string
    messages: MessageInterface[]
}

const getAssistantMessage = async ({ title, municipality, countrySecondarySubdivision, countrySubdivision, country, messages }: getAssistantMessageProps) => {
    //return 'MOCKED RESPONSE';

    const systemMessage =
        `You are a local guide in ${municipality}, ${countrySubdivision}, ${country}, give main information about ${title} as if you where talking to a tourist in front of the ${title}.Take into account that you are probably in front of the monument.Please respond in HTML format, you can use bullet points, paragraphs and bold text to make the information more readable.`


    const useGpt4 = false;
    const model = useGpt4 ? "gpt-4-turbo-preview" : "gpt-3.5-turbo";
    const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const assistantMessage = await openAI.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: [
            { role: 'system', content: systemMessage },
            ...messages.map(message => ({ role: message.role, content: message.conent }))
        ]
    });
    return assistantMessage.choices[0].message.content || '';
}

export { getAssistantMessage }