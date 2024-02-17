'use client'

import { useMediaQuery } from 'react-responsive'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Logo from '../Logo'

interface AuthProps {
  children: React.ReactNode
}

export default function AuthBase({ children }: AuthProps) {
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  })

  const toastStyle = {
    width: isMobile ? '80%' : '30%',
  }

  return (
    <div className="w-full h-screen px-6 py-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center">
      {children}

      <div className="w-full h-full bg-gradient-to-r from-blue-900 to-blue-950 rounded-3xl items-center justify-center hidden md:flex">
        <div className="w-[500px] relative flex items-center justify-center">
          <Logo size="3xl" />
          <div className="w-full h-28 absolute -bottom-20 bg-gradient-to-r from-blue-900/60 to-blue-950/60 border border-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center uppercase font-extrabold text-3xl text-white">
            Associação dos fiscais
            <br />
            de Armação dos Búzios
          </div>
        </div>
      </div>

      <div className="w-full absolute bottom-0">
        <ToastContainer
          pauseOnFocusLoss={false}
          draggable
          stacked
          position="bottom-center"
          style={toastStyle}
          toastStyle={{ fontFamily: 'Poppins' }}
        />
      </div>
    </div>
  )
}
