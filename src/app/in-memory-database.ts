import {InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataBase implements InMemoryDbService {

  createDb() {
    const categories = [
      {id: 1, name: 'Moradia', description: 'Pagamentos de Contas da Casa'},
      {id: 1, name: 'Saúde', description: 'Plano de Saúde e Remédios'},
      {id: 1, name: 'Lazer', description: 'Cinema, parque, praia, etc'},
      {id: 1, name: 'Salário', description: 'Recebimento de Salário'},
      {id: 1, name: 'Freelas', description: 'Trabalhos como freelancer'}
    ];

    return { categories };
  }
}
