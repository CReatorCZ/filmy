import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Select from "react-select";
import {options} from "../genres";

export function Films({input}) {
    const [selectedOption, setSelectedOption] = useState([])
    const state = useSelector((state) => state)

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption)
        console.log("--selectedOption:",selectedOption)
    }

    const filteredData = state.films.filter((film) => {
        console.log("-film.genre", film.genre)
        if ((selectedOption.length === 0 && (input === ""))){
            console.log("vracim vše")
            return film
        } else {
            console.log("vybírám: ", film)
            if (selectedOption.every(req => film.genre.some((gen) => gen.value === req.value && gen.label === req.label))){
                console.log("YES")
                console.log("--vybrany film:", film)
            }else {
                console.log("NO")
                return false
            }
            return film.name.toLowerCase().includes(input)
        }
    })

    console.log("filteredData--:",filteredData)


    return (
        <div>
            <div>
                <Select options={options} onChange={handleChange} isMulti/>
            </div>
            <div>
                {(filteredData.map(film => (

                    <div key={film.id} style={{border: "2px solid black"}}>
                        <Link to={`/films/${film.id}`} >
                            <h2>{film.name}({film.year})</h2>
                        </Link>
                    </div>

                )))}

            </div>
        </div>
    )
}