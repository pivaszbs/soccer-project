import React, { Component, Fragment } from 'react'
import AdminLayout from '../../../hoc/AdminLayout';
import FormField from '../../ui/FormField';
import { validate } from '../../ui/misc';
import { firebasePlayers, firebaseDB } from '../../../firebase';


export default class AddEditPlayers extends Component {

  state = {
    matchId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    defaultImg: '',
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Name',
          name: 'name_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Lastname',
          name: 'lastname_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      number: {
        element: 'input',
        value: '',
        config: {
          label: 'Player number',
          name: 'number_input',
          type: 'number'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      position: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a position',
          name: 'select_position',
          type: 'select',
          options: [
            { key: "Keeper", value: "Keeper" },
            { key: "Defence", value: "Defence" },
            { key: "Midfield", value: "Midfield" },
            { key: "Striker", value: "Striker" }
          ]
        },
        validation: {
          required: true,
          date: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false
      }
    }
  }

  componentDidMount() {
    console.log(this.props);
  }
  

  updateForm(element) {
    const newFormdata = { ...this.state.formdata }
    const newElement = { ...newFormdata[element.id] }

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

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid
    }

    if (formIsValid) {
      
    } else {
      this.setState({
        formError: true
      })
    }
  }
  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>
            {this.state.formtype}
          </h2>
          <Fragment>
            <form onSubmit={(event) => this.submitForm(event)}>
              <FormField
                id={'name'}
                formdata={this.state.formdata.name}
                change={(element) => this.updateForm(element)}
              />
              <FormField
                id={'lastname'}
                formdata={this.state.formdata.lastname}
                change={(element) => this.updateForm(element)}
              />
              <FormField
                id={'position'}
                formdata={this.state.formdata.position}
                change={(element) => this.updateForm(element)}
              />
              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ?
                <div className="error_label">
                  Something is wrong
                            </div> : ''
              }
              <div className="admin_submit">
                <button onClick={(event) => this.submitForm(event)}>
                  {this.state.formType}
                </button>
              </div>
            </form>
          </Fragment>
        </div>
      </AdminLayout>
    )
  }
}
