"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Recipe {
  id: number
  title: string
  servings: number
  time: string
  ingredients: string[]
  diet: string
  vibe: string
  style: string
  fullRecipe: {
    title: string
    servings: number
    time: string
    ingredients: string[]
    instructions: string[]
    nutrition: {
      calories: number
      protein: number
      carbs: number
      fat: number
      fiber: number
    }
  }
}

interface SavedRecipeDetailsProps {
  recipe: Recipe
}

export function SavedRecipeDetails({ recipe }: SavedRecipeDetailsProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{recipe.fullRecipe.title}</CardTitle>
            <CardDescription>
              {recipe.fullRecipe.servings} servings • {recipe.fullRecipe.time}
            </CardDescription>
          </div>
          <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
            <span className="text-xs text-muted-foreground">Recipe Image</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Nutrition Facts */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Nutrition Facts (per serving)</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span>Calories:</span>
              <span className="font-medium">{recipe.fullRecipe.nutrition.calories}</span>
            </div>
            <div className="flex justify-between">
              <span>Protein:</span>
              <span className="font-medium">{recipe.fullRecipe.nutrition.protein}g</span>
            </div>
            <div className="flex justify-between">
              <span>Carbs:</span>
              <span className="font-medium">{recipe.fullRecipe.nutrition.carbs}g</span>
            </div>
            <div className="flex justify-between">
              <span>Fat:</span>
              <span className="font-medium">{recipe.fullRecipe.nutrition.fat}g</span>
            </div>
            <div className="flex justify-between">
              <span>Fiber:</span>
              <span className="font-medium">{recipe.fullRecipe.nutrition.fiber}g</span>
            </div>
          </div>
        </div>

        {/* Recipe Details */}
        <Accordion type="multiple" defaultValue={["ingredients"]}>
          <AccordionItem value="ingredients">
            <AccordionTrigger>Ingredients</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1">
                {recipe.fullRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-sm">• {ingredient}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="instructions">
            <AccordionTrigger>Instructions</AccordionTrigger>
            <AccordionContent>
              <ol className="space-y-2">
                {recipe.fullRecipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-sm flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Action Button - Only Share */}
        <div className="flex justify-center pt-4">
          <Button variant="outline" className="w-full">
            Share Recipe
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
