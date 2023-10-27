import { validate, typedef } from "bycontract";

// Classe Piloto
export class Piloto {
    #matricula;
    #nome;
    #habilitacaoAtiva;

    // Construtor da classe Piloto
    constructor(matricula, nome, habilitacaoAtiva) {
        // Valida os tipos dos argumentos conforme as especificações
        validate(arguments, ["String", "String", "Boolean"]);
        
        // Inicializa as propriedades da classe
        this.#matricula = matricula;
        this.#nome = nome;
        this.#habilitacaoAtiva = habilitacaoAtiva;
    }

    // Métodos getter para as propriedades da classe
    get matricula() {
        return this.#matricula;
    }

    get nome() {
        return this.#nome;
    }

    get habilitacaoAtiva() {
        return this.#habilitacaoAtiva;
    }

    // Método setter para ativar ou desativar a habilitação do piloto
    set habilitacaoAtiva(estado) {
        this.#habilitacaoAtiva = estado;
    }

    // Método toString para exibir informações do piloto
    toString() {
        return `matrícula: ${this.#matricula}, nome: ${this.#nome}, habilitação ativa: ${this.#habilitacaoAtiva}`;
    }
}
