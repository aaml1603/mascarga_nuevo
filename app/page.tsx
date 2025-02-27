import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Search, Clock, DollarSign, Globe, Lock, Package2, Plane, Ship, Truck, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const testimonials = [
    {
      content:
        "Excelente servicio, mis paquetes siempre llegan en perfecto estado y en el tiempo estimado. Recomendado al 100%.",
      name: "María González",
      since: "Cliente desde 2020",
    },
    {
      content:
        "Mascarga Express ha simplificado enormemente nuestras operaciones de importación. Su atención al cliente es insuperable.",
      name: "Carlos Rodríguez",
      since: "Cliente desde 2019",
    },
    {
      content: "Precios competitivos y entregas puntuales. No puedo pedir más de un servicio de carga internacional.",
      name: "Ana Martínez",
      since: "Cliente desde 2021",
    },
    {
      content: "El servicio de casillero virtual es una maravilla. Ahora puedo comprar en EE.UU. sin preocupaciones.",
      name: "Luis Hernández",
      since: "Cliente desde 2018",
    },
    {
      content: "La atención personalizada y el seguimiento en tiempo real de mis envíos me dan total tranquilidad.",
      name: "Sofia Pérez",
      since: "Cliente desde 2022",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 lg:py-40 relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('http://mascargaexpress.com/assets/images/img-5700-1-1757x958.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="container relative z-20 px-4 md:px-6">
          <div className="flex flex-col items-start justify-center max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-md mb-4">
              Soluciones de Carga Internacional
            </h1>
            <p className="max-w-[700px] text-white text-xl font-semibold drop-shadow-md mb-6">
              Envíos aéreos y marítimos desde USA con la mejor relación calidad-precio
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold">Cotizar Ahora</Button>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <Card className="bg-orange-500 border-0 overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <Package className="h-12 w-12 text-white" />
                <h3 className="text-2xl font-bold text-white uppercase">Crea tu Casillero Gratis</h3>
                <p className="text-white/90">Recibe tus compras internacionales con tu dirección personal</p>
                <Button className="bg-navy-700 text-white hover:bg-navy-800 mt-4" asChild>
                  <Link href="/auth">CLICK AQUÍ</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-orange-500 border-0 overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <Search className="h-12 w-12 text-white" />
                <h3 className="text-2xl font-bold text-white uppercase">Rastrea tus Envíos</h3>
                <p className="text-white/90">Seguimiento en tiempo real de todos tus paquetes</p>
                <Button className="bg-navy-700 text-white hover:bg-navy-800 mt-4" asChild>
                  <Link href="/tracking">CLICK AQUÍ</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
        <div className="container px-4 md:px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Su necesidad es nuestra prioridad, su solución es nuestro compromiso.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-navy-800 p-6 rounded-lg text-white hover:bg-navy-900 transition-colors">
              <div className="flex items-start mb-4">
                <Clock className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-bold">Envíos a Tiempo</h3>
              </div>
              <p className="text-blue-100">
                Garantizamos envíos puntuales con eficiencia y seguridad. Nos comprometemos a que su carga llegue a su
                destino sin retrasos, conectando mercados y personas con soluciones logísticas confiables y ágiles.
              </p>
            </div>

            <div className="bg-navy-800 p-6 rounded-lg text-white hover:bg-navy-900 transition-colors">
              <div className="flex items-start mb-4">
                <DollarSign className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-bold">Los Mejores Precios</h3>
              </div>
              <p className="text-blue-100">
                Ofrecemos las mejores tarifas sin comprometer la calidad. Brindamos soluciones logísticas eficientes y
                accesibles, asegurando que su carga llegue a destino al mejor precio del mercado.
              </p>
            </div>

            <div className="bg-navy-800 p-6 rounded-lg text-white hover:bg-navy-900 transition-colors">
              <div className="flex items-start mb-4">
                <Users className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-bold">Servicio de Atención</h3>
              </div>
              <p className="text-blue-100">
                Ofrecemos un servicio de atención personalizado y eficiente, asegurando que cada cliente reciba soporte
                rápido y soluciones a medida. Nuestro equipo está disponible para brindarle asistencia en cada etapa de
                su envío.
              </p>
            </div>

            <div className="bg-navy-800 p-6 rounded-lg text-white hover:bg-navy-900 transition-colors">
              <div className="flex items-start mb-4">
                <Globe className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-bold">Experiencia en Envíos</h3>
              </div>
              <p className="text-blue-100">
                Contamos con amplia experiencia en envíos marítimos y aéreos, ofreciendo soluciones logísticas seguras y
                eficientes. Nuestra trayectoria nos permite manejar su carga con precisión.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-orange-100 dark:bg-orange-900/20 p-6 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/30 transition-colors">
              <div className="flex items-start mb-4">
                <Ship className="h-6 w-6 mr-2 text-orange-500" />
                <h3 className="text-xl font-bold">Envíos Marítimos</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Ofrecemos soluciones de carga marítima confiables y rentables para el transporte internacional de
                mercancías. Con una red global de puertos y operadores, garantizamos tiempos de tránsito eficientes.
              </p>
            </div>

            <div className="bg-orange-100 dark:bg-orange-900/20 p-6 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/30 transition-colors">
              <div className="flex items-start mb-4">
                <Plane className="h-6 w-6 mr-2 text-orange-500" />
                <h3 className="text-xl font-bold">Envíos Aéreos</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Brindamos soluciones de transporte aéreo eficientes para envíos urgentes y de alto valor. Con acceso a
                una red global de aerolíneas y aeropuertos, garantizamos tiempos de entrega reducidos.
              </p>
            </div>

            <div className="bg-orange-100 dark:bg-orange-900/20 p-6 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/30 transition-colors">
              <div className="flex items-start mb-4">
                <Package2 className="h-6 w-6 mr-2 text-orange-500" />
                <h3 className="text-xl font-bold">Re-empaque</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Optimizamos la seguridad y presentación de su mercancía con nuestro servicio de reempaque. Ya sea para
                reducir costos de envío, mejorar la protección o cumplir con regulaciones internacionales.
              </p>
            </div>

            <div className="bg-orange-100 dark:bg-orange-900/20 p-6 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/30 transition-colors lg:col-span-2">
              <div className="flex items-start mb-4">
                <Lock className="h-6 w-6 mr-2 text-orange-500" />
                <h3 className="text-xl font-bold">Casillero Virtual Internacional</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Con nuestro servicio de casillero virtual, recibe tus compras en una dirección en EE.UU. y envíalas a
                cualquier parte del mundo de forma rápida y segura. Ideal para compradores internacionales y empresas
                que buscan optimizar su logística.
              </p>
            </div>

            <div className="bg-orange-100 dark:bg-orange-900/20 p-6 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/30 transition-colors lg:col-span-1">
              <div className="flex items-start mb-4">
                <Truck className="h-6 w-6 mr-2 text-orange-500" />
                <h3 className="text-xl font-bold">Carga Consolidada</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Optimiza costos y agiliza la logística con nuestro servicio de carga consolidada (LCL). Agrupamos su
                mercancía con otros envíos para ofrecerle una opción segura y rentable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with Marquee Effect */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
              Lo que dicen nuestros clientes
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Miles de clientes confían en nosotros para sus envíos internacionales
            </p>
          </div>
          <div className="relative">
            <div className="marquee-container">
              <div className="marquee">
                {testimonials.concat(testimonials).map((testimonial, index) => (
                  <Card key={index} className="marquee-item border border-gray-200 dark:border-gray-700 w-[300px] mx-4">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-amber-500"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">"{testimonial.content}"</p>
                      <div className="flex items-center space-x-4">
                        <div className="rounded-full bg-gray-200 dark:bg-gray-700 w-10 h-10" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{testimonial.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.since}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contacto" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">¿Listo para enviar?</h2>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Contáctanos hoy mismo y obtén una cotización personalizada
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold">
                Solicitar Cotización
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

