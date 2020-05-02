import React, { useState, useEffect, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client'
import { Auth0ClientOptions, RedirectLoginOptions, PopupLoginOptions, GetIdTokenClaimsOptions, RedirectLoginResult, GetTokenSilentlyOptions, GetTokenWithPopupOptions, LogoutOptions, IdToken } from '@auth0/auth0-spa-js/dist/typings/global'
import AuthProvider from './provider'

export interface User {
  email: string
  email_verified: boolean
  family_name: string
  given_name: string
  locale: string
  name: string
  nickname: string
  picture: string
  sub: string
  updated_at: string
}

export interface Auth0Context {
  isAuthenticated: boolean
  user: User | undefined
  loading: boolean
  popupOpen: boolean
  loginWithPopup(options: PopupLoginOptions): Promise<void>
  handleRedirectCallback(): Promise<RedirectLoginResult>
  getIdTokenClaims(o?: GetIdTokenClaimsOptions): Promise<IdToken>
  loginWithRedirect(o: RedirectLoginOptions): Promise<void>
  getTokenSilently(o?: GetTokenSilentlyOptions): Promise<string | undefined>
  getTokenWithPopup(o?: GetTokenWithPopupOptions): Promise<string | undefined>
  logout(o?: LogoutOptions): void
  getAuthProvider(): AuthProvider
}

interface Auth0ProviderOptions {
  children: React.ReactElement
  onRedirectCallback?(result: RedirectLoginResult): void
}

const DEFAULT_REDIRECT_CALLBACK = () => {
  // window.history.replaceState({}, document.title, window.location.pathname)
}

export const Auth0Context = React.createContext<Auth0Context | null>(null)
export const useAuth0 = () => useContext(Auth0Context)

const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: Auth0ProviderOptions & Auth0ClientOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User>()
  const [auth0Client, setAuth0] = useState<Auth0Client>()
  const [loading, setLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    const initAuth0 = async () => {
      console.info(initOptions)
      const auth0FromHook = await createAuth0Client({ cacheLocation: 'localstorage', ...initOptions })
      setAuth0(auth0FromHook)

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback()
        onRedirectCallback(appState)
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated()

      setIsAuthenticated(isAuthenticated)

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser()
        setUser(user)
      }

      setLoading(false)
    }

    initAuth0().then(
      () => console.debug('initAuth0 done'),
      (reason) => console.debug('initAuth0 failed', reason)
    )
  }, [])

  const loginWithPopup = async (o: PopupLoginOptions) => {
    setPopupOpen(true)
    try {
      await auth0Client!.loginWithPopup(o)
    } catch (error) {
      console.error(error)
    } finally {
      setPopupOpen(false)
    }
    const user: User = await auth0Client!.getUser()
    setUser(user)
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setLoading(true)
    const result = await auth0Client!.handleRedirectCallback()
    const user: User = await auth0Client!.getUser()
    setLoading(false)
    setIsAuthenticated(true)
    setUser(user)
    return result
  }

  const logout = (o: LogoutOptions | undefined) => auth0Client!.logout(o)
  const getTokenWithPopup = async (o: GetTokenWithPopupOptions | undefined) => await auth0Client!.getTokenWithPopup(o)
  const getTokenSilently = async (o: GetTokenSilentlyOptions | undefined) => await auth0Client!.getTokenSilently(o)
  const loginWithRedirect = async (o: RedirectLoginOptions) => await auth0Client!.loginWithRedirect(o)
  const getIdTokenClaims = async (o: GetIdTokenClaimsOptions | undefined) => await auth0Client!.getIdTokenClaims(o)
  const getAuthProvider = () => new AuthProvider(isAuthenticated, user as User, popupOpen, loginWithPopup, logout)

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims,
        loginWithRedirect,
        getTokenSilently,
        getTokenWithPopup,
        logout,
        getAuthProvider
      }}
    >
      { children }
    </Auth0Context.Provider>
  )
}

Auth0Provider.displayName = 'Auth0Provider'

export default Auth0Provider
