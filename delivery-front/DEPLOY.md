# 🚀 Deploy GoDelivery Frontend

## 📋 Opções de Hospedagem

### ✅ **Recomendado: Vercel** (Gratuito + CDN Global)
### 🔸 Alternativa: Netlify (Gratuito + CDN)
### 🔸 Alternativa: Render Static Site (Gratuito, sem CDN)

---

## 🎯 Deploy na Vercel (RECOMENDADO)

### **Passo 1: Criar Conta**

1. Acesse https://vercel.com
2. Clique em **"Sign Up"**
3. Faça login com GitHub

### **Passo 2: Importar Projeto**

1. No dashboard da Vercel, clique em **"Add New..."** → **"Project"**
2. Selecione o repositório `delivery`
3. Configure:

```
Framework Preset: Vite
Root Directory: delivery-front
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### **Passo 3: Configurar Variável de Ambiente**

Na seção **"Environment Variables"**, adicione:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://godelivery-api.onrender.com` |

### **Passo 4: Deploy!**

1. Clique em **"Deploy"**
2. Aguarde 2-3 minutos
3. Acesse a URL gerada (ex: `https://godelivery-abc123.vercel.app`)

### **Passo 5: Configurar Domínio Personalizado (Opcional)**

1. Vá em **Settings** → **Domains**
2. Adicione seu domínio customizado

---

## 🔸 Alternativa: Deploy no Render (Static Site)

### **Passo 1: Criar Static Site**

1. No dashboard do Render, clique em **"New +"** → **"Static Site"**
2. Conecte o repositório GitHub

### **Passo 2: Configurar**

```
Name: godelivery-front
Branch: main
Root Directory: delivery-front
Build Command: npm install && npm run build
Publish Directory: dist
```

### **Passo 3: Variáveis de Ambiente**

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://godelivery-api.onrender.com` |

### **Passo 4: Deploy**

1. Clique em **"Create Static Site"**
2. Aguarde o build
3. Acesse a URL (ex: `https://godelivery-front.onrender.com`)

---

## 🔸 Alternativa: Deploy na Netlify

### **Passo 1: Criar Conta**

1. Acesse https://netlify.com
2. Login com GitHub

### **Passo 2: Importar Projeto**

1. Clique em **"Add new site"** → **"Import an existing project"**
2. Selecione o repositório

### **Passo 3: Configurar**

```
Base directory: delivery-front
Build command: npm run build
Publish directory: dist
```

### **Passo 4: Variáveis de Ambiente**

Em **Site settings** → **Environment variables**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://godelivery-api.onrender.com` |

### **Passo 5: Deploy**

1. Clique em **"Deploy site"**
2. Aguarde o build
3. Acesse a URL (ex: `https://godelivery-abc123.netlify.app`)

---

## 🔧 Configurações Locais vs Produção

### **Desenvolvimento** (`.env.development`)
```
VITE_API_URL=https://localhost:7007
```

### **Produção** (`.env.production`)
```
VITE_API_URL=https://godelivery-api.onrender.com
```

O Vite automaticamente carrega o arquivo correto baseado no modo:
- `npm run dev` → usa `.env.development`
- `npm run build` → usa `.env.production`

---

## ✅ Checklist de Deploy

- [ ] Arquivo `.env.production` criado com `VITE_API_URL`
- [ ] Arquivo `vercel.json` configurado
- [ ] `src/config/api.ts` usa `import.meta.env.VITE_API_URL`
- [ ] Commit e push das alterações
- [ ] Deploy realizado
- [ ] Variável de ambiente configurada na plataforma
- [ ] Teste da aplicação em produção

---

## 🧪 Testar Produção

Após o deploy, acesse:
```
https://SEU-DOMINIO.vercel.app
```

E teste:
1. ✅ Listagem de restaurantes
2. ✅ Produtos por restaurante
3. ✅ Adicionar ao carrinho
4. ✅ Checkout
5. ✅ Admin (se habilitado)

---

## 🚨 Troubleshooting

### **Erro: "Failed to fetch"**
- ✅ Verifique se `VITE_API_URL` está configurada
- ✅ Verifique se backend está rodando
- ✅ Verifique CORS no backend (deve permitir origem do frontend)

### **Erro: "404 on refresh"**
- ✅ Adicione rewrite rules no `vercel.json` (já configurado)

### **Erro: "Environment variable undefined"**
- ✅ Variáveis devem começar com `VITE_`
- ✅ Rebuild após adicionar variável

---

## 📊 Comparação de Plataformas

| Feature | Vercel | Netlify | Render |
|---------|--------|---------|--------|
| **Preço** | Gratuito | Gratuito | Gratuito |
| **CDN Global** | ✅ | ✅ | ❌ |
| **Build Time** | ~2 min | ~2 min | ~3 min |
| **Auto Deploy** | ✅ | ✅ | ✅ |
| **Custom Domain** | ✅ | ✅ | ✅ |
| **Edge Functions** | ✅ | ✅ | ❌ |
| **Especialidade** | React/Next | Jamstack | Full-Stack |

**Recomendação**: **Vercel** para melhor performance e DX! 🚀
