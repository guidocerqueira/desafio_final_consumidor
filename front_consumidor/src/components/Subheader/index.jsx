import './styles.css';
import IconCifrao from '../../assets/cifrao-icon.svg'
import IconTempo from '../../assets/tempo-icon.svg'
import editarPreco from '../../functions/editarPreco';


export default function Subheader({ selecionado, setAbrirCart, retornar }) {
    const { valor_minimo_pedido: valorMinimo,
        tempo_entrega_minutos: tempoEntrega,
        descricao } = selecionado;

    return (
        <div className="sh-base">
            <div>
            <button className="cancelar"
                onClick={() => retornar()}>
                Voltar aos Restaurantes
            </button>
            <button className="aceitar"
                onClick={() => setAbrirCart(true)}>
                Revisar Pedido
            </button>
            </div>
            <div className="sh-detalhes">
                <div>
                    <img src={IconCifrao} alt="$" />
                    <b>Pedido Mínimo:</b> {valorMinimo && editarPreco(valorMinimo, true)}
                    <img src={IconTempo} alt="relógio" />
                    <b>Tempo de Entrega:</b> {tempoEntrega} min
                </div>
                <div  className="sh-descricao">
                    {descricao}
                </div>
            </div>
        </div>
    )
}