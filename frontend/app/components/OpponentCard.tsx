import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button" // Импортируйте компонент Button
import type { UserInfo } from "../types/user"
import { useRouter } from "next/navigation" // Хук для программной навигации между страницами в Next.js

interface OpponentCardProps {
  opponent: UserInfo
}

export function OpponentCard({ opponent }: OpponentCardProps) {
  const totalGames = opponent.wins + opponent.losses
  const winRate = totalGames > 0 ? Math.round((opponent.wins / totalGames) * 100) : 0
  const router = useRouter() // Хук для работы с навигацией
  const Start_game = () => {
    router.push("/game") // Программная навигация на главную страницу
  }
  return (
    <Card className="w-[300px]">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <CardTitle>{opponent.username}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-md">
          <div>Рейтинг:</div>
          <div className="font-semibold">{opponent.rating}</div>
          <div>Победы:</div>
          <div className="font-semibold">{opponent.wins}</div>
          <div>Поражения:</div>
          <div className="font-semibold">{opponent.losses}</div>
          <div>Всего игр:</div>
          <div className="font-semibold">{totalGames}</div>
          <div>Процент побед:</div>
          <div className="font-semibold">{winRate}%</div>
        </div>
        {/* Кнопка "Играть" */}
        <Button className="w-full mt-4" onClick={() => Start_game()}>Играть</Button>
      </CardContent>
    </Card>
  )
}