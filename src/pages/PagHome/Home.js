import s from "./Home.module.css";
import { Link } from "react-router-dom";
import KanBanAdmissoes from "./KanBanAdmissoes";
import { useState, useEffect } from "react";
import CriarProjeto from "./CriarProjeto";
// import Kan3 from '../KanBans/Kan3'
import sp from "../../Supabase";

function Home({ AtuRotas }) {

  var ProjetosPrintBD = []
  const [Projetos, setProjetos] = useState([]);

  
  async function getProjetos() {
    const { data } = await sp.from("admissoes").select();
    setProjetos(data)
  }

  useEffect(() => {
    getProjetos()
  }, [])

  // useEffect(() => {
  //   setProjetos(getProjetos())
  //   }
  // );

  // useEffect(() => {
  //   fetch("http://localhost:8800/ADMISSOES", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setProjetos(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const [criarKB, setCriarKB] = useState();
  function AbrirCriarKB() {
    setCriarKB(<CriarProjeto sair={fecharCriarKB} AttRot={ATR}/>);
  }
  function fecharCriarKB() {
    setCriarKB();
  }

  const ATR = (e, a) => {
    AtuRotas(e, a)
  }

  function RenderizarKBs() {
    var ProjetosTemp = [];

    for (let i = 0; i < Projetos.length; i++) {
      ProjetosTemp.push(
        <Link className={s.lin} to={Projetos[i].diretorio_adm}>
          <KanBanAdmissoes dataAdmissao={Projetos[i].data_admissao} />
        </Link>
      );

      ProjetosPrintBD = ProjetosTemp
    }
  }

    RenderizarKBs();

  return (
    <section className={s.painelKanBans}>
      {criarKB}

      <div className={s.menuPainel}>
        <button onClick={AbrirCriarKB}>Novo KanBan</button>
        <h2>Frub-Fy</h2>
      </div>
        
      <div className={s.PainelInterno}>{ProjetosPrintBD}</div>
    </section>
  );
}

export default Home;
