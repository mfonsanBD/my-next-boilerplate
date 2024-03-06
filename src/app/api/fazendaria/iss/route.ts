import { db } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const iss = await db.iSS.findMany()
  return NextResponse.json({ iss }, { status: 200 })
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  try {
    const iss = await db.iSS.create({
      data,
    })

    return NextResponse.json(
      {
        iss,
        message: 'Empresa cadastrada com sucesso!',
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message:
          'Não foi possível adicionar a empresa. Tente novamente mais tarde.',
      },
      { status: 400 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  const data = await request.json()

  try {
    await db.iSS.update({
      where: {
        id: data.id,
      },
      data,
    })

    return NextResponse.json(
      {
        message: 'Empresa atualizada com sucesso!',
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message:
          'Não foi possível atualizar a empresa. Tente novamente mais tarde.',
      },
      { status: 400 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json()

  try {
    await db.iSS.delete({
      where: {
        id,
      },
    })

    return NextResponse.json(
      {
        message: 'Empresa excluída com sucesso!',
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message:
          'Não foi possível excluir a empresa. Tente novamente mais tarde.',
      },
      { status: 400 },
    )
  }
}
