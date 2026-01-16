"use client"

import { useState, useMemo, useCallback } from "react"
import type { Stop, StopFilters } from "@/types"
import { AZUAY_STOPS } from "@/data/azuay-stops"

export function useStops() {
  const [filters, setFilters] = useState<StopFilters>({
    searchTerm: "",
    province: "all",
    type: "all",
  })

  // Memoized filter function for better performance
  const filterStops = useCallback((stops: Stop[], currentFilters: StopFilters) => {
    const searchTermLower = currentFilters.searchTerm.toLowerCase()
    
    return stops.filter((stop) => {
      const matchesSearch = 
        searchTermLower === "" ||
        stop.name.toLowerCase().includes(searchTermLower) ||
        stop.city.toLowerCase().includes(searchTermLower)

      const matchesProvince = currentFilters.province === "all" || stop.province === currentFilters.province
      const matchesType = currentFilters.type === "all" || stop.type === currentFilters.type

      return matchesSearch && matchesProvince && matchesType
    })
  }, [])

  const filteredStops = useMemo(() => {
    return filterStops(AZUAY_STOPS, filters)
  }, [filters, filterStops])

  const stopStats = useMemo(() => {
    const terminals = AZUAY_STOPS.filter((s) => s.type === "terminal")
    const stops = AZUAY_STOPS.filter((s) => s.type === "stop")

    return {
      totalStops: AZUAY_STOPS.length,
      terminals: terminals.length,
      stops: stops.length,
      provinces: 1,
      totalActiveVehicles: AZUAY_STOPS.reduce((sum, stop) => sum + stop.activeVehicles, 0),
    }
  }, [])

  const updateFilters = useCallback((newFilters: Partial<StopFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }, [])

  const getStopById = useCallback((id: number): Stop | undefined => {
    return AZUAY_STOPS.find((stop) => stop.id === id)
  }, [])

  const getStopsByCity = useCallback((city: string): Stop[] => {
    const cityLower = city.toLowerCase()
    return AZUAY_STOPS.filter((stop) => stop.city.toLowerCase() === cityLower)
  }, [])

  return {
    stops: AZUAY_STOPS,
    filteredStops,
    filters,
    provinces: ["Azuay"],
    stopStats,
    updateFilters,
    getStopById,
    getStopsByCity,
  }
}
