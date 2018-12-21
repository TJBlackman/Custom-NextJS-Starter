import styled from 'styled-components';
import BackgroundPicture from '../content/BackgroundPicture';

function LeadImage(props) {
    return (
        <Wrapper>
            <BackgroundPicture {...props} />
        </Wrapper>
    ); 
}

export default LeadImage; 


const Wrapper = styled.div`
    width: 100%; 
    height: 400px; 
    margin: 20px auto; 
    border-bottom: 10px solid ${props => props.theme.primary};

    @media (max-width: 768px){
        height: 350px; 
    }
    @media (max-width: 480px){
        height: 250px; 
    }
`;
