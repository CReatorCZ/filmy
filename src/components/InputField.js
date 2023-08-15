import {Field} from "react-final-form";
import React from "react";

const InputField = ({name,label,placeholder,style}) => {

    return (
        <Field name={name}>
            {({input, meta}) => (
                <div className={"field"}>
                    {label && <label>{label}</label>}
                    <input {...input} type="text"
                           style={style}
                           placeholder={placeholder}/>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
            )}
        </Field>
    )
}
export default InputField;