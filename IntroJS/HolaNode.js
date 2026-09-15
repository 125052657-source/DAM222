
console.log("Hola Node.js");

let edad1 = 24;
let edad2 = 19;

console.log("Edad Promedio: ");
console.log((edad1 + edad2)/2);

/*Medir tiempo de un proceso*/
console.time("miProceso");
    for(let i=0; i< 1000000000; i++){}
console.timeEnd("miProceso");
