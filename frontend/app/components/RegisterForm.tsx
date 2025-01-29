"use client" // Указывает, что этот файл работает на стороне клиента (Next.js 13+)

import { useState } from "react" // Хук для управления состоянием в функциональном компоненте
import { useRouter } from "next/navigation" // Хук для программной навигации между страницами в Next.js
import Link from "next/link" // Компонент для навигации с использованием ссылок в Next.js
import { Button } from "@/components/ui/button" // Кастомный компонент кнопки из вашей UI-библиотеки
import { Input } from "@/components/ui/input" // Кастомный компонент текстового поля из вашей UI-библиотеки
import { Label } from "@/components/ui/label" // Кастомный компонент лейбла из вашей UI-библиотеки
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card" 
// Кастомные компоненты для отображения карточки (Card), включающей заголовок, содержимое и футер
import { DiamondIcon as ChessIcon } from "lucide-react" // Импорт и переименование иконки для использования в интерфейсе

export function RegisterForm() { // Экспортируемый компонент формы регистрации
  const [username, setUsername] = useState("") // Состояние для имени пользователя
  const [email, setEmail] = useState("") // Состояние для email
  const [password, setPassword] = useState("") // Состояние для пароля
  const [error, setError] = useState("") // Состояние для отображения ошибок
  const router = useRouter() // Хук для работы с навигацией

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
    setError(""); // Очищаем сообщение об ошибке
  
    if (!username || !email || !password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }
      router.push("/chess");
  };
  

  return (
    <Card className="w-[350px]"> {/* Карточка с шириной 350px */}
      <CardHeader> {/* Заголовок карточки */}
        <div className="flex items-center space-x-2"> {/* Контейнер с иконкой и заголовком */}
          <ChessIcon className="w-6 h-6" /> {/* Иконка шахматного элемента */}
          <CardTitle>Регистрация на Сайт</CardTitle> {/* Заголовок карточки */}
        </div>
        <CardDescription>Создайте аккаунт для игры</CardDescription> {/* Описание под заголовком */}
      </CardHeader>
      <CardContent> {/* Основное содержимое карточки */}
        <form onSubmit={handleSubmit}> {/* Форма с обработчиком отправки */}
          <div className="grid w-full items-center gap-4"> {/* Контейнер для элементов формы с сеткой */}
            <div className="flex flex-col space-y-1.5"> {/* Блок для имени пользователя */}
              <Label htmlFor="username">Имя пользователя</Label> {/* Лейбл для поля ввода имени */}
              <Input
                id="username" // Связывается с лейблом
                placeholder="Введите имя пользователя" // Подсказка в поле ввода
                value={username} // Значение берется из состояния
                onChange={(e) => setUsername(e.target.value)} // Обновляем состояние при вводе
              />
            </div>
            <div className="flex flex-col space-y-1.5"> {/* Блок для email */}
              <Label htmlFor="email">Email</Label> {/* Лейбл для поля email */}
              <Input
                id="email" // Связывается с лейблом
                type="email" // Указывает, что это поле для email
                placeholder="Введите email" // Подсказка в поле ввода
                value={email} // Значение берется из состояния
                onChange={(e) => setEmail(e.target.value)} // Обновляем состояние при вводе
              />
            </div>
            <div className="flex flex-col space-y-1.5"> {/* Блок для пароля */}
              <Label htmlFor="password">Пароль</Label> {/* Лейбл для поля пароля */}
              <Input
                id="password" // Связывается с лейблом
                type="password" // Указывает, что это поле для пароля
                placeholder="Введите пароль" // Подсказка в поле ввода
                value={password} // Значение берется из состояния
                onChange={(e) => setPassword(e.target.value)} // Обновляем состояние при вводе
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Отображение ошибки, если она есть */}
          <Button className="w-full mt-4" type="submit"> {/* Кнопка отправки формы */}
            Зарегистрироваться
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center"> {/* Футер карточки */}
        <p className="text-sm text-muted-foreground"> {/* Текст с ссылкой */}
          Уже есть аккаунт?{" "} {/* Подсказка для перехода на страницу входа */}
          <Link href="/login" className="text-primary hover:underline"> {/* Ссылка на страницу входа */}
            Войти
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
