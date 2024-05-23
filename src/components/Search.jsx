"use client";
import React, { useEffect, useState } from "react";
import "../app/styles/globals.css";
import { GoAlert } from "react-icons/go";
import { verifyIngredients } from "@/api/gemini";
import { getRecipe } from "@/api/gemini";
import { toast, ToastContainer } from "react-toastify"; // Toasts to indicate if something is wrong
import "react-toastify/dist/ReactToastify.css";
import { GoCheckCircle } from "react-icons/go";
import { Circles } from "react-loader-spinner";
import { saveRecipe } from "@/api/recipe";

export default function Search() {
    const [badIngredientList, setBadIngredientList] = useState([]); // The unverified ingredients, which includes when you just add it
    const [goodIngredientList, setGoodIngredientList] = useState([]); // The verified ingredients
    const [ingredient, setIngredient] = useState(""); // Used to keep track of the ingredient in the search bar
    const [loading, setLoading] = useState(false); // Loading state for API calls

    const [title, setTitle] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [displayIngredients, setDisplayIngredients] = useState([]);

    const handleIngredientChange = (event) => {
        // When the search bar value changes
        setIngredient(event.target.value);
    };
    const handleIngredientAdd = (event) => {
        // Add the ingredient to the list of ingredients
        event.preventDefault();
        if (ingredient.length > 2) {
            // Any ingredients under length 2 not allowed
            setBadIngredientList([...badIngredientList, ingredient]); // Add ingredient to prompt array
            setIngredient(""); // Turn ingredient back to how it used to be
        }
    };
    const handleKeyDown = (event) => {
        // Enter key to add ingredient in case people don't want to click "add"
        if (event.key === "Enter") {
            handleIngredientAdd(event);
        }
    };
    const handleVerify = async (event) => {
        event.preventDefault(); // Add this line to prevent it from doing it twice due to it automatically just reloading by default
        const verify = async () => {
            try {
                const ingredientString = badIngredientList.join(", "); // Turn the ingredients into a string to verify

                const ingredients = await verifyIngredients(ingredientString); // Call my Express.js route, didn't directly call Gemini here to not worry about exposing API key

                const blacklist = ingredients["text"].split(", "); // Turn the ingredients string back into a list of ingredients
                const blackset = new Set(blacklist); // Turn it into a set

                const newBadList = []; // Set a newBadList to set the bad list to in the end
                const newGoodList = goodIngredientList; // Temporarily have a variable to keep track of the good list too
                for (var i = 0; i < badIngredientList.length; i++) {
                    if (!blackset.has(badIngredientList[i])) {
                        // If an ingredient from the badIngredientList is not in the ingredients Gemini gave, it's safe
                        // This is a good ingredient that's okay to use
                        newGoodList.push(badIngredientList[i]);
                    } else {
                        // Otherwise it's not suitable to eat
                        newBadList.push(badIngredientList[i]);
                    }
                    console.log("Good list: " + newGoodList);
                    console.log("Bad list: " + newBadList);
                }
                setGoodIngredientList(newGoodList);
                setBadIngredientList(newBadList); // Set the bad ingredient list again
            } catch (error) {
                // If something goes wrong let the user know
                toast.error(error.response.data, { position: "bottom-right" });
                console.error(error.response.data);
            } finally {
                setLoading(false); // Disable loading circle no matter what happens so we can see the ingredients again
            }
        };
        if (badIngredientList.length > 0) {
            setLoading(true); // Set this to true to make the add button and verify button unclickable, and also add a loading circle
            verify(); // Only do this if there are ingredients to check
        }
    };

    const handleGetRecipe = async (event) => {
        event.preventDefault(); // Prevent from occuring twice
        const recipes = async () => {
            try {
                const ingredientString = goodIngredientList.join(", "); // Join the good list for getting recipes
                console.log("entered getRecipe");
                const recipe = await getRecipe(ingredientString);
                setDisplayIngredients(recipe["ingredients"]); // Set the display ingredients and the instructions like so
                setInstructions(recipe["instructions"]);
                setTitle(recipe["title"]);
            } catch (error) {
                toast.error(error.response.data, { position: "bottom-right" });
                console.error(error.response.data);
            } finally {
                setLoading(false); // Make sure the loading is set back to false at the end
            }
        };
        if (goodIngredientList.length >= 1 || badIngredientList.length == 0) {
            // Don't call this without these being true
            setLoading(true);
            recipes();
        }
    };

    const handleSaveRecipe = async (event) => {
        event.preventDefault();
        const recipes = async () => {
            try {
                const recipeObj = {
                    title: title,
                    ingredients: displayIngredients,
                    instructions: instructions,
                    user_id: localStorage.getItem("user_id"),
                };
                const recipe = await saveRecipe(recipeObj);
            } catch (error) {
                toast.error(error.response.data, { position: "bottom-right" });
                console.error(error.response.data);
            }
        };
        recipes();
    };

    return (
        <div className="flex flex-col items-center mt-20">
            {/* ---------- SEARCH BAR ---------- */}
            <ToastContainer />
            <div className="mb-6 border-b border-gray-300 pb-4 w-full md:w-3/4">
                <div className="flex items-center justify-center">
                    <input
                        type="text"
                        value={ingredient}
                        onChange={handleIngredientChange} // Keep track of the string that is in the search bar
                        onKeyDown={handleKeyDown} // Allow the enter key to also add things to the badIngredientList
                        placeholder="Enter Ingredient"
                        className="px-4 py-2 mr-4 border border-gray-300 rounded-lg w-2/3"
                    />
                    <button
                        onClick={handleIngredientAdd} // Adds the ingredient to the badIngredientList, not goodIngredientList since it still needs to be checked
                        className={`px-4 py-2 rounded-lg ${
                            loading
                                ? "bg-loading"
                                : "bg-customBlue text-white hover:bg-customLightBlue"
                        }`}
                        disabled={loading} // Disable button when loading
                    >
                        Add
                    </button>
                </div>
            </div>
            {/* ---------- INGREDIENTS AND DESCRIPTION ---------- */}
            <div className="flex w-full md:w-3/4 mt-8 bg-white">
                {/* ---------- INGREDIENTS BOX ---------- */}
                <div className="w-1/4 p-4 border border-gray-300 rounded-lg shadow-lg mr-4 bg-white">
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">
                        Possible Ingredients:
                    </h2>
                    {loading ? ( // Need this, kind of ugly but want a loading circle if this is the case
                        <div className="flex justify-center items-center h-96 overflow-y-auto mb-5">
                            <Circles color="#00BFFF" height={80} width={80} />
                        </div>
                    ) : (
                        <div className="h-96 overflow-y-auto mb-5">
                            <ul className="list-disc">
                                {goodIngredientList.map((ingredient, index) => (
                                    <li
                                        key={index} // Map the ingredients into a list to be displayed
                                        className="text-lg text-gray-600 flex items-center mb-1"
                                    >
                                        <GoCheckCircle // Use circle icons for good ingredients that have been verified
                                            color="green"
                                            className="mr-3"
                                        />
                                        {ingredient}
                                    </li>
                                ))}
                                {badIngredientList.map((ingredient, index) => (
                                    <li key={index} className="text-lg flex items-center">
                                        <GoAlert color="red" className="mr-3" />{" "}
                                        {/* Use alert icons for ingredients that weren't verified */}
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="flex justify-between">
                        {/* ---------- VERIFY BUTTON ---------- */}
                        <button // Verification button to verify again
                            className={`py-2 px-4 font-bold text-white text-xl rounded-lg ${
                                loading || badIngredientList.length < 1
                                    ? "bg-loading"
                                    : "bg-customGreen hover:bg-customLightGreen"
                            }`}
                            type="submit"
                            onClick={handleVerify}
                            disabled={loading || badIngredientList.length < 1} // Disable button when loading
                        >
                            Verify
                        </button>
                        <button // Verification button to verify again
                            className={`py-2 px-4 font-bold text-white text-xl rounded-lg ${
                                loading ||
                                badIngredientList.length > 0 ||
                                goodIngredientList.length < 1 // If any of these conditions are true don't let them click it
                                    ? "bg-loading"
                                    : "bg-customGreen hover:bg-customLightGreen"
                            }`}
                            type="submit"
                            onClick={handleGetRecipe}
                            disabled={
                                loading ||
                                badIngredientList.length > 0 ||
                                goodIngredientList.length < 1
                            } // Disable button when loading, or if there are still bad ingredients, or there are no good ingredients
                        >
                            Get Recipes!
                        </button>
                    </div>
                </div>
                {instructions.length < 1 ? (
                    // ---------- TEMPORRAY INSTRUCTION BEFORE RECIPE IS GENERATED ----------
                    <div className="center w-3/4 p-4 border border-gray-300 rounded-lg shadow-lg bg-white text-3xl font-bold">
                        Please create a list of verified ingredients to generate a recipe
                    </div>
                ) : (
                    // ---------- RECIPE AND INGREDIENTS AND INSTRUCTIONS ----------
                    <div className="w-3/4 p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
                        <h1 className="text-2xl font-bold text-gray-700 mb-2">{title}</h1>
                        <div className="h-96 overflow-y-auto mb-5">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                Ingredients:
                            </h2>
                            <ul className="list-disc list-inside mb-4">
                                {displayIngredients.map(
                                    // Map the ingredients to an unordered list
                                    (ingredient, index) => (
                                        <li
                                            key={index}
                                            className="text-lg text-gray-600 flex items-center mb-1"
                                        >
                                            {ingredient}
                                        </li>
                                    )
                                )}
                            </ul>
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                Steps:
                            </h2>
                            <ul className="list-decimal list-inside">
                                {instructions.map(
                                    // Map the instructions to an ordered list
                                    (instruction, index) => (
                                        <li
                                            key={index}
                                            className="text-lg text-gray-600 flex items-center mb-1"
                                        >
                                            {instruction}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <button // Verification button to verify again
                            className={`py-2 px-4 font-bold text-white text-xl rounded-lg ${
                                loading || instructions.length < 1 // If any of these conditions are true don't let them click it
                                    ? "bg-loading"
                                    : "bg-customBlue hover:bg-customLightBlue"
                            }`}
                            type="submit"
                            onClick={handleSaveRecipe}
                            disabled={
                                loading || instructions.length < 1 // Don't allow click if it's either 1. disabled or 2. nothing has been generated yet
                            } // Disable button when loading, or if there are still bad ingredients, or there are no good ingredients
                        >
                            Save Recipe
                        </button>
                    </div>
                )}
                ;
            </div>
        </div>
    );
}
