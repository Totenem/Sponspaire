"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

// Mock user data - in a real app, this would come from your auth context or API
const mock_user_data= {
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  subscription_type: "PRO", // or "FREE"
  credits_remaining: 247,
  createdAt: "January 15, 2024"
}

export default function ProfilePage() {
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)

  const handleForgotPassword = async () => {
    setIsResettingPassword(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert("Password reset email sent! Check your inbox.")
    } catch (error) {
      alert("Failed to send reset email. Please try again.")
    } finally {
      setIsResettingPassword(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert("Account deleted successfully.")
      // In a real app, you'd redirect to login or home page
    } catch (error) {
      alert("Failed to delete account. Please try again.")
    } finally {
      setIsDeletingAccount(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Your basic account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">First Name</label>
                  <p className="text-lg font-semibold">{mock_user_data.first_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                  <p className="text-lg font-semibold">{mock_user_data.last_name}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <p className="text-lg font-semibold">{mock_user_data.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                <p className="text-lg font-semibold">{mock_user_data.createdAt}</p>
              </div>

              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Subscription & Credits */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription & Credits</CardTitle>
              <CardDescription>
                Your current plan and usage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Subscription Status */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Subscription Plan</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant={mock_user_data.subscription_type === "PRO" ? "default" : "secondary"}
                      className="text-sm"
                    >
                      {mock_user_data.subscription_type}
                    </Badge>
                    {mock_user_data.subscription_type === "FREE" && (
                      <Button size="sm" variant="outline">
                        Upgrade to PRO
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Credits Display */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Credits Remaining</h3>
                    <p className="text-2xl font-bold text-primary">{mock_user_data.credits_remaining}</p>
                    <p className="text-sm text-muted-foreground">
                      {mock_user_data.subscription_type === "FREE" 
                        ? "Each recipe generation uses 1 credit" 
                        : "Unlimited recipe generations"
                      }
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                </div>
              </div>

              {mock_user_data.subscription_type === "FREE" && (
                <div className="space-y-2">
                  <Button className="w-full">
                    Buy More Credits
                  </Button>
                  <Button variant="outline" className="w-full">
                    Upgrade to PRO
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Account Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>
              Manage your account security and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Forgot Password */}
              <div className="space-y-2">
                <h3 className="font-semibold">Password Management</h3>
                <p className="text-sm text-muted-foreground">
                  Reset your password if you've forgotten it
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleForgotPassword}
                  disabled={isResettingPassword}
                  className="w-full"
                >
                  {isResettingPassword ? "Sending..." : "Reset Password"}
                </Button>
              </div>

              {/* Delete Account */}
              <div className="space-y-2">
                <h3 className="font-semibold text-destructive">Danger Zone</h3>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all data
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove all your data including saved recipes, preferences, and subscription
                        information from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        disabled={isDeletingAccount}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {isDeletingAccount ? "Deleting..." : "Yes, delete my account"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}