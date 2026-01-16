"use client"

import { useState } from "react"
import type { Trip, SearchFilters } from "@/types"

const MOCK_TRIPS: Trip[] = [
  {
    id: "1",
    route: "Quito → Guayaquil",
    origin: "quito",
    destination: "guayaquil",
    date: "2024-01-20",
    time: "07:00",
    driverId: "1",
    driverName: "Luis Rodríguez",
    vehicleId: "v1",
    passengers: 8,
    maxPassengers: 12,
    price: "$25.00",
    duration: "8h 30min",
    status: "scheduled",
    rating: 4.7,
  },
  {
    id: "2",
    route: "Quito → Guayaquil",
    origin: "quito",
    destination: "guayaquil",
    date: "2024-01-20",
    time: "15:00",
    driverId: "2",
    driverName: "Ana Morales",
    vehicleId: "v2",
    passengers: 5,
    maxPassengers: 12,
    price: "$27.00",
    duration: "8h 15min",
    status: "scheduled",
    rating: 4.9,
  },
]

const MOCK_USER_TRIPS: Trip[] = [
  {
    id: "3",
    route: "Quito → Guayaquil",
    origin: "quito",
    destination: "guayaquil",
    date: "2024-01-15",
    time: "08:00",
    driverId: "1",
    driverName: "Carlos Mendoza",
    vehicleId: "v1",
    passengers: 1,
    maxPassengers: 12,
    price: "$25.00",
    duration: "8h 30min",
    status: "completed",
    rating: 4.8,
  },
  {
    id: "4",
    route: "Cuenca → Loja",
    origin: "cuenca",
    destination: "loja",
    date: "2024-01-10",
    time: "14:30",
    driverId: "2",
    driverName: "María González",
    vehicleId: "v2",
    passengers: 1,
    maxPassengers: 8,
    price: "$18.50",
    duration: "4h 15min",
    status: "completed",
    rating: 4.9,
  },
]

export function useTrips() {
  const [availableTrips, setAvailableTrips] = useState<Trip[]>(MOCK_TRIPS)
  const [userTrips, setUserTrips] = useState<Trip[]>(MOCK_USER_TRIPS)
  const [isLoading, setIsLoading] = useState(false)

  const searchTrips = async (filters: SearchFilters) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const filtered = MOCK_TRIPS.filter((trip) => {
      const matchesOrigin = !filters.origin || trip.origin === filters.origin
      const matchesDestination = !filters.destination || trip.destination === filters.destination
      const matchesDate = !filters.date || trip.date === filters.date

      return matchesOrigin && matchesDestination && matchesDate
    })

    setAvailableTrips(filtered)
    setIsLoading(false)

    return filtered
  }

  const bookTrip = async (tripId: string, passengers: number) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const trip = availableTrips.find((t) => t.id === tripId)
    if (trip) {
      const bookedTrip: Trip = {
        ...trip,
        id: `booking-${Date.now()}`,
        passengers,
        status: "scheduled",
      }

      setUserTrips((prev) => [bookedTrip, ...prev])

      // Update available seats
      setAvailableTrips((prev) =>
        prev.map((t) => (t.id === tripId ? { ...t, passengers: t.passengers + passengers } : t)),
      )
    }

    setIsLoading(false)
  }

  const cancelTrip = async (tripId: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setUserTrips((prev) => prev.map((trip) => (trip.id === tripId ? { ...trip, status: "cancelled" } : trip)))

    setIsLoading(false)
  }

  return {
    availableTrips,
    userTrips,
    isLoading,
    searchTrips,
    bookTrip,
    cancelTrip,
  }
}
