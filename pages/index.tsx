import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { withSSRGuest } from 'utils/withSSRGuest';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      email,
      password,
    }

    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>Auth</title>
      </Head>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Senha" type="value" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});