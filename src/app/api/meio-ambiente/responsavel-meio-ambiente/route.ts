import { db } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const meioAmbienteManagers = await db.constructionManager.findMany({
    where: {
      type: 'MEIOAMBIENTE',
    },
  })

  return NextResponse.json(
    {
      meioAmbienteManagers,
    },
    { status: 200 },
  )
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  try {
    if (data.document.length === 14) {
      const existsManager = await db.constructionManager.findFirst({
        where: {
          document: data.document,
        },
      })

      if (existsManager) {
        return NextResponse.json(
          {
            message: 'Já existe um responsável cadastrado com este CPF.',
          },
          { status: 400 },
        )
      }
    } else if (data.document.length < 14) {
      return NextResponse.json(
        {
          message: 'O documento informado está incorreto.',
        },
        { status: 400 },
      )
    }

    const existsEmail = await db.constructionManager.findFirst({
      where: {
        email: data.email,
      },
    })

    if (existsEmail) {
      return NextResponse.json(
        {
          message: 'Já existe um responsável cadastrado com este e-mail.',
        },
        { status: 400 },
      )
    }

    await db.constructionManager.create({
      data: {
        ...data,
        type: 'MEIOAMBIENTE',
      },
    })

    return NextResponse.json(
      {
        message: 'Responsável cadastrado com sucesso!',
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message:
          'Não foi possível adicionar o responsável. Tente novamente mais tarde.',
      },
      { status: 400 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  const data = await request.json()

  try {
    await db.constructionManager.update({
      where: {
        id: data.id,
      },
      data,
    })

    return NextResponse.json(
      {
        message: 'Responsável atualizado com sucesso!',
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message:
          'Não foi possível atualizar o responsável. Tente novamente mais tarde.',
      },
      { status: 400 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json()

  try {
    await db.constructionManager.delete({
      where: {
        id,
      },
    })

    return NextResponse.json(
      {
        message: 'Responsável excluído com sucesso!',
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message:
          'Não foi possível excluir o responsável. Tente novamente mais tarde.',
      },
      { status: 400 },
    )
  }
}
