import { useEffect, useState } from "react";
import { logoutUser } from "../apigateway";
import { useNavigate } from "react-router-dom";
import { getModules, getUpdatedModules, getUserRole } from "../apigateway";
import axios from "axios";

function Home() {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [moduleList, setModuleList] = useState([]);
    const [updatedModuleList, setUpdatedModuleList] = useState([]);
    const [role, setRole] = useState();

    const navigate = useNavigate();
    const logout = async () => {
        const response = await logoutUser();
        if (response.status === 200) {
            setIsLoggedOut(true);
            sessionStorage.removeItem("username");
            sessionStorage.setItem("isLoggedIn", "false");
        }
    }

    const getModuleVersions = (module) => {
        return Object.keys(module["versions"]);
    }

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const modules = await getModules();
                setModuleList(modules.data);
                const updatedModules = await getUpdatedModules();
                setUpdatedModuleList(updatedModules.data);
            }
            catch (err) {
                console.log(err);
            }
        }

        const getRole = async () => {
            try {
                const response = await getUserRole();
                console.log(response);
                if (response.status === axios.HttpStatusCode.Ok) {
                    setRole(response.data);
                    sessionStorage.setItem("administration", response.data);
                }
                else {
                    setRole(null);
                }

            } catch (err) {
                console.log(err);
            }

        }

        if (isLoggedOut)
            navigate("/");
        else {
            fetchModules();
            getRole();
        }
    }, [navigate, isLoggedOut])




    return (
        <div className="container">
            <div className="container-fluid text-center d-flex flex-column" style={{ height: "100vh" }}>
                <div className="align-self-end d-flex align-items-center">
                    <h5 className="m-2">{sessionStorage.getItem("username")}</h5>
                    <button className="btn btn-danger align-self-end m-2" onClick={() => { logout() }}>Logout</button>

                </div>
                <div className="row align-items-center justify-content-center flex-fill flex-column">
                    <h3>Created Modules</h3>
                    <br />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Module Id</th>
                                <th>Module Version</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                moduleList.map((module, index) => {
                                    return getModuleVersions(module).map((version, versionIndex) => {
                                        return (<tr key={version}>
                                            <th>{index + 1}</th>
                                            <th>{module["versions"][version]["module_id"]}</th>
                                            <th>{version}</th>
                                            <th><button className="btn btn-secondary" style={{ width: "100%" }} onClick={() => { navigate("/editCreate", { state: { document_id: module["_id"], version: version } }) }}>Edit</button></th>
                                        </tr>);
                                    })
                                })
                            }
                        </tbody>
                    </table>
                    <br />
                </div>
                <div className="row align-items-center justify-content-center flex-fill flex-column">
                    <h3>Updated Modules</h3>
                    <br />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Module Id</th>
                                <th>Streichung</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                updatedModuleList.map((module, index) => {
                                    return (<tr key={index}>
                                        <th>{index + 1}</th>
                                        <th>{module["module_id"]}</th>
                                        <th>{module["streichung"] ? <b style={{ color: "red" }}>Deleted</b> : ""}</th>
                                        <th><button className="btn btn-secondary" style={{ width: "100%" }}
                                            onClick={() => { navigate("/editUpdate", { state: { document_id: module["_id"] } }) }}
                                        >Edit</button></th>
                                    </tr>);
                                })
                            }
                        </tbody>
                    </table>
                    <br />
                    <div className="row justify-content-center">
                        <button className="btn btn-success col-3 m-1" onClick={() => navigate("/createModule")}>Create Module</button>
                        <button className="btn btn-primary col-3 m-1" onClick={() => navigate("/updateModule")}>Update Module</button>
                        {role && <button className="btn btn-warning col-3 m-1" onClick={() => navigate("/overview")}>Overview</button>}
                    </div>

                </div>
            </div >
        </div>
    );
}
export default Home;