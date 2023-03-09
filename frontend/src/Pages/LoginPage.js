import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../apigateway";
import { toast } from 'wc-toast';
import axios from "axios";


function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn)
      navigate("/");
    else
      navigate("/home");
  }, [navigate, isLoggedIn]);


  const login = async (username, password) => {
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

  }

  return (

    <div className="container-fluid text-center d-flex flex-column" style={{ height: "100vh" }}>
      <div className="row align-items-center justify-content-center flex-fill flex-column">
        <input className="col-lg-3 col-sm-6 m-2" type="text" placeholder="Tum-Kennung" name="kennung" onChange={(e) => setUsername(e.target.value)} />
        <input className="col-lg-3 col-sm-6 m-2" type="password" placeholder="Passwort" name="password" onChange={(e) => setPassword(e.target.value)} />
        <button className="col-lg-3 col-sm-6 m-2 btn btn-secondary" onClick={() => login(username, password)}>Anmeldung</button>

      </div>


    </div>

  );
}

export default LoginPage;
