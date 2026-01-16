export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  cedula: string
  city: string
  type: "user" | "driver"
  avatar?: string
  isVerified: boolean
  createdAt: string
}

export interface Driver extends User {
  licenseNumber: string
  rating: number
  totalTrips: number
  completionRate: number
  vehicles: Vehicle[]
}

// Tipos de enumeración para mejor consistencia
export enum VehicleType {
  SINGLE_CABIN = "1-cabin",
  DOUBLE_CABIN = "2-cabin"
}

export enum VehicleStatus {
  ACTIVE = "active",
  OCCUPIED = "occupied", 
  MAINTENANCE = "maintenance"
}

export enum TripStatus {
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

export enum StopType {
  TERMINAL = "terminal",
  STOP = "stop"
}

export interface Vehicle {
  id: string
  plate: string
  model: string
  year: string
  type: VehicleType
  capacity: number
  color: string
  status: VehicleStatus
  location: Location
  fuel: number
  mileage: string
  nextMaintenance: string
  lastUpdate: string
  driverId: string
}

export interface Location {
  lat: number
  lng: number
  address: string
}

export interface Trip {
  id: string
  route: string
  origin: string
  destination: string
  date: string
  time: string
  driverId: string
  driverName: string
  vehicleId: string
  passengers: number
  maxPassengers: number
  price: string
  duration: string
  status: TripStatus
  rating?: number
}

export interface Stop {
  id: number
  name: string
  city: string
  province: string
  lat: number
  lng: number
  type: StopType
  services: string[]
  routes: string[]
  phone: string
  hours: string
  capacity: number
  activeVehicles: number
}

export interface SearchFilters {
  origin: string
  destination: string
  date: string
  passengers: string
}

export interface StopFilters {
  searchTerm: string
  province: string
  type: string
}

export interface FleetStats {
  totalVehicles: number
  activeVehicles: number
  occupiedVehicles: number
  maintenanceVehicles: number
  efficiency: number
}

export interface DriverStats {
  todayEarnings: string
  weeklyEarnings: string
  monthlyEarnings: string
  totalTrips: number
  rating: number
  completionRate: number
}
