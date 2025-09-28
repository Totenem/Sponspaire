"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon, SearchIcon } from "lucide-react"

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

interface RecipeListProps {
  recipes: Recipe[]
  selectedRecipe: Recipe
  onRecipeSelect: (recipe: Recipe) => void
}

type SortOption = "date" | "alphabetical"

export function RecipeList({ recipes, selectedRecipe, onRecipeSelect }: RecipeListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("date")

  const filteredAndSortedRecipes = useMemo(() => {
    let filtered = recipes

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort recipes
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "alphabetical") {
        return a.title.localeCompare(b.title)
      } else {
        // Sort by date (assuming higher ID = more recent)
        return b.id - a.id
      }
    })

    return sorted
  }, [recipes, searchQuery, sortBy])

  return (
    <div className="space-y-4">
      {/* Header with search and sort */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">My Recipes ({filteredAndSortedRecipes.length})</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                Sort by {sortBy === "date" ? "Date Saved" : "Alphabetically"}
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => setSortBy("date")}
                className={sortBy === "date" ? "bg-accent" : ""}
              >
                Sort by Date Saved
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSortBy("alphabetical")}
                className={sortBy === "alphabetical" ? "bg-accent" : ""}
              >
                Sort Alphabetically
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recipe titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Recipe Cards */}
      <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
        {filteredAndSortedRecipes.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                {searchQuery ? "No recipes found matching your search." : "No recipes saved yet."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAndSortedRecipes.map((recipe) => (
            <Card 
              key={recipe.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedRecipe.id === recipe.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => onRecipeSelect(recipe)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{recipe.title}</CardTitle>
                    <CardDescription>
                      {recipe.servings} servings • {recipe.time}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      #{recipe.id}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {/* Top 3 Ingredients */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Ingredients:</p>
                  <div className="flex flex-wrap gap-1">
                    {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {ingredient}
                      </Badge>
                    ))}
                    {recipe.ingredients.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{recipe.ingredients.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Recipe Filters */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    {recipe.diet}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {recipe.vibe}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {recipe.style}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
