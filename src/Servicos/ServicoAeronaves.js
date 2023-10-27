import { AeronaveParticular, AeronaveComercial, AeronaveCarga, AeronavePassageiro } from "../Modelos/Aeronave.js";
import { validate, typedef } from "bycontract";
import fs from "fs";

export class ServicoAeronave {
    #aeronaves;

    constructor() {
        this.#aeronaves = [];
    }

    // Carrega os dados das aeronaves a partir do arquivo JSON
    carregaAeronaves() {
        try {
            const data = fs.readFileSync("src\\Dados\\aeronaves.json");

            if (data.length === 0) {
                console.log("Nenhum dado de aeronaves encontrado.");
                return;
            }
    
            const aeronavesData = JSON.parse(data);
            
            for (const aeronaveData of aeronavesData) {
                this.criarAeronave(aeronaveData.type, aeronaveData);
            }
    
            console.log("Aeronaves carregadas com sucesso.");
        } catch (error) {
            console.error("Erro ao carregar aeronaves: " + error.message);
        }
    }
    
    // Cria uma nova aeronave com os dados fornecidos
    criarAeronave(tipo, dados) {
        try {
            let aeronave;

            switch (tipo) {
                case "AeronaveParticular":
                    aeronave = new AeronaveParticular(dados.prefixo, dados.velocidadeCruzeiro, dados.autonomia, dados.responsavelManutencao);
                    break;
                case "AeronaveComercial":
                    aeronave = new AeronaveComercial(dados.prefixo, dados.velocidadeCruzeiro, dados.autonomia, dados.nomeCompanhia);
                    break;
                case "AeronaveCarga":
                    aeronave = new AeronaveCarga(dados.prefixo, dados.velocidadeCruzeiro, dados.autonomia, dados.nomeCompanhia, dados.pesoMaximo);
                    break;
                case "AeronavePassageiro":
                    aeronave = new AeronavePassageiro(dados.prefixo, dados.velocidadeCruzeiro, dados.autonomia, dados.nomeCompanhia, dados.maxPassageiros);
                    break;
                default:
                    console.error("Tipo de aeronave desconhecido: " + tipo);
                    return;
            }

            this.adicionarAeronave(aeronave);
            console.log("Aeronave criada com sucesso.");
        } catch (error) {
            console.error("Erro ao criar aeronave: " + error.message);
        }
    }

    // Salva os dados das aeronaves no arquivo JSON
    salvarAeronaves() {
        try {
            const aeronavesData = this.#aeronaves.map(aeronave => {
                return {
                    type: aeronave.constructor.name,
                    prefixo: aeronave.prefixo,
                    velocidadeCruzeiro: aeronave.velocidadeCruzeiro,
                    autonomia: aeronave.autonomia,
                    responsavelManutencao: aeronave.responsavelManutencao || null,
                    nomeCompanhia: aeronave.nomeCompanhia || null,
                    pesoMaximo: aeronave.pesoMaximo || null,
                    maxPassageiros: aeronave.maxPassageiros || null,
                };
            });

            fs.writeFileSync("src\\Dados\\aeronaves.json", JSON.stringify(aeronavesData, null, 2));
            console.log("Aeronaves salvas com sucesso.");
        } catch (error) {
            console.error("Erro ao salvar aeronaves: " + error.message);
        }
    }

    // Adiciona uma aeronave à lista
    adicionarAeronave(aeronave) {
        
        const aeronaveExistente = this.#aeronaves.find(existingAeronave => existingAeronave.prefixo === aeronave.prefixo);
        // Se não tiver aeronave com o mesmo prefixo, adicione na lista
        if (aeronaveExistente) {
            throw new Error(`Já existe uma aeronaves com o prefixo ${aeronave.prefixo}`);
        }
    
        this.#aeronaves.push(aeronave);
        console.log("Aeronave adicionada com sucesso.");
    }

    // Remove uma aeronave com base no prefixo
    removerAeronave(prefixo) {
        const index = this.#aeronaves.findIndex(aeronave => aeronave.prefixo === prefixo);
        if (index !== -1) {
            this.#aeronaves.splice(index, 1);
            console.log("Aeronave removida com sucesso.");
        } else {
            console.error("Aeronave não encontrada com o prefixo: " + prefixo);
        }
    }

    // Lista as aeronaves registradas
    listarAeronaves() {
        this.#aeronaves.forEach((aeronave, index) => {
            console.log(`Aeronave #${index + 1}:`);
            console.log(aeronave.toString());
            console.log();
        });
    }
}
