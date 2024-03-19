import logger from "@/logger";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser, JsonOutputParser } from "@langchain/core/output_parsers";
import { AttractionsLlmToolInputInterface, FoodLlmToolInputInterface, attractionsLlmFunctionName, attractionsLlmTool, foodLlmFunctionName, foodLlmTool } from './llmFunctions';
import { JsonOutputToolsParser, JsonKeyOutputFunctionsParser } from "langchain/output_parsers";
import { Food } from "@prisma/client";


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
        const outputParser = new JsonOutputToolsParser();

        const chain = prompt.pipe(modelWithTools).pipe(outputParser);
        // Log time to fetch city description from Open AI
        const start = new Date().getTime();
        const response: { type: string, args: Object }[] = await chain.invoke({});
        const attractionsResponse = response.find((r) => r.type === attractionsLlmFunctionName)?.args as AttractionsLlmToolInputInterface;
        const attractions = attractionsResponse?.attractions || [];

        const end = new Date().getTime();
        //time in seconds
        logger.info({
            message: 'Time to fetch city must visit attractions from Open AI',
            time: (end - start) / 1000
        });

        return attractions;

    } catch (error) {
        logger.error({
            message: 'Error fetching city must visit attractions from Open AI',
            error: error
        });
        return [];
    }
}

const fetchCityMustEatFood = async ({ city, country }: { city: string, country: string }) => {
    const systemMessage =
        `Give a list with the main traditional meals in ${city}, ${country}. Give a short description of maximum 1000 characters for each one`;

    try {
        const modelWithTools = getChatModel(ChatModel.GPT3).bind({
            tools: [foodLlmTool],
            tool_choice: foodLlmTool,
        })
        const prompt = ChatPromptTemplate.fromMessages([
            ['system', systemMessage]
        ]);
        const outputParser = new JsonOutputToolsParser();

        const chain = prompt.pipe(modelWithTools).pipe(outputParser);
        // Log time to fetch from Open AI
        const start = new Date().getTime();
        const response: { type: string, args: Object }[] = await chain.invoke({});
        const mealsResponse = response.find((r) => r.type === foodLlmFunctionName)?.args as FoodLlmToolInputInterface;
        const meals = mealsResponse?.meals || [];

        const end = new Date().getTime();
        //time in seconds
        logger.info({
            message: 'Time to fetch must try meal from Open AI',
            time: (end - start) / 1000
        });

        return meals;

    } catch (error) {
        logger.error({
            message: 'Error fetching city must try meals from Open AI',
            error: error
        });
        return [];
    }
}

export { getCityDescription, fetchCityMustVisitAttractions, fetchCityMustEatFood }