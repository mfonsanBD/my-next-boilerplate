import { format } from 'date-fns'

export default function Footer() {
  const initialYear: string = '2024'
  const currentYear = format(new Date(), 'yyyy')

  let period: string

  if (currentYear > initialYear) {
    period = `${initialYear} - ${currentYear}`
  } else {
    period = initialYear
  }

  return (
    <div className="bg-blue-900">
      <div className="mx-auto max-w-7xl py-4 px-2 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-2 items-center justify-between text-white font-medium">
        <small className="capitalize leading-3">
          Copyright &copy; {period} - AFISCAB
        </small>

        <small className="capitalize leading-3">
          versão: {process.env.NEXT_APP_VERSION}
        </small>
      </div>
    </div>
  )
}
