import React from "react";
import '../style/LandingPage.css';
import { Link } from "react-router-dom";



function LandingPage() {


    return (
        <div className="LandingPage">
            <Link to="/home" className="link-get-into">GET INTO</Link>
        </div>
    )
}

export default LandingPage;