//ApolloClient → GraphQL サーバーとやり取りするためのメインクラス
//setContext → リクエストの前にヘッダー情報を変更するための関数
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql'
});

const authLink = setContext((_, prevContext ) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),

  //毎回 API にリクエストさせない
  cache: new InMemoryCache(),
})

export default client;
