"use client"

import type React from "react"
import InteractiveMap from "@/components/interactive-map"
import StopsList from "@/components/stops-list"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Package,
  Star,
  Search,
  LogOut,
  User,
  History,
  CreditCard,
  Truck,
  Navigation,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"

export default function UserDashboard() {
  const [searchData, setSearchData] = useState({
    origin: "",
    destination: "",
    date: "",
    passengers: "1",
  })

  const [activeTab, setActiveTab] = useState("search")

  const recentTrips = [
    {
      id: 1,
      route: "Quito → Guayaquil",
      date: "2024-01-15",
      time: "08:00",
      driver: "Carlos Mendoza",
      rating: 4.8,
      status: "Completado",
      price: "$25.00",
    },
    {
      id: 2,
      route: "Cuenca → Loja",
      date: "2024-01-10",
      time: "14:30",
      driver: "María González",
      rating: 4.9,
      status: "Completado",
      price: "$18.50",
    },
  ]

  const availableTrips = [
    {
      id: 1,
      route: "Quito → Guayaquil",
      date: "2024-01-20",
      time: "07:00",
      driver: "Luis Rodríguez",
      rating: 4.7,
      price: "$25.00",
      availableSeats: 8,
      duration: "8h 30min",
    },
    {
      id: 2,
      route: "Quito → Guayaquil",
      date: "2024-01-20",
      time: "15:00",
      driver: "Ana Morales",
      rating: 4.9,
      price: "$27.00",
      availableSeats: 5,
      duration: "8h 15min",
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would search for available trips
    console.log("Searching trips:", searchData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8" />
            <h1 className="text-2xl font-bold">TransMixto Ecuador</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-green-700">JC</AvatarFallback>
            </Avatar>
            <span className="hidden md:block">Juan Carlos Pérez</span>
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-2">¡Bienvenido, Juan Carlos!</h2>
          <p className="text-green-600">¿A dónde quieres viajar hoy?</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white border border-green-200">
            <TabsTrigger value="search" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Buscar Viajes</span>
            </TabsTrigger>
            <TabsTrigger value="trucks" className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span>Camionetas</span>
            </TabsTrigger>
            <TabsTrigger value="stops" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Paradas</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <History className="h-4 w-4" />
              <span>Mis Viajes</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Pagos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            {/* Search Form */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <Search className="mr-2 h-5 w-5" />
                  Buscar Viajes
                </CardTitle>
                <CardDescription>Encuentra el viaje perfecto para ti</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="origin">Origen</Label>
                      <Select onValueChange={(value) => setSearchData({ ...searchData, origin: value })}>
                        <SelectTrigger className="border-green-200">
                          <SelectValue placeholder="Ciudad de origen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quito">Quito</SelectItem>
                          <SelectItem value="guayaquil">Guayaquil</SelectItem>
                          <SelectItem value="cuenca">Cuenca</SelectItem>
                          <SelectItem value="loja">Loja</SelectItem>
                          <SelectItem value="ambato">Ambato</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destino</Label>
                      <Select onValueChange={(value) => setSearchData({ ...searchData, destination: value })}>
                        <SelectTrigger className="border-green-200">
                          <SelectValue placeholder="Ciudad de destino" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quito">Quito</SelectItem>
                          <SelectItem value="guayaquil">Guayaquil</SelectItem>
                          <SelectItem value="cuenca">Cuenca</SelectItem>
                          <SelectItem value="loja">Loja</SelectItem>
                          <SelectItem value="ambato">Ambato</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Fecha de viaje</Label>
                      <Input
                        id="date"
                        type="date"
                        value={searchData.date}
                        onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                        className="border-green-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passengers">Pasajeros</Label>
                      <Select
                        value={searchData.passengers}
                        onValueChange={(value) => setSearchData({ ...searchData, passengers: value })}
                      >
                        <SelectTrigger className="border-green-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 pasajero</SelectItem>
                          <SelectItem value="2">2 pasajeros</SelectItem>
                          <SelectItem value="3">3 pasajeros</SelectItem>
                          <SelectItem value="4">4 pasajeros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    <Search className="mr-2 h-4 w-4" />
                    Buscar Viajes
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Available Trips */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-800">Viajes Disponibles</h3>
              {availableTrips.map((trip) => (
                <Card key={trip.id} className="border-green-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span className="font-semibold text-lg">{trip.route}</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{trip.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{trip.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{trip.availableSeats} asientos</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{trip.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          Chofer: {trip.driver} • Duración: {trip.duration}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className="text-2xl font-bold text-green-600">{trip.price}</span>
                        <Button className="bg-green-600 hover:bg-green-700">Reservar Ahora</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trucks" className="space-y-6">
            {/* Truck Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Disponibles</p>
                      <p className="text-2xl font-bold text-green-600">24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm text-gray-600">Ocupadas</p>
                      <p className="text-2xl font-bold text-yellow-600">18</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-600">Fuera de Servicio</p>
                      <p className="text-2xl font-bold text-red-600">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Navigation className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Cercanas</p>
                      <p className="text-2xl font-bold text-blue-600">8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Nearby Trucks */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <Navigation className="mr-2 h-5 w-5" />
                  Camionetas Cercanas
                </CardTitle>
                <CardDescription>Camionetas disponibles en tu área</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "CAM001",
                      driver: "Carlos Mendoza",
                      plate: "ABC-1234",
                      type: "2 Cabinas",
                      capacity: 12,
                      distance: "0.5 km",
                      eta: "3 min",
                      status: "available",
                      location: "Av. Amazonas y Naciones Unidas",
                      rating: 4.8,
                    },
                    {
                      id: "CAM002",
                      driver: "María González",
                      plate: "DEF-5678",
                      type: "1 Cabina",
                      capacity: 8,
                      distance: "1.2 km",
                      eta: "7 min",
                      status: "available",
                      location: "Plaza Foch",
                      rating: 4.9,
                    },
                    {
                      id: "CAM003",
                      driver: "Luis Rodríguez",
                      plate: "GHI-9012",
                      type: "2 Cabinas",
                      capacity: 14,
                      distance: "0.8 km",
                      eta: "5 min",
                      status: "occupied",
                      location: "Terminal Terrestre Quitumbe",
                      rating: 4.7,
                    },
                  ].map((truck) => (
                    <div
                      key={truck.id}
                      className="flex justify-between items-center p-4 border border-green-100 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Truck className="h-4 w-4 text-green-600" />
                          <span className="font-semibold">
                            {truck.plate} - {truck.type}
                          </span>
                          <Badge
                            className={
                              truck.status === "available"
                                ? "bg-green-100 text-green-800"
                                : truck.status === "occupied"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {truck.status === "available"
                              ? "Disponible"
                              : truck.status === "occupied"
                                ? "Ocupada"
                                : "Fuera de Servicio"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{truck.driver}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{truck.capacity} asientos</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{truck.distance}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span>{truck.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{truck.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">ETA: {truck.eta}</p>
                        {truck.status === "available" && (
                          <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                            Solicitar
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fleet by Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Camionetas 1 Cabina</CardTitle>
                  <CardDescription>Capacidad: 6-8 pasajeros</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { plate: "DEF-5678", status: "available", location: "Plaza Foch" },
                      { plate: "JKL-3456", status: "occupied", location: "Terminal Norte" },
                      { plate: "MNO-7890", status: "maintenance", location: "Taller Central" },
                    ].map((truck, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{truck.plate}</span>
                          <p className="text-xs text-gray-500">{truck.location}</p>
                        </div>
                        <Badge
                          className={
                            truck.status === "available"
                              ? "bg-green-100 text-green-800"
                              : truck.status === "occupied"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {truck.status === "available"
                            ? "Disponible"
                            : truck.status === "occupied"
                              ? "Ocupada"
                              : "Mantenimiento"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Camionetas 2 Cabinas</CardTitle>
                  <CardDescription>Capacidad: 10-14 pasajeros</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { plate: "ABC-1234", status: "available", location: "Av. Amazonas" },
                      { plate: "GHI-9012", status: "occupied", location: "Terminal Quitumbe" },
                      { plate: "PQR-2468", status: "available", location: "La Carolina" },
                    ].map((truck, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{truck.plate}</span>
                          <p className="text-xs text-gray-500">{truck.location}</p>
                        </div>
                        <Badge
                          className={
                            truck.status === "available"
                              ? "bg-green-100 text-green-800"
                              : truck.status === "occupied"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {truck.status === "available"
                            ? "Disponible"
                            : truck.status === "occupied"
                              ? "Ocupada"
                              : "Mantenimiento"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stops" className="space-y-6">
            {/* Interactive Map */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Mapa de Paradas Nacional
                </CardTitle>
                <CardDescription>Terminales y paradas de camionetas en todo Ecuador</CardDescription>
              </CardHeader>
              <CardContent>
                <InteractiveMap height="500px" showControls={true} />
              </CardContent>
            </Card>

            {/* Stops List */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Lista de Paradas</CardTitle>
                <CardDescription>Encuentra la parada más cercana a tu ubicación</CardDescription>
              </CardHeader>
              <CardContent>
                <StopsList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <History className="mr-2 h-5 w-5" />
                  Historial de Viajes
                </CardTitle>
                <CardDescription>Tus viajes anteriores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="flex justify-between items-center p-4 border border-green-100 rounded-lg"
                    >
                      <div>
                        <h4 className="font-semibold">{trip.route}</h4>
                        <p className="text-sm text-gray-600">
                          {trip.date} • {trip.time} • Chofer: {trip.driver}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {trip.status}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{trip.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{trip.price}</p>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Mi Perfil
                </CardTitle>
                <CardDescription>Gestiona tu información personal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="bg-green-600 text-white text-xl">JC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">Juan Carlos Pérez</h3>
                    <p className="text-gray-600">Miembro desde enero 2024</p>
                    <Badge className="bg-green-100 text-green-800 mt-1">Usuario Verificado</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Correo electrónico</Label>
                    <Input value="juan.perez@email.com" disabled className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Teléfono</Label>
                    <Input value="0987654321" className="border-green-200" />
                  </div>
                  <div className="space-y-2">
                    <Label>Cédula</Label>
                    <Input value="1234567890" disabled className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Ciudad</Label>
                    <Input value="Quito" className="border-green-200" />
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">Actualizar Perfil</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Métodos de Pago
                </CardTitle>
                <CardDescription>Gestiona tus métodos de pago</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-green-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">Tarjeta terminada en 4567</h4>
                        <p className="text-sm text-gray-600">Visa • Expira 12/26</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Principal</Badge>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    Agregar Método de Pago
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
