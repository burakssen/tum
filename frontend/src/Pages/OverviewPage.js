import { useState, useEffect } from "react";
import { getAllModules } from "../apigateway";
import { useNavigate } from "react-router-dom";



function OverviewPage() {

    const navigate = useNavigate();
    const [modules, setModules] = useState();

    const [createdStatusRows, setCreatedStatusRows] = useState([]);
    const [updatedStatusRows, setUpdatedStatusRows] = useState([]);



    useEffect(() => {
        const fetchAllModules = async () => {
            const response = await getAllModules();
            setModules(response.data);
        }

        fetchAllModules();
    }, [])


    useEffect(() => {
        if (modules) {
            let createdStatus = []
            modules.createdModules.forEach((module) => {
                createdStatus[module.document_id] = [];
                let createdIndex = 0;
                Object.keys(module["status"]).forEach((key, index) => {
                    createdStatus[module.document_id].push(<div key={index} className="col-1 text-dark p-0">{key}</div>);
                    createdIndex += 1;
                });

                for (let i = createdIndex; i < 8; i++) {
                    createdStatus[module.document_id].push(<div key={i} className="col-1 p-0" style={{ color: "lightgrey" }}>{i + 1}</div>)
                }
            });

            let updatedStatus = []
            modules.updatedModules.forEach((module) => {
                updatedStatus[module._id] = [];
                let updatedIndex = 0;
                Object.keys(module["status"]).forEach((key, index) => {
                    updatedStatus[module._id].push(<div key={index} className="col-1 text-dark p-0">{key}</div>);
                    updatedIndex += 1;
                });
                for (let i = updatedIndex; i < 8; i++) {
                    updatedStatus[module._id].push(<div key={i} className="col-1 p-0" style={{ color: "lightgrey" }}>{i + 1}</div>)
                }
            });


            setCreatedStatusRows(createdStatus);
            setUpdatedStatusRows(updatedStatus);
        }


    }, [modules])

    return (
        <div className="container">
            <div className="container-fluid text-center d-flex flex-column" >
                <div className="col-lg-12 col-sm-12 pt-5"><h2>Übersichtseite</h2></div>
                <div className="col-12 justify-content-start align-items-start" style={{ padding: "5vh 0vh 0vh 0vh" }}>
                    <table className="table table-borderless justify-content-start align-items-start">
                        <thead>
                            <tr>
                                <td className="text-start align-top p-1">1</td>
                                <td className="text-start align-top p-1">Erfasst</td>

                                <td className="text-start align-top p-1">2</td>
                                <td className="text-start align-top p-1">TUMonline angelegt</td>

                                <td className="text-start align-top p-1">3</td>
                                <td className="text-start align-top p-1">Studienkommission</td>

                                <td className="text-start align-top p-1">4</td>
                                <td className="text-start align-top p-1">Teaching Council</td>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <td className="text-start align-top p-1">5</td>
                                <td className="text-start align-top p-1">TUMonline fertiggestellt</td>

                                <td className="text-start align-top p-1">6</td>
                                <td className="text-start align-top p-1">Modulliste geändert</td>

                                <td className="text-start align-top p-1">7</td>
                                <td className="text-start align-top p-1">Web geändert</td>

                                <td className="text-start align-top p-1">8</td>
                                <td className="text-start align-top p-1">Studienrichtungsempfehlung</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div className="row align-items-center justify-content-center flex-column pt-5" style={{ padding: "5vh 0vh 0vh 0vh" }}>
                    {
                        modules &&
                        <div>
                            <h3 className="text-start">Modul-Neuanlagen ({modules.createdModules.length})</h3>
                            <br />
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="text-start" style={{ width: "40%" }}>Modultitel</th>
                                        <th className="text-start" style={{ width: "20%" }}>Module-Nummer</th>
                                        <th className="text-start">Antragsteller</th>
                                        <th className="text-start" style={{ width: "10%" }}>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        modules.createdModules.map((module, index) => {
                                            return (<tr key={index}>
                                                <th className="text-start p-3" style={{ fontWeight: "normal" }}>{module["titel_de"]}</th>
                                                <th className="text-start p-3" style={{ fontWeight: "normal" }}>{module["module_id"]}</th>
                                                <th className="text-start p-3" style={{ fontWeight: "normal" }}>{module["antragsteller"]}</th>
                                                <th className="row align-items-start justify-content-start p-3">
                                                    {createdStatusRows[module["document_id"]]}
                                                </th>
                                                <th><button className="btn btn-secondary" onClick={() => { navigate("/saveOverview", { state: { document_id: module["document_id"], pageType: "create" } }) }}>Bearbeiten</button></th>
                                            </tr>);
                                        })
                                    }
                                </tbody>
                            </table>
                            <br />
                        </div>}
                </div>
                <div className="row align-items-center justify-content-center  flex-column" style={{ padding: "5vh 0vh 0vh 0vh" }}>
                    {
                        modules && <div>
                            <h3 className="text-start">Modul-Änderungen ({modules.updatedModules.length})</h3>
                            <br />
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="text-start" style={{ width: "40%" }}>Modultitel</th>
                                        <th className="text-start" style={{ width: "20%" }}>Modul-Nummer</th>
                                        <th className="text-start">Antragsteller</th>
                                        <th className="text-start" style={{ width: "10%" }}>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        modules.updatedModules.map((module, index) => {
                                            return (<tr key={index}>
                                                <th className="text-start p-3" style={{ fontWeight: "normal" }}>{module["titel_de"]}</th>
                                                <th className="text-start p-3" style={{ fontWeight: "normal" }}>{module["module_id"]}</th>
                                                <th className="text-start p-3" style={{ fontWeight: "normal" }}>{module["antragsteller"]}</th>
                                                <th className="row align-items-start justify-content-start p-3">
                                                    {updatedStatusRows[module["_id"]]}
                                                </th>
                                                <th><button className="btn btn-secondary" onClick={() => { navigate("/saveOverview", { state: { document_id: module["_id"], pageType: "update" } }) }} > Bearbeiten</button></th>
                                            </tr>);
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    }


                </div>
                <button className="col-3 btn btn-secondary m-4 align-self-end" onClick={() => { navigate("/home") }}>Abbrechen</button>
                <br />
            </div >
        </div >
    );
}

export default OverviewPage;