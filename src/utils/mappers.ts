export const SelectMapper = (items: any[]) => {
  return items
    ? items.map((item) => ({
        value: item.id,
        label: item.name,
      }))
    : []
}

export const AmbulantesMapper = (ambulantes: any[]) => {
  return ambulantes
    ? ambulantes.map((ambulante) => ({
        id: ambulante.id,
        nome: ambulante.name,
        cpf: ambulante.cpf,
        email: ambulante.email,
        status: ambulante.status,
        atividade: ambulante.activityType.name,
        cep: ambulante.cep,
        place: ambulante.place,
        complement: ambulante.complement,
        number: ambulante.number,
        neighborhood: ambulante.neighborhood,
        city: ambulante.city,
        phone: ambulante.phone,
        notes: ambulante.notes,
      }))
    : []
}
