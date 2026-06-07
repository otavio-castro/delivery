using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace delivery_back.Migrations
{
    /// <inheritdoc />
    public partial class AddIsAdminAndSync : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1. A alteração desejada: Adiciona a coluna IsAdmin na tabela Clientes
            migrationBuilder.AddColumn<bool>(
                name: "IsAdmin",
                table: "Clientes",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            // 2. Criação de índices (Se o banco reclamar que já existem, pode apagar estas linhas)
            migrationBuilder.CreateIndex(
                name: "IX_Entregadores_CPF",
                table: "Entregadores",
                column: "CPF",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Clientes_Email",
                table: "Clientes",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Entregadores_CPF",
                table: "Entregadores");

            migrationBuilder.DropIndex(
                name: "IX_Clientes_Email",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "IsAdmin",
                table: "Clientes");
        }
    }
}