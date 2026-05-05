import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import styles from './LogsFilterBar.module.css'

/**
 * Logs Filter Bar
 * Search and filter controls for security logs
 */
const LogsFilterBar = ({
  globalFilter,
  onGlobalChange,
  dateFilter,
  onDateChange,
  actionFilter,
  onActionChange,
  actionOptions,
  sortOrder,
  onSortChange,
  sortOptions,
  onClearFilters,
}) => {
  return (
    <div className={styles.filterGrid}>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilter}
          onChange={(e) => onGlobalChange(e.target.value)}
          placeholder="بحث شامل..."
          style={{ width: '100%' }}
        />
      </span>

      <Calendar
        value={dateFilter}
        onChange={(e) => onDateChange(e.value)}
        placeholder="تصفية بالتاريخ"
        dateFormat="yy-mm-dd"
        selectionMode="range"
        showIcon
        style={{ width: '100%' }}
      />

      <Dropdown
        value={actionFilter}
        options={actionOptions}
        onChange={(e) => onActionChange(e.value)}
        placeholder="نوع الإجراء"
        showClear
        style={{ width: '100%' }}
      />

      <Dropdown
        value={sortOrder}
        options={sortOptions}
        onChange={(e) => onSortChange(e.value)}
        placeholder="ترتيب حسب التاريخ"
        style={{ width: '100%' }}
      />

      <Button
        type="button"
        icon="pi pi-filter-slash"
        label="إعادة تعيين"
        outlined
        severity="secondary"
        onClick={onClearFilters}
        style={{ width: '100%', justifyContent: 'center' }}
      />
    </div>
  )
}

export default LogsFilterBar
