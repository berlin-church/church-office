import { NextPage } from 'next';

export const config = { amp: true };

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => <h1>Hello world! - user agent: {userAgent}</h1>;

Home.getInitialProps = async ({ req }) => {
  const userAgent: string = req?.headers['user-agent'] ?? navigator.userAgent;
  return { userAgent };
};

export default Home;