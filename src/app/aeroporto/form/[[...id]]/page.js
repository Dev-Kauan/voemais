'use client'

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { v4 } from "uuid";

export default function Page({ params }) {

    const route = useRouter()

    const aeroportos = JSON.parse(localStorage.getItem('aeroportos')) || []
    const dados = aeroportos.find(item => item.id == params.id)
    const aeroporto = dados || { nome: '', sigla: '', uf: '', cidade: '', pais: '' }

    function salvar(dados) {

        if(aeroporto.id){
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
                }) => (
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
                        <Form.Group className="mb-3" controlId="uf">
                            <Form.Label>UF</Form.Label>
                            <Form.Control type="text"
                                placeholder="Digite o UF do aeroporto"
                                name="uf"
                                value={values.uf}
                                onChange={handleChange('uf')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cidade">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control type="text"
                                placeholder="Digite a cidade do aeroporto"
                                name="cidade"
                                value={values.cidade}
                                onChange={handleChange('cidade')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="pais">
                            <Form.Label>País</Form.Label>
                            <Form.Control type="text"
                                placeholder="Digite o país do aeroporto"
                                name="pais"
                                value={values.pais}
                                onChange={handleChange('pais')}
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Link href={"/aeroporto"} className="btn btn-primary"><FaAngleLeft />Voltar</Link>
                            <Button variant="success" className="ms-1" onClick={handleSubmit}>
                                <FaCheck />Salvar
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}