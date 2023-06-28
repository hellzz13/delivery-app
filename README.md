# Delivery App

Sobre o Projeto

O projeto é um interface criada para gerenciar uma API de deslocamento, onde podemos fazer o CRUD dos dados fornecidos pela mesma. Seguindo a interação e o fluxo de entrega, onde o usuário pode operar a dashboard e listar, cadastrar, editar e deletar dados de veiculos, condutores, clientes e com isso interagir com os deslocamentos.

## **Getting Started**

Primeiro, clone o projeto localmente:

```bash
git clone https://github.com/hellzz13/delivery-app.git
```

Em seguida acesse a pasta do projeto pelo terminal, e rode o comando abaixo para instalar a dependencias.

```bash
npm install
```

Depois, rode o comando para dar start no server local:

```bash
npm run dev
```

Por fim, abra [http://localhost:3000](http://localhost:3000/) em seu navegador para visualizar o projeto.

## **Proximos passos**

O projeto é um MPV onde podemos validar a ideia de deslocamento. Abaixo podemos listar algumas melhorias a serem aplicadas futuramente:

- Foi utilizado para simular um login e um cadastro um arquivo simples em JS que utiliza o localStorage para fazer a gestão de autenticação. Isso pode gerar algumas conflitos com o dom e de fato não é uma segurança para o sistema de fato já que o API é publica. Então uma melhoria seria pegar uma autenticação de usuário após ser implementado no API.

- O kmFinal pode ser utilizado como interação com o km do veiculo para atualizar o mesmo.

-

## **Tools and libs:**

- NextJs 13.4.5
- React 18.2.0
- TailwindCss 3.3.2
- Typescript 5.1.3
- Axios 1.4.0
- Dayjs 1.11.8
- React Hook Form 7.43.9
- Zod 3.21.4
- React Input Mask 3.0.0-alpha.2
- lottie-react 2.4.0
- react-toastify 9.1.3

## **Deploy on Vercel**

O projeto pode ser acessado no link:

[Projeto InTruck Delivery](https://delivery-app-hellzz13.vercel.app/)
