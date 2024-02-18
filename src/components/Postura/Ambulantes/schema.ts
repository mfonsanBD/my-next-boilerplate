import { z } from 'zod'

export const ambulantes = z.object({
  id: z.string(),
  nome: z.string(),
  cpf: z.string(),
  email: z.string(),
  status: z.string(),
  atividade: z.string(),
  cep: z.string().nullable(),
  place: z.string().nullable(),
  complement: z.string().nullable(),
  number: z.string().nullable(),
  neighborhood: z.string().nullable(),
  city: z.string().nullable(),
  phone: z.string().nullable(),
  notes: z.string().nullable(),
})

export type Ambulantes = z.infer<typeof ambulantes>
