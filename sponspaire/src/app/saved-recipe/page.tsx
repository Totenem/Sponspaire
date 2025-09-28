"use client"

import { useState } from "react"
import { RecipeList } from "@/components/blocks/SavedRecipeBlocks/RecipeList"
import { SavedRecipeDetails } from "@/components/blocks/SavedRecipeBlocks/SavedRecipeDetails"

// Mock saved recipes data
const mock_saved_recipes = [
  {
    id: 1,
    title: "Savory Spinach Pancakes",
    servings: 2,
    time: "20 minutes",
    ingredients: ["flour", "spinach", "eggs", "milk", "butter", "salt", "pepper", "parmesan"],
    diet: "Vegetarian",
    vibe: "Healthy",
    style: "American",
    fullRecipe: {
      title: "Savory Spinach Pancakes",
      servings: 2,
      time: "20 minutes",
      ingredients: [
        "1 cup all-purpose flour",
        "1 cup fresh spinach, chopped",
        "2 large eggs",
        "3/4 cup milk",
        "2 tbsp butter, melted",
        "1 tsp salt",
        "1/2 tsp black pepper",
        "1/4 cup grated parmesan cheese"
      ],
      instructions: [
        "Wash and chop the fresh spinach finely",
        "In a large bowl, whisk together flour, eggs, and milk",
        "Add melted butter, salt, and pepper to the mixture",
        "Fold in chopped spinach and parmesan cheese",
        "Heat a non-stick pan over medium heat",
        "Pour 1/4 cup batter for each pancake",
        "Cook for 2-3 minutes until bubbles form",
        "Flip and cook for another 2 minutes until golden"
      ],
      nutrition: {
        calories: 285,
        protein: 15,
        carbs: 28,
        fat: 12,
        fiber: 3
      }
    }
  },
  {
    id: 2,
    title: "Mediterranean Quinoa Bowl",
    servings: 4,
    time: "25 minutes",
    ingredients: ["quinoa", "tomatoes", "cucumber", "olives", "feta", "olive oil", "lemon", "herbs"],
    diet: "Mediterranean",
    vibe: "Fresh",
    style: "Mediterranean",
    fullRecipe: {
      title: "Mediterranean Quinoa Bowl",
      servings: 4,
      time: "25 minutes",
      ingredients: [
        "1 cup quinoa",
        "2 cups water",
        "1 cup cherry tomatoes, halved",
        "1 cucumber, diced",
        "1/2 cup kalamata olives",
        "1/2 cup feta cheese, crumbled",
        "3 tbsp olive oil",
        "2 tbsp lemon juice",
        "1 tbsp fresh herbs (oregano, basil)"
      ],
      instructions: [
        "Rinse quinoa and cook according to package directions",
        "Let quinoa cool to room temperature",
        "In a large bowl, combine quinoa with tomatoes and cucumber",
        "Add olives and feta cheese",
        "Whisk together olive oil, lemon juice, and herbs",
        "Drizzle dressing over the bowl and toss gently",
        "Season with salt and pepper to taste",
        "Serve immediately or refrigerate for later"
      ],
      nutrition: {
        calories: 320,
        protein: 12,
        carbs: 38,
        fat: 14,
        fiber: 5
      }
    }
  },
  {
    id: 3,
    title: "Spicy Thai Basil Chicken",
    servings: 3,
    time: "15 minutes",
    ingredients: ["chicken", "basil", "chili", "garlic", "soy sauce", "rice", "egg", "onion"],
    diet: "High Protein",
    vibe: "Spicy",
    style: "Thai",
    fullRecipe: {
      title: "Spicy Thai Basil Chicken",
      servings: 3,
      time: "15 minutes",
      ingredients: [
        "1 lb chicken breast, sliced thin",
        "2 cups fresh Thai basil leaves",
        "3-4 Thai chilies, sliced",
        "4 cloves garlic, minced",
        "3 tbsp soy sauce",
        "2 tbsp oyster sauce",
        "1 tbsp fish sauce",
        "2 cups cooked jasmine rice",
        "2 eggs, fried",
        "1/2 onion, sliced"
      ],
      instructions: [
        "Heat oil in a wok or large pan over high heat",
        "Add garlic and chilies, stir-fry for 30 seconds",
        "Add chicken and cook until nearly done",
        "Add onion and continue cooking",
        "Mix soy sauce, oyster sauce, and fish sauce",
        "Add sauce mixture to the pan",
        "Stir in Thai basil leaves",
        "Serve over rice with fried eggs"
      ],
      nutrition: {
        calories: 420,
        protein: 35,
        carbs: 32,
        fat: 16,
        fiber: 2
      }
    }
  },
  {
    id: 4,
    title: "Keto Cauliflower Mac and Cheese",
    servings: 4,
    time: "30 minutes",
    ingredients: ["cauliflower", "cheese", "butter", "cream", "bacon", "garlic", "herbs", "almond flour"],
    diet: "Keto",
    vibe: "Comfort Food",
    style: "American",
    fullRecipe: {
      title: "Keto Cauliflower Mac and Cheese",
      servings: 4,
      time: "30 minutes",
      ingredients: [
        "1 large head cauliflower, cut into florets",
        "2 cups cheddar cheese, shredded",
        "1/2 cup heavy cream",
        "3 tbsp butter",
        "4 slices bacon, cooked and crumbled",
        "2 cloves garlic, minced",
        "1 tsp herbs (thyme, rosemary)",
        "1/4 cup almond flour",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Preheat oven to 400°F",
        "Steam cauliflower until tender",
        "In a saucepan, melt butter and add garlic",
        "Add cream and bring to a simmer",
        "Gradually add cheese, stirring until melted",
        "Season with herbs, salt, and pepper",
        "Mix sauce with cauliflower in a baking dish",
        "Top with bacon and almond flour",
        "Bake for 15-20 minutes until golden"
      ],
      nutrition: {
        calories: 380,
        protein: 18,
        carbs: 8,
        fat: 32,
        fiber: 3
      }
    }
  }
]

export default function SavedRecipePage() {
  const [selectedRecipe, setSelectedRecipe] = useState(mock_saved_recipes[0])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Saved Recipes</h1>
          <p className="text-muted-foreground">Your collection of favorite recipes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Recipe List with Search and Filter */}
          <div>
            <RecipeList 
              recipes={mock_saved_recipes}
              selectedRecipe={selectedRecipe}
              onRecipeSelect={setSelectedRecipe}
            />
          </div>

          {/* Right Panel - Recipe Details */}
          <div>
            <SavedRecipeDetails recipe={selectedRecipe} />
          </div>
        </div>
      </div>
    </div>
  )
}