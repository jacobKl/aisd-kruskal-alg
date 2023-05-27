import { Edge } from "./interfaces";


class Graph {
  private edges: Edge[] = [];
  private vertices: number[] = [];

  constructor(edges: Edge[]) {
    this.edges = edges;

    this.sortEdgesByWeight();
    this.extractVertices();
  }

  public getVertices(): number[] {
    return this.vertices;
  }

  getEdges(): Edge[] {
    return this.edges;
  }

  private sortEdgesByWeight(): void {
    this.edges = this.edges.sort((first: Edge, second: Edge) => first.weight - second.weight);
  }

  private extractVertices() {
    this.edges.forEach((edge) => {
      if (!this.vertices.includes(edge.firstVertex)) this.vertices.push(edge.firstVertex);

      if (!this.vertices.includes(edge.secondVertex)) this.vertices.push(edge.secondVertex);
    });

    this.vertices.sort((first, second) => first - second);
  }
}

export default Graph;
