// функция для поиска оптимального пути с помощью алгоритма A* pathfinder
const findShortestPath = (start, end) => {
    // определяем массив узлов на плане здания
    const nodes = buildingPlan.map((point) => ({
      x: point.x,
      y: point.y,
      g: Infinity,
      h: Math.sqrt((point.x - end.x) ** 2 + (point.y - end.y) ** 2),
      f: Infinity,
      parent: null,
    }));
  
    // определяем стартовый и конечный узлы
    const startNode = nodes.find((node) => node.x === start.x && node.y === start.y);
    const endNode = nodes.find((node) => node.x === end.x && node.y === end.y);
  
    // определяем массив открытых и закрытых узлов
    const openNodes = [startNode];
    const closedNodes = [];
  
    // определяем функцию для вычисления расстояния между двумя узлами
    const distance = (node1, node2) => {
      return Math.sqrt((node1.x - node2.x) ** 2 + (node1.y - node2.y) ** 2);
    };
  
    // определяем функцию для поиска соседних узлов
    const findNeighbors = (node) => {
      return nodes.filter(
        (neighbor) =>
          distance(node, neighbor) < 50 &&
          !obstacle.some((point) => point.x === neighbor.x && point.y === neighbor.y)
      );
    };
  
    // определяем функцию для вычисления значения f для узла
    const calculateF = (node) => {
      node.f = node.g + node.h;
    };
  
    // определяем главный цикл алгоритма
    while (openNodes.length > 0) {
      // находим узел с наименьшим значением f
      const currentNode = openNodes.reduce((prev, current) =>
        prev.f < current.f ? prev : current
      );
  
      // если мы достигли конечного узла, то завершаем поиск
      if (currentNode === endNode) {
        const path = [];
        let node = currentNode;
        while (node.parent) {
          path.unshift(node);
          node = node.parent;
        }
        path.unshift(startNode);
        return path.map((node) => ({ x: node.x, y: node.y }));
      }
  
      // перемещаем текущий узел из открытых в закрытые
      openNodes.splice(openNodes.indexOf(currentNode), 1);
      closedNodes.push(currentNode);
  
      // находим соседние узлы
      const neighbors = findNeighbors(currentNode);
  
      // обновляем значения g, f и parent для каждого соседнего узла
      neighbors.forEach((neighbor) => {
        if (closedNodes.includes(neighbor)) {
          return;
        }
  
        const tentativeG = currentNode.g + distance(currentNode, neighbor);
  
        if (!openNodes.includes(neighbor)) {
          openNodes.push(neighbor);
        } else if (tentativeG >= neighbor.g) {
          return;
        }
  
        neighbor.parent = currentNode;
        neighbor.g = tentativeG;
        calculateF(neighbor);
      });
    }
  
    // если путь не найден, возвращаем null
    return null;
  };
  