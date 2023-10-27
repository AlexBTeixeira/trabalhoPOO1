import { Aerovia } from "../Modelos/Aerovia.js";
import { validate, typedef } from "bycontract";
import fs from "fs";

export class ServicoAerovia {
    #aerovias;

    constructor() {
        this.#aerovias = [];
    }

    // Carrega as aerovias a partir de um arquivo JSON
    carregaAerovias() {
        try {
            const data = fs.readFileSync("src\\Dados\\aerovias.json");

            if (data.length === 0) {
                console.log("Nenhum dado de aerovias encontrado.");
                return;
            }
    
            const aeroviasData = JSON.parse(data);

            for (const aeroviaData of aeroviasData) {
                const aerovia = new Aerovia(aeroviaData.id, aeroviaData.origem, aeroviaData.destino, aeroviaData.tamanho);
                this.adicionarAerovia(aerovia);
            }

            console.log("Aerovias carregadas com sucesso.");
        } catch (error) {
            console.error("Erro ao carregar aerovias: " + error.message);
        }
    }

    // Cria uma nova aerovia
    criarAerovia(id, origem, destino, tamanho) {
        try {
            const aerovia = new Aerovia(id, origem, destino, tamanho);
            this.adicionarAerovia(aerovia);
            console.log("Aerovia criada com sucesso.");
        } catch (error) {
            console.error("Erro ao criar aerovia: " + error.message);
        }
    }

    // Salva as aerovias em um arquivo JSON
    salvarAerovias() {
        try {
            const aeroviasData = this.#aerovias.map(aerovia => {
                return {
                    id: aerovia.id,
                    origem: aerovia.origem,
                    destino: aerovia.destino,
                    tamanho: aerovia.tamanho
                };
            });

            fs.writeFileSync("src\\Dados\\aerovias.json", JSON.stringify(aeroviasData, null, 2));
            console.log("Aerovias salvas com sucesso.");
        } catch (error) {
            console.error("Erro ao salvar aerovias: " + error.message);
        }
    }

    // Adiciona uma aerovia à lista
    adicionarAerovia(aerovia) {
        // Verifica se já existe uma aerovia com o mesmo ID na lista
        const aeroviaExistente = this.#aerovias.find(existingAerovia => existingAerovia.id === aerovia.id);
    
        if (aeroviaExistente) {
            throw new Error(`Já existe uma aerovia com o ID ${aerovia.id}`);
        }
    
        this.#aerovias.push(aerovia);
        console.log("Aerovia adicionada com sucesso.");
    }

    // Remove uma aerovia da lista pelo ID
    removerAerovia(id) {
        validate(arguments, ["String"]);
        const index = this.#aerovias.findIndex(aerovia => aerovia.id === id);
        if (index !== -1) {
            this.#aerovias.splice(index, 1);
            console.log("Aerovia removida com sucesso.");
        } else {
            console.error("Aerovia não encontrada com o ID: " + id);
        }
    }

    // Lista todas as aerovias
    listarAerovias() {
        this.#aerovias.forEach((aerovia, index) => {
            console.log(`Aerovia #${index + 1}:`);
            console.log(aerovia.toString());
            console.log();
        });
    }

    // Recupera aerovias com base na origem e destino
    recupera(origem, destino) {
        validate(arguments, ["String", "String"]);

        // Filtra as aerovias com a origem e destino fornecidos
        const aeroviasFiltradas = this.#aerovias.filter(aerovia => aerovia.origem === origem && aerovia.destino === destino);
        
        if (aeroviasFiltradas.length > 0) {

            aeroviasFiltradas.forEach((aerovia, index) => {
                console.log(`Aerovia #${index + 1}:`);
                console.log(aerovia.toString());
                console.log();
            })
            return aeroviasFiltradas;
        } else {
            console.error(`Nenhuma aerovia encontrada com origem: ${origem} e destino: ${destino}`);
            return [];
        }
    }
    

}
