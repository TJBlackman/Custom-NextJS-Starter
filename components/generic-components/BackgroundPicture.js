import styled from 'styled-components';
import site_config from '../../site_config';
import { getBackgroundImageUrls } from '../../helpers/cloudinary_url';

const { breakpoints } = site_config; 

function BackgroundPicture({ children, src, position, min, max }) {
    const image_urls = getBackgroundImageUrls(src, min, max); 
    return (
        <Wrapper urls={image_urls} position={position}>
            { children }
        </Wrapper>
    )
}

export default BackgroundPicture; 

const Wrapper = styled.div`
    display: block; 
    height: 100%; 
    width: 100%; 
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