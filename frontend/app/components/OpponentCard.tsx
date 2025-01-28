import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { UserInfo } from "../types/user"

interface OpponentCardProps {
  opponent: UserInfo
}

export function OpponentCard({ opponent }: OpponentCardProps) {
  const totalGames = opponent.wins + opponent.losses
  const winRate = totalGames > 0 ? Math.round((opponent.wins / totalGames) * 100) : 0

  return (
    <Card className="w-[300px]">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <CardTitle>{opponent.username}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
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
      </CardContent>
    </Card>
  )
}