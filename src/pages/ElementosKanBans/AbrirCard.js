import s from "./AbrirCard.module.css";
import { useEffect, useState } from "react";

function AbrirCard({ fecharPainel, BD, nome, Id, paht, pahtSaude }) {
  let loaded;
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

  const [KanB] = useState(BD || {});

  let colaborador = {};

  function renderizar() {
    let index = findIndex(KanB, Id);

    colaborador = KanB[index];
    loaded = 1;
  }

  renderizar();

  const [c, setC] = useState(colaborador);
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

  function findIndex(e, n) {
    for (let i = 0; i < e.length; i++) {
      if (e[i].id === n) {
        return i;
      }
    }
  }

  function atualizarCard(cardAtualizado) {
    let dec = document.querySelector("#declinio");

    if (dec.checked) {
      cardAtualizado.fase = 8;

      fetch(`http://localhost:4500${paht}/${Id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardAtualizado),
      })
        .then((resp) => resp.json())
        .catch((err) => console.log(err));

      var CardDeclinioS = cardAtualizado;
      CardDeclinioS.fase = 6;

      fetch(`http://localhost:4500${pahtSaude}/${Id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(CardDeclinioS),
      })
        .then((resp) => resp.json())
        .catch((err) => console.log(err));
    } else {
      fetch(`http://localhost:4500${paht}/${Id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardAtualizado),
      })
        .then((resp) => resp.json())
        .catch((err) => console.log(err));

      if (cardAtualizado.fase >= 3) {
        var CS = {
          nome: cardAtualizado.nome,
          telefone: cardAtualizado.telefone,
          departamento: cardAtualizado.departamento,
          funcao: cardAtualizado.funcao,
          diaInicio: cardAtualizado.diaInicio,
          diaFim: cardAtualizado.diaFim,
          escalaInicio: cardAtualizado.escalaInicio,
          escalaFim: cardAtualizado.escalaFim,
          filial: cardAtualizado.filial,
          id: cardAtualizado.id,
        };

        fetch(`http://localhost:4500${pahtSaude}/${Id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(CS),
        })
          .then((resp) => resp.json())
          .catch((err) => console.log(err));
      }
    }
  }

  function removerCard() {
    fetch(`http://localhost:4500${paht}/${Id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));

    fetch(`http://localhost:4500${pahtSaude}/${Id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
  }

  function cardParaSaude(card) {
    var cardS = card;
    cardS.fase = 1;
    cardS.dataExame = "";

    fetch(`http://localhost:4500${pahtSaude}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(cardS),
    })
      .then((resp) => {
        resp.json();
      })
      .catch((err) => console.log(err));
  }

  function moverFase(direcao, cardAtualizado) {
    if (cardAtualizado.fase === 8) {
      alert("Você não pode mover cards declinados");
    } else if (cardAtualizado.fase === 7) {
      alert("Você não pode mover cards concluídos, apenas atualizá-los");
    } else {
      if (direcao === 1) {
        cardAtualizado.fase++;

        fetch(`http://localhost:4500${paht}/${Id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cardAtualizado),
        })
          .then((resp) => resp.json())
          .catch((err) => console.log(err));

        if (cardAtualizado.fase === 3) {
          cardParaSaude(cardAtualizado);
        } else if (cardAtualizado.fase > 3) {
          var CS = {
            nome: cardAtualizado.nome,
            telefone: cardAtualizado.telefone,
            departamento: cardAtualizado.departamento,
            funcao: cardAtualizado.funcao,
            diaInicio: cardAtualizado.diaInicio,
            diaFim: cardAtualizado.diaFim,
            escalaInicio: cardAtualizado.escalaInicio,
            escalaFim: cardAtualizado.escalaFim,
            filial: cardAtualizado.filial,
            id: cardAtualizado.id,
          };

          fetch(`http://localhost:4500${pahtSaude}/${Id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(CS),
          })
            .then((resp) => resp.json())
            .catch((err) => console.log(err));
        }
      } else {
        cardAtualizado.fase--;

        fetch(`http://localhost:4500${paht}/${Id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cardAtualizado),
        })
          .then((resp) => resp.json())
          .catch((err) => console.log(err));

        if (cardAtualizado.fase > 2) {
          CS = {
            nome: cardAtualizado.nome,
            telefone: cardAtualizado.telefone,
            departamento: cardAtualizado.departamento,
            funcao: cardAtualizado.funcao,
            diaInicio: cardAtualizado.diaInicio,
            diaFim: cardAtualizado.diaFim,
            escalaInicio: cardAtualizado.escalaInicio,
            escalaFim: cardAtualizado.escalaFim,
            filial: cardAtualizado.filial,
            id: cardAtualizado.id,
          };

          fetch(`http://localhost:4500${pahtSaude}/${Id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(CS),
          })
            .then((resp) => resp.json())
            .catch((err) => console.log(err));
        }
      }
    }
  }

  return (
    <section className={s.criarCard}>
      {loaded && (
        <>
          <h1>{nome}</h1>
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
              placeholder="Digite o nome do candidato" /*onChange={HandleChange}*/
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
              defaultValue={colaborador.funcao}
              onKeyUp={preencherDepartamentos}
              onChange={preencherFuncao}
              id="funcao"
            >
              <option></option>
              {cargos.map((op) => {
                if (op.nome === colaborador.funcao) {
                  return (
                    <option id={op.nome} key={op.id} selected>
                      {op.nome}
                    </option>
                  );
                } else {
                  return (
                    <option id={op.nome} key={op.id}>
                      {op.nome}
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
                name="diaInicio"
                id="diaInicio"
                onClick={HandleSelectChange}
                onChange={HandleSelectChange}
                className={s.escalaDia}
                required
              >
                {dias.map((e) => {
                  if (e.dia === colaborador.diaInicio) {
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
                  if (e.dia === colaborador.diaFim) {
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
                defaultValue={colaborador.escalaInicio}
                name="escalaInicio"
                onChange={HandleChange}
              />
              -
              <input
                type="time"
                required
                className={s.escala}
                autoComplete="off"
                defaultValue={colaborador.escalaFim}
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
                if (op.nome === colaborador.filial) {
                  return (
                    <option id={op.nome} key={op.id} selected>
                      {op.nome}
                    </option>
                  );
                } else {
                  return (
                    <option id={op.nome} key={op.id}>
                      {op.nome}
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
                  onClick={() => moverFase(0, c)}
                >
                  Fase anterior
                </button>
              )}

              <button onClick={() => atualizarCard(c)}>Atualizar card</button>
              <button
                className={s.fasePosterior}
                onClick={() => moverFase(1, c)}
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
              <button onClick={removerCard}>Excluir card</button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}

export default AbrirCard;
