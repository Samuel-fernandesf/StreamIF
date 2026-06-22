# StreamIF - Catálogo Pessoal de Séries & Filmes

## Sobre o projeto
O StreamIF é um aplicativo mobile desenvolvido em React Native para organizar um catálogo pessoal de séries e filmes. O usuário pode adicionar mídias, marcar como assistidas, registrar nota, ver detalhes e excluir itens. O projeto foi feito sem backend, mantendo os dados em memória e priorizando arquitetura modular, componentes reutilizáveis e boa organização de estado.

## Estrutura do projeto
```bash
StreamIF/
├── App.js
├── components/
│   ├── MediaCard.js
│   ├── AddMediaForm.js
│   └── EmptyState.js
└── screens/
    ├── CatalogScreen.js
    └── DetailScreen.js
```

## Funcionalidades Implementadas

1. Adição de mídia em **Modal** com formulário.  
2. Listagem do catálogo com **FlatList**.  
3. Card reutilizável **MediaCard**.  
4. Tela de detalhes com **ScrollView**.  
5. Marcar e desmarcar item como assistido.  
6. Exclusão de item com atualização imutável do estado.  
7. Estado centralizado no `App.js` com fluxo de dados via **props**.  

### Bônus implementados

- Contador dinâmico de mídias  
- Ordenação A-Z e por maior nota  
- Validação no formulário  
- Modo escuro manual  

No modo escuro, foram utilizados ícones de **lua** e **sol** para tornar a interface mais visual e agradável.

## Justificativa arquitetural

O estado principal do catálogo foi colocado no App.js, porque ele é o componente mais alto da árvore e funciona como fonte única da verdade. Isso evita duplicação de dados e facilita o controle de adição, remoção, marcação de assistido, ordenação e tema.

O fluxo segue o padrão:

Top-Down: App.js envia dados e funções para CatalogScreen, DetailScreen e componentes filhos por meio de props.
Bottom-Up: os filhos chamam callbacks recebidos via props para devolver eventos ao pai, como salvar mídia, remover item ou alterar status.

Esse modelo mantém o app modular, previsível e fácil de manter.

## Diário de Depuração
Durante o desenvolvimento do StreamIF, enfrentamos desafios comuns ao ecossistema
React Native. Abaixo, descrevo dois bugs críticos que serviram de aprendizado sobre a
sintaxe do JavaScript e o funcionamento do Metro Bundler.

#### Bug 1: Erro de Sintaxe em Importação
* **Mensagem de Erro (Red Box):** `SyntaxError: ... Unexpected keyword 'import'. (3:7)`
* **Causa Identificada:** Durante uma refatoração rápida, inseri acidentalmente a palavra-chave `import` duas vezes na mesma linha (`import import DetailScreen...`). O parser do Babel não conseguiu processar a declaração, pois encontrou um token inesperado logo no início do arquivo.
* **Como foi corrigido:** Realizei a inspeção visual da linha apontada pelo erro (linha 3), removendo o termo redundante e ajustando a declaração para `import DetailScreen from './screens/DetailScreen'`.

#### Bug 2: Falha na Resolução de Módulo (Asset)
* **Mensagem de Erro (Red Box):** `Unable to resolve "../assets/img/claquete.png" from "components\EmptyState.js"`
* **Causa Identificada:** O erro ocorreu porque tentei referenciar um arquivo de imagem em um componente de forma que o Metro Bundler não conseguiu mapear durante a compilação. Isso acontece porque caminhos de arquivos estáticos no React Native exigem o uso da função `require()` para garantir que o asset seja empacotado corretamente.
* **Como foi corrigido:** Ajustei o código para utilizar a função `require()` nativa do React Native dentro da propriedade `source` do componente `<Image>`, passando o caminho relativo correto. Isso permitiu ao bundler localizar e incluir o arquivo PNG no pacote final do aplicativo.

---

## Instalação e Execução

### Pré-requisitos

- Node.js
- Android Studio (opcional)
- Expo Go

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    https://github.com/Samuel-fernandesf/streamIF.git
    cd 'streamIF/app/'
    ```
2.  **Instale as dependências**
    ```bash
    npm install
    ```
3.  **Inicie o servidor do Expo:**
       ```bash
       npx expo start
       ```

       Para visualizar:
        Use o app Expo Go no seu celular e escaneie o QR Code gerado. <br>
        Ou pressione a para abrir no emulador Android ou i para iOS.

---


## Observações finais
O projeto foi construído seguindo uma arquitetura modular, com componentes separados, estado centralizado e uso de props para comunicação entre pai e filhos. A interface também foi pensada para ficar visualmente mais organizada, incluindo feedback por cor na nota, indicação de item assistido e modo escuro manual.

Este projeto foi desenvolvido como trabalho avaliativo do 2º Bimestre para a disciplina de **Aplicativos Móveis**.

## Integrantes da Dupla
- [Samuel Fernandes Filho](https://github.com/Samuel-fernandesf) — Prontuário: AQ3021092  
- [Luiz Gabriel Leli Pereira](https://github.com/ImLuizz) — Prontuário: AQ3020878  

* **Instituição:** Instituto Federal de São Paulo (**IFSP**) - Campus Araraquara
