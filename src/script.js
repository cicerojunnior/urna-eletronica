let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')



let etapaAtual = 0
let numero = ''
let votoBranco = false
let votos = []
let votoConfirmado = false

function comecarEtapa() {
    let etapa = etapas[etapaAtual]

    let numeroHMTL = ''
    numero = ''
    votoBranco = false
    votoConfirmado = false

    for(let i=0;i<etapa.numeros;i++) {
        if(i === 0) {
            numeroHMTL += '<div class="numero pisca"></div>'
        } else {
            numeroHMTL += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHMTL
}
function atualizaInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true
        } else {
            return false
        }
    })
    
    if(candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidato.nome}<br/> Partido: ${candidato.partido}`

        let fotosHMTL = ''
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHMTL += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" />${candidato.fotos[i].legenda} </div>`
            } else {
                fotosHMTL += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" />${candidato.fotos[i].legenda} </div>`
            }
        }
        lateral.innerHTML = fotosHMTL
    } else {
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = '<div class="aviso--grande pisca"> VOTO NULO </div>'
    }
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca')
    if(elNumero !== null) {
        elNumero.innerHTML = n
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca')
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizaInterface()
        }
    }
}
function branco() {
    numero = ''
    votoBranco = true
    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block'
    numeros.innerHTML = ''
    lateral.innerHTML = ''
    descricao.innerHTML = '<div class="aviso--grande pisca"> VOTO EM BRANCO </div>'
}
function corrige() {
    if(votoConfirmado === false) {
        comecarEtapa()
    }
}
function confirma() {
    if(votoConfirmado === false) {
        let etapa = etapas[etapaAtual]
    
        if(votoBranco === true) {
            votoConfirmado = true
            votos.push({
                etapa: etapas[etapaAtual].titulo,
                voto: 'branco'
            })
        } else if(numero.length === etapa.numeros) {
            votoConfirmado = true
            votos.push({
                etapa: etapas[etapaAtual].titulo,
                voto: numero
            })
        }  
        if(votoConfirmado) {
            etapaAtual++
            if(etapas[etapaAtual] !== undefined) {
                comecarEtapa()
            } else {
                document.querySelector('.tela').innerHTML = '<div class="aviso--gigante"> FIM </div>'
                console.log(votos)
            }
        }
    }
}
comecarEtapa()