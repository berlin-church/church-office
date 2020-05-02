import { useAuth0, Auth0Context } from '../components/auth0-provider'
import jsonServerProvider from 'ra-data-json-server';
import { Admin } from 'react-admin'
import { Resource } from 'ra-core'
import { ListGuesser } from 'ra-ui-materialui'
import AuthProvider from '../components/auth0-provider/provider'
import Login from './login'

export const config = { amp: false }

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const Home = () => {
  const { loading, isAuthenticated, user, popupOpen, loginWithPopup, logout } = useAuth0() as Auth0Context;

  if (loading) return <div>Loading...</div>

  const authProvider = new AuthProvider(isAuthenticated, user, popupOpen, loginWithPopup, logout)

  if (isAuthenticated) {
    return (
      <Admin loginPage={Login} dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="users" list={ListGuesser} />
      </Admin>
    )
  }

  return (
    <Admin loginPage={Login} dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="users" />
    </Admin>
  )
}

Home.displayName = 'Home'

export default Home
