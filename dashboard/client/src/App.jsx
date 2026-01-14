function App() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 text-center">
          <div className="card shadow-sm bg-dark text-white border-secondary">
            <div className="card-body p-5">
              <img 
                src="/logo.svg" 
                alt="Heron Logo" 
                className="logo-image mx-auto d-block"
              />
              <h1 className="display-4 mb-4">heron dashboard</h1>
              <p className="text-light">
                debes <strong>iniciar sesión</strong> para continuar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
