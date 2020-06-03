import React, { useState, useEffect } from 'react';
import { Message, Form, Segment, Button, Icon } from "semantic-ui-react";
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import { handleLogin } from '../utils/auth';


const INITIAL_USER = {
  email: "",
  password: ""
};

const Login = () => {
  const [user, setUser] = useState(INITIAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  const handleChange = () => {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }))
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError('');
      const url = `${baseUrl}/api/login`;
      const payload = { ...user }
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch(error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Message attached icon="privacy" header="Bienvenue !" 
        content="Connectez-vous avec votre email et mot de passe !" color="blue" />
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Message error header="Une erreur de saisie !" content={error} />
        <Segment>
          <Form.Input fluid icon="envelope" iconPosition="left" label="Email" 
            placeholder="Entrez votre email" name="email" value={user.email} type="email" 
            onChange={handleChange} />

          <Form.Input fluid icon="lock" iconPosition="left" label="Mot de passe" 
            placeholder="Saisissez votre mot de passe" name="password" value={user.password} type="password"
            onChange={handleChange} />

          <Button disabled={disabled || loading} icon="sign in" type="submit" color="orange" content="Se connecter" />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
          Nouvel utilisateur ? {" "}
          <Link href="/signup">
            <a>Inscrivez-vous ici</a>
          </Link>{" "} si oui.
      </Message>
    </>
  );
}

export default Login;
