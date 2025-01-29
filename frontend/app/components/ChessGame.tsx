"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"; // Используем next/navigation вместо next/router
import { Chessground as ChessgroundApi } from "chessground"
import { Chess } from "chess.js"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ChessGame() {
  const [fen, setFen] = useState(new Chess().fen())
  const [gameOver, setGameOver] = useState("")
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  const chess = useRef(new Chess()) // Используем useRef, чтобы избежать повторных рендеров
  const chessground = useRef<ChessgroundApi | null>(null)
  const router = useRouter(); // Используем useRouter из next/navigation

  // getDests не зависит от fen
  const getDests = useCallback(() => {
    const dests = new Map()
    chess.current.board().forEach((row, rowIndex) => {
      row.forEach((square, colIndex) => {
        const squareName = `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`
        const ms = chess.current.moves({ square: squareName, verbose: true })
        if (ms.length) {
          dests.set(squareName, ms.map((m) => m.to))
        }
      })
    })
    return dests
  }, [])

  const handleMove = useCallback(
    (from: string, to: string) => {
      const move = chess.current.move({ from, to, promotion: "q" })
      if (move === null) return false

      const newFen = chess.current.fen()
      if (fen !== newFen) {
        setFen(newFen)
      }

      setMoveHistory((prev) => [
        ...prev,
        `${chess.current.turn() === "b" ? "Белые" : "Черные"}: ${move.san}`,
      ])

      if (chess.current.isGameOver()) {
        if (chess.current.isCheckmate()) setGameOver(`Шах и мат! ${chess.current.turn() === "w" ? "Черные" : "Белые"} победили!`)
        else if (chess.current.isDraw()) setGameOver("Ничья!")
        else if (chess.current.isStalemate()) setGameOver("Пат!")
        else if (chess.current.isThreefoldRepetition()) setGameOver("Ничья из-за троекратного повторения позиции!")
        else if (chess.current.isInsufficientMaterial()) setGameOver("Ничья из-за недостаточного материала!")
      }

      if (chessground.current) {
        chessground.current.set({
          fen: newFen,
          turnColor: chess.current.turn() === "w" ? "white" : "black",
          movable: {
            color: chess.current.turn() === "w" ? "white" : "black",
            dests: getDests(), // обновляем доступные ходы
          },
        })
      }

      return true
    },
    [fen, getDests]
  )

  useEffect(() => {
    const config = {
      fen: fen,
      movable: {
        color: "white",
        free: false,
        dests: getDests(),
      },
      events: {
        move: handleMove,
      },
    }

    const cg = ChessgroundApi(document.getElementById("chessground")!, config)
    chessground.current = cg

    return () => {
      cg.destroy()
    }
  }, [fen, getDests, handleMove]) // dependencies, no unnecessary renders

  const resetGame = useCallback(() => {
    chess.current.reset();
    const newFen = chess.current.fen();
    setFen(newFen);
    setGameOver("");
    setMoveHistory([]);
    if (chessground.current) {
      chessground.current.set({
        fen: newFen,
        turnColor: "white",
        movable: {
          color: "white",
          dests: getDests(),
        },
      });
    }
    router.push("/chess"); // Перенаправление на /chess
  }, [getDests, router]); // Добавьте router в зависимости

  const undoMove = useCallback(() => {
    chess.current.undo()
    const newFen = chess.current.fen()
    setFen(newFen)
    setGameOver("")
    setMoveHistory((prev) => prev.slice(0, -1))
    if (chessground.current) {
      chessground.current.set({
        fen: newFen,
        turnColor: "white",
        movable: {
          color: "white",
          dests: getDests(),
        },
      })
    }
  }, [getDests])

  return (
    <div className="flex flex-col md:flex-row items-start gap-6">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <Button onClick={resetGame}>Новая игра</Button>
          <Button onClick={undoMove}>Отменить ход</Button>
        </div>
        <Card className="p-4">
          <div id="chessground" style={{ width: "500px", height: "500px" }}></div>
        </Card>
        {gameOver && <div className="text-xl font-bold text-primary">{gameOver}</div>}
        <div className="text-sm text-muted-foreground">Ход: {chess.current.turn() === "w" ? "Белые" : "Черные"}</div>
      </div>
      <Card className="w-full md:w-64">
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <h3 className="font-semibold mb-2">История ходов:</h3>
          {moveHistory.map((move, index) => (
            <div key={index} className="text-md">
              {move}
            </div>
          ))}
        </ScrollArea>
      </Card>
    </div>
  )
}