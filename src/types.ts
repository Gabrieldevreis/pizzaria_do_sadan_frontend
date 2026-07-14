export interface Produto {
  id: number;
  nome: string;
  categoria: 'salgada' | 'doce' | 'bebida' | 'fogaca' | 'esfirra';
  preco: number;
  descricao: string;
}

export type TipoEntrega = 'mesa' | 'retirada';

export interface Pedido {
  id: number;
  data: string;
  nome: string;
  valor: number;
  tipoEntrega: TipoEntrega;
  mesa?: number;
  itens: Produto[];
}
