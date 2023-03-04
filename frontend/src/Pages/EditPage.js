import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMeta, getModuleVersion } from "../apigateway";
import Select from "react-select";


function EditPage() {
    const { state } = useLocation();
    const { document_id, version } = state;

    const [currentModule, setCurrentModule] = useState();

    const [meta, setMeta] = useState();

    const [typeOptions, setTypeOptions] = useState([]);

    const [studiengaengeOptions1, setStudiengaengeOptions1] = useState([]);
    const [studiengaengeOptions2, setStudiengaengeOptions2] = useState([]);
    const [studiengaengeOptions3, setStudiengaengeOptions3] = useState([]);

    const [semesterOptions, setSemesterOptions] = useState([]);

    const [type, setType] = useState();

    const [studiengaenge1, setStudiengaenge1] = useState([]);
    const [studiengaenge2, setStudiengaenge2] = useState([]);
    const [studiengaenge3, setStudiengaenge3] = useState([]);

    const [curretStudiengaenge1, setCurrentStudiengaenge1] = useState();
    const [curretStudiengaenge2, setCurrentStudiengaenge2] = useState();

    const [semester, setSemester] = useState();

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
            const types = [];
            const studiengaenge_1 = [];
            const studiengaenge_2 = [];
            const studiengaenge_3 = [];

            const semester = [];

            meta.types.forEach(type => {
                types.push({ value: type, label: type });
            });

            Object.keys(meta.studiengaenge).forEach((stud1) => {
                studiengaenge_1.push({ value: stud1, label: stud1 });
                studiengaenge_2[stud1] = [];
                Object.keys(meta.studiengaenge[stud1]).forEach((stud2) => {
                    studiengaenge_2[stud1].push({ value: stud2, label: stud2 });
                    studiengaenge_3[stud2] = [];
                    meta.studiengaenge[stud1][stud2].forEach((stud3) => {
                        if (stud3 === currentModule["studiengaenge"][0]) {
                            setCurrentStudiengaenge1(stud1);
                            setCurrentStudiengaenge2(stud2);
                        }
                        studiengaenge_3[stud2].push({ value: stud3, label: stud3 });
                    });
                });
            });

            meta.semester.forEach((sem) => {
                semester.push({ value: sem, label: sem });
            });

            setTypeOptions(types);
            setStudiengaengeOptions1(studiengaenge_1);
            setStudiengaengeOptions2(studiengaenge_2);
            setStudiengaengeOptions3(studiengaenge_3);
            setSemesterOptions(semester);
        }

    }, [meta, currentModule]);

    return (
        <div className="EditPage" style={{ width: '300px' }}>
            {currentModule &&
                <Select
                    name="types"
                    options={typeOptions}
                    defaultValue={{ label: currentModule["type"], value: currentModule["type"] }}
                    onChange={(e) => { setType(e.value); }}
                />
            }
            {currentModule &&
                <Select
                    name="semester"
                    options={semesterOptions}
                    defaultValue={{ label: currentModule["semester"], value: currentModule["semester"] }}
                    onChange={(e) => { setSemester(e.value); }}
                />
            }
            {curretStudiengaenge1 &&
                <Select
                    name="studiengaenge2"
                    options={studiengaengeOptions1}
                    defaultValue={{ label: curretStudiengaenge1, value: curretStudiengaenge1 }}
                    onChange={(e) => { setStudiengaenge1(e.value); }}
                />
            }
            {curretStudiengaenge2 &&
                <Select
                    name="studiengaenge2"
                    options={studiengaengeOptions2[studiengaenge1]}
                    defaultValue={{ label: curretStudiengaenge2, value: curretStudiengaenge2 }}
                    onChange={(e) => { setStudiengaenge2(e.value); }}
                />
            }
            {currentModule && <Select
                name="studiengaenge3"
                options={studiengaengeOptions3[studiengaenge2]}
                defaultValue={{ label: currentModule["studiengaenge"][0], value: currentModule["studiengaenge"][0] }}
                onChange={(e) => { setStudiengaenge3(e.value); }}
            />}
        </div >

    );
}

export default EditPage;