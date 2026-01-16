export const AZUAY_CANTONS = [
  "Cuenca",
  "Gualaceo",
  "Chordeleg",
  "Paute",
  "Sigsig",
  "San Fernando",
  "Santa Isabel",
  "Pucará",
  "Nabón",
  "Oña",
  "Girón",
  "El Pan",
  "Sevilla de Oro",
] as const

export const VEHICLE_STATUSES = {
  AVAILABLE: "available",
  OCCUPIED: "occupied",
  MAINTENANCE: "maintenance",
} as const

export const TRIP_STATUSES = {
  SCHEDULED: "scheduled",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const

export const USER_TYPES = {
  USER: "user",
  DRIVER: "driver",
} as const

export const VEHICLE_TYPES = {
  ONE_CABIN: "1-cabin",
  TWO_CABIN: "2-cabin",
} as const

export const STOP_TYPES = {
  TERMINAL: "terminal",
  STOP: "stop",
} as const

export const MAP_CONFIG = {
  CENTER: [-2.9, -79.0] as [number, number],
  ZOOM: 9,
  TILE_URL: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  ATTRIBUTION: "© OpenStreetMap contributors",
} as const
