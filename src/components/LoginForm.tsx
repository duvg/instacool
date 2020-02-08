import * as React from 'react';


import { Link } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import Button from './layout/Button';
import Center from './layout/Center';
import Input from './layout/Input';



class LoginForm extends React.Component<InjectedFormProps> {
    
    public render(){

        const { handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit}>
                <Field label="Correo" palceholder="Correo Electronico" name='email' type='email' component={Input} />
                <Field label="Contraseña" palceholder="Contraseña" name='password' type='password' component={Input} />
                <Button block={true}>Enviar</Button>
                <Center>
                    <Link to={'/register'}>No tienes Cuenta? Registrate!</Link>
                </Center>
            </form>
        )
    }
}

export default reduxForm({
    form: 'login',
})(LoginForm)