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
        <div className="Home">
            <button onClick={() => { logout() }}>Logout</button>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Module Id</th>
                        <th>Module Version</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        moduleList.map((module, index) => {
                            return getModuleVersions(module).map((version, versionIndex) => {
                                return (<tr key={version}>
                                    <th>{index + 1}.{versionIndex + 1}</th>
                                    <th>{module["versions"][version]["module_id"]}</th>
                                    <th>{version}</th>
                                    <th><button onClick={() => { navigate("/edit", { state: { document_id: module["_id"], version: version } }) }}>Edit</button></th>
                                </tr>);
                            })
                        })
                    }
                </tbody>
            </table>
        </div >
    );
}
export default Home;