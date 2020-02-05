import * as React from 'react';

import Container from 'src/components/layout/Container';
import Post from '../../components/Post';


export default class NewsFeed extends React.Component {
    public render() {
        return(
            <Container>
                <div style={{margin: '0 auto'}}>
                    <Post image="https://placedog.net/300/200" />
                    <Post image="https://placedog.net/300/200" />
                </div>
            </Container>
        );
    }
}