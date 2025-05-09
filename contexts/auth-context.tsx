"use client"

import { API_URL } from '@/lib/config';
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useAccount } from "wagmi"
import axios from "axios"

// Define types for our context
type UserProfile = {
  userId: string
  username: string
  email: string
  picture: string
  walletAddress: string
  isOnboardingComplete: boolean
  // Add any other user data you need globally
}

type AuthContextType = {
  isAuthenticated: boolean
  isLoading: boolean
  profile: UserProfile | null
  isProfileLoading: boolean
  handleProfileNavigation: () => Promise<void>
  refreshUserProfile: () => Promise<void>
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isLoading } = useUser()
  const { address, isConnected } = useAccount()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isProfileLoading, setIsProfileLoading] = useState(false)
  const [isDataSent, setIsDataSent] = useState(false)

  // Extract user ID helper function
  const getUserId = () => user?.sub?.substring(14) || ""

  // Fetch user profile data
  const fetchUserProfile = async () => {
    if (!user) return null

    try {
      const userId = getUserId()

      // Fetch onboarding status
      const response = await fetch(`${API_URL}/api/profile/get-onboarding-status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          user_id: userId,
        },
      })

      // if (!response.ok) {
      //   throw new Error(`API error: ${response.status}`)
      // }

      const data = await response.json()

      // Create profile object with all necessary data
      return {
        userId,
        username: user.given_name || "Unknown User",
        email: user.email || "",
        picture: (user as any).picture || "",
        walletAddress: address || "",
        isOnboardingComplete: data.status === true,
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
      return null
    }
  }

  // Handle profile navigation
  const handleProfileNavigation = async () => {
    if (!user) return

    try {
      setIsProfileLoading(true)

      if (profile) {
        // Use cached profile data if available
        if (profile.isOnboardingComplete) {
          window.location.href = "/"
        } else {
          window.location.href = "/profile"
        }
        return
      }

      // Fallback to API call if profile not cached
      const userProfile = await fetchUserProfile()
      if (userProfile) {
        if (userProfile.isOnboardingComplete) {
          window.location.href = "/"
        } else {
          window.location.href = "/profile"
        }
      } else {
        window.location.href = "/profile"
      }
    } catch (error) {
      console.error("Error navigating to profile:", error)
      window.location.href = "/profile"
    } finally {
      setIsProfileLoading(false)
    }
  }

  // Force refresh user profile data
  const refreshUserProfile = async () => {
    if (!user) return

    try {
      setIsProfileLoading(true)
      const userProfile = await fetchUserProfile()
      if (userProfile) {
        setProfile(userProfile)
      }
    } catch (error) {
      console.error("Error refreshing user profile:", error)
    } finally {
      setIsProfileLoading(false)
    }
  }

  // Register user on first login
  useEffect(() => {
    const registerUser = async () => {
      if (!isLoading && user && !isDataSent) {
        try {
          const userId = getUserId()
          if (!userId || !user.email) {
            console.error("Invalid user data, skipping API call.")
            return
          }

          setIsDataSent(true)

          const response = await fetch(`${API_URL}/api/auth/register-user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userInput: {
                username: user.given_name || "Unknown User",
                email: user.email,
                user_id: userId,
                walletAddress: address || " ",
              },
            }),
          })

          if (response.ok) {
            console.log("✅ User data sent successfully!")
            // After registration, fetch the full profile
            refreshUserProfile()
          } else {
            console.error("❌ Failed to send user data. Status:", response.status)
          }
        } catch (error) {
          console.error("❌ Error sending user data:", error)
        }
      }
    }

    registerUser()
  }, [user, isLoading, isDataSent, address])

  // Update wallet address when connected
  useEffect(() => {
    const sendWalletAddress = async () => {
      if (user && isConnected && address) {
        try {
          const userId = getUserId()

          await axios.post(
            `${API_URL}/api/profile/add-walletAddress`,
            { walletAddress: address },
            {
              headers: {
                "Content-Type": "application/json",
                user_id: userId,
              },
            },
          )

          // Update the profile with the new wallet address
          setProfile((prev) => (prev ? { ...prev, walletAddress: address } : null))
          console.log("Address sent successfully")
        } catch (error) {
          console.error("Error sending address:", error)
        }
      }
    }

    sendWalletAddress()
  }, [user, isConnected, address])

  // Initialize profile when user is loaded
  useEffect(() => {
    const initializeProfile = async () => {
      if (!isLoading && user && !profile) {
        try {
          setIsProfileLoading(true)
          const userProfile = await fetchUserProfile()
          setProfile(userProfile)
        } catch (error) {
          console.error("Error initializing profile:", error)
        } finally {
          setIsProfileLoading(false)
        }
      }
    }

    initializeProfile()
  }, [isLoading, user, profile])

  // Context value
  const value = {
    isAuthenticated: !!user,
    isLoading,
    profile,
    isProfileLoading,
    handleProfileNavigation,
    refreshUserProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    console.log("useAuth must be used within an AuthProvider")
  }
  return context
}

