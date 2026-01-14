import { useState } from 'react'

function App() {
  const [showTable, setShowTable] = useState(false)
  const [configData, setConfigData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleButtonClick = async () => {
    if (!showTable) {
      setLoading(true)
      setError(null)
      try {
        // Fetch from Firebase hosting + resources/config_data.json
        // For local development, we'll use the public folder
        const response = await fetch('/resources/config_data.json')
        if (!response.ok) {
          throw new Error('Error al cargar el archivo de configuración')
        }
        const data = await response.json()
        
        // Validate that data contains expected fields
        if (data && typeof data === 'object') {
          setConfigData(data)
        } else {
          throw new Error('Formato de configuración inválido')
        }
        setShowTable(true)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    } else {
      setShowTable(false)
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 text-center">
          <div className="card shadow-sm bg-dark text-white border-secondary">
            <div className="card-body p-5">
              <img 
                src="/hg_logo.png" 
                alt="Heron Dashboard - Logo principal de la aplicación" 
                className="logo-image mx-auto d-block"
                role="img"
              />
              <h1 className="display-4 mb-4">heron dashboard</h1>
              <p className="text-light">
                debes <strong>iniciar sesión</strong> para continuar
              </p>
              
              <button 
                className="btn btn-primary mt-3"
                onClick={handleButtonClick}
                disabled={loading}
              >
                {loading ? 'Cargando...' : showTable ? 'Ocultar Configuración' : 'Mostrar Configuración'}
              </button>

              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}

              {showTable && configData && (
                <div className="mt-4">
                  <table className="table table-dark table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Propiedad</th>
                        <th scope="col">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(configData).map(([key, value]) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{String(value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
