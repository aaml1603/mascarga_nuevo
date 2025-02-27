import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Package, Calendar } from "lucide-react"

interface Load {
  id: string
  description: string
  status: string
  origin: string
  destination: string
  estimatedDelivery: string
}

interface LoadStatusProps {
  load: Load
}

export default function LoadStatus({ load }: LoadStatusProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "entregado":
        return "bg-green-500"
      case "en tránsito":
        return "bg-blue-500"
      case "en proceso":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{load.description}</CardTitle>
          <Badge className={`${getStatusColor(load.status)} text-white`}>{load.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Truck className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Origen</p>
              <p className="text-sm text-gray-500">{load.origin}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Destino</p>
              <p className="text-sm text-gray-500">{load.destination}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Entrega Estimada</p>
              <p className="text-sm text-gray-500">{load.estimatedDelivery}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className={`${getStatusColor(load.status)} h-2.5 rounded-full`}
              style={{ width: load.status === "Entregado" ? "100%" : load.status === "En Tránsito" ? "50%" : "25%" }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

