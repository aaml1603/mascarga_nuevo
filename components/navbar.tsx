"use client";
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center lg:justify-start">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-2y95vHpdDaEvNoeK0u8zshxBc6MOt9.png"
              alt="Mascarga Express Logo"
              width={240}
              height={80}
              className="h-16 w-auto"
            />
          </Link>
        </div>
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex items-baseline space-x-4">
            <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Inicio
            </Link>
            <Link href="/#servicios" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Servicios
            </Link>
            <Link href="/#contacto" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Contacto
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 justify-end">
        <Button
  className="bg-orange-500 hover:bg-orange-600 text-white font-bold"
  onClick={() => window.open("https://wa.me/7866579151", "_blank")}
>
  Contactanos por Whatsapp
</Button>
        </div>
        <div className="lg:hidden">
          <Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">Open main menu</span>
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
            Inicio
          </Link>
          <Link href="/#servicios" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
            Servicios
          </Link>
          <Link href="/#contacto" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
            Contacto
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="px-2">
          <Button
  className="bg-orange-500 hover:bg-orange-600 text-white font-bold"
  onClick={() => window.open("https://wa.me/7866579151", "_blank")}
>
  Contactanos por Whatsapp
</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

