import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Container from 'src/components/layout/Container';
import Post from '../../components/Post';

import  * as postsDuck  from '../../ducks/Posts';



interface INewsfeedProps {
    data: postsDuck.IDataPosts,
    like: (a: string) => void,
    share: (a: string) => void,
    fetchPosts: () => void,
    fetched: boolean,
    fetching: boolean,
    
}

class NewsFeed extends React.Component<INewsfeedProps> {

    constructor(props: INewsfeedProps) {
        super(props);
        const { fetchPosts, fetched } = props;

        if(fetched ) {
            return;
        }

        fetchPosts();
    }


    public render() {
        const { data } = this.props;
        return(
            <Container>
                {Object.keys(data).map(x => {
                    const post = data[x]
                    return (
                        <div key={x} style={{margin: '0 auto'}}>
                            <Post 
                                like={this.handleLink(x)}
                                share={this.handleShare(x)}
                                image={post.imageURL}
                            />
                        </div>
                    )
                })}
            </Container>
        );
    }

    private handleLink = (id: string) => () => {
        const { like } = this.props;
        like(id);
    }

    private handleShare = (id: string) => () => {
        const { share } = this.props;
        share(id);
    }
}

const mapStateToProps = (state: any) => {
    const { Posts: {data, fetched, fetching} } = state;
    const loading = fetching || !fetched
    return {
        data,
        fetched,
        loading,
        
    }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => bindActionCreators(postsDuck, dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(NewsFeed);