import React from 'react';

const FormField = ({formdata,id,change}) => {

    const showError = () => {
        let errorMesage = <div className="error_label">
            {
                formdata.validation && !formdata.valid ?
                    formdata.validationMessage
                :null
            }
        </div>
        return errorMesage;
    }

    const renderTemplate = () => {
        let formTemplate = null;
        switch (formdata.element){
            case('input'):
                formTemplate = (
                    <div>
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            onChange={(event)=> change({event,id})}
                            style={{color:'black'}}
                        />
                        { showError() }
                    </div>
                )
                break;
            default:
                formTemplate = null;
        }
        return formTemplate;
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default FormField;