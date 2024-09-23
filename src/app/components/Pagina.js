'use client'
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useEffect, useState } from "react";
import apiAnime from "@/app/services/apiAnime";

export default function Pagina(props) {
    const [genero, setGenero] = useState([])

    useEffect(() => {
        apiAnime.get('genres/anime').then(resultado => {
            setGenero(resultado.data.data)
        })
    }, [])
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/animes">Animes</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/animes">Animes</Nav.Link>
                        <NavDropdown title="Gêneros" id="basic-nav-dropdown">
                            {genero.map(item => (
                                    <NavDropdown.Item key={item.mal_id}>{item.name} ({item.count})</NavDropdown.Item>
                                ))}
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>

            <div className="bg-secondary text-white text-center p-3">
                <h1>{props.titulo}</h1>
            </div>

            <Container>
                {props.children}
            </Container>

            <footer>
                <p className="bg-secondary text-white text-center p-3">Rodapé</p>
            </footer>
        </>
    )
}