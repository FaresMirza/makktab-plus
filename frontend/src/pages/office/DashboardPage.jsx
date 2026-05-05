import { Card } from 'primereact/card'
import { Chart } from 'primereact/chart'
import { useAuth } from '../../context/AuthContext'
import DashboardLayout from '../../layouts/DashboardLayout'
import DashboardKpiCard from '../../components/office/DashboardKpiCard'
import RecentActivitiesTable from '../../components/office/RecentActivitiesTable'
import PageHeader from '../../components/common/PageHeader'
import styles from './DashboardPage.module.css'

// Mock data - same as ProjectsPage
const MOCK_PROJECTS = [
  { id: 1, name: 'Villa in North Riyadh', managerId: 2, tasks: [
    { assignedToId: 2, status: 'Completed' },
    { assignedToId: 3, status: 'Completed' },
    { assignedToId: 4, status: 'In Progress' },
    { assignedToId: 2, status: 'In Progress' },
  ]},
  { id: 2, name: 'Apartment Downtown', managerId: 3, tasks: [
    { assignedToId: 5, status: 'Completed' },
    { assignedToId: 2, status: 'In Progress' },
    { assignedToId: 3, status: 'In Progress' },
  ]},
  { id: 3, name: 'Commercial Building', managerId: 2, tasks: [
    { assignedToId: 4, status: 'Completed' },
    { assignedToId: 3, status: 'In Progress' },
    { assignedToId: 3, status: 'In Progress' },
  ]},
  { id: 4, name: 'Land Development', managerId: 3, tasks: [
    { assignedToId: 4, status: 'Completed' },
    { assignedToId: 3, status: 'Completed' },
    { assignedToId: 2, status: 'Completed' },
  ]},
]

function DashboardPage() {
  const { currentUser } = useAuth()
  const isOwner = currentUser?.role === 'office_owner'
  
  // Calculate project status based on tasks
  const getProjectStatus = (project) => {
    const allCompleted = project.tasks.every(t => t.status === 'Completed')
    return allCompleted ? 'Completed' : 'In Progress'
  }
  
  // Get projects with calculated status
  const projectsWithStatus = MOCK_PROJECTS.map(p => ({
    ...p,
    status: getProjectStatus(p)
  }))
  
  // Calculate KPI values
  const completedProjectsThisMonth = 32 // From image
  const inProgressProjects = 24 // From image
  const teamMembers = 86 // From image
  
  // For employees
  const myManagedProjects = projectsWithStatus.filter(p => p.managerId === currentUser?.id).length
  const myTasks = 11 // From image
  
  // KPI Data based on role - matching the image design
  const kpiData = isOwner ? [
    { 
      title: 'المهام الموكلة لي', 
      value: myTasks, 
      icon: 'pi pi-list', 
      iconColor: 'var(--primary-lighter)',
      unit: 'مهمة',
      variant: 'light'
    },
    { 
      title: 'المشاريع المكتملة خلال الشهر', 
      value: completedProjectsThisMonth, 
      icon: 'pi pi-chart-bar', 
      iconColor: 'var(--primary-lighter)',
      unit: '',
      variant: 'light'
    },
    { 
      title: 'مشاريع قيد التنفيذ', 
      value: inProgressProjects, 
      icon: 'pi pi-file-edit', 
      iconColor: 'var(--warning)',
      unit: 'مشروع',
      variant: 'light'
    },
    { 
      title: 'عدد الموظفين', 
      value: teamMembers, 
      icon: 'pi pi-users', 
      iconColor: 'var(--primary-lighter)',
      unit: 'موظف',
      variant: 'light'
    },
  ] : [
    { 
      title: 'المهام الموكلة لي', 
      value: myTasks, 
      icon: 'pi pi-list', 
      iconColor: 'var(--primary-lighter)',
      unit: 'مهمة',
      variant: 'light'
    },
    { 
      title: 'المشاريع الموكل بها', 
      value: myManagedProjects, 
      icon: 'pi pi-briefcase', 
      iconColor: 'var(--primary-light)',
      unit: 'مشروع',
      variant: 'light'
    },
  ]

  // Line/Area Chart Data - Projects Timeline (last 6 months)
  const projectsChartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'تطور المشاريع',
        data: [80, 90, 95, 100, 105, 108],
        fill: true,
        backgroundColor: 'rgba(127, 168, 184, 0.2)',
        borderColor: '#7fa8b8',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#7fa8b8',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  }

  const projectsChartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 70,
        max: 120,
        ticks: {
          stepSize: 10,
        },
        grid: {
          color: '#e5e7eb',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  // Doughnut Chart Data - Project Status
  const projectStatusData = {
    labels: ['مكتملة', 'قيد التنفيذ', 'متأخرة'],
    datasets: [
      {
        data: [completedProjectsThisMonth, inProgressProjects, 8],
        backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
        hoverBackgroundColor: ['#16a34a', '#d97706', '#dc2626'],
        borderWidth: 0,
      },
    ],
  }

  const projectStatusOptions = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 13,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
    },
    cutout: '65%',
  }

  // Recent Activities Data - Last 5 tasks created or completed
  // For Owner: Show all recent tasks (created or completed by anyone)
  // For Employee: Show tasks created by current user OR tasks created by current user that were completed by someone
  
  const getAllTasksWithDetails = () => {
    const tasks = []
    MOCK_PROJECTS.forEach(project => {
      project.tasks.forEach((task, index) => {
        // Mock creation and completion dates based on task status and index
        const baseDate = new Date('2026-01-13')
        const createdAt = new Date(baseDate.getTime() - (10 - index) * 24 * 60 * 60 * 1000) // Older tasks created earlier
        const completedAt = task.status === 'Completed' ? 
          new Date(baseDate.getTime() - (5 - index) * 24 * 60 * 60 * 1000) : null
        
        // Mock creator (for this example, assume tasks are created by project manager)
        const createdBy = project.managerId
        
        tasks.push({
          id: `${project.id}-${index}`,
          name: getTaskName(project.id, index),
          project: project.name,
          user: getUserName(task.assignedToId),
          status: task.status === 'Completed' ? 'مكتملة' : 'قيد التنفيذ',
          date: completedAt ? formatDate(completedAt) : formatDate(createdAt),
          createdBy,
          createdAt,
          completedAt,
          assignedToId: task.assignedToId,
          sortDate: completedAt || createdAt, // Use completion date if available, otherwise creation date
        })
      })
    })
    return tasks
  }
  
  const getTaskName = (projectId, taskIndex) => {
    const taskNames = {
      1: ['التصميم الأولي', 'الحصول على التراخيص', 'البدء بالحفر', 'صب الأساسات'],
      2: ['دراسة الموقع', 'تحديد المواصفات', 'مراجعة التصاميم'],
      3: ['التصميم المعماري', 'الهيكل الإنشائي', 'التشطيبات الداخلية'],
      4: ['تسوية الأرض', 'شبكات المياه', 'الكهرباء'],
    }
    return taskNames[projectId]?.[taskIndex] || 'مهمة'
  }
  
  const getUserName = (userId) => {
    const users = {
      2: 'أحمد محمد',
      3: 'فاطمة علي',
      4: 'محمد خالد',
      5: 'سارة أحمد',
    }
    return users[userId] || 'غير محدد'
  }
  
  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }
  
  const getRecentActivities = () => {
    const allTasks = getAllTasksWithDetails()
    
    let filteredTasks
    if (isOwner) {
      // Owner sees all tasks
      filteredTasks = allTasks
    } else {
      // Employee sees only tasks they created
      filteredTasks = allTasks.filter(task => task.createdBy === currentUser?.id)
    }
    
    // Sort by most recent activity (completion or creation date) and take last 5
    return filteredTasks
      .sort((a, b) => b.sortDate - a.sortDate)
      .slice(0, 5)
  }
  
  const recentActivities = getRecentActivities()

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <PageHeader title="لوحة المعلومات" subtitle="مرحباً بك، إليك ملخص أعمالك" />
          <div className={styles.dateInfo}>
            <i className="pi pi-calendar" />
            <span>{new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className={styles.kpiGrid}>
          {kpiData.map((kpi, index) => (
            <DashboardKpiCard
              key={index}
              title={kpi.title}
              value={kpi.value}
              unit={kpi.unit}
              icon={kpi.icon}
              iconColor={kpi.iconColor}
              variant={kpi.variant}
            />
          ))}
        </div>

        {/* Charts Row */}
        <div className={styles.chartsGrid}>
          <Card title="توزيع حالة المشروع" className={styles.chartCard}>
            <div className={styles.doughnutContainer}>
              <Chart type="doughnut" data={projectStatusData} options={projectStatusOptions} className={styles.doughnutChart} />
            </div>
          </Card>

          <Card title="تطور المشاريع" className={styles.chartCard}>
            <div className={styles.chartContainer}>
              <Chart type="line" data={projectsChartData} options={projectsChartOptions} />
            </div>
          </Card>
        </div>

        {/* Recent Activities */}
        <RecentActivitiesTable activities={recentActivities} className={styles.activityCard} />
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage
