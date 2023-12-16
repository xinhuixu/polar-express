// src/PolarGraph.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { parseEquation } from './EquationParser'

const PolarGraph = ({ equation }) => {
    const d3Container = useRef(null);

    useEffect(() => {
        if (d3Container.current && equation) {
            // Clear the existing SVG
            d3.select(d3Container.current).selectAll("*").remove();

            const svg = d3.select(d3Container.current);
            const width = 400, height = 400;
            
            // Parse the randomly generated equation and plot it
            const equationFunc = parseEquation(equation);
            if (equationFunc) {
                plotGraph(svg, equationFunc, width, height);
            }
        }
    }, [equation]);

    return (
        <svg
            className="d3-component"
            width={400}
            height={400}
            ref={d3Container}
        />
    );
};

const plotGraph = (svg, equationFunc, width, height) => {
    const centerX = width / 2;
    const centerY = height / 2;

    // Create a group element for the graph
    const g = svg.append("g")
                .attr("transform", `translate(${centerX}, ${centerY})`);
    // Define the scale for the graph
    // This scale is used for positive values of r; negative values are handled in the conversion
    const rScale = d3.scaleLinear()
                     .domain([0, 10]) 
                     .range([0, centerX]);

    // Generate points for the graph
    const points = [];
    const stepSize = 0.005;  // Smaller step size for higher resolution
    for (let theta = 0; theta < 4 * Math.PI; theta += stepSize) {
        const r = equationFunc(theta);
        // Apply scaling only to the magnitude of r
        const scaledR = r >= 0 ? rScale(r) : -rScale(-r);
        const x = scaledR * Math.cos(theta);
        const y = scaledR * Math.sin(theta);
        points.push([x, -y]); // Invert y to accommodate SVG's coordinate system
    }

    // Plot the points
    g.selectAll(".point")
     .data(points)
     .enter()
     .append("circle")
     .attr("class", "point")
     .attr("cx", d => d[0])
     .attr("cy", d => d[1])
     .attr("r", 1)
     .attr("fill", "white");


    // Add x-axis
    svg.append("line")
    .attr("x1", centerX)
    .attr("y1", 0)
    .attr("x2", centerX)
    .attr("y2", height)
    .attr("stroke", "gray")
    .attr("stroke-width", 1);

 // Add y-axis
 svg.append("line")
    .attr("x1", 0)
    .attr("y1", centerY)
    .attr("x2", width)
    .attr("y2", centerY)
    .attr("stroke", "gray")
    .attr("stroke-width", 1);
};


export default PolarGraph;
