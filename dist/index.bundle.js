/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Graph.ts":
/*!******************!*\
  !*** ./Graph.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Graph = /** @class */ (function () {\n    function Graph(edges) {\n        this.edges = [];\n        this.vertices = [];\n        this.edges = edges;\n        this.sortEdgesByWeight();\n        this.extractVertices();\n    }\n    Graph.prototype.getVertices = function () {\n        return this.vertices;\n    };\n    Graph.prototype.getEdges = function () {\n        return this.edges;\n    };\n    Graph.prototype.sortEdgesByWeight = function () {\n        this.edges = this.edges.sort(function (first, second) { return first.weight - second.weight; });\n    };\n    Graph.prototype.extractVertices = function () {\n        var _this = this;\n        this.edges.forEach(function (edge) {\n            if (!_this.vertices.includes(edge.firstVertex))\n                _this.vertices.push(edge.firstVertex);\n            if (!_this.vertices.includes(edge.secondVertex))\n                _this.vertices.push(edge.secondVertex);\n        });\n        this.vertices.sort(function (first, second) { return first - second; });\n    };\n    return Graph;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Graph);\n\n\n//# sourceURL=webpack://ts/./Graph.ts?");

/***/ }),

/***/ "./Grapher.ts":
/*!********************!*\
  !*** ./Grapher.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Grapher = /** @class */ (function () {\n    function Grapher(selector, graph, vertices) {\n        if (graph === void 0) { graph = []; }\n        if (vertices === void 0) { vertices = []; }\n        this.vertexPositions = [];\n        this.points = [];\n        this.edges = [];\n        this.canvas = document.querySelector(selector);\n        this.verticesNumber = vertices.length;\n        this.angleIncrement = 2 * Math.PI / this.verticesNumber;\n        this.graph = graph;\n        this.vertices = vertices;\n        this.getRenderingContext();\n    }\n    Grapher.prototype.newGraph = function (graph, vertices) {\n        this.verticesNumber = vertices.length;\n        this.angleIncrement = 2 * Math.PI / this.verticesNumber;\n        this.graph = graph;\n        this.points = [];\n        this.edges = [];\n        this.vertices = vertices;\n        this.start();\n    };\n    Grapher.prototype.getRenderingContext = function () {\n        this.renderingContext = this.canvas.getContext(\"2d\");\n        if (!this.renderingContext) {\n            console.log(new Error(\"Couldnt get rendering context.\"));\n        }\n    };\n    Grapher.prototype.start = function () {\n        try {\n            this.draw();\n            this.addVertex(1);\n        }\n        catch (err) {\n            alert(\"Błąd w danych.\");\n        }\n    };\n    Grapher.prototype.addVertex = function (vertexKey) {\n        if (!this.vertices.includes(vertexKey)) {\n            this.clearCanvas();\n            throw new Error('Graf jest niepoprawny, rozłączny, lub nazwy wierzchołków nie następują po sobie.');\n        }\n        var angle = (vertexKey - 1) * this.angleIncrement;\n        var x = 120 * Math.cos(angle) + 300 + Math.random() * 20;\n        var y = 120 * Math.sin(angle) + 200 + Math.random() * 20;\n        this.points.push({ x: x, y: y, number: vertexKey });\n        this.vertexPositions[vertexKey] = { x: x, y: y, number: vertexKey };\n        vertexKey++;\n        if (vertexKey <= this.verticesNumber) {\n            setTimeout(this.addVertex.bind(this, vertexKey), 500);\n        }\n        else {\n            this.addEdge(0);\n        }\n    };\n    Grapher.prototype.addEdge = function (edgeKey) {\n        var edge = this.graph[edgeKey];\n        var firstVertex = this.vertexPositions[edge.firstVertex];\n        var secondVertex = this.vertexPositions[edge.secondVertex];\n        this.edges.push({\n            from: { x: firstVertex.x, y: firstVertex.y },\n            to: { x: secondVertex.x, y: secondVertex.y },\n            weight: edge.weight,\n        });\n        edgeKey++;\n        if (edgeKey < this.graph.length) {\n            setTimeout(this.addEdge.bind(this, edgeKey), 500);\n        }\n    };\n    Grapher.prototype.draw = function () {\n        var _this = this;\n        this.renderingContext.clearRect(0, 0, 600, 600);\n        this.edges.forEach(function (edge) {\n            _this.renderingContext.moveTo(edge.from.x, edge.from.y);\n            _this.renderingContext.lineTo(edge.to.x, edge.to.y);\n            _this.renderingContext.font = \"16px serif\";\n            _this.renderingContext.stroke();\n            _this.renderingContext.beginPath();\n            _this.renderingContext.arc((edge.from.x + edge.to.x) / 2, (edge.from.y + edge.to.y) / 2, 10, 0, 2 * Math.PI);\n            _this.renderingContext.fillStyle = 'white';\n            _this.renderingContext.fill();\n            _this.renderingContext.stroke();\n            _this.renderingContext.fillStyle = 'black';\n            _this.renderingContext.fillText(\"\" + edge.weight, (edge.from.x + edge.to.x) / 2, (edge.from.y + edge.to.y) / 2);\n        });\n        this.points.forEach(function (point, j) {\n            _this.renderingContext.beginPath();\n            _this.renderingContext.fillStyle = \"white\";\n            _this.renderingContext.arc(point.x, point.y, 20, 0, 2 * Math.PI);\n            _this.renderingContext.fill();\n            _this.renderingContext.stroke();\n            _this.renderingContext.fillStyle = \"black\";\n            _this.renderingContext.font = \"24px serif\";\n            _this.renderingContext.strokeStyle = \"black\";\n            _this.renderingContext.textAlign = \"center\";\n            _this.renderingContext.textBaseline = \"middle\";\n            _this.renderingContext.fillText(\"\" + point.number, point.x, point.y);\n            _this.renderingContext.stroke();\n        });\n        window.requestAnimationFrame(this.draw.bind(this));\n    };\n    Grapher.prototype.clearCanvas = function () {\n        this.renderingContext.clearRect(0, 0, 600, 600);\n        this.renderingContext.fill();\n        this.renderingContext.stroke();\n        this.renderingContext.beginPath();\n    };\n    return Grapher;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Grapher);\n\n\n//# sourceURL=webpack://ts/./Grapher.ts?");

/***/ }),

/***/ "./Kruskal.ts":
/*!********************!*\
  !*** ./Kruskal.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Kruskal = /** @class */ (function () {\n    function Kruskal() {\n        this.map = new Map();\n    }\n    Kruskal.prototype.findMinimalSpanningTree = function (vertices, edges) {\n        var _this = this;\n        var minimalSpanningTree = [];\n        vertices.forEach(function (vertex) {\n            _this.map.set(vertex, vertex);\n        });\n        edges.forEach(function (edge) {\n            var firstVertex = edge.firstVertex, secondVertex = edge.secondVertex;\n            var firstParent = _this.findRootParent(firstVertex);\n            var secondParent = _this.findRootParent(secondVertex);\n            if (firstParent != secondParent) {\n                minimalSpanningTree.push(edge);\n                _this.unionSubsets(firstParent, secondParent);\n            }\n        });\n        return minimalSpanningTree;\n    };\n    Kruskal.prototype.unionSubsets = function (firstVertex, secondVertex) {\n        var firstVertexParent = this.findRootParent(firstVertex);\n        var secondVertexParent = this.findRootParent(secondVertex);\n        this.map.set(secondVertexParent, firstVertexParent);\n    };\n    Kruskal.prototype.findRootParent = function (vertex) {\n        if (this.map.get(vertex) === vertex) {\n            return vertex;\n        }\n        return this.findRootParent(this.map.get(vertex));\n    };\n    return Kruskal;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Kruskal);\n\n\n//# sourceURL=webpack://ts/./Kruskal.ts?");

/***/ }),

/***/ "./script.ts":
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Graph */ \"./Graph.ts\");\n/* harmony import */ var _Kruskal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Kruskal */ \"./Kruskal.ts\");\n/* harmony import */ var _Grapher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Grapher */ \"./Grapher.ts\");\n\n\n\nvar kruskal = new _Kruskal__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nvar grapher = new _Grapher__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"#canvas\");\nvar preview = new _Grapher__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"#preview\");\nvar addEdge = document.querySelector(\".add-edge\");\nvar edgesWrapper = document.querySelector(\".edges\");\nvar deleteEdge = document.querySelectorAll(\".delete\");\nvar createEdge = function () {\n    var edge = document.createElement(\"div\");\n    edge.classList.add(\"row\", \"my-2\", \"single-edge\");\n    edge.innerHTML = \"\\n        <div class=\\\"col-12 col-md-3\\\"><input class=\\\"form-control\\\" type=\\\"number\\\" placeholder=\\\"Pierwszy wierzcho\\u0142ek\\\"></div>\\n        <div class=\\\"col-12 col-md-3\\\"><input class=\\\"form-control\\\" type=\\\"number\\\" placeholder=\\\"Drugi wierzcho\\u0142ek\\\"></div>\\n        <div class=\\\"col-12 col-md-3\\\"><input class=\\\"form-control\\\" type=\\\"number\\\" placeholder=\\\"Waga kraw\\u0119dzi\\\"></div>\\n        <button class=\\\"btn btn-danger col-12 col-md-3 delete\\\">X</button>\\n    \";\n    return edge;\n};\ndeleteEdge.forEach(function (button) { return button.addEventListener('click', function () {\n    button.closest(\".single-edge\").remove();\n}); });\nvar getEdges = function () {\n    var edges = [];\n    edgesWrapper.querySelectorAll(\".single-edge\").forEach(function (edge) {\n        var _a = Array.from(edge.querySelectorAll(\"input\")).map(function (input) { return parseInt(input.value); }), firstVertex = _a[0], secondVertex = _a[1], weight = _a[2];\n        if (firstVertex == 0 || secondVertex == 0 || weight == 0)\n            return null;\n        if (!firstVertex || !secondVertex || !weight)\n            return null;\n        edges.push({ firstVertex: firstVertex, secondVertex: secondVertex, weight: weight });\n    });\n    return edges;\n};\naddEdge.addEventListener(\"click\", function () {\n    var edge = createEdge();\n    edgesWrapper.appendChild(edge);\n});\nvar drawPreviewButton = document.querySelector(\".draw-preview\");\nvar drawMspButton = document.querySelector(\".draw-msp\");\ndrawPreviewButton.addEventListener(\"click\", function () {\n    var edges = getEdges();\n    if (!edges)\n        return;\n    var graph = new _Graph__WEBPACK_IMPORTED_MODULE_0__[\"default\"](edges);\n    preview.newGraph(graph.getEdges(), graph.getVertices());\n});\ndrawMspButton.addEventListener(\"click\", function () {\n    var edges = getEdges();\n    if (!edges) {\n        alert(\"Podaj poprawne dane.\");\n    }\n    var graph = new _Graph__WEBPACK_IMPORTED_MODULE_0__[\"default\"](edges);\n    var msp = kruskal.findMinimalSpanningTree(graph.getVertices(), graph.getEdges());\n    grapher.newGraph(msp, graph.getVertices());\n});\n\n\n//# sourceURL=webpack://ts/./script.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./script.ts");
/******/ 	
/******/ })()
;