import { db } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface ErrorProps {
  message: string
}

export async function GET() {
  const ambulantes = await db.streetVendor.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      activityType: {
        select: {
          name: true,
        },
      },
    },
  })
  return NextResponse.json(
    {
      ambulantes,
    },
    { status: 200 },
  )
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  let errors: ErrorProps[] = []
  let ambulante = null

  const existsCPF = await db.streetVendor.findFirst({
    where: {
      cpf: data.cpf,
    },
  })

  if (existsCPF) {
    errors.push({
      message: 'Já existe um ambulante cadastrado com este CPF.',
    })
  }

  const existsEmail = await db.streetVendor.findFirst({
    where: {
      email: data.email,
    },
  })

  if (existsEmail) {
    errors.push({
      message: 'Já existe um ambulante cadastrado com este e-mail.',
    })
  }

  try {
    if (errors.length > 0) {
      return NextResponse.json(
        {
          ambulante,
          errors,
          message: '',
        },
        { status: 400 },
      )
    } else {
      ambulante = await db.streetVendor.create({
        data,
      })

      return NextResponse.json(
        {
          ambulante,
          errors,
          message: 'Ambulante cadastrado com sucesso!',
        },
        { status: 200 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        message:
          'Não foi possível adicionar o ambulante. Tente novamente mais tarde.',
      },
      { status: 400 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json()

  try {
    await db.streetVendor.delete({
      where: {
        id,
      },
    })

    return NextResponse.json(
      {
        message: 'Ambulante excluído com sucesso!',
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message:
          'Não foi possível excluir o ambulante. Tente novamente mais tarde.',
      },
      { status: 400 },
    )
  }
}
