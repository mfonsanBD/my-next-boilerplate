export default function Footer() {
  return (
    <div className="bg-blue-900">
      <div className="mx-auto max-w-7xl py-4 px-2 sm:px-6 lg:px-8 flex items-center justify-between text-white font-medium">
        <small className="capitalize leading-3">
          Copyright © 2024 - AFISCAB
        </small>
        <small className="capitalize leading-3">
          versão: {process.env.NEXT_APP_VERSION}
        </small>
      </div>
    </div>
  )
}
