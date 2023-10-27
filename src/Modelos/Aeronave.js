import { validate, typedef } from "bycontract";

// Classe base para todas as aeronaves
export class Aeronave {
    #prefixo;
    #velocidadeCruzeiro;
    #autonomia;

    // Construtor da classe Aeronave
    constructor(prefixo, velocidadeCruzeiro, autonomia) {
        validate(arguments, ["String", "number", "number"]);
        this.#prefixo = prefixo;
        this.#velocidadeCruzeiro = velocidadeCruzeiro;
        this.#autonomia = autonomia;
    }

    // Métodos getter para as propriedades da classe
    get prefixo() {
        return this.#prefixo;
    }

    get velocidadeCruzeiro() {
        return this.#velocidadeCruzeiro;
    }

    get autonomia() {
        return this.#autonomia;
    }

    // Método para definir a autonomia da aeronave
    setAutonomia(novaAutonomia) {
        validate(novaAutonomia, "number");
        this.#autonomia = novaAutonomia;
    }

    // Método toString para exibir informações da aeronave
    toString() {
        return `Prefixo: ${this.#prefixo}, Velocidade de Cruzeiro: ${this.#velocidadeCruzeiro}, Autonomia: ${this.#autonomia}`;
    }
}

// Classe AeronaveParticular (Herda de Aeronave)
export class AeronaveParticular extends Aeronave {
    #responsavelManutencao;

    // Construtor da classe AeronaveParticular
    constructor(prefixo, velocidadeCruzeiro, autonomia, responsavelManutencao) {
        validate(arguments, ["String", "number", "number", "String"]);
        super(prefixo, velocidadeCruzeiro, autonomia);
        this.#responsavelManutencao = responsavelManutencao;
    }

    // Método getter para a propriedade da classe
    get responsavelManutencao() {
        return this.#responsavelManutencao;
    }

    // Sobrescreve o método toString para exibir informações adicionais
    toString() {
        return `${super.toString()}, Responsável pela Manutenção: ${this.#responsavelManutencao}`;
    }
}

// Classe AeronaveComercial
export class AeronaveComercial extends Aeronave {
    #nomeCompanhia;

    // Construtor da classe AeronaveComercial
    constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCompanhia) {
        validate(arguments, ["String", "number", "number", "String"]);
        super(prefixo, velocidadeCruzeiro, autonomia);
        this.#nomeCompanhia = nomeCompanhia;
    }

    // Método getter para a propriedade da classe
    get nomeCompanhia() {
        return this.#nomeCompanhia;
    }

    // Sobrescreve o método toString para exibir informações adicionais
    toString() {
        return `${super.toString()}, Nome da Companhia: ${this.#nomeCompanhia}`;
    }
}

// Classe AeronaveCarga (Herda de AeronaveComercial)
export class AeronaveCarga extends AeronaveComercial {
    #pesoMaximo;

    // Construtor da classe AeronaveCarga
    constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCompanhia, pesoMaximo) {
        validate(arguments, ["String", "number", "number", "String", "number"]);
        super(prefixo, velocidadeCruzeiro, autonomia, nomeCompanhia);
        this.#pesoMaximo = pesoMaximo;
    }

    // Método getter para a propriedade da classe
    get pesoMaximo() {
        return this.#pesoMaximo;
    }

    // Sobrescreve o método toString para exibir informações adicionais
    toString() {
        return `${super.toString()}, Peso Máximo: ${this.#pesoMaximo}`;
    }
}

// Classe AeronavePassageiro (Herda de AeronaveComercial)
export class AeronavePassageiro extends AeronaveComercial {
    #maxPassageiros;

    // Construtor da classe AeronavePassageiro
    constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCompanhia, maxPassageiros) {
        validate(arguments, ["String", "number", "number", "String", "number"]);
        super(prefixo, velocidadeCruzeiro, autonomia, nomeCompanhia);
        this.#maxPassageiros = maxPassageiros;
    }

    // Método getter para a propriedade da classe
    get maxPassageiros() {
        return this.#maxPassageiros;
    }

    // Sobrescreve o método toString para exibir informações adicionais
    toString() {
        return `${super.toString()}, Máximo de Passageiros: ${this.#maxPassageiros}`;
    }
}
