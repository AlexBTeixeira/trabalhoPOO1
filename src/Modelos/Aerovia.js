import { validate, typedef } from "bycontract";

// ClasseAeronave
export class Aerovia {
    #id;
    #origem;
    #destino;
    #tamanho;

    constructor(id, origem, destino,tamanho) {
        validate(arguments, ["String", "String","String","number"]);

        if (id <= 0) {
            throw new Error(`Identificador invalido: ${id}`);
        }
        
        if (origem.length !== 3 || destino.length !== 3) {
            throw new Error("Os campos origem e destino não podem ter mais ou menos que 3 letras");
        }

        if (tamanho <= 0) {
            throw new Error(`Tamanho inválido: ${tamanho}`);
        }

        this.#id = id;
        this.#origem = origem;
        this.#destino = destino;
        this.#tamanho = tamanho;
    }

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

     toString() {
        return `id: ${this.#id}, origem: ${this.#origem}, destino: ${this.#destino}, tamanho: ${this.#tamanho}`;
    }
}