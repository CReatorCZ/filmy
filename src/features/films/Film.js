import React, {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {removeFilm, updateFilm} from "./filmsSlice";
import {Form} from "react-final-form";
import InputField from "../../components/InputField";
import TextareaField from "../../components/TextareaField";
import Select from "react-select";
import {options} from "../genres";

export function Film() {
    const state = useSelector((state) => state)
    const {id} = useParams()
    const film = state.films.find(film => film.id === id)
    const genreOptions = film.genre.map(genre => {
        return {value: genre.value, label: genre.label}
    })
    const [updating, setUpdating] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState(genreOptions)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("ID: ", id)
    console.log("film: ", film)


    if (!film) {
        return <div>No film found</div>
    }

    const handleRemove = () => {
        let text = `Are you sure you want to delete ${film.name.toUpperCase()}?`
        if (window.confirm(text) === true) {
            console.log("mažu")
            console.log("ID: ", id)
            dispatch(removeFilm(id))

            navigate("/films")
        } else {
            console.log("nic")
        }
    }

    const handleGenreChange = (selectedGenres) => {
        console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv", selectedGenres)
        const newSelectedGenres = selectedGenres.map((option) => {
            return {value: option.value, label: option.label}
        })
        setSelectedGenres(newSelectedGenres)
    }

    const onSubmit = (e) => {
        console.log("--")
        console.log(e)
        console.log("--")
        dispatch(updateFilm({
            ...film,
            ...e,
            genre: selectedGenres
        }))
    }




    return (
        <div>
            <Form onSubmit={onSubmit}
                  render={({handleSubmit, values}) => (
                      <form onSubmit={handleSubmit}>

                          {console.log("-values-", values)}

                          <h1>{updating ? "název filmu: " : ""}{!updating ? film.name :
                              <InputField name={"name"} placeholder={film.name}/>}</h1>

                          {console.log("ssssss",film.genre)}

                          <h2>žánr: {
                              !updating ? Object.entries(film.genre).map(([key, val]) =>(

                                  <span key={val.value}>{!(key==="0") ? ", " : ""}{val.value}</span>)) :
                                  <Select options={options}
                                          name={"genres"}
                                          isMulti
                                          onMenuOpen={()=> console.log("OPEN")}
                                          onChange={handleGenreChange}
                                          defaultValue={()=>genreOptions}/>
                          }</h2>

                          <h2>rok vydání: {!updating ? film.year :
                              <InputField name={"year"} placeholder={film.year}/>}</h2>
                          <h2>popis filmu: {!updating ? film.text :
                              <TextareaField name={"text"} placeholder={film.text}/>}</h2>

                          <button type={"submit"} onClick={() => setUpdating(false)} hidden={!updating}
                                  style={{width: "150px"}}>CONFIRM UPDATE
                          </button>
                      </form>
                  )}/>

            <button onClick={handleRemove} style={{width: "75px"}}>REMOVE</button>
            <button onClick={() => setUpdating(true)} disabled={updating} style={{width: "75px"}}>UPDATE</button>

        </div>
    )
}