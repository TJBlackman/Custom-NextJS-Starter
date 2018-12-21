import styled from 'styled-components';

// the html
const form_field = (props) => {
    const { name, type, label } = props;
    const field_id = `formfield_${name}`;

    return (
        <FormField>
            <label for={field_id}>{label}</label>
            <input id={field_id} name={name} type={type} placeholder={label} />
            <p class="error"></p>
        </FormField>
    );
}

export default form_field;

// styles
const FormField = styled.div`
    display: block; 
    width: 100%; 
    position: relative; 

    label {
        display: none; 
    }

    input {}

    .error {}
`;