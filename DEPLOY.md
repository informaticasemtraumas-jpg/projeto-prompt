# Publicação da Landing Page — Ateliê Viva Arte

Este guia explica o próximo passo para colocar o site no ar e deixá-lo visível para clientes.

## Recomendação rápida

Para este projeto (HTML/CSS/JS estático), a melhor opção é **GitHub Pages**.

- ✅ Simples de configurar.
- ✅ Gratuito.
- ✅ Bom para site institucional/landing page.
- ✅ Você pode conectar domínio próprio depois.

> **Supabase não é a melhor escolha para hospedar landing page estática.**
> Supabase é excelente para banco de dados, autenticação e backend, mas não é a opção mais direta para publicar um site simples como este.

---

## O que já está pronto neste repositório

- Workflow de deploy automático em `.github/workflows/deploy-pages.yml`.
- Arquivo `.nojekyll` para evitar processamento desnecessário do GitHub Pages.

Com isso, basta conectar o repositório ao GitHub e habilitar Pages por **GitHub Actions**.

---

## Opção recomendada: GitHub Pages (passo a passo)

### 1) Criar repositório no GitHub

1. Entre no GitHub e clique em **New repository**.
2. Nome sugerido: `atelie-viva-arte-site`.
3. Crie o repositório.

### 2) Subir os arquivos do site

No seu computador, dentro da pasta do projeto:

```bash
git remote add origin https://github.com/SEU_USUARIO/atelie-viva-arte-site.git
git push -u origin work:main
```

### 3) Ativar GitHub Pages por Actions

1. No repositório, vá em **Settings → Pages**.
2. Em **Build and deployment**, escolha:
   - **Source**: `GitHub Actions`
3. Pronto — o workflow `Deploy static site to GitHub Pages` fará o deploy automático.

### 4) Link do site publicado

Após a action finalizar, o GitHub vai gerar uma URL como:

`https://SEU_USUARIO.github.io/atelie-viva-arte-site/`

Esse link já pode ser enviado para clientes e colocado na bio do Instagram.

---

## Domínio próprio (opcional, recomendado para mais confiança)

Exemplo: `www.atelievivaarte.com.br`

1. Compre o domínio (Registro.br, GoDaddy etc.).
2. Em **Settings → Pages**, adicione o domínio em **Custom domain**.
3. Configure DNS no provedor do domínio conforme instruções do GitHub.
4. Ative HTTPS.

---

## Checklist final antes de divulgar

- [ ] Testar o site no celular (links, layout e botão WhatsApp).
- [ ] Confirmar número do WhatsApp e Instagram.
- [ ] Colocar o link na bio do Instagram.
- [ ] Salvar um destaque no Instagram com “Como pedir orçamento”.
- [ ] Criar mensagem padrão de atendimento no WhatsApp.

---

## Alternativas além do GitHub Pages

Se quiser algo mais profissional no futuro com formulário, analytics e pré-visualização automática:

- **Vercel** (muito fácil)
- **Netlify** (muito fácil)

Ambos costumam ser mais completos para marketing do que Supabase quando o objetivo é só página institucional.
