import { Edge } from "./interfaces";

class Kruskal {
  private map: any; // problem with map type (?)

  constructor() {
    this.map = new Map();
  }

  public findMinimalSpanningTree(vertices: number[], edges: Edge[]) {
    const minimalSpanningTree: any = [];

    vertices.forEach((vertex) => {
      this.map.set(vertex, vertex);
    });

    edges.forEach((edge) => {
      const { firstVertex, secondVertex } = edge;
      const firstParent = this.findRootParent(firstVertex);
      const secondParent = this.findRootParent(secondVertex);

      if (firstParent != secondParent) {
        minimalSpanningTree.push(edge);
        this.unionSubsets(firstParent, secondParent);
      }
    });

    return minimalSpanningTree;
  }

  private unionSubsets(firstVertex: number, secondVertex: number): void {
    const firstVertexParent = this.findRootParent(firstVertex);
    const secondVertexParent = this.findRootParent(secondVertex);
    this.map.set(secondVertexParent, firstVertexParent);
  }

  private findRootParent(vertex: number): number {
    if (this.map.get(vertex) === vertex) {
      return vertex;
    }
    return this.findRootParent(this.map.get(vertex));
  }
}

export default Kruskal;
