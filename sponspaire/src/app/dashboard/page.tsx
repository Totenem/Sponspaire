"use client"
import { IngredientSelector } from "@/components/blocks/DashboardBlocks/IngredientSelector"
import { RecipeDisplay } from "@/components/blocks/DashboardBlocks/RecipeDisplay"
import { Recipe } from "@/components/blocks/DashboardBlocks/RecipeDisplay"
import { useState } from "react"

// Sample Recipe
// const fakeRecipe = {
//   title: "Savory Spinach Pancakes",
//   servings: 2,
//   time: "20 minutes",
//   ingredients: [
//     "1 cup all-purpose flour",
//     "1 cup fresh spinach, chopped",
//     "2 large eggs",
//     "3/4 cup milk",
//     "2 tbsp butter, melted",
//     "1 tsp salt",
//     "1/2 tsp black pepper",
//     "1/4 cup grated parmesan cheese"
//   ],
//   instructions: [
//     "Wash and chop the fresh spinach finely",
//     "In a large bowl, whisk together flour, eggs, and milk",
//     "Add melted butter, salt, and pepper to the mixture",
//     "Fold in chopped spinach and parmesan cheese",
//     "Heat a non-stick pan over medium heat",
//     "Pour 1/4 cup batter for each pancake",
//     "Cook for 2-3 minutes until bubbles form",
//     "Flip and cook for another 2 minutes until golden"
//   ],
//   nutrition: {
//     calories: 285,
//     protein: 15,
//     carbs: 28,
//     fat: 12,
//     fiber: 3
//   }
// }

export default function DashboardPage() {

  // Recipe Generator here (vibe coded 30% do soem checking if may)
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  
  const handleGenerateRecipe = (
    
    
    selections: {
      ingredients: string[]
      diet: string
      vibe: string
      country: string
    }


  ) => {
    setIsLoading(true)
    setRecipe(undefined)



    fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selections)
    })



      .then(response => response.json())
      .then(data => setRecipe(data))
      .catch(error => console.error("Error:", error))
      .finally(() => setIsLoading(false))
  }

  return (

    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Sponspaire</h1>
          <p className="text-muted-foreground">Your AI Recipe Generator</p>
        </div>

        {!recipe ? (
          <div className="max-w-2xl mx-auto">
            <IngredientSelector onGenerateRecipe={handleGenerateRecipe} />
            {isLoading && (
              <div className="mt-6 text-center text-primary text-sm">Generating recipe...</div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Input Section */}
            <div>
              <IngredientSelector onGenerateRecipe={handleGenerateRecipe} />
            </div>

            {/* Right Panel - Recipe Display */}
            <div>
              <RecipeDisplay recipe={recipe} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}