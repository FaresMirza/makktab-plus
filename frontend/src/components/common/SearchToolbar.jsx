import { InputText } from 'primereact/inputtext'
import styles from './SearchToolbar.module.css'

/**
 * Search Toolbar Component
 * Simple search input with icon
 */
const SearchToolbar = ({ value, onChange, placeholder = 'بحث...' }) => {
  return (
    <span className="p-input-icon-left">
      <i className="pi pi-search" />
      <InputText
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.searchInput}
      />
    </span>
  )
}

export default SearchToolbar
