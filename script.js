/*
if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {

}
*/


// Funcão para detectar a colisão
const colide = {
    jogador: null,
    wall: [],
    verificarColisao: function() {
      
      let Colidiu = false;
      for (let i = 0; i < this.wall.length; i++) {
        const DivAtual = this.wall[i];
        if (DivAtual.position.left < this.jogador.position.left + this.jogador.position.width &&
        DivAtual.position.left + DivAtual.position.width > this.jogador.position.left &&
        DivAtual.position.top < this.jogador.position.top + this.jogador.position.height &&
        DivAtual.position.height + DivAtual.position.top > this.jogador.position.top) {
          Colidiu = true;
          if (!this.jogador.ref.classList.contains('estadoColidiu')) {
            this.jogador.ref.classList.add('estadoColidiu');        
            
            exibeMensagem("Bateu! Aperte F5!")            
            
           
            
          }
          
        } else if (this.jogador.ref.classList.contains('estadoColidiu') && !Colidiu) {

            this.jogador.ref.classList.remove('estadoColidiu');    
        }
        
      }
      
    },
    
  
  };
  
  class BaseDiv {
    constructor(position) {
      this.position = position;
    }
  }
  
  class MoveDiv extends BaseDiv {
    constructor(position, ref) {
      super(position);
      this.ref = ref;
    }
    shiftPosition(x, y) {
      this.position.left += x;
      this.position.top += y;
      this.reDraw();
      this.colvalidarVitoria ()
    }
    reDraw() {
      this.ref.setAttribute('style', `left: ${this.position.left}px; top: ${this.position.top}px`);
      
      colide.verificarColisao();
      
    }




  }
  
  function moveDiv(e) {
    switch(e.which) {
      case 37: //esquerda
        colide.jogador.shiftPosition(-40, 0);
        break;
      case 38: //top
        colide.jogador.shiftPosition(0, -40);
        break;
      case 39: //direita
        colide.jogador.shiftPosition(40, 0);
        break;
      case 40: //Down
        colide.jogador.shiftPosition(0, 40);
        break;
      default:
        console.log('Tecla Inválida!');
        break;
    }


  }
  
  // Gerar a posição do retângulo;
  function GerarPosicao(DivAtual) {
    return {
      left: DivAtual.getBoundingClientRect().left,
      top: DivAtual.getBoundingClientRect().top,
      height: DivAtual.getBoundingClientRect().height,
      width: DivAtual.getBoundingClientRect().width
    };
  }
  
  // verificar colisão;
  (() => {
    const walls = document.querySelectorAll('.wall');
    for (let i = 0; i < walls.length; i++) {
      const DivAtual = walls[i];
      if (DivAtual.dataset.dynamic === 'true') {
        const jogador = new MoveDiv(GerarPosicao(DivAtual), DivAtual);
        colide.jogador = jogador;
        
      } else {
        const staticDiv = new BaseDiv(GerarPosicao(DivAtual));
        colide.wall.push(staticDiv);
      }
    }
    document.addEventListener('keydown', (e) => moveDiv(e));

    
  })();

  function exibeMensagem(msg){
    document.querySelector('#msg').innerHTML = msg;
  }


  
  function validarVitoria (){
    if ((position.left === 854.796875 + "px") && (position.top == 425.234375 + "px")) {

      exibeMensagem("Parabéns Venceu!")

    }
  }




  
 