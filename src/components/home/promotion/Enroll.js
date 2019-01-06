import React, { Component } from 'react'
import Fade from 'react-reveal';
import FormField from '../../ui/FormField';
import { validate } from '../../ui/misc';
import { firebasePromotiions } from '../../../firebase';

export default class Enroll extends Component {
    state = {
        fromError:false,
        formSuccess:'',
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation:{
                    required: true,
                    email: true,
                },
                valid: false,
                validationMessage:''
            }
        }
    }
    
    successMessage(){
        setTimeout(()=>{
            this.setState({
                formSuccess:''
            })
        },2000)
    }

    resetFormSuccess(type){
        const newFormdata = {...this.state.formdata}
        for (let key in newFormdata){
            newFormdata[key].value = '';
            newFormdata[key].valid = false;
            newFormdata[key].validationMessage = '';
        }

        this.setState({
            fromError:false,
            formdata: newFormdata,
            formSuccess: type? 'Congratulations' : 'Already in the database'
        })
        this.successMessage();
    }

    submitForm(event){
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;
        
        for(let key in this.state.formdata){
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }
        if(formIsValid){
            firebasePromotiions.orderByChild('email')
            .equalTo(dataToSubmit.email)
            .once("value")
            .then((snapshot)=>{
                if(snapshot.val()===null){
                    firebasePromotiions.push(dataToSubmit);
                    this.resetFormSuccess(true);
                } else {
                    this.resetFormSuccess(false);
                }
            })
            //this.resetFormSuccess();
        }
        else{
            this.setState({
                fromError: true
            })
        }
    }

    updateForm(element){
        const newFormdata = {...this.state.formdata}
        const newElement = { ...newFormdata[element.id]}
        
        newElement.value = element.event.target.value;

        let validdata = validate(newElement);
        newElement.valid = validdata[0];
        newElement.validationMessage = validdata[1];
        
        newFormdata[element.id] = newElement;

        this.setState({
            fromError: false,
            formdata: newFormdata
        })
    }

    render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
            <form onSubmit={(event)=>this.submitForm(event)}>
                <div className="enroll_title">
                    Enter your email
                </div>
                <div className="enroll_input"                >
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element)=>this.updateForm(element)}
                    />
                    { this.state.fromError ? <div className="error_label">Something is wrong, try again</div> : null}
                    <div className="success_label">{this.state.formSuccess}</div>
                    <button onClick={(event)=>this.submitForm(event)}>Enroll</button>
                </div>
            </form>
        </div>
      </Fade>
    )
  }
}
