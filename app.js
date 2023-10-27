import { ServicoAeronave } from "./src/Servicos/ServicoAeronaves.js";
import { ServicoAerovia } from "./src/Servicos/ServicoAerovias.js";
import { ServicoPiloto } from "./src/Servicos/ServicoPilotos.js";

//Cria e Carrega os Serviços

const servicoAeronave = new ServicoAeronave();
const servicoPilotos = new ServicoPiloto();
const servicoAerovias = new ServicoAerovia();

console.log("//--------------------- Carregamento Arquivos ---------------------\\")
servicoAeronave.carregaAeronaves();
servicoPilotos.carregaPilotos();
servicoAerovias.carregaAerovias();


console.log("//--------------------- Execucação Para Aeronaves ---------------------\\")

const dadosAeronaveParticular = {
    prefixo: "PP-123",
    velocidadeCruzeiro: 500,
    autonomia: 1500,
    responsavelManutencao: "João da Silva"
};

servicoAeronave.criarAeronave("AeronaveParticular", dadosAeronaveParticular);

const dadosAeronaveCarga = {
    prefixo: "CC-456",
    velocidadeCruzeiro: 600,
    autonomia: 2000,
    nomeCompanhia: "Transportadora ABC",
    pesoMaximo: 10000
};

servicoAeronave.criarAeronave("AeronaveCarga", dadosAeronaveCarga);
servicoAeronave.salvarAeronaves();
servicoAeronave.listarAeronaves();


console.log("//--------------------- Execucação Para Aerovias ---------------------\\")

servicoAerovias.criarAerovia("1", "AAA", "BBB", 100);
servicoAerovias.criarAerovia("2", "BBB", "CCC", 200);

console.log("Aerovias registradas:");
servicoAerovias.listarAerovias();

servicoAerovias.removerAerovia("1");

console.log("Aerovias registradas após remoção:");
servicoAerovias.listarAerovias();

servicoAerovias.salvarAerovias();

console.log("Pequisando Aerovia:");
servicoAerovias.recupera('BBV','CCC')

console.log("//--------------------- Execucação Para Pilotos ---------------------\\")

servicoPilotos.criarPiloto("P001", "João", true);
servicoPilotos.criarPiloto("P002", "Maria", false);


console.log("Pilotos registrados:");
servicoPilotos.listarPilotos();

servicoPilotos.ativarHabilitacao("P001");
servicoPilotos.desativarHabilitacao("P001");
servicoPilotos.removerPiloto("P001");

console.log("Recuperando Piloto");
servicoPilotos.recupera("P002");

servicoPilotos.salvarPilotos();
