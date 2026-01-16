"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Users, Package, MapPin, Clock, Shield, Star, Phone } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Truck className="h-8 w-8" />
            <h1 className="text-2xl font-bold">TransMixto Azuay</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#servicios" className="hover:text-green-200 transition-colors">
              Servicios
            </a>
            <a href="#como-funciona" className="hover:text-green-200 transition-colors">
              ¿Cómo funciona?
            </a>
            <a href="#contacto" className="hover:text-green-200 transition-colors">
              Contacto
            </a>
          </nav>
          <div className="space-x-2">
            <Link href="/auth/login">
              <Button variant="outline" className="text-green-600 border-white hover:bg-white bg-transparent">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-green-700 hover:bg-green-800">Registrarse</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Welcome Presentation */}
      <section className="py-10 md:py-16 bg-gradient-to-r from-green-600 to-emerald-500 text-white">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[30vh]">
          <div className="text-center mb-4 md:mb-8 transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-green-100 drop-shadow-lg">
              TransMixto<span className="text-yellow-300">.ec</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light mt-2 md:mt-4 text-green-100 px-2">
              Conectando caminos, uniendo destinos
            </p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-green-800 mb-6">Transporte Mixto Confiable en Azuay</h2>
          <p className="text-xl text-green-700 mb-8 max-w-3xl mx-auto">
            Conectamos pasajeros y carga en un solo viaje. Solución eficiente y económica para el transporte
            intercantonal en todo Azuay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register?type=user">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                <Users className="mr-2 h-5 w-5" />
                Soy Pasajero
              </Button>
            </Link>
            <Link href="/auth/register?type=driver">
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-lg px-8 py-3 bg-transparent"
              >
                <Truck className="mr-2 h-5 w-5" />
                Soy Chofer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-green-800 mb-12">Nuestros Servicios</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Transporte de Pasajeros</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Viajes interprovinciales</li>
                  <li>• Asientos cómodos y seguros</li>
                  <li>• Horarios flexibles</li>
                  <li>• Tarifas competitivas</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Package className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Envío de Encomiendas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Paquetes y documentos</li>
                  <li>• Seguimiento en tiempo real</li>
                  <li>• Entrega puerta a puerta</li>
                  <li>• Seguro incluido</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Truck className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Transporte Mixto</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Pasajeros + carga</li>
                  <li>• Optimización de rutas</li>
                  <li>• Mayor rentabilidad</li>
                  <li>• Servicio integral</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-green-800 mb-12">¿Cómo Funciona?</h3>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Para Pasajeros */}
            <div>
              <h4 className="text-2xl font-semibold text-green-700 mb-6 flex items-center">
                <Users className="mr-3 h-6 w-6" />
                Para Pasajeros
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Badge className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    1
                  </Badge>
                  <div>
                    <h5 className="font-semibold text-green-800">Busca tu ruta</h5>
                    <p className="text-gray-600">Selecciona origen, destino y fecha de viaje</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Badge className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    2
                  </Badge>
                  <div>
                    <h5 className="font-semibold text-green-800">Reserva tu asiento</h5>
                    <p className="text-gray-600">Elige tu asiento y confirma la reserva</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Badge className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    3
                  </Badge>
                  <div>
                    <h5 className="font-semibold text-green-800">Viaja seguro</h5>
                    <p className="text-gray-600">Presenta tu código QR y disfruta el viaje</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Para Choferes */}
            <div>
              <h4 className="text-2xl font-semibold text-green-700 mb-6 flex items-center">
                <Truck className="mr-3 h-6 w-6" />
                Para Choferes
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Badge className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    1
                  </Badge>
                  <div>
                    <h5 className="font-semibold text-green-800">Registra tu vehículo</h5>
                    <p className="text-gray-600">Completa la documentación y verificación</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Badge className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    2
                  </Badge>
                  <div>
                    <h5 className="font-semibold text-green-800">Publica tus rutas</h5>
                    <p className="text-gray-600">Define horarios, precios y disponibilidad</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Badge className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    3
                  </Badge>
                  <div>
                    <h5 className="font-semibold text-green-800">Genera ingresos</h5>
                    <p className="text-gray-600">Recibe pagos automáticos por cada viaje</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-green-800 mb-12">¿Por qué elegir TransMixto Ecuador?</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold text-green-800 mb-2">Seguridad Garantizada</h4>
              <p className="text-gray-600 text-sm">Choferes verificados y vehículos inspeccionados</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold text-green-800 mb-2">Puntualidad</h4>
              <p className="text-gray-600 text-sm">Horarios precisos y seguimiento en tiempo real</p>
            </div>
            <div className="text-center">
              <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold text-green-800 mb-2">Cobertura Provincial</h4>
              <p className="text-gray-600 text-sm">Conectamos todos los cantones del Azuay</p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold text-green-800 mb-2">Mejor Precio</h4>
              <p className="text-gray-600 text-sm">Tarifas competitivas y transparentes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contacto" className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-8">¿Necesitas ayuda?</h3>
          <p className="text-xl mb-8">Nuestro equipo está disponible 24/7 para asistirte</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>+593 2 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📧 soporte@transmixto.ec</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Truck className="h-6 w-6" />
            <span className="text-xl font-bold">TransMixto Azuay</span>
          </div>
          <p className="text-green-200">© 2024 TransMixto Azuay. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
