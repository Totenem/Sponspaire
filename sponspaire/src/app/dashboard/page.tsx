"use client"
import { IngredientSelector } from "@/components/blocks/DashboardBlocks/IngredientSelector"
import { RecipeDisplay } from "@/components/blocks/DashboardBlocks/RecipeDisplay"

const fakeRecipe = {
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

export default function DashboardPage() {
  const handleGenerateRecipe = (selections: {
    ingredients: string[]
    diet: string
    vibe: string
    country: string
  }) => {
    console.log("Generating recipe with selections:", selections)
    // Here you would typically call an API to generate a recipe
    // For now, we'll just log the selections
  }

  return (
    
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Sponspaire</h1>
          <p className="text-muted-foreground">Your AI Recipe Generator</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Input Section */}
          <div>
            <IngredientSelector onGenerateRecipe={handleGenerateRecipe} />
          </div>

          {/* Right Panel - Recipe Display */}
          <div>
            <RecipeDisplay recipe={fakeRecipe} />
          </div>
        </div>
      </div>
    </div>
  )
}