import s from "./AbrirCard.module.css";
import { useEffect, useState } from "react";
import sp from "../../Supabase";

function AbrirCard({ fecharPainel, col }) {
  const dias = [
    {
      dia: "",
    },
    {
      dia: "Segunda-feira",
    },
    {
      dia: "Terça-feira",
    },
    {
      dia: "Quarta-feira",
    },
    {
      dia: "Quinta-feira",
    },
    {
      dia: "Sexta-feira",
    },
    {
      dia: "Sábado",
    },
    {
      dia: "Domingo",
    },
  ];

  const colaborador = col
  const [c, setC] = useState(colaborador);
  const [cargos, setCargos] = useState([]);
  const [filiais, setFiliais] = useState([]);

 
  async function getCargos() {
    const { data } = await sp.from("cargos").select();
    setCargos(data);
  }
  async function getFiliais() {
    const { data } = await sp.from("filiais").select();
    setFiliais(data);
  }

  useEffect(() => {
    getCargos();
    getFiliais();
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

  function ToUpperCase(e) {
    var textoInserido = document.querySelector("#INP").value;
    document.querySelector("#INP").value = textoInserido.toUpperCase();
    HandleChange(e);
  }

  function HandleSelectChange(e) {
    var opcaoSelecionada = document.getElementById(e.target.name).value;

    setC({ ...c, [e.target.name]: opcaoSelecionada });
    console.log(c);
  }

  function HandleChange(e) {
    setC({ ...c, [e.target.name]: e.target.value });
    console.log(c);
  }

  function preencherFuncao() {
    var opcaoSelecionada = document.querySelector("#funcao").value;

    preencherDepartamentos();

    setC({ ...c, funcao: opcaoSelecionada });

    console.log(c);
  }


  return (
    <section className={s.criarCard}>
        <>
          <h1>{colaborador.nome}</h1>
          <button id={s.botaoX} onClick={fecharPainel}>
            X
          </button>

          <form>
            <p>Nome: </p>
            <input
              id="INP"
              required
              autoComplete="off"
              name="nome"
              defaultValue={colaborador.nome}
              onKeyUp={ToUpperCase}
              type="text"
              placeholder="Digite o nome do candidato"
              onChange={HandleChange}
            />{" "}
            <br></br>
            <br></br>
            <p>Telefone: </p>
            <input
              type="text"
              required
              defaultValue={colaborador.telefone}
              autoComplete="off"
              maxLength="15"
              name="telefone"
              onChange={HandleChange}
              placeholder="Digite o numero de telefone do candidato"
            />{" "}
            <br></br>
            <br></br>
            <p>Cargo: </p>
            <select
              name="funcao"
              required
              onClick={preencherDepartamentos}
              onKeyUp={preencherDepartamentos}
              onChange={preencherFuncao}
              id="funcao"
            >
              <option></option>
              {cargos.map((op) => {
                if (op.nome_cargo === colaborador.cargo) {
                  return (
                    <option id={op.nome_cargo} key={op.cod_cargo} selected>
                      {op.nome_cargo}
                    </option>
                  )
                } else {
                  return (
                    <option id={op.nome_cargo} key={op.cod_cargo}>
                      {op.nome_cargo}
                    </option>
                  )
                }
                  
              })}
            </select>
            <br></br>
            <br></br>
            <p>Departamento: </p>
            <input
              type="text"
              required
              id="departamento"
              name="departamento"
              defaultValue={colaborador.departamento}
              onKeyUp={HandleChange}
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
              defaultValue={colaborador.salario}
              onChange={HandleChange}
              placeholder="Digite o salário do candidato"
            />{" "}
            <br></br>
            <br></br>
            <p>Escala: </p>
            <div>
              <select
                name="diaInicio"
                id="diaInicio"
                onClick={HandleSelectChange}
                onChange={HandleSelectChange}
                className={s.escalaDia}
                required
              >
                {dias.map((e) => {
                  if (e.dia === colaborador.dia_inicio) {
                    return (
                      <option id={e.dia} key={e.id} selected>
                        {e.dia}
                      </option>
                    );
                  } else {
                    return (
                      <option id={e.dia} key={e.id}>
                        {e.dia}
                      </option>
                    );
                  }
                })}
              </select>
              -
              <select
                name="diaFim"
                id="diaFim"
                onClick={HandleSelectChange}
                onChange={HandleSelectChange}
                className={s.escalaDia}
                required
              >
                {dias.map((e) => {
                  if (e.dia === colaborador.dia_fim) {
                    return (
                      <option id={e.dia} key={e.id} selected>
                        {e.dia}
                      </option>
                    );
                  } else {
                    return (
                      <option id={e.dia} key={e.id}>
                        {e.dia}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div>
              <input
                type="time"
                required
                className={s.escala}
                autoComplete="off"
                defaultValue={colaborador.horario_inicio}
                name="escalaInicio"
                onChange={HandleChange}
              />
              -
              <input
                type="time"
                required
                className={s.escala}
                autoComplete="off"
                defaultValue={colaborador.horario_fim}
                name="escalaFim"
                onChange={HandleChange}
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
              {filiais.map((op) => {
                if (op.nome_filial === colaborador.filial) {
                  return (
                    <option id={op.nome_filial} key={op.cod_filial} selected>
                      {op.nome_filial}
                    </option>
                  );
                } else {
                  return (
                    <option id={op.nome_filial} key={op.cod_filial}>
                      {op.nome_filial}
                    </option>
                  );
                }
              })}
            </select>
            <br></br>
            <div className={s.buttonSubmit}>
              {colaborador.fase === 1 ? (
                <></>
              ) : (
                <button
                  className={s.faseAnterior}
                  /*onClick={() => moverFase(0, c)}*/
                >
                  Fase anterior
                </button>
              )}

              <button /*onClick={() => atualizarCard(c)}*/>Atualizar card</button>
              <button
                className={s.fasePosterior}
                /*onClick={() => moverFase(1, c)}*/
              >
                Próxima fase
              </button>
            </div>
            <hr></hr>
            <div className={s.declinio}>
              <input type="checkbox" name="declinio?" id="declinio" />
              <label>Candidato declinou?</label>
            </div>
            <div className={s.excluirCard}>
              <button /*onClick={removerCard}*/>Excluir card</button>
            </div>
          </form>
        </>
    </section>
  )  
}

export default AbrirCard;
