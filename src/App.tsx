import { useState } from 'react';
import './styles/global.css';
import type { Produto } from './types.ts'; // Importando a interface que criamos

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

export default function App() {
  // Definimos que o estado de categoria só aceita esses textos específicos
  const [categoriaAtiva, setCategoriaAtiva] = useState<'todas' | 'salgada' | 'doce' | 'bebida' | 'fogaca' | 'esfirra'>('todas');
  
  // Definimos que o carrinho é um Array de Produtos: Produto[]
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  // Controla se o modal do carrinho está aberto
  const [modalAberto, setModalAberto] = useState<boolean>(false);

  // O TypeScript já sabe que 'produto' é do tipo 'Produto' porque filtramos o array 'cardapio'
  const produtosFiltrados = categoriaAtiva === 'todas' 
    ? cardapio 
    : cardapio.filter(produto => produto.categoria === categoriaAtiva);

  // Tipamos o parâmetro da função para garantir que só adicionamos objetos válidos
  const adicionarAoCarrinho = (produto: Produto): void => {
    setCarrinho([...carrinho, produto]); 
  };

  // Remove um item do carrinho pelo índice (permite remover duplicatas individualmente)
  const removerDoCarrinho = (indice: number): void => {
    setCarrinho(carrinho.filter((_, i) => i !== indice));
  };

  const totalCarrinho = carrinho.reduce((total, item) => total + item.preco, 0);

  return (
    <div className="container">
      <header className="header">
        <h1>Pizzaria do Sadan</h1>
        <button
          type="button"
          className="carrinho-status"
          onClick={() => setModalAberto(true)}
        >
          🛒 {carrinho.length} itens (R$ {totalCarrinho.toFixed(2)})
        </button>
      </header>

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

      {modalAberto && (
        <div
          className="modal-overlay"
          onClick={() => setModalAberto(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Seu Pedido</h2>
              <button
                type="button"
                className="modal-close"
                onClick={() => setModalAberto(false)}
                aria-label="Fechar"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
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
            </div>

            <div className="modal-footer">
              <span className="total-label">Total:</span>
              <span className="total-valor">R$ {totalCarrinho.toFixed(2)}</span>
            </div>

            {carrinho.length > 0 && (
              <button className="btn-finalizar" type="button">
                Finalizar Pedido
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
