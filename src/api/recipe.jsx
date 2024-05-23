import axios from "axios";

export const saveRecipe = async (body) => {
    const response = await axios.post(
        "http://localhost:5001/recipes/saveRecipe",
        body, // Pass in the body with the title, ingredients, instructions, and user_email in
        {
            headers: {
                "Content-Type": "application/json", // Set the content type to JSON
            },
        }
    );
    const parseResult = await response.data;
    console.log(parseResult);
    return parseResult;
};
