import 'antd/dist/antd.css';
import { Provider, createClient } from 'urql';

const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL,
  fetchOptions: {
    credentials: 'include',
  },
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
