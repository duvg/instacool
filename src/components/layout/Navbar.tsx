import { faNewspaper, faUser  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Link } from 'react-router-dom';

const styles = {
    containerLink: {
        borderBottom: '1px solid #aaa',
        padding: '10px 15px'
    } as React.CSSProperties,
    floatLink : {
        float: 'right'
    } as React.CSSProperties ,
    links:{
        color: '#555',
        textDecoration: 'none'
    } as React.CSSProperties
}

export default class Navbar extends React.Component {
    public render() {
        return(
            <div style={styles.containerLink}>
                <Link to={'/app/newsfeed'} style={styles.links}><FontAwesomeIcon icon={faNewspaper} /> Instacool</Link>
                <div style={styles.floatLink}>
                    <Link to={'/app/profile'} style={styles.links}> <FontAwesomeIcon icon={faUser} /> Perfil</Link>
                </div>
            </div>
        );
    }
}