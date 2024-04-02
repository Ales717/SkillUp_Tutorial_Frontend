import { routes } from 'constants/routesConstants'
import { FC, useState } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Button from 'react-bootstrap/Button'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import authStore from 'stores/auth.store'
import Toast from 'react-bootstrap/Toast'
import { StatusCode } from 'constants/errorConstants'
import * as API from 'api/Api'

const Navbar: FC = () => {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const singout = async () => {
    const response = await API.signout()
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      authStore.signout()
      navigate('/')
    }
  }

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-xxl p-4 pb-0">
            <Link className="navbar-brand" to={routes.HOME}>
              <img src="/images/logo.png" alt="skillUp Mentor" width={123} />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo2"
              aria-controls="navbarTogglerDemo2"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-end align-items-center"
              id="navbarTogglerDemo2"
            >
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item pe-4">
                  <NavLink className="nav-link" to={routes.HOME}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item pe-4">
                  <NavLink className="nav-link" to={routes.DASHBOARD_PREFIX}>
                    Dashboard
                  </NavLink>
                </li>
                {authStore.user ? (
                  <li className="nav-item pe-4">
                    <Button className="btn btn-dark" onClick={singout}>
                      Signout
                    </Button>
                  </li>
                ) : (
                  <>
                    <li className="nav-item pe-4">
                      <NavLink className="nav-link" to={routes.LOGIN}>
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item ">
                      <NavLink className="nav-link pe-0" to={routes.SIGNUP}>
                        Signup
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {showError && (
        <ToastContainer className="p-3" position="top-end">
          <Toast onClose={() => setShowError(false)} show={showError}>
            <Toast.Header>
              <strong className="me-suto text-danger">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  )
}

export default Navbar
