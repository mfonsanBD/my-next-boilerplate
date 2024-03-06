import { z } from 'zod'

export const responsaveis = z.object({
  id: z.string(),
  nome: z.string(),
  documento: z.string(),
  email: z.string(),
  telefone: z.string(),
  place: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  cep: z.string().optional(),
})

export type Responsaveis = z.infer<typeof responsaveis>
