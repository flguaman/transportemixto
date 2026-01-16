"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import InteractiveMap from "@/components/interactive-map"
import StopsList from "@/components/stops-list"
import {
  Truck,
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Star,
  Plus,
  LogOut,
  User,
  Route,
  BarChart3,
  Settings,
  Navigation,
  AlertCircle,
  CheckCircle,
  XCircle,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const todayTrips = [
    {
      id: 1,
      route: "Quito → Guayaquil",
      time: "07:00",
      passengers: 8,
      maxPassengers: 12,
      status: "En curso",
      earnings: "$200.00",
    },
    {
      id: 2,
      route: "Guayaquil → Quito",
      time: "16:00",
      passengers: 6,
      maxPassengers: 12,
      status: "Programado",
      earnings: "$150.00",
    },
  ]

  const stats = {
    todayEarnings: "$350.00",
    weeklyEarnings: "$1,250.00",
    monthlyEarnings: "$4,800.00",
    totalTrips: 156,
    rating: 4.8,
    completionRate: 98,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Truck className="h-8 w-8" />
            <h1 className="text-2xl font-bold">TransMixto Ecuador</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Estado:</span>
              <Switch checked={isOnline} onCheckedChange={setIsOnline} className="data-[state=checked]:bg-green-400" />
              <Badge className={isOnline ? "bg-green-400 text-green-900" : "bg-gray-400 text-gray-900"}>
                {isOnline ? "En línea" : "Desconectado"}
              </Badge>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-green-700">CM</AvatarFallback>
            </Avatar>
            <span className="hidden md:block">Carlos Mendoza</span>
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-2">¡Buen día, Carlos!</h2>
          <p className="text-green-600">Gestiona tus viajes y ganancias</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white border border-green-200">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Resumen</span>
            </TabsTrigger>
            <TabsTrigger value="trips" className="flex items-center space-x-2">
              <Route className="h-4 w-4" />
              <span>Mis Viajes</span>
            </TabsTrigger>
            <TabsTrigger value="fleet" className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span>Mi Flota</span>
            </TabsTrigger>
            <TabsTrigger value="stops" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Paradas</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Configuración</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Ganancias Hoy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-800">{stats.todayEarnings}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Esta Semana</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-800">{stats.weeklyEarnings}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Calificación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="text-2xl font-bold text-green-800">{stats.rating}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Viajes Totales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Route className="h-5 w-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-800">{stats.totalTrips}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Trips */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center justify-between">
                  <span className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Viajes de Hoy
                  </span>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Viaje
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="flex justify-between items-center p-4 border border-green-100 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span className="font-semibold">{trip.route}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{trip.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>
                              {trip.passengers}/{trip.maxPassengers} pasajeros
                            </span>
                          </div>
                          <Badge
                            className={
                              trip.status === "En curso" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                            }
                          >
                            {trip.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600 text-lg">{trip.earnings}</p>
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

          <TabsContent value="trips" className="space-y-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center justify-between">
                  <span className="flex items-center">
                    <Route className="mr-2 h-5 w-5" />
                    Gestionar Viajes
                  </span>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Crear Nuevo Viaje
                  </Button>
                </CardTitle>
                <CardDescription>Programa y gestiona tus rutas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Ruta</Label>
                      <Select>
                        <SelectTrigger className="border-green-200">
                          <SelectValue placeholder="Seleccionar ruta" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quito-guayaquil">Quito → Guayaquil</SelectItem>
                          <SelectItem value="guayaquil-quito">Guayaquil → Quito</SelectItem>
                          <SelectItem value="cuenca-loja">Cuenca → Loja</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Fecha</Label>
                      <Input type="date" className="border-green-200" />
                    </div>
                    <div className="space-y-2">
                      <Label>Hora de salida</Label>
                      <Input type="time" className="border-green-200" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Precio por pasajero</Label>
                      <Input placeholder="$25.00" className="border-green-200" />
                    </div>
                    <div className="space-y-2">
                      <Label>Asientos disponibles</Label>
                      <Input placeholder="12" className="border-green-200" />
                    </div>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">Programar Viaje</Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Trips */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Próximos Viajes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="flex justify-between items-center p-4 border border-green-100 rounded-lg"
                    >
                      <div>
                        <h4 className="font-semibold">{trip.route}</h4>
                        <p className="text-sm text-gray-600">
                          Hoy • {trip.time} • {trip.passengers}/{trip.maxPassengers} pasajeros
                        </p>
                        <Badge
                          className={
                            trip.status === "En curso" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                          }
                        >
                          {trip.status}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fleet" className="space-y-6">
            {/* Fleet Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Vehículos</p>
                      <p className="text-2xl font-bold text-green-600">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Activos</p>
                      <p className="text-2xl font-bold text-green-600">2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm text-gray-600">En Servicio</p>
                      <p className="text-2xl font-bold text-yellow-600">1</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Eficiencia</p>
                      <p className="text-2xl font-bold text-blue-600">94%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* My Vehicles */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center justify-between">
                  <span className="flex items-center">
                    <Truck className="mr-2 h-5 w-5" />
                    Mis Vehículos
                  </span>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Vehículo
                  </Button>
                </CardTitle>
                <CardDescription>Gestiona tu flota de vehículos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      plate: "ABC-1234",
                      model: "Toyota Hiace 2020",
                      type: "2 Cabinas",
                      capacity: 12,
                      status: "active",
                      location: "Av. Amazonas y Naciones Unidas",
                      lastUpdate: "Hace 2 min",
                      fuel: 85,
                      mileage: "45,230 km",
                      nextMaintenance: "2024-02-15",
                    },
                    {
                      id: 2,
                      plate: "DEF-5678",
                      model: "Chevrolet N300 2019",
                      type: "1 Cabina",
                      capacity: 8,
                      status: "occupied",
                      location: "Terminal Terrestre Quitumbe",
                      lastUpdate: "Hace 5 min",
                      fuel: 60,
                      mileage: "38,450 km",
                      nextMaintenance: "2024-01-28",
                    },
                    {
                      id: 3,
                      plate: "GHI-9012",
                      model: "Ford Transit 2021",
                      type: "2 Cabinas",
                      capacity: 14,
                      status: "maintenance",
                      location: "Taller Mecánico Central",
                      lastUpdate: "Hace 2 horas",
                      fuel: 20,
                      mileage: "22,100 km",
                      nextMaintenance: "En proceso",
                    },
                  ].map((vehicle) => (
                    <Card key={vehicle.id} className="border-green-100">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Truck className="h-5 w-5 text-green-600" />
                              <span className="font-semibold text-lg">{vehicle.plate}</span>
                              <Badge
                                className={
                                  vehicle.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : vehicle.status === "occupied"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }
                              >
                                {vehicle.status === "active"
                                  ? "Disponible"
                                  : vehicle.status === "occupied"
                                    ? "En Servicio"
                                    : "Mantenimiento"}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-2">
                              {vehicle.model} • {vehicle.type}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Capacidad:</span>
                                <p className="font-medium">{vehicle.capacity} pasajeros</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Combustible:</span>
                                <p className="font-medium">{vehicle.fuel}%</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Kilometraje:</span>
                                <p className="font-medium">{vehicle.mileage}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Próximo Mantenimiento:</span>
                                <p className="font-medium">{vehicle.nextMaintenance}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Ver Detalles
                            </Button>
                            {vehicle.status === "active" && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                Activar Servicio
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">{vehicle.location}</span>
                            </div>
                            <span className="text-gray-500">Actualizado: {vehicle.lastUpdate}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Real-time Location Map */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <Navigation className="mr-2 h-5 w-5" />
                  Ubicación en Tiempo Real
                </CardTitle>
                <CardDescription>Monitoreo GPS de tu flota</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <Navigation className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Mapa Interactivo</h3>
                  <p className="text-gray-500 mb-4">
                    Aquí se mostraría el mapa en tiempo real con la ubicación de tus vehículos
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium">ABC-1234</span>
                      </div>
                      <p className="text-sm text-gray-600">Av. Amazonas</p>
                      <p className="text-xs text-gray-500">Velocidad: 45 km/h</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="font-medium">DEF-5678</span>
                      </div>
                      <p className="text-sm text-gray-600">Terminal Quitumbe</p>
                      <p className="text-xs text-gray-500">Velocidad: 0 km/h</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="font-medium">GHI-9012</span>
                      </div>
                      <p className="text-sm text-gray-600">Taller Central</p>
                      <p className="text-xs text-gray-500">Fuera de servicio</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fleet Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Rendimiento por Vehículo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { plate: "ABC-1234", trips: 28, earnings: "$840.00", efficiency: 96 },
                      { plate: "DEF-5678", trips: 22, earnings: "$660.00", efficiency: 94 },
                      { plate: "GHI-9012", trips: 15, earnings: "$450.00", efficiency: 89 },
                    ].map((vehicle, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{vehicle.plate}</span>
                          <p className="text-sm text-gray-600">{vehicle.trips} viajes este mes</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{vehicle.earnings}</p>
                          <p className="text-sm text-gray-600">{vehicle.efficiency}% eficiencia</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Alertas y Mantenimiento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-800">DEF-5678</p>
                        <p className="text-sm text-yellow-700">Mantenimiento programado en 5 días</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-800">GHI-9012</p>
                        <p className="text-sm text-red-700">En mantenimiento - Revisión de frenos</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800">ABC-1234</p>
                        <p className="text-sm text-blue-700">Combustible bajo - 15% restante</p>
                      </div>
                    </div>
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
                  Red Nacional de Paradas
                </CardTitle>
                <CardDescription>Terminales y paradas donde puedes operar</CardDescription>
              </CardHeader>
              <CardContent>
                <InteractiveMap height="500px" showControls={true} />
              </CardContent>
            </Card>

            {/* Route Planning */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Planificación de Rutas</CardTitle>
                <CardDescription>Optimiza tus rutas entre paradas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label>Parada de Origen</Label>
                    <Select>
                      <SelectTrigger className="border-green-200">
                        <SelectValue placeholder="Seleccionar origen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quitumbe">Terminal Quitumbe</SelectItem>
                        <SelectItem value="carcelen">Terminal Carcelén</SelectItem>
                        <SelectItem value="guayaquil">Terminal Guayaquil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Parada de Destino</Label>
                    <Select>
                      <SelectTrigger className="border-green-200">
                        <SelectValue placeholder="Seleccionar destino" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cuenca">Terminal Cuenca</SelectItem>
                        <SelectItem value="ambato">Terminal Ambato</SelectItem>
                        <SelectItem value="loja">Terminal Loja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Route className="mr-2 h-4 w-4" />
                  Calcular Ruta Óptima
                </Button>
              </CardContent>
            </Card>

            {/* Stops List */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Directorio de Paradas</CardTitle>
                <CardDescription>Información detallada de todas las paradas</CardDescription>
              </CardHeader>
              <CardContent>
                <StopsList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Perfil del Chofer
                </CardTitle>
                <CardDescription>Información personal y del vehículo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="bg-green-600 text-white text-xl">CM</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">Carlos Mendoza</h3>
                    <p className="text-gray-600">Chofer desde enero 2023</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge className="bg-green-100 text-green-800">Verificado</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">{stats.rating}</span>
                        <span className="text-gray-600">({stats.totalTrips} viajes)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-800">Información Personal</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label>Nombres completos</Label>
                        <Input value="Carlos Alberto Mendoza" className="border-green-200" />
                      </div>
                      <div className="space-y-1">
                        <Label>Cédula</Label>
                        <Input value="0987654321" disabled className="bg-gray-50" />
                      </div>
                      <div className="space-y-1">
                        <Label>Teléfono</Label>
                        <Input value="0998765432" className="border-green-200" />
                      </div>
                      <div className="space-y-1">
                        <Label>Correo electrónico</Label>
                        <Input value="carlos.mendoza@email.com" className="border-green-200" />
                      </div>
                      <div className="space-y-1">
                        <Label>Licencia de conducir</Label>
                        <Input value="EC123456789" disabled className="bg-gray-50" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-800">Información del Vehículo</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label>Placa</Label>
                        <Input value="ABC-1234" disabled className="bg-gray-50" />
                      </div>
                      <div className="space-y-1">
                        <Label>Marca y modelo</Label>
                        <Input value="Toyota Hiace 2020" className="border-green-200" />
                      </div>
                      <div className="space-y-1">
                        <Label>Capacidad de pasajeros</Label>
                        <Input value="12" className="border-green-200" />
                      </div>
                      <div className="space-y-1">
                        <Label>Color</Label>
                        <Input value="Blanco" className="border-green-200" />
                      </div>
                      <div className="space-y-1">
                        <Label>Año</Label>
                        <Input value="2020" className="border-green-200" />
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="bg-green-600 hover:bg-green-700">Actualizar Información</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Configuración
                </CardTitle>
                <CardDescription>Personaliza tu experiencia</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-800">Notificaciones</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Nuevas reservas</Label>
                        <p className="text-sm text-gray-600">Recibir notificaciones de nuevas reservas</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Recordatorios de viaje</Label>
                        <p className="text-sm text-gray-600">Recordatorios 30 minutos antes del viaje</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Promociones</Label>
                        <p className="text-sm text-gray-600">Recibir ofertas y promociones especiales</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-green-800">Preferencias de Pago</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label>Método de cobro preferido</Label>
                      <Select>
                        <SelectTrigger className="border-green-200">
                          <SelectValue placeholder="Seleccionar método" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank">Transferencia bancaria</SelectItem>
                          <SelectItem value="cash">Efectivo</SelectItem>
                          <SelectItem value="digital">Billetera digital</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label>Cuenta bancaria</Label>
                      <Input placeholder="Número de cuenta" className="border-green-200" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-green-800">Disponibilidad</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label>Hora de inicio</Label>
                        <Input type="time" defaultValue="06:00" className="border-green-200" />
                      </div>
                      <div className="space-y-1">
                        <Label>Hora de fin</Label>
                        <Input type="time" defaultValue="20:00" className="border-green-200" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label>Días de trabajo</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
                          <Badge key={day} variant="outline" className="cursor-pointer hover:bg-green-50">
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="bg-green-600 hover:bg-green-700">Guardar Configuración</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
