import { useState } from 'react';
import './styles/global.css';
import Sidebar, { type Pagina } from './components/Sidebar.tsx';
import PedidosPage from './components/PedidosPage.tsx';
import type {
  FormaPagamento,
  Pedido,
  Produto,
  SituacaoPagamento,
  TipoEntrega,
} from './types.ts';

const labelsFormaPagamento: Record<FormaPagamento, string> = {
  dinheiro: 'Dinheiro',
  pix: 'PIX',
  credito: 'Cartão de crédito',
  debito: 'Cartão de débito',
};

const cardapio: Produto[] = [
  { id: 1, nome: "11 - Abobrinha", categoria: "salgada", preco: 55.00, descricao: "Molho de tomate, Muçarela, Abobrinha, Parmesão, Cream cheese, Orégano" },
  { id: 2, nome: "12 - Banana Salgada", categoria: "salgada", preco: 50.00, descricao: "Molho de tomate, Muçarela, Banana, Bacon, Requeijão, Orégano" },
  { id: 3, nome: "13 - Brócolis", categoria: "salgada", preco: 50.00, descricao: "Molho de tomate, Muçarela, Brócolis, Bacon, Alho frito, Requeijão, Orégano" },
  { id: 4, nome: "14 - Calabresa", categoria: "salgada", preco: 50.00, descricao: "Molho de tomate, Muçarela, Calabresa, Cebola, Orégano" },
  { id: 5, nome: "15 - Caipira", categoria: "salgada", preco: 50.00, descricao: "Molho de tomate, Muçarela, Frango, Milho, Requeijão, Orégano" },
  { id: 6, nome: "16 - Mussarela", categoria: "salgada", preco: 50.00, descricao: "Molho de tomate, Muçarela, Tomate, Orégano" },
  { id: 7, nome: "17 - Marguerita", categoria: "salgada", preco: 50.00, descricao: "Molho de tomate, Muçarela, Tomate, Manjericão, Parmesão, Azeitona, Orégano" },
  { id: 8, nome: "18 - Bauru", categoria: "salgada", preco: 50.00, descricao: "Presunto, Queijo, Tomate, Orégano, Azeitonas" },
  { id: 9, nome: "19 - Romeu e Julieta", categoria: "salgada", preco: 50.00, descricao: "Muçarela, Goiabada, Requeijão" },
  { id: 10, nome: "20 - Doce de Leite", categoria: "salgada", preco: 50.00, descricao: "Muçarela, Doce de leite, Creme de leite" },
  { id: 11, nome: "Macacuille", categoria: "salgada", preco: 50.00, descricao: "Creme de leite, Banana, Creme de chocolate" },
  { id: 12, nome: "Combo Especial Quarta-Feira", categoria: "salgada", preco: 25.00, descricao: "Orangotango + Bebida Lata (Mussarela, calabresa, alface, tomate, milho, cebola e requeijão)" },
  { id: 13, nome: "Combo Especial Quinta-Feira", categoria: "salgada", preco: 25.00, descricao: "Chimpanze + Bebida Lata" },
  { id: 14, nome: "Combo Especial Sexta-Feira", categoria: "salgada", preco: 25.00, descricao: "Mico Leão Dourado + Bebida Lata Lata (Mussarela, calabresa, alface, tomate, milho, cebola e requeijão)" },
  { id: 15, nome: "Combo Especial Sabado", categoria: "salgada", preco: 24.00, descricao: "Gorila + Bebida Lata (Mussarela, frango grelhado, alface, tomate, milho, cebola caramelizada e requeijão)" },
  { id: 16, nome: "Combo Especial Domingo", categoria: "salgada", preco: 22.00, descricao: "Mandril + Bebida Lata (Molho Barbecue, carne suina, alface, tomate, cebola e mussarela)" },
  { id: 17, nome: "Vegetariana Especial", categoria: "salgada", preco: 67.00, descricao: "Muçarela, Abobrinha, Brócolis, Tomate seco, Cream cheese, Orégano" },
  { id: 18, nome: "Vegana", categoria: "salgada", preco: 60.00, descricao: "Molho de tomate, Abobrinha, Milho, Palmito, Tomate seco, Orégano" },
  { id: 19, nome: "Romanesca", categoria: "salgada", preco: 68.00, descricao: "Molho de tomate, Muçarela, Presunto, Champignon, Bacon, Parmesão, Requeijão, Orégano" },
  { id: 20, nome: "Quatro Queijos", categoria: "salgada", preco: 77.00, descricao: "Molho de tomate, Muçarela, Provolone, Gorgonzola, Requeijão, Orégano" },
  { id: 21, nome: "Quatro Carnes", categoria: "salgada", preco: 77.00, descricao: "Muçarela, Cebola, Presunto, Lombo, Calabresa, Bacon, Requeijão, Orégano" },
  { id: 22, nome: "Provolone", categoria: "salgada", preco: 60.00, descricao: "Molho de tomate, Muçarela, Provolone, Orégano" },
  { id: 23, nome: "Portuguesa", categoria: "salgada", preco: 72.00, descricao: "Molho de tomate, Presunto, Palmito, Ovo, Cebola, Ervilha, Muçarela, Orégano" },
  { id: 24, nome: "Muçarela", categoria: "salgada", preco: 60.00, descricao: "Molho de tomate, Muçarela, Tomate, Orégano" },
  { id: 25, nome: "Mistureba", categoria: "salgada", preco: 80.00, descricao: "Molho de tomate, Muçarela, Presunto, Lombo, Calabresa, Parmesão, Gorgonzola, Tomate, Cebola, Orégano" },
  { id: 26, nome: "Mister Sadan", categoria: "salgada", preco: 70.00, descricao: "Molho de tomate, Muçarela, Banana, Carne seca, Parmesão, Requeijão" },
  { id: 27, nome: "Mama-Mia", categoria: "salgada", preco: 60.00, descricao: "Molho de tomate, Muçarela, Tomate, Orégano, Azeitona verde picada, Azeitona preta picada" },
  { id: 28, nome: "Marguerita", categoria: "salgada", preco: 60.00, descricao: "Molho de tomate, Muçarela, Tomate, Manjericão, Parmesão, Azeitona, Orégano" },
  { id: 29, nome: "Lombo Canadense", categoria: "salgada", preco: 62.00, descricao: "Molho de tomate, Muçarela, Lombo, Cebola, Orégano" },
  { id: 30, nome: "La Polastrina", categoria: "salgada", preco: 78.00, descricao: "Molho de tomate, Muçarela, Frango, Bacon, Palmito, Milho, Ovo, Cebola, Requeijão, Orégano" },
  { id: 31, nome: "Frango Especial", categoria: "salgada", preco: 64.00, descricao: "Molho de tomate, Muçarela, Lombo, Frango, Azeitona preta picada, Cheddar, Orégano" },
  { id: 32, nome: "Filé Mignon", categoria: "salgada", preco: 78.00, descricao: "Molho de tomate, Muçarela, Filé mignon, Cebola, Requeijão, Orégano" },
  { id: 33, nome: "Explosão De Sabor", categoria: "salgada", preco: 65.00, descricao: "Molho barbecue, Muçarela, Linguiça toscana, Parmesão, Alho fresco, Orégano" },
  { id: 34, nome: "Don Churras", categoria: "salgada", preco: 70.00, descricao: "Molho de alho, Muçarela, Filé mignon, Linguiça toscana, Orégano" },
  { id: 35, nome: "Don Chipanzé", categoria: "salgada", preco: 63.00, descricao: "Molho de tomate, Muçarela, Calabresa, Ovo, Cebola, Pimenta, Orégano" },
  { id: 36, nome: "Costela Kong", categoria: "salgada", preco: 77.00, descricao: "Molho barbecue, Muçarela, Costela desfiada, Cream cheese, Cebola caramelizada, Requeijão, Orégano" },
  { id: 37, nome: "Costela Gaúcha", categoria: "salgada", preco: 77.00, descricao: "Molho de tomate, Muçarela, Costela desfiada, Cebola, Requeijão, Orégano" },
  { id: 38, nome: "Califórnia", categoria: "salgada", preco: 75.00, descricao: "Molho de tomate, Muçarela, Lombo, Pessego, Abacaxi, Figo, Goiabada, Requeijão" },
  { id: 39, nome: "Calabresa", categoria: "salgada", preco: 60.00, descricao: "Molho de tomate, Muçarela, Calabresa, Cebola, Orégano" },
  { id: 40, nome: "Caipira", categoria: "salgada", preco: 65.00, descricao: "Molho de tomate, Muçarela, Frango, Milho, Requeijão, Orégano" },
  { id: 41, nome: "Brócolis", categoria: "salgada", preco: 60.00, descricao: "Molho de tomate, Muçarela, Brócolis, Bacon, Alho frito, Requeijão, Orégano" },
  { id: 42, nome: "01 - Bauru", categoria: "salgada", preco: 60.00, descricao: "Presunto, Queijo, Tomate, Orégano, Azeitonas" },
  { id: 43, nome: "Baiana Especial", categoria: "salgada", preco: 68.00, descricao: "Molho de tomate, Muçarela, Carne seca, Refogado de cebola e pimentões coloridos, Cream cheese, Orégano" },
  { id: 44, nome: "Baiana", categoria: "salgada", preco: 63.00, descricao: "Molho de tomate, Muçarela, Ovos, Calabresa ralada, Parmesão, Orégano" },
  { id: 45, nome: "Banana Salgada", categoria: "salgada", preco: 64.00, descricao: "Molho de tomate, Muçarela, Banana, Bacon, Requeijão, Orégano" },
  { id: 46, nome: "Bacon", categoria: "salgada", preco: 60.00, descricao: "Molho de tomate, Muçarela, Atum, Cebola, Orégano" },
  { id: 47, nome: "Atum", categoria: "salgada", preco: 68.00, descricao: "Molho de tomate, Muçarela, Atum, Cebola, Orégano" },
  { id: 48, nome: "Aliche", categoria: "salgada", preco: 65.00, descricao: "Molho de tomate, Muçarela, Aliche, Orégano" },
  { id: 49, nome: "A Grega", categoria: "salgada", preco: 60.00, descricao: "Molho de tomate, Muçarela, Presunto, Palmito, Milho, Orégano" },
  { id: 50, nome: "Abobrinha", categoria: "salgada", preco: 60.00, descricao: "Molho de tomate, Muçarela, Abobrinha, Parmesão, Cream cheese, Orégano" },
  { id: 51, nome: "Banana Doce Vegana", categoria: "doce", preco: 54.00, descricao: "Banana, Açucar, Canela" },
  { id: 52, nome: "Triangulo Amoroso", categoria: "doce", preco: 65.00, descricao: "Muçarela, Goiabada, Bacon, Cream cheese" },
  { id: 53, nome: "Sensação", categoria: "doce", preco: 60.00, descricao: "Creme de leite, Creme de chocolate, Creme de morango" },
  { id: 54, nome: "Romeu E Julieta", categoria: "doce", preco: 63.00, descricao: "Muçarela, Goiabada, Requeijão" },
  { id: 55, nome: "Macacuille Doce", categoria: "doce", preco: 54.00, descricao: "Creme de leite, Banana, Creme de chocolate" },
  { id: 56, nome: "Doce De Leite", categoria: "doce", preco: 56.00, descricao: "Muçarela, Doce de leite, Creme de leite" },
  { id: 57, nome: "Creme De Avelã E Nutella", categoria: "doce", preco: 60.00, descricao: "Creme de leite, Creme de avelã, Nutella" },
  { id: 58, nome: "Banana Doce", categoria: "doce", preco: 54.00, descricao: "Banana, Leite condensado, Canela" },
  { id: 59, nome: "Banana Com Amendoim", categoria: "doce", preco: 60.00, descricao: "Creme de leite, Banana, Creme de amendoim" },
  { id: 60, nome: "Amor Preto E Branco", categoria: "doce", preco: 65.00, descricao: "Creme de leite, Creme de chocolate, Creme de leite ninho" },
  { id: 61, nome: "Esfiha de Carne", categoria: "esfirra", preco: 6.00, descricao: "" },
  { id: 62, nome: "Esfiha Ninho", categoria: "esfirra", preco: 8.00, descricao: "" },
  { id: 63, nome: "Esfiha de Carne com Queijo", categoria: "esfirra", preco: 7.00, descricao: "" },
  { id: 64, nome: "Esfiha de Calabresa", categoria: "esfirra", preco: 5.00, descricao: "" },
  { id: 65, nome: "Esfiha de Frango", categoria: "esfirra", preco: 5.00, descricao: "" },
  { id: 66, nome: "Esfiha de Queijo", categoria: "esfirra", preco: 7.00, descricao: "" },
  { id: 67, nome: "Esfiha Vegetariana", categoria: "esfirra", preco: 6.00, descricao: "" },
  { id: 68, nome: "Esfiha Romeu e Julieta", categoria: "esfirra", preco: 7.00, descricao: "" },
  { id: 69, nome: "Esfiha Avelã com Nutella", categoria: "esfirra", preco: 7.00, descricao: "" },
  { id: 70, nome: "COMBO 01", categoria: "esfirra", preco: 30.00, descricao: "2 Carne, 2 Frango, 3 Calabresa" },
  { id: 71, nome: "COMBO 02", categoria: "esfirra", preco: 43.00, descricao: "2 Carne, 2 Frango, 2 Calabresa, 2 Queijo" },
  { id: 72, nome: "COMBO 03", categoria: "esfirra", preco: 57.00, descricao: "3 Carne, 3 Frango, 4 Queijo" },
  { id: 73, nome: "COMBO 04", categoria: "esfirra", preco: 83.00, descricao: "5 Carne, 5 Queijo, 5 Calabresa" },
  { id: 74, nome: "Vegana 02", categoria: "fogaca", preco: 13.00, descricao: "Molho de tomate, Palmito, Brócolis, Milho" },
  { id: 75, nome: "Vegana 01", categoria: "fogaca", preco: 14.00, descricao: "Molho de tomate, Abobrinha ralada, Tomate seco, Palmito" },
  { id: 76, nome: "Vegetariano 02", categoria: "fogaca", preco: 13.00, descricao: "Muçarela, Milho, Tomate seco, Cream cheese" },
  { id: 77, nome: "Vegetariano 01", categoria: "fogaca", preco: 13.00, descricao: "Muçarela, Milho, Brócolis, Cream cheese" },
  { id: 78, nome: "Palmito", categoria: "fogaca", preco: 13.00, descricao: "Muçarela, Palmito, Tomate, Orégano" },
  { id: 79, nome: "Muçarela E Milho", categoria: "fogaca", preco: 12.00, descricao: "Muçarela, Milho, Requeijão" },
  { id: 80, nome: "01 - Muçarela", categoria: "fogaca", preco: 12.00, descricao: "Muçarela, Tomate, Orégano" },
  { id: 81, nome: "Mexicana", categoria: "fogaca", preco: 15.00, descricao: "Muçarela, Frango, Tomate, Bacon, Ervilha, Pimenta" },
  { id: 82, nome: "Frango", categoria: "fogaca", preco: 13.00, descricao: "Muçarela, Frango, Requijão" },
  { id: 83, nome: "Costela", categoria: "fogaca", preco: 15.00, descricao: "Muçarela, Costela desfiada, Requeijão" },
  { id: 84, nome: "01 - Calabresa", categoria: "fogaca", preco: 13.00, descricao: "Muçarela, Calabresa, Requeijão" },
  { id: 85, nome: "01 - Caipira", categoria: "fogaca", preco: 14.00, descricao: "Muçarela, Frango, Milho, Requeijão" },
  { id: 86, nome: "Bauru", categoria: "fogaca", preco: 13.00, descricao: "Muçarela, Presunto, Tomate, Orégano" },
  { id: 87, nome: "01 - Bacon", categoria: "fogaca", preco: 13.00, descricao: "Muçarela, Bacon, Requeijão" },
  { id: 88, nome: "01 - Banana Salgada", categoria: "fogaca", preco: 13.00, descricao: "Muçarela, Banana, Bacon, Requeijão" },
  { id: 89, nome: "01 - Avelã e Nutella", categoria: "fogaca", preco: 15.00, descricao: "Creme de avelã, Nutella" },
  { id: 90, nome: "2 - Banana Vegana", categoria: "fogaca", preco: 12.00, descricao: "Banana (fruta), Canela, Açucar" },
  { id: 91, nome: "3 - Doce de Leite", categoria: "fogaca", preco: 12.00, descricao: "Doce de leite, Muçarela" },
  { id: 92, nome: "04 - Romeu e Julieta", categoria: "fogaca", preco: 13.00, descricao: "Muçarela, Goiabada, Requeijão" },
  { id: 93, nome: "05 - Triangulo Amoroso", categoria: "fogaca", preco: 14.00, descricao: "Muçarela, Goiabada, Bacon, Cream cheese" },
  { id: 94, nome: "06 - Macacuille", categoria: "fogaca", preco: 13.00, descricao: "Banana ( Fruta ), Creme de chocolate" },
  { id: 95, nome: "07 - Amendoim com Banana", categoria: "fogaca", preco: 13.00, descricao: "Banana ( Fruta ), Creme de amendoim" },
  { id: 96, nome: "08 - Moranguete", categoria: "fogaca", preco: 14.00, descricao: "Creme de morango, Creme de chocolate" },
  { id: 97, nome: "09 - Leite Ninho", categoria: "fogaca", preco: 15.00, descricao: "Creme de leite ninho" },
  { id: 98, nome: "X Kong", categoria: "salgada", preco: 35.00, descricao: "Alface, Tomate, Milho, Mussarela, Bacon, Calabresa, Presunto, Cebola, Hambúrguer, Ovos, Requeijão" },
  { id: 99, nome: "Mico Leão Dourado", categoria: "salgada", preco: 28.00, descricao: "Muçarela, Calabresa, Alface, Tomate, Milho, Cebola, Requeijão" },
  { id: 100, nome: "Macaco", categoria: "salgada", preco: 30.00, descricao: "Alface, Tomate, Muçarela, Presunto, Cebola, Contra filé, Ovos, Requeijão" },
  { id: 101, nome: "Mandril", categoria: "salgada", preco: 25.00, descricao: "Molho barbecue, Carne suina, Alface, Tomate, Cebola, Muçarela" },
  { id: 102, nome: "Orangotango", categoria: "salgada", preco: 28.00, descricao: "Muçarela, Costela desfiada, Cebola, Queijo provolone, Requeijão" },
  { id: 103, nome: "Chimpanzé", categoria: "salgada", preco: 28.00, descricao: "Alface, Tomate, Muçarela, Hambúrguer, Presunto, Ovos, Cheddar" },
  { id: 104, nome: "Gorila", categoria: "salgada", preco: 27.00, descricao: "Muçarela, Frango grelhado, Alface, Tomate, Milho, Cebola caramelizada, Requeijão" },
  { id: 105, nome: "Babuíno", categoria: "salgada", preco: 25.00, descricao: "Vegetariano" },
  { id: 106, nome: "Bugio", categoria: "salgada", preco: 23.00, descricao: "Alface, Tomate, Creme de cabotian, Milho, Ervilha, Filé vegano" },
  { id: 107, nome: "Sagui", categoria: "salgada", preco: 20.00, descricao: "Maionese, Presunto, Muçarela" },
  { id: 108, nome: "Broto Quatro Queijos", categoria: "salgada", preco: 35.00, descricao: "Molho de tomate, Muçarela, Provolone, Gorgonzola, Requeijão, Orégano" },
  { id: 109, nome: "Broto Quatro Carnes", categoria: "salgada", preco: 35.00, descricao: "Muçarela, Cebola, Presunto, Lombo, Calabresa, Bacon, Requeijão" },
  { id: 110, nome: "Broto Provolone", categoria: "salgada", preco: 28.00, descricao: "Molho de tomate, Muçarela, Provolone, Orégano" },
  { id: 111, nome: "Broto Portuguesa", categoria: "salgada", preco: 33.00, descricao: "Molho de tomate, Presunto, Palmito, Ovo, Cebola, Ervilha, Muçarela, Orégano" },
  { id: 112, nome: "Broto Muçarela", categoria: "salgada", preco: 27.00, descricao: "Molho de tomate, Muçarela, Tomate, Orégano" },
  { id: 113, nome: "Broto Mistureba", categoria: "salgada", preco: 35.00, descricao: "Molho de tomate, Muçarela, Presunto, Lombo, Calabresa, Parmesão, Gorgonzola, Tomate, Cebola, Orégano" },
  { id: 114, nome: "Broto Mama-Mia", categoria: "salgada", preco: 27.00, descricao: "Molho de tomate, Muçarela, Tomate, Azeitona preta picada, Azeitona verde picada, Orégano" },
  { id: 115, nome: "Broto Marguerita", categoria: "salgada", preco: 27.00, descricao: "Molho de tomate, Muçarela, Tomate, Manjericão, Parmesão, Orégano" },
  { id: 116, nome: "Broto Mister Sadan", categoria: "salgada", preco: 33.00, descricao: "Molho de tomate, Muçarela, Banana, Carne seca, Parmesão, Requeijão" },
  { id: 117, nome: "Broto Lombo Canadense", categoria: "salgada", preco: 28.00, descricao: "Molho de tomate, Muçarela, Lombo, Cebola, Orégano" },
  { id: 118, nome: "Broto Frango Especial", categoria: "salgada", preco: 32.00, descricao: "Molho de tomate, Muçarela, Lombo, Frango, Azeitona preta picada, Cheddar, Orégano" },
  { id: 119, nome: "Broto Filé Mignon", categoria: "salgada", preco: 35.00, descricao: "Molho de tomate, Muçarela, Filé mignon, Cebola, Requeijão, Orégano" },
  { id: 120, nome: "Broto Explosão De Sabor", categoria: "salgada", preco: 29.00, descricao: "Molho barbecue, Muçarela, Linguiça toscana, Parmesão, Alho fresco, Orégano" },
  { id: 121, nome: "Broto Don Churras", categoria: "salgada", preco: 32.00, descricao: "Molho de alho, Muçurela, Filé mignon, Linguiça toscana, Orégano" },
  { id: 122, nome: "Broto Don Chipanzé", categoria: "salgada", preco: 29.00, descricao: "Molho de tomate, Muçarela, Calabresa, Ovo, Cebola, Pimenta, Orégano" },
  { id: 123, nome: "Broto Costela Kong", categoria: "salgada", preco: 35.00, descricao: "Molho barbecue, Muçarela, Costela desfiada, Cream cheese, Cebola caramelizada, Requeijão, Orégano" },
  { id: 124, nome: "Broto Costela Gaúcha", categoria: "salgada", preco: 35.00, descricao: "Molho de tomate, Muçarela, Costela desfiada, Cebola, Requeijão, Orégano" },
  { id: 125, nome: "Broto Califórnia", categoria: "salgada", preco: 34.00, descricao: "Molho de tomate, Muçarela, Lombo, Pessego, Abacaxi, Figo, Goiabada, Requeijão" },
  { id: 126, nome: "Broto Calabresa", categoria: "salgada", preco: 27.00, descricao: "Molho de tomate, Muçarela, Calabresa, Cebola, Orégano" },
  { id: 127, nome: "Broto Caipira", categoria: "salgada", preco: 29.00, descricao: "Molho de tomate, Muçarela, Frango, Milho, Requeijão, Orégano" },
  { id: 128, nome: "Broto Brócolis", categoria: "salgada", preco: 28.00, descricao: "Molho de tomate, Muçarela, Brócolis, Bacon, Alho frito, Requeijão, Orégano" },
  { id: 129, nome: "Broto Baiana Especial", categoria: "salgada", preco: 30.00, descricao: "Molho de tomate, Muçarela, Carne seca, Refogado de cebola e pimentões coloridos, Cream cheese, Orégano" },
  { id: 130, nome: "Broto Banana Salgada", categoria: "salgada", preco: 29.00, descricao: "Molho de tomate, Muçarela, Banana, Bacon, Requeijão, Orégano" },
  { id: 131, nome: "Broto Bacon", categoria: "salgada", preco: 27.00, descricao: "Molho de tomate, Muçarela, Bacon, Orégano" },
  { id: 132, nome: "Broto Atum", categoria: "salgada", preco: 30.00, descricao: "Molho de tomate, Muçarela, Atum, Cebola, Orégano" },
  { id: 133, nome: "Broto Aliche", categoria: "salgada", preco: 29.00, descricao: "Molho de tomate, Muçarela, Presunto, Palmito, Milho, Orégano" },
  { id: 134, nome: "Broto A Grega", categoria: "salgada", preco: 27.00, descricao: "Molho de tomate, Muçarela, Presunto, Palmito, Milho, Orégano" },
  { id: 135, nome: "Broto Abobrinha", categoria: "salgada", preco: 27.00, descricao: "Molho de tomate, Muçarela, Abobrinha, Parmesão, Cream cheese, Orégano" },
  { id: 136, nome: "Broto Vegetariana Especial", categoria: "salgada", preco: 30.00, descricao: "Muçarela, Abobrinha, Brócolis, Tomate seco, Cream cheese, Orégano" },
  { id: 137, nome: "Broto Creme De Avelão E Nutella", categoria: "salgada", preco: 30.00, descricao: "Creme de leite, Creme de avelã, Nutella" },
  { id: 138, nome: "Broto Banana Doce", categoria: "salgada", preco: 24.00, descricao: "Banana, Leite condensado, Canela" },
  { id: 139, nome: "Broto Banana Com Amendoim", categoria: "salgada", preco: 28.00, descricao: "Creme de leite, Banana, Creme de amendoim" },
  { id: 140, nome: "Broto Amor Preto E Branco", categoria: "salgada", preco: 29.00, descricao: "Creme de leite, Creme de chocolate, Creme de leite ninho" },
  { id: 141, nome: "Broto Vegana", categoria: "salgada", preco: 27.00, descricao: "Molho de tomate, Abobrinha, Milho, Palmito, Tomate seco, Orégano" },
  { id: 142, nome: "Broto Romanesca", categoria: "salgada", preco: 32.00, descricao: "Molho de tomate, Muçarela, Presunto, Champignon, Bacon, Parmesão, Requeijão, Orégano" },
  { id: 143, nome: "Broto Triangulo Amoroso", categoria: "salgada", preco: 29.00, descricao: "Muçarela, Goiabada, Bacon, Cream cheese" },
  { id: 144, nome: "Broto Sensação", categoria: "salgada", preco: 28.00, descricao: "Creme de leite, Creme de chocolate, Creme de morango" },
  { id: 145, nome: "Broto Romeu E Julieta", categoria: "salgada", preco: 29.00, descricao: "Muçarela, Goiabada, Requeijão" },
  { id: 146, nome: "Broto Macacuille Doce", categoria: "salgada", preco: 27.00, descricao: "Creme de leite, Creme de chocolate, Banana" },
  { id: 147, nome: "Broto Doce De Leite", categoria: "salgada", preco: 28.00, descricao: "Muçarela, Doce de leite, Creme de leite" },
  { id: 148, nome: "Broto Banana Doce Vegana", categoria: "salgada", preco: 24.00, descricao: "Banana, Açúcar, Canela" },
  { id: 149, nome: "Coca-Cola 2L", categoria: "bebida", preco: 16.00, descricao: "" },
  { id: 150, nome: "Coca-Cola 2L Zero", categoria: "bebida", preco: 16.00, descricao: "" },
  { id: 151, nome: "Guaraná Poty 2L", categoria: "bebida", preco: 12.00, descricao: "" },
  { id: 152, nome: "Coca-Cola Lata", categoria: "bebida", preco: 6.00, descricao: "" },
  { id: 153, nome: "Coca-Cola Zero Lata", categoria: "bebida", preco: 6.00, descricao: "" },
  { id: 154, nome: "Fanta Lata 350ml", categoria: "bebida", preco: 6.00, descricao: "" },
  { id: 155, nome: "Heineken Long Neck 330ml", categoria: "bebida", preco: 10.00, descricao: "" },
  { id: 156, nome: "Brahma Lata 350ml", categoria: "bebida", preco: 10.00, descricao: "" },
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
  const [observacao, setObservacao] = useState('');
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>('pix');
  const [situacaoPagamento, setSituacaoPagamento] = useState<SituacaoPagamento>('pendente');

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
    setObservacao('');
    setFormaPagamento('pix');
    setSituacaoPagamento('pendente');
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

    const observacaoTrim = observacao.trim();

    const novoPedido: Pedido = {
      id: pedidos.length + 1,
      data: new Date().toISOString(),
      nome,
      valor: totalCarrinho,
      tipoEntrega,
      mesa: tipoEntrega === 'mesa' ? Number(numeroMesa) : undefined,
      observacao: observacaoTrim || undefined,
      formaPagamento,
      situacaoPagamento,
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

                  <label className="campo">
                    <span>Observação</span>
                    <textarea
                      value={observacao}
                      onChange={(e) => setObservacao(e.target.value)}
                      placeholder="Ex: sem cebola, troco para R$ 100..."
                      rows={3}
                    />
                  </label>

                  <label className="campo">
                    <span>Forma de pagamento</span>
                    <select
                      value={formaPagamento}
                      onChange={(e) =>
                        setFormaPagamento(e.target.value as FormaPagamento)
                      }
                      required
                    >
                      {(Object.keys(labelsFormaPagamento) as FormaPagamento[]).map(
                        (forma) => (
                          <option key={forma} value={forma}>
                            {labelsFormaPagamento[forma]}
                          </option>
                        ),
                      )}
                    </select>
                  </label>

                  <fieldset className="campo">
                    <legend>Situação do pagamento</legend>
                    <div className="opcoes-entrega">
                      <label className="opcao-entrega">
                        <input
                          type="radio"
                          name="situacaoPagamento"
                          checked={situacaoPagamento === 'pendente'}
                          onChange={() => setSituacaoPagamento('pendente')}
                        />
                        Pendente
                      </label>
                      <label className="opcao-entrega">
                        <input
                          type="radio"
                          name="situacaoPagamento"
                          checked={situacaoPagamento === 'pago'}
                          onChange={() => setSituacaoPagamento('pago')}
                        />
                        Pago
                      </label>
                    </div>
                  </fieldset>

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
