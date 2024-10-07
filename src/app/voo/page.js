'use client'

import Pagina from "@/app/components/Pagina";
import Link from "next/link";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Page() {

    const [voos, setVoos] = useState([])

    useEffect(() => {
        setVoos(JSON.parse(localStorage.getItem('voos')) || [])
    }, [])

    function excluir(id) {
        if (confirm('Deseja realmente excluir?')) {
            //Pega todos que é diferente do id informado pelo o parametro
            const dados = voos.filter(item => item.id != id)
            localStorage.setItem('voos', JSON.stringify(dados))
            setVoos(dados)
        }
    }

    return (
        <Pagina titulo="Voos">

            <Link href={"/voo/form"} className="btn btn-primary mb-3 mt-3">
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
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {voos.map((item, index) => (
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
                            <td>
                                <Link href={`voo/form/${item.id}`}>
                                    <MdEdit title="Editar" className="text-primary" />
                                </Link>
                                <FaTrashAlt
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    )
}