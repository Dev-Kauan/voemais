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

    const voos = JSON.parse(localStorage.getItem('voos')) || []
    const dados = voos.find(item => item.id == params.id)
    const voo = dados || { internacional: '', identificador: '', data_checkin: '', data_embarque: '', origem: '', destino: '', empresa: '', preco: '' }

    function salvar(dados) {

        if(voo.id){
            Object.assign(voo, dados)
        } else {
            dados.id = v4()
            voos.push(dados)
        }
        
        localStorage.setItem('voos', JSON.stringify(voos))
        return route.push('/voo');
    }

    return (
        <Pagina titulo="Voo">
            <Formik
                initialValues={voo}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form className="mt-3">
                        <Form.Group className="mb-3" controlId="internacional">
                            <Form.Label>Internacional</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite se é internacional ou não"
                                name="internacional"
                                value={values.internacional}
                                onChange={handleChange('internacional')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="identificador">
                            <Form.Label>Identificador</Form.Label>
                            <Form.Control type="text"
                                placeholder="Digite identificador"
                                name="identificador"
                                value={values.identificador}
                                onChange={handleChange('identificador')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="data_checkin">
                            <Form.Label>Data Checkin</Form.Label>
                            <Form.Control type="date"
                                name="data_checkin"
                                value={values.data_checkin}
                                onChange={handleChange('data_checkin')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="data_embarque">
                            <Form.Label>Data Embarque</Form.Label>
                            <Form.Control type="date"
                                name="data_embarque"
                                value={values.data_embarque}
                                onChange={handleChange('data_embarque')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="origem">
                            <Form.Label>Origem</Form.Label>
                            <Form.Control type="text"
                                placeholder="Digite a origem"
                                name="origem"
                                value={values.origem}
                                onChange={handleChange('origem')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="destino">
                            <Form.Label>Destino</Form.Label>
                            <Form.Control type="text"
                                placeholder="Digite o destino"
                                name="destino"
                                value={values.destino}
                                onChange={handleChange('destino')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="empresa">
                            <Form.Label>Empresa</Form.Label>
                            <Form.Control type="text"
                                placeholder="Digite o nome da empresa"
                                name="empresa"
                                value={values.empresa}
                                onChange={handleChange('empresa')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="preco">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control type="number"
                                placeholder="Digite o preço do voo"
                                name="preco"
                                value={values.preco}
                                onChange={handleChange('preco')}
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Link href={"/voo"} className="btn btn-primary"><FaAngleLeft />Voltar</Link>
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