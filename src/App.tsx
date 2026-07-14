import { useState } from 'react';
import './styles/global.css';
import Sidebar, { type Pagina } from './components/Sidebar.tsx';
import PedidosPage from './components/PedidosPage.tsx';
import type { Pedido, Produto, TipoEntrega } from './types.ts';

const cardapio: Produto[] = [
  { id: 1, nome: "Calabresa", categoria: "salgada", preco: 45.00, descricao: "Molho de tomate, calabresa fatiada e cebola." },
  { id: 2, nome: "Quatro Queijos", categoria: "salgada", preco: 50.00, descricao: "Muçarela, catupiry, provolone e gorgonzola." },
  { id: 3, nome: "Nutella com Morango", categoria: "doce", preco: 55.00, descricao: "Creme de Nutella coberto com morangos frescos." },
  { id: 4, nome: "Frango com Catupiry", categoria: "salgada", preco: 48.00, descricao: "Peito de frango desfiado e catupiry." },
  { id: 5, nome: "Coca-Cola 2L", categoria: "bebida", preco: 12.00, descricao: "Refrigerante Coca-Cola garrafa 2 litros gelada." },
  { id: 6, nome: "Guaraná Antarctica 2L", categoria: "bebida", preco: 10.00, descricao: "Refrigerante Guaraná Antarctica garrafa 2 litros." },
  { id: 7, nome: "Suco de Laranja 500ml", categoria: "bebida", preco: 8.00, descricao: "Suco natural de laranja feito na hora." },
  { id: 8, nome: "Água Mineral 500ml", categoria: "bebida", preco: 4.00, descricao: "Água mineral sem gás gelada." },
  { id: 9, nome: "Fogaça de Frango com Catupiry", categoria: "fogaca", preco: 22.00, descricao: "Fogaça artesanal recheada com frango desfiado e catupiry cremoso." },
  { id: 10, nome: "Fogaça de Calabresa", categoria: "fogaca", preco: 20.00, descricao: "Fogaça artesanal recheada com calabresa fatiada e cebola." },
  { id: 11, nome: "Fogaça de Presunto e Queijo", categoria: "fogaca", preco: 20.00, descricao: "Fogaça artesanal com presunto e muçarela derretida." },
  { id: 12, nome: "Fogaça de Chocolate", categoria: "fogaca", preco: 24.00, descricao: "Fogaça doce recheada com chocolate ao leite derretido." },
  { id: 13, nome: "Fogaça de Goiabada com Queijo", categoria: "fogaca", preco: 22.00, descricao: "Fogaça doce clássica com goiabada cremosa e queijo minas." },
  { id: 14, nome: "Esfirra de Carne", categoria: "esfirra", preco: 8.00, descricao: "Esfirra aberta com carne moída temperada e cebolinha." },
  { id: 15, nome: "Esfirra de Queijo", categoria: "esfirra", preco: 7.00, descricao: "Esfirra fechada recheada com muçarela derretida." },
  { id: 16, nome: "Esfirra de Frango com Catupiry", categoria: "esfirra", preco: 8.00, descricao: "Esfirra fechada com frango desfiado e catupiry." },
  { id: 17, nome: "Esfirra de Calabresa", categoria: "esfirra", preco: 8.00, descricao: "Esfirra fechada com calabresa moída e queijo." }
];

const titulosPagina: Record<Pagina, string> = {
  cardapio: 'Cardápio',
  pedido: 'Pedido',
};

export default function App() {
  const [paginaAtiva, setPaginaAtiva] = useState<Pagina>('cardapio');
  const [categoriaAtiva, setCategoriaAtiva] = useState<'todas' | 'salgada' | 'doce' | 'bebida' | 'fogaca' | 'esfirra'>('todas');
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [etapaFinalizacao, setEtapaFinalizacao] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [nomeCliente, setNomeCliente] = useState('');
  const [tipoEntrega, setTipoEntrega] = useState<TipoEntrega>('mesa');
  const [numeroMesa, setNumeroMesa] = useState('');

  const produtosFiltrados = categoriaAtiva === 'todas'
    ? cardapio
    : cardapio.filter((produto) => produto.categoria === categoriaAtiva);

  const totalCarrinho = carrinho.reduce((total, item) => total + item.preco, 0);

  const adicionarAoCarrinho = (produto: Produto): void => {
    setCarrinho([...carrinho, produto]);
  };

  const removerDoCarrinho = (indice: number): void => {
    setCarrinho(carrinho.filter((_, i) => i !== indice));
  };

  const fecharModal = () => {
    setModalAberto(false);
    setEtapaFinalizacao(false);
    setNomeCliente('');
    setTipoEntrega('mesa');
    setNumeroMesa('');
  };

  const iniciarFinalizacao = () => {
    setEtapaFinalizacao(true);
  };

  const confirmarPedido = () => {
    const nome = nomeCliente.trim();
    if (!nome) return;

    if (tipoEntrega === 'mesa') {
      const mesa = Number(numeroMesa);
      if (!numeroMesa || Number.isNaN(mesa) || mesa <= 0) return;
    }

    const novoPedido: Pedido = {
      id: pedidos.length + 1,
      data: new Date().toISOString(),
      nome,
      valor: totalCarrinho,
      tipoEntrega,
      mesa: tipoEntrega === 'mesa' ? Number(numeroMesa) : undefined,
      itens: [...carrinho],
    };

    setPedidos([novoPedido, ...pedidos]);
    setCarrinho([]);
    fecharModal();
    setPaginaAtiva('pedido');
  };

  const formularioValido =
    nomeCliente.trim().length > 0 &&
    (tipoEntrega === 'retirada' ||
      (numeroMesa !== '' && Number(numeroMesa) > 0));

  return (
    <div className="app-layout">
      <Sidebar
        paginaAtiva={paginaAtiva}
        onPaginaChange={setPaginaAtiva}
        aberta={menuAberto}
        onFechar={() => setMenuAberto(false)}
        quantidadePedidos={pedidos.length}
      />

      <div className="main-content">
        <header className="header">
          <div className="header-esquerda">
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuAberto(true)}
              aria-label="Abrir menu"
            >
              <span />
              <span />
              <span />
            </button>
            <h2>{titulosPagina[paginaAtiva]}</h2>
          </div>
          <button
            type="button"
            className="carrinho-status"
            onClick={() => setModalAberto(true)}
          >
            <span className="carrinho-texto-completo">
              🛒 {carrinho.length} itens (R$ {totalCarrinho.toFixed(2)})
            </span>
            <span className="carrinho-texto-curto">
              🛒 {carrinho.length}
            </span>
          </button>
        </header>

        {paginaAtiva === 'cardapio' && (
          <>
            <div className="filtros">
              <button
                className={categoriaAtiva === 'todas' ? 'active' : ''}
                onClick={() => setCategoriaAtiva('todas')}
              >
                Todas
              </button>
              <button
                className={categoriaAtiva === 'salgada' ? 'active' : ''}
                onClick={() => setCategoriaAtiva('salgada')}
              >
                Salgadas
              </button>
              <button
                className={categoriaAtiva === 'doce' ? 'active' : ''}
                onClick={() => setCategoriaAtiva('doce')}
              >
                Doces
              </button>
              <button
                className={categoriaAtiva === 'bebida' ? 'active' : ''}
                onClick={() => setCategoriaAtiva('bebida')}
              >
                Bebidas
              </button>
              <button
                className={categoriaAtiva === 'fogaca' ? 'active' : ''}
                onClick={() => setCategoriaAtiva('fogaca')}
              >
                Fogaças
              </button>
              <button
                className={categoriaAtiva === 'esfirra' ? 'active' : ''}
                onClick={() => setCategoriaAtiva('esfirra')}
              >
                Esfirras
              </button>
            </div>

            <main className="cardapio-grid">
              {produtosFiltrados.map((produto) => (
                <div key={produto.id} className="pizza-card">
                  <h3>{produto.nome}</h3>
                  <p className="descricao">{produto.descricao}</p>
                  <div className="pizza-footer">
                    <span className="preco">R$ {produto.preco.toFixed(2)}</span>
                    <button onClick={() => adicionarAoCarrinho(produto)}>
                      Adicionar
                    </button>
                  </div>
                </div>
              ))}
            </main>
          </>
        )}

        {paginaAtiva === 'pedido' && <PedidosPage pedidos={pedidos} />}
      </div>

      {modalAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{etapaFinalizacao ? 'Finalizar Pedido' : 'Seu Pedido'}</h2>
              <button
                type="button"
                className="modal-close"
                onClick={fecharModal}
                aria-label="Fechar"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              {!etapaFinalizacao ? (
                <>
                  {carrinho.length === 0 ? (
                    <p className="carrinho-vazio">Seu carrinho está vazio.</p>
                  ) : (
                    <ul className="carrinho-lista">
                      {carrinho.map((item, indice) => (
                        <li key={indice} className="carrinho-item">
                          <div className="carrinho-item-info">
                            <strong>{item.nome}</strong>
                            <span>R$ {item.preco.toFixed(2)}</span>
                          </div>
                          <button
                            type="button"
                            className="btn-remover"
                            onClick={() => removerDoCarrinho(indice)}
                          >
                            Remover
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <form
                  className="form-finalizar"
                  onSubmit={(e) => {
                    e.preventDefault();
                    confirmarPedido();
                  }}
                >
                  <label className="campo">
                    <span>Nome</span>
                    <input
                      type="text"
                      value={nomeCliente}
                      onChange={(e) => setNomeCliente(e.target.value)}
                      placeholder="Nome do cliente"
                      autoFocus
                      required
                    />
                  </label>

                  <fieldset className="campo">
                    <legend>Tipo</legend>
                    <div className="opcoes-entrega">
                      <label className="opcao-entrega">
                        <input
                          type="radio"
                          name="tipoEntrega"
                          checked={tipoEntrega === 'mesa'}
                          onChange={() => setTipoEntrega('mesa')}
                        />
                        Mesa
                      </label>
                      <label className="opcao-entrega">
                        <input
                          type="radio"
                          name="tipoEntrega"
                          checked={tipoEntrega === 'retirada'}
                          onChange={() => setTipoEntrega('retirada')}
                        />
                        Retirada
                      </label>
                    </div>
                  </fieldset>

                  {tipoEntrega === 'mesa' && (
                    <label className="campo">
                      <span>Número da mesa</span>
                      <input
                        type="number"
                        min={1}
                        value={numeroMesa}
                        onChange={(e) => setNumeroMesa(e.target.value)}
                        placeholder="Ex: 5"
                        required
                      />
                    </label>
                  )}

                  <div className="resumo-finalizacao">
                    <span>Valor total</span>
                    <strong>R$ {totalCarrinho.toFixed(2)}</strong>
                  </div>
                </form>
              )}
            </div>

            {!etapaFinalizacao && (
              <>
                <div className="modal-footer">
                  <span className="total-label">Total:</span>
                  <span className="total-valor">R$ {totalCarrinho.toFixed(2)}</span>
                </div>

                {carrinho.length > 0 && (
                  <button
                    className="btn-finalizar"
                    type="button"
                    onClick={iniciarFinalizacao}
                  >
                    Finalizar Pedido
                  </button>
                )}
              </>
            )}

            {etapaFinalizacao && (
              <div className="modal-acoes">
                <button
                  type="button"
                  className="btn-voltar"
                  onClick={() => setEtapaFinalizacao(false)}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  className="btn-finalizar"
                  onClick={confirmarPedido}
                  disabled={!formularioValido}
                >
                  Confirmar Pedido
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
