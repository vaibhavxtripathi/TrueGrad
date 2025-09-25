import StatsCard from './StatsCard'
import AlertsTable from './AlertsTable'
import BlacklistTable from './BlacklistTable'
import HistoryTable from './HistoryTable'
import VerificationGraph from './VerificationGraph'
import ExportButtons from './ExportButtons'
import { Activity, CheckCircle, XCircle, Clock } from 'lucide-react'

const ProfileDashboardTemplate = ({ title, showBlacklist = false, data }) => {
  const stats = [
    { title: 'Total', value: data.totals.total, icon: Activity, color: 'primary' },
    { title: 'Valid', value: data.totals.valid, icon: CheckCircle, color: 'success' },
    { title: 'Fake', value: data.totals.fake, icon: XCircle, color: 'error' },
    { title: 'Pending', value: data.totals.pending, icon: Clock, color: 'gray' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600">History, bulk uploads, alerts, and exports</p>
          </div>
          <ExportButtons />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((s, i) => (
            <StatsCard key={s.title} {...s} delay={i * 0.05} />
          ))}
        </div>

        <VerificationGraph pie={data.graph.pie} line={data.graph.line} bars={data.graph.bars} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
          <HistoryTable records={data.history} />
          <AlertsTable />
        </div>

        {showBlacklist && (
          <div className="mt-8">
            <BlacklistTable />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileDashboardTemplate


