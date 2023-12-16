// src/PolarEquationGenerator.js
import React, { useState } from 'react';

// Circles centered at the origin; negative radius allowed
function generateCircle() {
    let a;
    do {
        a = Math.floor(Math.random() * 21) - 10;  // Random integer between -10 and 10
    } while (a === 0); // Ensure 'a' is not zero
    return `r = ${a}`;
}

function generatePolarCircle() {
    let a;
    do {
        a =  Math.floor(Math.random() * 21) - 10;  // Random integer between -10 and 10
    } while (a === 0); // Ensure 'a' is not zero
    // TODO: got r = 5 * sin(0theta)
    const func = Math.random() > 0.5 ? 'cos' : 'sin';
    return `r = ${a} * ${func}(θ)`;
}

// For limacons, both a and b can be negative or positive integers
function generateLimacon() {
    const a = Math.floor(Math.random() * 21) - 10;  
    let b;
    do {
        b = Math.floor(Math.random() * 21) - 10;  
    } while (b === 0); // Ensure 'b' is not zero
    const func = Math.random() > 0.5 ? 'cos' : 'sin';
    return `r = ${a} + ${b} * ${func}(θ)`;
}

// For roses, it's typical for a to be positive
function generateRose() {
    const a = Math.floor(Math.random() * 10) + 1;   
    const b = Math.floor(Math.random() * 21) - 10;  
    const func = Math.random() > 0.5 ? 'cos' : 'sin';
    return `r = ${a} * ${func}(${b}θ)`;
}

// For lemniscates, a is typically positive
function generateLemniscate() {
    const a = Math.floor(Math.random() * 10) + 1;   
    const func = Math.random() > 0.5 ? 'cos' : 'sin';
    return `r^2 = ${a}^2 * ${func}(2θ)`;
}

// Spirals can have a negative coefficient to represent a different spiraling direction.
function generateSpiral() {
    const a = Math.floor(Math.random() * 10) + 1;
    return `r = ${a}θ`;
}


export function generatePolarEquation() {
    const generators = [generateCircle, generatePolarCircle, generateLimacon, generateRose, generateLemniscate, generateSpiral];
    const randomIndex = Math.floor(Math.random() * generators.length);
    return generators[randomIndex]();
}


const PolarEquationGenerator = ( { equation }) => {
    console.log(equation)
    return <div>{equation}</div>;
};

export default PolarEquationGenerator;
