
let participantes = [
  {
    nome: "Marcos Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 22, 19, 20)
  },
  {
    nome: "Ana Silva",
    email: "ana.silva@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 30),
    dataCheckIn: null
  },
  {
    nome: "Pedro Santos",
    email: "pedro.santos@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 15, 45),
    dataCheckIn: new Date(2024, 2, 24, 15, 45)
  },
  {
    nome: "Carla Lima",
    email: "carla.lima@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 8, 0),
    dataCheckIn: new Date(2024, 2, 25, 8, 0)
  },
  {
    nome: "Rafaela Oliveira",
    email: "rafaela.oliveira@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 14, 20),
    dataCheckIn: null
  },
  {
    nome: "Gustavo Mendes",
    email: "gustavo.mendes@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 11, 10),
    dataCheckIn: new Date(2024, 2, 27, 11, 10)
  },
  {
    nome: "Juliana Oliveira",
    email: "juliana.oliveira@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 9, 30),
    dataCheckIn: new Date(2024, 2, 28, 9, 30)
  },
  {
    nome: "Daniel Souza",
    email: "daniel.souza@gmail.com",
    dataInscricao: new Date(2024, 2, 29, 16, 15),
    dataCheckIn: new Date(2024, 2, 29, 16, 15)
  },
  {
    nome: "Fernanda Costa",
    email: "fernanda.costa@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 13, 45),
    dataCheckIn: new Date(2024, 2, 30, 13, 45)
  },
  {
    nome: "Roberto Almeida",
    email: "roberto.almeida@gmail.com",
    dataInscricao: new Date(2024, 2, 31, 17, 0),
    dataCheckIn: null
  }
];

const newParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn =  dayjs(Date.now())
  .to(participante.dataCheckIn)

 
 
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
      <td>
        <strong>${participante.nome}</strong> 
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista = (participantes)  => {
  let output = ""
  for (let participante of participantes) {
    output = output + newParticipante(participante)
  }

  document.querySelector('tbody').innerHTML 
  = output
}

atualizarLista(participantes)

const addParticipante = (event) =>  {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const  participante = {
    nome:  dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn:  null
  }

  // verificador de participante
  const pExiste = participantes.find((p) => p.email == participante.email)

  if (pExiste) {
    alert('EMAIL JÁ CADASTRADO!!!')
    return
  }

  participantes = [participante,   ...participantes]
  atualizarLista(participantes)

  // limpar formulario
  event.target.querySelector('[name="nome"]').value= " "
  event.target.querySelector('[name="email"]').value= " "
}

const fazerCheckIn  = (event) => {
  // confirmar o check-in
  const resultado = 'Certeza que deseja fazer o check-in?' 

  if (confirm(resultado) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}