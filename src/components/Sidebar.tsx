export type Pagina = 'cardapio' | 'pedido';

interface SidebarProps {
  paginaAtiva: Pagina;
  onPaginaChange: (pagina: Pagina) => void;
  aberta: boolean;
  onFechar: () => void;
  quantidadePedidos?: number;
}

const itens: { id: Pagina; label: string; icone: string }[] = [
  { id: 'cardapio', label: 'Cardápio', icone: '📋' },
  { id: 'pedido', label: 'Pedido', icone: '🧾' },
];

export default function Sidebar({
  paginaAtiva,
  onPaginaChange,
  aberta,
  onFechar,
  quantidadePedidos = 0,
}: SidebarProps) {
  const selecionarPagina = (pagina: Pagina) => {
    onPaginaChange(pagina);
    onFechar();
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${aberta ? 'aberta' : ''}`}
        onClick={onFechar}
        aria-hidden={!aberta}
      />

      <aside className={`sidebar ${aberta ? 'aberta' : ''}`}>
        <div className="sidebar-brand">
          <span className="sidebar-logo">🍕</span>
          <h1>Pizzaria do Sadan</h1>
          <button
            type="button"
            className="sidebar-fechar"
            onClick={onFechar}
            aria-label="Fechar menu"
          >
            ×
          </button>
        </div>

        <nav className="sidebar-nav">
          {itens.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`sidebar-item ${paginaAtiva === item.id ? 'active' : ''}`}
              onClick={() => selecionarPagina(item.id)}
            >
              <span className="sidebar-item-icon">{item.icone}</span>
              <span className="sidebar-item-label">{item.label}</span>
              {item.id === 'pedido' && quantidadePedidos > 0 && (
                <span className="sidebar-badge">{quantidadePedidos}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
