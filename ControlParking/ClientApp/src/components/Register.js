import React, { useState, useEffect } from 'react';
import api from '../services/api';
import IntlCurrencyInput from "react-intl-currency-input";


function Register() {
    const [Vehicles, setVehicles] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [Carro, setCarro] = useState(0);
    const [Moto, setMoto] = useState(0);
    const [Alert, setAlert] = useState('');

    async function RegisterVehicle(event) {
        event.preventDefault();
        //console.log(Carro.toLocaleString('pt-br', { minimumFractionDigits: 2 }));
        if (Carro !== 0 && Carro !== '' && Moto !== 0 && Moto !== '') {
            let vehicles = [
                {
                    id: 1,
                    nameVehicles: 'Carro',
                    valueVehicles: Carro.toFixed(2)
                },
                {
                    id: 2,
                    nameVehicles: 'Moto',
                    valueVehicles: Moto.toFixed(2)
                }
            ];
            await api.post('vehicles', vehicles)
                .then((response) => setVehicles(response.data))
                .catch((err) => {
                    console.log(err);
                });
            LoadVehicles();
            setCarro(0);
            setMoto(0);
        } else {
            setAlert('Não foi digitado valor ou o valor esta zerado!');
            setTimeout(function () { setAlert(''); }, 5000);
        }
    };

    async function LoadVehicles() {
        const response = await api.get('vehicles');
        setVehicles(response.data);

        setLoading(false);
    }

    useEffect(() => {
        async function LoadApi() {
            const response = await api.get('vehicles');
            setVehicles(response.data);

            setLoading(false);
        }

        LoadApi();

    }, []);
    const currencyConfig = {
        locale: "pt-BR",
        formats: {
            number: {
                BRL: {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                },
            },
        },
    };
    return (
        <div>
            <header>
                <h1 class="display-3">Cadastrar Valores dos Veículos</h1>
                {Alert !== '' ?
                    <div class="alert alert-danger" role="alert">
                        {Alert}
                    </div>
                    : ''}
            </header>
            <main>
                <div>
                    <form onSubmit={RegisterVehicle}>
                        <div class="col-md-6">
                            <label for="carro" class="form-label">Carro</label>
                            <div class="input-group mb-3">
                                <IntlCurrencyInput currency="BRL" config={currencyConfig} value={Carro === 0 ? '' : Carro} onChange={(event, value, maskedValue) => setCarro(value)} class="form-control" id="carro" aria-describedby="basic-addon3" />
                                <span class="input-group-text" id="basic-addon3">/h</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="moto" class="form-label">Moto</label>
                            <div class="input-group mb-3">
                                <IntlCurrencyInput currency="BRL" config={currencyConfig} value={Moto === 0 ? '' : Moto} onChange={(event, value, maskedValue) => setMoto(value)} class="form-control" id="moto" aria-describedby="basic-addon3" />
                                <span class="input-group-text" id="basic-addon3">/h</span>
                            </div>
                        </div>
                        <div class="col-12" style={{ marginTop: 20, marginBottom: 20 }}>
                            <button type="submit" class="btn btn-outline-dark">Registrar Veículo</button>
                        </div>
                    </form>
                </div>
                {Vehicles.length > 0 ?
                    <div>
                        <header>
                            <h1 class="display-4">Valores dos Veículos</h1>
                        </header>
                        <div>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Tipo</th>
                                        <th scope="col">Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Vehicles.map(vehicle => (
                                        <tr>
                                            <th scope="row">{vehicle.id}</th>
                                            <td>{vehicle.nameVehicles}</td>
                                            <td>{vehicle.valueVehicles.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                : ''}
            </main>
        </div>
    );
}

export default Register;