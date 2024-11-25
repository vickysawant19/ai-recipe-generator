import { HfInference } from "@huggingface/inference";

const client = new HfInference("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");

// Function to extract and parse JSON from the response
function extractAndParseJSON(rawResponse) {
  try {
    // Extract the JSON part of the response
    const jsonStart = rawResponse.indexOf("[");
    const jsonEnd = rawResponse.lastIndexOf("]");
    const jsonString = rawResponse.substring(jsonStart, jsonEnd + 1);
    // Parse the JSON string
    const parsedData = JSON.parse(jsonString);
    return parsedData;
  } catch (error) {
    console.error("Failed to parse JSON:", error.message);
    return null;
  }
}

export default async function fetchRecipe(ingredients) {
  console.log(ingredients.join(","));
  try {
    const chatCompletion = await client.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        {
          role: "user",
          content: `Generate more than one recipes using the ingredients: ${ingredients.join(
            ","
          )}. Incorporate the provided ingredients, but not all need to be used. Create a stringyfied JSON Array of object with the following fields: name (recipe title), ingredients (an array of objects with name, quantity, and unit), and procedure (a numbered array of step-by-step instructions). Ensure the recipe is clear,realistic, and cohesive.`,
        },
      ],
      //   max_tokens: 500,
      max_tokens: 4096,
    });
    const response = chatCompletion.choices[0].message;
    const recipeData = extractAndParseJSON(response.content);
    return recipeData;
  } catch (error) {
    console.log(error);
  }
}
