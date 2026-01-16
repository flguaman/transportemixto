"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useStops } from "@/hooks/useStops"
import { MAP_CONFIG, VEHICLE_STATUSES } from "@/constants"
import type { Stop } from "@/types"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { MapPin, Phone, Clock, Users, Route, Truck } from "lucide-react"
import { useMemo, useCallback } from "react"

interface InteractiveMapProps {
  height?: string
  showControls?: boolean
  selectedStop?: number | null
  onStopSelect?: (stop: Stop) => void
}

// Componentes auxiliares para mejor organización
const VehicleStatusBadge = ({ status }: { status: string }) => {
  const statusConfig = useMemo(() => {
    switch (status) {
      case VEHICLE_STATUSES.AVAILABLE:
        return { text: "Disponible", className: "bg-green-100 text-green-800" }
      case VEHICLE_STATUSES.OCCUPIED:
        return { text: "En ruta", className: "bg-blue-100 text-blue-800" }
      case VEHICLE_STATUSES.MAINTENANCE:
        return { text: "Mantenimiento", className: "bg-yellow-100 text-yellow-800" }
      default:
        return { text: "En espera", className: "bg-gray-200 text-gray-800" }
    }
  }, [status])

  return <Badge className={statusConfig.className}>{statusConfig.text}</Badge>
}

const VehicleCard = ({ 
  id, 
  status, 
  cabinType, 
  vehicleModel, 
  capacity, 
  driver 
}: {
  id: string
  status: string
  cabinType: number
  vehicleModel: string
  capacity: string
  driver: string
}) => {
  const statusConfig = useMemo(() => {
    switch (status) {
      case VEHICLE_STATUSES.AVAILABLE:
        return { color: "bg-green-50", textColor: "text-green-700" }
      case VEHICLE_STATUSES.OCCUPIED:
        return { color: "bg-blue-50", textColor: "text-blue-700" }
      case VEHICLE_STATUSES.MAINTENANCE:
        return { color: "bg-yellow-50", textColor: "text-yellow-700" }
      default:
        return { color: "bg-gray-100", textColor: "text-gray-700" }
    }
  }, [status])

  return (
    <div className={`rounded-lg ${statusConfig.color} p-3`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="bg-white p-1 rounded-md mr-3">
            <Truck className={`h-5 w-5 ${statusConfig.textColor}`} />
          </div>
          <div>
            <p className={`font-medium ${statusConfig.textColor}`}>{id}</p>
            <p className="text-xs text-gray-500">{vehicleModel}</p>
          </div>
        </div>
        <VehicleStatusBadge status={status} />
      </div>
      
      <div className="mt-2 pl-9 grid grid-cols-2 gap-1">
        <div className="flex items-center">
          <Badge variant="outline" className="text-xs border-green-200 bg-white">
            {cabinType === 2 ? "Doble Cabina" : "Cabina Simple"}
          </Badge>
        </div>
        <div className="flex items-center justify-end">
          <Badge variant="outline" className="text-xs border-blue-200 bg-white">
            {driver}
          </Badge>
        </div>
        <div className="col-span-2 mt-1">
          <p className="text-xs text-gray-600">{capacity}</p>
        </div>
      </div>
    </div>
  )
}

const StopPopupContent = ({ stop }: { stop: Stop }) => {
  const mockVehicles = useMemo(() => {
    const getRandomStatus = () => {
      const availableChance = 0.7
      if (Math.random() < availableChance) return VEHICLE_STATUSES.AVAILABLE
      const otherStatuses = Object.values(VEHICLE_STATUSES).filter(
        status => status !== VEHICLE_STATUSES.AVAILABLE
      )
      return otherStatuses[Math.floor(Math.random() * otherStatuses.length)]
    }

    return [...Array(4)].map((_, i) => {
      const cabinType = i % 2 === 0 ? 2 : 1
      return {
        id: `ABC-${100 + i}`,
        status: getRandomStatus(),
        cabinType,
        vehicleModel: cabinType === 2 ? "Toyota Hilux Doble Cabina" : "Chevrolet D-Max Cabina Simple",
        capacity: cabinType === 2 ? "5 pasajeros • 750kg carga" : "2 pasajeros • 1200kg carga",
        driver: cabinType === 2 ? "Juan Pérez" : "María Gómez"
      }
    })
  }, [])

  return (
    <Card className="p-0 border-none shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-3">
        <h3 className="text-xl font-bold text-white mb-1">{stop.name}</h3>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 text-yellow-300 mr-1" />
          <p className="text-green-100 text-sm">
            <strong>
              {stop.city}, {stop.province}
            </strong>
          </p>
          <Badge className="ml-2 bg-white/20 text-white text-xs">
            {stop.type === "terminal" ? "Terminal" : "Parada"}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-3 text-sm text-gray-700 mb-3">
          <div className="flex items-center bg-green-50 p-2 rounded-md">
            <Phone className="h-4 w-4 text-green-600 mr-2" />
            <span className="font-medium">{stop.phone}</span>
          </div>
          <div className="flex items-center bg-green-50 p-2 rounded-md">
            <Clock className="h-4 w-4 text-green-600 mr-2" />
            <span className="font-medium">{stop.hours}</span>
          </div>
          <div className="flex items-center bg-green-50 p-2 rounded-md">
            <Users className="h-4 w-4 text-green-600 mr-2" />
            <span className="font-medium">Capacidad: {stop.capacity} vehículos</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-center mb-2">
            <Route className="h-4 w-4 text-green-600 mr-2" />
            <span className="font-medium">Rutas disponibles:</span>
          </div>
          <div className="flex flex-wrap gap-1 ml-6">
            {stop.routes.map((route, idx) => (
              <Badge key={idx} variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200 transition-colors">
                {route}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-green-100">
          <div className="flex items-center justify-between mb-2">
            <strong className="text-green-700 text-base">GPS en vivo</strong>
            <Badge variant="outline" className="text-xs bg-green-50">
              Actualizado: hace 2 min
            </Badge>
          </div>
          
          <div className="space-y-2">
            {mockVehicles.map((vehicle, i) => (
              <VehicleCard key={i} {...vehicle} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Iconos memoizados para mejor rendimiento
const createTerminalIcon = useCallback(() => {
  return L.divIcon({
    html: `<div style="background: #16a34a; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center;">
             <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
               <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16.21 2.76.21 3.91 0C20.16 27 24 22.55 24 17V7l-10-5z"/>
             </svg>
           </div>`,
    className: "custom-div-icon",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  })
}, [])

const createStopIcon = useCallback(() => {
  return L.divIcon({
    html: `<div style="background: #2563eb; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>`,
    className: "custom-div-icon",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })
}, [])

export default function InteractiveMap({
  height = "500px",
  showControls = true,
  selectedStop = null,
  onStopSelect,
}: InteractiveMapProps) {
  const { stops, stopStats } = useStops()

  const handleStopClick = useCallback((stop: Stop) => {
    onStopSelect?.(stop)
  }, [onStopSelect])

  return (
    <div className="w-full">
      <MapContainer
        center={MAP_CONFIG.CENTER}
        zoom={MAP_CONFIG.ZOOM}
        style={{ height, width: "100%" }}
        className="rounded-lg border border-green-200 shadow-sm"
      >
        <TileLayer url={MAP_CONFIG.TILE_URL} attribution={MAP_CONFIG.ATTRIBUTION} />
        {stops.map((stop) => (
          <Marker
            key={stop.id}
            position={[stop.lat, stop.lng]}
            icon={stop.type === "terminal" ? createTerminalIcon() : createStopIcon()}
            eventHandlers={{
              click: () => handleStopClick(stop),
            }}
          >
            <Popup>
              <StopPopupContent stop={stop} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {showControls && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-600 rounded-full border-2 border-white"></div>
                <div>
                  <p className="font-medium">Terminales Principales</p>
                  <p className="text-sm text-gray-600">{stopStats.terminals} ubicaciones</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full border-2 border-white"></div>
                <div>
                  <p className="font-medium">Paradas Intermedias</p>
                  <p className="text-sm text-gray-600">{stopStats.stops} ubicaciones</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <div>
                  <p className="font-medium">Cobertura Provincial</p>
                  <p className="text-sm text-gray-600">{stopStats.provinces} provincias</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
