import { HfInference } from "@huggingface/inference";
import { config } from "../config/config";
import { jsonrepair } from "jsonrepair";

const client = new HfInference(config.api_key);

// Function to extract and parse JSON safely
function extractAndParseJSON(rawResponse) {
  try {
    // Improved regex to isolate the JSON array from the response
    const jsonMatch = rawResponse.match(
      /\[(?:[^\[\]]+|\[(?:[^\[\]]+|\[.*?\])*\])*\]/gm
    );

    if (jsonMatch && jsonMatch[0]) {
      const jsonString = jsonMatch[0];

      const repairedJson = jsonrepair(jsonString);
      // Parse the isolated JSON string
      const parsedData = JSON.parse(repairedJson);

      // Validate the parsed data to ensure it's an array
      if (Array.isArray(parsedData)) {
        return parsedData;
      } else {
        throw new Error("Extracted JSON is not an array");
      }
    } else {
      throw new Error("No valid JSON array found in the response");
    }
  } catch (error) {
    console.error("Failed to parse JSON:", error.message);
    console.error("Raw Response Content:", rawResponse);
    return null;
  }
}

export default async function fetchRecipe(ingredients) {
  console.log("Ingredients provided:", ingredients.join(","));
  try {
    const chatCompletion = await client.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        {
          role: "user",
          content: `Generate more than one recipe using the ingredients: ${ingredients.join(
            ","
          )}. Incorporate the provided ingredients, but not all need to be used. Create a stringified JSON Array of objects with the following fields: name (recipe title), ingredients (an array of objects with name, quantity with unit), and procedure (a numbered array of step-by-step instructions). Ensure the recipe is clear, realistic, and cohesive.`,
        },
      ],
      max_tokens: 4096,
    });

    const response = chatCompletion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("API response is empty or malformed");
    }

    // Extract and parse JSON safely
    const recipeData = extractAndParseJSON(response);

    if (!recipeData) {
      throw new Error("Failed to extract valid recipe data");
    }

    return recipeData;
  } catch (error) {
    console.error("Error in fetching recipe:", error.message);
    return error;
  }
}
