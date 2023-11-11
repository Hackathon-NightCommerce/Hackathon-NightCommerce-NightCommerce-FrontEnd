# Introdução
# Bem-vindo à Web Custons: Sua Plataforma de Compra e Venda de Carros
Web Customs é o seu destino online definitivo para todas as suas necessidades de compra e venda de carros. Estamos comprometidos em tornar a busca pelo carro dos seus sonhos ou a venda do seu veículo uma experiência simples e conveniente.

# Nossa Missão
Na Web Customs, nossa missão é proporcionar uma plataforma segura e eficiente, onde compradores e vendedores de automóveis possam se conectar com confiança. Oferecemos uma ampla gama de recursos e ferramentas para tornar a sua experiência de compra ou venda de carros incrivelmente tranquila. Aproveite os seguintes recursos que oferecemos:

1. **Compra de Carros**
   - Explore nossa vasta seleção de carros novos e usados, provenientes de vendedores confiáveis.
   - Utilize nossa ferramenta de filtragem avançada para encontrar carros que atendam às suas preferências, incluindo marca, modelo, ano, preço e muito mais.

2. **Venda de Carros**
   - Se você está pensando em vender seu veículo, simplificamos o processo.
   - Crie anúncios atraentes com fotos de alta qualidade e descrições detalhadas para atrair compradores em potencial.



A Web Customs é a escolha número 1 para entusiastas de carros e compradores/vendedores de automóveis por várias razões:

Variedade de Veículos: Nossa plataforma abrange uma ampla variedade de marcas, modelos e tipos de veículos, garantindo que você encontre exatamente o que procura.

Facilidade de Uso: Projetamos nosso site para ser intuitivo e fácil de usar, para que você possa encontrar o carro ideal sem complicações.

# Tecnologias e Bibliotecas utilizadas

No Front End: 
- React.

- Bibliotecas: Chakra, Axios, React-Hook-Form, React-Icons, Styled-Components, Yup, Zod.

No Back End:
- Express.

- Bibliotecas: Bcryptjs, Cors, Dotenv, Express-Async-Errors, JsonWebToken, NodeMailer, Pg, Swagger-Jsdoc, TypeOrm, Zod.
- Banco de dados: PostgreSQL

# Principais Funcionalidades

###  Filtragem Avançada
Uma das principais características da Web Customs é o nosso sistema de filtragem avançada. Este recurso permite que você faça pesquisas precisas e encontre o carro dos seus sonhos com facilidade. Você pode acessar essa funcionalidade diretamente na página inicial.

Opções de Filtragem
Nossa plataforma oferece diversas opções de filtragem para refinar sua busca:

- Marca: Selecione a marca do carro que você deseja.
- Modelo: Escolha um modelo específico que atenda às suas preferências.
- Ano: Defina o ano do carro que você está procurando.
- Cor: Escolha uma cor que corresponda ao seu gosto.
- Preço: Escolha um preço que corresponda ao seu gosto e bolso.
- Quilometragem: Escolha uma quilometragem que corresponda ao seu gosto.

Resultados em Tempo Real
À medida que você seleciona suas preferências de filtragem, nosso sistema atualiza instantaneamente os resultados, exibindo apenas os carros que correspondem aos seus critérios. Isso permite que você encontre exatamente o que está procurando sem ter que passar por uma lista interminável de opções.


### Criação de Anúncios
A Web Customs torna simples e direto o processo de criar anúncios para vender seu carro. Se você está pensando em vender seu veículo.

Ao criar seu anúncio, forneça o máximo de detalhes possível sobre o seu carro. Isso inclui:

- Marca e Modelo: Selecione a marca e o modelo do seu veículo.
- Ano: Informe o ano de fabricação do carro.
- Combustível: Escolha o tipo de combustível do veículo.
- Quilometragem: Indique a quilometragem atual do carro.
- Cor: Escolha a cor do veículo.
- Preço: Defina o valor que você deseja vender o carro.
- Descrição: Adicione uma descrição detalhada do seu veículo.
- Imagens: Escolha sempre as melhores fotos de alta qualidade do seu carro, para atrait possiveis compradores.

Depois de publicar seu anúncio, ele estará disponível para compradores em potencial. Você pode acessar os seus anuncios a qualquer momento para gerenciar, editar ou remover seus anúncios, de uma maneira rapida e simples.

### Sistema de Comentários
A Web Customs apresenta um sistema de comentários robusto que permite que usuários interajam e compartilhem informações sobre os anúncios. Comentários são uma ótima maneira de tirar dúvidas, fazer perguntas aos vendedores e compartilhar suas opiniões sobre um veículo, para fazer um comentario basta acessar qualquer pagina individual de um anuncio.

#### Diretrizes de Comentários
Para manter um ambiente respeitoso e informativo, pedimos que siga estas diretrizes ao comentar:

- Mantenha o respeito: Não faça comentários ofensivos, discriminatórios ou inadequados.
- Seja construtivo: Compartilhe informações úteis e relevantes sobre o anúncio ou faça perguntas pertinentes.
- Evite spam: Não faça comentários repetitivos ou promocionais.
- Respeite a privacidade: Não compartilhe informações pessoais nos comentários.

Caso o seu comentario não siga essa regras, a Web Custons excluirá o seu comentario sem aviso.

Acreditamos que o sistema de comentários enriquece a experiência de compra e venda de carros na Web Customs. Use-o de maneira responsável para obter o máximo benefício.

# Instalação do Projeto

## Requisitos Prévios

Certifique-se de que você tenha as seguintes ferramentas instaladas em sua máquina:

- **Node.js**: [Baixe e instale o Node.js](https://nodejs.org/).

- **Git**: [Baixe e instale o Git](https://git-scm.com/).

- **PostgreSQL**: [Baixe e instale o PostgreSQL](https://www.postgresql.org/).

## Instalação do Projeto (back)

Siga estas etapas para configurar e executar o projeto em sua máquina local, começaremos pelo back end:

### Clone do Repositório

1. Faça o clone do repositório para sua máquina local:

   ```bash
   git clone https://github.com/seu-usuario/seu-projeto.git
# Configuração do Projeto

2. Abra o terminal na pasta raiz do projeto e digite o seguinte comando para abrir o Visual Studio Code (ou seu editor de código preferido):

   ```bash
   code . 
3. Depois faça a instalação da depedencias utilizados o comando no terminal:

   ```bash
    npm install    
4. No Visual Studio Code, na pasta raiz do projeto, você encontrará um arquivo chamado .env.example. Crie um novo arquivo chamado .env na mesma pasta e defina as variáveis de ambiente com os valores adequados, com base nos exemplos do .env.example. Aqui estão algumas variáveis de exemplo:

   ```bash
    DATABASE_URL="postgres://user:password@host:port/db"
    SECRET_KEY=suaChaveSecreta
    SMTP_USER=seuEmailHost
    SMTP_PASS=senhaDoEmailHost

A variavel DATABASE URL, precisa esta de acordo com as informações do banco de dados que voce precisa criar antes das migrações. A variavel SMTP_USER precisa esta com a verificação de 2 etapas.

5. No terminal, execute o seguinte comando para aplicar as migrações do banco de dados:

   ```bash
   npm run typeorm migration:run -- -d src/data-source

6. Finalmente, para iniciar o projeto executando o seguinte comando:

   ```bash
   npm run dev
Deixa esse terminal aberto rodando. o Back end esta rodando no http://localhost:3000
## Instalação do Projeto (Front)

1. Faça o clone do repositório para sua máquina local:

   ```bash
   git clone https://github.com/seu-usuario/seu-projeto.git

2. Depois abra o terminal da pasta raiz e  faça a instalação da depedencias utilizados o comando no terminal:

   ```bash
    npm install
3. Finalmente, para iniciar o projeto executando o seguinte comando:

   ```bash
   npm run dev
Deixa esse terminal aberto rodando. o Front end esta rodando no http://localhost:5173, copia cola esse link para o seu navegador para desfrutar do nosso site ( não esqueça de deixar os terminais do front e back rodando juntos ).

# Agradecimentos aos Desenvolvedores
O Web Customs é resultado do trabalho duro, colaboração e esforço de muitos desenvolvedores talentosos. Gostaríamos de estender nossos sinceros agradecimentos a todos os que contribuíram para este projeto, seja através de código, feedback ou suporte.

Queremos reconhecer especialmente os seguintes desenvolvedores que desempenharam um papel importante no desenvolvimento deste projeto:

[Natã fernandes](https://github.com/Natangaf)<br>
[Mateus Carius](https://github.com/MattCari)<br>
[Matheus Gualtieri](https://github.com/MatheusGualtieri)<br>
[Matheus Ferreira](https://github.com/MatheusFerreira33)<br>
[Christian Vada](https://github.com/ChristianVada)<br>
[Bruno Henrique](https://github.com/Brunohgs21)<br>
[Bruno Nunes](https://github.com/Bruno-Nuness)<br>

## Licença
Este projeto é licenciado pela Web Custons LDTA e pela apoiadora Kenzie Academy
