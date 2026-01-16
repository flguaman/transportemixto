"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Truck, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [userType, setUserType] = useState(searchParams.get("type") || "user")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cedula: "",
    password: "",
    confirmPassword: "",
    city: "",
    // Driver specific fields
    licenseNumber: "",
    vehiclePlate: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleCapacity: "",
    acceptTerms: false,
  })

  const ecuadorianCities = [
    "Quito",
    "Guayaquil",
    "Cuenca",
    "Santo Domingo",
    "Machala",
    "Durán",
    "Manta",
    "Portoviejo",
    "Loja",
    "Ambato",
    "Esmeraldas",
    "Riobamba",
    "Milagro",
    "Ibarra",
    "La Libertad",
    "Babahoyo",
    "Sangolquí",
    "Tulcán",
    "Pasaje",
    "Montecristi",
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate registration - in real app, this would send data to backend
    if (userType === "user") {
      router.push("/dashboard/user")
    } else {
      router.push("/dashboard/driver")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Link>
        </div>

        <Card className="border-green-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Truck className="h-8 w-8 text-green-600" />
              <CardTitle className="text-2xl text-green-800">TransMixto Ecuador</CardTitle>
            </div>
            <CardDescription>Crea tu cuenta y comienza a viajar</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={setUserType} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Pasajero</span>
                </TabsTrigger>
                <TabsTrigger value="driver" className="flex items-center space-x-2">
                  <Truck className="h-4 w-4" />
                  <span>Chofer</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombres</Label>
                  <Input
                    id="firstName"
                    placeholder="Juan Carlos"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellidos</Label>
                  <Input
                    id="lastName"
                    placeholder="Pérez González"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cedula">Cédula de Identidad</Label>
                  <Input
                    id="cedula"
                    placeholder="1234567890"
                    value={formData.cedula}
                    onChange={(e) => handleInputChange("cedula", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    placeholder="0987654321"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Select onValueChange={(value) => handleInputChange("city", value)}>
                    <SelectTrigger className="border-green-200 focus:border-green-500">
                      <SelectValue placeholder="Selecciona tu ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      {ecuadorianCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {userType === "driver" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Número de Licencia</Label>
                      <Input
                        id="licenseNumber"
                        placeholder="EC123456789"
                        value={formData.licenseNumber}
                        onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                        required
                        className="border-green-200 focus:border-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehiclePlate">Placa del Vehículo</Label>
                      <Input
                        id="vehiclePlate"
                        placeholder="ABC-1234"
                        value={formData.vehiclePlate}
                        onChange={(e) => handleInputChange("vehiclePlate", e.target.value)}
                        required
                        className="border-green-200 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleModel">Modelo del Vehículo</Label>
                      <Input
                        id="vehicleModel"
                        placeholder="Toyota Hiace"
                        value={formData.vehicleModel}
                        onChange={(e) => handleInputChange("vehicleModel", e.target.value)}
                        required
                        className="border-green-200 focus:border-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicleYear">Año</Label>
                      <Input
                        id="vehicleYear"
                        placeholder="2020"
                        value={formData.vehicleYear}
                        onChange={(e) => handleInputChange("vehicleYear", e.target.value)}
                        required
                        className="border-green-200 focus:border-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicleCapacity">Capacidad (pasajeros)</Label>
                      <Input
                        id="vehicleCapacity"
                        placeholder="12"
                        value={formData.vehicleCapacity}
                        onChange={(e) => handleInputChange("vehicleCapacity", e.target.value)}
                        required
                        className="border-green-200 focus:border-green-500"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm">
                  Acepto los{" "}
                  <Link href="#" className="text-green-600 hover:text-green-700">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link href="#" className="text-green-600 hover:text-green-700">
                    política de privacidad
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={!formData.acceptTerms}>
                Crear Cuenta
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <Link href="/auth/login" className="text-green-600 hover:text-green-700 font-medium">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
