import { Component } from 'react';
import site_config from '../../site_config';

import Form from './Form';
import InputGroup from './components/InputGroup';

class ContactForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      showThankyou: false
    }
  }

  renderForm = () => {
    return (
      <Form
          onSubmit={(values) => {
            const querys = Object.entries(values).reduce((acc, entry, index) => {
              return `${acc}${index === 0 ? '?' : '&'}${encodeURIComponent(entry[0])}=${encodeURIComponent(entry[1])}`;
            },'');
            if (querys.includes('leadtest')){
              console.log(querys);
            } else {
              fetch('/submit_email', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
              })
              .then(res => console.log(res));
            }
            this.setState({ showThankyou: true });
          }}
          defaults={{
            render: (field) => (<InputGroup {...field} />)
          }}
          fields={[
            {
              name: "First Name",
              placeholder: "First Name",
              type: "text",
              required: true,
              validate: (value) => value ? null : '*Please provide your first name.'
            },
            {
              name: "Last Name",
              placeholder: "Last Name",
              type: "text",
              required: true,
              validate: (value) => value ? null : '*Please provide your last name.'
            },
            {
              name: "Email Address",
              placeholder: "Email Address",
              type: "text",
              required: true,
              validate: (value) => {
                let error = null; 
                if (!value){
                  error = 'Please provide your email address';
                } else {
                  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  const isEmail = re.test(String(value).toLowerCase());
                  if (isEmail === false){
                    error = 'Please enter a valid email address.';
                  }
                }
                return error; 
              }
            },
            {
              name: "Phone Number",
              placeholder: "Phone Number",
              type: "text"
            },
            {
              name: "Message",
              placeholder: "Enter a message",
              type: 'textarea'
            }
          ]}
          footerHTML={(formState) => (
            <div className="footer-block">
              <p className="disclaimer">* Indicates a required field.</p>
              <button type="button" className="cancel">
                Reset
              </button>
              <button type="submit" disabled={!formState.formIsValid} className="submit">
                Submit
              </button>
            </div>
          )}
        />  
    ); 
  }

  renderThankyou = () => (
    <div className="thankyou">
      <h4>Thank you for contacting Brad's House!</h4>
      <p>Your message has been received by our staff and we will be in contact with you as quickly as we can!</p>
    </div>
  );

  render() {
    return (
      <div>
        <div className="form-header"> 
          <h3>Get Involved At Brad's House</h3>
          <p>Please complete the form below to get involved with Brad's House.</p>
        </div>
        {
          this.state.showThankyou
          ? this.renderThankyou()
          : this.renderForm()
        }
      </div>
    );
  }
}

export default ContactForm;