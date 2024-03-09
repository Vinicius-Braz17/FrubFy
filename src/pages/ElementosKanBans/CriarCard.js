import s from "./CriarCard.module.css";
import { useEffect, useState } from "react";
import sp from "../../Supabase";

function CriarCard({ fecharPainel, BD }) {
  const dias = [
    {
      dia: "",
      id: 0,
    },
    {
      dia: "Segunda-feira",
      id: 1,
    },
    {
      dia: "Terça-feira",
      id: 2,
    },
    {
      dia: "Quarta-feira",
      id: 3,
    },
    {
      dia: "Quinta-feira",
      id: 4,
    },
    {
      dia: "Sexta-feira",
      id: 5,
    },
    {
      dia: "Sábado",
      id: 6,
    },
    {
      dia: "Domingo",
      id: 7,
    },
  ];
  
  const [c, setC] = useState({fase: 1, cod_admissao: BD});
  console.log(c);
  
  const [cargos, setCargos] = useState([]);
  const [filiais, setFiliais] = useState([]);
  
  /* nova API para banco de dados */

  async function getCargos() {
    const { data } = await sp.from("cargos").select();
    setCargos(data);
  }

  async function getFiliais() {
    const { data } = await sp.from("filiais").select();
    setFiliais(data)
  }
  
  useEffect(() => {
    getCargos();
    getFiliais()
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:8800/CARGOS", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setCargos(data);
  //     })
  // }, []);

  function preencherDepartamentos(e) {

    for (let i = 0; i < cargos.length; i++) {
      if (e.target.value === cargos[i].nome_cargo) {
        document.getElementById('departamento').value = cargos[i].departamento;
        setC({...c, cargo: e.target.value, departamento: cargos[i].departamento})
        break;
      } 
    }
  }

  // function preencherFuncao() {
  //   var opcaoSelecionada = document.querySelector("#funcao").value;

  //   preencherDepartamentos();

  //   setC({ ...c, funcao: opcaoSelecionada });

  // }

  function HandleSelectChange(e) {

    setC({...c, [e.target.name]: e.target.value });
  }

  function ToUpperCase(e) {
    var textoInserido = document.querySelector("#INP").value;
    document.querySelector("#INP").value = textoInserido.toUpperCase();
    HandleChange(e);
  }

  function submit(e) {
    // e.preventDefault();
    inserirCardBD();
  }

  async function inserirCardBD() {
    // Função para inserir cards no banco de dados
    await sp.from('candidatos').insert(c)
  }

  function HandleChange(e) {
    if (e.target.name === 'nome') {
      let valor = e.target.value.toUpperCase()
      setC({ ...c, [e.target.name]: valor });
    } else {
      setC({ ...c, [e.target.name]: e.target.value });
    }
  }

  return (
    <section className={s.criarCard}>
      <h1>Crie um novo card</h1>
      <button id={s.botaoX} onClick={fecharPainel}>
        X
      </button>

      <form onSubmit={submit}>
        <p>Nome: </p>
        <input
          id="INP"
          required
          autoComplete="off"
          name="nome"
          onKeyUp={ToUpperCase}
          type="text"
          placeholder="Digite o nome do candidato" /*onChange={HandleChange}*/
          onChange={HandleChange}
            />{" "}
        <br></br>
        <br></br>
        <p>Email: </p>
        <input
          id="INP"
          required
          autoComplete="off"
          name="email"
          onKeyUp={ToUpperCase}
          type="email"
          placeholder="Digite o email do candidato"
          onChange={HandleChange}
            />{" "}
        <br></br>
        <br></br>
        <p>Telefone: </p>
        <input
          type="text"
          required
          autoComplete="off"
          maxLength="15"
          name="telefone"
          onChange={HandleChange}
          onKeyUp={HandleChange}
          placeholder="Digite o numero de telefone do candidato"
        />{" "}
        <br></br>
        <br></br>
        <p>Cargo: </p>
        <select
          name="funcao"
          required
          onChange={preencherDepartamentos}
          onClick={preencherDepartamentos}
          id="funcao"
        >
          <option></option>
          {cargos.map((op) => (
            <option id={op.nome_cargo} key={op.cod_cargo}>
              {op.nome_cargo}
            </option>
          ))}
        </select>{" "}
        <br></br>
        <br></br>
        <p>Departamento: </p>
        <input
          type="text"
          required
          id="departamento"
          name="departamento"
          className={s.departamento}
          placeholder="Campo preenchido automaticamente"
          readOnly
        />{" "}
        <br></br>
        <br></br>
        <p>Salário: </p>
        <input
          type="number"
          required
          autoComplete="off"
          name="salario"
          onChange={HandleChange}
          onKeyUp={HandleChange}
          placeholder="Digite o salário do candidato"
        />{" "}
        <br></br>
        <br></br>
          <p>Escala: </p>
          <div>
            <select
              name="dia_inicio"
              id="diaInicio"
              onClick={HandleSelectChange}
              onChange={HandleSelectChange}
              className={s.escalaDia}
              required
              >
              {dias.map((e) => (
                <option id={e.dia} key={e.id}>
                  {e.dia}
                </option>
              ))}
            </select>
            -
            <select
              name="dia_fim"
              id="diaFim"
              onClick={HandleSelectChange}
              onChange={HandleSelectChange}
              className={s.escalaDia}
              required
              >
              {dias.map((e) => (
                <option id={e.dia} key={e.id}>
                  {e.dia}
                </option>
              ))}
            </select>
          </div>
          <div>
          <input
            type="time"
            required
            className={s.escala}
            autoComplete="off"
            name="horario_inicio"
            onChange={HandleChange}
            onKeyUp={HandleChange}
            />
          -
          <input
            type="time"
            required
            className={s.escala}
            autoComplete="off"
            name="horario_fim"
            onChange={HandleChange}
            onKeyUp={HandleChange}
            />
        </div>
        <br></br>
        <p>Filial: </p>
        <select
          name="filial"
          required
          id="filial"
          onChange={HandleSelectChange}
        >
          <option></option>
          {filiais.map((op) => (
            <option id={op.cod_filial} key={op.cod_filial}>
              {op.nome_filial}
            </option>
          ))}
        </select>
        <br></br>
        <br></br>
        <br></br>
        <button type="submit">Criar Card</button>
      </form>
    </section>
  );
}

export default CriarCard;
