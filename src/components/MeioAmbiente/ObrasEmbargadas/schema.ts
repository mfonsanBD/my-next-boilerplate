import { z } from 'zod'

export const permissionarios = z.object({
  id: z.string(),
  nome: z.string(),
  cpf: z.string(),
  email: z.string(),
  status: z.string(),
  modal: z.string(),
  modalId: z.string(),
  cep: z.string().nullable(),
  place: z.string().nullable(),
  complement: z.string().nullable(),
  number: z.string().nullable(),
  neighborhood: z.string().nullable(),
  city: z.string().nullable(),
  phone: z.string().nullable(),
  notes: z.string().nullable(),
})

export type Permissionarios = z.infer<typeof permissionarios>
