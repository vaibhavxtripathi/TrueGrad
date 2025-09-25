const ExportButtons = () => {
  const handleExport = (type) => {
    // Mock export
    alert(`Exported ${type} (mock)`) // eslint-disable-line no-alert
  }
  return (
    <div className="flex gap-2">
      <button onClick={() => handleExport('CSV')} className="btn-secondary">Export CSV</button>
      <button onClick={() => handleExport('Excel')} className="btn-secondary">Export Excel</button>
    </div>
  )
}

export default ExportButtons


