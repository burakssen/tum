import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { editModule, getMeta, getModuleVersion } from "../apigateway";
import Select from "react-select";
import axios from "axios";


function EditPage() {
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
                const module = await getModuleVersion(document_id, version);
                setCurrentModule(module.data);
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

        if (currentModule) {
            setModule_id(currentModule["module_id"]);
            setAntragsteller(currentModule["antragsteller"]);
            setModulverantwortlicher(currentModule["modulverantwortlicher"]);
            setSemester_start(currentModule["semester_start"]);
            setTitel_de(currentModule["titel_de"]);
            setTitel_en(currentModule["titel_en"]);
            setDozenten(currentModule["dozenten"]);
            setSws_v(currentModule["sws_v"]);
            setSws_u(currentModule["sws_u"]);
            setSws_p(currentModule["sws_p"]);
            setStunden_eigenstudium(currentModule["stunden_eigenstudium"]);
            setCredits(currentModule["credits"]);

            setType({ value: currentModule["type"], label: currentModule["type"] });
            setSemester({ value: currentModule["semester"], label: currentModule["semester"] });
            setStudiengaenge(currentModule["studiengaenge"].map((element) => { return { value: element, label: element } }));

            setAbgestimmt_mit(currentModule["abgestimmt_mit"]);
            setZuordnung_coc(currentModule["zuordnung_coc"]);
            setModulbeschreibung_liegt_vor(currentModule["modulbeschreibung_liegt_vor"]);
        }

    }, [meta, currentModule]);

    const handleSubmitModule = async () => {

        const module = {
            "document_id": document_id,
            "version": version,
            "module_id": module_id,
            "antragsteller": antragsteller,
            "modulverantwortlicher": modulverantwortlicher,
            "semester_start": semester_start,
            "titel_de": titel_de,
            "titel_en": titel_en,
            "dozenten": dozenten,
            "sws_v": sws_v,
            "sws_u": sws_u,
            "sws_p": sws_p,
            "stunden_eigenstudium": stunden_eigenstudium,
            "credits": credits,
            "semester": semester.value,
            "type": type.value,
            "studiengaenge": studiengaenge.map((element) => { return element.value }),
            "abgestimmt_mit": abgestimmt_mit,
            "zuordnung_coc": zuordnung_coc,
            "modulbeschreibung_liegt_vor": modulbeschreibung_liegt_vor
        }

        const response = await editModule(module);
        if (response.status === axios.HttpStatusCode.Ok) {
            navigate("/home");
        }
    }

    return (
        <div className="editForm" style={{ width: '300px' }}>
            <div>Document Id: {document_id}, Version: {version}</div>
            <input type="text" value={module_id} placeholder="Module Id" onChange={(e) => { setModule_id(e.target.value) }} />
            <input type="text" value={antragsteller} placeholder="Antragsteller" onChange={(e) => { setAntragsteller(e.target.value) }} />
            <input type="text" value={modulverantwortlicher} placeholder="Modulverantwortlicher" onChange={(e) => { setModulverantwortlicher(e.target.value) }} />
            <input type="text" value={semester_start} placeholder="Semester Start" onChange={(e) => { setSemester_start(e.target.value) }} />
            <input type="text" value={titel_de} placeholder="Title DE" onChange={(e) => { setTitel_de(e.target.value) }} />
            <input type="text" value={titel_en} placeholder="Title EN" onChange={(e) => { setTitel_en(e.target.value) }} />
            <input type="text" value={dozenten} placeholder="Dozenten" onChange={(e) => { setDozenten(e.target.value) }} />
            <input type="number" value={sws_v} placeholder="SWS V" onChange={(e) => { setSws_v(e.target.value) }} />
            <input type="number" value={sws_u} placeholder="SWS U" onChange={(e) => { setSws_u(e.target.value) }} />
            <input type="number" value={sws_p} placeholder="SWS P" onChange={(e) => { setSws_p(e.target.value) }} />
            <input type="number" value={stunden_eigenstudium} placeholder="Stunden Eigenstudium" onChange={(e) => { setStunden_eigenstudium(e.target.value) }} />
            <input type="number" value={credits} placeholder="Credits" onChange={(e) => { setCredits(e.target.value) }} />

            {currentModule &&
                <Select
                    name="types"
                    options={typeOptions}
                    value={type}
                    onChange={(e) => { setType(e); }}
                />
            }
            {currentModule &&
                <Select
                    name="semester"
                    options={semesterOptions}
                    value={semester}
                    onChange={(e) => { setSemester(e); }}
                />
            }
            {
                currentModule && <Select
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

            <input type="text" value={abgestimmt_mit} placeholder="Abgestimmt Mit" onChange={(e) => { setAbgestimmt_mit(e.target.value) }} />
            <input type="text" value={zuordnung_coc} placeholder="Zuordnung Coc" onChange={(e) => { setZuordnung_coc(e.target.value) }} />
            <label>Modulbeschreibung Liegt Vor</label>
            <input type="checkbox" checked={modulbeschreibung_liegt_vor} onChange={() => { setModulbeschreibung_liegt_vor(!modulbeschreibung_liegt_vor) }} />
            <button onClick={handleSubmitModule}>Submit Module</button>

        </div >

    );
}

export default EditPage;