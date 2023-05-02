import { Container, Form, Background } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';

import { FiMail, FiLock } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { useState } from 'react';
 
export function SignIn() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { signIn, showLoading } = useAuth();

  function handleSignIn() {

    if(!email || !password) {
      return alert("Preencha todos os dados!")
    }

    signIn({ email, password });
  }

  return(
    
    <Container>
      {showLoading && <Loading/>}
      <Form>

        <h1>Rocket Notes</h1>
        <p>
          Aplicação para salvar e gerenciar seus links úteis.
        </p>

        <h2>Faça seu login</h2>

        <Input 
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={e => {setEmail(e.target.value)}}
        />

        <Input 
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={e => {setPassword(e.target.value)}}
        />

        <Button 
          title="Entrar"
          onClick={handleSignIn}
        />

        <Link to="register">
          Criar conta
        </Link>
      </Form>
      
      <Background />
    </Container>
  );
}