M.AutoInit();

/*$(document).ready(function(){
    $('.tabs').tabs({swipeable: true, responsiveThreshold: "800px"});
    
  });*/


/* //função para esconder todos os conteúdos
$('.imgContent').hide();

//função para exibir o conteúdo da selecionado da exposição
$('.dataToggle').click(function() {
  $('.imgContent').hide();
  $("#" + $(this).data("img")).show();
}); 

//função para alterar imagem do icone da exposição
$('.icone').click(function() {
    $('.icone').attr('src', 'icones/exp-icone.png')
    document.getElementById(this.id).src = "icones/exp-icone-ativo.png"
  }); */

var count = 0;

//Pega todas as tags de audio
const audioPlay = document.querySelectorAll('audio');

function pausarTodos(){
  for (i = 0; i < audioPlay.length; i++) {
  audioPlay[i].pause();
  audioPlay[i].currentTime = 0;
  audioPlay[i].nextElementSibling.style.backgroundColor = '#004586';
  audioPlay[i].nextElementSibling.style.color = '#ffffff';
  audioPlay[i].nextElementSibling.firstChild.innerHTML = "play_arrow";
  }
}

function playPause(audio, icone, botaoPlay, barra, inicio, fim) {
    var audio = document.getElementById(audio);
    var icone = document.getElementById(icone);
    var botao = document.getElementById(botaoPlay);
    var barra = document.getElementById(barra);

    let duracaoMusica = document.querySelector(fim);
    duracaoMusica.textContent = segundosParaMinutos(Math.floor(audio.duration));

    function atualizarBarra(){
        let barrinha = barra.style.width = Math.floor((audio.currentTime / audio.duration) * 100) + '%';
        let tempoDecorrido = document.querySelector(inicio);
        tempoDecorrido.textContent = segundosParaMinutos(Math.floor(audio.currentTime));
        if (barrinha == "100%") {
            barra.style.width = "0%";
            audio.currentTime = 0;
            icone.innerHTML = "play_arrow"
            botao.style.backgroundColor = '#004586'
            botao.style.color = '#ffffff'
        }
    }

    function segundosParaMinutos(segundos) {
        let campoMinutos = Math.floor(segundos / 60);
        let campoSegundos = segundos % 60;
        if (campoSegundos < 10) {
            campoSegundos = '0' + campoSegundos;
        }

        return campoMinutos + ':' + campoSegundos;
    }

    if(audio.currentTime === 0) {
        pausarTodos()
        audio.play();
        icone.innerHTML = "stop"
        botao.style.backgroundColor = '#E5E5E5'
        botao.style.color = '#004586'
        audio.addEventListener('timeupdate', atualizarBarra)
        
        
    } else{
        audio.pause();
        audio.currentTime = 0;
        icone.innerHTML = "play_arrow"
        botao.style.backgroundColor = '#004586'
        botao.style.color = '#ffffff'
    }
    
}

function playPauseSemBarra(audio, icone, botaoPlay) {
    var audio1 = document.getElementById(audio);
    var icone1 = document.getElementById(icone);
    var botao1 = document.getElementById(botaoPlay);

    if(audio1.currentTime === 0) {
        pausarTodos();
        audio1.play();
        icone1.innerHTML = "stop"
        botao1.style.backgroundColor = '#E5E5E5'
        botao1.style.color = '#004586'
    } else{
        audio1.pause();
        audio1.currentTime = 0;
        icone1.innerHTML = "play_arrow"
        botao1.style.backgroundColor = '#004586'
        botao1.style.color = '#ffffff'
    }
}

function inserirTexto(texto, botao){
    var div = document.getElementById(texto);
    var btn = document.getElementById(botao);
    var transicao, t;
    clearInterval(transicao);

    if (div.style.display === 'block') {
        btn.style.backgroundColor = '#004586'
        btn.style.color = '#ffffff'
        var x = .9;
        t = true;
        

    } else {
        div.style.opacity = '0'
        div.style.display = 'block'
        btn.style.backgroundColor = '#E5E5E5'
        btn.style.color = '#004586'
        var x = .1;

    }

    transicao = setInterval(function(){
        div.style.opacity = x;
        
        x+= t ? -.1 : .1;
        if( (x >= 1 && !t) || (x <= 0 && t)){
           clearInterval(transicao);
           if(x <= 0) div.style.display = 'none';
        }
     }, 50);
  
}

function esconderTexto (texto) {
    let textoExp = document.getElementById(texto);
    textoExp.style.display = 'none';
}

function toggleFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  $(document).ready(function(){

    // set the image-map width and height to match the img size
    $('#image-map').css({'width':$('#image-map img').width(),
                      'height':$('#image-map img').height()
    })
    
    //tooltip direction
    var tooltipDirection;
                 
    for (i=0; i<$(".pin").length; i++)
    {               
        // set tooltip direction type - up or down             
        if ($(".pin").eq(i).hasClass('pin-down')) {
            tooltipDirection = 'tooltip-down';
        } else {
            tooltipDirection = 'tooltip-up';
            }
    
        // append the tooltip
        $("#image-map").append("<div style='left:"+$(".pin").eq(i).data('xpos')+"px;top:"+$(".pin").eq(i).data('ypos')+"px' class='" + tooltipDirection +"'>\
                                            <div class='tooltip'>" + $(".pin").eq(i).html() + "</div>\
                                    </div>");
    }    
    
    // show/hide the tooltip
    $('.tooltip-up, .tooltip-down').mouseenter(function(){
                $(this).children('.tooltip').fadeIn(100);
            }).mouseleave(function(){
                $(this).children('.tooltip').fadeOut(100);
            })
});

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}


