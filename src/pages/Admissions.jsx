import ProfileDashboardTemplate from '../components/ProfileDashboardTemplate'
import { getRoleDashboardData } from '../services/MockServer'

const Admissions = () => {
  const data = getRoleDashboardData('admissions')
  return <ProfileDashboardTemplate title="Admissions Dashboard" data={data} />
}

export default Admissions


