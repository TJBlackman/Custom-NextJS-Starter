import styled from 'styled-components';
import { getBackgroundImageUrls } from '../../helpers/cloudinary_url';
import site_config from '../../site_config';

const { breakpoints } = site_config; 

export default function Hero({ children, src, position, min, max }) {
    const image_urls = getBackgroundImageUrls(src, min, max);    
    return (
        <Wrapper urls={image_urls} position={position}>
            <div>
                { children }
            </div>
        </Wrapper>
    )
}


// styles 
const Wrapper = styled.div`
    display: flex; 
    width: 100vw; 
    max-width: 100%;
    height: 100vh; 
    justify-content: center; 
    align-items: center; 
    background-size: cover; 
    background-position: center;
    overflow-x: hidden;
    position: relative;
    padding-top: 50px; 
    
    background-size: cover; 
    background-position: ${props => props.position || 'center'}; 
    background-image: ${props => props.urls.default};
    

    @media (min-width: ${() => breakpoints.lg}px){
        background-image: ${props => props.urls.xl};
    }

    @media (max-width: ${() => breakpoints.lg}px){
        background-image: ${props => props.urls.lg};
    }

    @media (max-width: ${() => breakpoints.md}px){
        background-image: ${props => props.urls.md};
    }

    @media (max-width: ${() => breakpoints.sm}px){
        background-image: ${props => props.urls.sm};
    }

    @media (max-width: ${() => breakpoints.xs}px){
        background-image: ${props => props.urls.xs};
    }
`; 
