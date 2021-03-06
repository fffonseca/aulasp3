import React, { Component } from "react";
import { Container, Button, Table } from "reactstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

class ListaAlunos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaAlunos: [],
    };
  }

  //lifecycle do componente
  componentDidMount() {
    //const url = "http://localhost:3001/alunos";
    const url = "http://localhost:3001/api/v1/alunos";

    axios
      .get(url)
      .then((res) => {
        if (res.status !== "500" && res.data.success) {
          //const data = res.data.data;
          const data = res.data.dados;
          this.setState({ listaAlunos: data });
        } else if (res.status === "500") {
          console.log("Erro");
        }
      })
      .catch((error) => {
        console.log("Error Msg: " + error);
      });
  }

  render() {
    return (
      <Container>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Morada</th>
              <th>Telefone</th>
              <th>Editar</th>
              <th>Apagar</th>
            </tr>
          </thead>
          <tbody>{this.preencheDados()}</tbody>
        </Table>
      </Container>
    );
  }

  preencheDados() {
    return this.state.listaAlunos.map((data, index) => {
      return (
        <tr key={index}>
          <td>{data.id}</td>
          <td>{data.nome}</td>
          <td>{data.email}</td>
          <td>{data.morada}</td>
          <td>{data.telefone}</td>
          <td>
            <NavLink to={"/edit/" + data.id}>
              <Button color="info">Editar</Button>
            </NavLink>
          </td>
          <td>
            <Button color="danger">Apagar</Button>
          </td>
        </tr>
      );
    });
  }
}
export default ListaAlunos;
