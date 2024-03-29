import { useEffect, useState } from "react";
import { logoutUser } from "../apigateway";
import { useNavigate } from "react-router-dom";
import { getModules, getUpdatedModules, getUserRole, deleteDocument } from "../apigateway";
import { useCookies } from "react-cookie";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function Home() {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [moduleList, setModuleList] = useState([]);
    const [updatedModuleList, setUpdatedModuleList] = useState([]);
    const [roles, setRoles] = useState([]);
    const [tumKennung, setTumKennung] = useState("");
    const [show, setShow] = useState(false);
    const [modulToDelete, setModulToDelete] = useState("");

    const navigate = useNavigate();
    const logout = async () => {
        const response = await logoutUser();
        if (response.status === 200) {
            setIsLoggedOut(true);
            sessionStorage.removeItem("user");
            sessionStorage.setItem("isLoggedIn", "false");
            navigate("/");
        }

    }

    const getModuleVersions = (module) => {
        return Object.keys(module["versions"]);
    }

    useEffect(() => {

        const user = JSON.parse(sessionStorage.getItem("user"));
        setTumKennung(user.tumKennung);


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

        setRoles(user.roles);

        if (isLoggedOut)
            navigate("/");
        else {
            fetchModules();
        }
    }, [navigate, isLoggedOut])

    const delDocument = async (document_id, document_type, rev) => {
        try {
            console.log(document_id, document_type, rev);
            const response = await deleteDocument(document_id, document_type, rev);
            if (response.status === axios.HttpStatusCode.Ok) {
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="container">
            <div className="container-fluid text-center d-flex flex-column" >
                <div className="align-self-end d-flex align-items-center pb-5">
                    <h5 className="m-2">{tumKennung}</h5>
                    <button className="btn btn-secondary align-self-end m-2" onClick={() => { logout() }}>Abmelden</button>

                </div>
                <div className="row-12 justify-content-start align-items-center d-flex flex-column align-self-start pb-5">
                    <button className="btn btn-secondary col-10 text-start m-1" onClick={() => navigate("/createModule")}>Neues Modul beantragen</button>
                    <button className="btn btn-secondary col-10 text-start m-1" onClick={() => navigate("/updateModule")}>Änderung bei bereits bestehendem Modul beantragen</button>
                    {/*
                        TODO: change this to a role based system
                    */ roles.includes("staff") &&
                        <div className="col-10 m-1">
                            <button className="btn btn-secondary text-start col-12 mb-1" onClick={() => navigate("/modulNummerManager")}>Bestehende Module anwenden</button>
                            <button className="btn btn-secondary text-start col-12 mt-1" onClick={() => navigate("/overview")}>Modulübersicht</button>
                        </div>
                    }
                </div>
                <div className="row align-items-center justify-content-center flex-column pt-5 ">
                    <h3 className="text-start">Modul-Neuanlagen ({moduleList.length})</h3>
                    <br />
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-start" style={{ width: "20%" }}>Modul-Nummer</th>
                                <th className="text-start" style={{ width: "100%" }}>Modul-Titel</th>
                                <th style={{ width: "100%" }}></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                moduleList.map((module, index) => {
                                    return getModuleVersions(module).map((version, versionIndex) => {
                                        return (<tr key={version}>
                                            <th className="text-start" style={{ fontWeight: "normal" }}>{module["versions"][version]["module_id"]}</th>
                                            <th className="text-start" style={{ fontWeight: "normal" }}>{module["versions"][version]["titel_de"]}</th>
                                            <th><button className="btn btn-secondary m-0" style={{ width: "100%" }} onClick={() => { navigate("/editCreate", { state: { document_id: module["_id"], version: version } }) }}>Ändern</button></th>
                                            {/*<th><button className="btn btn-secondary m-0" style={{ width: "100%" }} onClick={() => { delDocument(module["_id"], "created_modules", module["_rev"]) }}>Löschen</button></th>*/}
                                            <th><button className="btn btn-secondary m-0" style={{ width: "100%" }} onClick={() => { setShow(true); setModulToDelete({ module: module, module_type: "created_modules", version: module["versions"][version] }) }}>Löschen</button></th>
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
                    <h3 className="text-start">Modul-Änderungen ({updatedModuleList.length})</h3>
                    <br />
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-start" style={{ width: "20%" }}>Modul-Nummer</th>
                                <th className="text-start" style={{ width: "100%" }}>Modul-Titel</th>
                                <th style={{ width: "100%" }}></th>
                                <th style={{ width: "100%" }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                updatedModuleList.map((module, index) => {

                                    return (<tr key={index}>
                                        <th className="text-start" style={{ fontWeight: "normal" }}>{module["module_id"]}</th>
                                        <th className="text-start" style={{ fontWeight: "normal" }}>{module["titel_de"]}</th>
                                        <th><button className="btn btn-secondary" style={{ width: "100%" }}
                                            onClick={() => { navigate("/editUpdate", { state: { document_id: module["_id"] } }) }}
                                        >Ändern</button></th>
                                        <th><button className="btn btn-secondary" style={{ width: "100%" }}
                                            onClick={() => { setShow(true); setModulToDelete({ module: module, module_type: "updated_modules", version: module }) }}
                                        >Löschen</button></th>
                                    </tr>);
                                })
                            }
                        </tbody>
                    </table>
                    <br />

                    <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Vorhandene Modulnummern löschen</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p></p>
                            {
                                modulToDelete &&
                                <div className='d-flex flex-row'>
                                    <div className='col list-group-item m-2'>
                                        <div className='d-flex flex-row align-items-center'>
                                            <div className='col-5'>{modulToDelete.version["module_id"]}</div>
                                            <div className='col-5'>{modulToDelete.version["titel_de"]}</div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)}>
                                Abbrechen
                            </Button>
                            <Button variant="secondary" onClick={() => {
                                delDocument(modulToDelete.module["_id"], modulToDelete.module_type, modulToDelete.module["_rev"]);
                                setShow(false);
                            }}>
                                Modul Nummern Löschen
                            </Button>
                        </Modal.Footer>
                    </Modal>


                </div>
            </div >
        </div>
    );
}
export default Home;