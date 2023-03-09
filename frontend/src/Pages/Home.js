import { useEffect, useState } from "react";
import { logoutUser } from "../apigateway";
import { useNavigate } from "react-router-dom";
import { getModules, getUpdatedModules, getUserRole, deleteDocument } from "../apigateway";
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
                console.log(modules);
                setModuleList(modules.data);
                const updatedModules = await getUpdatedModules();
                setUpdatedModuleList(updatedModules.data);
                console.log(updatedModules);
            }
            catch (err) {
                console.log(err);
            }
        }

        const getRole = async () => {
            try {
                const response = await getUserRole();
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

    const delDocument = async (document_id, rev) => {
        try {
            const response = await deleteDocument(document_id, rev);
            if (response.status === axios.HttpStatusCode.Ok) {
                window.location.reload(false);
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="container">
            <div className="container-fluid text-center d-flex flex-column" style={{ height: "100vh" }}>
                <div className="align-self-end d-flex align-items-center pb-5">
                    <h5 className="m-2">{sessionStorage.getItem("username")}</h5>
                    <button className="btn btn-danger align-self-end m-2" onClick={() => { logout() }}>Abmelden</button>

                </div>
                <div className="row-12 justify-content-start align-items-center d-flex flex-column align-self-start pb-5">
                    <button className="btn btn-success col-10  m-1" onClick={() => navigate("/createModule")}>Neues Modul beantragen</button>
                    <button className="btn btn-primary col-10 m-1" onClick={() => navigate("/updateModule")}>Änderung bei bereits bestehendem Modul beantragen</button>
                    {role && <button className="btn btn-warning col-10 m-1" onClick={() => navigate("/overview")}>Modulübersicht</button>}
                </div>
                <div className="row align-items-center justify-content-center flex-column pt-5 ">
                    <h3 className="text-start">Modul-Neuanlagen</h3>
                    <br />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Modul-Nummer</th>
                                <th>Modul-Titel</th>
                                <th></th>
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
                                            <th>{module["versions"][version]["titel_de"]}</th>
                                            <th><button className="btn btn-secondary" style={{ width: "100%" }} onClick={() => { navigate("/editCreate", { state: { document_id: module["_id"], version: version } }) }}>Ändern</button></th>
                                            <th><button className="btn btn-danger" style={{ width: "100%" }} onClick={() => { delDocument(module["_id"], module["_rev"]) }}>Löschen</button></th>

                                        </tr>);
                                    })
                                })
                            }
                        </tbody>
                    </table>
                    <br />
                </div>
                <div className="p-5"></div>
                <div className="row align-items-center justify-content-center flex-column pt-5">
                    <h3 className="text-start">Modul-Änderungen</h3>
                    <br />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Modul-Nummer</th>
                                <th>Modul-Titel</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                updatedModuleList.map((module, index) => {

                                    return (<tr key={index}>
                                        <th>{index + 1}</th>
                                        <th>{module["module_id"]}</th>
                                        <th>{module["titel_de"]}</th>
                                        <th><button className="btn btn-secondary" style={{ width: "100%" }}
                                            onClick={() => { navigate("/editUpdate", { state: { document_id: module["_id"] } }) }}
                                        >Ändern</button></th>
                                        <th><button className="btn btn-danger" style={{ width: "100%" }}
                                            onClick={() => { delDocument(module["_id"], module["_rev"]) }}
                                        >Löschen</button></th>
                                    </tr>);
                                })
                            }
                        </tbody>
                    </table>
                    <br />


                </div>
            </div >
        </div>
    );
}
export default Home;