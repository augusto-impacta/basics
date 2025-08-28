function formatarValor(input) {
    let numeros = input.value.replace(/\D/g, '');
    if (!numeros || numeros.length === 0) {
        input.value = '';
        return;
    }
    let valorNumerico = parseInt(numeros) / 100;
    input.value = valorNumerico.toFixed(2);
}

function renderizaResultadoIMC(imc) {
    console.log(imc)
    document.getElementById("imc").innerText =
        imc?.imc + " - " + imc.imcDescription;

    var linhasTabela = document.querySelectorAll(".data .tabela tbody tr");
    for (var i = 0; i < linhasTabela.length; i++) {
        linhasTabela[i].className = "";
    }

    var range;
    if (imc.imc < 18.5) {
        range = "abaixo";
    } else if (imc.imc >= 18.5 && imc.imc < 24.9) {
        range = "normal";
    } else if (imc.imc >= 25 && imc.imc < 29.9) {
        range = "sobrepeso";
    } else {
        range = "obesidade";
    }

    var linhaDestaque = document.querySelector('.data .tabela tbody tr[data-range="' + range + '"]');
    if (linhaDestaque) {
        linhaDestaque.className = "destacado";
    }
}

async function calculateIMC(evt) {
    evt.preventDefault();
    var alturaEl = document.getElementById("altura");
    var pesoEl = document.getElementById("peso");

    fetch("http://localhost:3000/imc/calculate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "height": alturaEl.value, "weight": pesoEl.value })
    })
        .then(response => response.json())
        .then(data => {
            renderizaResultadoIMC(data)
        })
        .catch(error => {
            console.error("Erro:", error);
        });
}

window.onload = function () {
    document
        .getElementById("calcular")
        .addEventListener("click", calculateIMC);
};
