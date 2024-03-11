import sReap from "./CriarCard.module.css";
import s from "./AbrirCard.module.css";
import sp from "../../Supabase";

export default function AbrirCardSaude({ fecharPainel, col }) {
  const colaborador = col;
  console.log(colaborador);

  async function funcaoAtualizarCard(e) {
    // e.preventDefault()
    let id = colaborador.id_candidato;
    delete colaborador.id_candidato;
    await sp.from("candidatos").update(colaborador).eq("id_candidato", id);
  }

  async function removerCard() {
    let id = colaborador.id_candidato;
    await sp.from("candidatos").delete().eq("id_candidato", id);
  }

  async function moverFase(e) {
    let newFase = colaborador;
    let id = colaborador.id_candidato;

    // e.preventDefault()
    switch (e.target.name) {
      case "nextFase":
        newFase.fase += 1;
        break;
      case "previousFase":
        newFase.fase -= 1;
        break;
      default:
        break;
    }

    delete newFase.id_candidato;
    console.log(newFase);
    await sp.from("candidatos").update(newFase).eq("id_candidato", id);
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
            name="nome"
            readOnly
            defaultValue={colaborador.nome}
            type="text"
          />{" "}
          <br></br>
          <br></br>
          <p>Email: </p>
          <input
            id="INP"
            required
            defaultValue={colaborador.email}
            readOnly
            name="email"
            type="email"
          />{" "}
          <br></br>
          <br></br>
          <p>Telefone: </p>
          <input
            type="text"
            required
            defaultValue={colaborador.telefone}
            readOnly
            name="telefone"
          />{" "}
          <br></br>
          <br></br>
          <p>Cargo: </p>
          <input
            name="funcao"
            required
            type="text"
            defaultValue={colaborador.cargo}
            readOnly
            id="cargo"
          ></input>
          <br></br>
          <br></br>
          <p>Departamento: </p>
          <input
            type="text"
            required
            id="departamento"
            name="departamento"
            defaultValue={colaborador.departamento}
            className={s.departamento}
            readOnly
          />{" "}
          <br></br>
          <br></br>
          <p>Escala: </p>
          <div>
            <input
              name="dia_inicio"
              id="diaInicio"
              type="text"
              className={s.escalaDia}
              defaultValue={colaborador.dia_inicio}
              required
              readOnly
            ></input>
            -
            <input
              name="dia_fim"
              id="diaFim"
              type="text"
              className={s.escalaDia}
              defaultValue={colaborador.dia_fim}
              required
              readOnly
            ></input>
          </div>
          <div>
            <input
              type="time"
              required
              className={s.escala}
              readOnly
              defaultValue={colaborador.horario_inicio}
              name="horario_inicio"
            />
            -
            <input
              type="time"
              required
              className={s.escala}
              readOnly
              defaultValue={colaborador.horario_fim}
              name="horario_fim"
            />
          </div>
          <br></br>
          <p>Filial: </p>
          <input
            name="filial"
            required
            id="filial"
            type="text"
            readOnly
            defaultValue={colaborador.filial}
          ></input>
          <br></br>
          <br></br>
          {colaborador.fase >= 3 && (
            <>
              <p>Data do exame: </p>
              <input type="date" />
              <br></br>
              <br></br>
              <p>Horário do exame: </p>
              <input type="time" />
            </>
          )}
          <br></br>
          <div className={s.buttonSubmit}>
            {colaborador.fase === 1 ? (
              <></>
            ) : (
              <button
                className={s.faseAnterior}
                name="previousFase"
                onClick={moverFase}
              >
                Fase anterior
              </button>
            )}

            <button
              className={s.atualizarCard}
              type="submit"
              onClick={funcaoAtualizarCard}
            >
              Atualizar card
            </button>
            <button
              className={s.fasePosterior}
              name="nextFase"
              onClick={moverFase}
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
    </section>
  );
}
