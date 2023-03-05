import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../apigateway";

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
    const response = await loginUser(username, password);
    if (response.status === 200) {
      console.log("Login successfull");
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    }
    else {
      // use toast to pop up notification.
    }
  }

  return (
    <div className="LoginPage">
      <input type="text" placeholder="TumID" name="kennung" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => login(username, password)}>Login</button>
    </div >
  );
}

export default LoginPage;
