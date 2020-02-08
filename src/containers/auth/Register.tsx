import * as React from 'react';

import { connect } from 'react-redux';

// Components
import Card from '../../components/layout/Card';
import Container from '../../components/layout/Container';
import Title from '../../components/layout/Title';
import RegisterForm from '../../components/RegisterForm'

import { ThunkDispatch } from 'redux-thunk';
import { ILogin, register as registerThunk,  } from '../../ducks/Users';


interface IRegisterProps {
    register: (a: ILogin) => void
}

// Router
class Register extends React.Component<IRegisterProps> {
    
    public render() {
        const { register } = this.props;
        return(
            <Container center={true}>
                <Card>
                <Title>Registro</Title>
                <RegisterForm onSubmit={register}/>
                </Card>
            </Container>      
        )
    }
}
const mapStateToProps = (state: any) => state;
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    register: (payload: any) => dispatch(registerThunk(payload))
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);

