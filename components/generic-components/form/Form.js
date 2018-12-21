import { Component } from 'react';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = this.getInitialState(props);
    }

    // generate initial state for all fields
    // this is the only time props.fields should be used
    // after this time, only state.fields should be used
    getInitialState = (props) => {
        // add provided fields to state
        const formState = props.fields.reduce((acc, field, index) => {
            const { name, required } = field; 
            const field_state = {
                ...props.defaults,
                ...field, 
                value: field.value || props.defaults.value || "",
                initialValue: field.value || props.defaults.value || "",
                required: required || false,
                error: null,
                touched: false,
                hasFocus: false
            };
            acc[name] = field_state;
            return acc;
        }, new Object());

        // add props to state
        return {
            ...formState,
            formIsValid: false
        };
    }

    // update field.error to newErrorMessage
    updateFieldError = (fieldName, newErrorMessage) => {
        const field = this.state[fieldName];
        const newField = {
            ...field, 
            error: newErrorMessage
        }; 
        const newState = new Object(); 
        newState[field.name] = newField;
        this.setState(newState, this.validateForm);
    }

    // recieve field obj
    // get validate from field or from defaults
    // run function every time
    // if onChange/onBlur run those when 
    validateField = (fieldName) => {
        const field = {...this.state[fieldName]};
        if (!field.required){ return; }
        const { defaults } = this.props;
        
        const default_message = defaults.error || 'Field is required';
        const validateField = field.validate || defaults.validate; 
        let error = null;

        
        if (!validateField){
            error = field.value ? null : default_message;
        } else {
            delete field.validate; 
            error = validateField(field.value, field); 
        }

        if (error !== field.error){
            this.updateFieldError(fieldName, error);
        }
    }

    // from state, get all fields with required:true prop
    // if ANY have an error message, form is invalid
    // update formState if needed
    validateForm = () => {
        const validatedFields = Object.values(this.state).filter(field => {
            return field.constructor === Object && field.required;
        });

        let formIsValid = validatedFields.every(field => {
            return field.error ? false : true; 
        });

        if (formIsValid !== this.state.formIsValid){
            this.setState({ formIsValid }); 
        }
    }

    // give field focus:true
    onFocus = (field) => {
        const newFieldState = {
            ...field,
            hasFocus: true
        };
        const newState = new Object();
        newState[field.name] = newFieldState;  
        this.setState(newState);
    }

    // toggle focus:false
    // validate entire form onBlur
    onBlur = (field) => {
        const newFieldState = {
            ...field,
            hasFocus: false,
            touched: true
        };
        const newState = new Object();
        newState[field.name] = newFieldState;  
        this.setState(newState, () => {
            this.validateField(field.name);
        }); 
    }

    // update state with new field value
    // fields bcome pristine:false
    // validate entire form onChange
    onChange = (newValue, field) => {
        const newFieldState = {
            ...field,
            value: newValue,
            changed: true
        };
        const newState = new Object(); 
        newState[field.name] = newFieldState; 
        this.setState(newState, () => {
            this.validateField(field.name);
        }); 
    }

    // TODO
    onSelect = (field) => {}

    onSubmitForm = (e) => {
        e.preventDefault();
        const formValues = Object.values(this.state).filter(item => {
            return item.constructor === Object; 
        }).reduce((acc, field) => {
            const { name, value } = field; 
            acc[name] = value;
            return acc; 
        }, new Object());
        const str = JSON.stringify(this.state);
        const state_copy = JSON.parse(str);
        this.props.onSubmit(formValues, state_copy);
    }

    // render an InputGroup for every field in state
    renderFields = () => {
        const fields = Object.values(this.state).filter(field => {
            return field.constructor === Object;
        });

        return fields.map(field => {
            const { initialValue, valid, pristine, changed, render, ...DOMProps} = field
            const fieldCopy = {
                ...DOMProps, 
                key: field.name,
                onChange: (e) => { this.onChange(e.target.value, field); },
                onBlur:   ()  => { this.onBlur(field); },
                onFocus:  ()  => { this.onFocus(field); },
                onSelect: ()  => { this.onSelect(field); }
            }; 
            const renderField = field.render || this.props.defaults.render; 

            if (renderField){
                return field.render(fieldCopy);
            } else {
                console.warn('No render prop provided. Please give each field it\'s own render this.props, or simple supply a default.render prop.');
            }
        });
    }

    render(){
        // console.clear(); 
        // console.log(JSON.stringify(this.state, null, 2));
        const { headerHTML, footerHTML, onSubmit, defaults, fields, ...formProps } = this.props;

        return (
            <form {...formProps} onSubmit={this.onSubmitForm}>
                { headerHTML && headerHTML({...this.state}) }
                { this.renderFields()         }
                { footerHTML && footerHTML({...this.state}) }
            </form>
        );
    }
}

export default Form;