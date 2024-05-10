import axios from "axios";

/**
 * Get ingredient list
 */
export const verifyUser = async () => {
    try {
        const response = await axios.get("http://localhost:5001/verify");
        if (response.status < 200 || response.status >= 300) {
            // Throw an error if there is an invalid status code
            throw new Error(`Error fetching ingredients: ${response.statusText}`);
        }
        console.log(response.data);
        // Assuming the response data is the ingredient list:
        const ingredients = response.data;
        return ingredients; // Return the extracted ingredient list
    } catch (error) {
        console.error("Error fetching ingredients:", error);
    }
};

export const signup = async (userInfo) => {
    const response = await axios.post(
        "http://localhost:5001/authentication/signup",
        userInfo,
        {
            headers: {
                "Content-Type": "application/json", // Set the content type to JSON
            },
        }
    ); // Get from 5001 which is what express is set to run on right now
    const parseResult = await response.data;
    return parseResult;
};
