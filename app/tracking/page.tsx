"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LoadStatus from "@/components/load-status"

// Mock data for demonstration
const mockLoads = [
  {
    id: "L001",
    description: "Envío de Electrónicos",
    status: "En Tránsito",
    origin: "Miami, FL",
    destination: "Bogotá, Colombia",
    estimatedDelivery: "2023-07-15",
  },
  {
    id: "L002",
    description: "Juego de Muebles",
    status: "Entregado",
    origin: "New York, NY",
    destination: "Medellín, Colombia",
    estimatedDelivery: "2023-07-10",
  },
  {
    id: "L003",
    description: "Repuestos de Auto",
    status: "En Proceso",
    origin: "Los Angeles, CA",
    destination: "Cali, Colombia",
    estimatedDelivery: "2023-07-20",
  },
]

export default function TrackingPage() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the credentials against your backend
    // For this example, we'll just set isSignedIn to true
    setIsSignedIn(true)
  }

  if (isSignedIn) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Mis Envíos</h1>
        <div className="grid gap-6">
          {mockLoads.map((load) => (
            <LoadStatus key={load.id} load={load} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>Ingrese sus credenciales para ver sus envíos.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

