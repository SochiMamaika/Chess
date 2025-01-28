import Image from "next/image"

interface HeaderProps {
  username: string
}

export function Header({ username }: HeaderProps) {
  return (
    <header className="w-full bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image src="/chess-logo.svg" alt="Chess Logo" width={40} height={40} />
          <span className="text-xl font-bold">Шахматы Онлайн</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>{username}</span>
        </div>
      </div>
    </header>
  )
}