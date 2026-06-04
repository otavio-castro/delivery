using delivery_back.Context;
using delivery_back.Models;
using Microsoft.EntityFrameworkCore;

namespace delivery_back.Startup
{
    public class DatabaseSeeder
    {
        private readonly AppDbContext _context;

        public DatabaseSeeder(AppDbContext context)
        {
            _context = context;
        }

        public async Task SeedAsync()
        {
            // Verifica se já tem dados
            if (await _context.Restaurantes.AnyAsync())
                return; // Já populado

            // ========== RESTAURANTES ==========
            var restaurantes = new List<Restaurante>
            {
                new Restaurante
                {
                    Nome = "Pizza da Casa",
                    Descricao = "Pizzas artesanais com massa fina e ingredientes frescos. Tradição italiana em cada fatia!",
                    Categoria = "Pizzaria",
                    Endereco = "Rua das Palmeiras, 123 - Centro",
                    ImagemUrl = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
                    Nota = 4.5m,
                    Ativo = true
                },
                new Restaurante
                {
                    Nome = "Burger Mania",
                    Descricao = "Os melhores hamburgueres artesanais da cidade. Carne premium e pão brioche!",
                    Categoria = "Hamburguer",
                    Endereco = "Av. Paulista, 456 - Bela Vista",
                    ImagemUrl = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
                    Nota = 4.8m,
                    Ativo = true
                },
                new Restaurante
                {
                    Nome = "Sushi House",
                    Descricao = "Culinária japonesa autêntica. Peixes frescos e combinados especiais todos os dias.",
                    Categoria = "Japonesa",
                    Endereco = "Rua da Liberdade, 789 - Liberdade",
                    ImagemUrl = "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
                    Nota = 4.7m,
                    Ativo = true
                },
                new Restaurante
                {
                    Nome = "Pasta & Vino",
                    Descricao = "Massas frescas e molhos especiais da nonna. Ambiente acolhedor e romântico.",
                    Categoria = "Italiana",
                    Endereco = "Rua Bela Cintra, 321 - Consolação",
                    ImagemUrl = "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
                    Nota = 4.6m,
                    Ativo = true
                },
                new Restaurante
                {
                    Nome = "Taco Loco",
                    Descricao = "Sabores mexicanos autênticos. Tacos, burritos e nachos picantes!",
                    Categoria = "Mexicana",
                    Endereco = "Rua Augusta, 654 - Jardins",
                    ImagemUrl = "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
                    Nota = 4.4m,
                    Ativo = true
                },
                new Restaurante
                {
                    Nome = "Veggie Delight",
                    Descricao = "100% vegetariano e vegano. Comida saudável, saborosa e consciente.",
                    Categoria = "Vegetariana",
                    Endereco = "Rua dos Pinheiros, 987 - Pinheiros",
                    ImagemUrl = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
                    Nota = 4.3m,
                    Ativo = true
                },
                new Restaurante
                {
                    Nome = "Churrascaria Gaúcha",
                    Descricao = "Rodízio completo de carnes nobres. Buffet com saladas e pratos quentes.",
                    Categoria = "Churrascaria",
                    Endereco = "Av. Faria Lima, 234 - Itaim Bibi",
                    ImagemUrl = "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
                    Nota = 4.9m,
                    Ativo = true
                },
                new Restaurante
                {
                    Nome = "Açaí na Tigela",
                    Descricao = "Açaí cremoso e natural com diversos complementos. Também temos vitaminas e sucos!",
                    Categoria = "Lanchonete",
                    Endereco = "Rua Oscar Freire, 555 - Jardins",
                    ImagemUrl = "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop",
                    Nota = 4.2m,
                    Ativo = true
                }
            };

            await _context.Restaurantes.AddRangeAsync(restaurantes);
            await _context.SaveChangesAsync();

            // ========== PRODUTOS ==========
            var produtos = new List<Produto>
            {
                // Pizza da Casa
                new Produto
                {
                    Nome = "Pizza Margherita",
                    Descricao = "Molho de tomate, mussarela, manjericão fresco e azeite",
                    Preco = 42.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[0].RestauranteId
                },
                new Produto
                {
                    Nome = "Pizza Calabresa",
                    Descricao = "Molho de tomate, mussarela, calabresa fatiada e cebola",
                    Preco = 45.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[0].RestauranteId
                },
                new Produto
                {
                    Nome = "Pizza 4 Queijos",
                    Descricao = "Mussarela, provolone, gorgonzola e parmesão",
                    Preco = 48.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[0].RestauranteId
                },
                new Produto
                {
                    Nome = "Pizza Portuguesa",
                    Descricao = "Presunto, mussarela, ovos, cebola, azeitona e orégano",
                    Preco = 46.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[0].RestauranteId
                },
                new Produto
                {
                    Nome = "Refrigerante 2L",
                    Descricao = "Coca-Cola, Guaraná ou Fanta",
                    Preco = 12.00m,
                    Categoria = "Bebida",
                    ImagemUrl = "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[0].RestauranteId
                },

                // Burger Mania
                new Produto
                {
                    Nome = "Burger Clássico",
                    Descricao = "180g de carne, queijo, alface, tomate, cebola e molho especial",
                    Preco = 32.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[1].RestauranteId
                },
                new Produto
                {
                    Nome = "Bacon Burger",
                    Descricao = "180g de carne, queijo cheddar, bacon crocante e molho barbecue",
                    Preco = 36.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[1].RestauranteId
                },
                new Produto
                {
                    Nome = "Veggie Burger",
                    Descricao = "Hambúrguer de grão de bico, queijo, alface e maionese vegana",
                    Preco = 29.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[1].RestauranteId
                },
                new Produto
                {
                    Nome = "Batata Frita Grande",
                    Descricao = "Porção generosa de batatas fritas crocantes",
                    Preco = 18.90m,
                    Categoria = "Entrada",
                    ImagemUrl = "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[1].RestauranteId
                },

                // Sushi House
                new Produto
                {
                    Nome = "Combinado 20 Peças",
                    Descricao = "10 sushis variados e 10 sashimis de salmão e atum",
                    Preco = 58.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[2].RestauranteId
                },
                new Produto
                {
                    Nome = "Hot Roll Filadélfia",
                    Descricao = "8 peças empanadas com salmão e cream cheese",
                    Preco = 42.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[2].RestauranteId
                },
                new Produto
                {
                    Nome = "Temaki de Salmão",
                    Descricao = "Cone de alga com salmão fresco, arroz e cream cheese",
                    Preco = 24.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[2].RestauranteId
                },
                new Produto
                {
                    Nome = "Gyoza (6 unidades)",
                    Descricao = "Pastelzinho japonês frito recheado com carne e legumes",
                    Preco = 22.90m,
                    Categoria = "Entrada",
                    ImagemUrl = "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[2].RestauranteId
                },

                // Pasta & Vino
                new Produto
                {
                    Nome = "Spaghetti Carbonara",
                    Descricao = "Massa fresca com molho carbonara, bacon e parmesão",
                    Preco = 38.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[3].RestauranteId
                },
                new Produto
                {
                    Nome = "Fettuccine Alfredo",
                    Descricao = "Fettuccine ao molho branco com parmesão e nata",
                    Preco = 36.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[3].RestauranteId
                },
                new Produto
                {
                    Nome = "Lasanha Bolonhesa",
                    Descricao = "Camadas de massa, molho bolonhesa e queijo gratinado",
                    Preco = 42.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[3].RestauranteId
                },
                new Produto
                {
                    Nome = "Tiramisu",
                    Descricao = "Sobremesa italiana com café, mascarpone e cacau",
                    Preco = 18.90m,
                    Categoria = "Sobremesa",
                    ImagemUrl = "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[3].RestauranteId
                },

                // Taco Loco
                new Produto
                {
                    Nome = "Tacos de Carne (3 unid.)",
                    Descricao = "Tortilhas com carne moída temperada, queijo e guacamole",
                    Preco = 28.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[4].RestauranteId
                },
                new Produto
                {
                    Nome = "Burrito Completo",
                    Descricao = "Tortilha grande recheada com arroz, feijão, carne e queijo",
                    Preco = 32.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[4].RestauranteId
                },
                new Produto
                {
                    Nome = "Nachos com Queijo",
                    Descricao = "Porção de nachos crocantes com queijo cheddar derretido",
                    Preco = 24.90m,
                    Categoria = "Entrada",
                    ImagemUrl = "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[4].RestauranteId
                },
                new Produto
                {
                    Nome = "Quesadilla",
                    Descricao = "Tortilha dobrada grelhada com queijo e frango",
                    Preco = 26.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[4].RestauranteId
                },

                // Veggie Delight
                new Produto
                {
                    Nome = "Bowl Vegano",
                    Descricao = "Quinoa, grão de bico, abacate, tomate e molho tahine",
                    Preco = 32.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[5].RestauranteId
                },
                new Produto
                {
                    Nome = "Burger de Lentilha",
                    Descricao = "Hambúrguer vegetal de lentilha com salada e molho especial",
                    Preco = 28.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1585238341710-4a50cd97cbe5?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[5].RestauranteId
                },
                new Produto
                {
                    Nome = "Salada Completa",
                    Descricao = "Mix de folhas, tomate seco, nozes e molho balsâmico",
                    Preco = 24.90m,
                    Categoria = "Entrada",
                    ImagemUrl = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[5].RestauranteId
                },
                new Produto
                {
                    Nome = "Smoothie Detox",
                    Descricao = "Couve, abacaxi, gengibre e limão",
                    Preco = 15.90m,
                    Categoria = "Bebida",
                    ImagemUrl = "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[5].RestauranteId
                },

                // Churrascaria Gaúcha
                new Produto
                {
                    Nome = "Rodízio Completo",
                    Descricao = "Carnes nobres à vontade + buffet completo com saladas e acompanhamentos",
                    Preco = 79.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[6].RestauranteId
                },
                new Produto
                {
                    Nome = "Picanha na Tábua (500g)",
                    Descricao = "Picanha grelhada no ponto com alho e farofa",
                    Preco = 89.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[6].RestauranteId
                },
                new Produto
                {
                    Nome = "Costela Assada",
                    Descricao = "Costela bovina assada lentamente ao molho barbecue",
                    Preco = 72.90m,
                    Categoria = "Principal",
                    ImagemUrl = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[6].RestauranteId
                },

                // Açaí na Tigela
                new Produto
                {
                    Nome = "Açaí 500ml",
                    Descricao = "Açaí cremoso com 3 complementos à escolha",
                    Preco = 22.90m,
                    Categoria = "Sobremesa",
                    ImagemUrl = "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[7].RestauranteId
                },
                new Produto
                {
                    Nome = "Açaí 300ml",
                    Descricao = "Açaí cremoso com 2 complementos à escolha",
                    Preco = 16.90m,
                    Categoria = "Sobremesa",
                    ImagemUrl = "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[7].RestauranteId
                },
                new Produto
                {
                    Nome = "Vitamina de Frutas",
                    Descricao = "Vitamina com leite, frutas da estação e aveia",
                    Preco = 14.90m,
                    Categoria = "Bebida",
                    ImagemUrl = "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[7].RestauranteId
                },
                new Produto
                {
                    Nome = "Suco Natural 500ml",
                    Descricao = "Laranja, limão, morango ou melancia",
                    Preco = 12.90m,
                    Categoria = "Bebida",
                    ImagemUrl = "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=200&fit=crop",
                    Disponivel = true,
                    RestauranteId = restaurantes[7].RestauranteId
                }
            };

            await _context.Produtos.AddRangeAsync(produtos);
            await _context.SaveChangesAsync();

            // ========== CLIENTES ==========
            var clientes = new List<Cliente>
            {
                new Cliente
                {
                    Nome = "João da Silva",
                    Email = "joao.silva@email.com",
                    SenhaHash = "hash_placeholder_123",
                    Telefone = "(11) 98765-4321"
                },
                new Cliente
                {
                    Nome = "Maria Santos",
                    Email = "maria.santos@email.com",
                    SenhaHash = "hash_placeholder_456",
                    Telefone = "(11) 97654-3210"
                },
                new Cliente
                {
                    Nome = "Pedro Oliveira",
                    Email = "pedro.oliveira@email.com",
                    SenhaHash = "hash_placeholder_789",
                    Telefone = "(11) 96543-2109"
                }
            };

            await _context.Clientes.AddRangeAsync(clientes);
            await _context.SaveChangesAsync();

            // ========== ENTREGADORES ==========
            var entregadores = new List<Entregador>
            {
                new Entregador
                {
                    Nome = "Carlos Pereira",
                    CPF = "123.456.789-00",
                    Telefone = "(11) 99876-5432",
                    Veiculo = "Moto",
                    Disponivel = true
                },
                new Entregador
                {
                    Nome = "Ana Costa",
                    CPF = "987.654.321-00",
                    Telefone = "(11) 98765-4321",
                    Veiculo = "Bicicleta",
                    Disponivel = true
                },
                new Entregador
                {
                    Nome = "Roberto Lima",
                    CPF = "456.789.123-00",
                    Telefone = "(11) 97654-3210",
                    Veiculo = "Carro",
                    Disponivel = false
                }
            };

            await _context.Entregadores.AddRangeAsync(entregadores);
            await _context.SaveChangesAsync();

            Console.WriteLine("✅ Banco de dados populado com sucesso!");
        }
    }
}
