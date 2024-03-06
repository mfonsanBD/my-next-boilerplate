import { db } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const embargoedWorks = await db.embargoedWorks.findMany({
    include: {
      constructionManager: true,
    },
  })
  return NextResponse.json({ embargoedWorks }, { status: 200 })
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  try {
    await db.embargoedWorks.create({
      data,
    })

    return NextResponse.json(
      {
        message: 'Obra cadastrada com sucesso!',
      },
      { status: 201 },
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        message:
          'Não foi possível adicionar a obra. Tente novamente mais tarde.',
      },
      { status: 400 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json()

  try {
    await db.embargoedWorks.delete({
      where: {
        id,
      },
    })

    return NextResponse.json(
      {
        message: 'Obra excluída com sucesso!',
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Não foi possível excluir a obra. Tente novamente mais tarde.',
      },
      { status: 400 },
    )
  }
}
