declare module "chessboardjsx" {
    import { Component } from "react"
  
    interface ChessboardProps {
      position?: string
      onDrop?: (params: { sourceSquare: string; targetSquare: string }) => void
      draggable?: boolean
      width?: number
      darkSquareStyle?: React.CSSProperties
      lightSquareStyle?: React.CSSProperties
      dropSquareStyle?: React.CSSProperties
      onDragOverSquare?: (square: string) => void
      onMouseOutSquare?: (square: string) => void
      onMouseOverSquare?: (square: string) => void
      onPieceClick?: (piece: string) => void
      orientation?: "white" | "black"
      showNotation?: boolean
      sparePieces?: boolean
      boardStyle?: React.CSSProperties
      pieces?: Record<string, (piece: string) => JSX.Element>
    }
  
    export default class Chessboard extends Component<ChessboardProps> {}
  }