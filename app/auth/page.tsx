"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the credentials against your backend
    // For this example, we'll just redirect to the tracking page
    router.push("/tracking")
  }

  return (
    <div className="container mx-auto py-10">
      <Tabs defaultValue="signin" className="w-full max-w-2xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Iniciar Sesión</TabsTrigger>
          <TabsTrigger value="signup">Registrarse</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Iniciar Sesión</CardTitle>
              <CardDescription>Ingrese sus credenciales para acceder a su cuenta.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="signin-email">Correo</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signin-password">Contraseña</Label>
                  <Input
                    id="signin-password"
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
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Registrarse</CardTitle>
              <CardDescription>Cree una nueva cuenta para acceder a nuestros servicios.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id="nombre" placeholder="Juan" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input id="apellido" placeholder="Pérez" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Correo</Label>
                <Input id="email" type="email" placeholder="correo@ejemplo.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="documento">Documento ID</Label>
                <Input id="documento" placeholder="12345678" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="direccion">Dirección</Label>
                <Input id="direccion" placeholder="Calle 123 #45-67" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Input id="ciudad" placeholder="Ciudad" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="estado">Estado</Label>
                  <Input id="estado" placeholder="Estado" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" type="tel" placeholder="+1234567890" />
              </div>
              <Button className="w-full">Registrarse</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

