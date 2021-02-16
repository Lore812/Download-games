const lichess_url = "https://lichess.org";
const lichess_games = "/api/games/user/";
const timecontrol_key = "&perfType=";
const ngames_key = "?max=";


function disB() {

    document.getElementById("bottone").disabled = true;
}

function actB() {

    document.getElementById("bottone").disabled = false;
}


// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {
        type: type
    });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}


// async function GetUserStatus() {
//     var username = "/api/user/" + document.getElementById("utente").value;
//     const risposta = await fetch(lichess_url+username);
//     const data = await risposta.json();
//     console.log(data.online);
//     console.log(username);
// };

// async function ScaPartita(){
//     var cPartita = "/game/export/" + "2Sma7CTC";
//     const risp = await fetch(lichess_url + cPartita);
//     const data = await risposta.json();
//     console.log(data);

// };

//https://lichess.org/api/games/user/sean4you?max=2 

//funzione che scarica le partite dalla API
//tentativo

async function ScaPartite() {
    var tipo = document.getElementById("timecontrol").value;
    var ngames = document.getElementById("npartite").value;
    var username = document.getElementById("utente").value;

    const risp = await fetch(lichess_url + lichess_games + username + ngames_key + ngames + timecontrol_key + tipo + "&clocks=true");
    const dati = await risp.text();
    // console.log(dati);
    download(dati, "Partite_" + username + "_" + tipo + ".pgn");

};
// function controllo() {
//     var tempo = "&perfType=" +document.getElementById("timecontrol").value;
//     console.log(tempo);
// };

//funzione controllo del username
//https://lichess.org/api/user/{username}
async function controllonome() {

    var nome = document.getElementById('utente').value;
    var casella = document.getElementById("utente");
    const risp = await fetch("https://lichess.org/api/user/" + nome);

    if (nome == "") {
        casella.style.backgroundColor = "white";
        disB();
    } else {
        if (!risp.ok) {
            casella.style.backgroundColor = "#FF5252";
            document.getElementById("bottone").disabled = true;
        } else {
            document.getElementById("bottone").disabled = false;
            casella.style.backgroundColor = "#69F0AE";
        }
    }

}