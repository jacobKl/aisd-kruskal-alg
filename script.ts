import { Edge } from './interfaces';
import Graph from './Graph';
import Kruskal from './Kruskal';
import Grapher from './Grapher';

declare global {
    interface Window {
      Grapher: Grapher
    }
  }

const basicGraph = [
  { firstVertex: 1, secondVertex: 5, weight: 1},
  { firstVertex: 1, secondVertex: 2, weight: 3},
  { firstVertex: 2, secondVertex: 5, weight: 4},
  { firstVertex: 2, secondVertex: 3, weight: 5},
  { firstVertex: 3, secondVertex: 5, weight: 6},
  { firstVertex: 5, secondVertex: 4, weight: 7},  
  { firstVertex: 3, secondVertex: 4, weight: 2},
];

const edges: Edge[] = basicGraph;

const graph = new Graph(edges);

const kruskal = new Kruskal();

const msp = kruskal.findMinimalSpanningTree(graph.getVertices(), graph.getEdges());

const grapher = new Grapher("#canvas", graph.getVertices().length, msp, graph.getVertices());
const preview = new Grapher("#preview", graph.getVertices().length, graph.getEdges(), graph.getVertices());

const input: HTMLTextAreaElement = document.querySelector('.graph-input');
const inputSubmit = document.querySelector('.graph-submit');

input.value = JSON.stringify(basicGraph);

inputSubmit.addEventListener('click', function () {
  const json = JSON.parse(input.value);
  const graph = new Graph(json);

  const msp = kruskal.findMinimalSpanningTree(graph.getVertices(), graph.getEdges());
  grapher.newGraph(graph.getVertices().length, msp, graph.getVertices());

  preview.newGraph(graph.getVertices().length, graph.getEdges(), graph.getVertices());
})