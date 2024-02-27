import s from './ColunaKanBan.module.css'

function ColunaKanBan({nome, Cards, botao, color}) {    
    return (
        <section className={s.colKB} id={color}>
                <p className={s.NomeCol} id={color}>{botao}{nome}</p>

            <div id='col'>
                {Cards}
            </div>
        </section>
    )
}

export default ColunaKanBan;