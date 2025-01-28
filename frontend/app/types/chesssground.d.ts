declare module "chessground" {
    export interface Api {
      set(config: any): void
      state: any
      getFen(): string
      move(orig: string, dest: string): void
      newPiece(piece: any, key: string): void
      playPremove(): boolean
      playPredrop(validate: (drop: any) => boolean): boolean
      cancelPremove(): void
      cancelPredrop(): void
      cancelMove(): void
      stop(): void
      explode(keys: string[]): void
      setShapes(shapes: any[]): void
      setAutoShapes(shapes: any[]): void
      getKeyAtDomPos(pos: any): string
      redrawAll(): void
      dragNewPiece(piece: any, event: any, force?: boolean): void
      destroy(): void
    }
  
    export function Chessground(element: HTMLElement, config?: any): Api
  }