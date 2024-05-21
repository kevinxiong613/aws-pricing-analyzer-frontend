"use client";
import React, { useEffect, useState } from "react";
import "../app/styles/globals.css";
import { GoAlert } from "react-icons/go";
import { verifyIngredients } from "@/api/gemini";
import { toast, ToastContainer } from "react-toastify"; // Toasts to indicate if something is wrong
import "react-toastify/dist/ReactToastify.css";
import { GoCheckCircle } from "react-icons/go";

export default function Search() {
    const [badIngredientList, setBadIngredientList] = useState([]);
    const [goodIngredientList, setGoodIngredientList] = useState([]);
    const [ingredient, setIngredient] = useState("");
    const handleIngredientChange = (event) => {
        setIngredient(event.target.value);
    };
    const handleIngredientAdd = (event) => {
        event.preventDefault();
        if (ingredient.length > 3) {
            setBadIngredientList([...badIngredientList, ingredient]); // Add ingredient to prompt array
            setIngredient(""); // Turn ingredient back to how it used to be
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleIngredientAdd(event);
        }
    };
    const handleVerify = async (event) => {
        event.preventDefault(); // Add this line to prevent it from doing it twice due to it automatically just reloading by default
        const verify = async () => {
            try {
                const ingredientString = badIngredientList.join(", "); // Turn the ingredients into a string to verify

                const prompt = `Tell me which of these ingredients are not meant for cooking: ${ingredientString}. Remember that cooking equipment isn't meant for cooking. Give me a response with the ingredients separated by a comma and don't say anything else`;
                console.log("PROMPT: " + prompt);
                const ingredients = await verifyIngredients(prompt);

                const blacklist = ingredients["text"].split(", "); // Turn the ingredients string back into a list of ingredients
                const blackset = new Set(blacklist); // Turn it into a set

                const newBadList = [];
                const newGoodList = goodIngredientList;
                for (var i = 0; i < badIngredientList.length; i++) {
                    if (!blackset.has(badIngredientList[i])) {
                        // This is a good ingredient that's okay to use
                        newGoodList.push(badIngredientList[i]);
                        console.log("fine");
                    } else {
                        newBadList.push(badIngredientList[i]);
                    }
                    console.log(newGoodList);
                    console.log(newBadList);
                }
                setGoodIngredientList(newGoodList);
                setBadIngredientList(newBadList); // Set the bad ingredient list again
            } catch (error) {
                toast.error("Could not verify ingredients at this time.", {
                    position: "bottom-right",
                });
                console.error(error.message);
            }
        };
        verify();
    };

    return (
        <div className="flex flex-col items-center mt-20">
            {/* Search bar */}
            <ToastContainer />
            <div className="mb-6 border-b border-gray-300 pb-4 w-full md:w-3/4">
                <div className="flex items-center justify-center">
                    <input
                        type="text"
                        value={ingredient}
                        onChange={handleIngredientChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter Ingredient"
                        className="px-4 py-2 mr-4 border border-gray-300 rounded-lg w-2/3"
                    />
                    <button
                        onClick={handleIngredientAdd}
                        className="px-4 py-2 bg-customBlue text-white rounded-lg hover:bg-customLightBlue"
                    >
                        Add
                    </button>
                </div>
            </div>
            {/* Ingredients and Description */}
            <div className="flex w-full md:w-3/4 mt-8">
                {/* Ingredient List */}
                <div className="w-1/4 p-4 border border-gray-300 rounded-lg mr-4">
                    <h2 className="text-2xl font-bold mb-4">Ingredients:</h2>
                    <div className="h-80 overflow-y-auto">
                        <ul className="list-disc">
                            {goodIngredientList.map((ingredient, index) => (
                                <li key={index} className="text-lg flex items-center">
                                    <GoCheckCircle color="green" className="mr-3" />
                                    {ingredient}
                                </li>
                            ))}
                            {badIngredientList.map((ingredient, index) => (
                                <li key={index} className="text-lg flex items-center">
                                    <GoAlert color="red" className="mr-3" />
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button
                        className="bg-customGreen py-2 px-4 font-bold text-white text-xl rounded-lg hover:bg-customLightGreen"
                        type="submit"
                        onClick={handleVerify}
                    >
                        Verify
                    </button>
                </div>
                {/* Description */}
                <div className="w-3/4 p-4 border border-gray-300 rounded-lg">
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus
                        repellendus aut repellat ut exercitationem aliquid corporis eius
                        nam quo eveniet, qui et ex commodi ducimus est quam obcaecati
                        nesciunt nemo? Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Minus repellendus aut repellat ut exercitationem aliquid
                        corporis eius nam quo eveniet, qui et ex commodi ducimus est quam
                        obcaecati nesciunt nemo? Lorem ipsum, dolor sit amet consectetur
                        adipisicing elit. Minus repellendus aut repellat ut exercitationem
                        aliquid corporis eius nam quo eveniet, qui et ex commodi ducimus
                        est quam obcaecati nesciunt nemo? Lorem ipsum, dolor sit amet
                        consectetur adipisicing elit. Minus repellendus aut repellat ut
                        exercitationem aliquid corporis eius nam quo eveniet, qui et ex
                        commodi ducimus est quam obcaecati nesciunt nemo?
                    </p>
                </div>
            </div>
        </div>
    );
}
