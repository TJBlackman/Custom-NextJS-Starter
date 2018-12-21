import styled from 'styled-components';

// container gives basic width styles
// it is only in charge of left-right content 
// width for the entire page

export default function Container({ children }) {
  return (
    <Wrapper>
      { children }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: block;
  margin: 0 auto; 
  max-width: 100%; 
  width: 1200px; 
  padding: 0 8px;

  @media(max-width: 1200px){
    width: 992px;
  }
  @media (max-width: 992px){
    width: 768px; 
  }
  
`;