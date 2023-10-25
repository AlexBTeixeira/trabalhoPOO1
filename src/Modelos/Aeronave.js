import { validate, typedef } from "bycontract";

// ClasseAeronave
export class Aeronave {
    #prefixo;
    #velocidadeCruzeiro;
    #autonomia;

    constructor(prefixo, velocidadeCruzeiro, autonomia) {
        validate(arguments, ["String", "number", "number"]);
        this.#prefixo = prefixo;
        this.#velocidadeCruzeiro = velocidadeCruzeiro;
        this.#autonomia = autonomia;
    }

    get prefixo() {
        return this.#prefixo;
    }

    get velocidadeCruzeiro() {
        return this.#velocidadeCruzeiro;
    }

    get autonomia() {
        return this.#autonomia;
    }

    setAutonomia(novaAutonomia) {
        validate(novaAutonomia, "number");
        this.#autonomia = novaAutonomia;
    }

     toString() {
        return `Prefixo: ${this.#prefixo}, Velocidade de Cruzeiro: ${this.#velocidadeCruzeiro}, Autonomia: ${this.#autonomia}`;
    }
}

// Classe AeronaveParticular (Herda de Aeronave)
export class AeronaveParticular extends Aeronave {
    #responsavelManutencao;

    constructor(prefixo, velocidadeCruzeiro, autonomia, responsavelManutencao) {
        validate(arguments, ["String", "number", "number", "String"]);
        super(prefixo, velocidadeCruzeiro, autonomia);
        this.#responsavelManutencao = responsavelManutencao;
    }

    get responsavelManutencao() {
        return this.#responsavelManutencao;
    }

    toString() {
        return `${super.toString()}, Responsável pela Manutenção: ${this.#responsavelManutencao}`;
    }
}

// Classe AeronaveComrcial
export class AeronaveComercial extends Aeronave {
    #nomeCompanhia;

    constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCompanhia) {
        validate(arguments, ["String", "number", "number", "String"]);
        super(prefixo, velocidadeCruzeiro, autonomia);
        this.#nomeCompanhia = nomeCompanhia;
    }

    get nomeCompanhia() {
        return this.#nomeCompanhia;
    }

    toString() {
        return `${super.toString()}, Nome da Companhia: ${this.#nomeCompanhia}`;
    }
}

// Classe AeronaveCarga (Herda de AeronaveComercial)
export class AeronaveCarga extends AeronaveComercial {
    #pesoMaximo;

    constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCompanhia, pesoMaximo) {
        validate(arguments, ["String", "number", "number", "String", "number"]);
        super(prefixo, velocidadeCruzeiro, autonomia, nomeCompanhia);
        this.#pesoMaximo = pesoMaximo;
    }

    get pesoMaximo() {
        return this.#pesoMaximo;
    }

    toString() {
        return `${super.toString()}, Peso Máximo: ${this.#pesoMaximo}`;
    }
}

// Classe AeronavePassageiro (Herda de AeronaveComercial)
export class AeronavePassageiro extends AeronaveComercial {
    #maxPassageiros;

    constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCompanhia, maxPassageiros) {
        validate(arguments, ["String", "number", "number", "String", "number"]);
        super(prefixo, velocidadeCruzeiro, autonomia, nomeCompanhia);
        this.#maxPassageiros = maxPassageiros;
    }

    get maxPassageiros() {
        return this.#maxPassageiros;
    }

    toString() {
        return `${super.toString()}, Máximo de Passageiros: ${this.#maxPassageiros}`;
    }
}

