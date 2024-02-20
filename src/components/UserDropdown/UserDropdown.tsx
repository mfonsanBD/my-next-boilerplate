'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export default function UserDropdown() {
  const { data } = useSession()
  const userFallback = data?.user?.name?.substring(0, 1)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="absolute right-0">
        <Avatar className="w-12 h-12 cursor-pointer">
          <AvatarImage
            className="object-cover object-center"
            src={data?.user?.image || ''}
          />
          <AvatarFallback className="bg-blue-50 text-blue-800">
            {userFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {data?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground capitalize">
              {data?.user?.type === 'admin'
                ? 'Administrativo'
                : data?.user?.type}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/perfil">
            Perfil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/usuarios">
            Usuários
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            className="w-full text-red-600 hover:bg-red-50 hover:text-red-600 cursor-pointer"
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: '/',
              })
            }
          >
            Sair
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
