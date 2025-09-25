export const mockStats = {
    total: 1400,
    valid: 1247,
    fake: 153,
    activeAlerts: 24
  };
  
  export const mockAlerts = [
    {
      id: 'CERT-2024-001',
      institution: 'Fake University',
      student: 'John Doe',
      status: 'Flagged',
      severity: 'high'
    },
    {
      id: 'CERT-2024-002',
      institution: 'Doubtful College',
      student: 'Jane Smith',
      status: 'Fake',
      severity: 'critical'
    },
    {
      id: 'CERT-2024-003',
      institution: 'Questionable Institute',
      student: 'Bob Johnson',
      status: 'Flagged',
      severity: 'medium'
    }
  ];
  
  export const mockBlacklist = [
    {
      institution: 'Fake University',
      location: 'Unknown',
      addedDate: '2024-01-10',
      reason: 'Multiple fake certificates detected',
      status: 'Active'
    },
    {
      institution: 'Doubtful College',
      location: 'Unknown',
      addedDate: '2024-01-08',
      reason: 'Invalid accreditation',
      status: 'Active'
    }
  ];
  
  export const mockBulkResults = [
    {
      id: 'CERT-001',
      fileName: 'certificate1.pdf',
      studentName: 'John Doe',
      institution: 'University of Technology',
      status: 'valid',
      confidence: 98,
      details: 'All security markers verified'
    },
    {
      id: 'CERT-002',
      fileName: 'certificate2.pdf',
      studentName: 'Jane Smith',
      institution: 'Fake University',
      status: 'fake',
      confidence: 12,
      details: 'Digital signature mismatch'
    },
    {
      id: 'CERT-003',
      fileName: 'certificate3.png',
      studentName: 'Bob Johnson',
      institution: 'State College',
      status: 'valid',
      confidence: 95,
      details: 'QR code verified successfully'
    }
  ];