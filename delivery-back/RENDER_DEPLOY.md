# 🚀 Deploy GoDelivery Backend no Render

## 📋 Pré-requisitos

1. Conta no [Render](https://render.com)
2. Repositório GitHub com o código
3. Banco de dados PostgreSQL (Neon ou Render PostgreSQL)

## 🗄️ Passo 1: Criar Banco de dados PostgreSQL no Render

1. Acesse https://dashboard.render.com
2. Clique em **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `godelivery-db`
   - **Database**: `godelivery`
   - **User**: (gerado automaticamente)
   - **Region**: escolha a mais próxima (sugestão: Oregon/São Paulo)
   - **Plan**: Free
4. Clique em **"Create Database"**
5. **Copie a "Internal Database URL"** (será usada no próximo passo)

> 💡 **Dica**: Use a "Internal Database URL" para conexões mais rápidas entre serviços do Render.

## 🐳 Passo 2: Criar Web Service

1. No dashboard do Render, clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório GitHub
3. Configure:
   - **Name**: `godelivery-api`
   - **Region**: mesma do banco de dados
   - **Branch**: `main` (ou sua branch principal)
   - **Root Directory**: `delivery-back`
   - **Runtime**: **Docker**
   - **Plan**: Free

## 🔧 Passo 3: Configurar Variáveis de Ambiente

Na seção **"Environment Variables"**, adicione:

| Key | Value | Descrição |
|-----|-------|-----------|
| `DATABASE_URL` | `<Cole a Internal Database URL>` | Connection string do PostgreSQL (formato URL) |
| `ASPNETCORE_ENVIRONMENT` | `Production` | Ambiente de execução |

**Exemplo de DATABASE_URL**:
```
postgresql://user:password@dpg-xxxxx-a.oregon-postgres.render.com/godelivery
```

> ✅ **Novo**: O sistema agora **converte automaticamente** o formato URL do PostgreSQL (`postgresql://...`) para o formato que o Npgsql entende!
>
> ⚠️ **Importante**: Não compartilhe suas credenciais de banco de dados!
> 
> 💡 **CORS**: O backend está configurado para aceitar requisições de qualquer origem (AllowAnyOrigin). Para produção, considere restringir isso por segurança.

## 🚀 Passo 4: Deploy

1. Clique em **"Create Web Service"**
2. O Render irá:
   - Clonar o repositório
   - Construir a imagem Docker usando o `Dockerfile`
   - Executar o container na porta 8080
   - Iniciar o serviço

3. Aguarde o build completar (5-10 minutos na primeira vez)

4. Acesse a URL fornecida (ex: `https://godelivery-api.onrender.com`)

## 🔍 Passo 5: Executar Migrations

### Opção 1: Via Render Shell (Recomendado)

1. No dashboard do seu serviço, vá em **"Shell"** (menu lateral)
2. Execute:
```bash
cd /app
dotnet ef database update
```

### Opção 2: Localmente (aponta para o banco do Render)

1. Copie a `External Database URL` do banco PostgreSQL
2. No seu terminal local:
```bash
cd delivery-back/delivery-back
export DATABASE_URL="<External Database URL>"
dotnet ef database update
```

## ✅ Passo 6: Testar a API

Teste os endpoints principais:

```bash
# Health check (se configurado)
curl https://godelivery-api.onrender.com/

# Listar restaurantes
curl https://godelivery-api.onrender.com/api/restaurantes

# Listar produtos
curl https://godelivery-api.onrender.com/api/produtos
```

Ou acesse o Swagger (se habilitado em produção):
```
https://godelivery-api.onrender.com/swagger
```

## 🔄 Auto-Deploy

O Render faz deploy automático quando você faz push para a branch configurada!

Para desabilitar:
1. Vá em **"Settings"** do serviço
2. Desmarque **"Auto-Deploy"**

## 📊 Monitoramento

No dashboard do Render você pode:
- Ver logs em tempo real
- Monitorar uso de recursos
- Ver histórico de deploys
- Configurar alertas

## 💰 Plano Free - Limitações

- ⏸️ Serviço "hiberna" após **15 minutos** de inatividade
- 🐌 Primeira requisição após hibernar demora ~30-60 segundos ("cold start")
- ⏱️ **750 horas/mês** gratuitas (suficiente para 1 serviço 24/7)
- 💾 Banco de dados free tem **1 GB** de armazenamento
- 📅 Banco free é deletado após **90 dias** de inatividade

### Upgrade para Plano Pago
Para produção real, considere:
- **Web Service**: $7/mês (sem hibernação)
- **PostgreSQL**: $7/mês (100 GB, sem deleção)

## 🛠️ Troubleshooting

### ❌ Erro: "Connection refused"
**Solução**: Verifique se a `DATABASE_URL` está correta. Use a "Internal Database URL".

### ❌ Migrations não executam
**Solução**: Execute manualmente via Shell do Render ou localmente apontando para o banco do Render.

### ❌ Erro 502 Bad Gateway
**Soluções**:
- Verifique os logs do serviço
- Certifique-se que a porta 8080 está exposta
- Verifique se o `ENTRYPOINT` do Dockerfile está correto

### ❌ Build falha no Render
**Soluções**:
- Verifique se o caminho `Root Directory` está correto (`delivery-back`)
- Certifique-se que o `Dockerfile` está na raiz do `delivery-back`
- Confira os logs de build para erros específicos

### 🐌 API muito lenta (cold start)
**Explicação**: No plano free, o serviço hiberna após 15 minutos. O primeiro acesso "acorda" o serviço.

**Soluções**:
- Upgrade para plano pago ($7/mês)
- Configure um "keep-alive" (ping a cada 10 minutos)
- Aceite o cold start como limitação do free tier

## 🔐 Segurança

### Boas práticas:
- ✅ Nunca commite credenciais no código
- ✅ Use variáveis de ambiente para secrets
- ✅ Mantenha `ASPNETCORE_ENVIRONMENT=Production` no Render
- ✅ Configure CORS apenas para domínios confiáveis
- ✅ Ative HTTPS (Render fornece SSL grátis)

## 📚 Próximos Passos

1. ✅ Deploy do backend no Render
2. 🎨 Deploy do frontend no Vercel/Netlify
3. 🔗 Configurar URL do backend no frontend
4. 🧪 Testar integração completa
5. 📊 Configurar monitoramento (opcional)

---

## 🆘 Suporte

- [Documentação do Render](https://render.com/docs)
- [Render Community](https://community.render.com)
- [.NET Docker Docs](https://docs.microsoft.com/dotnet/core/docker/)

---

**🎉 Backend GoDelivery deployado com sucesso no Render!**

Desenvolvido com ❤️ para o projeto GoDelivery
