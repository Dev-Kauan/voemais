'use client'

import Pagina from "@/app/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";

export default function Page() {

    const [aeroportos, setAeroportos] = useState([])

    useEffect(() => {
        setAeroportos(JSON.parse(localStorage.getItem('aeroportos')) || [])
    }, [])

    function excluir(id) {
        if (confirm('Deseja realmente excluir?')) {
            //Pega todos que é diferente do id informado pelo o parametro
            const dados = aeroportos.filter(item => item.id != id)
            localStorage.setItem('aeroportos', JSON.stringify(dados))
            setAeroportos(dados)
        }
    }

    return (
        <Pagina titulo="Aeroporto">

            <Link href={"/aeroporto/form"} className="btn btn-primary mb-3 mt-3">
                <FaPlusCircle />Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Sigla</th>
                        <th>UF</th>
                        <th>Cidade</th>
                        <th>País</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {aeroportos.map((item, index )=> (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.nome}</td>
                            <td>{item.sigla}</td>
                            <td>{item.uf}</td>
                            <td>{item.cidade}</td>
                            <td>{item.pais}</td>
                            <td>
                                <Link href={`aeroporto/form/${item.id}`}>
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