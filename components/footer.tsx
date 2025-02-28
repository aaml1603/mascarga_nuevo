import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white dark:bg-gray-900">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-2y95vHpdDaEvNoeK0u8zshxBc6MOt9.png"
                alt="Mascarga Express Logo"
                width={200}
                height={67}
                className="w-48 h-auto"
              />
            </Link>
            <p className="text-gray-400">
              Soluciones logísticas integrales para empresas y particulares. Envíos marítimos y aéreos internacionales.
            </p>
            <div className="flex space-x-4">
              <Link href="" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com/mascargaexpressusa" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-2 text-amber-500 flex-shrink-0" />
                <span className="text-gray-400">Miami, FL</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 mr-2 text-amber-500 flex-shrink-0" />
                <Link href="tel:+17866579151" className="text-gray-400 hover:text-white">
                  +1 (786) 657-9151
                </Link>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-2 text-amber-500 flex-shrink-0" />
                <Link href="mailto:mascargaexpressusa@gmail.com" className="text-gray-400 hover:text-white">
                  mascargaexpressusa@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Mascarga Express. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/terminos" className="text-gray-400 hover:text-white text-sm">
                Términos y Condiciones
              </Link>
              <Link href="/privacidad" className="text-gray-400 hover:text-white text-sm">
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

