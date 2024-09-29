'use client'

import Pagina from "@/app/components/Pagina";
import Link from "next/link";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";

export default function Page() {

    const voo = JSON.parse(localStorage.getItem('voo')) || []

    return (
        <Pagina titulo="Voos">

            <Link href={"/voo/create"} className="btn btn-primary mb-3 mt-3">
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Internacional</th>
                        <th>Identificador</th>
                        <th>Data Checkin</th>
                        <th>Data Embarque</th>
                        <th>Origem</th>
                        <th>Destino</th>
                        <th>Empresa</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {voo.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.internacional}</td>
                            <td>{item.identificador}</td>
                            <td>{item.data_checkin}</td>
                            <td>{item.data_embarque}</td>
                            <td>{item.origem}</td>
                            <td>{item.destino}</td>
                            <td>{item.empresa}</td>
                            <td>{item.preco}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    )
}