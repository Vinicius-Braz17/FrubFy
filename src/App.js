import Home from "./pages/PagHome/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Kan1 from "./pages/KanBans/Kan1";
import Kan2 from "./pages/KanBans/Kan2";
import { useState } from "react";
import { useEffect } from "react";
import sp from "./Supabase";

function App() {
  const [BancoDados, setBancoDados] = useState([]);
  
  /* nova API para banco de dados */
  async function getBancoDados() {
    const { data } = await sp.from("admissoes").select();
    setBancoDados(data);
  } 

  useEffect(() => {
    getBancoDados()
  }, []);

  
  // useEffect(() => {
  //   fetch("http://localhost:8800/ADMISSOES", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setBancoDados(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  
  var PrintKanBans = [];
  const [rotas, setRotas] = useState([]);

  function criarNovaRota(caminho, data) {
    var RotasTemp = [];

    for (let i = 0; i < rotas.length; i++) {
      RotasTemp.push(rotas[i]);
    }

    RotasTemp.push(
      <Route
        exact
        path={caminho}
        element={<Kan1 tipoKanBan="Admissão" DataKanBan={data} BD={caminho} />}
      />
    );

    setRotas(RotasTemp);
    renderizarRotas();
  }

  const atualizarRotas = (C, D) => {
    criarNovaRota(C, D);
  };

  function renderizarRotas() {
    var RotasTemp = [];

    for (let i = 0; i < BancoDados.length; i++) {
      RotasTemp.push(
        <Route
          path={BancoDados[i].diretorio_adm}
          element={
            <Kan1
              tipoKanBan="Admissão"
              BD={BancoDados[i]}
            />
          }
        />
      );

      RotasTemp.push(
        <Route
          path={BancoDados[i].diretorio_saude}
          element={
            <Kan2
              tipoKanBan="Saúde"
              BD={BancoDados[i]}
            />
          }
        />
      );

      PrintKanBans = RotasTemp;
    }
  }

  renderizarRotas();

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home AtuRotas={atualizarRotas} />} />

        {rotas}
        {PrintKanBans}
      </Routes>
    </Router>
  );
}

export default App;
