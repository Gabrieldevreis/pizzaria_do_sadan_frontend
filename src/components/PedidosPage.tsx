import { useState } from 'react';
import type { Pedido } from '../types.ts';

interface PedidosPageProps {
  pedidos: Pedido[];
}

function formatarData(dataIso: string): string {
  return new Date(dataIso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatarPedidoParaCopia(pedido: Pedido): string {
  const entrega =
    pedido.tipoEntrega === 'mesa' ? `Mesa ${pedido.mesa}` : 'Retirada';

  const itens = pedido.itens
    .map((item) => `- ${item.nome}: R$ ${item.preco.toFixed(2)}`)
    .join('\n');

  return [
    `Pedido #${pedido.id}`,
    `Data: ${formatarData(pedido.data)}`,
    `Nome: ${pedido.nome}`,
    `Valor: R$ ${pedido.valor.toFixed(2)}`,
    `${pedido.tipoEntrega === 'mesa' ? 'Mesa' : 'Entrega'}: ${entrega}`,
    '',
    'Itens:',
    itens,
  ].join('\n');
}

export default function PedidosPage({ pedidos }: PedidosPageProps) {
  const [pedidoCopiadoId, setPedidoCopiadoId] = useState<number | null>(null);

  const copiarPedido = async (pedido: Pedido) => {
    const texto = formatarPedidoParaCopia(pedido);

    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      const area = document.createElement('textarea');
      area.value = texto;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.left = '-9999px';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area);
    }

    setPedidoCopiadoId(pedido.id);
    window.setTimeout(() => {
      setPedidoCopiadoId((atual) => (atual === pedido.id ? null : atual));
    }, 2000);
  };

  if (pedidos.length === 0) {
    return (
      <div className="pedidos-vazio">
        <p>Nenhum pedido finalizado ainda.</p>
        <p className="pedidos-vazio-dica">
          Adicione itens no cardápio e finalize o pedido para vê-lo aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="pedidos-lista">
      {pedidos.map((pedido) => (
        <article key={pedido.id} className="pedido-card">
          <header className="pedido-card-header">
            <div>
              <h3>Pedido #{pedido.id}</h3>
              <time dateTime={pedido.data}>{formatarData(pedido.data)}</time>
            </div>
            <div className="pedido-card-acoes">
              <span className="pedido-badge">
                {pedido.tipoEntrega === 'mesa'
                  ? `Mesa ${pedido.mesa}`
                  : 'Retirada'}
              </span>
              <button
                type="button"
                className={`btn-copiar ${pedidoCopiadoId === pedido.id ? 'copiado' : ''}`}
                onClick={() => copiarPedido(pedido)}
              >
                {pedidoCopiadoId === pedido.id ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </header>

          <dl className="pedido-dados">
            <div>
              <dt>Data</dt>
              <dd>{formatarData(pedido.data)}</dd>
            </div>
            <div>
              <dt>Nome</dt>
              <dd>{pedido.nome}</dd>
            </div>
            <div>
              <dt>Valor</dt>
              <dd className="pedido-valor">R$ {pedido.valor.toFixed(2)}</dd>
            </div>
            <div>
              <dt>{pedido.tipoEntrega === 'mesa' ? 'Mesa' : 'Entrega'}</dt>
              <dd>
                {pedido.tipoEntrega === 'mesa'
                  ? `Mesa ${pedido.mesa}`
                  : 'Retirada'}
              </dd>
            </div>
          </dl>

          <ul className="pedido-itens">
            {pedido.itens.map((item, indice) => (
              <li key={`${pedido.id}-${indice}`}>
                <span>{item.nome}</span>
                <span>R$ {item.preco.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
