import React, { useState, useEffect, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client'
import { Auth0ClientOptions, RedirectLoginOptions, PopupLoginOptions, GetIdTokenClaimsOptions, RedirectLoginResult, GetTokenSilentlyOptions, GetTokenWithPopupOptions, LogoutOptions, IdToken } from '@auth0/auth0-spa-js/dist/typings/global';

interface Auth0Context {
  isAuthenticated: boolean
  user: any
  loading: boolean
  popupOpen: boolean
  loginWithPopup(options: PopupLoginOptions): Promise<void>
  handleRedirectCallback(): Promise<RedirectLoginResult>
  getIdTokenClaims(o?: GetIdTokenClaimsOptions): Promise<IdToken>
  loginWithRedirect(o: RedirectLoginOptions): Promise<void>
  getTokenSilently(o?: GetTokenSilentlyOptions): Promise<string | undefined>
  getTokenWithPopup(o?: GetTokenWithPopupOptions): Promise<string | undefined>
  logout(o?: LogoutOptions): void
}
interface Auth0ProviderOptions {
  children: React.ReactElement
  onRedirectCallback?(result: RedirectLoginResult): void
}

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

export const Auth0Context = React.createContext<Auth0Context | null>(null)
export const useAuth0 = () => useContext(Auth0Context)
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: Auth0ProviderOptions & Auth0ClientOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState<Auth0Client>();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser()
        setUser(user)
      }

      setLoading(false)
    }
    // eslint-disable-next-line
    initAuth0()
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
    const user = await auth0Client!.getUser()
    setUser(user)
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setLoading(true)
    const result = await auth0Client!.handleRedirectCallback()
    const user = await auth0Client!.getUser()
    setLoading(false)
    setIsAuthenticated(true)
    setUser(user)
    return result
  }

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: async (o: GetIdTokenClaimsOptions | undefined) => await auth0Client!.getIdTokenClaims(o),
        loginWithRedirect: async (o: RedirectLoginOptions) => await auth0Client!.loginWithRedirect(o),
        getTokenSilently: async (o: GetTokenSilentlyOptions | undefined) => await auth0Client!.getTokenSilently(o),
        getTokenWithPopup: async (o: GetTokenWithPopupOptions | undefined) => await auth0Client!.getTokenWithPopup(o),
        logout: (o: LogoutOptions | undefined) => auth0Client!.logout(o)
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
