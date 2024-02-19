import { db } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const modalTypes = await db.vanLicenseeModalType.findMany({
    orderBy: {
      name: 'asc',
    },
  })
  return NextResponse.json(
    {
      modalTypes,
    },
    { status: 200 },
  )
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  try {
    const modalType = await db.vanLicenseeModalType.create({
      data,
    })

    return NextResponse.json(
      {
        message: 'Tipo de modal criada com sucesso!',
        modalType,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Não foi possível inserir o Tipo de modal!',
      },
      { status: 400 },
    )
  }
}
