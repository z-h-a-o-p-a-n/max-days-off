const WEEKS = 5; // We're lying, but it's just to make it easier.
const countryHolidays = {
  "US": [1,0,0,2,0],
  "CA": [1,1,0,0,3],
  "FR": [2,0,1,1,0],
  "IL": [1,5,0,0,0],
  "NZ": [0,0,3,0,0],
};

const connectivity = {
  "US": ["CA","FR", "NZ"],
  "CA": ["US", "FR", "IL"],
  "FR": ["IL", "US", "CA"],
  "IL": ["FR","CA"],
  "NZ": ["US", "IL"],
};

function findMaxPath(graph) {

    let maxSum = -Infinity;
    let maxPath = [];
    
    function dfs(node, sum, path) {
      if (path.length === WEEKS) {
        if (sum > maxSum) {
          maxSum = sum;
          maxPath = path.slice(); // Copy the path
        }
        return;
      }
    
      const thisWeight = graph[node].weights[path.length] || 0;
    
      for (const neighbor of graph[node].neighbors) {
        const neighborWeight = graph[neighbor].weights[path.length] || 0;
        if (neighborWeight > thisWeight) {
            path.push(neighbor);
            dfs(neighbor, sum + neighborWeight, path);
        } else {
            path.push(node);
            dfs(node, sum + thisWeight, path);
        }
        path.pop();
      }
    }
    for (const country in graph) {
    const path = [country];
    const startNode = graph[country];
    const weight = startNode.weights[0];
    dfs(country, weight, path);
  }
  return [maxSum, maxPath];
}

const graph = {
  "US": {
    weights: [1,0,0,2,0],
    neighbors: ["CA", "FR", "NZ"],
  },
  "CA": {
    weights: [1,1,0,0,3],
    neighbors: ["US", "FR", "IL"],
  },
  "FR": {
    weights: [2,0,1,1,0],
    neighbors: ["IL", "US", "CA"],
  },
  "IL": {
    weights: [1,5,0,0,0],
    neighbors: ["FR", "CA"],
  },
  "NZ": {
    weights: [0,0,3,0,0],
    neighbors: ["US", "IL"],
  },
};

console.log("Graph 1", findMaxPath(graph));

const graph2 = {
    "US": {
      weights: [1,0,0,2,0],
      neighbors: ["US", "FR", "IL", "CA", "NZ"],
    },
    "CA": {
      weights: [1,1,0,0,3],
      neighbors: ["US", "FR", "IL", "CA", "NZ"],
    },
    "FR": {
      weights: [2,0,1,1,0],
      neighbors: ["US", "FR", "IL", "CA", "NZ"],
    },
    "IL": {
      weights: [1,5,0,0,0],
      neighbors: ["US", "FR", "IL", "CA", "NZ"],
    },
    "NZ": {
      weights: [0,0,3,0,0],
      neighbors: ["US", "FR", "IL", "CA", "NZ"],
    },
  };
  console.log("Graph 2", findMaxPath(graph2));
