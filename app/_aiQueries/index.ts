import logger from "@/logger";
import OpenAI from "openai";



const getCityDescription = async ({ city, country }: { city: string, country: string }) => {
    //return 'MOCKED RESPONSE';

    const systemMessage =
        `Give main information about ${city} in ${country} as if you where talking to a tourist. Use at leat 500 words. Talk about the history and what makes the city important. don't add a welcome message or mention the name of the city as it is already mentioned. Please respond STRICTLY in HTML format and don't use ** for bold or - for bullet points, you can use bullet points (but don't have to use them if the response doesn't need it), paragraphs and bold text to make the information more readable.`;
    const useGpt4 = true;
    const model = useGpt4 ? "gpt-4-turbo-preview" : "gpt-3.5-turbo";

    try {
        const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const assistantMessage = await openAI.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [
                { role: 'system', content: systemMessage },
            ]
        });
        return assistantMessage.choices[0].message.content || '';
    } catch (error) {
        logger.error({
            message: 'Error fetching city description from Open AI',
            error: error
        });
        return 'Error fetching city description';
    }
}

export { getCityDescription }