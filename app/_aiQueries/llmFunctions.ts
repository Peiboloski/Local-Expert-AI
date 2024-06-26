import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const attractionsLlmToolSchema = z.object({
    attractions: z.array(z.object({
        name: z.string(),
        shortDescription: z.string(),
    }))
});

const attractionsLlmFunctionName = "setAttractions";

const attractionsLlmTool = {
    type: "function" as const,
    function: {
        name: attractionsLlmFunctionName,
        description: "Set turistic attractions array with name and description for each attraction",
        parameters: zodToJsonSchema(attractionsLlmToolSchema),
    }
}

const foodLlmToolSchema = z.object({
    meals: z.array(z.object({
        name: z.string(),
        shortDescription: z.string(),
    }))
});

const foodLlmFunctionName = "setMeal";

const foodLlmTool = {
    type: "function" as const,
    function: {
        name: foodLlmFunctionName,
        description: "Set must try meals array with name and description for each meal",
        parameters: zodToJsonSchema(foodLlmToolSchema),
    }
}

export type AttractionsLlmToolInputInterface = z.infer<typeof attractionsLlmToolSchema>;
export type FoodLlmToolInputInterface = z.infer<typeof foodLlmToolSchema>;
export { attractionsLlmTool, attractionsLlmFunctionName, foodLlmTool, foodLlmFunctionName }