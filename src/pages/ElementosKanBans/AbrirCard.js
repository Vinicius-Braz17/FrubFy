import sReap from "./CriarCard.module.css";
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

  const colaborador = col;
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

  console.log(cargos);
  console.log(filiais);
  console.log(c.id_candidato);

  function preencherDepartamentos(e) {
    for (let i = 0; i < cargos.length; i++) {
      if (e.target.value === cargos[i].nome_cargo) {
        document.getElementById("departamento").value = cargos[i].departamento;
        setC({
          ...c,
          cargo: e.target.value,
          departamento: cargos[i].departamento,
        });
        break;
      }
    }
    console.log(c);
  }

  function ToUpperCase(e) {
    var textoInserido = document.querySelector("#INP").value;
    document.querySelector("#INP").value = textoInserido.toUpperCase();
    HandleChange(e);
  }

  function HandleSelectChange(e) {
    console.log(e.target.value);
    console.log(e.target.name);

    setC({...c, [e.target.name]: e.target.value });
    console.log(c);
  }

  function HandleChange(e) {
    setC({ ...c, [e.target.name]: e.target.value });
    console.log(c);
  }

  async function funcaoAtualizarCard() {
    let id = c.id_candidato
    delete c.id_candidato
    console.log(c);
    await sp.from('candidatos').update(c).eq('id_candidato', id)
  }


  return (
    <section className={sReap.criarCard}>
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
          <p>Email: </p>
          <input
            id="INP"
            required
            autoComplete="off"
            defaultValue={colaborador.email}
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
            onChange={preencherDepartamentos}
            id="cargo"
          >
            <option></option>
            {cargos.map((op) => {
              if (op.nome_cargo === colaborador.cargo) {
                return (
                  <option id={op.nome_cargo} key={op.cod_cargo} selected>
                    {op.nome_cargo}
                  </option>
                );
              } else {
                return (
                  <option id={op.nome_cargo} key={op.cod_cargo}>
                    {op.nome_cargo}
                  </option>
                );
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
              name="dia_inicio"
              id="diaInicio"
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
              name="dia_fim"
              id="diaFim"
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
              name="horario_inicio"
              onChange={HandleChange}
            />
            -
            <input
              type="time"
              required
              className={s.escala}
              autoComplete="off"
              defaultValue={colaborador.horario_fim}
              name="horario_fim"
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

            <button
              className={s.atualizarCard} type="submit" onClick={funcaoAtualizarCard}
            >
              Atualizar card
            </button>
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
  );
}

export default AbrirCard;
