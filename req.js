import fetch from 'node-fetch';

async function fetchData() {
  try {
    const response = await fetch('http://localhost:3333/users');
    const data = await response.json();
    console.log('Dados recebidos:', data);
    // Aqui você pode manipular os dados recebidos conforme necessário
  } catch (error) {
    console.error('Erro ao fazer requisição:', error);
  }
}

fetchData();
