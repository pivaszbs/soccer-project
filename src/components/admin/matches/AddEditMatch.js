import React, { Component } from 'react'
import AdminLayout from '../../../hoc/AdminLayout';
import FormField from '../../ui/FormField';
import { validate } from '../../ui/misc';

export default class AddEditMactch extends Component {
  
    state = {
        matchId:'',
        formType:'',
        formError:false,
        formSuccess:'',
        teams:[],
        formdata:{
            date:{
                element:'input',
                value:'',
                config:{
                    label: 'Event date',
                    name:'date_input',
                    type: 'date'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showLabel: true
            },
            local:{
                element:'select',
                value:'',
                config:{
                    label: 'Select a local team',
                    name:'select_local',
                    type: 'select',
                    options: [{key: "Yes", value: "No"}]
                },
                validation:{
                    required: true,
                    date: true,
                },
                valid: false,
                validationMessage:'',
                showLabel: false
            },
            resultLocal:{
                element:'input',
                value:'',
                config:{
                    label: 'result local',
                    name:'result_local_input',
                    type: 'text'
                },
                validation:{
                    required: true,
                },
                valid: false,
                validationMessage:'',
                showLabel: false
            },
            away:{
                element:'select',
                value:'',
                config:{
                    label: 'Select a away team',
                    name:'select_away',
                    type: 'select',
                    options: [{key: "Yes", value: "No"}]
                },
                validation:{
                    required: true,
                    date: true,
                },
                valid: false,
                validationMessage:'',
                showLabel: false
            },
            resultAway:{
                element:'input',
                value:'',
                config:{
                    label: 'Result away',
                    name:'result_away_input',
                    type: 'text'
                },
                validation:{
                    required: true,
                },
                valid: false,
                validationMessage:'',
                showLabel: false
            },
            referee:{
                element:'input',
                value:'',
                config:{
                    label: 'Referee',
                    name:'referee_input',
                    type: 'text'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showLabel: true
            },
            stadium:{
                element:'input',
                value:'',
                config:{
                    label: 'Stadium',
                    name:'stadium_input',
                    type: 'text'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showLabel: true
            },
            result:{
                element:'select',
                value:'',
                config:{
                    label: 'Select a local team',
                    name:'select_local',
                    type: 'select',
                    options: [
                        {key: "W", value: "W"},
                        {key: "L", value: "L"},
                        {key: "D", value: "D"},
                        {key: "n/a", value: "n/a"},
                    ]
                },
                validation:{
                    required: true,
                },
                valid: false,
                validationMessage:'',
                showLabel: true
            },
            final:{
                element:'select',
                value:'',
                config:{
                    label: 'Game played ?',
                    name:'select_played',
                    type: 'select',
                    options: [
                        {key: "Yes", value: "Yes"},
                        {key: "No", value: "No"},
                    ]
                },
                validation:{
                    required: true,
                },
                valid: false,
                validationMessage:'',
                showLabel: true
            },
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
        <AdminLayout>
            <div className="editmatch_dialog_wrapper">
                <h2>
                    {this.state.formType}
                </h2>
                <div>
                    <form onSubmit={(event)=>this.submitForm(event)}>
                        <FormField
                            id={'date'}
                            formdata={this.state.formdata.date}
                            change={(element)=>this.updateForm(element)}
                        />

                        <div className="select_team_layout">
                            <div className="label_inputs">Local</div>
                            <div className="wrapper">
                                <div className="left">
                                <FormField
                                    id={'local'}
                                    formdata={this.state.formdata.local}
                                    change={(element)=>this.updateForm(element)}
                                />    
                                </div>
                                <div>
                                <FormField
                                    id={'resultLocal'}
                                    formdata={this.state.formdata.resultLocal}
                                    change={(element)=>this.updateForm(element)}
                                />    
                                </div>
                            </div>
                        </div>
                        <div className="select_team_layout">
                            <div className="label_inputs">Away</div>
                            <div className="wrapper">
                                <div className="left">
                                <FormField
                                    id={'away'}
                                    formdata={this.state.formdata.away}
                                    change={(element)=>this.updateForm(element)}
                                />    
                                </div>
                                <div>
                                <FormField
                                    id={'resultAway'}
                                    formdata={this.state.formdata.resultAway}
                                    change={(element)=>this.updateForm(element)}
                                />    
                                </div>
                            </div>
                        </div>
                        <div className="split_fields">
                            <FormField
                                id={'referee'}
                                formdata={this.state.formdata.referee}
                                change={(element)=>this.updateForm(element)}
                            />
                            <FormField
                                id={'stadium'}
                                formdata={this.state.formdata.stadium}
                                change={(element)=>this.updateForm(element)}
                            />
                        </div>
                        <div className="split_fields last">
                            <FormField
                                id={'result'}
                                formdata={this.state.formdata.result}
                                change={(element)=>this.updateForm(element)}
                            />
                            <FormField
                                id={'final'}
                                formdata={this.state.formdata.final}
                                change={(element)=>this.updateForm(element)}
                            />
                        </div>
                        <div className="success_label">{this.state.formSuccess}</div>
                        {this.state.formError ? 
                            <div className="error_label">
                                Something is wrong
                            </div> : ''
                    }
                    <div className="admin_submit">
                        <button onClick={(event)=>this.submitForm(event)}>
                            {this.state.formType}
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
  }
}
