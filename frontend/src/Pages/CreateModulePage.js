import { useEffect, useState } from "react";
import { createModule, getMeta } from "../apigateway";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

function CreateModulePage() {

    const [meta, setMeta] = useState();

    const [version, setVersion] = useState();
    const [module_id, setModule_id] = useState();
    const [antragsteller, setAntragsteller] = useState();
    const [modulverantwortlicher, setModulverantwortlicher] = useState();
    const [semester_start, setSemester_start] = useState();
    const [titel_de, setTitel_de] = useState();
    const [titel_en, setTitel_en] = useState();
    const [dozenten, setDozenten] = useState();
    const [sws_v, setSws_v] = useState();
    const [sws_u, setSws_u] = useState();
    const [sws_p, setSws_p] = useState();
    const [stunden_eigenstudium, setStunden_eigenstudium] = useState();
    const [credits, setCredits] = useState();

    const [type, setType] = useState();
    const [semester, setSemester] = useState();
    const [studiengaenge, setStudiengaenge] = useState();

    const [abgestimmt_mit, setAbgestimmt_mit] = useState();
    const [zuordnung_coc, setZuordnung_coc] = useState();
    const [modulbeschreibung_liegt_vor, setModulbeschreibung_liegt_vor] = useState(false);

    const [typesOptions, setTypesOptions] = useState();
    const [semesterOptions, setSemesterOptions] = useState();
    const [studiengaengeOptions, setStudiengaengeOptions] = useState();

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
        fetchMeta();
    }, []);

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

            setTypesOptions(t_types);
            setStudiengaengeOptions(t_studiengaenge);
            setSemesterOptions(t_semester);
        }
    }, [meta]);

    const handleSubmitModule = async () => {
        const module = {
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
            "semester": semester,
            "type": type,
            "studiengaenge": studiengaenge,
            "abgestimmt_mit": abgestimmt_mit,
            "zuordnung_coc": zuordnung_coc,
            "modulbeschreibung_liegt_vor": modulbeschreibung_liegt_vor
        }

        await createModule(module);
        navigate("/home");
    }

    return (
        <div className="createForm">
            <input type="text" placeholder="Version" onChange={(e) => { setVersion(e.target.value) }} />
            <input type="text" placeholder="Module Id" onChange={(e) => { setModule_id(e.target.value) }} />
            <input type="text" placeholder="Antragsteller" onChange={(e) => { setAntragsteller(e.target.value) }} />
            <input type="text" placeholder="Modulverantwortlicher" onChange={(e) => { setModulverantwortlicher(e.target.value) }} />
            <input type="text" placeholder="Semester Start" onChange={(e) => { setSemester_start(e.target.value) }} />
            <input type="text" placeholder="Title DE" onChange={(e) => { setTitel_de(e.target.value) }} />
            <input type="text" placeholder="Title EN" onChange={(e) => { setTitel_en(e.target.value) }} />
            <input type="text" placeholder="Dozenten" onChange={(e) => { setDozenten(e.target.value) }} />
            <input type="number" placeholder="SWS V" onChange={(e) => { setSws_v(e.target.value) }} />
            <input type="number" placeholder="SWS U" onChange={(e) => { setSws_u(e.target.value) }} />
            <input type="number" placeholder="SWS P" onChange={(e) => { setSws_p(e.target.value) }} />
            <input type="number" placeholder="Stunden Eigenstudium" onChange={(e) => { setStunden_eigenstudium(e.target.value) }} />
            <input type="number" placeholder="Credits" onChange={(e) => { setCredits(e.target.value) }} />

            <Select
                name="types"
                placeholder="Types"
                options={typesOptions}
                onChange={(e) => { setType(e.value); }}
            />
            <Select
                name="semester"
                placeholder="Semester"
                options={semesterOptions}
                onChange={(e) => { setSemester(e.value); }}
            />
            <Select
                name="studiengaenge"
                isMulti
                placeholder="Studiengaenge"
                options={studiengaengeOptions}
                onChange={(e) => {
                    const stud = [];
                    e.forEach((selection) => {
                        stud.push(selection.value);
                    });
                    setStudiengaenge(stud);
                }}
            />
            <input type="text" placeholder="Abgestimmt Mit" onChange={(e) => { setAbgestimmt_mit(e.target.value) }} />
            <input type="text" placeholder="Zuordnung Coc" onChange={(e) => { setZuordnung_coc(e.target.value) }} />
            <label>Modulbeschreibung Liegt Vor</label>
            <input type="checkbox" onChange={() => { setModulbeschreibung_liegt_vor(!modulbeschreibung_liegt_vor) }} />
            <button onClick={handleSubmitModule}>Submit Module</button>
        </div>
    );
}

export default CreateModulePage;