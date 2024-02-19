import { db } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface ErrorProps {
  message: string
}

export async function GET() {
  const permissionariosVan = await db.vanLicensee.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      modalType: {
        select: {
          name: true,
        },
      },
    },
  })
  return NextResponse.json(
    {
      permissionariosVan,
    },
    { status: 200 },
  )
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  let errors: ErrorProps[] = []
  let permissionario = null

  const existsCPF = await db.vanLicensee.findFirst({
    where: {
      cpf: data.cpf,
    },
  })

  if (existsCPF) {
    errors.push({
      message: 'Já existe um permissionário cadastrado com este CPF.',
    })
  }

  const existsEmail = await db.vanLicensee.findFirst({
    where: {
      email: data.email,
    },
  })

  if (existsEmail) {
    errors.push({
      message: 'Já existe um permissionário cadastrado com este e-mail.',
    })
  }

  try {
    if (errors.length > 0) {
      return NextResponse.json(
        {
          permissionario,
          errors,
          message: '',
        },
        { status: 400 },
      )
    } else {
      permissionario = await db.vanLicensee.create({
        data,
      })

      return NextResponse.json(
        {
          permissionario,
          errors,
          message: 'Permissionário cadastrado com sucesso!',
        },
        { status: 200 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        message:
          'Não foi possível adicionar o permissionário. Tente novamente mais tarde.',
      },
      { status: 400 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json()

  try {
    await db.vanLicensee.delete({
      where: {
        id,
      },
    })

    return NextResponse.json(
      {
        message: 'Permissionário excluído com sucesso!',
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message:
          'Não foi possível excluir o permissionário. Tente novamente mais tarde.',
      },
      { status: 400 },
    )
  }
}
