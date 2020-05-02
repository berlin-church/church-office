import { PopupLoginOptions, LogoutOptions } from '@auth0/auth0-spa-js/dist/typings/global'
import { User } from '../auth0-provider'

interface LoginParams {
  username: string
  password: string
}

interface NotAuthenticated {
  redirectTo: string
}

class AuthProvider {
  isAuthenticated: boolean
  user: User | undefined
  popupOpen: boolean
  authLogout: (o?: LogoutOptions | undefined) => void
  loginWithPopup: (options: PopupLoginOptions) => Promise<void>

  constructor (
    isAuthenticated: boolean,
    user: User | undefined,
    popupOpen: boolean,
    loginWithPopup: (options: PopupLoginOptions) => Promise<void>,
    logout: (o?: LogoutOptions | undefined) => void) {
    this.isAuthenticated = isAuthenticated
    this.user = user
    this.popupOpen = popupOpen
    this.loginWithPopup = loginWithPopup
    this.authLogout = logout
  }

  login = async ({ username, password }: LoginParams): Promise<void> => {
    return await Promise.resolve()
  }

  logout = async (): Promise<void> => {
    if (this.isAuthenticated) this.authLogout()

    return await Promise.resolve()
  }

  checkAuth = async (params: unknown): Promise<NotAuthenticated | void> => {
    if (this.isAuthenticated) return await Promise.resolve()

    // eslint-disable-next-line prefer-promise-reject-errors
    return await Promise.reject({ redirectTo: '/login' })
  }

  checkError = async (reason: unknown): Promise<void> => {
    console.error(reason)
  }

  getPermissions = async (params: unknown): Promise<User | undefined> => {
    return await Promise.resolve(this.user)
  }
}

export default AuthProvider
