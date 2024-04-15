'use strict';

// const Person = function(firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// }
// new Person('Ricardo', 1997);

// const juan = new Person.prototype.constructor('Juan', '1998');


// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   set fullName(name) {
//     this._fullName = name;
//   }

//   get fullName() {
//     return this._fullName;
//   }
  
// }

// const ricardo = new PersonCl('Ricardo', 1997)
// console.log('aver ricardo ', ricardo);


function Person(fullName, birthYear) {
  this.fullName = fullName;
  this.birthYear = birthYear;
}






///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// const Car = function(maker, speed) {
//   this.maker = maker;
//   this.speed = speed;
// }
// Car.prototype.accelerate = function() {
//   this.speed += 10;
// }
// Car.prototype.brake = function() {
//   this.speed -= 5;
// }

// const car1 = new Car('BMW', 120);
// const car2 = new Car('Mercedes', 95);

// console.log('aver car1 ', car1);
// car1.accelerate()
// console.log('aver car1.speed ', car1.speed);
// car1.brake()
// console.log('aver car1.speed ', car1.speed);


// console.log('aver car2 ', car2);
// car2.accelerate()
// console.log('aver car2.speed ', car2.speed);
// car2.brake()
// console.log('aver car2.speed ', car2.speed);


///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// const Car = function(maker, speed) {
//   this.maker = maker;
//   this.speed = speed;
// }
// Car.prototype.accelerate = function() {
//   this.speed += 10;
// }
// Car.prototype.brake = function() {
//   this.speed -= 5;
// }


// const Ev = function(maker, speed, charge){
//   Car.call(this, maker, speed);
//   this.charge = charge;
// }
// Ev.prototype = Object.create(Car.prototype);

// Ev.prototype.chargeBattery = function(chargeTo) {
//   this.charge = chargeTo;
// }
// Ev.prototype.accelerate = function() {
//   this.speed += 20;
//   this.charge--;
//   console.log(`${this.maker} going at ${this.speed} km/h, with a charge of 22%`);
// }

// const tesla = new Ev('Tesla', 100, 90);

// console.log('aver tesla ', tesla);
// tesla.brake();
// console.log('aver tesla ', tesla);
// tesla.accelerate();
// console.log('aver tesla ', tesla);


///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/


class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(maker, speed, charge) {
    super(maker, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log('Charged to:', this.#charge);
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(`${this.maker} going at ${this.speed} km/h, with a charge of 22%`);
    return this;
  }
}

const rivian = new EVCl('Rivian', 100, 90);

console.log('aver rivian ', rivian.chargeBattery(10).accelerate().chargeBattery(50).accelerate());

