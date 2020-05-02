import { AppProps } from 'next/app'
import Auth0Provider from '../components/auth0-provider'
import config from '../config'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Auth0Provider domain={config.domain} client_id={config.clientId} redirect_uri={config.origin}>
      <Component {...pageProps} />
    </Auth0Provider>
  )
}

export default App;
