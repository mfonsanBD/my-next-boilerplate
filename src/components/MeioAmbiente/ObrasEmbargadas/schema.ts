import { z } from 'zod'

export const embargoedWorks = z.object({
  id: z.string(),
  numero: z.string(),
  file: z.string(),
  responsavel: z.string(),
  responsavelId: z.string(),
  telefone: z.string(),
  cep: z.string().nullable(),
  place: z.string().nullable(),
  complement: z.string().nullable(),
  number: z.string().nullable(),
  neighborhood: z.string().nullable(),
  city: z.string().nullable(),
})

export type EmbargoedWorks = z.infer<typeof embargoedWorks>
