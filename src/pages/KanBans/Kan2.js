import Navegacao from "../PagHome/Navegacao"
import { useState } from "react"
import Card from "../ElementosKanBans/Card"
import ColunaKanBan from "../ElementosKanBans/ColunaKanBan"
import { useEffect } from "react"
import s from './Kan1.module.css'
import AbrirCardSaude from "../ElementosKanBans/AbrirCardSaude"
import e from  "../ElementosKanBans/ColunaKanBan.module.css"


function Kan2({tipoKanBan, DataKanBan, BD, BDAdmissao}) {

    const [KanB, setKanB] = useState([])

    useEffect(  
        () => {
            fetch(`http://localhost:4500${BD}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
         .then((resp) => resp.json())
        .then((data) => {
        setKanB(data)
    })
    .catch((err) => console.log(err))
        },[BD]
    )

    const [visualizacao, setVisualizacao] = useState()

    function abrirVisualizacao(e, i) {
        setVisualizacao(<AbrirCardSaude fecharPainel={fecharVisualizacao} nome={e} Id={i} BD={KanB} paht={BDAdmissao} pahtSaude={BD}/>)
    }

    function fecharVisualizacao() {
        setVisualizacao()
    }


    var coluna1 = <ColunaKanBan color={e.colK2} nome={"Cadastro e agendamento SOC"}/>;
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

        for (let i = 0; i < KanB.length; i++) {
            if (KanB[i].fase === 1) {
                C.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna1 = <ColunaKanBan color={e.colK2} nome={"Cadastro e agendamento SOC"}  Cards={C}/>
            }  
            else if (KanB[i].fase === 2) {
                C2.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna2 = <ColunaKanBan color={e.colK2} nome={"Envio Guia de exame médico"}  Cards={C2}/>
            }
            else if (KanB[i].fase === 3) {
                C3.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna3 = <ColunaKanBan color={e.colK2} nome={"Realização do exame"}  Cards={C3}/>
            }
            else if (KanB[i].fase === 4) {
                C4.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna4 = <ColunaKanBan color={e.colK2} nome={"Aprovados (Aptos)"}  Cards={C4}/>
            }
            else if (KanB[i].fase === 5) {
                C5.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna5 = <ColunaKanBan color={e.colK2} nome={"Reprovados (Inaptos)"}  Cards={C5}/>
            }
            else if (KanB[i].fase === 6) {
                C6.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna6 = <ColunaKanBan color={e.colK2} nome={"Declinios"}  Cards={C6}/>
            }
        
    }
}

showKB()

    return (
        <>
            {visualizacao}
            <Navegacao tipoKanBan={tipoKanBan} DataKanBan={DataKanBan} admissao={BDAdmissao}/>
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