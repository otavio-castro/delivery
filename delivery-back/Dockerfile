# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copiar apenas o .csproj primeiro para aproveitar cache do Docker
COPY ["delivery-back/delivery-back.csproj", "delivery-back/"]
RUN dotnet restore "delivery-back/delivery-back.csproj"

# Copiar todo o código fonte
COPY delivery-back/ delivery-back/
WORKDIR "/src/delivery-back"

# Build do projeto
RUN dotnet build "delivery-back.csproj" -c Release -o /app/build

# Stage 2: Publish
FROM build AS publish
RUN dotnet publish "delivery-back.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

# Expor porta 8080 (padrão do Render)
EXPOSE 8080

# Copiar arquivos publicados
COPY --from=publish /app/publish .

# Definir ponto de entrada
ENTRYPOINT ["dotnet", "delivery-back.dll"]
