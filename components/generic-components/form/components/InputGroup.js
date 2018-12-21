import styled from 'styled-components'; 

// remove some items from field
// return appropriate input type
const chooseInputType = (field) => {
  if (!field.type){ return; }
  const {
    error, validate,
    hasFocus, touched,
    ...DOMProps
  } = field; 

  switch(field.type.toLowerCase()){
    case 'textarea': return <textarea {...DOMProps}></textarea>; 
    case 'text': return <input {...DOMProps} />; 
    default: {
      
    }
  }
}

const InputGroup = (field) => {
  const { label, touched, error, required, className } = field;

  let finalClassName=`
    ${className ? className : ''} 
    ${required ? 'required' : ''} 
    ${error && touched ? 'error' : ''}`.trim();

  return (
    <Wrapper className={finalClassName}>
      <label></label>
      { chooseInputType(field) }
      { 
        touched && error &&
        <p className="error-message">{error}</p>
      }
    </Wrapper>
  ); 
};

export default InputGroup; 

// styles 
const Wrapper = styled.div`
  display: block; 
  position: relative; 
  width: 100%; 
  margin-bottom: 15px; 

  label {
    display: block; 
    width: 100%; 
  }
  input,
  textarea {
    display: block; 
    height: 40px; 
    width: 100%; 
    outline: 0; 
    padding: 0 6px; 
    line-height: 30px; 
    font-size: 14px; 
    color: rgba(0,0,0,0.65); 
    border: 1px solid rgba(0,0,0,0.15); 
    position: relative; 
  }
  textarea {
    height: 100px; 
    line-height: 1.3; 
    resize: none; 
    padding-top: 5px; 
  }


  /* error */ 
  &.error {
    textarea,
    input {
      border-color: ${props => props.theme.danger}; 
    }
    &.required:after {
      color: ${props => props.theme.danger};
    }
    .error-message {
      font-size: 12px; 
      color: ${props => props.theme.danger}; 
    }
  }

  &.required {
      &:after {
        content: "*"; 
        display: block; 
        height: 5px; 
        width: 5px; 
        color: rgba(0,0,0,0.33); 
        position: absolute; 
        top: 5px; 
        right: 8px; 
        z-index: 9; 
      }
    }
  }

  
`; 