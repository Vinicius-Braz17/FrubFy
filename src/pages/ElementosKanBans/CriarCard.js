import s from "./CriarCard.module.css";
import { useEffect, useState } from "react";

function CriarCard({ fecharPainel, BD, Ids }) {
  const dias = [
    {
        dia: '',
        id: 0
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

  const [cargos, setCargos] = useState([]);
  const [filiais, setFiliais] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4500/cargos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCargos(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4500/filiais", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setFiliais(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function preencherDepartamentos() {
    var opcaoSelecionada = document.querySelector("#funcao").value;

    for (let i = 0; i < cargos.length; i++) {
      if (opcaoSelecionada === cargos[i].nome) {
        document.querySelector("#departamento").value = cargos[i].departamento;
        setC({ ...c, departamento: cargos[i].departamento });
      }
    }
  }

  function preencherFuncao() {
    var opcaoSelecionada = document.querySelector("#funcao").value;

    preencherDepartamentos();

    setC({ ...c, funcao: opcaoSelecionada });

    console.log(c);
  }

  function HandleSelectChange(e) {
    var opcaoSelecionada = document.getElementById(e.target.name).value;

    setC({ ...c, [e.target.name]: opcaoSelecionada });
    console.log(c);
  }

  function ToUpperCase(e) {
    var textoInserido = document.querySelector("#INP").value;
    document.querySelector("#INP").value = textoInserido.toUpperCase();
    HandleChange(e);
  }

  function submit() {
    inserirCardBD(c);
  }

  function inserirCardBD(NewCard) {
    NewCard.fase = 1;
    NewCard.id = Ids;

    let p = "http://localhost:4500" + BD

    fetch(p, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(NewCard),
    })
      .then((resp) => {
        // return resp.text();
        resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  const [c, setC] = useState({});

  function HandleChange(e) {
    setC({ ...c, [e.target.name]: e.target.value });
    console.log(c);
  }

  return (
    <section className={s.criarCard}>
      <h1>Crie um novo card</h1>
      <button id={s.botaoX} onClick={fecharPainel}>
        X
      </button>

      <form onSubmit={submit}>
        <div>
          <p>Nome: </p>
          <input
            id="INP"
            required
            autoComplete="off"
            name="nome"
            onKeyUp={ToUpperCase}
            type="text"
            placeholder="Digite o nome do candidato" /*onChange={HandleChange}*/
          />
        </div>

        <div>
          <p>Telefone: </p>
          <input
            type="text"
            required
            autoComplete="off"
            maxLength="15"
            name="telefone"
            onChange={HandleChange}
            placeholder="Digite o numero de telefone do candidato"
          />
        </div>

        <div>
          <p>Cargo: </p>
          <select
            name="funcao"
            required
            onClick={preencherDepartamentos}
            onKeyUp={preencherDepartamentos}
            onChange={preencherFuncao}
            id="funcao"
          >
            {cargos.map((op) => (
              <option id={op.nome} key={op.id}>
                {op.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p>Departamento: </p>
          <input
            type="text"
            required
            id="departamento"
            name="departamento"
            onKeyUp={HandleChange}
            className={s.departamento}
            placeholder="Campo preenchido automaticamente"
            readOnly
          />
        </div>

        <div>
          <p>Salário: </p>
          <input
            type="number"
            required
            autoComplete="off"
            name="salario"
            onChange={HandleChange}
            placeholder="Digite o salário do candidato"
          />
        </div>

        <div className={s.divEscala}>
          <p>Escala: </p> <br></br>
          <select
            name="diaInicio"
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
          a
          <select
            name="diaFim"
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
          <input
            type="time"
            required
            className={s.escala}
            autoComplete="off"
            name="escalaInicio"
            onChange={HandleChange}
          />
          às
          <input
            type="time"
            required
            className={s.escala}
            autoComplete="off"
            name="escalaFim"
            onChange={HandleChange}
          />
        </div>

        <div>
          <p>Filial: </p>
          <select
            name="filial"
            required
            id="filial"
            onChange={HandleSelectChange}
          >
            {filiais.map((op) => (
              <option id={op} key={op.ID}>
                {op.nome}
              </option>
            ))}
          </select>
        </div>

        <div className={s.criarCardButtonSub}>
          <button>Criar Card</button>
        </div>
      </form>
    </section>
  );
}

export default CriarCard;
