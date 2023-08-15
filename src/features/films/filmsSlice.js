import {createSlice} from "@reduxjs/toolkit";
import {options} from "../genres";

export const initialState = [
    {
        id: "Jurrasic Park",       /*id vytvorit pomocí: console.log("--",("aa bb cc").replace(/\s+/g,""))*/
        name: "Jurrasic Park",
        genre: [options[0],options[3],options[4]],  //akční, horor, thriler
        year: "1999",
        text: "blah"
    },
    {
        id: "The Simpsons",
        name: "The Simpsons",
        genre: [options[0],options[1],options[6]],  //akční, komedie, rodinný
        year: "2012",
        text: "blah blah"
    },
    {
        id: "Bohemians",
        name: "Bohemians",
        genre: [options[0],options[2],options[5],options[6]], //akční, drama, thriler, rodinný
        year: "2019",
        text: "blah blah blah"
    }]

const filmsSlice = createSlice({
    name: "films",
    initialState,
    reducers: {
        setFilms: (state, action) => {
            state.films = action.payload
            return state;
        },
        addFilm: (state, action) => {
            state.push(action.payload)
        },
        removeFilm: (state, action) => {
            console.log("STATE: ",state)
            state = state.filter(film => film.id !== action.payload)
            return state
        },
        updateFilm: (state, action) => {
            const index = state.findIndex(film => film.id === action.payload.id);
            state[index] = action.payload

        }
    }
})


export const {setFilms, addFilm, removeFilm, updateFilm} = filmsSlice.actions

export default filmsSlice.reducer