import { useState, useEffect } from "react";
import { getAllModules, getAllStatus } from "../apigateway";
import { useNavigate } from "react-router-dom";


function OverviewPage() {

    const navigate = useNavigate();
    const [modules, setModules] = useState();
    const [createdStatus, setCreatedStatus] = useState();
    const [updatedStatus, setUpdatedStatus] = useState();
    const [createdStatusRows, setCreatedStatusRows] = useState([]);
    const [updatedStatusRows, setupdatedStatusRows] = useState([]);



    useEffect(() => {
        const fetchAllModules = async () => {
            const response = await getAllModules();
            setModules(response.data);
        }

        const fetchAllStatus = async () => {
            const response = await getAllStatus();
            setCreatedStatus(response.data.createdStatus);
            setUpdatedStatus(response.data.updatedStatus);
        }

        fetchAllModules();
        fetchAllStatus();
    }, [])


    useEffect(() => {
        if (createdStatus) {
            const statusRows = {};
            Object.keys(createdStatus).forEach((key) => {
                statusRows[key] = [];
                let lastIndex = 0;
                createdStatus[key].forEach((value, index) => {
                    statusRows[key].push(<div className="col-1 p-0">{value}</div>);
                    lastIndex = index + 1;
                });

                for (let i = lastIndex; lastIndex < 8; lastIndex++) {
                    statusRows[key].push(<div className="col-1 p-0 text-secondary">{i}</div>);
                }
            });
            console.log(statusRows);
            setCreatedStatusRows(statusRows);

        }

    }, [createdStatus, updatedStatus])

    return (
        <div className="container">
            <div className="container-fluid text-center d-flex flex-column" style={{ height: "100vh" }}>
                <div className="col-lg-12 col-sm-12 pt-5"><h2>Overview Page</h2></div>
                <div className="row align-items-center justify-content-center flex-fill flex-column">
                    <h3>Created Modules</h3>
                    <br />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Modultitel</th>
                                <th>Modulenummer</th>
                                <th>Antragsteller</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                modules && modules.createdModules.map((module, index) => {
                                    return (<tr key={index}>
                                        <th>{index + 1}</th>
                                        <th>{module["titel_de"]}</th>
                                        <th>{module["module_id"]}</th>
                                        <th>{module["antragsteller"]}</th>
                                        <th className="row align-items-center justify-content-center">
                                            {console.log(module["document_id"])}
                                        </th>
                                    </tr>);
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

                                /*updatedModuleList.map((module, index) => {
                                    return (<tr key={index}>
                                        <th>{index + 1}</th>
                                        <th>{module["module_id"]}</th>
                                        <th>{module["streichung"] ? <b style={{ color: "red" }}>Deleted</b> : ""}</th>
                                        <th><button className="btn btn-secondary" style={{ width: "100%" }}
                                            onClick={() => { navigate("/editUpdate", { state: { document_id: module["_id"] } }) }}
                                        >Edit</button></th>
                                    </tr>);
                                })*/
                            }
                        </tbody>
                    </table>


                </div>
            </div >
        </div>
    );
}

export default OverviewPage;