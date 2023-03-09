import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { editModule, getMeta, getModuleVersion } from "../apigateway";
import Select from "react-select";
import axios from "axios";


function EditCreatePage() {
    const { state } = useLocation();
    const { document_id, version } = state;

    const [currentModule, setCurrentModule] = useState();
    const [meta, setMeta] = useState();

    const [module_id, setModule_id] = useState('');
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

    const [type, setType] = useState([]);
    const [studiengaenge, setStudiengaenge] = useState([]);
    const [semester, setSemester] = useState([]);

    const [typeOptions, setTypeOptions] = useState([]);
    const [studiengaengeOptions, setStudiengaengeOptions] = useState([]);
    const [semesterOptions, setSemesterOptions] = useState([]);

    const [abgestimmt_mit, setAbgestimmt_mit] = useState('');
    const [zuordnung_coc, setZuordnung_coc] = useState('');
    const [modulbeschreibung_liegt_vor, setModulbeschreibung_liegt_vor] = useState(false);

    const navigate = useNavigate();

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
                const module = await getModuleVersion(document_id, version, "create");
                setCurrentModule(module.data[Object.keys(module.data)[0]]);
            }
            catch (err) {
                console.log(err);
            }
        }

        fetchModule();
        fetchMeta();
    }, [document_id, version]);

    useEffect(() => {
        if (meta) {
            const t_types = [];
            const t_studiengaenge = [];


            const t_semester = [];

            meta.types.forEach(type => {
                t_types.push({ value: type, label: type });
            });

            Object.keys(meta.studiengaenge).forEach((stud1) => {
                Object.keys(meta.studiengaenge[stud1]).forEach((stud2) => {
                    meta.studiengaenge[stud1][stud2].forEach((stud3) => {
                        t_studiengaenge.push({ value: stud3, label: stud3 });
                    });
                });
            });

            meta.semester.forEach((sem) => {
                t_semester.push({ value: sem, label: sem });
            });

            setTypeOptions(t_types);
            setStudiengaengeOptions(t_studiengaenge);
            setSemesterOptions(t_semester);
        }

        console.log(currentModule);

        if (currentModule) {
            //currentModule["module_id"] ? setModule_id(currentModule["module_id"]) : setModule_id("");
            currentModule["antragsteller"] ? setAntragsteller(currentModule["antragsteller"]) : setAntragsteller("");
            currentModule["modulverantwortlicher"] ? setModulverantwortlicher(currentModule["modulverantwortlicher"]) : setModulverantwortlicher("");
            currentModule["semester_start"] ? setSemester_start(currentModule["semester_start"]) : setSemester_start("");
            currentModule["titel_de"] ? setTitel_de(currentModule["titel_de"]) : setTitel_de("");
            currentModule["titel_en"] ? setTitel_en(currentModule["titel_en"]) : setTitel_en("");
            currentModule["dozenten"] ? setDozenten(currentModule["dozenten"]) : setDozenten("");
            currentModule["sws_v"] ? setSws_v(currentModule["sws_v"]) : setSws_v("");
            currentModule["sws_u"] ? setSws_u(currentModule["sws_u"]) : setSws_u("");
            currentModule["sws_p"] ? setSws_p(currentModule["sws_p"]) : setSws_p("");
            currentModule["stunden_eigenstudium"] ? setStunden_eigenstudium(currentModule["stunden_eigenstudium"]) : setStunden_eigenstudium("");
            currentModule["credits"] ? setCredits(currentModule["credits"]) : setCredits("");

            currentModule["type"] ? setType({ value: currentModule["type"], label: currentModule["type"] }) : setType();
            currentModule["semester"] ? setSemester({ value: currentModule["semester"], label: currentModule["semester"] }) : setSemester();
            currentModule["studiengaenge"] ? setStudiengaenge(currentModule["studiengaenge"].map((element) => { return { value: element, label: element } })) : setStudiengaenge();

            currentModule["abgestimmt_mit"] ? setAbgestimmt_mit(currentModule["abgestimmt_mit"]) : setAbgestimmt_mit("");
            currentModule["zuordnung_coc"] ? setZuordnung_coc(currentModule["zuordnung_coc"]) : setZuordnung_coc("");
            currentModule["modulbeschreibung_liegt_vor"] ? setModulbeschreibung_liegt_vor(currentModule["modulbeschreibung_liegt_vor"]) : setModulbeschreibung_liegt_vor("");
        }

    }, [meta, currentModule]);

    const handleSubmitModule = async () => {
        const module = {
            "document_id": document_id,
            "version": version,
            //...(module_id !== "" && { "module_id": module_id }),
            ...(antragsteller !== "" && { "antragsteller": antragsteller }),
            ...(modulverantwortlicher !== "" && { "modulverantwortlicher": modulverantwortlicher }),
            ...(semester_start !== "" && { "semester_start": semester_start }),
            ...(titel_de !== "" && { "titel_de": titel_de }),
            ...(titel_en !== "" && { "titel_en": titel_en }),
            ...(dozenten !== "" && { "dozenten": dozenten }),
            ...(sws_v !== "" && { "sws_v": sws_v }),
            ...(sws_u !== "" && { "sws_u": sws_u }),
            ...(sws_p !== "" && { "sws_p": sws_p }),
            ...(stunden_eigenstudium !== "" && { "stunden_eigenstudium": stunden_eigenstudium }),
            ...(credits !== "" && { "credits": credits }),
            ...(semester && { "semester": semester.value }),
            ...(type && { "type": type.value }),
            ...(studiengaenge && { "studiengaenge": studiengaenge.map((element) => { return element.value }) }),
            ...(abgestimmt_mit !== "" && { "abgestimmt_mit": abgestimmt_mit }),
            ...(zuordnung_coc !== "" && { "zuordnung_coc": zuordnung_coc }),
            ...(modulbeschreibung_liegt_vor !== "" && { "modulbeschreibung_liegt_vor": modulbeschreibung_liegt_vor })
        }

        const response = await editModule(module);
        if (response.status === axios.HttpStatusCode.Ok) {
            navigate("/home");
        }
    }

    return (
        <div className="container-fluid text-center d-flex flex-column" style={{ height: "100vh" }}>
            <div className="col-lg-12 col-sm-12 pt-5 m-0"><h2>Neues Modul ändern</h2></div>
            <div className="row align-items-center justify-content-center flex-fill flex-column">


                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Antragsteller : </label>
                    <input className="col-6" type="text" value={antragsteller} placeholder="Antragsteller" onChange={(e) => { setAntragsteller(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Modulverantwortlicher : </label>
                    <input className="col-6" type="text" value={modulverantwortlicher} placeholder="Modulverantwortlicher" onChange={(e) => { setModulverantwortlicher(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Semester Start : </label>
                    <input className="col-6" type="text" value={semester_start} placeholder="Semester Start" onChange={(e) => { setSemester_start(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Titel DE : </label>
                    <input className="col-6" type="text" value={titel_de} placeholder="Titel DE" onChange={(e) => { setTitel_de(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Titel EN : </label>
                    <input className="col-6" type="text" value={titel_en} placeholder="Titel EN" onChange={(e) => { setTitel_en(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Dozenten : </label>
                    <input className="col-6" type="text" value={dozenten} placeholder="Dozenten" onChange={(e) => { setDozenten(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">SWS V : </label>
                    <input className="col-6" type="number" value={sws_v} placeholder="SWS V" onChange={(e) => { setSws_v(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">SWS U : </label>
                    <input className="col-6" type="number" value={sws_u} placeholder="SWS U" onChange={(e) => { setSws_u(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">SWS P : </label>
                    <input className="col-6" type="number" value={sws_p} placeholder="SWS P" onChange={(e) => { setSws_p(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Stunden Eigenstudium : </label>
                    <input className="col-6" type="number" value={stunden_eigenstudium} placeholder="Stunden Eigenstudium" onChange={(e) => { setStunden_eigenstudium(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Credits : </label>
                    <input className="col-6" type="number" value={credits} placeholder="Credits" onChange={(e) => { setCredits(e.target.value) }} />
                </div>

                <div className="col-lg-7 col-sm-12 m-1 p-0 row justify-content-center align-items-center">
                    <label className="col-1 col-sm-3 text-start p-0">Types : </label>
                    {currentModule &&
                        <Select
                            className="col-6 p-0"
                            name="types"
                            options={typeOptions}
                            value={type}
                            onChange={(e) => { setType(e); }}
                        />
                    }
                </div>

                <div className="col-lg-7 col-sm-12 m-1 p-0 row justify-content-center align-items-center">
                    <label className="col-1 col-sm-3 text-start p-0">Semester : </label>
                    {currentModule &&
                        <Select
                            className="col-6 p-0"
                            name="semester"
                            options={semesterOptions}
                            value={semester}
                            onChange={(e) => { setSemester(e); }}
                        />
                    }
                </div>

                <div className="col-lg-7 col-sm-12 m-1 p-0 row justify-content-center align-items-center">
                    <label className="col-1 col-sm-3 text-start p-0">Studiengaenge : </label>

                    {
                        currentModule && <Select
                            className="col-6 p-0"
                            name="studiengaenge"
                            isMulti
                            options={studiengaengeOptions}
                            value={studiengaenge}
                            onChange={(e) => {
                                const stud = [];
                                e.forEach((selection) => {
                                    stud.push(selection);
                                });
                                setStudiengaenge(stud);
                            }}
                        />
                    }
                </div>

                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Abgestimmt Mit : </label>
                    <input className="col-6" type="text" value={abgestimmt_mit} placeholder="Abgestimmt Mit" onChange={(e) => { setAbgestimmt_mit(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Zuordnung Coc : </label>
                    <input className="col-6" type="text" value={zuordnung_coc} placeholder="Zuordnung Coc" onChange={(e) => { setZuordnung_coc(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-4 text-start">Modulbeschreibung Liegt Vor: </label>
                    <input className="m-1" type="checkbox" checked={modulbeschreibung_liegt_vor} onChange={() => { setModulbeschreibung_liegt_vor(!modulbeschreibung_liegt_vor) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <button className="btn btn-danger col-lg-3 col-sm-6 m-1" onClick={() => { navigate("/home") }}>Abbrechen</button>
                    <button className="btn btn-success col-lg-3 col-sm-6 m-1" onClick={handleSubmitModule}>Änderung übertragen</button>
                </div>
            </div>
        </div >

    );
}

export default EditCreatePage;