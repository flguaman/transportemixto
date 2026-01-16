"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("user")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login - in real app, this would authenticate with backend
    if (userType === "user") {
      router.push("/dashboard/user")
    } else {
      router.push("/dashboard/driver")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
            <CardDescription>Inicia sesión en tu cuenta</CardDescription>
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

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-green-200 focus:border-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-green-200 focus:border-green-500"
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Iniciar Sesión
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes cuenta?{" "}
                <Link href="/auth/register" className="text-green-600 hover:text-green-700 font-medium">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
