import React from 'react';
import { useNavigate } from 'react-router-dom';

function Support(){
    const navigate = useNavigate();
    return(
        <div className="container p-3" style={{height:"95vh"}}>
            <p>
		        Bestehen Probleme mit dem Login, kontaktieren Sie bitte den TUM IT-Support: https://www.it.tum.de/it/it-support/ bzw. it-support@tum.de 
	        </p>
	        <p>
		        Bei sonstigen Problemen schreiben Sie bitte ein Email an zwick@tum.de.
	        </p>    
            <button className='btn btn-secondary text-start m-1' onClick={() => {navigate("/home")}}>Abbrechen</button>
        </div>
    )
}
export default Support;