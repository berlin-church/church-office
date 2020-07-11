import { AppProps } from 'next/app'
import Auth0Provider from '../components/auth0-provider'
// import config from '../config'

const domain = process.env.auth_domain as string
const clientId = process.env.auth_client_id as string
const origin = process.env.auth_origin as string

const App = ({ Component, pageProps }: AppProps) => {
  console.debug(domain)
  return (
    <Auth0Provider domain={domain} client_id={clientId} redirect_uri={origin}>
      <Component {...pageProps} />
    </Auth0Provider>
  )
}

export default App;
