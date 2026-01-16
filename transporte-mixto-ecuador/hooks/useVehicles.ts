"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import type { Vehicle, FleetStats } from "@/types"
import { VehicleType, VehicleStatus } from "@/types"

// Datos mock separados para mejor organización
const MOCK_VEHICLES: Vehicle[] = [
  {
    id: "1",
    plate: "ABC-1234",
    model: "Toyota Hiace 2020",
    year: "2020",
    type: VehicleType.DOUBLE_CABIN,


    capacity: 12,
    color: "Blanco",
    status: VehicleStatus.ACTIVE,
    location: {
      lat: -0.2985,
      lng: -78.5547,
      address: "Av. Amazonas y Naciones Unidas",
    },
    fuel: 85,
    mileage: "45,230 km",
    nextMaintenance: "2024-02-15",
    lastUpdate: "Hace 2 min",
    driverId: "1",
  },
  {
    id: "2",
    plate: "DEF-5678",
    model: "Chevrolet N300 2019",
    year: "2019",
    type: VehicleType.SINGLE_CABIN,
    capacity: 8,
    color: "Azul",
    status: VehicleStatus.OCCUPIED,
    location: {
      lat: -0.2985,
      lng: -78.5547,
      address: "Terminal Terrestre Quitumbe",
    },
    fuel: 60,
    mileage: "38,450 km",
    nextMaintenance: "2024-01-28",
    lastUpdate: "Hace 5 min",
    driverId: "1",
  },
  {
    id: "3",
    plate: "GHI-9012",
    model: "Ford Transit 2021",
    year: "2021",
    type: VehicleType.DOUBLE_CABIN,
    capacity: 14,
    color: "Blanco",
    status: VehicleStatus.MAINTENANCE,
    location: {
      lat: -0.2985,
      lng: -78.5547,
      address: "Taller Mecánico Central",
    },
    fuel: 20,
    mileage: "22,100 km",
    nextMaintenance: "En proceso",
    lastUpdate: "Hace 2 horas",
    driverId: "1",
  },
]

export function useVehicles(driverId?: string) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Función para cargar vehículos
  const loadVehicles = useCallback(async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const filteredVehicles = driverId
      ? MOCK_VEHICLES.filter((v) => v.driverId === driverId)
      : MOCK_VEHICLES

    setVehicles(filteredVehicles)
    setIsLoading(false)
  }, [driverId])

  useEffect(() => {
    loadVehicles()
  }, [loadVehicles])

  // Funciones de actualización con mejor manejo de errores
  const updateVehicleStatus = useCallback(async (vehicleId: string, status: Vehicle["status"]) => {
    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.id === vehicleId
          ? { ...vehicle, status, lastUpdate: "Ahora" }
          : vehicle
      ),
    )
  }, [])

  const updateVehicleLocation = useCallback(async (vehicleId: string, location: Vehicle["location"]) => {
    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.id === vehicleId
          ? { ...vehicle, location, lastUpdate: "Ahora" }
          : vehicle
      ),
    )
  }, [])

  // Estadísticas memoizadas para mejor rendimiento
  const fleetStats: FleetStats = useMemo(() => ({
    totalVehicles: vehicles.length,
    activeVehicles: vehicles.filter((v) => v.status === VehicleStatus.ACTIVE).length,
    occupiedVehicles: vehicles.filter((v) => v.status === VehicleStatus.OCCUPIED).length,
    maintenanceVehicles: vehicles.filter((v) => v.status === VehicleStatus.MAINTENANCE).length,
    efficiency: Math.round((vehicles.filter((v) => v.status !== VehicleStatus.MAINTENANCE).length / vehicles.length) * 100) || 0,
  }), [vehicles])

  const vehiclesByType = useMemo(() => ({
    singleCabin: vehicles.filter((v) => v.type === VehicleType.SINGLE_CABIN),
    doubleCabin: vehicles.filter((v) => v.type === VehicleType.DOUBLE_CABIN),


  }), [vehicles])

  const nearbyVehicles = useMemo(() =>
    vehicles.filter((v) => v.status === VehicleStatus.ACTIVE).slice(0, 3),
    [vehicles]
  )

  return {
    vehicles,
    isLoading,
    fleetStats,
    vehiclesByType,
    nearbyVehicles,
    updateVehicleStatus,
    updateVehicleLocation,
    refreshVehicles: loadVehicles, // Nueva función para refrescar datos
  }
}
