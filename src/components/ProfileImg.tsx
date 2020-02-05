import * as React from 'react';

const styles = {
    img: {
        border: '1px solid #aaa',
        borderRadius: '100%',
    }
}

export default class ProfileImg extends React.Component {
    public render() {
        return(
            <div>
                <img style={styles.img} src="https://picsum.photos/100/100" alt=""/>
            </div>
        );
    }
}