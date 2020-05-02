import React from 'react'
import { Login } from 'react-admin'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { withStyles, createStyles } from '@material-ui/core/styles';
import { useAuth0, Auth0Context } from '../components/auth0-provider'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = ({ spacing }: any) => (
  createStyles(
    {
      button: {
        width: '100%'
      },
      icon: {
        marginRight: spacing(1)
      }
    }
  )
)

const LoginPage = ({ classes, props }: any) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0() as Auth0Context;

  const handleLogin = () => {
    loginWithRedirect({}).then(
      () => console.debug('Redirecting to login...'),
      (reason: unknown) => console.error('Could not redirect to login.', reason)
    )
  }

  return (
    <Login {...props}>
      <div>
        <CardActions>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={loading || isAuthenticated}
          >
            { loading ? <CircularProgress className={classes.icon} size={18} thickness={2} /> : '' }
            Login
          </Button>
        </CardActions>
      </div>
    </Login>
  )
}

export default (withStyles(styles)(LoginPage))
