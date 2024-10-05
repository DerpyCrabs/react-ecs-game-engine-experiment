import { UIProps } from '../types'
import Panel from './Panel'

export default function UI(props: UIProps) {
  return (
    <>
      <Panel {...props} />
    </>
  )
}
