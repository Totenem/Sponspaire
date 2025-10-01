"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const commonIngredients = [
  "eggs", "milk", "butter", "bread", "bacon", "sausage", "oats", "sugar", "salt", 
  "cheese", "tomatoes", "potatoes", "onions", "bell peppers", "yogurt", "bananas", 
  "apples", "oranges", "flour", "spinach", "chicken", "beef", "rice", "pasta"
]

const dietOptions = [
  "Calorie Deficit", "Keto", "Paleo", "Vegetarian", "Vegan", "Mediterranean", "Low Carb", "High Protein"
]

const vibeOptions = [
  "Comfort Food", "Healthy", "Quick & Easy", "Gourmet", "Spicy", "Sweet", "Savory", "Fresh"
]

const countryStyles = [
  "Italian", "Mexican", "Asian", "American", "French", "Indian", "Mediterranean", "Thai"
]

interface IngredientSelectorProps {
  onGenerateRecipe: (selections: {
    ingredients: string[]
    diet: string
    vibe: string
    country: string
  }) => void
}

export function IngredientSelector({ onGenerateRecipe }: IngredientSelectorProps) {
  const [ingredientInput, setIngredientInput] = useState("")
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(["flour", "spinach"])
  const [selectedDiet, setSelectedDiet] = useState<string>("")
  const [selectedVibe, setSelectedVibe] = useState<string>("")
  const [selectedCountry, setSelectedCountry] = useState<string>("")

  const handleIngredientSelect = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(prev => prev.filter(i => i !== ingredient))
    } else {
      setSelectedIngredients(prev => [...prev, ingredient])
    }
  }

  const handleIngredientSubmit = () => {
    const newIngredients = ingredientInput
      .split(",")
      .map(ing => ing.trim().toLowerCase())
      .filter(ing => ing && !selectedIngredients.includes(ing))
    
    setSelectedIngredients(prev => [...prev, ...newIngredients])
    setIngredientInput("")
  }

  const handleGenerateRecipe = () => {
    onGenerateRecipe({
      ingredients: selectedIngredients,
      diet: selectedDiet,
      vibe: selectedVibe,
      country: selectedCountry
    }
  )
  }

  return (
    <div className="space-y-6">
      {/* Ingredient Input */}
      <Card>
        <CardHeader>
          <CardTitle>What ingredients do you have?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter ingredients separated by commas..."
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleIngredientSubmit()}
            />
            <Button onClick={handleIngredientSubmit}>Add</Button>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-3">Or select common ingredients:</p>
            <div className="flex flex-wrap gap-2">
              {commonIngredients.map((ingredient) => (
                <Badge
                  key={ingredient}
                  variant={selectedIngredients.includes(ingredient) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleIngredientSelect(ingredient)}
                >
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>

          {selectedIngredients.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-primary">
                Selected: {selectedIngredients.join(", ")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filter Options */}
      <Card>
        <CardHeader>
          <CardTitle>Recipe Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Diet Selection */}
          <div>
            <p className="text-sm font-medium mb-2">Diet:</p>
            <div className="flex flex-wrap gap-2">
              {dietOptions.map((diet) => (
                <Badge
                  key={diet}
                  variant={selectedDiet === diet ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedDiet(selectedDiet === diet ? "" : diet)}
                >
                  {diet}
                </Badge>
              ))}
            </div>
          </div>

          {/* Vibe Selection */}
          <div>
            <p className="text-sm font-medium mb-2">Vibe:</p>
            <div className="flex flex-wrap gap-2">
              {vibeOptions.map((vibe) => (
                <Badge
                  key={vibe}
                  variant={selectedVibe === vibe ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedVibe(selectedVibe === vibe ? "" : vibe)}
                >
                  {vibe}
                </Badge>
              ))}
            </div>
          </div>

          {/* Country Style Selection */}
          <div>
            <p className="text-sm font-medium mb-2">Cuisine Style:</p>
            <div className="flex flex-wrap gap-2">
              {countryStyles.map((style) => (
                <Badge
                  key={style}
                  variant={selectedCountry === style ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCountry(selectedCountry === style ? "" : style)}
                >
                  {style}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" size="lg" onClick={handleGenerateRecipe}>
        Generate Recipe
      </Button>
    </div>
  )
}
