import { validate, typedef } from "bycontract";

export class Piloto {
    #matricula;
    #nome;
    #habilitacaoAtiva;

    constructor(matricula, nome, habilitacaoAtiva) {
        validate(arguments, ["String", "String", "Boolean"]);
        this.#matricula = matricula;
        this.#nome = nome;
        this.#habilitacaoAtiva = habilitacaoAtiva;
    }

    get matricula() {
        return this.#matricula;
    }

    get nome() {
        return this.#nome;
    }

    get habilitacaoAtiva() {
        return this.#habilitacaoAtiva;
    }

    set habilitacaoAtiva(Boolean) {
        this.#habilitacaoAtiva = Boolean;
    }

     toString() {
        return `matricula: ${this.#matricula}, nome: ${this.#nome}, habilitacao: ${this.#habilitacaoAtiva}`;
    }
}