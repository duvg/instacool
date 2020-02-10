import * as React from 'react';
import { Field, InjectedFormProps, reduxForm, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';

const styles = {
    file: {
        display: 'none'
    },
    img: {
        border: '1px solid #aaa',
        borderRadius: '100%',
        height: '100px',
        width: '100px',
        
    }
}

const handleChange = (submitProfileImg: () => void, input: WrappedFieldInputProps) => async  (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { onChange } = input;
    const { files } = e.target;
    if(files) {
        await onChange(files[0]);
        submitProfileImg();
    }
    
}


interface IProfileImg{
    profileImg: string,
    submitProfileImg: () => void,
}

const RenderField: React.StatelessComponent<WrappedFieldProps & IProfileImg> = ({ input, submitProfileImg, profileImg }) => 
    <div>
        <input 
            onChange={handleChange(submitProfileImg, input)} 
            style={styles.file} 
            type="file" 
            id="profileImage" 
        />
        <label htmlFor="profileImage">
            <img style={styles.img} src={profileImg} alt=""/>
        </label>
        
    </div>

class ProfileImg extends React.Component<InjectedFormProps<{}, IProfileImg> & IProfileImg> {
    public render() {

        const { handleSubmit, submitProfileImg, profileImg } = this.props;

        return(
            <form onSubmit={handleSubmit}>
                <Field 
                    name="profileImg" 
                    profileImg={profileImg}
                    component={RenderField} 
                    submitProfileImg={submitProfileImg}
                />
            </form>
        );
    }
}


export default reduxForm<{}, IProfileImg>({
    form: 'profileImg'
})(ProfileImg);