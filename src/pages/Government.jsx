import ProfileDashboardTemplate from '../components/ProfileDashboardTemplate'
import { getRoleDashboardData } from '../services/MockServer'

const Government = () => {
  const data = getRoleDashboardData('government')
  return <ProfileDashboardTemplate title="Government Dashboard" data={data} showBlacklist />
}

export default Government


