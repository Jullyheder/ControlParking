import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Report() {
    const [Report, setReport] = useState([]);
    const [Loading, setLoading] = useState(true);

    function totalCarro() {
        let soma = 0;

        Report.map(vehicle => (vehicle.idVehicles == 1 ? soma += vehicle.amount : ''));

        return soma.toLocaleString('pt-br', { minimumFractionDigits: 2 });
    };

    function totalMoto() {
        let soma = 0;

        Report.map(vehicle => (vehicle.idVehicles == 2 ? soma += vehicle.amount : ''));

        return soma.toLocaleString('pt-br', { minimumFractionDigits: 2 });
    };

    function total() {
        let soma = 0;

        Report.map(vehicle => (soma += vehicle.amount));

        return soma.toLocaleString('pt-br', { minimumFractionDigits: 2 });
    };

    function toDate(dateStr) {
        var data = new Date(dateStr);

        data = data.toLocaleString();

        return data;
    };

    useEffect(() => {
        async function LoadApi() {
            const response = await api.get('report');
            setReport(response.data);

            setLoading(false);
        }

        LoadApi();

    }, []);

    return (
        <div>
            <header>
                <h1 class="display-4">Relatório Diário</h1>
                <div class="d-flex justify-content-between">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Total Carro</th>
                                <th scope="col">Total Carro</th>
                                <th scope="col">Total Geral</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                <th scope="row">{totalCarro()}</th>
                                <th scope="row">{totalMoto()}</th>
                                <th scope="row">{total()}</th>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </header>
            <main>
                {Report.length > 0 ?
                    <div>
                        <div>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Tipo do Veículo</th>
                                        <th scope="col">Placa</th>
                                        <th scope="col">Data De Entrada</th>
                                        <th scope="col">Data De Saída</th>
                                        <th scope="col">Valor Estadia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Report.map(vehicle => (
                                        <tr>
                                            <th scope="row">{vehicle.id}</th>
                                            <td>{vehicle.idVehicles === 1 ? 'Carro' : 'Moto'}</td>
                                            <td>{vehicle.plates}</td>
                                            <td>{toDate(vehicle.input)}</td>
                                            <td>{toDate(vehicle.exit)}</td>
                                            <td>{vehicle.amount.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</td>
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

export default Report;
