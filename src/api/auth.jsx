import axios from "axios";

/**
 * See if a particular token is verified
 */
export const verifyUser = async (jwtToken) => {
    const response = await axios.get("http://localhost:5001/authentication/verify", {
        headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            token: `${jwtToken}`, // Pass the token in as a header since this is how we access this in the backend
        },
    });
    const verified = response.data;
    return verified; // Return the extracted ingredient list
};

export const signup = async (userInfo) => {
    const response = await axios.post(
        "http://localhost:5001/authentication/signup",
        userInfo, // Pass this in the request body
        {
            headers: {
                "Content-Type": "application/json", // Set the content type to JSON
            },
        }
    ); // Get from 5001 which is what express is set to run on right now
    const parseResult = await response.data;
    return parseResult;
};

export const login = async (userInfo) => {
    const response = await axios.post(
        "http://localhost:5001/authentication/login",
        userInfo, // Pass this in the request body
        {
            headers: {
                "Content-Type": "application/json", // Set the content type to JSON
            },
        }
    ); // Get from 5001 which is what express is set to run on right now
    const parseResult = await response.data;
    return parseResult;
};
