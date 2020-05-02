declare module 'react-admin' {
  export const Admin: FunctionComponent<AdminProps>;
  export type Login = (params: any, pathName?: string) => Promise<any>;
  export const useLogin: () => Login;

  export default { Admin, useLogin, Login }
}
