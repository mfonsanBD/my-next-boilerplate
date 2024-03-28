<p align="center">
  <a href="https://nextjs.org/">
    <img width="40%" src="https://static-00.iconduck.com/assets.00/nextjs-icon-2048x1234-pqycciiu.png">
  </a>
  BOILERPLATE
</p>

## Inicialização

Primeiro, rode o código abaixo para instalar os pacotes do projeto:

```bash
npm install
# or
yarn add
# or
pnpm install
```

## Prisma 💾

- Crie sua conta e seu projeto no [supabase](https://supabase.com/) para ter um banco de dados PostgresQL
- Abra o projeto, vá em: Project Settings > Database Settings
- Copie a Connection String e cole em DATABASE_URL no arquivo .env
- Envie suas tabelas criadas em schema.prisma automaticamente para o seu banco de dados
- Acompanhe os dados do seu banco em uma interface do Prisma

Obs.: Caso dê algum erro na conexão do prisma com o banco de dados use a Connection string da seguinte maneira: postgres://[YOUR-USER]:[YOUR-PASSWORD]@[YOUR-HOST].supabase.com

```bash
# Exemplo
DATABASE_URL=postgres://[YOUR-USER]:[YOUR-PASSWORD]@[YOUR-HOST].supabase.com

# Crie a primeira migration para enviar suas tabelas para o banco de dados
# Troque migration_name pelo nome de sua preferência
npx prisma migrate dev --name migration_name

# Rode o código abaixo para garantir o os types mais recentes do seu banco
npx prisma generate

# Rode o código abaixo para abrir o banco de dados com o Prisma
npx prisma studio
```

## Next-Auth 🔐

Aqui você precisa inserir um token ao NEXTAUTH_SECRET no arquivo .env para gerar a autorização e receber os dados do usuário.

Para gerar o secret token faça o seguinte:

```bash
# Gerar pelo Powershell
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("minha_senha_secreta"))

# Gerar pelo Ubuntu ou MacOS
echo -n "minha_senha_secreta" | base64

# Exemplo
NEXTAUTH_SECRET=[TOKEN]
```

[Gerar Secret Token na Internet](https://generate-secret.vercel.app/32)

## Plop 🔧

O plop é uma ferramenta que automatiza a criação de componentes/páginas a partir de modelos definidos, verifique na pasta "generators/templates".

```bash
# Exemplo de como criar rapidamente um componente padrão (componente - story - teste)
yarn generate:component NomeDoComponente

# Exemplo de como criar rapidamente uma página
yarn generate:template NomeDaPágina
```

## Storybook 🎨
Biblioteca boa para design/documentação dos componentes criados no projeto.

```bash
# Para visualizar os stories criados
yarn storybook
```

## Commit Lint 💬

O CommitLint serve para verificar se a mensagem de commit que escrevemos realmente está dentro dos padrões pré-definidos pela Conventional Commits

```bash
# padrão de commit
[plataforma] - [tipo]: mensagem
```

##### Plataformas:
- Development
- Cloud
- QA

##### Tipos:
- build
- chore
- ci
- docs
- feature
- bugfix
- perf
- refactor
- revert
- style
- test
- translation
- security