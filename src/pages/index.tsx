import { useAuth0, Auth0Context } from '../components/auth0-provider'
import jsonServerProvider from 'ra-data-json-server';
import { Admin } from 'react-admin'
import { Resource } from 'ra-core'
import { ListGuesser } from 'ra-ui-materialui'
import CircularProgress from '@material-ui/core/CircularProgress';
import Login from './login'

export const config = { amp: false }

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const Home = () => {
  const { loading, authProvider } = useAuth0() as Auth0Context;

  if (loading) return <CircularProgress size={18} thickness={2} />

  return (
    <Admin loginPage={Login} dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="users" list={ListGuesser} />
    </Admin>
  )
}

Home.displayName = 'Home'

export default Home
