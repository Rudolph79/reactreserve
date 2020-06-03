import React, { useState, useEffect } from 'react';
import { Message, Form, Segment, Button, Icon } from "semantic-ui-react";
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { handleLogin } from '../utils/auth';

const INITIAL_USER = {
  name: "",
  email: "",
  password: ""
};

const Signup = () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      const url = `${baseUrl}/api/signup`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data);
      // console.log(user);
      
      // make request to signup user
    } catch(error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Message attached icon="settings" header="On commence ici !" 
        content="Créer un nouveau compte" color="teal" />
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Message error header="Une erreur de saisie !" content={error} />
        <Segment>
          <Form.Input fluid icon="user" iconPosition="left" label="Nome" 
            placeholder="Entrez votre nom" name="name" value={user.name} onChange={handleChange} />

          <Form.Input fluid icon="envelope" iconPosition="left" label="Email" 
            placeholder="Entrez votre email" name="email" value={user.email} type="email" 
            onChange={handleChange} />

          <Form.Input fluid icon="lock" iconPosition="left" label="Mot de passe" 
            placeholder="Saisissez votre mot de passe" name="password" value={user.password} type="password"
            onChange={handleChange} />

          <Button disabled={disabled || loading} icon="signup" type="submit" color="orange" content="S'inscrire" />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
          Vous avez déjà un compte ? {" "}
          <Link href="/login">
            <a>Connecter-vous ici</a>
          </Link>{" "} si oui.
      </Message>
    </>
  );
}

export default Signup;
