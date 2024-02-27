import IKB from "../photos/imgKanBan.jpg";
import s from "./KanBanAdmissoes.module.css";

function KanBanAdmissoes({ dataAdmissao }) {

  return (
    <section className={s.CartaoKB}>
      <p>
        <b>Admissão</b>
      </p>
      <img src={IKB} alt="Icone Kan Ban" />
      <p>{dataAdmissao}</p>
    </section>
  );
}

export default KanBanAdmissoes;
