export const SelectMapper = (items: any[]) => {
  return items
    ? items.map((item) => ({
        value: item.id,
        label: item.name,
      }))
    : []
}
