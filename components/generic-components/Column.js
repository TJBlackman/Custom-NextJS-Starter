import styled from 'styled-components';

function Col(props) {
    return (
        <Wrapper {...props}>
            { props.children }
        </Wrapper>
    )
}

export default Col;

const Wrapper = styled.div`
    display: block; 
    padding: 0 15px; 
    height: auto; 
    width: 100%; 

    /* xs | mobile devices */ 
    @media(min-width: 480px){
        ${props => {
            if (props.xs){
                return `width: ${eval(props.xs) * 100}%;`
            }
        }}
    }

    /* small | landscape phones & tablets */ 
    @media(min-width: 768px){
        ${props => {
            if (props.small){
                return `width: ${eval(props.small) * 100}%;`
            }
        }}
    }

    /* medium */ 
    @media(min-width: 992px){
        ${props => {
            if (props.medium){
                return `width: ${eval(props.medium) * 100}%;`
            }
        }}
    }

    /* large */ 
    @media(min-width: 1200px){
        ${props => {
            if (props.large){
                return `width: ${eval(props.large) * 100}%;`
            }
        }}
    }
`; 