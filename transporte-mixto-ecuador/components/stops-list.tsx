"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Clock, Users, Truck, Search, Filter, ChevronRight, Star } from "lucide-react"
import { useStops } from "@/hooks/useStops"
import type { Stop } from "@/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

interface StopsListProps {
  onStopSelect?: (stop: Stop) => void
}

export default function StopsList({ onStopSelect }: StopsListProps) {
  const { filteredStops, filters, provinces, updateFilters } = useStops()
  const [showFilters, setShowFilters] = React.useState(false)
  const [cabinFilters, setCabinFilters] = React.useState({
    doble: true,
    simple: true
  });

  const toggleCabinFilter = (type: 'doble' | 'simple') => {
    setCabinFilters(prev => ({
      ...prev,
      [type as keyof typeof prev]: !prev[type as keyof typeof prev]
    }));
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="border-green-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-green-800 flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filtros de Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Nombre o ciudad..."
                  value={filters.searchTerm}
                  onChange={(e) => updateFilters({ searchTerm: e.target.value })}
                  className="pl-10 border-green-200 focus:border-green-300 focus:ring-green-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Provincia</label>
              <Select value={filters.province} onValueChange={(value) => updateFilters({ province: value })}>
                <SelectTrigger className="border-green-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las provincias</SelectItem>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo</label>
              <Select value={filters.type} onValueChange={(value) => updateFilters({ type: value })}>
                <SelectTrigger className="border-green-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="terminal">Terminales</SelectItem>
                  <SelectItem value="stop">Paradas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 pt-3 border-t border-green-100">
            <p className="text-sm text-gray-500">
              {filteredStops.length} {filteredStops.length === 1 ? 'resultado' : 'resultados'} encontrados
            </p>
            {filters.province !== "all" || filters.type !== "all" ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {filters.province === "all" ? 'Todas las provincias' : filters.province} •
                {filters.type === "all" ? 'Todos los tipos' : filters.type === 'terminal' ? 'Terminales' : 'Paradas'}
              </Badge>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStops.map((stop) => (
          <Card
            key={stop.id}
            className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
            onClick={() => onStopSelect && onStopSelect(stop)}
          >
            <div className={`h-1.5 ${stop.type === "terminal" ? "bg-green-600" : "bg-blue-500"}`}></div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{stop.name}</h3>
                    <Badge
                      className={stop.type === "terminal" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                    >
                      {stop.type === "terminal" ? "Terminal" : "Parada"}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm flex items-center">
                    <MapPin className="h-3 w-3 text-green-500 mr-1" />
                    {stop.city}, {stop.province}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-green-600" />
                    <div>
                      <span className="text-sm font-medium">Vehículos disponibles:</span>
                      <div className="flex flex-col space-y-2 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Doble Cabina:</span>
                          <div className="flex space-x-1">
                            {Array.from({ length: Math.ceil(stop.activeVehicles / 2) }).map((_, idx) => (
                              <div
                                key={idx}
                                className="w-3 h-3 rounded-full bg-green-500"
                                title="Doble Cabina disponible"
                              />
                            ))}
                            {Array.from({ length: Math.ceil((stop.capacity - stop.activeVehicles) / 2) }).map((_, idx) => (
                              <div
                                key={idx}
                                className="w-3 h-3 rounded-full bg-gray-300"
                                title="Doble Cabina no disponible"
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Cabina Simple:</span>
                          <div className="flex space-x-1">
                            {Array.from({ length: Math.floor(stop.activeVehicles / 2) }).map((_, idx) => (
                              <div
                                key={idx}
                                className="w-3 h-3 rounded-full bg-blue-500"
                                title="Cabina Simple disponible"
                              />
                            ))}
                            {Array.from({ length: Math.floor((stop.capacity - stop.activeVehicles) / 2) }).map((_, idx) => (
                              <div
                                key={idx}
                                className="w-3 h-3 rounded-full bg-gray-300"
                                title="Cabina Simple no disponible"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center bg-gray-50 p-2 rounded">
                  <Phone className="h-3 w-3 text-green-600 mr-2" />
                  <span className="text-gray-700">{stop.phone}</span>
                </div>
                <div className="flex items-center bg-gray-50 p-2 rounded">
                  <Clock className="h-3 w-3 text-green-600 mr-2" />
                  <span className="text-gray-700">{stop.hours}</span>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Rutas principales:</p>
                <div className="flex flex-wrap gap-1">
                  {stop.routes.slice(0, 3).map((route, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-100">
                      {route}
                    </Badge>
                  ))}
                  {stop.routes.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{stop.routes.length - 3} más
                    </Badge>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Servicios:</p>
                <div className="flex flex-wrap gap-1">
                  {stop.services.slice(0, 3).map((service, index) => (
                    <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {service}
                    </span>
                  ))}
                  {stop.services.length > 3 && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">+{stop.services.length - 3}</span>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm" className="text-xs text-green-700 hover:text-green-800 hover:bg-green-50">
                  Ver en mapa
                </Button>
                <Button variant="default" size="sm" className="text-xs ml-2 bg-green-600 hover:bg-green-700">
                  Detalles
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStops.length === 0 && (
        <Card className="border-green-200">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron paradas</h3>
            <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
