import { useState, useEffect } from 'react'

function App() {
  const [showTable, setShowTable] = useState(false)
  const [configData, setConfigData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editedData, setEditedData] = useState(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (window.successTimeout) {
        clearTimeout(window.successTimeout)
      }
    }
  }, [])

  const handleButtonClick = async () => {
    if (!showTable) {
      setLoading(true)
      setError(null)
      setSaveSuccess(false)
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
          setEditedData(data)
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
      setEditMode(false)
      setSaveSuccess(false)
    }
  }

  const handleEditClick = () => {
    setEditMode(true)
    setEditedData({ ...configData })
    setSaveSuccess(false)
  }

  const handleCancelEdit = () => {
    setEditMode(false)
    setEditedData({ ...configData })
  }

  const handleInputChange = (key, value) => {
    setEditedData({
      ...editedData,
      [key]: value
    })
  }

  const handleSaveClick = () => {
    // Update the displayed data
    setConfigData({ ...editedData })
    setEditMode(false)
    setSaveSuccess(true)
    
    // Hide success message after 3 seconds
    if (window.successTimeout) {
      clearTimeout(window.successTimeout)
    }
    window.successTimeout = setTimeout(() => {
      setSaveSuccess(false)
    }, 3000)
    
    // Note: In a real application, you would send this data to a backend API
    // to persist the changes to the JSON file or database
    console.log('Datos guardados:', editedData)
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

              {saveSuccess && (
                <div className="alert alert-success mt-3" role="alert">
                  ¡Configuración actualizada correctamente!
                </div>
              )}

              {showTable && configData && (
                <div className="mt-4">
                  <div className="d-flex justify-content-end mb-2">
                    {!editMode ? (
                      <button 
                        className="btn btn-sm btn-warning"
                        onClick={handleEditClick}
                      >
                        Editar
                      </button>
                    ) : (
                      <div className="btn-group" role="group">
                        <button 
                          className="btn btn-sm btn-success"
                          onClick={handleSaveClick}
                        >
                          Guardar
                        </button>
                        <button 
                          className="btn btn-sm btn-secondary"
                          onClick={handleCancelEdit}
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                  <table className="table table-dark table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Propiedad</th>
                        <th scope="col">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(editMode ? editedData : configData).map(([key, value]) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>
                            {editMode && editedData ? (
                              <input
                                type="text"
                                className="form-control form-control-sm bg-dark text-white border-secondary"
                                value={editedData[key]}
                                onChange={(e) => handleInputChange(key, e.target.value)}
                              />
                            ) : (
                              String(value)
                            )}
                          </td>
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
