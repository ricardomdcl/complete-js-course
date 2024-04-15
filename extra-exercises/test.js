// function sumadoraDeHoras(str) {
//   let totalHours = 0;
//   let totalMinutes = 0;
//   str.split('+').forEach(item => {
//     let [hours, minutes = '0'] = item.split('.');
//     hours ||= '0'; 
//     minutes ||= '0'; 

//     totalHours+= parseInt(hours);
//     totalMinutes += parseInt(minutes); 
//     totalHours += parseInt(totalMinutes) / 60 > 1 && Math.floor(parseInt(totalMinutes) / 60);
//     totalMinutes = parseInt(totalMinutes) % 60;
//   });
//   return `${totalHours} : ${totalMinutes}`;
// }

// console.log(sumadoraDeHoras('2.37+6.8+3.15+5.18+4.10+3.59+5.1+3.50+8.23+.59'));



// console.log(sumadoraDeHoras('6.8+3.15+5.18+4.10+3.59+5.1+3.50+8.23+.59'));
// console.log(sumadoraDeHoras('3.15+5.18+4.10+3.59+5.1+3.50+8.23+.59'));





// function Vehiculo(ruedas) {
//   this.ruedas = ruedas;
//   this.velocidad = 0;
// }
// Vehiculo.prototype.acelerar = function() {
//   this.velocidad += 10;
//   console.log('La velocidad del vehiculo al acelerar es de: ', this.velocidad);
// }
// Vehiculo.prototype.frenar = function() {
//   this.velocidad -= 10;
//   console.log('La velocidad del vehiculo al frenar es de: ', this.velocidad); 
// }

// function Carro(gasolina) {
//   Vehiculo.call(this, 4);
//   this.gasolina = gasolina;
//   Vehiculo.prototype.acelerar = function() {
//     this.velocidad += 10;
//     --this.gasolina;
//     console.log(`La velocidad del vehiculo al acelerar es de: ${this.velocidad} y el nivel de gasolina restante es de ${this.gasolina}`);
//   }
// }
// Carro.prototype = Object.create(Vehiculo.prototype);
// Carro.tiene4Llantas = function(vehiculo) {
//   return vehiculo.ruedas === 4;
// }

// const mazda = new Carro(100);

// console.log('aver mazda ', mazda);

// mazda.acelerar();
// mazda.acelerar();
// mazda.acelerar();
// mazda.acelerar();
// mazda.frenar();
// mazda.frenar();

// console.log('aver mazda ', mazda);




// class Animal {
//   constructor(patas, clasificacion) {
//     this.patas = patas;
//     this.clasificacion = clasificacion;
//   }
//   comer() {
//     console.log('El animal esta comiendo');
//   }
// }

// const animalGenerico = new Animal(4, 'herviboro');

// class Perro extends Animal  {
//   constructor(patas, clasificacion, nombre, raza) {
//     super(patas, clasificacion);
//     this.nombre = nombre;
//     this.raza = raza;
//   }
//   ladra() {
//     console.log(`${this.nombre} está ladrando`);
//   }
// }

// const firu = new Perro(4, 'herviboro', 'Firulais', 'doberman');

// console.log('aver firu ', firu);
// firu.ladra()



// const AnimalProto = {
//   init(patas, tipo) {
//     this.patas = patas;
//     this.tipo = tipo;
//   },
//   comer() {
//     console.log('El animal esta comiendo');
//   }
// }

// const animalGenerico = Object.create(AnimalProto)


// animalGenerico.init(4, 'herviboro');

// const PerroProto = Object.create(AnimalProto);
// PerroProto.init = function(patas, tipo, nombre, raza) {
//   AnimalProto.init.call(this, patas, tipo);
//   this.nombre = nombre;
//   this.raza = raza;
// }

// PerroProto.ladra = function() {
//   console.log(`${this.nombre} está ladrando`);
// }

// const firulais = Object.create(PerroProto);


// console.log('aver firulais ', firulais);

// firulais.init(4, 'omnivoro', 'firulais', 'ratonero');

// console.log('aver firulais ', firulais);

// firulais.comer();
// firulais.ladra();


