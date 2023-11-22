import { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { loginUser } from "../apigateway";
import { toast } from 'wc-toast';
import axios from "axios";
import { getCsrf, loginButtonCall, setCsrf } from "../apigateway";

function LoginPage() {

  //const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    const set_csrf = async () => {
      const csrf = await getCsrf();
      if (csrf.data.token) {
        setCsrf(csrf.data.token);
      }
    }

    set_csrf();

    const response = async () => {
      const response = await axios.get("https://modulmanager.ldv.ei.tum.de/api/auth/isAuthenticated");
      if (response.data) {
        sessionStorage.setItem("username", response.data.user.email);
        sessionStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
      }
    }

    response();
    if (!isLoggedIn)
      navigate("/");
    else
      navigate("/home");

  }, [navigate, isLoggedIn]);

  /*const login = async (username, password) => {
    try {
      const response = await loginUser(username, password);
      if (response.status === axios.HttpStatusCode.Ok) {
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
      }
    } catch (err) {
      toast.error("Tum Id or password is incorrect");
    }
  };*/

  const loginbutton = async () => {
    try {
      const response = await loginButtonCall();
      console.log(response);
      console.log(response.headers["set-cookie"]);
      if (response.status === axios.HttpStatusCode.Ok) {

      }
    } catch (err) {
      console.log(err);
    }
  };

  /*const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login(username, password);
    }
  }*/

  // <input className="col-lg-3 col-sm-6 m-2" type="text" placeholder="Tum-Kennung" name="kennung" onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyPress} />
  // <input className="col-lg-3 col-sm-6 m-2" type="password" placeholder="Passwort" name="password" onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyPress} />
  // <button className="col-lg-3 col-sm-6 m-2 btn btn-secondary" onClick={() => login(username, password)} >Anmeldung</button>

  return (

    <div className="container-fluid text-center d-flex flex-column" style={{ height: "100vh" }}>
      <div className="row align-items-center justify-content-center flex-fill flex-column">
        <div className="col-lg-3 col-sm-6 d-flex align-items-center justify-content-center mb-2">
          <img src="Logo.png" alt="TUM-Logo" className="img-fluid" style={{ maxWidth: "50px", maxHeight: "50px" }} />
          <p className="ml-2 mb-0 p-2" style={{ fontSize: "1.5rem", textAlign: "center" }}>TUM Modulmanager App</p>
        </div>
        <hr className="col-lg-3 col-sm-6" />
        <a className="col-lg-3 col-sm-6 m-2 btn btn-secondary" href="/api/auth/Shibboleth.sso/access">
          Anmeldung
        </a>
      </div>
    </div>

  );
}

export default LoginPage;
