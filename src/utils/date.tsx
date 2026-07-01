import moment from 'moment'

export const convertYearMonthDay = (date: string) => {
  return moment(date).utc().format('YYYY-MM-DD')
}

export const formatDate = (dateString: Date) => {
  const date = new Date(dateString)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}-${month}-${year}`
}

export const formatDateVN = (date: Date | string | undefined): string => {
  if (!date) return ''
  return new Intl.DateTimeFormat('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date))
}
