import { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { loginUser } from "../apigateway";
import { toast } from 'wc-toast';
import axios from "axios";
import { getCsrf, loginButtonCall, setCsrf } from "../apigateway";

function LoginPage() {
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

    const auth = async () => {
      const response = await axios.get("https://modulmanager.ldv.ei.tum.de/api/auth/isAuthenticated");
      if (response.status === 200 && response.data) {
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        sessionStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
      }
    }

    auth();
    if (!isLoggedIn)
      navigate("/");
    else {
      toast.success("Erfolgreich angemeldet", { duration: 2000 });
      navigate("/home");
    }

  }, [navigate, isLoggedIn]);

  return (
    <div className="container-fluid text-center d-flex flex-column" style={{ height: "80vh" }}>
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
