import * as React from 'react';
import Button from 'src/components/layout/Button';
import Card from 'src/components/layout/Card';
import ProfileImg from '../../components/ProfileImg';

import  * as postsDuck  from '../../ducks/Posts';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import services from '../../services/index';

import { chunk } from 'lodash';

const { auth } = services;

const styles = {
    container: {
        padding: '15px',
    },
    image: {
        width: '200px'
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
    },
    
}

interface IProfileProps {
    data: postsDuck.IPost[][]
    fetchPosts: () => void,
    fetched: boolean,
    loading: boolean
    
}
class Profile extends React.Component<IProfileProps> {

    constructor(props: IProfileProps) {
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
            <div style={styles.container}>
                <div style={styles.row}>
                    <ProfileImg />
                    <Button>Agregar</Button>
                </div>
                { data.map((x, index) => (
                    <div key={index} style={styles.row}>
                        {x.map(y => (
                            <Card key={y.imageURL}>
                            <img src={y.imageURL} style={styles.image} alt=""/>
                        </Card>
                        ))}
                </div>
                ))}
                
            </div>
            
        );
    }
}

const mapStateToProps = (state: any) => {
    const { Posts: {data, fetched, fetching} } = state;
    const loading = fetching || !fetched;
    
    const filtered = Object.keys(data).reduce((acc, el) => {
        if(data[el].userId !== (auth.currentUser && auth.currentUser.uid)) {
            return acc;
        }
        return acc.concat(data[el]);
    }, [] as postsDuck.IPost[]);
    return {
        data: chunk(filtered, 3),
        fetched,
        loading,   
    }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => bindActionCreators(postsDuck, dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(Profile);