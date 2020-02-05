import * as React from 'react';

import Footer from './layout/Footer';

// Custom styles
const styles = {
    container:{
        backgroundColor: '#fff',
        border: '1px solid #DDD',
        marginBottom: '10px',
        padding: '10px 15px',
        
    },
}

interface IPostProps {
    image: string
}

export default class Post extends React.Component<IPostProps> {
    public render () {
        const { image } = this.props;
        return (
            <div style={styles.container}>
                <img src={image} />
                <Footer />
            </div>
        )
    }
}