import patterns from '../sample-data/regionPatterns.json'
import samples from '../sample-data/sample-verifications.json'

function computeChecksumMock(source = '') {
  let sum = 0
  const str = String(source || '')
  for (let i = 0; i < str.length; i++) sum = (sum + str.charCodeAt(i)) % 100000
  return `chk_${sum % 997}`
}

function safeMono(str) {
  return typeof str === 'string' ? str : ''
}

function buildMockExtraction({ file, ocr }) {
  const base = ocr || {}
  const certificateId = base.certificateId || base.cert_id || 'UT-2024-001234'
  const studentName = base.studentName || base.name || 'John Doe'
  const institution = base.institution || 'University of Technology'
  const degree = base.degree || base.program || 'B.Tech Computer Science'
  const graduationDate = base.graduationDate || base.year || '2024-05-15'
  const issueDate = base.issue_date || '2024-06-01'
  const dob = base.dob || '2000-01-01'
  const gpa = base.gpa || '3.8'
  const honors = base.honors || 'Magna Cum Laude'

  const qr_payload = `${certificateId}|${institution}|${studentName}`
  const embedded_hash = `hash_${certificateId.replace(/[^A-Za-z0-9]/g, '').slice(-6)}`
  const file_checksum = computeChecksumMock(file?.name || certificateId)

  // Mock visual/signature hashes
  const photo_hash = base.photo_hash || `ph_${certificateId.slice(-3)}`
  const seal_signature = base.seal_signature || `sig_${certificateId.slice(0,2)}`

  return {
    studentName,
    dob,
    program: degree,
    year: String(graduationDate).slice(0,4),
    degree,
    graduationDate,
    certificateId,
    issueDate,
    institution,
    gpa,
    honors,
    photo_hash,
    embedded_hash,
    qr_payload,
    file_checksum,
    seal_signature,
  }
}

export async function runVerification({ file, ocr }) {
  // 1) Extract
  const extracted = buildMockExtraction({ file, ocr })

  const flags = []

  // 2) Pattern & credential validation
  const idRegex = new RegExp(patterns.certificateIdRegex)
  if (!idRegex.test(safeMono(extracted.certificateId))) {
    flags.push({ code: 'INVALID_NUM', message: 'Invalid certificate number' })
  }

  const institution = patterns.institutions.find(i => i.name === extracted.institution)
  if (!institution) {
    flags.push({ code: 'NO_INSTITUTION', message: 'Non-existent institution' })
  }
  const courseOk = patterns.courses.includes(extracted.degree) || patterns.courses.includes(extracted.program)
  if (!courseOk) {
    flags.push({ code: 'NO_COURSE', message: 'Non-existent course' })
  }

  // 3) Metadata & QR/hash/signature checks
  const qrParts = safeMono(extracted.qr_payload).split('|')
  const qrCertId = qrParts[0]
  const qrInstitution = qrParts[1]
  const qrStudent = qrParts[2]

  if (qrCertId !== extracted.certificateId || qrInstitution !== extracted.institution || qrStudent !== extracted.studentName) {
    flags.push({ code: 'QR_MISMATCH', message: 'QR payload mismatch' })
  }

  if (!new RegExp(patterns.hashFormat).test(safeMono(extracted.embedded_hash))) {
    flags.push({ code: 'HASH_INVALID', message: 'Invalid embedded hash format' })
  }

  // Simulate metadata mismatch if DOB year does not align with year/graduation heuristics
  const gradYear = Number(String(extracted.graduationDate).slice(0,4))
  const dobYear = Number(String(extracted.dob).slice(0,4))
  if (gradYear - dobYear < 18) {
    flags.push({ code: 'META_MISMATCH', message: 'Metadata mismatch' })
  }

  // 4) Visual/anomaly checks (mock heuristics)
  const expectedPhotoPrefix = `ph_`
  if (!safeMono(extracted.photo_hash).startsWith(expectedPhotoPrefix)) {
    flags.push({ code: 'TAMPERED_PHOTO', message: 'Tampered photo' })
  }
  const expectedSigPrefix = `sig_`
  if (!safeMono(extracted.seal_signature).startsWith(expectedSigPrefix)) {
    flags.push({ code: 'FORGED_SEAL', message: 'Forged seal or signature' })
  }

  // 5) Duplicate or cloned documents
  const duplicate = samples.find(s => s.file_checksum === extracted.file_checksum)
  if (duplicate) {
    flags.push({ code: 'DUPLICATE', message: 'Duplicate / Cloned document' })
  }

  // Scoring
  const baseScore = 95
  const penalties = {
    INVALID_NUM: 25,
    NO_INSTITUTION: 20,
    NO_COURSE: 12,
    QR_MISMATCH: 20,
    HASH_INVALID: 15,
    META_MISMATCH: 10,
    TAMPERED_PHOTO: 12,
    FORGED_SEAL: 18,
    DUPLICATE: 22,
  }
  let penalty = 0
  flags.forEach(f => { penalty += (penalties[f.code] || 8) })
  const score = Math.max(0, baseScore - penalty)
  const isValid = flags.length === 0
  const status = isValid ? 'valid' : 'fake'

  return {
    isValid,
    status,
    score,
    flags,
    ocrDetails: {
      studentName: extracted.studentName,
      institution: extracted.institution,
      degree: extracted.degree,
      graduationDate: extracted.graduationDate,
      certificateId: extracted.certificateId,
      gpa: extracted.gpa,
      honors: extracted.honors,
    }
  }
}

export default { runVerification }


