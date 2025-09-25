import ProfileDashboardTemplate from '../components/ProfileDashboardTemplate'
import { getRoleDashboardData } from '../services/MockServer'

const Employer = () => {
  const data = getRoleDashboardData('employer')
  return <ProfileDashboardTemplate title="Employer Dashboard" data={data} />
}

export default Employer


