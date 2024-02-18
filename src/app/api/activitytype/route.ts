import { db } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const activityTypes = await db.streetVendorActivityType.findMany({
    orderBy: {
      name: 'asc',
    },
  })
  return NextResponse.json(
    {
      activityTypes,
    },
    { status: 200 },
  )
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  try {
    const activityType = await db.streetVendorActivityType.create({
      data,
    })

    return NextResponse.json(
      {
        message: 'Tipo de atividade criada com sucesso!',
        activityType,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Não foi possível inserir o Tipo de atividade!',
      },
      { status: 400 },
    )
  }
}
