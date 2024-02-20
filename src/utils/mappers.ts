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
        atividadeId: ambulante.activityType.id,
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

export const PermissionarioVanMapper = (permissionarios: any[]) => {
  return permissionarios
    ? permissionarios.map((permissionario) => ({
        id: permissionario.id,
        nome: permissionario.name,
        cpf: permissionario.cpf,
        email: permissionario.email,
        status: permissionario.status,
        modal: permissionario.modalType.name,
        modalId: permissionario.modalType.id,
        cep: permissionario.cep,
        place: permissionario.place,
        complement: permissionario.complement,
        number: permissionario.number,
        neighborhood: permissionario.neighborhood,
        city: permissionario.city,
        phone: permissionario.phone,
        notes: permissionario.notes,
      }))
    : []
}
