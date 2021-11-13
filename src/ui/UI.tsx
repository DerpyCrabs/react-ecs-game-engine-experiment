import React from 'react'
import { UIProps } from '../types'
import Panel from './Panel'

function UI(props: UIProps) {
  return (
    <>
      <Panel {...props} />
    </>
  )
}
export default React.memo(UI)
