export interface Produto {
    id: number;
    nome: string;
    categoria: 'salgada' | 'doce' | 'bebida' | 'fogaca' | 'esfirra'; // Restringimos para aceitar apenas essas categorias
    preco: number;
    descricao: string;
  }
