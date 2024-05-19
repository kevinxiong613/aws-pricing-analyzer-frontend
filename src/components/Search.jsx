"use client";
import React, { useEffect, useState } from "react";
import "../app/styles/globals.css";
import Image from "next/image";
import { getRecipes } from "@/api/gemini";

export default function Dashboard() {
    const [prompt, setPrompt] = useState([]);
    const [ingredient, setIngredient] = useState("");
    const handleIngredientChange = (event) => {
        setIngredient(event.target.value);
    };
    const handleIngredientAdd = (event) => {
        if (ingredient.length > 3) {
            setPrompt([...prompt, ingredient]); // Add ingredient to prompt array
            setIngredient(""); // Turn ingredient back to how it used to be
        }
    };
    // useEffect(() => {
    //     const getRecipe = async () => {
    //         try {
    //             const prompt =
    //                 "I have 1/4 cups of chicken, 1/2 cups of soy sauce, and a box of pasta. Give me 3 recipes with specific ingredient measurements and detailed instructions with heat and time ranges to use these ingredients. Include the ingredients I mentioned in the recipe list.";
    //             const recipe = await getRecipes(prompt);
    //             console.log(recipe);
    //         } catch (error) {
    //             console.error(error.message);
    //         }
    //     };
    //     getRecipe();
    // }, []);
    return (
        <div className="flex justify-center">
            {" "}
            {/* Center horizontally */}
            <div className="center mt-20 justify-center">
                <div className="mb-6">
                    <input
                        type="text"
                        value={ingredient}
                        onChange={handleIngredientChange}
                        placeholder="Enter Ingredient"
                        className="px-4 py-2 mr-2 border border-gray-300 rounded-lg"
                    />
                    <button
                        onClick={handleIngredientAdd}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Add
                    </button>
                </div>
                <h1 className="text-2xl font-bold mb-4">Current Ingredients:</h1>
                <ul className="list-disc ml-8">
                    {prompt.map((ingredient, index) => (
                        <li key={index} className="text-lg">
                            {ingredient}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
