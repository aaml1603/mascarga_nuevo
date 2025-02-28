"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";


export default function AuthPage() {
  const router = useRouter();
  const [signInError, setSignInError] = useState<string | null>(null);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [signInData, setSignInData] = useState({
    correo: "",
    contrasena: "",
  });

  const [signUpData, setSignUpData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    documento: "",
    direccion: "",
    ciudad: "",
    estado: "",
    telefono: "",
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSignInError(null); // Reset error message

    try {
      const response = await fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        toast({ title: "Inicio de sesión exitoso", description: "Redirigiendo..." });
        router.push("/tracking");
      } else {
        setSignInError(data.error || "Invalid email or password");
      }
    } catch (error) {
      setSignInError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Register
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSignUpError(null); // Reset error message
  
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        toast({ title: "Cuenta creada", description: "Redirigiendo..." });
        router.push("/tracking");
      } else {
        setSignUpError(data.error || "No se pudo crear la cuenta");
      }
    } catch (error) {
      setSignUpError("Ocurrió un error inesperado. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

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
              <CardDescription>
                Ingrese sus credenciales para acceder a su cuenta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
  {signInError && <p className="text-red-500 text-sm">{signInError}</p>}
  <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="signin-email">Correo</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={signInData.correo}
                    onChange={(e) =>
                      setSignInData({ ...signInData, correo: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signin-password">Contraseña</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={signInData.contrasena}
                    onChange={(e) =>
                      setSignInData({
                        ...signInData,
                        contrasena: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Cargando..." : "Iniciar Sesión"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Registrarse</CardTitle>
              <CardDescription>
                Cree una nueva cuenta para acceder a nuestros servicios.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
  {signUpError && <p className="text-red-500 text-sm">{signUpError}</p>}
  <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      id="nombre"
                      placeholder="Juan"
                      value={signUpData.nombre}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, nombre: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input
                      id="apellido"
                      placeholder="Pérez"
                      value={signUpData.apellido}
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          apellido: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Correo</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={signUpData.correo}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, correo: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={signUpData.contrasena}
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        contrasena: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="documento">Documento ID</Label>
                  <Input
                    id="documento"
                    placeholder="12345678"
                    value={signUpData.documento}
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        documento: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    placeholder="Calle 123 #45-67"
                    value={signUpData.direccion}
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        direccion: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="ciudad">Ciudad</Label>
                    <Input
                      id="ciudad"
                      placeholder="Ciudad"
                      value={signUpData.ciudad}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, ciudad: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="estado">Estado</Label>
                    <Input
                      id="estado"
                      placeholder="Estado"
                      value={signUpData.estado}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, estado: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    type="tel"
                    placeholder="+1234567890"
                    value={signUpData.telefono}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, telefono: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Cargando..." : "Registrarse"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
