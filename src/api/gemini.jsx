import axios from "axios";

// This function should be used in a server-side context

export const verifyIngredients = async (prompt) => {
    const response = await axios.get("http://localhost:5001/recipes/getRecipes", {
        headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            prompt: `${prompt}`,
        },
    });
    const parseResult = await response.data;
    console.log(parseResult);
    return parseResult;
};
