import * as React from 'react';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

// Components
import Card from '../../components/layout/Card';
import Container from '../../components/layout/Container';
import LoginForm from '../../components/LoginForm';


import { ILogin, login as loginThunk } from '../../ducks/Users';

import Title from '../../components/layout/Title';


interface ILoginProps {
    login: (a: ILogin) => void
}

// Router
class Login extends React.Component<ILoginProps> {
    
    public render() {
        const { login } = this.props;
        return(
            <Container center={true}>
                <Card>
                    <Title>Inciar Sesion</Title>
                    <LoginForm onSubmit={login} />
                </Card>
            </Container>      
        )
    }
}

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    login: (payload: any) => dispatch(loginThunk(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);