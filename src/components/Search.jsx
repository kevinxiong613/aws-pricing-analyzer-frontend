"use client";
import React, { useEffect, useState } from "react";
import "../app/styles/globals.css";
import Image from "next/image";
import { getRecipes } from "@/api/gemini";

export default function Search() {
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
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleIngredientAdd(event);
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
        <div className="flex flex-col items-center mt-20">
            {/* Search bar */}
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
                        className="px-4 py-2 bg-customText text-white rounded-lg hover:bg-blue-600"
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
                    <div className="h-64 overflow-y-auto">
                        <ul className="list-disc ml-8">
                            {prompt.map((ingredient, index) => (
                                <li key={index} className="text-lg">
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>
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
