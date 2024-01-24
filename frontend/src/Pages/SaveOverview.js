import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-select";

import { getMeta, getModuleVersion, updateStatus } from "../apigateway";
import axios from "axios";

function SaveOverview() {
    const { state } = useLocation();
    const { document_id, pageType } = state;

    const navigate = useNavigate();

    const [currentModule, setCurrentModule] = useState();
    const [meta, setMeta] = useState();


    const [module_id, setModule_id] = useState('');
    const [version, setVersion] = useState('');
    const [antragsteller, setAntragsteller] = useState('');
    const [modulverantwortlicher, setModulverantwortlicher] = useState('');
    const [semester_start, setSemester_start] = useState('');
    const [titel_de, setTitel_de] = useState('');
    const [titel_en, setTitel_en] = useState('');
    const [dozenten, setDozenten] = useState('');
    const [sws_v, setSws_v] = useState('');
    const [sws_u, setSws_u] = useState('');
    const [sws_p, setSws_p] = useState('');
    const [stunden_eigenstudium, setStunden_eigenstudium] = useState('');
    const [credits, setCredits] = useState('');

    const [streichung, setStreichung] = useState(false);

    const [type, setType] = useState([]);
    const [studiengaenge, setStudiengaenge] = useState([]);
    const [semester, setSemester] = useState([]);

    const [abgestimmt_mit, setAbgestimmt_mit] = useState('');
    const [zuordnung_coc, setZuordnung_coc] = useState('');
    const [modulbeschreibung_liegt_vor, setModulbeschreibung_liegt_vor] = useState(false);

    const [checkBoxes, setCheckBoxes] = useState([
        { id: 1, title: "In Tool/Datenbank erfasst:", checked: false, disabled: false, data: { datum: "", editor: "" } },
        { id: 2, title: "In TUMonline angelegt", checked: false, disabled: false, data: { datum: "", editor: "" } },
        { id: 3, title: "In Studienkommission verabschiedet", checked: false, disabled: false, data: { datum: "", editor: "" } },
        { id: 4, title: "In Teaching council verabschiedet", checked: false, disabled: false, data: { datum: "", editor: "" } },
        { id: 5, title: "In TUMonline fertiggestellt", checked: false, disabled: false, data: { datum: "", editor: "" } },
        { id: 6, title: "Auf Modulliste geändert", checked: false, disabled: false, data: { datum: "", editor: "" } },
        { id: 7, title: "Im Web geändert", checked: false, disabled: false, data: { datum: "", editor: "" } },
        { id: 8, title: "In Studienrichtungsempfehlungen", checked: false, disabled: false, data: { datum: "", editor: "" } },
    ])
    const [user, setUser] = useState();


    useEffect(() => {

        setUser(JSON.parse(sessionStorage.getItem("user")));

        const fetchMeta = async () => {
            try {
                const metaData = await getMeta();
                setMeta(metaData.data);
            }
            catch (err) {
                console.log(err);
            }
        }

        const fetchModule = async () => {
            try {
                const module = await getModuleVersion(document_id, "", pageType);
                setCurrentModule(module.data);
            }
            catch (err) {
                console.log(err);
            }
        }

        fetchModule();
        fetchMeta();
    }, [document_id, pageType]);

    useEffect(() => {

        if (currentModule) {
            let cModule = "";
            if (pageType === "create")
                cModule = currentModule[Object.keys(currentModule)[0]];
            else
                cModule = currentModule;

            cModule["module_id"] ? setModule_id(cModule["module_id"]) : setModule_id("");
            Object.keys(currentModule)[0] ? setVersion(Object.keys(currentModule)[0]) : setVersion("");
            cModule["antragsteller"] ? setAntragsteller(cModule["antragsteller"]) : setAntragsteller("");

            cModule["modulverantwortlicher"] ? setModulverantwortlicher(cModule["modulverantwortlicher"]) : setModulverantwortlicher("");
            cModule["semester_start"] ? setSemester_start(cModule["semester_start"]) : setSemester_start("");
            cModule["titel_de"] ? setTitel_de(cModule["titel_de"]) : setTitel_de("");
            cModule["titel_en"] ? setTitel_en(cModule["titel_en"]) : setTitel_en("");
            cModule["dozent"] ? setDozenten(cModule["dozent"]) : setDozenten("");
            cModule["sws_v"] ? setSws_v(cModule["sws_v"]) : setSws_v("");
            cModule["sws_u"] ? setSws_u(cModule["sws_u"]) : setSws_u("");
            cModule["sws_p"] ? setSws_p(cModule["sws_p"]) : setSws_p("");
            cModule["stunden_eigenstudium"] ? setStunden_eigenstudium(cModule["stunden_eigenstudium"]) : setStunden_eigenstudium("");
            cModule["credits"] ? setCredits(cModule["credits"]) : setCredits("");

            cModule["type"] ? setType({ value: cModule["type"], label: cModule["type"] }) : setType();
            cModule["semester"] ? setSemester({ value: cModule["semester"], label: cModule["semester"] }) : setSemester();
            cModule["studiengaenge"] ? setStudiengaenge(cModule["studiengaenge"].map((element) => { return { value: element, label: element } })) : setStudiengaenge();

            cModule["abgestimmt_mit"] ? setAbgestimmt_mit(cModule["abgestimmt_mit"]) : setAbgestimmt_mit("");
            cModule["zuordnung_coc"] ? setZuordnung_coc(cModule["zuordnung_coc"]) : setZuordnung_coc("");
            cModule["modulbeschreibung_liegt_vor"] ? setModulbeschreibung_liegt_vor(cModule["modulbeschreibung_liegt_vor"]) : setModulbeschreibung_liegt_vor("");

            setCheckBoxes((prevState) => {
                const nextState = [...prevState];
                for (let i = 1; i <= nextState.length; i++) {
                    if (cModule["status"][i] !== undefined) {
                        nextState[i - 1].checked = true;
                        nextState[i - 1].data = cModule["status"][i];
                        nextState[i - 1].disabled = true;
                    }
                }
                return nextState;
            });
        }

    }, [meta, currentModule, pageType]);

    const handleSubmit = async () => {
        const moduleChange = {
            ...(module_id && { "module_id": module_id }),
            ...(version && { "version": version })
        }

        const checked = checkBoxes.filter((element) => {
            return element.checked;
        });

        const statusValues = {};

        checked.forEach((element) => {
            statusValues[element.id] = element.data;
        });

        console.log(statusValues);

        try {
            const response = await updateStatus(document_id, moduleChange, statusValues, pageType);
            if (response.status === axios.HttpStatusCode.Ok) {
                navigate("/overview");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleCheckBoxChange = (index) => {
        if (!checkBoxes[index].checked) {
            setCheckBoxes((prevState) => {
                const nextState = [...prevState];
                const date = new Date();
                nextState[index].data = { datum: date.toLocaleString(), editor: user.tumKennung };
                nextState[index].checked = !nextState[index].checked;
                for (let i = index + 1; i < nextState.length; i++) {
                    nextState[i].data = "";
                    nextState[i].checked = false;
                }
                return nextState;
            });
        } else {
            setCheckBoxes((prevState) => {
                const nextState = [...prevState];
                for (let i = index; i < nextState.length; i++) {
                    nextState[i].data = "";
                    nextState[i].checked = false;
                }
                return nextState;
            });
        }
    }

    return (
        <div className="container-fluid flex-column justify-content-center align-items-center">
            {
                pageType === "create" &&
                <div className="row justify-content-center align-items-center flex-fill">
                    <div className="col-2 pt-5"><h2>Status ändern</h2></div>
                    <div className="col-12 text-center flex-fill">
                        <div className="row align-items-center justify-content-center p-5 flex-fill">
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Module-Nummer : </label>
                                <input className="col-6" value={module_id} type="text" placeholder="Module Id" onChange={(e) => { setModule_id(e.target.value) }} />
                            </div>

                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Version : </label>
                                <input className="col-6" value={version} type="text" placeholder="Version" onChange={(e) => { setVersion(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Antragsteller : </label>
                                <input disabled className="col-6" value={antragsteller} type="text" placeholder="Antragsteller" onChange={(e) => { setAntragsteller(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Modulverantwortlicher : </label>
                                <input disabled className="col-6" value={modulverantwortlicher} type="text" placeholder="Modulverantwortlicher" onChange={(e) => { setModulverantwortlicher(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Semester Start : </label>
                                <input disabled className="col-6" value={semester_start} type="text" placeholder="Semester Start" onChange={(e) => { setSemester_start(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Titel DE : </label>
                                <input disabled className="col-6" value={titel_de} type="text" placeholder="Titel DE" onChange={(e) => { setTitel_de(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Titel EN : </label>
                                <input disabled className="col-6" value={titel_en} type="text" placeholder="Titel EN" onChange={(e) => { setTitel_en(e.target.value) }} />
                            </div>
                            <div className="col-lg-7  col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Dozenten : </label>
                                <input disabled className="col-6" value={dozenten} type="text" placeholder="Dozenten" onChange={(e) => { setDozenten(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">SWS V : </label>
                                <input disabled className="col-6" value={sws_v} type="number" placeholder="SWS V" onChange={(e) => { setSws_v(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">SWS U : </label>
                                <input disabled className="col-6" value={sws_u} type="number" placeholder="SWS U" onChange={(e) => { setSws_u(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">SWS P : </label>
                                <input disabled className="col-6" value={sws_p} type="number" placeholder="SWS P" onChange={(e) => { setSws_p(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Stunden Eigenstudium : </label>
                                <input disabled className="col-6" value={stunden_eigenstudium} type="number" placeholder="Stunden Eigenstudium" onChange={(e) => { setStunden_eigenstudium(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Credits : </label>
                                <input disabled className="col-6" value={credits} type="number" placeholder="Credits" onChange={(e) => { setCredits(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0 row justify-content-center align-items-center">
                                <label className="col-1 col-sm-3 text-start p-0">Types : </label>
                                {
                                    <Select
                                        isDisabled
                                        className="col-6 p-0"
                                        name="types"
                                        value={type}
                                        onChange={(e) => { setType(e.value); }}
                                    />
                                }
                            </div>

                            <div className="col-lg-7 col-sm-12 m-1 p-0 row justify-content-center align-items-center">
                                <label className="col-1 col-sm-3 text-start p-0">Semester : </label>
                                {
                                    <Select
                                        isDisabled
                                        className="col-6 p-0"
                                        name="semester"
                                        value={semester}
                                        onChange={(e) => { setSemester(e.value); }}
                                    />
                                }
                            </div>

                            <div className="col-lg-7 col-sm-12 m-1 p-0 row justify-content-center align-items-center">
                                <label className="col-1 col-sm-3 text-start p-0">Studiengaenge : </label>

                                {
                                    <Select
                                        isDisabled
                                        className="col-6 p-0"
                                        name="studiengaenge"
                                        isMulti
                                        value={studiengaenge}
                                        onChange={(e) => {
                                            const stud = [];
                                            e.forEach((selection) => {
                                                stud.push(selection.value);
                                            });
                                            setStudiengaenge(stud);
                                        }}
                                    />
                                }
                            </div>

                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Abgestimmt Mit : </label>
                                <input disabled className="col-6" value={abgestimmt_mit} type="text" placeholder="Abgestimmt Mit" onChange={(e) => { setAbgestimmt_mit(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Zuordnung Coc : </label>
                                <input disabled className="col-6" value={zuordnung_coc} type="text" placeholder="Zuordnung Coc" onChange={(e) => { setZuordnung_coc(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0 ">
                                <label className="col-2 col-sm-3 text-start">Modulbeschreibung Liegt Vor: </label>
                                <input disabled className="col-6 " value={modulbeschreibung_liegt_vor} type="checkbox" onChange={() => { setModulbeschreibung_liegt_vor(!modulbeschreibung_liegt_vor) }} />
                            </div>

                        </div>
                    </div>
                    <div className="flex-column col-5 jusify-self-start p-1">
                        <table className="col-12 table table-bordered">
                            <thead>
                                <tr>
                                    <th className="col-4">Aktion</th>
                                    <th></th>
                                    <th>Datum</th>
                                    <th>Person</th>
                                </tr>
                            </thead>
                            <tbody>
                                {checkBoxes.map((checkBox, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{checkBox.title}</td>
                                            <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}>
                                                <input disabled={(checkBoxes[index - 1] && !checkBoxes[index - 1].checked && index !== 0) || checkBox.disabled} checked={checkBox.checked} type="checkbox" onChange={(e) => { handleCheckBoxChange(index) }} /></td>
                                            <td>{checkBox.checked && checkBox.data.datum}</td>
                                            <td>{checkBox.checked && checkBox.data.editor}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="row  align-self-center justify-content-center flex-row" >
                            <button className="col btn btn-secondary m-1" onClick={() => { navigate("/overview") }}>Abbrechen</button>
                            <button className="col btn btn-secondary m-1" onClick={handleSubmit}>Speichern</button>
                            <button className="col btn btn-secondary m-1" onClick={() => { console.log("Export to json file") }}>Export</button>
                        </div>
                    </div>

                </div>

            }
            {
                pageType === "update" &&
                <div className="row justify-content-center align-items-center flex-fill">
                    <div className="col-2 pt-5"><h2>Status ändern</h2></div>
                    <div className="col-12 text-center flex-fill">
                        <div className="row align-items-center justify-content-center p-5 flex-fill">
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Modul-Nummer : </label>
                                <input className="col-6" type="text" value={module_id} placeholder="Modul-Nummer" onChange={(e) => { setModule_id(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Streichung : </label>
                                <input disabled className="col-6" type="checkbox" checked={streichung} onChange={() => { setStreichung(!streichung) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Modulverantwortlicher : </label>
                                <input disabled className="col-6" type="text" value={modulverantwortlicher} placeholder="Modulverantwortlicher" onChange={(e) => { setModulverantwortlicher(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Semester Start : </label>
                                <input disabled className="col-6" type="text" value={semester_start} placeholder="Semester Start" onChange={(e) => { setSemester_start(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Titel DE : </label>
                                <input disabled className="col-6" type="text" value={titel_de} placeholder="Titel DE" onChange={(e) => { setTitel_de(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Titel EN : </label>
                                <input disabled className="col-6" type="text" value={titel_en} placeholder="Titel EN" onChange={(e) => { setTitel_en(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Dozenten : </label>
                                <input disabled className="col-6" type="text" value={dozenten} placeholder="Dozenten" onChange={(e) => { setDozenten(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">SWS V : </label>
                                <input disabled className="col-6" type="number" value={sws_v} placeholder="SWS V" onChange={(e) => { setSws_v(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">SWS U : </label>
                                <input disabled className="col-6" type="number" value={sws_u} placeholder="SWS U" onChange={(e) => { setSws_u(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">SWS P : </label>
                                <input disabled className="col-6" type="number" value={sws_p} placeholder="SWS P" onChange={(e) => { setSws_p(e.target.value) }} />
                            </div>
                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Credits : </label>
                                <input disabled className="col-6" type="number" value={credits} placeholder="Credits" onChange={(e) => { setCredits(e.target.value) }} />
                            </div>

                            <div className="col-lg-7 col-sm-12 m-1 p-0 row justify-content-center align-items-center">
                                <label className="col-1 col-sm-3 text-start p-0">Types : </label>
                                <Select
                                    isDisabled
                                    className="col-6 p-0"
                                    name="types"
                                    value={type}
                                />
                            </div>

                            <div className="col-lg-7 col-sm-12 m-1 p-0 row justify-content-center align-items-center">
                                <label className="col-1 col-sm-3 text-start p-0">Semester : </label>
                                <Select
                                    isDisabled
                                    className="col-6 p-0"
                                    name="semester"
                                    value={semester}
                                />

                            </div>

                            <div className="col-lg-7 col-sm-12 m-1 p-0 row justify-content-center align-items-center">
                                <label className="col-1 col-sm-3 text-start p-0">Studiengaenge : </label>
                                <Select
                                    isDisabled
                                    className="col-6 p-0"
                                    name="studiengaenge"
                                    isMulti
                                    value={studiengaenge}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex-column col-5 jusify-self-start p-1">
                        <table className="col-12 table table-bordered">
                            <thead>
                                <tr>
                                    <th className="col-4">Aktion</th>
                                    <th></th>
                                    <th>Datum</th>
                                    <th>Person</th>
                                </tr>
                            </thead>
                            <tbody>
                                {checkBoxes.map((checkBox, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{checkBox.title}</td>
                                            <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}>
                                                <input disabled={(checkBoxes[index - 1] && !checkBoxes[index - 1].checked && index !== 0) || checkBox.disabled} checked={checkBox.checked} type="checkbox" onChange={(e) => { handleCheckBoxChange(index) }} /></td>
                                            <td>{checkBox.checked && checkBox.data.datum}</td>
                                            <td>{checkBox.checked && checkBox.data.editor}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="row  align-self-center justify-content-center flex-row" >
                            <button className="col btn btn-secondary m-1" onClick={() => { navigate("/overview") }}>Abbrechen</button>
                            <button className="col btn btn-secondary m-1" onClick={handleSubmit}>Speichern</button>
                            <button className="col btn btn-secondary m-1" onClick={() => { console.log("Export to json file") }}>Export</button>
                        </div>
                    </div>

                </div>
            }

        </div >

    );
}

export default SaveOverview;