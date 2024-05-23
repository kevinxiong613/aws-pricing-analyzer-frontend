import axios from "axios";

// This function should be used in a server-side context

export const verifyIngredients = async (ingredientString) => {
    const prompt = `DONT CONSIDER ANY PREVIOUS QUESTIONS OR RESPONSES FOR THIS. Tell me which of these ingredients are NOT consumable foods: ${ingredientString}. Give me a response with the ingredients separated by a comma and don't say anything else. If all of them are okay to cook/eat then say "None".`; // This is the prompt that happened to work best at identifying which are not allowed to be cooked. Gives response back as string seperating the bad ingredients with commas
    const response = await axios.get("http://localhost:5001/generate/verifyIngredients", {
        headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            prompt: `${prompt}`,
        },
    });
    const parseResult = await response.data;
    console.log(parseResult);
    return parseResult;
};

export const getRecipe = async (ingredientString) => {
    const prompt = `Generate a recipe using these ingredients: ${ingredientString}. You can add seasonings and other ingredients too, but if things don't work together please don't force it. Give specific ingredient measurements. For instructions to cook, please be very detailed and specific and include heat and time ranges. Also include instructions on how to prepare the ingredients. Give the recipe in this format: Title: title--Ingredients: ingredient1, ingredient2, ingredient3--Instructions: step1. step2. step3. Please follow this format EXACTLTY (seperate ingredients BY COMMAS and instructions BY PERIODS). DO NOT treat this like a json and DO NOT USE MARKDOWN. For the steps don't label them with numbers. Deliver your respone all in ONE LINE.`;
    const response = await axios.get("http://localhost:5001/generate/getRecipe", {
        headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            prompt: `${prompt}`,
        },
    });
    const parseResult = await response.data;
    console.log(parseResult);
    return parseResult;
};
