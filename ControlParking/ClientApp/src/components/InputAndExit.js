import React, { useState, useEffect } from 'react';
import api from '../services/api';
import InputMask from "react-input-mask";
import { Button, Modal } from 'react-bootstrap';

function InputAndExit() {
    const [VehicleRecords, setVehicleRecords] = useState([]);
    const [Vehicles, setVehicles] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [Type, setType] = useState(1);
    const [Plate, setPlate] = useState('');
    const [Alert, setAlert] = useState('');
    const [show, setShow] = useState(false);
    const [stay, setStay] = useState(0);

    async function RegisterVehicleRecords(event) {
        event.preventDefault();
        if (Vehicles.length > 0) {
            let verify = Plate.replace('_', '');
            if ((Type === 1 || 2) && verify.length === 8) {
                let vehicleRecord = {
                    idVehicles: Type,
                    plates: Plate,
                };
                await api.post('vehiclerecords', vehicleRecord)
                    .then((response) => {
                        if (response.data === 2) {
                            setAlert('Veículo esta no estacionamento!');
                            setTimeout(function () { setAlert(''); }, 5000);
                        } else if (response.data === 0) {
                            setAlert('Por favor verificar o valor digitado da placa do veículo');
                            setTimeout(function () { setAlert(''); }, 5000);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                LoadVehicles();
                setPlate('');
            } else {
                setAlert('Não foi digitado valor ou o tipo esta inválido!');
                setTimeout(function () { setAlert(''); }, 5000);
            }
        } else {
            setAlert('Por favor cadastrar valores dos veículos!');
            setTimeout(function () { setAlert(''); }, 5000);
        }        
    };

    async function updateVehicle(id) {
        await api.put('vehiclerecords/' + id)
            .then((response) => { setStay(response.data.toLocaleString('pt-br', { minimumFractionDigits: 2 })); setShow(true); })
            .catch((err) => {
                console.log(err);
            });
        LoadVehicles();
    };

    async function LoadVehicles() {
        const response = await api.get('vehiclerecords');
        setVehicleRecords(response.data);

        setLoading(false);
    };

    function toDate(dateStr) {
        var data = new Date(dateStr);

        data = data.toLocaleString();

        return data;
    };

    useEffect(() => {
        async function LoadApi() {
            const response = await api.get('vehiclerecords');
            setVehicleRecords(response.data);
        };

        async function LoadApiVehicle() {
            const response = await api.get('vehicles');
            setVehicles(response.data);
        }

        LoadApi();
        LoadApiVehicle();
        setLoading(false);

    }, []);

    return(
            <div>
                <header>
                    <h1 class="display-4">Registrar Entrada e Saída dos Veículos</h1>
                    {Alert !== '' ?
                        <div class="alert alert-danger" role="alert">
                            {Alert}
                        </div>
                    : ''}
                    <Modal
                        show={show}
                        onHide={() => setShow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Valor total da estadia: R${stay}
                            </Modal.Title>
                        </Modal.Header>
                    </Modal>
                </header>
                <main>
                    <div>
                        <form onSubmit={RegisterVehicleRecords}>
                            <div class="col-md-6">
                                <label for="type" class="form-label">Tipo do veículo</label>
                                <select class="form-select form-select-lg mb-3 form-control" value={Type} onChange={(e) => setType(parseInt(e.target.value, 10))} id="type" aria-label=".form-select-lg example">
                                    <option value="1" selected>Carro</option>
                                    <option value="2">Moto</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="plate" class="form-label">Placa do veículo</label>
                            <InputMask type="text" mask="aaa-9*99" value={Plate} onChange={(e) => setPlate(e.target.value.toUpperCase())} style={{ textTransform: 'uppercase' }} class="form-control" id="plate" placeholder="AAA-9999" />
                            </div>
                            <div class="col-12" style={{ marginTop: 20, marginBottom: 20 }}>
                                <button type="submit" class="btn btn-outline-success">Registrar Entrada do Veículo</button>
                            </div>
                        </form>
                    </div>
                    {VehicleRecords.length > 0 ?
                    <div>
                        
                        <header>
                            <h1 class="display-4">Veículos Estacionados</h1>
                        </header>
                        <div>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Tipo do Veículo</th>
                                        <th scope="col">Placa</th>
                                        <th scope="col">Data De Entrada</th>
                                        <th scope="col">Registrar Saída</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {VehicleRecords.map(vehicle => (
                                        <tr>
                                            <th scope="row">{vehicle.id}</th>
                                            <td>{vehicle.idVehicles === 1 ? 'Carro' : 'Moto'}</td>
                                            <td>{vehicle.plates}</td>
                                            <td>{toDate(vehicle.input)}</td>
                                            <td><button onClick={() => updateVehicle(vehicle.id)} class="btn btn-outline-danger">Registrar Saída do Veículo</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : ''}
                </main>
            </div >
        );
}

export default InputAndExit;
