#!/usr/bin/env npx ts-node --esm
console.log("executed worked");

type Person = {
	name: string;
	age: number;
};

const newPerson: Person = {
	name: "Sarah",
	age: 23,
};

console.log(newPerson.name);
