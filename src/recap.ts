const myName = 'Ignacio';
const myAge = 29;
const suma = (a: number, b: number) => {
  return a + b;
};
suma(12, 25);

class Persona {
  constructor(private age: number, private name: string) {}

  getSummary() {
    return `My name is ${this.name}, ${this.age}`;
  }
}

const ignacio = new Persona(29, 'Ignacio');
ignacio.getSummary();
