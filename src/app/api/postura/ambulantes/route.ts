import { db } from '@/lib/prisma'
import { NextResponse } from 'next/server'

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
