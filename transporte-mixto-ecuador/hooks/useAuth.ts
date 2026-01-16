"use client"

import { useState, useEffect } from "react"
import type { User, Driver } from "@/types"

interface AuthState {
  user: User | Driver | null
  isAuthenticated: boolean
  isLoading: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Simulate loading user from localStorage or API
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
          const user = JSON.parse(savedUser)
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
        } else {
          setAuthState((prev) => ({ ...prev, isLoading: false }))
        }
      } catch (error) {
        console.error("Error loading user:", error)
        setAuthState((prev) => ({ ...prev, isLoading: false }))
      }
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string, userType: "user" | "driver") => {
    // Simulate API call
    const mockUser: User | Driver = {
      id: "1",
      firstName: userType === "driver" ? "Carlos" : "Juan Carlos",
      lastName: userType === "driver" ? "Mendoza" : "Pérez",
      email,
      phone: userType === "driver" ? "0998765432" : "0987654321",
      cedula: userType === "driver" ? "0987654321" : "1234567890",
      city: "Quito",
      type: userType,
      isVerified: true,
      createdAt: "2024-01-01",
      ...(userType === "driver" && {
        licenseNumber: "EC123456789",
        rating: 4.8,
        totalTrips: 156,
        completionRate: 98,
        vehicles: [],
      }),
    }

    localStorage.setItem("user", JSON.stringify(mockUser))
    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    })

    return mockUser
  }

  const logout = () => {
    localStorage.removeItem("user")
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  const updateUser = (updates: Partial<User | Driver>) => {
    if (!authState.user) return

    const updatedUser = { ...authState.user, ...updates }
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setAuthState((prev) => ({
      ...prev,
      user: updatedUser,
    }))
  }

  return {
    ...authState,
    login,
    logout,
    updateUser,
  }
}
