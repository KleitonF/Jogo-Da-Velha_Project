"use strict"
let square = document.querySelectorAll(".square")
let list_Combinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6],[1,4,7], [2,5,8], [8,5,2], [0,4,8], [2,4,6]]

//Mecanismo de jogo do player
for(let i=0; i< square.length; i++){
    square[i].addEventListener("click", function(e){
        let clss = square[i].classList[1]
        if(clss == 'N'){
            //console.log(e.target.innerHTML)
            e.target.innerHTML += "<img class='img' src='./assets/espada.png' alt='espada.png'>"
            square[i].classList.remove('N');
            square[i].classList.add('X');
            //Ao fim da jogada, aciona a vez da máquina.
            analisarPartida()
        }
    })
}

//Funções da Máquina
function analisarPartida(){

    // Analisando casas neutras N (analisar quais casa ainda estão disponíveis para jogar)
    let N = document.querySelectorAll(".N")
    let list_N = []
    for(let i of N){
        list_N.push(parseInt(i.textContent))
    }
    console.log(list_N)

    // Analisar casas do player X (analisar se uma das combinações do player estiver 2/3, caso sim, executar função jogadaDefensiva())
    let X = document.querySelectorAll(".X")
    let respX = selecionarCombinacao(X, list_N, list_Combinations)

    // Analisar casas da máquina O (analisar qual a melhor jogada para completar um combinação 3/3)
    let O = document.querySelectorAll(".O")
    let respO = selecionarCombinacao(O, list_N, list_Combinations)

    if(typeof respO != 'undefined'){
        return jogadaOfensiva(respO)
    }
    else if(typeof respX != 'undefined'){
        return jogadaDefensiva(respX)
    }else{
        return jogadaRandomica(list_N)
    }
}

function jogadaDefensiva(i){
//(impedir que o player complete uma combinação 3/3)
    square[i].innerHTML += "<img class='img' src='./assets/escudo.png' alt='escudo.png'>"
    square[i].classList.remove('N');
    return square[i].classList.add('O');
}

function jogadaOfensiva(i){
    console.log(square[i])
    square[i].innerHTML += "<img class='img' src='./assets/escudo.png' alt='escudo.png'>"
    square[i].classList.remove('N');
    return square[i].classList.add('O');   
}

function jogadaRandomica(list_N){
//(inicialmente, começar com uma jogada aleatória e depois tentar completar uma das combinações)
    if(list_N.length > 0){
        let n;
        while(typeof list_N[n] == 'undefined'){
            n = parseInt(Math.random()*10)
        }
        let i = list_N[n]
        square[i].innerHTML += "<img class='img' src='./assets/escudo.png' alt='escudo.png'>"
        square[i].classList.remove('N');
        return square[i].classList.add('O');
    }else{
        return
    }
}

function selecionarCombinacao(XO, list_N, list_Combinations){
    let list_XO = []
    for(let i of XO){
        list_XO.push(parseInt(i.textContent))
    }

    let n;
    let listCombS = []
    for(let comb of list_Combinations){
        let c0 = comb[0]
        let c1 = comb[1]
        let c2 = comb[2]
        for(let i of list_XO){
            if(c0 == i || c1 == i || c2 == i){
                n = i
                for(let i of list_XO){
                    if(c0 == i && c1 == n || c1 == i && c0 == n || c0 == i && c2 == n || c2 == i && c0 == n ||c2 == i && c1 == n || c1 == i && c2 == n){
                        listCombS.push(comb)
                        for(let i of list_N){
                            for(let comb of listCombS){
                                for(let i2 of comb){
                                    if(i == i2){
                                        console.log(comb)
                                        return i
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }
    }
}