import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, createActivity, cleanMessages } from "../redux/actions";
import "../style/ActivityForm.css";

const ActivityForm = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCountries());
    }, [dispatch]);

    //en este estado local me guardo lo que voy obteniendo de los input
    const [input, setInput] = useState({
        name: "", //es el nombre de la actividad
        difficulty: "",
        duration: "",
        season: "",
        countryId: [] //aca voy a pushear cada vez que clickeo un pais
    });

    const errorMessage = useSelector(state => state.errorMessage);
    const successMessage = useSelector(state => state.successMessage);

    const allCountries = useSelector(state => state.countries);
    //acomodo los paises para mostrar como opciones para elegir
    const allCountriesFlatted = allCountries.flat().sort(function (currentCountry, nextCountry) {
        if (currentCountry.name < nextCountry.name) {
            return -1;
        }
        if (currentCountry.name > nextCountry.name) {
            return 1;
        }
        return 0;
    });


    /////////////////HANDLERS DE EVENTOS Y VALIDADORES
    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        const regExp = /^[a-z\s]+$/g; /* "^[a-z]+$" */; //quiero que solo lea letras en minuscula y espacio
        if (!value.match(regExp)) {
            alert("invalid name format");
            setInput({
                ...input,
                [property]: ""
            })
        }
        else {
            setInput({
                ...input,
                [property]: value
            })
        }
    };

    const clickHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        if (property === "countryId") {
            if (!input.countryId.includes(value)) {
                setInput({
                    ...input,
                    countryId: [...input.countryId, value]
                })
            }
        }
        else if (property === "duration" && value > 120) {
            alert("maximum duration exceeded");
            setInput({
                ...input,
                [property]: ""
            })
        } else
            setInput({
                ...input,
                [property]: value
            })
    };

    const clickCleanHandler = (event) => {
        setInput({
            ...input,
            name: "",
            duration: "",
            countryId: []

        });
        dispatch(cleanMessages())
    };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(createActivity(input));
        setInput({
            name: "",
            difficulty: "",
            duration: "",
            season: "",
            countryId: []
        })
    };
    const clickGoHomeHandler = (event) => {
        dispatch(cleanMessages());
    };
    ///////////////////////////////////

    return (
        <div className="activity-form-container">
            <div className="activity-form">

                <form action="" onSubmit={submitHandler}>
                    <fieldset>
                        <legend><h2>CREATE A NEW ACTIVITY</h2></legend>
                        <div>
                            <label htmlFor="name"><h4>ACTIVITY:</h4></label>
                            <input type="text" name="name" id="name" value={input.name} onChange={changeHandler} required />
                        </div>
                        <h4>DIFFICULTY:</h4>
                        <div className="difficulty">
                            <input type="radio" name="difficulty" id="1" value="1" onClick={clickHandler} required />
                            <label htmlFor="1">1</label>

                            <input type="radio" name="difficulty" id="2" value="2" onClick={clickHandler} />
                            <label htmlFor="2">2</label>

                            <input type="radio" name="difficulty" id="3" value="3" onClick={clickHandler} />
                            <label htmlFor="3">3</label>

                            <input type="radio" name="difficulty" id="4" value="4" onClick={clickHandler} />
                            <label htmlFor="4">4</label>

                            <input type="radio" name="difficulty" id="5" value="5" onClick={clickHandler} />
                            <label htmlFor="5">5</label>
                        </div>

                        <div>
                            <label htmlFor="duration"><h4>DURATION (MINUTES):</h4></label>
                            <input type="number" name="duration" id="duration" value={input.duration} onChange={clickHandler} required />
                        </div>
                        <h4>SEASON:</h4>
                        <div className="season">
                            <input type="radio" name="season" value="Summer" id="season" onClick={clickHandler} required />
                            <label htmlFor="season" className="f-z-large">Summer</label>

                            <input type="radio" name="season" value="Autumn" id="season" onClick={clickHandler} />
                            <label htmlFor="season" className="f-z-large">Autumn</label>

                            <input type="radio" name="season" value="Winter" id="season" onClick={clickHandler} />
                            <label htmlFor="season" className="f-z-large">Winter</label>

                            <input type="radio" name="season" value="Spring" id="season" onClick={clickHandler} />
                            <label htmlFor="season" className="f-z-large">Spring</label>
                        </div>
                        <label htmlFor="countries"><h4>CHOOSE COUNTRY(IES):</h4></label>

                        <select name="countryId" id="countries" onChange={clickHandler} required>
                            <option>--Please choose an option--</option>
                            {
                                allCountriesFlatted?.map(
                                    (country, index) => {
                                        const countryId = `${country.id}`
                                        return (
                                            <option key={index} value={countryId}>{country.name}</option>
                                        )
                                    }
                                )
                            }
                        </select>
                        <div>
                            <p>SELECTED COUNTRIES:</p>
                            {
                                input.countryId.map((country, index) => {
                                    return (
                                        <span key={index}> {country} </span>
                                    )
                                })
                            }
                        </div>
                        <button type="submit" className="buttons">Create!</button>
                        <button type="reset" className="buttons" onClick={clickCleanHandler}>Clean Filters</button>
                    </fieldset>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <Link to="/home" className="buttons btn-home" onClick={clickGoHomeHandler}>Go Back Home</Link>

            </div >
        </div>
    )
};

export default ActivityForm;


