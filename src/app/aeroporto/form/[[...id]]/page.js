'use client'

import Pagina from "@/app/components/Pagina";
import apiLocalidade from "@/app/services/apiLocalidade";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { v4 } from "uuid";

export default function Page({ params }) {

    const route = useRouter()

    const aeroportos = JSON.parse(localStorage.getItem('aeroportos')) || []
    const dados = aeroportos.find(item => item.id == params.id)
    const aeroporto = dados || { nome: '', sigla: '', uf: '', cidade: '', pais: 'Brasil' }

    const [paises, setPaises] = useState([])
    const [ufs, setUfs] = useState([])
    const [cidades, setCidades] = useState([])
    const [camposBrasil, setCamposBrasil] = useState(false)

    useEffect(() => {
        apiLocalidade.get(`paises`).then(resultado => {
            setPaises(resultado.data)
        })
    }, [])

    useEffect(() => {
        apiLocalidade.get(`estados?orderBy=nome`).then(resultado => {
            setUfs(resultado.data)
        })
    }, [])
    
    useEffect(() => {
        apiLocalidade.get(`estados//municipios`).then(resultado => {
            setCidades(resultado.data)
        })
    }, [])

    function salvar(dados) {

        if (aeroporto.id) {
            Object.assign(aeroporto, dados)
        } else {
            dados.id = v4()
            aeroportos.push(dados)
        }

        localStorage.setItem('aeroportos', JSON.stringify(aeroportos))
        return route.push('/aeroporto');
    }

    return (
        <Pagina titulo="Aeroporto">
            <Formik
                initialValues={aeroporto}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => {

                    useEffect(() => {
                        setCamposBrasil(values.pais == 'Brasil')
                    }, [values.pais])

                    useEffect(() => {
                        apiLocalidade.get(`estados/${values.uf}/municipios`).then(resultado => {
                            setCidades(resultado.data)
                        })
                    }, [values.uf])

                    return (
                        <Form className="mt-3">
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o nome do aeroporto"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange('nome')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="sigla">
                                <Form.Label>Sigla</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Digite a sigla aeroporto"
                                    name="sigla"
                                    value={values.sigla}
                                    onChange={handleChange('sigla')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="pais">
                                <Form.Label>País</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="pais"
                                    value={values.pais}
                                    onChange={handleChange('pais')}
                                >
                                    <option value={''}>Selecione</option>
                                    {paises.map(item => (
                                        <option key={item.id} value={item.nome}> {item.nome} </option>
                                    ))}

                                </Form.Select>
                            </Form.Group>
                            {camposBrasil &&

                                <>
                                    <Form.Group className="mb-3" controlId="uf">
                                        <Form.Label>UF</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            name="uf"
                                            value={values.uf}
                                            onChange={handleChange('uf')}
                                        >
                                            <option value={''}>Selecione</option>
                                            {ufs.map(item => (
                                                <option
                                                    key={item.id}
                                                    value={item.sigla}
                                                >
                                                    {item.sigla} - {item.nome}
                                                </option>
                                            ))}

                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="cidade">
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            name="cidade"
                                            value={values.cidade}
                                            onChange={handleChange('cidade')}
                                        >
                                            <option value={''}>Selecione</option>
                                            {cidades.map(item => (
                                                <option key={item.nome} value={item.nome}> {item.nome} </option>
                                            ))}

                                        </Form.Select>
                                    </Form.Group>
                                </>
                            }

                            <div className="text-center">
                                <Link href={"/aeroporto"} className="btn btn-primary"><FaAngleLeft />Voltar</Link>
                                <Button variant="success" className="ms-1" onClick={handleSubmit}>
                                    <FaCheck />Salvar
                                </Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </Pagina>
    )
}