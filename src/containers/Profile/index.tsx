import * as React from 'react';
import Button from 'src/components/layout/Button';
import Card from 'src/components/layout/Card';
import ProfileImg from '../../components/ProfileImg';


const styles = {
    container: {
        padding: '15px',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
    }
}

export default class Profile extends React.Component {
    public render() {
        return(
            <div style={styles.container}>
                <div style={styles.row}>
                    <ProfileImg />
                    <Button>Agregar</Button>
                </div>
                <div style={styles.row}>
                    <Card>
                        <img src="https://picsum.photos/200/200" alt=""/>
                    </Card>
                    <Card>
                        <img src="https://picsum.photos/200/200" alt=""/>
                    </Card>
                    <Card>
                        <img src="https://picsum.photos/200/200" alt=""/>
                    </Card>

                </div>
            </div>
            
        );
    }
}