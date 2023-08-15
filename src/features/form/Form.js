import React from "react";
import {Field, Form} from "react-final-form";
import {useDispatch, useSelector} from "react-redux";
import {addFilm} from "../films/filmsSlice";
import InputField from "../../components/InputField";
import TextareaField from "../../components/TextareaField";
import {useNavigate} from "react-router-dom";
import Select from "react-select";
import {options} from "../genres";

export function Forms() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const state = useSelector((state) => state)
    const refresh = () => window.location.reload(true)

    const onSubmit = (event) => {
        console.log("odesláno")
        if (!event.name || !event.genre || !event.releaseDate || !event.description)
        {return alert("nevyplnili jste všechny položky")}

        console.log("state.film[0]",state.films[0])
        console.log("event.name", event.name)
        if (state.films.find(film => film.id === event.name)){
            console.log("TRUE FOUND SAME FILM")
            alert("Zadali jste duplicitní film")
            refresh();
        } else {
            dispatch(addFilm({
                id: event.name,
                name: event.name,
                genre: event.genre,
                year: event.releaseDate,
                text: event.description
            }))
            navigate("/films")
        }

    }

    const customStyle = {
        control: (base) => ({
            ...base,
            width: 265,

        })
    }


    return (
        <div>
            <Form onSubmit={onSubmit}
                  render={({handleSubmit, form, values}) => (
                      <form onSubmit={handleSubmit}>

                          <InputField name={"name"}
                                      label={"Název filmu"}
                                      style={{marginLeft: "4px"}}
                                      placeholder={"Jurassic Park"}/>

                          <Field name={"genre"}>
                              {({input, meta}) => (
                                  <div className={"field"}>
                                      <label>Žánr filmu </label>
                                      <Select options={options} {...input}
                                              className={"basic-multi-select"}
                                              isMulti
                                              styles={customStyle}/>
                                      {meta.error && meta.touched && <span>{meta.error}</span>}
                                  </div>
                              )}
                          </Field>


                          {/*<InputField name={"genre"}
                                      label={"Žánr filmu"}
                                      style={{marginLeft: "16px"}}
                                      placeholder={"horor"}/>*/}

                          <InputField name={"releaseDate"}
                                      label={"Rok vydání"}
                                      style={{marginLeft: "11px"}}
                                      placeholder={"2004"}/>

                          <TextareaField name={"description"}
                                         label={"Popis filmu"}
                                         placeholder={"Tell us something about the film"}
                                         style={{marginLeft: "10px"}} />

                          <button>ADD</button>
                      </form>

                  )}/>

        </div>
    )
}


/*
<Form onSubmit={onSubmit}
      render={({handleSubmit, form, submitting, values, touched}) => (

          <form onSubmit={handleSubmit}>

              <Field name="firstname">
                  {({input, meta}) => (
                      <div className={"field"}>
                          <label>Jméno:</label>
                          <input {...input} type="text"
                                 className={(meta.error && meta.touched) ? "cervenejInput" : null}
                                 placeholder="Jméno"/>
                          {meta.error && meta.touched && <span>{meta.error}</span>}
                      </div>
                  )}
              </Field>

              <Field name="bornDate" format={value => {
                  /!* console.log("FORMAT", value)*!/
                  if (!value) return undefined
                  let date = new Date();
                  let split = value.split(".")
                  /!*console.log(split)*!/
                  date.setDate(split[0])
                  date.setMonth(parseInt(split[1]) - 1)
                  date.setFullYear(split[2])
                  return date;
              }} parse={value => {
                  //console.log(value)
                  //console.log("PARSE VALUE", format(value, "d.M.yyyy"))
                  return format(value, "d.M.yyyy")
              }}>
                  {({input, meta}) => {
                      //console.log("VALUE", input.value)
                      return (
                          <div className={"field"}>
                              <label className={"labelComp"}>
                                  Datum narození:
                              </label>
                              <div>
                                  <DatePicker {...input}
                                              selected={input.value}
                                              dateFormat={"dd.MM.yyyy"}
                                              onChange={(date) => input.onChange(date)}
                                              maxDate={new Date()}
                                              minDate={new Date("20.10.1900")}
                                              placeholderText={"Datum narození"}
                                              autoComplete={"off"}
                                              className={(meta.error && meta.touched) ? "cervenejInput" : null}

                                  />

                              </div>
                              {meta.error && meta.touched && <span>{meta.error}</span>}
                          </div>
                      )
                  }}
              </Field>





              <div className={"btn"}>
                  <button type={"submit"} disabled={submitting}>Odeslat</button>
              </div>

              <pre>{JSON.stringify(values, undefined, 2)}</pre>
          </form>
      )}/>*/
