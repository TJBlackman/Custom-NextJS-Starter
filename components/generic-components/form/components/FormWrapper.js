import styled from 'styled-components';

function FormWrapper({children}) {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export default FormWrapper

const Wrapper = styled.div`
    display: block; 
    padding: 15px; 
`;