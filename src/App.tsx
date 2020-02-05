import * as React from 'react';
import './App.css';

// Components
import Button from './components/layout/Button';
import Card from './components/layout/Card';
import Center from './components/layout/Center';
import Container from './components/layout/Container';
import Input from './components/layout/Input';
import Link from './components/layout/Link';
import Title from './components/layout/Title';



class App extends React.Component {
  public render() {
    return (
      <Container>
        <Card>
          <Title>Inciar Sesion</Title>
          <Input placeholder='Correo' label="Correo" />
          <Input placeholder='Contraseña' label="Contraseña" />
          <Button block={true}>Enviar</Button>
          <Center>
            <Link>No tienes Cuenta? Registrate!</Link>
          </Center>
        </Card>
      </Container>      
    );
  }
}

export default App;
