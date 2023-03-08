import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";
import { getMeta, updateModule } from "../apigateway";
import { useNavigate } from "react-router-dom";
import { toast } from "wc-toast";

function UpdateModulePage() {

    const navigate = useNavigate();
    const [meta, setMeta] = useState();

    const [module_nummer, setModuleNummer] = useState();
    const [streichung, setStreichung] = useState(false);

    const [changeNeuerTitel, setChangeNeuerTitel] = useState(false);
    const [neuerTitelEN, setNeuerTitelEN] = useState();
    const [neuerTitelDE, setNeuerTitelDE] = useState();

    const [changeNeuCredits, setChangeNeuCredits] = useState(false);
    const [neuCredits, setNeuCredits] = useState();

    const [changeNeuSemesterStart, setChangeNeuSemesterStart] = useState(false);
    const [neuerSemesterStart, setNeuerSemesterStart] = useState();

    const [changeSWS, setChangeSWS] = useState(false);
    const [neueSWS_V, setNeueSWS_V] = useState();
    const [neueSWS_U, setNeueSWS_U] = useState();
    const [neueSWS_P, setNeueSWS_P] = useState();

    const [prüfungsart, setPrüfungsart] = useState(false);
    const [neueType, setNeueType] = useState();

    const [changeStudiengaenge, setChangeStudiengaenge] = useState(false);
    const [neueStudiengaenge, setNeueStudiengaenge] = useState([]);

    const [changeSemester, setChangeSemester] = useState(false);
    const [neueSemester, setNeueSemester] = useState();

    const [changeModulverantwortlicher, setChangeModulverantwortlicher] = useState(false);
    const [neuerModulverantwortlicher, setNeuerModulverantwortlicher] = useState();


    const [changeDozent, setChangeDozent] = useState(false);
    const [neuerDozent, setNeuerDozent] = useState();

    const [typesOptions, setTypesOptions] = useState();
    const [semesterOptions, setSemesterOptions] = useState();
    const [studiengaengeOptions, setStudiengaengeOptions] = useState();

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


    const handleSubmit = async () => {
        const module = {
            "module_id": module_nummer,
            "streichung": streichung,
            ...(changeNeuerTitel && { "titel_de": neuerTitelDE, "titel_en": neuerTitelEN }),
            ...(changeNeuCredits && { "credits": neuCredits }),
            ...(changeNeuSemesterStart && { "semester_start": neuerSemesterStart }),
            ...(changeSWS && { "sws_v": neueSWS_V, "sws_u": neueSWS_U, "sws_p": neueSWS_P }),
            ...(prüfungsart && { "type": neueType }),
            ...(changeStudiengaenge && { "studiengaenge": neueStudiengaenge }),
            ...(changeSemester && { "semester": neueSemester }),
            ...(changeModulverantwortlicher && { "modulverantwortlicher": neuerModulverantwortlicher }),
            ...(changeDozent && { "dozent": neuerDozent })
        }

        try {
            const response = await updateModule(module);
            if (response.status === axios.HttpStatusCode.Ok) {
                navigate("/home");
                toast.success("Module Update Created");
            }

        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className="container-fluid text-center d-flex flex-column" style={{ height: "100vh" }}>
            <div className="col-lg-12 col-sm-12 pt-5"><h2>Update Module Page</h2></div>
            <div className="row align-items-center justify-content-center flex-fill flex-column">
                <div className="row d-flex align-items-center justify-content-center m-2">
                    <label className="col-2 m-1">Modulenummer </label>
                    <input className="col-2 m-1" type="text" placeholder={"Modulnummer"} onChange={(e) => { setModuleNummer(e.target.value) }} />
                </div>
                <div className="row d-flex align-items-center justify-content-center m-2">
                    <label className="col-1 m-1 text-start">Streichung</label>
                    <input className="col-1 m-1" type="checkbox" onChange={() => {
                        setStreichung(!streichung);
                        setChangeNeuerTitel(false);
                        setChangeNeuCredits(false);
                        setChangeNeuSemesterStart(false);
                        setChangeSWS(false);
                        setPrüfungsart(false);
                        setChangeStudiengaenge(false);
                        setChangeSemester(false);
                        setChangeModulverantwortlicher(false);
                        setChangeDozent(false);
                    }} />
                </div>

                <div className="container align-items-center justify-content-center flex-fill flex-column">
                    <div className="container align-items-center justify-content-center flex-fill flex-column">
                        <div className="row d-flex align-items-center justify-content-center m-2">
                            <label className="col-2" >Neuer Titel</label>
                            <input disabled={streichung} className="col-1" type="checkbox" onChange={() => { setChangeNeuerTitel(!changeNeuerTitel) }} />
                            <div className="col-4 d-flex p-0">
                                <input disabled={!changeNeuerTitel} className="flex-fill col-5 m-1" type="textbox" placeholder="Neuer Titel EN" onChange={(e) => { setNeuerTitelEN(e.target.value) }} />
                                <input disabled={!changeNeuerTitel} className="flex-fill col-5 m-1" type="textbox" placeholder="Neuer Titel DE" onChange={(e) => { setNeuerTitelDE(e.target.value) }} />
                            </div>
                        </div>


                        <div className="row d-flex align-items-center justify-content-center m-2">
                            <label className="col-2">Neu Credits</label>
                            <input className="col-1" disabled={streichung} type="checkbox" onChange={() => { setChangeNeuCredits(!changeNeuCredits) }} />
                            <input className="col-4" disabled={!changeNeuCredits} type="number" placeholder="Neu Credits" onChange={(e) => { setNeuCredits(e.target.value) }} />
                        </div>

                        <div className="row d-flex align-items-center justify-content-center m-2">
                            <label className="col-2"> Neuer Semester Start</label>
                            <input className="col-1" disabled={streichung} type="checkbox" onChange={() => { setChangeNeuSemesterStart(!changeNeuSemesterStart) }} />
                            <input className="col-4" disabled={!changeNeuSemesterStart} type="textbox" placeholder="Neuer Semester Start" onChange={(e) => { setNeuerSemesterStart(e.target.value) }} />
                        </div>


                        <div className="row d-flex align-items-center justify-content-center m-2">
                            <label className="col-2">Neue SWS</label>
                            <input className="col-1" disabled={streichung} type="checkbox" onChange={() => { setChangeSWS(!changeSWS) }} />
                            <div className="col-4 p-0">
                                <input className="col-3 m-1" disabled={!changeSWS} type="number" placeholder="SWS V" onChange={(e) => { setNeueSWS_V(e.target.value) }} />
                                <input className="col-3 m-1" disabled={!changeSWS} type="number" placeholder="SWS U" onChange={(e) => { setNeueSWS_U(e.target.value) }} />
                                <input className="col-3 m-1" disabled={!changeSWS} type="number" placeholder="SWS P" onChange={(e) => { setNeueSWS_P(e.target.value) }} />

                            </div>
                        </div>

                        <div className="row d-flex align-items-center justify-content-center m-2">
                            <label className="col-2 m-1">Neue Prüfungsart</label>
                            <input className="col-1 m-1" disabled={streichung} type="checkbox" onChange={() => { setPrüfungsart(!prüfungsart) }} />
                            <Select
                                className="col-4 m-1"
                                name="types"
                                isDisabled={!prüfungsart}
                                placeholder="Neue Types"
                                options={typesOptions}
                                onChange={(e) => { setNeueType(e.value); }}
                            />
                        </div>

                        <div className="row d-flex align-items-center justify-content-center m-2">
                            <label className="col-2 m-1"> Neue Studiengaenge</label>
                            <input className="col-1 m-1" disabled={streichung} type="checkbox" onChange={() => { setChangeStudiengaenge(!changeStudiengaenge) }} />
                            <Select
                                className="col-4 m-1"
                                name="studiengaenge"
                                isMulti
                                isDisabled={!changeStudiengaenge}
                                placeholder="Neue Studiengaenge"
                                options={studiengaengeOptions}
                                onChange={(e) => {
                                    const stud = [];
                                    e.forEach((selection) => {
                                        stud.push(selection.value);
                                    });
                                    setNeueStudiengaenge(stud);
                                }}
                            />
                        </div>

                        <div className="row d-flex align-items-center justify-content-center m-2">
                            <label className="col-2 m-1">Neue Semester</label>
                            <input className="col-1 m-1" disabled={streichung} type="checkbox" onChange={() => { setChangeSemester(!changeSemester); }} />
                            <Select
                                className="col-4 m-1"
                                name="semester"
                                isDisabled={!changeSemester}
                                placeholder="Neue Semester"
                                options={semesterOptions}
                                onChange={(e) => { setNeueSemester(e.value); }}
                            />
                        </div>

                        <div className="row d-flex align-items-center justify-content-center m-2">
                            <label className="col-2" >Neuer Modulverantwortlicher</label>
                            <input className="col-1" disabled={streichung} type="checkbox" onChange={() => { setChangeModulverantwortlicher(!changeModulverantwortlicher) }} />
                            <input className="col-4" disabled={!changeModulverantwortlicher} type="textbox" placeholder="Neuer Modulverantwortlicher" onChange={(e) => { setNeuerModulverantwortlicher(e.target.value) }} />
                        </div>

                        <div className="row d-flex align-items-center justify-content-center m-2">
                            <label className="col-2" >Neuer Dozent:in</label>
                            <input className="col-1" disabled={streichung} type="checkbox" onChange={() => { setChangeDozent(!changeDozent) }} />
                            <input className="col-4" disabled={!changeDozent} type="textbox" placeholder="Neuer Dozent:in" onChange={(e) => { setNeuerDozent(e.target.value) }} />
                        </div>
                    </div>
                    <button className="btn btn-success m-4 col-3" onClick={handleSubmit}>Submit Update Module</button>

                </div>
            </div>
        </div >

    );
}

export default UpdateModulePage;