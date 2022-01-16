import React from 'react'
import { Tooltip } from '@material-ui/core'

type Props = {
  href: string
  hint: string
}

const IconLink: React.FC<Props> = ({ children, href, hint }) => {
  return (
    <Tooltip title={hint}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-50 hover:scale-110 transition duration-300 ease-in-out"
      >
        {children}
      </a>
    </Tooltip>
  )
}

export default IconLink