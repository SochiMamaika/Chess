import { Header } from "../components/Header"
import { ChessGame } from "../components/ChessGame"

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header username="Игрок1" />
      <main className="container mx-auto py-8">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-3xl font-bold">Шахматная партия</h1>
          <ChessGame />
        </div>
      </main>
    </div>
  )
}