import Home from './pages/PagHome/Home'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Kan1 from './pages/KanBans/Kan1'
import Kan2 from './pages/KanBans/Kan2';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [BancoDados, setBancoDados] = useState([])
    useEffect(
        () => {
            fetch("http://localhost:4500/KanBans", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
         .then((resp) => resp.json())
        .then((data) => {
          setBancoDados(data)
    })
    .catch((err) => console.log(err))
        },[]
    )

  var PrintKanBans = []
  const [rotas, setRotas] = useState([])

  function criarNovaRota(caminho, data) {
      var RotasTemp = [];

        for (let i = 0; i < rotas.length; i++) {
            RotasTemp.push(rotas[i])
        }

        RotasTemp.push(
        <Route exact path={caminho} element={
          <Kan1 tipoKanBan='Admissão' DataKanBan={data} BD={caminho}/> 
        } />)

        setRotas(RotasTemp)
        renderizarRotas()
    }

    const atualizarRotas = (C, D) => {
      criarNovaRota(C, D)
    }

    function renderizarRotas() {
      var RotasTemp = []

      for (let i = 0; i < BancoDados.length; i++) {
        
        RotasTemp.push(
          <Route path={BancoDados[i].rota} element={
            <Kan1 tipoKanBan='Admissão' DataKanBan={BancoDados[i].data} BD={BancoDados[i].rota} BDsaude={BancoDados[i].rotaSaude}/> 
          } />)

          RotasTemp.push(
            <Route path={BancoDados[i].rotaSaude} element={
              <Kan2 tipoKanBan='Saúde' DataKanBan={BancoDados[i].data} BD={BancoDados[i].rotaSaude} BDAdmissao={BancoDados[i].rota}/> 
            } />)
        
          PrintKanBans = RotasTemp
      }
    }

  renderizarRotas()    
  
  return (
    <Router>
      
      <Routes>

      <Route exact path="/" element={<Home AtuRotas={atualizarRotas}/>} />

      {rotas}{PrintKanBans}

      </Routes>

    </Router>
  );
}

export default App;
