import s from './Card.module.css'

function Card({col, abrir}) {
    
    return (
        <article className={s.card}>
            <h1><b>{col.nome}</b></h1>
            <hr style={{width: '85%', margin: '0'}}></hr>
            <p><b>Cargo:</b> {col.cargo}</p>
            <p><b>Filial:</b> {col.filial}</p>
            <p><b>Telefone:</b><a title={`Chame ${col.nome} para conversar`} href={`https://api.whatsapp.com/send/?phone=${col.telefone}&text&type=phone_number&app_absent=0`}target="_blank" rel='noreferrer'> {col.telefone}</a></p>
            {/* <hr></hr> */}
            <button className={s.vizualizar} onClick={abrir}>Vizualizar Card</button>
        </article>
    )
}

export default Card