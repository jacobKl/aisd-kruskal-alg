import { Edge } from "./interfaces";
import Graph from "./Graph";
import Kruskal from "./Kruskal";
import Grapher from "./Grapher";

declare global {
  interface Window {
    Grapher: Grapher;
  }
}

const kruskal = new Kruskal();

const grapher = new Grapher("#canvas");
const preview = new Grapher("#preview");

const addEdge = document.querySelector(".add-edge");
const edgesWrapper = document.querySelector(".edges");
const deleteEdge = document.querySelectorAll(".delete");

const createEdge = () => {
  const edge = document.createElement("div");
  edge.classList.add("row", "my-2", "single-edge");
  edge.innerHTML = `
        <div class="col-12 col-md-3"><input class="form-control" type="number" placeholder="Pierwszy wierzchołek"></div>
        <div class="col-12 col-md-3"><input class="form-control" type="number" placeholder="Drugi wierzchołek"></div>
        <div class="col-12 col-md-3"><input class="form-control" type="number" placeholder="Waga krawędzi"></div>
        <button class="btn btn-danger col-12 col-md-3 delete">X</button>
    `;

  return edge;
};

deleteEdge.forEach((button) => button.addEventListener('click', () => {
  button.closest(".single-edge").remove()
}));

const getEdges = (): Edge[] => {
  const edges: Edge[] = [];

  edgesWrapper.querySelectorAll(".single-edge").forEach((edge) => {
    const [firstVertex, secondVertex, weight]: number[] = Array.from(edge.querySelectorAll("input")).map((input) => parseInt(input.value));
    if (firstVertex == 0 || secondVertex == 0 || weight == 0) return null;
    if (!firstVertex || !secondVertex || !weight) return null;
    edges.push({ firstVertex, secondVertex, weight });
  });

  return edges;
};

addEdge.addEventListener("click", () => {
  const edge = createEdge();
  edgesWrapper.appendChild(edge);
});

const drawPreviewButton = document.querySelector(".draw-preview");
const drawMspButton = document.querySelector(".draw-msp");

drawPreviewButton.addEventListener("click", () => {
  const edges = getEdges();
  if (!edges) return;
  const graph = new Graph(edges);
  preview.newGraph(graph.getEdges(), graph.getVertices());
});

drawMspButton.addEventListener("click", () => {
  const edges = getEdges();
  if (!edges) {
    alert("Podaj poprawne dane.");
  }
  const graph = new Graph(edges);
  const msp = kruskal.findMinimalSpanningTree(graph.getVertices(), graph.getEdges());
  grapher.newGraph(msp, graph.getVertices());
});
