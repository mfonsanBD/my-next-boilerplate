/* eslint-disable no-unused-vars */
import { db } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const inProgress = await db.worksInProgress.findMany({
    include: {
      constructionManager: true,
    },
  })
  return NextResponse.json({ inProgress }, { status: 200 })
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  try {
    await db.worksInProgress.create({
      data,
    })

    return NextResponse.json(
      {
        message: 'Obra cadastrada com sucesso!',
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message:
          'Não foi possível adicionar a obra. Tente novamente mais tarde.',
      },
      { status: 400 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  const data = await request.json()

  try {
    const work = await db.worksInProgress.findFirst({
      where: {
        id: data.id,
      },
    })

    let noticeFile: string

    if (data.infractionNoticeFile === '') {
      noticeFile = work?.infractionNoticeFile as string
    } else {
      noticeFile = data.infractionNoticeFile
    }

    let intimationFile: string

    if (data.intimationFile === '') {
      intimationFile = work?.intimationFile as string
    } else {
      intimationFile = data.intimationFile
    }

    const {
      infractionNoticeFile: noInfractionNoticeFile,
      intimationFile: noIntimationFile,
      id: noId,
      ...rest
    } = data

    const allData = {
      ...rest,
      infractionNoticeFile: noticeFile,
      intimationFile: intimationFile,
    }

    await db.worksInProgress.update({
      where: {
        id: data.id,
      },
      data: allData,
    })

    return NextResponse.json(
      {
        message: 'Obra atualizada com sucesso!',
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message:
          'Não foi possível atualizar a obra. Tente novamente mais tarde.',
      },
      { status: 400 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json()

  try {
    await db.worksInProgress.delete({
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
