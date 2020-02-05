import * as React from 'react';

const styles = {
    input: {
        backgroundColor: '#FFF',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginBottom: '10px',
        padding: '10px 15px',
        width: 'calc(100% - 30px)',
    },
    span: {
        color: '#777',
        fontSize: '10px',
        fontWeight: 900,
        textTransform: 'uppercase'
    } as React.CSSProperties
    
}

interface IInputProps {
    label: string,
    placeholder?: string,
    
}

export default class Input extends React.Component<IInputProps> {
    public render() {
        const {label} = this.props;
        return(
            <div>
                <span style={styles.span}>{label}</span>
                <input {...this.props} style={styles.input} />
            </div>
            
        );
    }
}