# 🔧 Como Usar Variáveis de Ambiente Localmente

## Opção 1: Definir no Terminal (Temporário)

### Windows (PowerShell)
```powershell
$env:CONNECTION_STRING="Host=ep-spring-hill-acib81hy.sa-east-1.aws.neon.tech;Database=neondb;Username=neondb_owner;Password=SUA_SENHA;SSL Mode=Require;Trust Server Certificate=true"
dotnet run --project delivery-back
```

### Windows (CMD)
```cmd
set CONNECTION_STRING=Host=ep-spring-hill-acib81hy.sa-east-1.aws.neon.tech;Database=neondb;Username=neondb_owner;Password=SUA_SENHA;SSL Mode=Require;Trust Server Certificate=true
dotnet run --project delivery-back
```

### Linux/Mac
```bash
export CONNECTION_STRING="Host=ep-spring-hill-acib81hy.sa-east-1.aws.neon.tech;Database=neondb;Username=neondb_owner;Password=SUA_SENHA;SSL Mode=Require;Trust Server Certificate=true"
dotnet run --project delivery-back
```

## Opção 2: User Secrets (Recomendado para Desenvolvimento)

### 1. Inicializar User Secrets
```bash
cd delivery-back
dotnet user-secrets init
```

### 2. Adicionar Connection String
```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=ep-spring-hill-acib81hy.sa-east-1.aws.neon.tech;Database=neondb;Username=neondb_owner;Password=SUA_SENHA;SSL Mode=Require;Trust Server Certificate=true"
```

### 3. Rodar normalmente
```bash
dotnet run
```

## Opção 3: Arquivo appsettings.Development.json (Atual)

**Já configurado!** A connection string do banco Neon já está em:
```
delivery-back/delivery-back/appsettings.Development.json
```

## 🎯 Ordem de Prioridade

A aplicação busca a connection string nesta ordem:

1. **DATABASE_URL** (variável de ambiente - usado pelo Render)
2. **CONNECTION_STRING** (variável de ambiente - uso geral)
3. **appsettings.Development.json** → ConnectionStrings:DefaultConnection

## 🚀 Para Deploy no Render

No Render, configure apenas a variável `DATABASE_URL`:

```
DATABASE_URL=postgresql://user:password@host.render.com/database
```

A aplicação detecta automaticamente!

## 🔐 Segurança

⚠️ **NUNCA** commite senhas no Git!

- ✅ Use `appsettings.Development.json` para desenvolvimento local (já está no .gitignore)
- ✅ Use variáveis de ambiente no Render/produção
- ✅ Use User Secrets para dados sensíveis em desenvolvimento
