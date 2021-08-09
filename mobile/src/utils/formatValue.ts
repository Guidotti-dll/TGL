export const formatDate = (value: string) => {
  const date = value.slice(0, 11).split('-')

  return date.reverse().join('/')
}

export const formatMoney = (value: number) => {
  return `R$ ${value.toFixed(2).toString().replace('.', ',')}`
}
