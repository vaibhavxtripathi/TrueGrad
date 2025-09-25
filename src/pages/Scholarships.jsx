import ProfileDashboardTemplate from '../components/ProfileDashboardTemplate'
import { getRoleDashboardData } from '../services/MockServer'

const Scholarships = () => {
  const data = getRoleDashboardData('scholarships')
  return <ProfileDashboardTemplate title="Scholarships Dashboard" data={data} />
}

export default Scholarships


