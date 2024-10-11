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

    const passagens = JSON.parse(localStorage.getItem('passagens')) || []
    const dados = passagens.find(item => item.id == params.id)
    const passagem = dados || { voo: '', passageiro: '', assento: '', preco: '' }

    function salvar(dados) {

        if(passagem.id){
            Object.assign(passagem, dados)
        } else {
            dados.id = v4()
            passagens.push(dados)
        }
        
        localStorage.setItem('passagens', JSON.stringify(passagens))
        return route.push('/passagem');
    }

    return (
        <Pagina titulo="Passagem">
            <Formik
                initialValues={passagem}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form className="mt-3">
                        <Form.Group className="mb-3" controlId="voo">
                            <Form.Label>Voo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o voo da passagem"
                                name="voo"
                                value={values.voo}
                                onChange={handleChange('voo')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="passageiro">
                            <Form.Label>Passageiro</Form.Label>
                            <Form.Control type="text"
                                placeholder="Digite o passageiro da passagem"
                                name="passageiro"
                                value={values.passageiro}
                                onChange={handleChange('passageiro')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="assento">
                            <Form.Label>Assento</Form.Label>
                            <Form.Control type="number"
                                placeholder="Digite o assento da passagem"
                                name="assento"
                                value={values.assento}
                                onChange={handleChange('assento')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="preco">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control type="number"
                                placeholder="Digite o preço da passagem"
                                name="preco"
                                value={values.preco}
                                onChange={handleChange('preco')}
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Link href={"/passagem"} className="btn btn-primary"><FaAngleLeft />Voltar</Link>
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