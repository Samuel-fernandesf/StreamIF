## Respostas das questões de verificação

## Q1 — Sobre Props e Fluxo de Dados

No `AddMediaForm.js`, os campos do formulário são componentes controlados com `useState`, ou seja, cada `TextInput` guarda localmente o que o usuário digita em `title`, `genre` e `score`.

Quando o botão **Salvar** é pressionado, o formulário chama a função recebida por props `onSave(title, genre, score)`, enviando os dados para o componente pai, que é o `App.js`.

No `App.js`, a função `addMediaHandler` recebe esses valores, monta um novo objeto de mídia e atualiza o estado principal `mediaList` com:

```js
setMediaList([newMedia, ...mediaList])
```
Como mediaList está no componente pai, qualquer alteração nele faz a interface inteira ser re-renderizada, atualizando a lista exibida na FlatList.

Diagrama de fluxo mostrando o caminho do dado desde o TextInput até o array de mídias:

```bash
TextInput (title / genre / score)
        ↓
useState local no AddMediaForm
        ↓
botão "Salvar"
        ↓
props.onSave(title, genre, score)
        ↓
addMediaHandler no App.js
        ↓
criação do objeto newMedia
        ↓
setMediaList([newMedia, ...mediaList])
        ↓
FlatList é atualizada na tela
```


## Q2 — Sobre FlatList vs ScrollView

A `FlatList` foi usada na tela de catálogo porque ela é otimizada para listas grandes e dinâmicas. Ela renderiza apenas os itens que estão visíveis na tela naquele momento, reutilizando componentes conforme o usuário faz scroll. Isso torna o desempenho muito mais eficiente e evita consumo excessivo de memória.

Já o `ScrollView` foi utilizado na tela de detalhes porque o conteúdo é pequeno e estático em comparação com a lista principal. Nessa tela, não há necessidade de otimização por virtualização, já que normalmente se trata de um único item com textos e informações adicionais.

Se o caso fosse invertido, ou seja, usando `ScrollView` para uma lista com 500 itens, o aplicativo renderizaria todos os elementos de uma vez na memória. Isso causaria lentidão, possível travamento, aumento significativo no consumo de recursos e até “lag” na interface.

O conceito técnico relacionado é a **virtualização de listas (Virtualized List)**, que é a base de performance da `FlatList` no React Native.


## Q3 — Sobre Modal

A propriedade do componente `Modal` que controla sua visibilidade é a `visible`. Ela aceita um valor do tipo **boolean** (`true` ou `false`), determinando se o modal aparece ou permanece oculto na tela.

No projeto, o estado de visibilidade (`modalIsVisible`) foi declarado no componente pai (`App.js`), pois ele é responsável por controlar o fluxo global da aplicação. Como o modal está relacionado à criação de uma nova mídia e afeta diretamente o estado principal (`mediaList`), faz sentido que seu controle esteja centralizado no mesmo nível onde os dados são gerenciados.

Além disso, manter esse estado no componente pai permite que diferentes componentes possam abrir ou fechar o modal por meio de funções passadas via **props**, garantindo um fluxo de dados mais consistente e previsível.


## Q4 — Sobre Imutabilidade

### Trecho do código

```js
const removeMedia = (id) => {
  setMediaList(mediaList.filter(item => item.id !== id));
};
```

---

Esse método utiliza `filter()` para gerar um novo array sem o item selecionado, mantendo o princípio de **imutabilidade**.

No React Native, não é recomendado utilizar `splice()` ou `delete array[i]`, pois esses métodos alteram diretamente o array original. Isso quebra a lógica de atualização de estado do React, que depende da criação de novas referências para identificar mudanças e re-renderizar a interface corretamente.

Quando ocorre uma mutação direta, o React pode não detectar a alteração, o que pode causar falhas na atualização visual, como:

- itens que não desaparecem da tela  
- inconsistências na renderização  
- comportamentos inesperados na interface  

Por isso, o uso de `filter()` é a abordagem mais adequada, pois garante a criação de um novo estado de forma imutável e mantém a interface sempre sincronizada com os dados.

## Q5 — Sobre Depuração


Durante o desenvolvimento do projeto, alguns erros típicos de Red Box apareceram, como importações incorretas de componentes, arquivos não encontrados, variáveis não definidas no escopo, e erros de digitação em código (como propriedades inexistentes ou nomes incorretos de funções), todos identificados através das mensagens exibidas no terminal e corrigidos até o app funcionar corretamente.

## Q5 — Sobre Depuração

Durante o desenvolvimento, o `console.log` é exibido no terminal onde o Metro Bundler está rodando, ou seja, na janela do prompt, PowerShell ou terminal do VS Code onde o projeto foi iniciado com `npx expo start`.

Em alguns casos, os logs também podem aparecer no console do navegador quando a depuração remota está ativa.

---

### Depuração remota no Chrome

A depuração remota pode ser ativada pelo menu de desenvolvedor do React Native. No Expo Go, isso geralmente é feito acessando a opção **“Debug Remote JS”** no menu do aplicativo ou do emulador. Ao ativar essa opção, a execução do JavaScript é conectada ao Chrome, e os logs passam a ser exibidos na aba **Console** das ferramentas de desenvolvedor.

---

### Red Box e Yellow Box

O **Red Box** representa erros críticos de execução ou compilação que interrompem o funcionamento do aplicativo, como:

- erros de sintaxe  
- importações incorretas  
- componentes inválidos  

Já o **Yellow Box** representa apenas avisos de boas práticas ou depreciações. Esses avisos não quebram o aplicativo, mas indicam pontos que podem ser melhorados, como uso incorreto de propriedades ou padrões não ideais.

---

### Exemplos de erros encontrados no projeto

Durante o desenvolvimento do projeto, foram comuns erros de Red Box como:

- importações incorretas de componentes  
- arquivos não encontrados  
- variáveis não definidas no escopo  
- erros de digitação em propriedades ou funções  

Esses erros foram identificados através das mensagens exibidas no terminal e corrigidos até o funcionamento correto do aplicativo.


## Q6 — Pergunta-Armadilha de Arquitetura
Analise o seguinte trecho de código e identifique todos os problemas arquiteturais e de
boas práticas que ele contém. Liste cada problema separadamente e proponha a versão
corrigida:

### Problemas identificados

### 1. Importação incorreta do `react-native`
O módulo foi importado como `reactnative`, quando o correto é `react-native`. Isso impede o funcionamento correto dos componentes.

### 2. Falta de uso de `useState`
As variáveis `filmes` e `novoFilme` foram declaradas com `let`, o que não cria estado reativo. Assim, o React não consegue controlar nem atualizar a interface corretamente.

### 3. Estado mutável diretamente
O array `filmes` é alterado com `push()`, o que viola o princípio de imutabilidade e pode causar falhas na atualização da tela.

### 4. Input não controlado
O `TextInput` não está ligado a um estado com `value`, então ele não segue o padrão de componente controlado no React.

### 5. Uso de variável comum para controle de UI
A variável `novoFilme` não é estado, então suas alterações não geram re-render, quebrando o fluxo reativo do React.

### 6. Uso de `.map()` dentro de `ScrollView` sem otimização
A renderização dos itens é feita com `.map()` dentro de `ScrollView`, o que força a renderização de todos os elementos de uma vez e não utiliza virtualização, prejudicando a performance em listas maiores.

Código corrigido:

```js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

function MeuCard({ titulo }) {
  return (
    <View style={{ padding: 10, margin: 5, backgroundColor: 'blue' }}>
      <Text style={{ color: 'white' }}>{titulo}</Text>
    </View>
  );
}

export default function App() {
  const [filmes, setFilmes] = useState([]);
  const [novoFilme, setNovoFilme] = useState('');

  const adicionarFilme = () => {
    if (!novoFilme.trim()) return;

    setFilmes(prev => [
      ...prev,
      { id: Date.now().toString(), titulo: novoFilme }
    ]);

    setNovoFilme('');
  };

  return (
    <View>
      <TextInput
        placeholder="Título"
        value={novoFilme}
        onChangeText={setNovoFilme}
      />

      <Button title="Adicionar" onPress={adicionarFilme} />

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MeuCard titulo={item.titulo} />
        )}
      />
    </View>
  );
}
```
