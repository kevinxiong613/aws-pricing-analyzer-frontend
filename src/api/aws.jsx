import axios from "axios";

/**
 * See if a particular token is verified
 */
export const getAWS = async () => {
    const response = await axios.get(
        "https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/eu-west-1/index.json"
    );
    const verified = response.data;
    return verified; // Return the extracted ingredient list
};
