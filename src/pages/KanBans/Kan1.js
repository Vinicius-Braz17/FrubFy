import Navegacao from "../PagHome/Navegacao";
import ColunaKanBan from "../ElementosKanBans/ColunaKanBan";
import s from "./Kan1.module.css";
import e from "../ElementosKanBans/ColunaKanBan.module.css";
import { useEffect, useState } from "react";
import Card from "../ElementosKanBans/Card";
// import CriarCard from "../ElementosKanBans/CriarCard";
import AbrirCard from "../ElementosKanBans/AbrirCard";
import sp from "../../Supabase";
import CriarCard from "../ElementosKanBans/CriarCard";

function Kan1({ tipoKanBan, BD }) {
  const KanB = BD;
  const [colaboradores, setColaboradores] = useState();

  async function getCandidatos() {
    const { data } = await sp
      .from("candidatos")
      .select()
      .eq("cod_admissao", KanB.cod_admissao);
    setColaboradores(data);
  }

  useEffect(() => {
    getCandidatos();
    // eslint-disable-next-line
  }, []);

  var coluna1 = (
    <ColunaKanBan
      nome={"Triagem"}
      color={e.colK1}
      botao={<button title="Crie um novo card">+</button>}
    />
  );
  var coluna2 = <ColunaKanBan nome={"Primeira Etapa"} color={e.colK1} />;
  var coluna3 = (
    <ColunaKanBan nome={"Exame médico admissional"} color={e.colK1} />
  );
  var coluna4 = (
    <ColunaKanBan nome={"Etapa de documentações"} color={e.colK1} />
  );
  var coluna5 = <ColunaKanBan nome={"Verificações"} color={e.colK1} />;
  var coluna6 = (
    <ColunaKanBan nome={"Emissão e envio contratos"} color={e.colK1} />
  );
  var coluna7 = <ColunaKanBan nome={"Onboarding"} color={e.colK1} />;
  var coluna8 = <ColunaKanBan nome={"Declínio"} color={e.colK1} />;

  function showKB() {
    var C = [];
    var C2 = [];
    var C3 = [];
    var C4 = [];
    var C5 = [];
    var C6 = [];
    var C7 = [];
    var C8 = [];

    try {
      for (let i = 0; i < colaboradores.length; i++) {
        if (colaboradores[i].fase === 1) {
          C.push(
            <Card
              abrir={() => {
                abrirVisualizacao(colaboradores[i]);
              }}
              col={colaboradores[i]}
            />
          );
          coluna1 = (
            <ColunaKanBan
              nome={"Triagem"}
              color={e.colK1}
              Cards={C}
              botao={
                <button
                  title="Crie um novo card"
                  id="createCard"
                  onClick={abrirCriarCard}
                >
                  +
                </button>
              }
            />
          );
        } else if (colaboradores[i].fase === 2) {
          C2.push(
            <Card
              abrir={() => {
                abrirVisualizacao(colaboradores[i]);
              }}
              col={colaboradores[i]}
            />
          );
          coluna2 = (
            <ColunaKanBan nome={"Primeira Etapa"} color={e.colK1} Cards={C2} />
          );
        } else if (colaboradores[i].fase === 3) {
          C3.push(
            <Card
              abrir={() => {
                abrirVisualizacao(colaboradores[i]);
              }}
              col={colaboradores[i]}
            />
          );
          coluna3 = (
            <ColunaKanBan
              nome={"Saúde e conta bancária"}
              color={e.colK1}
              Cards={C3}
            />
          );
        } else if (colaboradores[i].fase === 4) {
          C4.push(
            <Card
              abrir={() => {
                abrirVisualizacao(colaboradores[i]);
              }}
              col={colaboradores[i]}
            />
          );
          coluna4 = (
            <ColunaKanBan nome={"Segunda Etapa"} color={e.colK1} Cards={C4} />
          );
        } else if (colaboradores[i].fase === 5) {
          C5.push(
            <Card
              abrir={() => {
                abrirVisualizacao(colaboradores[i]);
              }}
              col={colaboradores[i]}
            />
          );
          coluna5 = (
            <ColunaKanBan
              nome={"Conferência 2ª etapa"}
              color={e.colK1}
              Cards={C5}
            />
          );
        } else if (colaboradores[i].fase === 6) {
          C6.push(
            <Card
              abrir={() => {
                abrirVisualizacao(colaboradores[i]);
              }}
              col={colaboradores[i]}
            />
          );
          coluna6 = (
            <ColunaKanBan
              nome={"Emissão e envio contratos"}
              color={e.colK1}
              Cards={C6}
            />
          );
        } else if (colaboradores[i].fase === 7) {
          C7.push(
            <Card
              abrir={() => {
                abrirVisualizacao(colaboradores[i]);
              }}
              col={colaboradores[i]}
            />
          );
          coluna7 = (
            <ColunaKanBan nome={"Onboarding"} color={e.colK1} Cards={C7} />
          );
        } else if (colaboradores[i].fase === 8) {
          C8.push(
            <Card
              abrir={() => {
                abrirVisualizacao(colaboradores[i]);
              }}
              col={colaboradores[i]}
            />
          );
          coluna8 = (
            <ColunaKanBan nome={"Declinio"} color={e.colK1} Cards={C8} />
          );
        }
      }
    } catch (error) {
      /// Don't do nothing, just wait untill the app get the informations form the server
    }
  }

  showKB();

  // useEffect(
  //     () => {
  //     fetch(`http://localhost:8800/ADMISSOES`, {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  // })
  //      .then((resp) => resp.json())
  //     .then((data) => {
  //     setKanB(data)
  // })
  // .catch((err) => console.log(err))
  //     },[BD]
  // )

  const [visualizacao, setVisualizacao] = useState();

  function abrirVisualizacao(i) {
    setVisualizacao(<AbrirCard fecharPainel={fecharVisualizacao} col={i} />);
  }

  function abrirCriarCard() {
    setVisualizacao(
      <CriarCard fecharPainel={fecharVisualizacao} BD={BD.cod_admissao} />
    );
  }

  function fecharVisualizacao() {
    setVisualizacao();
  }

  // var [CriacaoCard, setCC] = useState([])
  // function () {
  //     if(KanB.length === 0) {
  //         var  IDs = 1
  //         setCC([<CriarCard fecharPainel={closeCardCreation} BD={BD} Ids={IDs}/>])
  //     }
  //     else {
  //         IDs = (KanB[KanB.length - 1].id) + 1
  //         setCC([<CriarCard fecharPainel={closeCardCreation} BD={BD} Ids={IDs}/>])
  //     }
  // }

  // function closeCardCreation() {
  //     setCC([])
  // }

  return (
    <>
      {visualizacao}
      <Navegacao
        tipoKanBan={tipoKanBan}
        DataKanBan={BD.data_admissao}
        saude={BD.diretorio_saude}
      />
      <section className={s.KanBan}>
        {coluna1}
        {coluna2}
        {coluna3}
        {coluna4}
        {coluna5}
        {coluna6}
        {coluna7}
        {coluna8}
      </section>
      {/* {CriacaoCard} */}
    </>
  );
}

export default Kan1;
