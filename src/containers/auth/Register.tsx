import * as React from 'react';

import { Link } from 'react-router-dom';

// Components
import Button from '../../components/layout/Button';
import Card from '../../components/layout/Card';
import Center from '../../components/layout/Center';
import Container from '../../components/layout/Container';
import Input from '../../components/layout/Input';
import Title from '../../components/layout/Title';

// Router
export default class Register extends React.Component {
    
    public render() {
        return(
            <Container center={true}>
                <Card>
                <Title>Registro</Title>
                <Input placeholder='Correo' label="Correo" />
                <Input placeholder='Contraseña' label="Contraseña" />
                <Button block={true}>Enviar</Button>
                <Center>
                    <Link to={'/'}>Ya tienes Cuenta? Inicia Sesions!</Link>
                </Center>
                </Card>
            </Container>      
        )
    }
}