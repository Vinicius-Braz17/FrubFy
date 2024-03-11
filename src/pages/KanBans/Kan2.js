import Navegacao from "../PagHome/Navegacao"
import { useEffect, useState } from "react"
import Card from "../ElementosKanBans/Card"
import ColunaKanBan from "../ElementosKanBans/ColunaKanBan"
import s from './Kan1.module.css'
import AbrirCardSaude from "../ElementosKanBans/AbrirCardSaude"
import e from  "../ElementosKanBans/ColunaKanBan.module.css"
import sp from "../../Supabase"

function Kan2({tipoKanBan, BD}) {

    const [visualizacao, setVisualizacao] = useState()
    const [colaboradores, setColaboradores] = useState()
    
    async function getCandidatos() {
        const { data } = await sp.from('candidatos').select().eq('cod_admissao', BD.cod_admissao)
        setColaboradores(data)
    }

    useEffect(() => {
        getCandidatos()
    // eslint-disable-next-line
    }, [])
    
    
    function abrirVisualizacao(i) {
        setVisualizacao(<AbrirCardSaude fecharPainel={fecharVisualizacao} col={i} />)
    }

    function fecharVisualizacao() {
        setVisualizacao()
    }


    var coluna1 = <ColunaKanBan color={e.colK2} nome={"Cadastro e agendamento"} />;
    var coluna2 = <ColunaKanBan color={e.colK2} nome={"Envio Guia de exame médico"}/>;
    var coluna3 = <ColunaKanBan color={e.colK2} nome={"Realização do exame"}/>;
    var coluna4 = <ColunaKanBan color={e.colK2} nome={"Aprovados (Aptos)"}/>;
    var coluna5 = <ColunaKanBan color={e.colK2} nome={"Reprovados (Inaptos)"}/>;
    var coluna6 = <ColunaKanBan color={e.colK2} nome={"Declinios"}/>;

    function showKB() {
        var C = []
        var C2 = []
        var C3 = []
        var C4 = []
        var C5 = []
        var C6 = []

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
                    nome={"Cadastro e agendamento"}
                    color={e.colK2}
                    Cards={C}
                  />
                );
              } 
            else if (colaboradores[i].fase === 2) {
                C2.push(
                    <Card
                      abrir={() => {
                        abrirVisualizacao(colaboradores[i]);
                      }}
                      col={colaboradores[i]}
                    />
                  );
                  coluna2 = (
                    <ColunaKanBan
                      nome={"Envio Guia de exame médico"}
                      color={e.colK2}
                      Cards={C2}
                    />
                  );
            }
            else if (colaboradores[i].fase === 3) {
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
                      nome={"Realização do exame"}
                      color={e.colK2}
                      Cards={C3}
                    />
                  );
            }
            else if (colaboradores[i].fase === 4) {
                C4.push(
                    <Card
                      abrir={() => {
                        abrirVisualizacao(colaboradores[i]);
                      }}
                      col={colaboradores[i]}
                    />
                  );
                  coluna4 = (
                    <ColunaKanBan
                      nome={"Aprovados (Aptos)"}
                      color={e.colK2}
                      Cards={C4}
                    />
                  );
            }
            else if (colaboradores[i].fase === 5) {
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
                      nome={"Reprovados (Inaptos)"}
                      color={e.colK2}
                      Cards={C5}
                    />
                  );
            }
            else if (colaboradores[i].fase === 6) {
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
                      nome={"Declinios"}
                      color={e.colK2}
                      Cards={C6}
                    />
                  );
            }
        } 
    } catch (error) {
        // Don't do nothing, just wait for the API to get the data on the server
    }
        
}

showKB()

    return (
        <>
            {visualizacao}
            <Navegacao tipoKanBan={tipoKanBan} DataKanBan={BD.data_admissao} admissao={BD.diretorio_adm}/>
            <section className={s.KanBan}>
                {coluna1}
                {coluna2}
                {coluna3}
                {coluna4}
                {coluna5}
                {coluna6}
            </section>
        </>
    )
}

export default Kan2