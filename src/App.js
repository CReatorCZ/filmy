import {Films} from "./features/films/Films";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {Forms} from "./features/form/Form";
import {Film} from "./features/films/Film";
import {useState} from "react";
import Select from "react-select";
import {options} from "./features/genres";

function App() {
    const [inputText, setInputText] = useState("")
    /*const pos = window.location.href === "http://localhost:3000/films"*/

    function handleChange(e){
        let lowerCaseInput = e.target.value.toLowerCase();
        setInputText(lowerCaseInput)
    }

    return (
        <Router>
            <nav style={{backgroundColor: "lightgrey", textAlign: "center"}} >
                <Link to={"/films"} style={{marginRight: "20px", fontSize: "20px"}}> Filmy</Link>
                <Link to={"/form"} style={{marginRight: "20px", fontSize: "20px"}}>Formulář</Link>
                <input onChange={handleChange} placeholder={"Vyhledat film"} style={{marginBottom: "5px"}}/>
                {/*{pos &&<Select options={options} isMulti/>}*/}
            </nav>
            <Routes>
                <Route exact path={"/films"} element={<Films input={inputText}/>}/>
                <Route path={"/form"} element={<Forms/>}/>
                <Route path={"/films/:id"} element={<Film/>}/>
            </Routes>
        </Router>

    );
}

export default App;


/*
<Form onSubmit={onSubmit}
      validate={values => {
          const errors = {};

          console.log("ERRORS: ",errors);

          return errors;
      }}
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
