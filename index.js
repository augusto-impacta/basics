function Pessoa(altura, peso) {
    if (!altura || !peso) {
        throw new Error("Altura e peso são obrigatórios");
    }

    this.altura = altura;
    this.peso = peso;
}

function Nutricionista(altura, peso) {
    Pessoa.call(this, altura, peso);
    this.imc = function () {
        return this.peso / (this.altura * this.altura);
    };

    this.classificaIMC = function () {
        var imc = this.imc();
        if (imc < 18.5) {
            return "Abaixo do peso";
        }
        if (imc >= 18.5 && imc < 24.9) {
            return "Peso normal";
        }
        if (imc >= 25 && imc < 29.9) {
            return "Sobrepeso";
        }

        return "Obesidade";
    };
}
Nutricionista.prototype = Object.create(Pessoa.prototype);
Nutricionista.prototype.constructor = Nutricionista;

function renderizaResultadoIMC(nutricionista) {

    const tbody = document.getElementById("historicoIMC")
    

        let guardaIMC = [];
        guardaIMC.push({numero: guardaIMC.length + 1,
                        altura: nutricionista.altura, 
                        peso: nutricionista.peso, 
                        imc: nutricionista.imc().toFixed(2), 
                        classificacao: nutricionista.classificaIMC()});

        guardaIMC.forEach(gIMC => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${gIMC.numero}</td>
                        <td>${gIMC.altura}</td>
                        <td>${gIMC.peso}</td>
                        <td>${gIMC.imc}</td>
                        <td>${gIMC.classificacao}</td>`;
        tbody.appendChild(tr); });

        tbody.lastElementChild.previousElementSibling.querySelectorAll("td").forEach(td => td.style.backgroundColor = "white");
         tbody.lastElementChild.querySelectorAll("td").forEach(td => td.style.backgroundColor = "yellow");

        document.getElementById("imc").innerText = nutricionista.imc().toFixed(2) + " - " + nutricionista.classificaIMC();
}

function actionCalcularIMCBuilder() {
    var alturaEl = document.getElementById("altura");
    var pesoEl = document.getElementById("peso");

    return function actionCalcularIMC(evt) {
        evt.preventDefault();

        var nutricionista = new Nutricionista(
            parseFloat(alturaEl.value),
            parseFloat(pesoEl.value)
        );
        console.log(Nutricionista.prototype.constructor);
        console.log(nutricionista instanceof Pessoa);

        renderizaResultadoIMC(nutricionista);
    }
}

window.onload = function () {
    document
        .getElementById("calcular")
        .addEventListener("click", actionCalcularIMCBuilder());
};
