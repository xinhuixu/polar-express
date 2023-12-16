// src/EquationParser.js

export const parseEquation = (equation) => {
    // Circle: r = a
    if (equation.match(/^r = -?\d+$/)) {
        const a = parseInt(equation.split(" = ")[1]);
        return (theta) => a;
    }

    // Polar Circle: r = a * cos(θ) or r = a * sin(θ)
    if (equation.match(/^r = -?\d+ \* (cos|sin)\(θ\)$/)) {
        const [a, func] = equation.substring(4).split(" * ");
        const multiplier = parseInt(a);
        const isCosine = func.includes("cos");
        return (theta) => multiplier * (isCosine ? Math.cos(theta) : Math.sin(theta));
    }

    // Limacon: r = a + b * cos(θ) or r = a + b * sin(θ)
    if (equation.match(/^r = -?\d+ \+ -?\d+ \* (cos|sin)\(θ\)$/)) {
        const parts = equation.substring(4).split(" + ");
        const a = parseInt(parts[0]);
        const [b, func] = parts[1].split(" * ");
        const multiplier = parseInt(b);
        const isCosine = func.includes("cos");
        return (theta) => a + multiplier * (isCosine ? Math.cos(theta) : Math.sin(theta));
    }

    // Rose: r = a * cos(bθ) or r = a * sin(bθ)
    if (equation.match(/^r = \d+ \* (cos|sin)\(-?\d+θ\)$/)) {
        const [a, func] = equation.substring(4).split(" * ");
        const multiplier = parseInt(a);
        const frequency = parseInt(func.match(/\((-?\d+)θ\)/)[1]);
        const isCosine = func.includes("cos");
        return (theta) => multiplier * (isCosine ? Math.cos(frequency * theta) : Math.sin(frequency * theta));
    }

    // Lemniscate: r^2 = a^2 * cos(2θ) or r^2 = a^2 * sin(2θ)
    if (equation.match(/^r\^2 = \d+\^2 \* (cos|sin)\(2θ\)$/)) {
        const a = parseInt(equation.split("^2")[0].substring(4));
        const isCosine = equation.includes("cos");
        return (theta) => {
            const rSquared = a * a * (isCosine ? Math.cos(2 * theta) : Math.sin(2 * theta));
            return Math.sqrt(Math.abs(rSquared)); // sqrt of absolute value to handle negative r^2
        };
    }

    // Spiral: r = aθ
    if (equation.match(/^r = -?\d+θ$/)) {
        const a = parseInt(equation.split(" = ")[1].replace("θ", ""));
        return (theta) => a * theta;
    }

    // Default case if equation format is not recognized
    return null;
};
