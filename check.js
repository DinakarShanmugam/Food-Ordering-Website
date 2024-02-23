// map.put("New Delhi",0);
// map.put("Bangalore", 1);
// map.put("Kolkatta", 2);
// map.put("Chennai", 3);
// map.put("Hyderabad", 4);
// map.put("Guwahati", 5);
// map.put("Jammu", 6);
// map.put("Trivandrum", 7);
// map.put("Mumbai", 8);
// map.put("Ahamadabad", 9);

const ind = new Map([
    ["New Delhi",0],
    ["Bangalore", 1],
    ["Kolkatta", 2],
    ["Chennai", 3],
    ["Hyderabad", 4],
    ["Guwahati", 5],
    ["Jammu", 6],
    ["Trivandrum", 7],
    ["Mumbai", 8],
    ["Ahamadabad", 9]
  ]);
  const india = new Map([
    [0,"New Delhi"],
    [1,"Bangalore"],
    [2,"Kolkatta"],
    [3,"Chennai"],
    [4,"Hyderabad"],
    [5,"Guwahati"],
    [6,"Jammu"],
    [7,"Trivandrum"],
    [8,"Mumbai"],
    [9,"Ahamadabad"]
  ]);
  
  class Graph {
      constructor(vertices) {
        this.vertices = vertices;
        this.adjMatrix = [];
        for (let i = 0; i < vertices; i++) {
          this.adjMatrix[i] = [];
          for (let j = 0; j < vertices; j++) {
            this.adjMatrix[i][j] = 0;
          }
        }
      }
    
      addEdge(source, destination, weight) {
        this.adjMatrix[source][destination] = weight;
        this.adjMatrix[destination][source] = weight;
      }
    
      dijkstra(src, dest) {
        const distance = new Array(this.vertices);
        const visited = new Array(this.vertices);
        const previous = new Array(this.vertices);
    
        for (let i = 0; i < this.vertices; i++) {
          distance[i] = Infinity;
          visited[i] = false;
          previous[i] = -1;
        }
    
        distance[src] = 0;
    
        for (let count = 0; count < this.vertices - 1; count++) {
          const u = this.minDistance(distance, visited);
          visited[u] = true;
    
          for (let v = 0; v < this.vertices; v++) {
            if (!visited[v] && this.adjMatrix[u][v] !== 0 &&
              distance[u] + this.adjMatrix[u][v] < distance[v]) {
              distance[v] = distance[u] + this.adjMatrix[u][v];
              previous[v] = u;
            }
          }
        }
    
        return this.constructPath(previous, src, dest);
      }
    
      minDistance(distance, visited) {
        let min = Infinity;
        let minIndex = -1;
    
        for (let v = 0; v < this.vertices; v++) {
          if (visited[v] === false && distance[v] <= min) {
            min = distance[v];
            minIndex = v;
          }
        }
    
        return minIndex;
      }
    
      constructPath(previous, src, dest) {
        const path = [];
        let current = dest;
    
        while (current !== -1) {
          path.unshift(current);
          current = previous[current];
        }
    
        return path;
      }
    }
    
    // Example Usage
    const graph = new Graph(10);
    
    const weightedMatrix = [
      [0, 1950, 1350, Infinity, 1350, 1450, 500, Infinity, 1250, 775],
      [1950, 0, 1600, 285, 500, Infinity, Infinity, 500, 840, Infinity],
      [1350, 1600, 0, 1360, 1180, 520, Infinity, Infinity, 1800, 1770],
      [Infinity, 285, 1360, 0, 570, Infinity, Infinity, 620, Infinity, Infinity],
      [1350, 500, 1180, 570, 0, Infinity, Infinity, Infinity, 670, 1020],
      [1450, Infinity, 520, Infinity, Infinity, 0, 1780, Infinity, Infinity, Infinity],
      [500, Infinity, Infinity, Infinity, Infinity, 1780, 0, Infinity, Infinity, Infinity],
      [Infinity, 500, Infinity, 620, Infinity, Infinity, Infinity, 0, 1250, Infinity],
      [1250, 840, 1800, Infinity, 670, Infinity, Infinity, 1250, 0, 440],
      [775, Infinity, 1770, Infinity, 1020, Infinity, Infinity, Infinity, 440, 0]
    ];
    
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (weightedMatrix[i][j] !== Infinity) {
          graph.addEdge(i, j, weightedMatrix[i][j]);
        }
      }
    }
  
    function one(){
        console.log("called");
      const source = document.getElementById("Source").value;
      const destination =document.getElementById("Target").value;
    
      const shortestPath = graph.dijkstra(source, destination);
    
      let x=`     Shortest path from ${india.get(source)} to ${destination} is :\n `;
      let y=[];
      let n=shortestPath.length;
      x+=`<br>      <strong>${shortestPath[0]}</strong>`;
      y='\\/'
      for(let i=1;i<n;i++){
        x+= `<br><span>|</span> <br><span>|</span><br> <strong>${shortestPath[i]}</strong>`;
      }
      //console.log(shortestPath);
      document.getElementById("route").innerHTML=`${x}`;
    }
    
  //   const source = document.getElementById("Source").value;
  //   const destination = document.getElementById("Target").value;
    
  //   const shortestPath = graph.dijkstra(source, destination);
    
  //   console.log(`Shortest path from ${source} to ${destination}: ${shortestPath.join(' -> ')}`);