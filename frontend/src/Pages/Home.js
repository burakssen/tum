import { useEffect, useState } from "react";
import { logoutUser } from "../apigateway";
import { useNavigate } from "react-router-dom";
import { getModules } from "../apigateway";

function Home() {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [moduleList, setModuleList] = useState([]);

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
            }
            catch (err) {
                console.log(err);
            }
        }

        if (isLoggedOut)
            navigate("/");
        else {
            fetchModules();
        }
    }, [navigate, isLoggedOut])


    return (
        <div className="container">
            <div className="container-fluid text-center d-flex flex-column" style={{ height: "100vh" }}>
                <button className="btn btn-danger align-self-end m-2" onClick={() => { logout() }}>Logout</button>

                <div className="row align-items-center justify-content-center flex-fill flex-column">
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
                                            <th><button className="btn btn-warning" style={{ width: "100%" }} onClick={() => { navigate("/edit", { state: { document_id: module["_id"], version: version } }) }}>Edit</button></th>
                                        </tr>);
                                    })
                                })
                            }
                        </tbody>
                    </table>
                    <div className="row justify-content-center">
                        <button className="btn btn-success col-3 m-1" onClick={() => navigate("/createModule")}>Create Module</button>
                        <button className="btn btn-primary col-3 m-1" onClick={() => navigate("/updateModule")}>Update Module</button>

                    </div>

                </div>
            </div >
        </div>
    );
}
export default Home;