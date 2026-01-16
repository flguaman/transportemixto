"use client"

import { useState, useEffect, useMemo } from "react"
import type { DriverStats } from "@/types"

const MOCK_EARNINGS_DATA = {
  today: 350,
  week: 1250,
  month: 4800,
  trips: [
    { date: "2024-01-20", earnings: 350, trips: 2 },
    { date: "2024-01-19", earnings: 280, trips: 2 },
    { date: "2024-01-18", earnings: 420, trips: 3 },
    { date: "2024-01-17", earnings: 200, trips: 1 },
  ],
}

export function useDriverStats(driverId?: string) {
  const [isLoading, setIsLoading] = useState(true)
  const [earningsData, setEarningsData] = useState(MOCK_EARNINGS_DATA)

  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setIsLoading(false)
    }

    if (driverId) {
      loadStats()
    }
  }, [driverId])

  const stats: DriverStats = useMemo(
    () => ({
      todayEarnings: `$${earningsData.today.toFixed(2)}`,
      weeklyEarnings: `$${earningsData.week.toFixed(2)}`,
      monthlyEarnings: `$${earningsData.month.toFixed(2)}`,
      totalTrips: 156,
      rating: 4.8,
      completionRate: 98,
    }),
    [earningsData],
  )

  const weeklyTrend = useMemo(() => {
    const thisWeek = earningsData.week
    const lastWeek = 1100 // Mock data
    const change = ((thisWeek - lastWeek) / lastWeek) * 100

    return {
      current: thisWeek,
      previous: lastWeek,
      change: Math.round(change * 100) / 100,
      isPositive: change > 0,
    }
  }, [earningsData.week])

  const topRoutes = useMemo(
    () => [
      { route: "Quito → Guayaquil", trips: 28, earnings: 840 },
      { route: "Guayaquil → Quito", trips: 22, earnings: 660 },
      { route: "Quito → Cuenca", trips: 15, earnings: 450 },
    ],
    [],
  )

  return {
    stats,
    weeklyTrend,
    topRoutes,
    isLoading,
  }
}
