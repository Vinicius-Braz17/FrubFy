import s from './Card.module.css'

function Card({nomeC, funcao, telefone, filial, abrir}) {
    
    return (
        <article className={s.card}>
            <h1><b>{nomeC}</b></h1>
            <hr></hr>
            <p><b>Cargo:</b> {funcao}</p>
            <p><b>Filial:</b> {filial}</p>
            <p><b>Telefone: </b><a title={`Chame ${nomeC} para conversar`} href={`https://api.whatsapp.com/send/?phone=${telefone}&text&type=phone_number&app_absent=0`} $telefone target="_blank" rel='noreferrer'>{telefone}</a></p>
            <hr></hr>
            <button className={s.vizualizar}  onClick={abrir}>Vizualizar Card</button>
        </article>
    )
}

export default Card