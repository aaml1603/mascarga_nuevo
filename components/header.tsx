import Link from "next/link"
import { Phone, Mail } from "lucide-react"

export default function Header() {
  return (
    <header className="w-full bg-black dark:bg-gray-900 text-white py-2">
      <div className="container flex justify-between items-center px-4 md:px-6">
        <div>
          <Link href="#" className="text-sm hover:text-amber-400">
            ¿Alguna Pregunta?
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="tel:+17866579151" className="flex items-center text-sm hover:text-amber-400">
            <Phone className="h-4 w-4 mr-1" />
            <span>+1 (786) 657-9151</span>
          </Link>
          <Link href="mailto:mascargaexpressusa@gmail.com" className="flex items-center text-sm hover:text-orange-400">
            <Mail className="h-4 w-4 mr-1" />
            <span>mascargaexpressusa@gmail.com</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

