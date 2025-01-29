"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { UserInfo } from "../types/user"

interface OnlineUsersListProps {
  users: UserInfo[]
  onSelectOpponent: (opponent: UserInfo) => void
}

export function OnlineUsersList({ users, onSelectOpponent }: OnlineUsersListProps) {
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null)

  const handleSelectUser = (user: UserInfo) => {
    setSelectedUser(user)
    onSelectOpponent(user)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <Card
        key={user.id}
        className={`cursor-pointer transition-all ${selectedUser?.id === user.id ? "ring-2 ring-primary" : ""}`}
      >
      
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="flex-grow">
              <h3 className="font-semibold">{user.username}</h3>
              <p className="text-md text-gray-500">Рейтинг: {user.rating}</p>
            </div>
            <Button onClick={() => handleSelectUser(user)}>Выбрать</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}