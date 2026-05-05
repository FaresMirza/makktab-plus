import PropTypes from 'prop-types'
import { DataTable } from 'primereact/datatable'
import { Card } from 'primereact/card'
import { Tag } from 'primereact/tag'
import RTLColumn from '../common/RTLColumn'
import styles from './RecentActivitiesTable.module.css'

function RecentActivitiesTable({ activities, className }) {
  const statusBodyTemplate = (rowData) => {
    const severityMap = {
      'مكتملة': 'success',
      'قيد التنفيذ': 'warning',
    }
    return <Tag value={rowData.status} severity={severityMap[rowData.status]} />
  }

  return (
    <Card title="النشاطات الأخيرة" className={className}>
      <DataTable value={activities} size="small">
        <RTLColumn field="name" header="المهمة" style={{ minWidth: '200px' }} />
        <RTLColumn field="project" header="المشروع" style={{ minWidth: '180px' }} />
        <RTLColumn field="user" header="المسؤول" style={{ minWidth: '150px' }} />
        <RTLColumn field="date" header="التاريخ" style={{ minWidth: '120px' }} />
        <RTLColumn header="الحالة" body={statusBodyTemplate} style={{ minWidth: '120px' }} />
      </DataTable>
    </Card>
  )
}

RecentActivitiesTable.propTypes = {
  activities: PropTypes.array.isRequired,
  className: PropTypes.string,
}

export default RecentActivitiesTable
