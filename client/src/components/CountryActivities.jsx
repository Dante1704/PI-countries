import React from "react";
/* import { useDispatch } from "react-redux"; */
/* import { deleteActivity } from "../redux/actions"; */
import "../style/CountryActivities.css";

const CountryActivities = (props) => {

    /* const dispatch = useDispatch();

    const clickDeleteHandler = () => {
        dispatch(deleteActivity(props.id))
    }; */

    return (
        <div className="activity">
            <p className="f-z-large">id: {props.id}</p>
            <p className="f-z-large">name: {props.name}</p>
            <p className="f-z-large">difficulty: {props.difficulty} / 5</p>
            <p className="f-z-large">duration: {props.duration} minutes</p>
            <p className="f-z-large">season: {props.season}</p>
            {/* <button type="button" className="buttons" onClick={clickDeleteHandler}>Delete Activity</button> */}
        </div>
    )
};

export default CountryActivities;
