"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { DiamondIcon as ChessIcon } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Пожалуйста, заполните все поля")
      return
    }

    try {
      // Здесь будет логика авторизации
      console.log("Авторизация:", { email, password })

      // После успешной авторизации перенаправляем на главную страницу
      router.push("/")
    } catch (err) {
      setError("Неверный email или пароль")
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <ChessIcon className="w-6 h-6" />
          <CardTitle>Вход в Шахматы Онлайн</CardTitle>
        </div>
        <CardDescription>Войдите в свой аккаунт для игры в шахматы</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Введите email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button className="w-full mt-4" type="submit">
            Войти
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className="text-sm text-muted-foreground">
          Нет аккаунта?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}