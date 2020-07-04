import React from 'react'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Login } from 'react-admin'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth0, Auth0Context } from '../auth0-provider'

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

function LoginComponent ({ classes, props }: any) {
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

export default (withStyles(styles)(LoginComponent))
