import styled from 'styled-components';

function Row(props) {
    return (
        <Wrapper {...props}>
            { props.children }
        </Wrapper>
    )
}

export default Row

const Wrapper = styled.div`
    display: flex; 
    padding: 20px 0; 
    justify-content: space-between; 
    align-items: stretch; 
    flex-flow: row wrap; 
    margin: 100px 0; 

    ${props => props.justify && `justify-content: ${props.justify}`}
    ${props => props.align && `align-items: ${props.align}`}
    ${props => props.flexFlow && `flex-flow: ${props.flexFlow}`}

    @media (max-width: 768px){
        margin: 40px 0; 
    }; 

    &:after {
        content: ""; 
        display: block; 
        clear: both; 
    }
`; 