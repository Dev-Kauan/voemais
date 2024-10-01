'use client'

import Pagina from "@/app/components/Pagina";
import Link from "next/link";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Page() {

    const [empresas, setEmpresas] = useState([])

    useEffect(() => {
        setEmpresas(JSON.parse(localStorage.getItem('empresas')) || [])
    }, [])

    function excluir(id) {
        if (confirm('Deseja realmente excluir?')) {
            //Pega todos que é diferente do id informado pelo o parametro
            const dados = empresas.filter(item => item.id != id)
            localStorage.setItem('empresas', JSON.stringify(dados))
            setEmpresas(dados)
        }
    }

    return (
        <Pagina titulo="Empresas">

            <Link href={"/empresas/create"} className="btn btn-primary mb-3 mt-3">
                <FaPlusCircle />Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Logo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {empresas.map((item, i) => (
                        <tr key={item.id}>
                            <td>{i + 1}</td>
                            <td>{item.nome}</td>
                            <td>
                                <a href={item.site} target="_blank">
                                    <img src={item.logo} style={{ width: 70 }} />
                                </a>
                            </td>
                            <td>
                                <Link href={`empresas/update/${item.id}`}>
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