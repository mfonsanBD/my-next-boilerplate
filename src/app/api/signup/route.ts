import { db } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, image, password, type } = await req.json()

    const existsEmail = await db.user.findUnique({ where: { email } })
    if (existsEmail) {
      return NextResponse.json(
        {
          user: null,
          message: 'Este e-mail já consta no sistema.',
        },
        { status: 400 },
      )
    }

    const hashPassword = await hash(password, 10)

    const newUser = await db.user.create({
      data: {
        email,
        name,
        image,
        type,
        status: 'pendente',
        password: hashPassword,
      },
    })

    // eslint-disable-next-line no-unused-vars
    const { password: newUserPassword, ...rest } = newUser

    return NextResponse.json(
      {
        user: rest,
        message: 'Usuário criado com sucesso!',
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        user: {},
        message:
          'Não foi possível cadastrar o usuário. Tente novamente mais tarde!',
      },
      { status: 400 },
    )
  }
}
