import React, { useEffect, useState } from "react";
import "../app/styles/globals.css";
import Image from "next/image";
import { getUserRecipes } from "@/api/recipe";
import GestureControl from "./GestureControl";

export default function Dashboard() {
    const [recipes, setRecipes] = useState([]);
    const [currRecipe, setCurrRecipe] = useState(null);

    useEffect(() => {
        const getUserReps = async () => {
            try {
                const queriedRecipes = await getUserRecipes(
                    localStorage.getItem("user_id")
                );
                const fetchedRecipes = queriedRecipes.recipes; // Access the .recipes property which holds the list of recipes
                setRecipes(fetchedRecipes);
                console.log(fetchedRecipes); // Log the fetched recipes
            } catch (error) {
                console.error(error.message);
            }
        };
        getUserReps();
    }, []);

    const handleRecipeClick = (recipe) => {
        setCurrRecipe(recipe); // Set the current recipe to be view to the one we just clicked
        console.log(recipe);
        console.log(currRecipe);
    };

    const handleBack = (recipe) => {
        setCurrRecipe(null); // Set it back to null to go back to the dashboard to choose again
    };

    return (
        <div>
            {!currRecipe ? (
                <div className="min-h-screen bg-customWhiteHeader flex flex-col items-center mt-10">
                    <div className="flex flex-col items-center justify-center pt-10">
                        <h2 className="text-3xl font-newsreader p-5 text-center">
                            Welcome to Your Dashboard
                        </h2>
                        <div className="flex items-center justify-center mb-10">
                            <Image
                                className="mb-2 mr-5 rounded-lg shadow-lg"
                                src={`/test.png`}
                                width="600"
                                height="400"
                                alt="Dashboard Image"
                            />
                        </div>
                    </div>
                    <div className="w-full max-w-3xl p-4">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                                Your Recipes:
                            </h3>
                            <ol className="list-decimal list-inside bg-white p-4 rounded-lg shadow-md">
                                {recipes.map((recipe, index) => (
                                    <li
                                        key={index}
                                        className="text-lg text-gray-800 mb-2 p-4 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                                        onClick={() => handleRecipeClick(recipe)}
                                    >
                                        {recipe.title}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center">
                        <div>
                            <GestureControl />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-700 mb-4 pt-20">
                            {currRecipe.title}
                        </h1>
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">
                            Ingredients:
                        </h2>
                        <ul className="list-disc list-inside text-lg text-gray-800 mb-4">
                            {currRecipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="mb-2 px-4">
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">
                            Instructions:
                        </h2>
                        <ol className="list-decimal list-inside text-lg text-gray-800 w-1/2">
                            {currRecipe.instructions.map((instruction, index) => (
                                <li key={index} className="mb-2 px-4">
                                    {instruction}
                                </li>
                            ))}
                        </ol>
                        <button // Verification button to verify again
                            className="py-2 px-4 font-bold text-white bg-customRed hover:bg-customLightRed text-xl rounded-lg"
                            type="submit"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
