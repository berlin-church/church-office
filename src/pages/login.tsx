import React from 'react'
import dynamic from 'next/dynamic';
const Login = dynamic(async () => await import('../components/login'), { ssr: false });

const LoginPage = ({ classes, props }: any) => {
  return <Login />
}

export default LoginPage
