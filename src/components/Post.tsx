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
    image: {
        width: '300px',
    }
}

interface IPostProps {
    image: string,
    like: () => void,
    share: () => void,
}

export default class Post extends React.Component<IPostProps> {
    public render () {
        const { image, like, share } = this.props;
        return (
            <div style={styles.container}>
                <img src={image} style={styles.image} />
                <Footer like={like} share={share} />
            </div>
        )
    }
}