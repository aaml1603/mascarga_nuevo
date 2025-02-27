"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface DeliveryEntry {
  id: number
  user_id: string
  numero: string
  origen: string
  destino: string
  fecha_estimada: string
  estado: string
}

export default function TrackingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [deliveries, setDeliveries] = useState<DeliveryEntry[]>([])

  useEffect(() => {
    const fetchDeliveries = async () => {
      const token = localStorage.getItem("access_token")
      if (!token) {
        router.push("/auth")
        return
      }

      try {
        const response = await fetch("http://localhost:8080/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        if (response.ok) {
          setDeliveries(data)
        } else {
          if (response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem("access_token")
            router.push("/auth")
          } else {
            toast({
              title: "Error",
              description: data.error || "Failed to fetch deliveries",
              variant: "destructive",
            })
          }
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDeliveries()
  }, [router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Mis Envíos</h1>
      {deliveries.length === 0 ? (
        <p>No tienes envíos activos en este momento.</p>
      ) : (
        <div className="grid gap-6">
          {deliveries.map((delivery) => (
            <Card key={delivery.id}>
              <CardHeader>
                <CardTitle>Envío #{delivery.numero}</CardTitle>
                <CardDescription>Estado: {delivery.estado}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Origen: {delivery.origen}</p>
                <p>Destino: {delivery.destino}</p>
                <p>Fecha estimada de entrega: {delivery.fecha_estimada}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

