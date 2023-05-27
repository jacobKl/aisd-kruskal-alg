import { Edge } from './interfaces';
import Graph from './Graph';
import Kruskal from './Kruskal';

const edges: Edge[] = [
    { firstVertex: 1, secondVertex: 5, weight: 1},
    { firstVertex: 1, secondVertex: 2, weight: 3},
    { firstVertex: 2, secondVertex: 5, weight: 4},
    { firstVertex: 2, secondVertex: 3, weight: 5},
    { firstVertex: 3, secondVertex: 5, weight: 6},
    { firstVertex: 5, secondVertex: 4, weight: 7},
    { firstVertex: 3, secondVertex: 4, weight: 2},
];

const graph = new Graph(edges);
const kruskal = new Kruskal();

const msp = kruskal.findMinimalSpanningTree(graph.getVertices(), graph.getEdges());

