import { useState } from 'react'
import s from './CriarProjeto.module.css'
import { useEffect } from 'react'

function CriarProjeto({sair, AttRot}) {

    const [K, setK] = useState([])
    
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
            setK(data)
    })
    .catch((err) => console.log(err))
        },[]
    )

    const [insersao, setInsersao] = useState({})

    function handleDataChange(e) {
        setInsersao({...insersao, [e.target.name]: e.target.value})
    }

    const submit = (e) => {
        var path;

        if (K[K.length - 1] === undefined) {
            path = 1
        }
        else {
            path = "/AD" + (K[K.length - 1].id + 1)
        }
        AttRot(insersao.data, path)
        inserirNovoKBD(insersao)
    }

    function inserirNovoKBD(New) {

        if (K[K.length - 1] === undefined) {
            New.rota = "/AD" + 1
            New.rotaSaude = "/S" + 1
            New.id = 1;
        }
        else {
            New.rota = "/AD" + (K[K.length - 1].id + 1)
            New.rotaSaude = "/S" + (K[K.length - 1].id + 1)
            New.id = (K[K.length - 1].id + 1);
        }


            fetch("http://localhost:4500/KanBans",{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(New),
            })
                .then((resp) => {
                    // return resp.text();
                    resp.json(); 
                })
                .then((data) => {
                    console.log(data)
                })
                .catch((err) => console.log(err))
    }
    
    return (
            <form id={s.criarProj} onSubmit={submit}>
                <button id={s.sairProj} onClick={sair}>X</button>
                    <h1>Criar um nova admissão</h1>
                    <label>Insira a Data: </label><input name="data" onChange={handleDataChange} type="date" />
                <button className={s.botaoCriar} /*onClick={() => inserirKB(data)}*/>Criar</button>
            </form>
    )
}

export default CriarProjeto