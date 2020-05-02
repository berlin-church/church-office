interface LoginParams {
  username: string
  password: string
}
async function login ({ username, password }: LoginParams) {
  console.log(username, password)
}

async function logout (params: unknown) {}

interface NotAuthenticated {
  redirectTo: string
}

async function checkAuth (params: unknown): Promise<NotAuthenticated> {
  /* eslint-disable prefer-promise-reject-errors */
  return await Promise.reject({ redirectTo: '/login' })
}

async function checkError (reason: unknown) {}

async function getPermissions (params: unknown) {}

export default {
  login,
  logout,
  checkAuth,
  getPermissions,
  checkError
}
