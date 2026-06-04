using Microsoft.EntityFrameworkCore;
using delivery_back.Models;

namespace delivery_back.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Restaurante> Restaurantes { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Endereco> Enderecos { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<ItemPedido> ItensPedido { get; set; }
        public DbSet<Entregador> Entregadores { get; set; }
        public DbSet<Pagamento> Pagamentos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Índice único para Email do Cliente
            modelBuilder.Entity<Cliente>()
                .HasIndex(c => c.Email)
                .IsUnique();

            // Índice único para CPF do Entregador
            modelBuilder.Entity<Entregador>()
                .HasIndex(e => e.CPF)
                .IsUnique();

            // Índice único para PedidoId do Pagamento (relação 1:1)
            modelBuilder.Entity<Pagamento>()
                .HasIndex(p => p.PedidoId)
                .IsUnique();
        }
    }
}
