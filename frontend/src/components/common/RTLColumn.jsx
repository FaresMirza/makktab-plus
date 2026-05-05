import { Column } from 'primereact/column'

/**
 * RTL Column Component
 * Column wrapper that applies RTL styles automatically
 */
const RTLColumn = ({ style, headerStyle, bodyStyle, ...otherProps }) => {
  return (
    <Column
      {...otherProps}
      style={{ textAlign: 'right', ...style }}
      headerStyle={{ textAlign: 'right', ...headerStyle }}
      bodyStyle={{ textAlign: 'right', ...bodyStyle }}
    />
  )
}

export default RTLColumn
