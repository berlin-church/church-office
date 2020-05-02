declare module 'react-admin' {
  export const Admin: FunctionComponent<AdminProps>;
  export const useLogin: () => Login;
  export const Login: React.FunctionComponent<Props & HtmlHTMLAttributes<HTMLDivElement>>;
  export default { Admin, useLogin, Login }
}
