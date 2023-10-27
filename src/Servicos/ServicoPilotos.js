import { Piloto } from "../Modelos/Pilotos.js";
import { validate, typedef } from "bycontract";
import fs from "fs";

export class ServicoPiloto {
  #pilotos; // Array privado para armazenar os pilotos

  constructor() {
    this.#pilotos = [];
  }

  // Recupera um piloto com base na matrícula
  recupera(matricula) {
    validate(arguments, ["String"]);
    const pilotoEncontrado = this.#pilotos.find(
      (piloto) => piloto.matricula === matricula
    );

    if (pilotoEncontrado) {
      console.log(pilotoEncontrado.toString());
      return pilotoEncontrado;
    } else {
      console.error(`Piloto não encontrado com a matrícula: ${matricula}`);
    }
  }

  // Carrega os dados dos pilotos a partir do arquivo JSON
  carregaPilotos() {
    try {
      const data = fs.readFileSync("src\\Dados\\pilotos.json");

      if (data.length === 0) {
        console.log("Nenhum dado de pilotos encontrado.");
        return;
      }

      const pilotosData = JSON.parse(data);

      for (const pilotoData of pilotosData) {
        const piloto = new Piloto(
          pilotoData.matricula,
          pilotoData.nome,
          pilotoData.habilitacaoAtiva
        );
        this.adicionarPiloto(piloto);
      }

      console.log("Pilotos carregados com sucesso.");
    } catch (error) {
      console.error("Erro ao carregar pilotos: " + error.message);
    }
  }

  // Cria um novo piloto com os dados fornecidos
  criarPiloto(matricula, nome, habilitacaoAtiva) {
    try {
      const piloto = new Piloto(matricula, nome, habilitacaoAtiva);
      this.adicionarPiloto(piloto);
      console.log("Piloto criado com sucesso.");
    } catch (error) {
      console.error("Erro ao criar piloto: " + error.message);
    }
  }

  // Salva os dados dos pilotos no arquivo JSON
  salvarPilotos() {
    try {
      const pilotosData = this.#pilotos.map((piloto) => {
        return {
          matricula: piloto.matricula,
          nome: piloto.nome,
          habilitacaoAtiva: piloto.habilitacaoAtiva,
        };
      });

      fs.writeFileSync(
        "src\\Dados\\pilotos.json",
        JSON.stringify(pilotosData, null, 2)
      );
      console.log("Pilotos salvos com sucesso.");
    } catch (error) {
      console.error("Erro ao salvar pilotos: " + error.message);
    }
  }

  // Adiciona um piloto à lista, verificando se a matrícula já existe
  adicionarPiloto(piloto) {
    const pilotoExistente = this.#pilotos.find(
      (existePiloto) => existePiloto.matricula === piloto.matricula
    );

    if (pilotoExistente) {
      throw new Error(
        `Já existe um piloto com a matrícula ${piloto.matricula}`
      );
    }
    this.#pilotos.push(piloto);
    console.log("Piloto adicionado com sucesso.");
  }

  // Remove um piloto com base na matrícula
  removerPiloto(matricula) {
    const index = this.#pilotos.findIndex(
      (piloto) => piloto.matricula === matricula
    );
    if (index !== -1) {
      this.#pilotos.splice(index, 1);
      console.log("Piloto removido com sucesso.");
    } else {
      console.error("Piloto não encontrado com a matrícula: " + matricula);
    }
  }

  // Ativa a habilitação de um piloto com base na matrícula
  ativarHabilitacao(matricula) {
    const piloto = this.#pilotos.find((p) => p.matricula === matricula);
    if (piloto) {
      if (!piloto.habilitacaoAtiva) {
        piloto.habilitacaoAtiva = true;
        console.log("Habilitação do piloto ativada com sucesso.");
      } else {
        console.log("A habilitação já está ativada para o piloto.");
      }
    } else {
      console.error("Piloto não encontrado com a matrícula: " + matricula);
    }
  }

  // Desativa a habilitação de um piloto com base na matrícula
  desativarHabilitacao(matricula) {
    const piloto = this.#pilotos.find((p) => p.matricula === matricula);
    if (piloto) {
      if (piloto.habilitacaoAtiva) {
        piloto.habilitacaoAtiva = false;
        console.log("Habilitação do piloto desativada com sucesso.");
      } else {
        console.log("A habilitação já está desativada para o piloto.");
      }
    } else {
      console.error("Piloto não encontrado com a matrícula: " + matricula);
    }
  }

  // Lista os pilotos registrados
  listarPilotos() {
    this.#pilotos.forEach((piloto, index) => {
      console.log(`Piloto #${index + 1}:`);
      console.log(piloto.toString());
      console.log();
    });
  }
}
