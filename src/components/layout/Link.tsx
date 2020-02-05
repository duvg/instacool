import * as React from 'react';

const style = {
    color: 'blue',
    fontSize: '12px',
    marginTop: '10px',
} as React.CSSProperties

export default class Link extends React.Component {
    public render () {
        return(
            <a href="#" {...this.props } style={style}/>
        );
    }
}