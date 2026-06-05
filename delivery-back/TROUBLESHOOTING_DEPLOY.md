# 🐛 Troubleshooting - Deploy Render

## ❌ Erro: "Exited with status 139" (Segmentation Fault)

### Causas Comuns:
1. **Falta de memória** - Instância Free tem apenas 512 MB
2. **DatabaseSeeder** consumindo muita memória no startup
3. **Migrations** rodando automaticamente

---

## ✅ Correções Aplicadas

### 1. **AutoMapper Atualizado**
- ❌ Versão 13.0.1 (vulnerabilidade)
- ✅ Versão 14.0.0 (segura)

### 2. **DatabaseSeeder Desabilitado no Startup**
O seed automático foi **comentado** para economizar memória.

---

## 🔧 Como Popular o Banco Manualmente

### **Opção 1: Via Render Shell (Recomendado)**

1. No dashboard do Render, vá em **"Shell"** (menu lateral)
2. Execute:

```bash
# Ir para diretório da aplicação
cd /app

# Rodar migrations
dotnet ef database update

# Popular banco com dados de teste (se quiser)
# Nota: Você precisará criar um comando separado para isso
```

### **Opção 2: Via Connection String Local**

No seu computador:

```bash
# 1. Configurar connection string do Render
export DATABASE_URL="postgresql://user:pass@host.render.com/database"

# 2. Rodar migrations
cd delivery-back
dotnet ef database update

# 3. Popular banco (temporariamente habilite o seed no Program.cs)
dotnet run
```

---

## 🚀 Próximos Passos

### 1. **Fazer Push das Correções**

```bash
git add .
git commit -m "fix: atualiza AutoMapper e remove seed automático"
git push
```

### 2. **Aguardar Novo Deploy**

O Render vai fazer deploy automático. Agora deve funcionar!

### 3. **Verificar se Subiu**

Acesse:
```
https://go-delivery.onrender.com/swagger
```

---

## 📊 Monitorar Deploy

### **Logs em Tempo Real**
No dashboard do Render:
- Clique em **"Logs"**
- Veja se aparece: `"Now listening on: http://0.0.0.0:8080"`

### **Se Ainda Crashar**

Verifique:
1. Variável `DATABASE_URL` está correta?
2. Connection string tem `?sslmode=require` no final?
3. Banco PostgreSQL do Neon está acessível?

---

## 💡 Alternativa: Usar Starter Plan ($7/mês)

Se continuar crashando por falta de memória:
- **Starter** = 512 MB RAM + 0.5 CPU (mais estável)
- **Free** = 512 MB RAM + 0.1 CPU (muito limitado)

O problema é que .NET 10 + EF Core + AutoMapper consomem bastante memória.

---

## 🔍 Debug Avançado

Se precisar investigar mais, adicione logs no `Program.cs`:

```csharp
var app = builder.Build();

Console.WriteLine("✅ App builder criado");
Console.WriteLine($"🔌 DATABASE_URL configurado: {!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("DATABASE_URL"))}");

app.UseSwagger();
Console.WriteLine("✅ Swagger configurado");

app.UseHttpsRedirection();
app.UseCors("AllowAll");
Console.WriteLine("✅ CORS configurado");

app.UseAuthorization();
app.MapControllers();
Console.WriteLine("✅ Controllers mapeados");

Console.WriteLine("🚀 Iniciando aplicação...");
app.Run();
```

---

**Faça push das correções e teste novamente! 🚀**
