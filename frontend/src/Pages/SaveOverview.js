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

    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);
    const [check5, setCheck5] = useState(false);
    const [check6, setCheck6] = useState(false);
    const [check7, setCheck7] = useState(false);
    const [check8, setCheck8] = useState(false);


    useEffect(() => {
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
                const module = await getModuleVersion(document_id, pageType);
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
                cModule = currentModule[Object.keys(currentModule)[0]]
            else
                cModule = currentModule
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

            cModule["status"]["1"] ? setCheck1({ fromDataBase: true, ...cModule["status"]["1"], value: true }) : setCheck1(false);
            cModule["status"]["2"] ? setCheck2({ fromDataBase: true, ...cModule["status"]["2"], value: true }) : setCheck2(false);
            cModule["status"]["3"] ? setCheck3({ fromDataBase: true, ...cModule["status"]["3"], value: true }) : setCheck3(false);
            cModule["status"]["4"] ? setCheck4({ fromDataBase: true, ...cModule["status"]["4"], value: true }) : setCheck4(false);
            cModule["status"]["5"] ? setCheck5({ fromDataBase: true, ...cModule["status"]["5"], value: true }) : setCheck5(false);
            cModule["status"]["6"] ? setCheck6({ fromDataBase: true, ...cModule["status"]["6"], value: true }) : setCheck6(false);
            cModule["status"]["7"] ? setCheck7({ fromDataBase: true, ...cModule["status"]["7"], value: true }) : setCheck7(false);
            cModule["status"]["8"] ? setCheck8({ fromDataBase: true, ...cModule["status"]["8"], value: true }) : setCheck8(false);
        }

    }, [meta, currentModule, pageType]);

    const handleSubmit = async () => {
        const statusValues = {
            ...(check1.value && { "1": { "datum": check1.datum, "person": check1.person } }),
            ...(check2.value && { "2": { "datum": check2.datum, "person": check2.person } }),
            ...(check3.value && { "3": { "datum": check3.datum, "person": check3.person } }),
            ...(check4.value && { "4": { "datum": check4.datum, "person": check4.person } }),
            ...(check5.value && { "5": { "datum": check5.datum, "person": check5.person } }),
            ...(check6.value && { "6": { "datum": check6.datum, "person": check6.person } }),
            ...(check7.value && { "7": { "datum": check7.datum, "person": check7.person } }),
            ...(check8.value && { "8": { "datum": check8.datum, "person": check8.person } }),

        }
        try {
            const response = await updateStatus(document_id, statusValues, pageType);
            if (response.status === axios.HttpStatusCode.Ok) {
                navigate("/overview");
            }
        } catch (err) {
            console.log(err);
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
                                <label className="col-2 col-sm-3 text-start">Module Id : </label>
                                <input disabled className="col-6" value={module_id} type="text" placeholder="Module Id" onChange={(e) => { setModule_id(e.target.value) }} />
                            </div>

                            <div className="col-lg-7 col-sm-12 m-1 p-0">
                                <label className="col-2 col-sm-3 text-start">Version : </label>
                                <input disabled className="col-6" value={version} type="text" placeholder="Version" onChange={(e) => { setVersion(e.target.value) }} />
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
                    <div className="col-5 jusify-self-start p-1">
                        <div className="row">
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
                                    <tr>
                                        <td>In Tool/Datenbank erfasst:</td>
                                        <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}><input disabled={check1.value && check1.fromDataBase} checked={check1.value} type="checkbox"
                                            onChange={(e) => { const date = new Date(); setCheck1({ datum: date.toLocaleString(), person: sessionStorage.getItem("username"), value: !check1.value }) }} /></td>
                                        <td>{check1.value && check1.datum}</td>
                                        <td>{check1.value && check1.person}</td>
                                    </tr>
                                    <tr>
                                        <td>In TUMonline angelegt</td>
                                        <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}><input disabled={(check2.value && check2.fromDataBase) || (!check1.value && !check1.fromDataBase)} checked={check2.value && check1.value} type="checkbox" onChange={(e) => {
                                            const date = new Date(); setCheck2({ datum: date.toLocaleString(), person: sessionStorage.getItem("username"), value: !check2.value })
                                        }} /></td>
                                        <td>{check2.value && check2.datum}</td>
                                        <td>{check2.value && check2.person}</td>
                                    </tr>
                                    <tr>
                                        <td>In Studienkommission verabschiedet</td>
                                        <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}><input disabled={(check3.value && check3.fromDataBase) || (!check2.value && !check2.fromDataBase)} checked={check3.value && check2.value} type="checkbox" onChange={(e) => {
                                            const date = new Date(); setCheck3({ fromDataBase: false, datum: date.toLocaleString(), person: sessionStorage.getItem("username"), value: !check3.value })
                                        }} /></td>
                                        <td>{check3.value && check3.datum}</td>
                                        <td>{check3.value && check3.person}</td>
                                    </tr>
                                    <tr>
                                        <td>In Teaching council verabschiedet</td>
                                        <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}><input disabled={(check4.value && check4.fromDataBase) || (!check3.value && !check3.fromDataBase)} checked={check4.value && check3.value} type="checkbox" onChange={(e) => {
                                            const date = new Date(); setCheck4({ fromDataBase: false, datum: date.toLocaleString(), person: sessionStorage.getItem("username"), value: !check4.value })
                                        }} /></td>
                                        <td>{check4.value && check4.datum}</td>
                                        <td>{check4.value && check4.person}</td>
                                    </tr>
                                    <tr>
                                        <td>In TUMonline fertiggestellt</td>
                                        <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}><input disabled={(check5.value && check5.fromDataBase) || (!check4.value && !check4.fromDataBase)} checked={check5.value && check4.value} type="checkbox" onChange={(e) => {
                                            const date = new Date(); setCheck5({ fromDataBase: false, datum: date.toLocaleString(), person: sessionStorage.getItem("username"), value: !check5.value })
                                        }} /></td>
                                        <td>{check5.value && check5.datum}</td>
                                        <td>{check5.value && check5.person}</td>
                                    </tr>
                                    <tr>
                                        <td>Auf Modulliste geändert</td>
                                        <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}><input disabled={(check6.value && check6.fromDataBase) || (!check5.value && !check5.fromDataBase)} checked={check6.value && check5.value} type="checkbox" onChange={(e) => {
                                            const date = new Date(); setCheck6({ fromDataBase: false, datum: date.toLocaleString(), person: sessionStorage.getItem("username"), value: !check6.value })
                                        }} /></td>
                                        <td>{check6.value && check6.datum}</td>
                                        <td>{check6.value && check6.person}</td>
                                    </tr>
                                    <tr>
                                        <td>Im Web geändert</td>
                                        <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}><input disabled={(check7.value && check7.fromDataBase) || (!check6.value && !check6.fromDataBase)} checked={check7.value && check6.value} type="checkbox" onChange={(e) => {
                                            const date = new Date(); setCheck7({ fromDataBase: false, datum: date.toLocaleString(), person: sessionStorage.getItem("username"), value: !check7.value })
                                        }} /></td>
                                        <td>{check7.value && check7.datum}</td>
                                        <td>{check7.value && check7.person}</td>
                                    </tr>
                                    <tr>
                                        <td>In Studienrichtungsempfehlungen</td>
                                        <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}><input disabled={(check8.value && check8.fromDataBase) || (!check7.value && !check7.fromDataBase)} checked={check8.value && check7.value} type="checkbox" onChange={(e) => {
                                            const date = new Date(); setCheck8({ fromDataBase: false, datum: date.toLocaleString(), person: sessionStorage.getItem("username"), value: !check8.value })
                                        }} /></td>
                                        <td>{check8.value && check8.datum}</td>
                                        <td>{check8.value && check8.person}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="row  align-self-center justify-content-center flex-row" >
                            <button className="col btn btn-danger m-1" onClick={() => { navigate("/overview") }}>Abbrechen</button>
                            <button className="col btn btn-success m-1" onClick={handleSubmit}>Modul status beantragen</button>
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
                                <label className="col-2 col-sm-3 text-start">Module Id : </label>
                                <input disabled className="col-6" type="text" value={module_id} placeholder="Module Id" onChange={(e) => { setModule_id(e.target.value) }} />
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
                        <div className="row ">
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
                                    <tr>
                                        <td>In Tool/Datenbank erfasst:</td>
                                        <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}><input disabled={check1.value && check1.fromDataBase} checked={check1.value} type="checkbox"
                                            onChange={(e) => { const date = new Date(); setCheck1({ datum: date.toLocaleString(), person: sessionStorage.getItem("username"), value: !check1.value }) }} /></td>
                                        <td>{check1.value && check1.datum}</td>
                                        <td>{check1.value && check1.person}</td>
                                    </tr>
                                    <tr>
                                        <td>In TUMonline angelegt</td>
                                        <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}><input disabled={(check2.value && check2.fromDataBase) || (!check1.value && !check1.fromDataBase)} checked={check2.value && check1.value} type="checkbox" onChange={(e) => {
                                            const date = new Date(); setCheck2({ datum: date.toLocaleString(), person: sessionStorage.getItem("username"), value: !check2.value })
                                        }} /></td>
                                        <td>{check2.value && check2.datum}</td>
                                        <td>{check2.value && check2.person}</td>
                                    </tr>
                                    <tr>
                                        <td>In Studienkommission verabschiedet</td>
                                        <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}><input disabled={(check3.value && check3.fromDataBase) || (!check2.value && !check2.fromDataBase)} checked={check3.value && check2.value} type="checkbox" onChange={(e) => {
                                            const date = new Date(); setCheck3({ fromDataBase: false, datum: date.toLocaleString(), person: sessionStorage.getItem("username"), value: !check3.value })
                                        }} /></td>
                                        <td>{check3.value && check3.datum}</td>
                                        <td>{check3.value && check3.person}</td>
                                    </tr>
                                    <tr>
                                        <td>In Teaching council verabschiedet</td>
                                        <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}><input disabled={(check4.value && check4.fromDataBase) || (!check3.value && !check3.fromDataBase)} checked={check4.value && check3.value} type="checkbox" onChange={(e) => {
                                            const date = new Date(); setCheck4({ fromDataBase: false, datum: date.toLocaleString(), person: sessionStorage.getItem("username"), value: !check4.value })
                                        }} /></td>
                                        <td>{check4.value && check4.datum}</td>
                                        <td>{check4.value && check4.person}</td>
                                    </tr>
                                    <tr>
                                        <td>In TUMonline fertiggestellt</td>
                                        <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}><input disabled={(check5.value && check5.fromDataBase) || (!check4.value && !check4.fromDataBase)} checked={check5.value && check4.value} type="checkbox" onChange={(e) => {
                                            const date = new Date(); setCheck5({ fromDataBase: false, datum: date.toLocaleString(), person: sessionStorage.getItem("username"), value: !check5.value })
                                        }} /></td>
                                        <td>{check5.value && check5.datum}</td>
                                        <td>{check5.value && check5.person}</td>
                                    </tr>
                                    <tr>
                                        <td>Auf Modulliste geändert</td>
                                        <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}><input disabled={(check6.value && check6.fromDataBase) || (!check5.value && !check5.fromDataBase)} checked={check6.value && check5.value} type="checkbox" onChange={(e) => {
                                            const date = new Date(); setCheck6({ fromDataBase: false, datum: date.toLocaleString(), person: sessionStorage.getItem("username"), value: !check6.value })
                                        }} /></td>
                                        <td>{check6.value && check6.datum}</td>
                                        <td>{check6.value && check6.person}</td>
                                    </tr>
                                    <tr>
                                        <td>Im Web geändert</td>
                                        <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}><input disabled={(check7.value && check7.fromDataBase) || (!check6.value && !check6.fromDataBase)} checked={check7.value && check6.value} type="checkbox" onChange={(e) => {
                                            const date = new Date(); setCheck7({ fromDataBase: false, datum: date.toLocaleString(), person: sessionStorage.getItem("username"), value: !check7.value })
                                        }} /></td>
                                        <td>{check7.value && check7.datum}</td>
                                        <td>{check7.value && check7.person}</td>
                                    </tr>
                                    <tr>
                                        <td>In Studienrichtungsempfehlungen</td>
                                        <td className="text-center align-middle" style={{ transform: "scale(1.5)" }}><input disabled={(check8.value && check8.fromDataBase) || (!check7.value && !check7.fromDataBase)} checked={check8.value && check7.value} type="checkbox" onChange={(e) => {
                                            const date = new Date(); setCheck8({ fromDataBase: false, datum: date.toLocaleString(), person: sessionStorage.getItem("username"), value: !check8.value })
                                        }} /></td>
                                        <td>{check8.value && check8.datum}</td>
                                        <td>{check8.value && check8.person}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="row  align-self-center justify-content-center flex-row" >
                            <button className="col btn btn-danger m-1" onClick={() => { navigate("/overview") }}>Abbrechen</button>
                            <button className="col btn btn-success m-1" onClick={handleSubmit}>Modul status beantragen</button>
                        </div>
                    </div>

                </div>
            }

        </div >

    );
}

export default SaveOverview;