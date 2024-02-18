'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/prisma'

interface ErrorProps {
  message: string
}

export async function AddAmbulante(data: any) {
  let errors: ErrorProps[] = []

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

  let ambulante: any = null
  if (!existsCPF && !existsEmail) {
    ambulante = await db.streetVendor.create({
      data,
    })

    revalidatePath('/postura/ambulantes')
  }
  return { ambulante, errors }
}
