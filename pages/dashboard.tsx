import { AuthContext } from "../contexts/AuthContext"
import { useContext, useEffect } from "react"
import { withSSRAuth } from "utils/withSSRAuth";
import { api } from "services/apiClient";
import { setupAPIClient } from "services/api";
import { AuthTokenError } from "services/errors/AuthTokenError";
import { destroyCookie } from "nookies";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
  }, [])

  return (
    <h1>Hello user! {user?.email}</h1>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');

  return {
    props: {}
  }
});