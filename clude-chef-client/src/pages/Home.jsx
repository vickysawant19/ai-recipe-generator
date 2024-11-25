import React, { useEffect, useState } from "react";
import Recipe from "../components/Recipe.Jsx";
import About from "../components/About";
import HowItWorks from "../components/HowItWorks";
import fetchRecipe from "../utils/api";

const Home = () => {
  const [input, setInput] = useState("");
  const [ingredient, setIngredient] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddIngredent = (e) => {
    e.preventDefault();
    input !== "" ? setIngredient([...ingredient, input]) : "";
    setInput("");
  };

  const handleGenerate = async () => {
    try {
      setError("");
      setIsLoading(true);
      console.log("Generating...");
      if (ingredient.length > 0) {
        const data = await fetchRecipe(ingredient);
        setRecipes(data);
      }
    } catch (error) {
      setError("Something went wrong! Try Again...");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main">
      <section className="hero">
        <h1>What's in your fridge?</h1>
        <p>Input your ingredients, and let AI create your perfect recipe!</p>
        <form className="ingredient-form">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter ingredients (e.g., eggs, milk)"
            className="input-field"
          />
          <button
            onClick={(e) => handleAddIngredent(e)}
            type="submit"
            className="btn-add"
          >
            + Ingredients
          </button>
        </form>
        <div className="list">
          {ingredient?.map((item, i) => (
            <div key={i} className="item">
              <p>{item}</p>
              <button
                onClick={() =>
                  setIngredient(ingredient.filter((_, idx) => idx !== i))
                }
              >
                X
              </button>
            </div>
          ))}
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
        <button
          onClick={handleGenerate}
          disabled={ingredient.length === 0}
          type="submit"
          className="btn-generate"
        >
          Generate Recipe
        </button>
      </section>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            margin: "50px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Generating...
        </div>
      ) : (
        recipes?.length > 0 && (
          <section className="suggested-recipes">
            <h2>Suggested Recipes</h2>
            {recipes?.map((recipe, index) => (
              <Recipe key={index} recipe={recipe} />
            ))}
          </section>
        )
      )}
      <About />
      <HowItWorks />
    </main>
  );
};

export default Home;
