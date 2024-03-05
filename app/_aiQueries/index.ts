import logger from "@/logger";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser, JsonOutputParser } from "@langchain/core/output_parsers";
import { attractionsLlmFunctionName, attractionsLlmTool } from './llmFunctions';
import { JsonOutputToolsParser, JsonKeyOutputFunctionsParser } from "langchain/output_parsers";


enum ChatModel {
    GPT3 = "gpt-3.5-turbo",
    GPT4 = "gpt-4-turbo-preview"
}

const getChatModel = (model: ChatModel) => {
    switch (model) {
        case ChatModel.GPT3:
            return new ChatOpenAI({
                openAIApiKey: process.env.OPENAI_API_KEY,
                modelName: "gpt-3.5-turbo"
            });
        case ChatModel.GPT4:
            return new ChatOpenAI({
                openAIApiKey: process.env.OPENAI_API_KEY,
                modelName: "gpt-4-turbo-preview"
            });
    }
}



const getCityDescription = async ({ city, country }: { city: string, country: string }) => {
    //return 'MOCKED RESPONSE';

    const systemMessage =
        `Give main information about ${city} in ${country} as if you where talking to a tourist. Use at leat 500 words. Talk about the history and what makes the city important. don't add a welcome message or mention the name of the city as it is already mentioned. Please respond STRICTLY in HTML format and don't use ** for bold or - for bullet points, don't add \`\`\`html. you can use bullet points (but don't have to use them if the response doesn't need it), paragraphs and bold text to make the information more readable.`;
    try {
        const model = getChatModel(ChatModel.GPT3)
        const prompt = ChatPromptTemplate.fromMessages([
            ['system', systemMessage]
        ]);
        const outputParser = new StringOutputParser();

        const chain = prompt.pipe(model).pipe(outputParser);
        // Log time to fetch city description from Open AI
        const start = new Date().getTime();
        const response = await chain.invoke({});
        const end = new Date().getTime();
        //time in seconds
        logger.info({
            message: 'Time to fetch city description from Open AI',
            time: (end - start) / 1000
        });
        return response;
    } catch (error) {
        logger.error({
            message: 'Error fetching city description from Open AI',
            error: error
        });
        return '';
    }
}

const fetchCityMustVisitAttractions = async ({ city, country }: { city: string, country: string }) => {
    const systemMessage =
        `Give a list with the main touristic attractions in ${city}, ${country}. Give a short description of maximum 200 characters for each attraction.`;

    try {
        const modelWithTools = getChatModel(ChatModel.GPT3).bind({
            tools: [attractionsLlmTool],
            tool_choice: attractionsLlmTool,
        })
        const prompt = ChatPromptTemplate.fromMessages([
            ['system', systemMessage]
        ]);
        const outputParser = new JsonKeyOutputFunctionsParser({
            attrName: attractionsLlmFunctionName
        });

        const chain = prompt.pipe(modelWithTools).pipe(outputParser);
        // Log time to fetch city description from Open AI
        const start = new Date().getTime();
        const response = await chain.invoke({});
        console.log("response", response)

        const end = new Date().getTime();
        //time in seconds
        logger.info({
            message: 'Time to fetch city must visit attractions from Open AI',
            time: (end - start) / 1000
        });

        return response;

    } catch (error) {
        logger.error({
            message: 'Error fetching city must visit attractions from Open AI',
            error: error
        });
        return [];
    }
}

export { getCityDescription, fetchCityMustVisitAttractions }