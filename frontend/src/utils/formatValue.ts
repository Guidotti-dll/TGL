export const formatDate = (value: string) => {
  return new Date(value).toLocaleDateString()
}

export const formatMoney = (value: number) => {
  return value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })
}
