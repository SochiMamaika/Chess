"use client"

import { useState } from "react"
import { Header } from "../components/Header"
import { OnlineUsersList } from "../components/OnlineUsersList"
import { OpponentCard } from "../components/OpponentCard"
import type { UserInfo } from "../types/user"

// Моковые данные для демонстрации
const currentUser = { username: "Игрок1" }
const onlineUsers: UserInfo[] = [
  { id: "1", username: "Игрок2", rating: 1200, wins: 10, losses: 5 },
  { id: "2", username: "Игрок3", rating: 1500, wins: 20, losses: 8 },
  { id: "3", username: "Игрок4", rating: 1100, wins: 5, losses: 15 },
  { id: "4", username: "Игрок5", rating: 1800, wins: 50, losses: 10 },
  { id: "5", username: "Игрок6", rating: 1300, wins: 15, losses: 12 },
]

export default function OpponentSelectionPage() {
  const [selectedOpponent, setSelectedOpponent] = useState<UserInfo | null>(null)

  const handleSelectOpponent = (opponent: UserInfo) => {
    setSelectedOpponent(opponent)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header username={currentUser.username} />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Выберите соперника</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-grow">
            <OnlineUsersList users={onlineUsers} onSelectOpponent={handleSelectOpponent} />
          </div>
          {selectedOpponent && (
            <div className="md:w-[400px]">
              <OpponentCard opponent={selectedOpponent} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}