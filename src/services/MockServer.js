import patterns from '../sample-data/regionPatterns.json'
import records from '../sample-data/sample-verifications.json'

export function getRoleDashboardData(role) {
  const total = records.length
  const valid = records.filter(r => r.status === 'valid').length
  const fake = records.filter(r => r.status === 'fake').length
  const pending = total - valid - fake

  const pie = [
    { name: 'Valid', value: valid, color: '#22c55e' },
    { name: 'Fake', value: fake, color: '#ef4444' },
  ]

  const byDateMap = {}
  records.forEach(r => {
    byDateMap[r.date] ||= { date: r.date, valid: 0, fake: 0 }
    byDateMap[r.date][r.status === 'valid' ? 'valid' : 'fake'] += 1
  })
  const line = Object.values(byDateMap).sort((a,b)=>a.date.localeCompare(b.date))

  const byInstitutionMap = {}
  records.forEach(r => {
    byInstitutionMap[r.institution] ||= { institution: r.institution, valid: 0, fake: 0 }
    byInstitutionMap[r.institution][r.status === 'valid' ? 'valid' : 'fake'] += 1
  })
  const bars = Object.values(byInstitutionMap)

  return {
    totals: { total, valid, fake, pending },
    graph: { pie, line, bars },
    history: records.slice(0, 12),
    patternsMeta: { institutions: patterns.institutions.length }
  }
}

export default { getRoleDashboardData }


