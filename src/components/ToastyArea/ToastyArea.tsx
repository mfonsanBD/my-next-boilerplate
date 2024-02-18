'use client'

import { useMediaQuery } from 'react-responsive'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ToastyArea() {
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  })

  return (
    <div className="absolute">
      <ToastContainer
        position="bottom-center"
        style={{
          width: isMobile ? '80%' : '30%',
          zIndex: 90,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        toastStyle={{ fontFamily: 'Poppins' }}
        closeOnClick
      />
    </div>
  )
}
