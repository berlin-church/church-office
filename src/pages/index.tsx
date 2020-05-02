import { useAuth0, Auth0Context } from '../components/auth0-provider'
import jsonServerProvider from 'ra-data-json-server';
import { Admin } from 'react-admin'
import { Resource } from 'ra-core'
import { ListGuesser } from 'ra-ui-materialui'
import authProvider from '../utils/authProvider'

export const config = { amp: false }

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const Home = () => {
  const { loading /* isAuthenticated */ } = useAuth0() as Auth0Context;

  if (loading) return <div>Loading...</div>

  // if (!isAuthenticated) return <div>Not authenticated.</div>

  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="users" list={ListGuesser} />
    </Admin>
  )
}

Home.displayName = 'Home'

export default Home
