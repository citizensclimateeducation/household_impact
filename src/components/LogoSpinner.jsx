import React from 'react'

export const LogoSpinner = () => {
  return (
    <svg id="logo_image" xmlns="http//www.w3.org/2000/svg">
      <symbol id="logo_wait" viewBox="0 0 100 100">
        <g>
          <circle className='green_circle' cx='50' cy='50' r='45' strokeDasharray='141.37'>
              <animate
                attributeName="stroke-dashoffset"
                from="-35.34"
                to="-318.0834"
                dur="6s"
                repeatCount="indefinite" />
          </circle>
          <circle className='blue_circle' cx='50' cy='50' r='30' strokeDasharray='94.248'/>
          <polyline className='letter' points='41,31 41,59 69,59' />
        </g>
      </symbol>
    </svg>
  )
}
