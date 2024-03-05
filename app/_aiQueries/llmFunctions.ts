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
        description: "Set turistic attractions",
        paramenters: zodToJsonSchema(attractionsLlmToolSchema),
    }
}

export type AttractionsLlmToolInputInterface = z.infer<typeof attractionsLlmToolSchema>;
export { attractionsLlmTool, attractionsLlmFunctionName };