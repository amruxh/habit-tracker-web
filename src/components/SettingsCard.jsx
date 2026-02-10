const SettingsCard = ({ title, description, children }) => {
  return (
    <div className="retro-border bg-card-base p-6 flex items-center justify-between">
        <div>
          <h2>{title}</h2>
          <p className="text-sm text-text-base/60">{description}</p>
        </div>

        {children}
      </div>
  )
}

export default SettingsCard