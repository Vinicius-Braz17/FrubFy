import Navegacao from '../PagHome/Navegacao'
import ColunaKanBan from "../ElementosKanBans/ColunaKanBan"
import s from './Kan1.module.css'
import e from  "../ElementosKanBans/ColunaKanBan.module.css"
import { useEffect, useState } from "react"
import Card from '../ElementosKanBans/Card'
import CriarCard from '../ElementosKanBans/CriarCard'
import AbrirCard from '../ElementosKanBans/AbrirCard'

function Kan1({tipoKanBan, BD}) {
    
    const [KanB, setKanB] = useState([])
    const [colaboradores, setColaboradores] = useState()

    useEffect(
        () => {
        fetch(`http://localhost:8800/ADMISSOES`, {
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

    useEffect(
        () => {
        fetch(`http://localhost:8800/CANDIDATOS`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
         .then((resp) => resp.json())
        .then((data) => {
        setColaboradores(data)
    })
    .catch((err) => console.log(err))
        },[BD]
    )
    
    // for (let i = 0; i < colaboradores.length; i++) {
    //     var newCol = []
    //     if (colaboradores[i].COD_ADMISSAO === KanB.COD_ADMISSAO) {
    //         newCol.push(colaboradores[i])
    //     }  
    // }

    const [visualizacao, setVisualizacao] = useState()

    function abrirVisualizacao(e, i) {
        setVisualizacao(<AbrirCard fecharPainel={fecharVisualizacao} nome={e} Id={i} BD={KanB} paht={BD} pahtSaude={BD.DIRETORIO_SAUDE}/>)
    }

    function fecharVisualizacao() {
        setVisualizacao()
    }
    

    var [CriacaoCard, setCC] = useState([])
    function createProject() {
        if(KanB.length === 0) {
            var  IDs = 1
            setCC([<CriarCard fecharPainel={closeCardCreation} BD={BD} Ids={IDs}/>])
        }
        else {
            IDs = (KanB[KanB.length - 1].id) + 1
            setCC([<CriarCard fecharPainel={closeCardCreation} BD={BD} Ids={IDs}/>])
        }       
    }

    function closeCardCreation() {
        setCC([])
    }  

    var coluna1 = <ColunaKanBan nome={"Triagem"} color={e.colK1} botao={(<button title='Crie um novo card' onClick={createProject}>+</button>)}/>;
    var coluna2 = <ColunaKanBan nome={"Primeira Etapa"} color={e.colK1}/>;
    var coluna3 = <ColunaKanBan nome={"Exame médico admissional"} color={e.colK1}/>;
    var coluna4 = <ColunaKanBan nome={"Etapa de documentações"} color={e.colK1}/>;
    var coluna5 = <ColunaKanBan nome={"Verificações"} color={e.colK1}/>;
    var coluna6 = <ColunaKanBan nome={"Emissão e envio contratos"} color={e.colK1}/>;
    var coluna7 = <ColunaKanBan nome={"Onboarding"} color={e.colK1}/>;
    var coluna8 = <ColunaKanBan nome={"Declínio"} color={e.colK1}/>;

    function showKB() {
        var C = []
        var C2 = []
        var C3 = []
        var C4 = []
        var C5 = []
        var C6 = []
        var C7 = []
        var C8 = []

        for (let i = 0; i < KanB.length; i++) {
            if (KanB[i].fase === 1) {
                C.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna1 = <ColunaKanBan nome={"Triagem"} color={e.colK1} Cards={C} botao={(<button title='Crie um novo card' onClick={createProject}>+</button>)}/>
            }  
            else if (KanB[i].fase === 2) {
                C2.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna2 = <ColunaKanBan nome={"Primeira Etapa"} color={e.colK1} Cards={C2}/>
            }
            else if (KanB[i].fase === 3) {
                C3.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna3 = <ColunaKanBan nome={"Saúde e conta bancária"} color={e.colK1} Cards={C3}/>
            }
            else if (KanB[i].fase === 4) {
                C4.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna4 = <ColunaKanBan nome={"Segunda Etapa"} color={e.colK1} Cards={C4}/>
            }
            else if (KanB[i].fase === 5) {
                C5.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna5 = <ColunaKanBan nome={"Conferência 2ª etapa"} color={e.colK1} Cards={C5}/>
            }
            else if (KanB[i].fase === 6) {
                C6.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna6 = <ColunaKanBan nome={"Emissão e envio contratos"} color={e.colK1} Cards={C6}/>
            }
            else if (KanB[i].fase === 7) {
                C7.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna7 = <ColunaKanBan nome={"Onboarding"} color={e.colK1} Cards={C7}/>
            } 
            else if (KanB[i].fase === 8) {
                C8.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna8 = <ColunaKanBan nome={"Declinio"} color={e.colK1} Cards={C8}/>
            } 
    }
}

showKB()
        
    return (
        <>
        {visualizacao}
            <Navegacao tipoKanBan={tipoKanBan} DataKanBan={BD.DATA_ADMISSAO} saude={BD.DIRETORIO_SAUDE}/>    
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
            {CriacaoCard}
        </>
    )
}

export default Kan1