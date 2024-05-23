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

export const getUserRecipes = async (user_id) => {
    const response = await axios.get("http://localhost:5001/recipes/getUserRecipes", {
        headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            user_id: `${user_id}`,
        },
    });
    const parseResult = await response.data;
    console.log(parseResult);
    return parseResult;
};
