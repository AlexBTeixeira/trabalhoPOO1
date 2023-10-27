import { validate, typedef } from "bycontract";

// Classe Aerovia
export class Aerovia {
    #id;
    #origem;
    #destino;
    #tamanho;

    // Construtor da classe Aerovia
    constructor(id, origem, destino, tamanho) {
        // Valida os tipos dos argumentos conforme as especificações
        validate(arguments, ["String", "String", "String", "number"]);

        // Faz as validações necessárias, conforme a especificação
        if (id <= 0) {
            throw new Error(`Identificador inválido: ${id}`);
        }

        if (origem.length !== 3 || destino.length !== 3) {
            throw new Error("Os campos origem e destino devem ter exatamente 3 letras.");
        }

        if (tamanho <= 0) {
            throw new Error(`Tamanho inválido: ${tamanho}`);
        }

        // Inicializa as propriedades da classe
        this.#id = id;
        this.#origem = origem;
        this.#destino = destino;
        this.#tamanho = tamanho;
    }

    // Métodos getter para as propriedades da classe
    get id() {
        return this.#id;
    }

    get origem() {
        return this.#origem;
    }

    get destino() {
        return this.#destino;
    }

    get tamanho() {
        return this.#tamanho;
    }

    // Método toString para exibir informações da aerovia
    toString() {
        return `id: ${this.#id}, origem: ${this.#origem}, destino: ${this.#destino}, tamanho: ${this.#tamanho}`;
    }
}
