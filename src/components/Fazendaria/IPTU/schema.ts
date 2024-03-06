import { z } from 'zod'

export const iptu = z.object({
  id: z.string(),
  razaoSocial: z.string(),
  nomeEmpresarial: z.string(),
  cnpj: z.string(),
  email: z.string(),
  telefone: z.string(),
  cep: z.string().nullable(),
  place: z.string().nullable(),
  complement: z.string().nullable(),
  number: z.string().nullable(),
  neighborhood: z.string().nullable(),
  city: z.string().nullable(),
})

export type IPTU = z.infer<typeof iptu>
