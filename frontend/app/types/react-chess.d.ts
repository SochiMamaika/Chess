declare module "react-chess" {
    import type { FC } from "react"
  
    interface BoardProps {
      position?: string
      onMove?: (move: { from: string; to: string }) => boolean
      lightSquareStyle?: React.CSSProperties
      darkSquareStyle?: React.CSSProperties
      dropSquareStyle?: React.CSSProperties
      onDragOverSquare?: (square: string) => void
      onMouseOutSquare?: (square: string) => void
      onMouseOverSquare?: (square: string) => void
      onPieceClick?: (piece: string) => void
      allowDrag?: (piece: { type: string; color: string }, fromSquare: string) => boolean
      width?: number
      orientation?: "white" | "black"
      showNotation?: boolean
      sparePieces?: boolean
      draggable?: boolean
      undo?: boolean
    }
  
    export const Board: FC<BoardProps>
  }