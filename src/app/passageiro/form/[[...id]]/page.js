'use client'

import Pagina from "@/app/components/Pagina";
import PassageiroValidator from "@/app/validators/PassageiroValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { v4 } from "uuid";

export default function Page({ params }) {

    const route = useRouter()

    const passageiros = JSON.parse(localStorage.getItem('passageiros')) || []
    const dados = passageiros.find(item => item.id == params.id)
    const passageiro = dados || { nome: '', tipo_documento: '', documento: '', email: '', telefone: '', data_nascimento: '' }

    function salvar(dados) {

        if (passageiro.id) {
            Object.assign(passageiro, dados)
        } else {
            dados.id = v4()
            passageiros.push(dados)
        }

        localStorage.setItem('passageiros', JSON.stringify(passageiros))
        return route.push('/passageiro');
    }

    return (
        <Pagina titulo="Passageiro">
            <Formik
                initialValues={passageiro}
                validationSchema={PassageiroValidator}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
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
                                isInvalid={!!errors.nome && touched.nome}
                            />
                            <ErrorMessage name="nome" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="tipo_documento">
                            <Form.Label>Tipo documento</Form.Label>
                            <Form.Control type="text"
                                placeholder="Digite o tipo de documento"
                                name="tipo_documento"
                                value={values.tipo_documento}
                                onChange={handleChange('tipo_documento')}
                                isInvalid={!!errors.tipo_documento && touched.tipo_documento}
                            />
                            <ErrorMessage name="tipo_documento" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="documento">
                            <Form.Label>Documento</Form.Label>
                            <Form.Control type="text"
                                placeholder="Digite o o documento"
                                name="documento"
                                value={values.documento}
                                onChange={handleChange('documento')}
                                isInvalid={!!errors.documento && touched.documento}
                            />
                            <ErrorMessage name="documento" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"
                                placeholder="Digite o email"
                                name="email"
                                value={values.email}
                                onChange={handleChange('email')}
                                isInvalid={!!errors.email && touched.email}
                            />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="telefone">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control type="text"
                                placeholder="Digite o telefone"
                                name="telefone"
                                value={values.telefone}
                                onChange={handleChange('telefone')}
                                isInvalid={!!errors.telefone && touched.telefone}
                            />
                            <ErrorMessage name="telefone" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="data_nascimento">
                            <Form.Label>Data Nascimento</Form.Label>
                            <Form.Control type="date"
                                name="data_nascimento"
                                value={values.data_nascimento}
                                onChange={handleChange('data_nascimento')}
                                isInvalid={!!errors.data_nascimento && touched.data_nascimento}
                            />
                            <ErrorMessage name="data_nascimento" component="div" className="text-danger" />
                        </Form.Group>
                        <div className="text-center">
                            <Link href={"/passageiro"} className="btn btn-primary"><FaAngleLeft />Voltar</Link>
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