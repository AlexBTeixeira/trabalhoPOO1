import { Aerovia } from "../Modelos/Aerovia.js";
import fs from "fs";

export class ServicoAerovia {
    #aerovias;

    constructor() {
        this.#aerovias = [];
    }

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

    criarAerovia(id, origem, destino, tamanho) {
        try {
            const aerovia = new Aerovia(id, origem, destino, tamanho);
            this.adicionarAerovia(aerovia);
            console.log("Aerovia criada com sucesso.");
        } catch (error) {
            console.error("Erro ao criar aerovia: " + error.message);
        }
    }

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

    adicionarAerovia(aerovia) {

        // Se não tiver aeronave com o mesmo prefixo, adicione na lista
        const aeroviaexistente = this.#aerovias.find(existingAerovia => existingAerovia.id === aerovia.id);
    
        if (aeroviaexistente) {
            throw new Error(`Já existe uma aerovia com o prefixo ${aerovia.id}`);
        }
    
        this.#aerovias.push(aerovia);
        console.log("Aerovia adicionada com sucesso.");
    }

    removerAerovia(id) {
        const index = this.#aerovias.findIndex(aerovia => aerovia.id === id);
        if (index !== -1) {
            this.#aerovias.splice(index, 1);
            console.log("Aerovia removida com sucesso.");
        } else {
            console.error("Aerovia não encontrada com o ID: " + id);
        }
    }

    listarAerovias() {
        this.#aerovias.forEach((aerovia, index) => {
            console.log(`Aerovia #${index + 1}:`);
            console.log(aerovia.toString());
            console.log();
        });
    }
}
