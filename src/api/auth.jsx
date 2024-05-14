import axios from "axios";

/**
 * Get ingredient list
 */
export const verifyUser = async () => {
    const response = await axios.get("http://localhost:5001/authentication/verify");
    const verified = response.data;
    return verified; // Return the extracted ingredient list
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

export function setTokenCookie(res, token) {
    const cookie = serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/", // Set the cookie path
        sameSite: "strict",
    });
    res.setHeader("Set-Cookie", cookie);
}
