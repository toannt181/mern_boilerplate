import format from 'date-fns/format'

export function formatDate(value) {
  return value ? format(new Date(value), 'hh:mm dd/MM/yyyy') : ''
}