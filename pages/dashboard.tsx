import { AuthContext } from "../contexts/AuthContext"
import { useContext, useEffect } from "react"
import { withSSRAuth } from "utils/withSSRAuth";
import { api } from "services/apiClient";
import { setupAPIClient } from "services/api";
import { Can } from "components/Can";

export default function Dashboard() {
  const { user, isAuthenticated, signOut } = useContext(AuthContext);

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
  }, [])

  return (
    <>
      <h1>Hello user! {user?.email}</h1>

      <button onClick={signOut}>Sair</button>

      <Can permissions={['metrics.list']}>
        <p>Métricas</p>
      </Can>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');

  return {
    props: {}
  }
});