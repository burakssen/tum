import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";

import axios from "axios";

import { getUpdatedModule, getMeta, editUpdatedModule } from "../apigateway";

function EditUpdatePage() {
    const { state } = useLocation();
    const { document_id } = state;

    const navigate = useNavigate();

    const [streichung, setStreichung] = useState(false);

    const [currentModule, setCurrentModule] = useState();
    const [meta, setMeta] = useState();

    const [module_id, setModule_id] = useState('');
    const [modulverantwortlicher, setModulverantwortlicher] = useState('');
    const [semester_start, setSemester_start] = useState('');
    const [titel_de, setTitel_de] = useState('');
    const [titel_en, setTitel_en] = useState('');
    const [dozenten, setDozenten] = useState('');
    const [sws_v, setSws_v] = useState('');
    const [sws_u, setSws_u] = useState('');
    const [sws_p, setSws_p] = useState('');
    const [credits, setCredits] = useState('');

    const [type, setType] = useState([]);
    const [studiengaenge, setStudiengaenge] = useState([]);
    const [semester, setSemester] = useState([]);

    const [typeOptions, setTypeOptions] = useState([]);
    const [studiengaengeOptions, setStudiengaengeOptions] = useState([]);
    const [semesterOptions, setSemesterOptions] = useState([]);

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
                const module = await getUpdatedModule(document_id);
                setCurrentModule(module.data);
            }
            catch (err) {
                console.log(err);
            }
        }

        fetchModule();
        fetchMeta();
    }, [document_id]);

    useEffect(() => {
        if (meta) {
            const t_types = [];
            const t_studiengaenge = [];


            const t_semester = [];

            if (meta.types !== "unchenged") {
                meta.types.forEach(type => {
                    t_types.push({ value: type, label: type });
                });
            }


            if (meta.studiengaenge !== "unchanged") {
                Object.keys(meta.studiengaenge).forEach((stud1) => {
                    Object.keys(meta.studiengaenge[stud1]).forEach((stud2) => {
                        meta.studiengaenge[stud1][stud2].forEach((stud3) => {
                            t_studiengaenge.push({ value: stud3, label: stud3 });
                        });
                    });
                });
            }


            if (meta.semester !== "unchanged") {
                meta.semester.forEach((sem) => {
                    t_semester.push({ value: sem, label: sem });
                });
            }


            setTypeOptions(t_types);
            setStudiengaengeOptions(t_studiengaenge);
            setSemesterOptions(t_semester);
        }

        if (currentModule) {
            currentModule["streichung"] ? setStreichung(currentModule["streichung"]) : setStreichung(false);
            currentModule["module_id"] ? setModule_id(currentModule["module_id"]) : setModule_id("");
            if (!currentModule["streichung"]) {
                currentModule["modulverantwortlicher"] ? setModulverantwortlicher(currentModule["modulverantwortlicher"]) : setModulverantwortlicher("");
                currentModule["semester_start"] ? setSemester_start(currentModule["semester_start"]) : setSemester_start("");
                currentModule["titel_de"] ? setTitel_de(currentModule["titel_de"]) : setTitel_de("");
                currentModule["titel_en"] ? setTitel_en(currentModule["titel_en"]) : setTitel_en("");
                currentModule["dozenten"] ? setDozenten(currentModule["dozenten"]) : setDozenten("");
                currentModule["sws_v"] ? setSws_v(currentModule["sws_v"]) : setSws_v("");
                currentModule["sws_u"] ? setSws_u(currentModule["sws_u"]) : setSws_u("");
                currentModule["sws_p"] ? setSws_p(currentModule["sws_p"]) : setSws_p("");
                currentModule["credits"] ? setCredits(currentModule["credits"]) : setCredits("");

                currentModule["type"] ? setType({ value: currentModule["type"], label: currentModule["type"] }) : setType();
                currentModule["semester"] ? setSemester({ value: currentModule["semester"], label: currentModule["semester"] }) : setSemester();
                currentModule["studiengaenge"] ? setStudiengaenge(currentModule["studiengaenge"].map((element) => { return { value: element, label: element } })) : setStudiengaenge();
            }
        }

    }, [meta, currentModule]);


    const handleSubmitModule = async () => {
        const module = {
            "document_id": document_id,
            ...(module_id && { "module_id": module_id }),
            ...(modulverantwortlicher && { "modulverantwortlicher": modulverantwortlicher }),
            ...(semester_start && { "semester_start": semester_start }),
            ...(titel_de && { "titel_de": titel_de }),
            ...(titel_en && { "titel_en": titel_en }),
            ...(dozenten && { "dozenten": dozenten }),
            ...(sws_v && { "sws_v": sws_v }),
            ...(sws_u && { "sws_u": sws_u }),
            ...(sws_p && { "sws_p": sws_p }),
            ...(credits && { "credits": credits }),
            ...(type && { "type": type.value }),
            ...(semester && { "semester": semester.value }),
            ...(studiengaenge && { "studiengaenge": studiengaenge.map((element) => { return element.value }) }),
        }


        try {
            const response = await editUpdatedModule(module);
            if (response.status === axios.HttpStatusCode.Ok) {
                navigate("/home");
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="container-fluid text-center d-flex flex-column" style={{ height: "100vh" }}>
            <div className="col-lg-12 col-sm-12 pt-5 m-0"><h2>Bereits bestehendes Modul ändern</h2></div>
            <div className="row align-items-center justify-content-start flex-fill flex-column m-5">
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Module Id : </label>
                    <input className="col-6" type="text" value={module_id} placeholder="Module Id" onChange={(e) => { setModule_id(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Streichung : </label>
                    <input className="col-6" type="checkbox" checked={streichung} onChange={() => { setStreichung(!streichung) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Modulverantwortlicher : </label>
                    <input disabled={streichung} className="col-6" type="text" value={modulverantwortlicher} placeholder="Modulverantwortlicher" onChange={(e) => { setModulverantwortlicher(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Semester Start : </label>
                    <input disabled={streichung} className="col-6" type="text" value={semester_start} placeholder="Semester Start" onChange={(e) => { setSemester_start(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Titel DE : </label>
                    <input disabled={streichung} className="col-6" type="text" value={titel_de} placeholder="Titel DE" onChange={(e) => { setTitel_de(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Titel EN : </label>
                    <input disabled={streichung} className="col-6" type="text" value={titel_en} placeholder="Titel EN" onChange={(e) => { setTitel_en(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Dozenten : </label>
                    <input disabled={streichung} className="col-6" type="text" value={dozenten} placeholder="Dozenten" onChange={(e) => { setDozenten(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">SWS V : </label>
                    <input disabled={streichung} className="col-6" type="number" value={sws_v} placeholder="SWS V" onChange={(e) => { setSws_v(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">SWS U : </label>
                    <input disabled={streichung} className="col-6" type="number" value={sws_u} placeholder="SWS U" onChange={(e) => { setSws_u(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">SWS P : </label>
                    <input disabled={streichung} className="col-6" type="number" value={sws_p} placeholder="SWS P" onChange={(e) => { setSws_p(e.target.value) }} />
                </div>
                <div className="col-lg-7 col-sm-12 m-1 p-0">
                    <label className="col-2 col-sm-3 text-start">Credits : </label>
                    <input disabled={streichung} className="col-6" type="number" value={credits} placeholder="Credits" onChange={(e) => { setCredits(e.target.value) }} />
                </div>

                <div className="col-lg-7 col-sm-12 m-1 p-0 row justify-content-center align-items-center">
                    <label className="col-1 col-sm-3 text-start p-0">Types : </label>
                    {currentModule &&
                        <Select
                            isDisabled={streichung}
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
                            isDisabled={streichung}
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
                            isDisabled={streichung}
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
                    <button className="btn btn-danger col-lg-3 col-sm-6 m-1" onClick={() => { navigate("/home") }}>Abbrechen</button>
                    <button className="btn btn-success col-lg-3 col-sm-6 m-1" onClick={handleSubmitModule}>Änderung übertragen</button>
                </div>
            </div>
        </div >
    );
}

export default EditUpdatePage;