import { db } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const iptus = await db.iPTU.findMany()
  return NextResponse.json({ iptus }, { status: 200 })
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  try {
    const iptus = await db.iPTU.create({
      data,
    })

    return NextResponse.json(
      {
        iptus,
        message: 'Imóvel cadastrado com sucesso!',
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message:
          'Não foi possível adicionar o imóvel. Tente novamente mais tarde.',
      },
      { status: 400 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  const data = await request.json()

  try {
    await db.iPTU.update({
      where: {
        id: data.id,
      },
      data,
    })

    return NextResponse.json(
      {
        message: 'Imóvel atualizado com sucesso!',
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message:
          'Não foi possível atualizar o imóvel. Tente novamente mais tarde.',
      },
      { status: 400 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json()

  try {
    await db.iPTU.delete({
      where: {
        id,
      },
    })

    return NextResponse.json(
      {
        message: 'Imóvel excluído com sucesso!',
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message:
          'Não foi possível excluir o imóvel. Tente novamente mais tarde.',
      },
      { status: 400 },
    )
  }
}
