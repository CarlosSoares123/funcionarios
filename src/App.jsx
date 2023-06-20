import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'

function App() {

  const [nome, setNome]= useState("")
  const [idade, setIdade]= useState("")
  const [pais, setPais]= useState("")
  const [cargo, setCargo]= useState("")
  const [anos, setAnos]= useState("")
  const [id, setId  ]= useState(0)

  const [editar, setEditar]= useState(false)

  const [empregadosList, setEmpregados] = useState([])

  const webServer = 'https://nice-cyan-crane-gown.cyclic.app'

  const add = () => {
    axios.post(`${webServer}/criar`, {
      nome,
      idade,
      pais,
      cargo,
      anos
    }).then(()=> {
      getEmpregados()
      limparCampos()
      Swal.fire({
        title: "<strong>Registrado</strong>",
        html: `<i>O Funcionário <strong>${nome}</strong> registrado com exito !!!</i>`,
        icon: "Sucess",
        timer: 3000
      }).catch((error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Tentar mais tarde":JSON.parse(JSON.stringify(error))
        })
      })
    })
  }

  const update = () => {
    axios.put(`${webServer}/actualizar`, {
      id,
      nome,
      idade,
      pais,
      cargo,
      anos
    }).then(()=> {
      getEmpregados()
      limparCampos()
      Swal.fire({
        title: "<strong>Registrado</strong>",
        html: `<i>O Funcionário <strong>${nome}</strong> actualizado com exito !!!</i>`,
        icon: "Sucess",
        timer: 3000
      }).catch((error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Tentar mais tarde":JSON.parse(JSON.stringify(error))
        })
      })
    })
  }
  
  const deleteEmpregado = (value) => {

    Swal.fire({
      title: "Eliminar",
      html: `<i>Tens a cetreza que queres eliminar <strong>${value.nome}</strong></i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Sim, Eliminar"
    }).then(res=>{
      if(res.isConfirmed){
        axios.delete(`${webServer}/deletar/${value.id}`).then(()=> {
          getEmpregados()
          limparCampos()
          Swal.fire({
            icon: 'success',
            title: value.nome+'foi eliminado.',
            showConfirmButton: false,
            timer:2000
          })
        }).catch((error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Não foi possível eliminar o funcionário!',
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Tentar mais tarde":JSON.parse(JSON.stringify(error))
          })
        })
      }
    })


  }

  const limparCampos = () => {
    setNome(""),
    setIdade(""),
    setCargo(""),
    setPais(""),
    setAnos(""),
    setId("")
    setEditar(false)
  }


  const editarEmpregados = (valor) => {
    setEditar(true)

    setNome(valor.nome),
    setIdade(valor.idade),
    setCargo(valor.cargo),
    setPais(valor.pais),
    setAnos(valor.anos),
    setId(valor.id)
  }



  const getEmpregados = () => {
    axios.get(`${webServer}/empregados`).then((response) => {
    setEmpregados(response.data);
    console.log("Lista de empregados mostrada com sucesso")
    } )
  }

  useEffect(()=>{
    getEmpregados()
  }, [])


  return (
    <div className="container">
        <div className="card text-center">
          <div className="card-header">
            Gestão de Funcionários
          </div>
          
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Nome:</span>
              <input 
              type="text" 
              value={nome}
              onChange={(e) => {
                setNome(e.target.value)
              }}
              className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Idade:</span>
              <input type="number" value={idade}
              onChange={(e) => {
                setIdade(e.target.value)
              }}
              className="form-control" placeholder="Digite a sua idade" aria-label="Digite_a_sua_idade" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">País:</span>
              <input type="text" value={pais}
              onChange={(e) => {
                setPais(e.target.value)
              }}
              className="form-control" placeholder="Digite o seu País" aria-label="Digite o seu País" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Cargo:</span>
              <input type="text" value={cargo}
              onChange={(e) => {
                setCargo(e.target.value)
              }}
              className="form-control" placeholder="Digite o seu Cargo" aria-label="Digite o seu Cargo" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Anos de Experiência</span>
              <input type="text" value={anos}
              onChange={(e) => {
                setAnos(e.target.value)
              }}
              className="form-control" placeholder="Digite o seus de experência" aria-label="Digite o seus de experência" aria-describedby="basic-addon1"/>
            </div>
          </div>
          <div className="card-footer text-muted">
          {
            editar? 
            <div>
              <button onClick={update} className='btn btn-warning m-2'>Actualizar</button>
              <button onClick={limparCampos} className='btn btn-info m-2'>Cancelar</button>
            </div>
            :<button onClick={add} className='btn btn-success'>Registrar</button>
          }
          </div>
        </div>

        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Nome</th>
              <th scope='col'>Idade</th>
              <th scope='col'>País</th>
              <th scope='col'>Cargo</th>
              <th scope='col'>Experiência</th>
              <th scope='col'>Acções</th>
            </tr>
          </thead>
          <tbody>
            {
              empregadosList.map((value, key)=> {
                  return(
                    <tr>
                      <th scope='row'>{value.id}</th>
                      <td>{value.nome}</td>
                      <td>{value.idade}</td>
                      <td>{value.pais}</td>
                      <td>{value.cargo}</td>
                      <td>{value.anos}</td>
                      <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" 

                        onClick={()=> { editarEmpregados(value)}}

                        className="btn btn-info">Editar</button>
                        <button type="button" onClick={() => {
                          deleteEmpregado(value)
                        }} className="btn btn-danger">Eliminar</button>
                      </div>
                      </td>
                    </tr>
                  )
              })
            }
          </tbody>
        </table>
    </div>
  )
}

export default App
