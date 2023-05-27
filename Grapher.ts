import { EdgePosition, VertexPosition, VertexPositions } from "./interfaces";

class Grapher {
  private canvas: HTMLCanvasElement;
  private renderingContext: CanvasRenderingContext2D;
  private vertexPositions: VertexPositions = [];
  private vertices: number[];
  private verticesNumber: number;
  private angleIncrement: any;
  private graph: any;
  private points: any = [];
  private edges: any = [];

  constructor(selector: string, verticesNumber: number, graph: any[], vertices: number[]) {
    this.canvas = document.querySelector(selector);
    this.verticesNumber = verticesNumber;
    this.angleIncrement = 2 * Math.PI / this.verticesNumber;
    this.graph = graph;
    this.vertices = vertices;

    this.getRenderingContext();
  }

  public newGraph(verticesNumber: number, graph: any[], vertices: number[]) {
    this.verticesNumber = verticesNumber;
    this.angleIncrement = 2 * Math.PI / this.verticesNumber;
    this.graph = graph;
    this.points = [];
    this.edges = [];
    this.vertices = vertices;
    this.start();
  }

  private getRenderingContext(): void {
    this.renderingContext = this.canvas.getContext("2d");

    if (!this.renderingContext) {
      console.log(new Error("Couldnt get rendering context."));
    }

    this.start();
  }

  private start() {
    try {
        this.draw();
        this.addVertex(1);
    } catch (err) {
        alert("Błąd w danych.")
        location.reload();
    }
  }

  private addVertex(vertexKey: number) {
    if (!this.vertices.includes(vertexKey)) {
        alert('Graf jest niepoprawny, rozłączny, lub nazwy wierzchołków nie następują po sobie.');
        throw new Error('Graf jest niepoprawny, rozłączny, lub nazwy wierzchołków nie następują po sobie.');
    }
    const angle = (vertexKey - 1) * this.angleIncrement;
    const x = 120 * Math.cos(angle) + 300 + Math.random() * 20;
    const y = 120 * Math.sin(angle) + 200 + Math.random() * 20;

    this.points.push({x: x, y: y, number: vertexKey});
    this.vertexPositions[vertexKey] = {x: x, y: y, number: vertexKey};

    vertexKey++;

    if (vertexKey <= this.verticesNumber) {
      setTimeout(this.addVertex.bind(this, vertexKey), 500);
    } else {
      this.addEdge(0);
    }
  }

  private addEdge(edgeKey: number) {
    const edge = this.graph[edgeKey];
    const firstVertex = this.vertexPositions[edge.firstVertex];
    const secondVertex = this.vertexPositions[edge.secondVertex];

    this.edges.push({
      from: { x: firstVertex.x, y: firstVertex.y },
      to: { x: secondVertex.x, y: secondVertex.y },
      weight: edge.weight,
    });

    edgeKey++;
    if (edgeKey < this.graph.length) {
      setTimeout(this.addEdge.bind(this, edgeKey), 500);
    }
  }

  private draw() {
    this.renderingContext.clearRect(0, 0, 600, 600);

    this.edges.forEach((edge: EdgePosition) => {
      this.renderingContext.moveTo(edge.from.x, edge.from.y);
      this.renderingContext.lineTo(edge.to.x, edge.to.y);
      this.renderingContext.font = "16px serif";
      this.renderingContext.stroke();

      this.renderingContext.beginPath();
      this.renderingContext.arc((edge.from.x + edge.to.x) / 2, (edge.from.y + edge.to.y) / 2, 10, 0, 2 * Math.PI);
      this.renderingContext.fillStyle = 'white';
      this.renderingContext.fill();
      this.renderingContext.stroke();
      this.renderingContext.fillStyle = 'black';
      this.renderingContext.fillText(`${edge.weight}`, (edge.from.x + edge.to.x) / 2, (edge.from.y + edge.to.y) / 2);
    });

    this.points.forEach((point: VertexPosition, j: number) => {
      this.renderingContext.beginPath();
      this.renderingContext.fillStyle = "white";
      this.renderingContext.arc(point.x, point.y, 20, 0, 2 * Math.PI);
      this.renderingContext.fill();
      this.renderingContext.stroke();

      this.renderingContext.fillStyle = "black";
      this.renderingContext.font = "24px serif";
      this.renderingContext.strokeStyle = "black";
      this.renderingContext.textAlign = "center";
      this.renderingContext.textBaseline = "middle";
      this.renderingContext.fillText(`${point.number}`, point.x, point.y);
      this.renderingContext.stroke();
    });

    window.requestAnimationFrame(this.draw.bind(this));
  }
}

export default Grapher;
