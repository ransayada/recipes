import { db } from "./firebase.config";
import { useState, useEffect } from "react";

import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: [],
    steps: [],
  });
  const [popupActive, setPopupActive] = useState(false);

  const recipesCollectionRef = collection(db, "recipes");

  useEffect(() => {
    onSnapshot(recipesCollectionRef, (snapshot) => {
      setRecipes(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            viewing: false,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  const handleView = (id) => {
    const recipesClone = [...recipes];

    recipesClone.forEach((recipe) => {
      if (recipe.id === id) {
        recipe.viewing = !recipe.viewing;
      } else {
        recipe.viewing = false;
      }
    });

    setRecipes(recipesClone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.ingredients || !form.steps) {
      alert("Please fill out all fields");
      return;
    }

    addDoc(recipesCollectionRef, form);

    setForm({ title: "", description: "", ingredients: [], steps: [] });
  };

  const handleIngredient = (e, i) => {
    const ingredientClone = [...form.ingredients];
    ingredientClone[i] = e.target.value;
    setForm({ ...form, ingredients: ingredientClone });
  };

  const handleStep = (e, i) => {
    const stepClone = [...form.steps];
    stepClone[i] = e.target.value;
    setForm({ ...form, steps: stepClone });
  };

  const handleIngredientCount = () => {
    setForm({ ...form, ingredients: [...form.ingredients, ""] });
  };
  const handleStepCount = () => {
    setForm({ ...form, steps: [...form.steps, ""] });
  };

  const removeRecipe = (id) => {
    deleteDoc(doc(db, "recipes", id));
  };

  return (
    <div className="App">
      <h1> my recipe app </h1>
      <button onClick={() => setPopupActive(!popupActive)}>Add recipe</button>
      <div className="recipes">
        {recipes.map((recipe, index) => (
          <div className="recipe" key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: recipe.description }}></p>
            {recipe.viewing ? (
              <></>
            ) : (
              <div>
                <h4>Ingredients</h4>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h4>Steps</h4>
                <ol>
                  {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            <div className="buttons">
              <button onClick={() => handleView(recipe.id)}>
                View {recipe.viewing ? "more" : "less"}
              </button>
              <button
                className="remove"
                onClick={() => removeRecipe(recipe.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {popupActive ? (
        <div className="popup">
          <div className="popup-inner">
            <h2>Add a new recipe</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  type="text"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Ingredients</label>
                {form.ingredients.map((ingredient, index) => (
                  <input
                    type="text"
                    key={index}
                    value={ingredient}
                    onChange={(e) => handleIngredient(e, index)}
                  />
                ))}
                <button type="button" onClick={handleIngredientCount}>
                  Add ingredient
                </button>
              </div>

              <div className="form-group">
                <label>Steps</label>
                {form.steps.map((step, index) => (
                  <textarea
                    type="text"
                    key={index}
                    value={step}
                    onChange={(e) => handleStep(e, index)}
                  />
                ))}
                <button type="button" onClick={handleStepCount}>
                  Add ingredient
                </button>
              </div>

              <div className="buttons">
                <button type="submit">Submit</button>
                <button
                  type="button"
                  className="remove"
                  onClick={() => setPopupActive(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
