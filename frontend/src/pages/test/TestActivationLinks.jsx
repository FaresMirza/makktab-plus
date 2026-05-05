import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Divider } from 'primereact/divider'
import { useNavigate } from 'react-router-dom'

/**
 * Test Activation Links Page
 * للاختبار فقط - توليد روابط تفعيل للموظفين
 */
function TestActivationLinks() {
  const navigate = useNavigate()

  // بيانات موظفين وهمية للاختبار
  const employees = [
    { id: 1, name: 'أحمد محمد العلي', phone: '0501234567', email: 'ahmad@example.com' },
    { id: 2, name: 'سارة علي الأحمد', phone: '0559876543', email: 'sara@example.com' },
    { id: 3, name: 'محمد خالد السعيد', phone: '0551122334', email: 'mohammad@example.com' },
  ]

  /**
   * توليد رابط تفعيل لموظف
   */
  const generateLink = (employeeId) => {
    const timestamp = new Date().getTime()
    const token = `test_token_${employeeId}_${timestamp}`
    return `${window.location.origin}/activate?token=${token}`
  }

  /**
   * فتح رابط التفعيل في نافذة جديدة
   */
  const openActivationLink = (employeeId) => {
    const link = generateLink(employeeId)
    window.open(link, '_blank')
  }

  /**
   * نسخ الرابط إلى الحافظة
   */
  const copyToClipboard = (employeeId) => {
    const link = generateLink(employeeId)
    navigator.clipboard.writeText(link).then(() => {
      alert('تم نسخ الرابط!')
    })
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <Button
          icon="pi pi-arrow-right"
          label="العودة"
          text
          onClick={() => navigate('/login')}
          style={styles.backButton}
        />
        <h1 style={styles.title}>روابط تفعيل الموظفين - للاختبار</h1>
      </div>

      {/* Info Card */}
      <Card style={styles.infoCard}>
        <div style={styles.infoHeader}>
          <i className="pi pi-info-circle" style={{ fontSize: '24px', color: '#3b82f6' }} />
          <h3 style={styles.infoTitle}>معلومات الاختبار</h3>
        </div>
        
        <Divider />
        
        <div style={styles.infoContent}>
          <div style={styles.infoItem}>
            <i className="pi pi-mobile" style={styles.icon} />
            <span><strong>رمز OTP للاختبار:</strong> <code style={styles.code}>1234</code></span>
          </div>
          
          <div style={styles.infoItem}>
            <i className="pi pi-phone" style={styles.icon} />
            <span><strong>رقم الجوال:</strong> أي رقم سعودي صحيح (05xxxxxxxx)</span>
          </div>
          
          <div style={styles.infoItem}>
            <i className="pi pi-lock" style={styles.icon} />
            <span><strong>كلمة المرور:</strong> 8 أحرف على الأقل</span>
          </div>
          
          <div style={styles.infoItem}>
            <i className="pi pi-exclamation-triangle" style={styles.icon} />
            <span><strong>المحاولات:</strong> 3 محاولات لإدخال OTP</span>
          </div>
        </div>
      </Card>

      {/* Employees List */}
      <div style={styles.employeesContainer}>
        <h2 style={styles.sectionTitle}>
          <i className="pi pi-users" style={{ marginLeft: '8px' }} />
          قائمة الموظفين
        </h2>

        {employees.map((emp) => (
          <Card key={emp.id} style={styles.employeeCard}>
            <div style={styles.employeeHeader}>
              <div style={styles.employeeAvatar}>
                <i className="pi pi-user" style={{ fontSize: '24px', color: '#fff' }} />
              </div>
              
              <div style={styles.employeeInfo}>
                <h3 style={styles.employeeName}>{emp.name}</h3>
                <div style={styles.employeeDetails}>
                  <span style={styles.detailItem}>
                    <i className="pi pi-phone" style={{ marginLeft: '4px', fontSize: '12px' }} />
                    {emp.phone}
                  </span>
                  <span style={styles.detailItem}>
                    <i className="pi pi-envelope" style={{ marginLeft: '4px', fontSize: '12px' }} />
                    {emp.email}
                  </span>
                </div>
              </div>
            </div>

            <Divider />

            {/* Actions */}
            <div style={styles.actions}>
              <Button
                label="فتح رابط التفعيل"
                icon="pi pi-external-link"
                onClick={() => openActivationLink(emp.id)}
                style={styles.primaryButton}
              />
              
              <Button
                label="نسخ الرابط"
                icon="pi pi-copy"
                outlined
                onClick={() => copyToClipboard(emp.id)}
                style={styles.secondaryButton}
              />
            </div>

            {/* Link Display */}
            <div style={styles.linkDisplay}>
              <small style={styles.linkLabel}>الرابط:</small>
              <code style={styles.linkCode}>{generateLink(emp.id)}</code>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.warningText}>
          <i className="pi pi-exclamation-circle" style={{ marginLeft: '6px' }} />
          ⚠️ هذه الصفحة للاختبار فقط ولن تظهر في الإنتاج
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
    direction: 'rtl',
  },
  header: {
    maxWidth: '900px',
    margin: '0 auto 30px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  backButton: {
    color: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: '28px',
    fontWeight: '700',
    margin: 0,
    textAlign: 'right',
  },
  infoCard: {
    maxWidth: '900px',
    margin: '0 auto 30px',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  infoHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  infoTitle: {
    margin: 0,
    color: '#1e293b',
    fontSize: '20px',
    fontWeight: '600',
  },
  infoContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#475569',
  },
  icon: {
    color: '#3b82f6',
    fontSize: '16px',
  },
  code: {
    background: '#f1f5f9',
    padding: '4px 12px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '16px',
    fontWeight: '600',
    color: '#dc2626',
  },
  employeesContainer: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: '22px',
    fontWeight: '600',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  employeeCard: {
    marginBottom: '20px',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  employeeHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  employeeAvatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    margin: '0 0 8px 0',
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
  },
  employeeDetails: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
  detailItem: {
    fontSize: '13px',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  primaryButton: {
    flex: 1,
    minWidth: '200px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
  },
  secondaryButton: {
    flex: 1,
    minWidth: '150px',
  },
  linkDisplay: {
    marginTop: '15px',
    padding: '12px',
    background: '#f8fafc',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
  },
  linkLabel: {
    display: 'block',
    color: '#64748b',
    fontSize: '11px',
    marginBottom: '6px',
    fontWeight: '500',
  },
  linkCode: {
    display: 'block',
    fontFamily: 'monospace',
    fontSize: '12px',
    color: '#475569',
    wordBreak: 'break-all',
    lineHeight: 1.5,
  },
  footer: {
    maxWidth: '900px',
    margin: '40px auto 0',
    textAlign: 'center',
  },
  warningText: {
    color: '#fef3c7',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
}

export default TestActivationLinks
