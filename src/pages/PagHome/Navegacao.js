import { Link } from "react-router-dom";
import s from "./Navegacao.module.css";
import F from "../photos/FrubLogo.jpg";

function Navegacao({ tipoKanBan, DataKanBan, admissao, saude}) {
  return (
    <nav className={s.NavBar}>
      <Link to="/">
        <img className={s.LogoFrub} src={F} alt="logo Frubana NavBar" />
      </Link> 

      <div className={s.divBtns}>
        <p>
          <Link to="/">Home</Link>
        </p>

        <p>
          <Link to={admissao}>Admissão</Link>
        </p>

        <p>
          <Link to={saude}>Saúde</Link>
        </p>
      </div>

      <div className={s.infoKanNav}>
        <p className={s.infoKanNavTexto}>{tipoKanBan}</p>
        <p className={s.infoKanNavTexto}>{DataKanBan}</p>
      </div>
    </nav>
  );
}

export default Navegacao;
