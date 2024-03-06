import { z } from 'zod'

export const workinprogress = z.object({
  id: z.string(),
  numeroAutoInfracao: z.string(),
  fileAutoInfracao: z.string(),
  numeroIntimacao: z.string(),
  fileIntimacao: z.string(),
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

export type WorkInProgress = z.infer<typeof workinprogress>
