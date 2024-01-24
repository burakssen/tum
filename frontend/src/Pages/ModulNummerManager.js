import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addExistingModules, getExistingModules, deleteExistingModules } from '../apigateway';
import { toast } from 'wc-toast';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function ModulNummerManager() {

    const [modulNummers, setModulNummers] = useState([]);
    const [searchModulNummers, setSearchModulNummers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [tempSearchTerm, setTempSearchTerm] = useState("");
    const [modulesToDelete, setModulesToDelete] = useState([]);

    const [modulName, setModulName] = useState("");
    const [modulNummer, setModulNummer] = useState("");

    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    useEffect(async () => {
        if (modulNummers.length > 0) return;
        await populateModulNummers();
    }, []);

    useEffect(() => {
        setSearchModulNummers([]);

        if (searchTerm === "") {
            setSearchModulNummers(modulNummers);
            return;
        }

        const filteredModulNummers = modulNummers.filter(item => item["_id"].includes(searchTerm));

        filteredModulNummers.forEach(modulNummer => {
            setTimeout(() => {
                setSearchModulNummers(searchModulNummers => [...searchModulNummers, modulNummer]);
            }, 50);
        });
    }, [searchTerm]);

    const populateModulNummers = async () => {
        const response = await getExistingModules();
        if (response.status === 200) {
            if (response.data.rows === undefined) {
                setModulNummers([]);
                setSearchModulNummers([]);
                return;
            };
            const rows = response.data.rows;
            const tModulNummers = [];

            if (rows.length === 0) {
                setModulNummers(tModulNummers);
                setSearchModulNummers(tModulNummers);
                return;
            }

            rows.forEach(row => {
                tModulNummers.push({ _id: row.doc._id, modulName: row.doc.modulName, _rev: row.doc._rev, checked: false });
            });

            setModulNummers(tModulNummers);
            setSearchModulNummers(tModulNummers);
        }
    }


    const addModules = async (modules) => {
        const response = await addExistingModules(modules);
        if (response.status === 200) {
            toast.success("Modul Nummer wird hinzugefügt");
            await populateModulNummers();
            return;
        }

        toast.error("Modul Nummer konnte nicht hinzugefügt werden");
    }

    const deleteModules = async (modules) => {
        if (modules.length === 0) return;

        const modulesToDelete = modules.map(item => {
            return { _id: item["_id"], _rev: item["_rev"] };
        });

        const response = await deleteExistingModules(modulesToDelete);

        if (response.status === 200) {
            setTimeout(async () => {
                await populateModulNummers();
                toast.success("Modul Nummer wird gelöscht");
            }, 100);
            return;
        }

        toast.error("Modul Nummer konnte nicht gelöscht werden");
    }

    return (<div className='container d-flex flex-column min-vh-100 p-2'>
        <div className='text-center'>
            <h1>Modul Nummer Manager</h1>
        </div>
        <div className='d-flex flex-row p-2'>
            <input className='col form-control m-2' type='text' placeholder='Modul Nummer' onChange={(e) => { setTempSearchTerm(e.target.value) }} />
            <button className='col-2 btn btn-secondary m-2' onClick={() => setSearchTerm(tempSearchTerm)}>Suchen</button>
        </div>
        <div className='d-flex flex-row p-2'>
            <div className='d-flex flex-column col-5'>
                <div className='row-1 p-2'>
                    <h4 className='m-2'>Modulnummer hinzufügen</h4>
                    <input class="form-control" type="text" placeholder="Modul Nummer" onChange={(e) => { setModulNummer(e.target.value) }} />
                    <input class="form-control mt-2" type="text" placeholder="Modul Name" onChange={(e) => { setModulName(e.target.value) }} />
                    <button class="btn btn-secondary mt-2" onClick={() => { addModules([{ _id: modulNummer, modulName: modulName }]) }}>Hinzufügen</button>
                </div>

                <div className='row-1 p-2'>
                    <h4 className='m-2'>
                        Massen-Upload
                        <i class="bi bi-exclamation-circle m-2" role="button" onClick={() => {
                            toast("Bitte laden Sie eine .txt Datei hoch, die folgendes Format hat: ModulNummers,ModulNames", {
                                type: "info",
                                width: "300px",
                                style: {
                                    backgroundColor: "#343a40",
                                    color: "white",
                                    border: "1px solid white",
                                    borderRadius: "5px",
                                    padding: "10px",
                                    fontFamily: "sans-serif",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    textAlign: "center"
                                },
                                position: "top",
                                closeable: true,
                                duration: 7000
                            })
                        }}></i>
                    </h4>
                    <input className='form-control' type='file' placeholder='Modul Nummer File' onChange={(e) => {
                        let ret = false;
                        if (e.target.files.length === 0) ret = true;
                        if (e.target.files[0].type !== 'text/plain') ret = true;
                        if (e.target.files[0].size > 1000000) ret = true;
                        if (e.target.files[0].size === 0) ret = true;
                        if (e.target.files[0].name.split(".").pop() !== "txt") ret = true;
                        if (ret) {
                            toast.error("Bitte laden Sie eine .txt Datei hoch, die folgendes Format hat: ModulNummers,ModulNames");
                            e.target.value = null;
                            return;
                        }
                        const fileReader = new FileReader();
                        fileReader.readAsText(e.target.files[0], "UTF-8");
                        fileReader.onload = e => {
                            let lines = e.target.result.split(/\r\n|\n/);
                            lines = lines.filter(line => line !== "");
                            if (lines.length === 0) ret = true;
                            if (lines[0] !== "ModulNummers,ModulNames") ret = true;
                            if (ret) {
                                toast.error("Bitte laden Sie eine .txt Datei hoch, die folgendes Format hat: ModulNummers,ModulNames");
                                e.target.value = null;
                                return;
                            }
                            lines.shift();

                            const modules = [];

                            lines.forEach(line => {
                                let first = line.split(",")[0];
                                let second = line.split(",")[1];
                                modules.push({ _id: first, modulName: second });
                            });

                            addModules(modules);
                            e.target.value = null;
                        };
                    }} />
                    <a className='btn btn-secondary mt-2' href="/home">Abbrechen</a>
                </div>
            </div>
            <div className='col-7 list-group'>
                {searchModulNummers.map((item, index) => {
                    return (
                        <div className='d-flex flex-row'>
                            <div className='col list-group-item m-2' key={index}>
                                <div className='d-flex flex-row align-items-center'>
                                    <div className='col-5'>{item["_id"]}</div>
                                    <div className='col-5'>{item["modulName"]}</div>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={item["checked"]} onClick={() => {
                                        const modules = [...modulNummers];
                                        item["checked"] = !item["checked"];
                                        modules.forEach(module => {
                                            if (module["_id"] === item["_id"]) {
                                                module["checked"] = item["checked"];
                                            }
                                        });
                                        setModulNummers(modules);
                                    }} />
                                </div>
                            </div>
                        </div>
                    )
                })}

                <div className="d-flex flex-row">

                    <button className='col btn btn-secondary m-2' onClick={() => {
                        const modules = [...modulNummers];
                        modules.forEach(item => item.checked = !item.checked);
                        setModulNummers(modules);
                    }}>Alle auswählen</button>
                    <button className='col btn btn-secondary m-2' onClick={() => {
                        const modules = [...modulNummers];

                        const mtd = modules.filter(item => item.checked);
                        setModulesToDelete(mtd);

                        if (mtd.length === 0) {
                            toast.error("Keine Modul Nummer ausgewählt");
                            return;
                        }
                        setShow(true);
                    }
                    }>Löschen</button>



                    <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Vorhandene Modulnummern löschen</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{modulesToDelete.length > 0 &&
                            <div>
                                <h5>Die folgenden Modulnummern werden gelöscht:</h5>
                                {modulesToDelete.map((item, index) => {
                                    return (
                                        <div className='d-flex flex-row'>
                                            <div className='col list-group-item m-2' key={index}>
                                                <div className='d-flex flex-row align-items-center'>
                                                    <div className='col-5'>{item["_id"]}</div>
                                                    <div className='col-5'>{item["modulName"]}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        }</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)}>
                                Abbrechen
                            </Button>
                            <Button variant="secondary" onClick={() => {
                                deleteModules(modulesToDelete);
                                setShow(false);
                            }}>
                                Modul Nummern Löschen
                            </Button>
                        </Modal.Footer>
                    </Modal>


                </div>


            </div >

        </div >

    </div >);
}