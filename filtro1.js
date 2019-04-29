function main() {
  console.log("En main()")

  //-- Acceso al objeto con la imagen
  var img = document.getElementById('imagesrc')

  //-- Acceso al objeto con el canvas
  var canvas = document.getElementById('display');

  //-- Acceso al rojo verde azul y transparencia
  rojo = document.getElementById('rojo')
  verde = document.getElementById('verde')
  azul = document.getElementById('azul')
  trans = document.getElementById('trans')
  //Acceso a los botones de los filtros de color y grises.
  gris = document.getElementById('gris');
  colores = document.getElementById('colores');
  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;
  //-- Obtener el contexto del canvas para
  //-- trabajar con el
  var ctx = canvas.getContext("2d");
  var img_original = img;
  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);
  var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //-- estado inicial
  var estado = 'inicial';
  function print_img(data){

    umbral_rojo = rojo.value
    umbral_verde = verde.value
    umbral_azul = azul.value
    umbral_trans = trans.value
    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbral_rojo){
        data[i] = umbral_rojo;
      }
      if (data[i+1] > umbral_verde){
        data[i+1] = umbral_verde;
      }
      if (data[i+2] > umbral_azul){
        data[i+2] = umbral_azul;
      }
      if (data[i+3] > umbral_trans){
        data[i+3] = umbral_trans;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  function filtro(estado){
   if ( estado == 'color') {
     ctx.drawImage(img_original, 0,0);
     //-- Funcion de retrollamada del rojo
     rojo.oninput = () => {
       //-- Situar la imagen original en el canvas
       //-- No se han hecho manipulaciones todavia
       ctx.drawImage(img, 0,0);
       //-- Obtener la imagen del canvas en pixeles
       var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
       //-- Obtener el array con todos los píxeles
       var data = imgData.data
       print_img(data);
       //-- Poner la imagen modificada en el canvas
       ctx.putImageData(imgData, 0, 0);
     }
     verde.oninput = () => {
       ctx.drawImage(img, 0,0);
       var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
       var data = imgData.data
       print_img(data)
       ctx.putImageData(imgData, 0, 0);
     }
     azul.oninput = () => {
       ctx.drawImage(img, 0,0);
       var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
       var data = imgData.data
       print_img(data)
       ctx.putImageData(imgData, 0, 0);
     }
     trans.oninput = () => {
       ctx.drawImage(img, 0,0);
       var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
       var data = imgData.data
       print_img(data)
       ctx.putImageData(imgData, 0, 0);
     }

   } else {
     ctx.drawImage(img, 0,0);
     var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
     var data = imgData.data;
     for (var i = 0; i < data.length; i+=4) {
       var r = data[i];
       var g = data[i+1];
       var b = data[i+3];
       brillo = (3 * r + 4 * g + b)/8
       data[i] = data[i+1] = data[i+2] = brillo;
     }
     ctx.putImageData(imgData, 0, 0);
   }
  }

  colores.onclick=()=>{
    rojo.value = 255;
    azul.value = 255;
    verde.value = 255;
    trans.value = 255;
    estado = 'color';
    filtro(estado);
    document.getElementById('deslizadores').style.display = 'block';
  }
  gris.onclick=()=>{
    estado = 'gris';
    filtro(estado);
    document.getElementById('deslizadores').style.display = 'none';
  }
}
