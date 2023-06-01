import React, {useState} from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';
import { View, Modal, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { gStyle } from '../../styles/style';
import {findShortestPath} from '../../algoritmhs/findShortestPath';
import { FlatList } from 'react-native-web';

// Определяем размеры SVG-изображения и координаты точек и препятствий
const SVG_WIDTH = 350;
const SVG_HEIGHT = 350;
const START_POINT = { x: 310, y: 200 };// границы предположительно 670 на 670  x: 410, y: 320 
const END_POINT = {x: 200, y: 100 };//, {id: 112, x:235, y: 245 }{x: 200, y: 100 }
const OBSTACLES = [
  { x:286.1 , y:221.2, radius: 10 },
  { x: 300.9, y: 236.4,radius: 10 },
  { x:302.9 , y: 241.3, radius: 10 },
  { x:249.6 , y:273 ,  radius: 10 },
  { x:209 , y:250.6667 , radius: 10 },
  { x:223 , y:206 ,radius: 10 },
  { x: 202, y:229 , radius: 10 },
  { x:191 , y:274 , radius: 10 },
  { x:162 , y:250 , radius: 10 },
  { x:169.3333 , y:206 , radius: 10},
  { x:144 , y:205.9 ,radius: 10 },
  { x:156 , y: 228.3333,  radius: 10 },
  { x:134 , y:272 ,radius: 10 },
  { x:116 , y:204.9 ,radius: 10 },
  { x:128.7 , y:205 , radius: 10},
  { x:95 , y: 205,radius: 10 },
  { x:111.3333 , y:227.3333 ,radius: 10},
  { x:96 , y:271.6667 ,radius: 10  },
  { x:65.6667 , y:249.3333 ,radius: 10   },
  { x:75 , y:204 , radius: 10},
  { x:73 , y:129.4 ,radius: 10},
  { x:66.2 , y:129 , radius: 10},
  { x:77.6667 , y:68 , radius: 10},
  { x:99 , y:88.6667 ,radius: 10 },
  { x:89.3 , y:129 ,radius: 10},
  { x:109 , y:129.5 , radius: 10 },
  { x:103.6667 , y:109 ,radius: 10 },
  { x:113.3333 , y:68 , radius: 10 },
  { x:134 , y:88.3333 ,  radius: 10 },
  { x:129.5 , y:129 ,radius: 10 },
  { x:186 , y:130.3 , radius: 10},
  { x:177 , y:109.6667 , radius: 10 },
  { x:186.6667 , y:68.6667 , radius: 10},
  { x:206 , y:76.7 , radius: 10},
  { x:210 , y:97 ,  radius: 10},
  { x:220 , y:69 ,  radius: 10 },
  { x:240 , y:83.6667 ,  radius: 10},
  { x:245 , y:98.3333 , radius: 10 },
  { x:254.6667 , y:69 , radius: 10},
  { x:274 , y:76.6667 ,  radius: 10},
  { x:274 , y:114.3 ,   radius: 10},
  { x:277.9 , y:113 ,  radius: 10},
  { x:278 , y:84.3333 , radius: 10 },
  { x:288.6667 , y:69 , radius: 10 },
  { x:310 , y:89.3333 , radius: 10 },
  { x:305.3333 , y:135 ,radius: 10  },
  { x:314 , y:109.6667 , radius: 10},
  { x:339.3333 , y:69 , radius: 10 },
  { x:394.6667 , y:73.3333 , radius: 10 },
  { x:369.5 , y:116 , radius: 10 },
  { x:354.5 , y:129.7 , radius: 10 },
  { x:345.3333 , y:134 , radius: 10 },
  { x:379.3 , y:112.9 ,radius: 10 },
  { x:392.2 , y:110.8 , radius: 10 },
  { x:395.1 , y:128.2 , radius: 10 },
  { x:400.5 , y:129.7 ,radius: 10},
  { x:481 , y:54.5 ,radius: 10},
  { x:602 , y:171.1 , radius: 10},
  { x:520.8 , y:312 ,  radius: 10},
  { x:521 , y:301.8 ,  radius: 10},
  { x:544 , y:276 ,radius: 10 },
  { x:564 , y:257.3333 ,radius: 10  },
  { x:578.3333 , y:254 , radius: 10 },
  { x:591 , y:296.6667 , radius: 10 },
  { x:567.6667 , y:366 , radius: 10},
  { x:521 , y:359.3333 ,  radius: 10},
  { x:521 , y:326.7 ,radius: 10},
  { x:521 , y:396.6667 , radius: 10 },
  { x:544 , y:372 ,  radius: 10},
  { x:590 , y:391.6667 ,radius: 10 },
  { x:567 , y:431 , radius: 10 },
  { x:521 , y:423.7 , radius: 10 },
  { x:520.3 , y:441 ,  radius: 10},
  { x:521 , y:437 ,radius: 10 },
  { x:590 , y:447 ,radius: 10},
  { x:566.6667 , y:467 ,radius: 10 },
  { x:520 , y:460 , radius: 10},
  { x:517 , y:476.3 , radius: 10},
  { x:544.3333 , y:472 , radius: 10},
  { x:591 , y:516.3333 ,radius: 10},
  { x:568 , y:605 , radius: 10 },
  { x:519 , y:595.6667 ,  radius: 10 },
  { x:497.6667 , y:605 ,radius: 10},
  { x:455 , y:592.2 , radius: 10 },
  { x:455 , y:572.3333 , radius: 10 },
  { x:426.6667 , y:567 , radius: 10},
  { x:380 , y:557 ,radius: 10 },
  { x:396.6667 , y:537 ,  radius: 10},
  { x:380 , y:501 ,  radius: 10},
  { x:403.6667 , y:440 , radius: 10 },
  { x:454.4 , y:444 ,radius: 10  },
  { x:454.4 , y:415 ,  radius: 10},
  { x:455 , y:384.0667 , radius: 10},
  { x:447.5 , y:365.1 ,radius: 10 },
  { x:434.2 , y:353.1 ,radius: 10 },
  { x:424.0667 , y:342.7333 ,radius: 10 },
  { x:427 , y:401 , radius: 10 },
  { x:381 , y:391.5 , radius: 10 },
  { x:394 , y:361 , radius: 10 },];
// Определяем функцию для создания сетки с узлами
function createGrid() {
  const grid = [];
  for (let x = 0; x < SVG_WIDTH; x += 10) {
    for (let y = 0; y < SVG_HEIGHT; y += 10) {
      const node = {
        x,
        y,
        isStart: x === START_POINT.x && y === START_POINT.y,
        isEnd: x === END_POINT.x && y === END_POINT.y,
        isObstacle: false,
        gScore: Infinity,
        fScore: Infinity,
        cameFrom: null,
      };
      for (const obstacle of OBSTACLES) {
        if (distance(node, obstacle) <= obstacle.radius) {
          node.isObstacle = true;
          break;
        }
      }
      grid.push(node);
    }
  }
  return grid;
}

// Определяем функцию для вычисления эвристической оценки
function heuristic(nodeA, nodeB) {
  return distance(nodeA, nodeB);
}

// Определяем функцию для вычисления расстояния между двумя узлами
function distance(nodeA, nodeB) {
  const dx = nodeA.x - nodeB.x;
  const dy = nodeA.y - nodeB.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Определяем функцию для поиска соседних узлов
function getNeighbors(grid, node) {
  const neighbors = [];
  for (const neighbor of grid) {
    if (neighbor === node) continue;
    if (distance(node, neighbor) > 14) continue;
    if (neighbor.isObstacle) continue;
    neighbors.push(neighbor);
  }
  return neighbors;
}

// Определяем функцию для поиска кратчайшего пути с помощью алгоритма A* pathfinder
function aStarPathfinder(grid) {
  const startNode = grid.find((node) => node.isStart);
  const endNode = grid.find((node) => node.isEnd);
  const openSet = [startNode];
  const closedSet = [];
  startNode.gScore = 0;
  startNode.fScore = heuristic(startNode, endNode);
  while (openSet.length > 0) {
    const currentNode = openSet.reduce((a, b) => (b.fScore < a.fScore ? b : a));
    if (currentNode === endNode) {
      const path = [];
      let node = endNode;
      while (node !== startNode) {
        path.unshift(node);
        node = node.cameFrom;
      }
      path.unshift(startNode);
      return path;
    }
    openSet.splice(openSet.indexOf(currentNode), 1);
    closedSet.push(currentNode);
    for (const neighbor of getNeighbors(grid, currentNode)) {
      if (closedSet.includes(neighbor)) continue;
      const tentativeGScore = currentNode.gScore + distance(currentNode, neighbor);
      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
      } else if (tentativeGScore >= neighbor.gScore) {
        continue;
      }
      neighbor.cameFrom = currentNode;
      neighbor.gScore = tentativeGScore;
      neighbor.fScore = neighbor.gScore + heuristic(neighbor, endNode);
    }
  }
  return null;
}
function handlePress(x, y) {

  // Находим элемент матрицы по координатам x и y
  const item = matrix.find((item) => item.x === x && item.y === y);

  // Если элемент найден, выводим его id в консоль
  if (item) {
    console.log(`Element id: ${item.id}`);
  }
}


export default function MapComponent1() {
  
  const[modalVisibleA103, setModalVisibleA103]=useState(false);
  const[modalVisibleA104, setModalVisibleA104]=useState(false);
  const[modalVisibleA106, setModalVisibleA106]=useState(false);
  const[modalVisibleA112, setModalVisibleA112]=useState(false);
  const[modalVisibleA113, setModalVisibleA113]=useState(false);
  const[modalVisibleA114, setModalVisibleA114]=useState(false);
  const[modalVisibleA115, setModalVisibleA115]=useState(false);
  const[modalVisibleA123, setModalVisibleA123]=useState(false);
  const[modalVisibleA124, setModalVisibleA124]=useState(false);
  const[modalVisibleA127, setModalVisibleA127]=useState(false);
  const[modalVisibleA128, setModalVisibleA128]=useState(false);
  const[modalVisibleA129, setModalVisibleA129]=useState(false);
  const[modalVisibleA130, setModalVisibleA130]=useState(false);
  const[modalVisibleA131, setModalVisibleA131]=useState(false);
  const[modalVisibleA132, setModalVisibleA132]=useState(false);
  const[modalVisibleA136, setModalVisibleA136]=useState(false);
  const[modalVisibleA137, setModalVisibleA137]=useState(false);
  const[modalVisibleA138, setModalVisibleA138]=useState(false);
  const[modalVisibleA139, setModalVisibleA139]=useState(false);

  const [grid, setGrid] = useState(createGrid());
  const [path, setPath] = useState(null);
  // Обновляем состояние сетки при нажатии на кнопку
  function handlePress() {
    setGrid(createGrid());
  }

  // // Вычисляем кратчайший путь с помощью алгоритма A* pathfinder
  // const path = aStarPathfinder(grid);
  const handlePointPress = (x, y) => {
    const newPath = aStarPathfinder(grid, x, y);
    // обновление состояния компонента с результатами вычислений пути
    setPath(newPath);
  };

  return (
  <View>
     <Svg  width="350" height="350" >
      {/* План здания */}
      <Path stroke="black" d="M 445 81 l -39 37 C 399 111 396 108 390 103 L 411 82 L 391 64 H 277 C 164.7 64 163 64 163 65.9 C 163 67.6 163.8 67.9 167.8 68.2 L 172.5 68.5 L 172.8 78.7 L 173.1 89 H 139 V 68 C 149.3 68 151 69 150 66 H 62 V 122.7 L 57.4 123.4 C 47.8 124.7 38.4 131 33.4 139.5 C 22.7 157.8 24.1 183.4 36.5 198.6 C 40.1 203 50.5 209 54.4 209 L 60 210 V 241.5 C 61 268.4 59 272 61 276 C 79 277 80.9 276.8 167.8 277.3 L 271.5 277.9 L 276.5 272.9 C 281.1 268.5 281.7 268.1 283.1 269.5 C 284.5 271 284.8 270.9 286 269.5 C 287.1 268.2 287.1 267.4 286.3 266 C 285.3 264.6 285.7 263.7 288.1 261.4 C 290.7 258.9 291.3 258.7 293.1 259.8 C 294.7 260.8 295.5 260.9 296.6 259.9 C 297.9 258.9 297.9 258.5 296.5 257.1 C 295.2 255.6 299 253 301.3 249.2 C 307 243.6 307.7 243.1 309.1 244.5 C 310.5 245.9 310.8 246 312 244.6 C 313 243.3 313 242.7 311.9 241.4 C 310.7 239.9 311.3 239 316.8 234.1 C 322.9 228.6 323.1 228.4 321.3 226.7 C 319.5 225.1 319.1 225.3 314 230.5 C 311 233.5 308.1 236 307.6 236 C 307 236 302.6 232.1 297.8 227.3 C 290.2 219.7 288.9 218.8 287.5 220 C 286.1 221.2 286.9 222.4 295.2 230.7 C 300.9 236.4 304.1 240.3 303.5 240.9 C 302.9 241.3 295 246 268 273 C 249.6 273 229.3 273 209 273 C 209 250.6667 209 228.3333 209 206 C 223 206 272 208 271 204 C 272 204 271 203 271 202 C 264 201 264 201 264 199.5 C 264 196 258 196 258 199 C 258 200 258 201 258 202 C 198.7 202 198 202 198 204 C 198 205.6 198.7 206 204 206 C 202 229 204 250 204 273 C 191 274 176 273 162 273 C 162 250 162 228 162 206 C 169.3333 206 176.6667 206 184 206 V 201 H 144 V 203.5 C 144 205.9 144.2 206 155 206 C 156 228.3333 156 250.6667 156 272 C 134 272 123 272 118 272 C 116 204.9 115 206 117 205 C 128.7 205 128 204 129 202.5 V 200 H 95 V 202.5 C 95 205 96 204 111 205 C 111.3333 227.3333 111.6667 249.6667 112 272 C 96 271.6667 80 271.3333 66 272 C 65.6667 249.3333 65.3333 226.6667 65 204 C 75 204 83 204 82 202.5 V 200 H 61 C 61 205.2 60.9 205.3 56.5 204.7 C 45.1 203.1 35.7 193.6 32.1 180.2 C 30.2 173.3 30.6 159.4 32.9 152 C 37.2 138 45.8 129.8 58.3 127.6 C 61.9 126.9 62 127 62 133 C 72.8 134.2 73 133 73 131.6 C 73 129.4 72.6 129 68 129 C 66.2 129 66 127.8 67 68 C 77.6667 68 88.3333 68 99 68 C 99 88.6667 99 109.3333 99 130 C 89.3 129 89 129.1 89 131.5 V 134 H 109 V 131.5 C 109 129.5 109 130 104 129 C 103.6667 109 103.3333 89 103 68 C 113.3333 68 123.6667 68 134 68 C 134 88.3333 134 108.6667 134 129 C 129.5 129 129 129.5 130 131 C 129 133.9 129.2 134 136.5 134 S 144 133.9 144 131.5 C 144 129.5 143.5 129 139 129 V 123 H 173.1 L 172.8 126.2 C 172.5 129.2 172.2 129.5 168.8 129.8 C 165.8 130.1 165 130.5 165 132.1 C 165 133.9 165.8 134 175.5 134 C 185.3 134 186 133.9 186 132 C 186 130.3 185.3 130 177 130 C 177 109.6667 177 89.3333 177 69 C 186.6667 68.6667 197 69 206 69 C 206 76.7 206 84.4 206 111 C 207 111 208 111 210 111 C 210 97 210 83 210 69 C 220 69 230 69 240 69 C 240 83.6667 240 98.3333 240 113 H 245 C 245 98.3333 245 83.6667 245 69 C 254.6667 69 264.3333 69 274 69 C 274 76.6667 274 84.3333 274 92 C 274 114.3 274.1 115 276 114 C 277.9 113 278 114.3 278 92 C 278 84.3333 278 76.6667 278 69 C 288.6667 69 299.3333 69 310 69 C 310 89.3333 310 109.6667 310 130 H 304 C 298.3 130 298 130.1 298 132.5 V 135 C 305.3333 135 312.6667 135 320 135 V 132.5 C 320 130.4 319.5 130 317 130 H 314 C 314 109.6667 314 89.3333 314 69 C 339.3333 69 364.6667 69 390 69 C 394.6667 73.3333 399.3333 77.6667 404 82 C 369.5 116 358.3 126.8 357 128 C 354.5 129.7 352.8 130 340 130 V 134 C 345.3333 134 350.6667 134 356 134 C 379.3 112.9 386.4 106.4 386.8 106.2 C 392.2 110.8 397.6 115.4 403 120 L 399 124.7 C 395.1 128.2 394.7 128.9 395.9 130.4 C 397 131.7 397.5 131.7 399 130.7 C 400.5 129.7 479.6 54.5 480 54.5 C 481 54.5 602 169.1 602 170 C 602 171.1 529.1 244.3 524 248.4 C 519.7 251.7 519.6 252 521.2 253.7 C 522.9 255.3 523.1 255.2 526.5 252 L 530 248.6 C 543.6 261.7 547.5 266 547.5 266.5 L 517 295.2 V 303.6 C 517 311.3 517.2 312 519 312 C 520.8 312 521 311.3 521 304.7 C 521 301.8 521 298.9 521 296 C 544 276 555 266 560 261 C 564 257.3333 568 253.6667 572 250 C 578.3333 254 584.6667 258 591 262 C 591 296.6667 591 331.3333 591 366 C 567.6667 366 544.3333 366 521 366 C 521 359.3333 521 352.6667 521 346 C 521 326.7 520.9 326 519 326 C 517 326 517 326.7 517 368.5 S 517 411 521 409 C 521 396.6667 521 384.3333 521 372 C 544 372 567 372 590 372 C 590 391.6667 590 411.3333 590 431 C 567 431 544 431 521 431 C 521 423.7 520.7 423 519 423 C 517.1 423 517 423.7 517 432 S 517.1 441 519 441 C 520.3 441 521 440.3 521 439 C 521 437 521.7 437 590 437 C 590 447 590 457 590 467 C 566.6667 467 543.3333 467 520 467 C 520 460 520 453 519 454 C 517.1 454 517 454.7 517 465.5 C 517 476.3 517.1 477 519 477 C 520.5 477 521 476.3 521 474.5 V 472 C 544.3333 472 567.6667 472 591 472 C 591 516.3333 591 560.6667 591 605 C 568 605 545 605 523 605 C 521 591.7 525 590 519 591 C 519 595.6667 519 600.3333 519 605 C 497.6667 605 476.3333 605 455 605 C 455 592.2 454.9 592 452.5 592 S 450 592.2 450 598.5 V 605.1 L 441.3 604.8 L 432.7 604.5 L 432.5 588.3 L 432.4 572 H 450 V 576.5 C 450 580.6 450.2 581 455 581 C 455 572.3333 455 563.6667 455 555 H 452.5 C 450.1 556 450 556.3 450 561.5 V 567 C 426.6667 567 403.3333 567 380 567 C 380 557 380 547 381 538 C 396.6667 537 413.3333 537 430 537 V 532 H 380 C 380 501 380 470 381 440 C 403.6667 440 426.3333 440 449 440 V 441.5 C 450 443.3 450.5 444 451.9 444 C 454.4 444 455 442.1 455 433.9 C 455 427.2 454.9 427 452.5 427 C 450.3 427 450 427.4 450 430.5 V 434 H 431 V 406 H 450 V 410.5 C 450 414.2 450.3 415 451.9 415 C 454.4 415 455 410 455 389.1 C 455 384.0667 455 379.0333 455 374 L 451.2 368.7 C 447.5 365.1 448 365 445.7 366.8 C 444.1 368.5 444.2 368.8 447 371.5 L 450 374.4 V 401 C 427 401 404 401 381 401 C 381 391.5 381 382 382 373 C 394 361 403.7667 351.3667 415.1 340.8 L 417.8 343.1 C 419.3 344.4 423 347.8 426.1 350.8 C 431.1 355.5 431.8 355.9 433 354.5 C 434.2 353.1 433.4 351.9 426.6 345.1 C 424.0667 342.7333 421.5333 340.3667 419 338 L 421.5 335 C 423.9 332.8 423.9 332.5 422.3 330.8 C 420.7 329 420.5 329.1 417.4 332.1 C 415.4 334 414 334.8 413.6 334.1 C 413.1 333.3 412.3 333.3 410.9 334.1 C 409.2 335 409.1 335.4 410.2 336.7 C 411.3 338.1 410.6 339.1 405 344.2 C 401.4 347.4 398 349.8 397.3 349.6 C 395.9 349 393.4 351.7 394.4 352.7 C 395.1 353.5 387.1 362 385.6 362 C 385.1 362 383.7 361.1 382.5 360 C 380.5 358.1 380.2 358.1 379 359.5 C 377.9 360.9 378 361.4 379.8 363.3 L 382 365.4 L 379.1 368.5 L 376.2 371.5 L 375.7 473.8 L 375.1 576 H 377.6 C 379.3 576 380 575.5 380 574 C 380 572.1 380.7 572 389.5 572 H 402 V 605 H 380 V 598.5 C 380 592.2 379.9 592 377.5 592 C 375 592 375 592.1 375 601 V 610 H 594.7 L 595.3 487.7 V 261.2 C 578.3 248.6 572.9 245 572.5 245 C 556.9 259 552.3 262.9 551.9 262.8 L 533.8 245.7 L 571.6 207.9 C 592.4 187.1 609.2 169.9 609 169.6 C 595.8 156.9 480.3 48 480 48 Z M 172.8 93.7 L 173.1 96 H 139 V 91 L 155.8 91.2 C 172.3 91.5 172.5 91.5 172.8 93.7 Z M 173 102 V 105 H 139 V 99 H 173 V 102 Z M 173 110 C 173 111.1 172.3 112.3 171.5 112.7 C 170.6 113 163 112.9 154.5 112.5 C 140.2 111.8 139 111.6 139 109.9 C 139 108.1 140 108 156 108 C 172.4 108 173 108.1 173 110 Z M 172.8 117.7 L 173.1 120 H 139 V 115 L 155.8 115.2 C 172.3 115.5 172.5 115.5 172.8 117.7 Z M 397 420 V 434 H 379.8 L 380.4 430.9 C 380.7 429.2 381 422.9 381 416.9 V 406 H 397 V 420 Z M 414.2 586 C 414.3 593.7 414.4 601 414.4 602.2 C 414.5 604 413.9 604.6 411.8 604.8 L 409 605.1 V 572 H 414 L 414.2 586 Z M 422 588.5 V 605 H 417 V 572 H 422 V 588.5 Z M 430 588.5 V 605 H 427.5 C 425 605 425 605 425 595.2 C 425 589.9 424.7 582.5 424.3 578.7 L 423.7 572 H 430 V 588.5 Z" /> 
      {/* Лестница и название */}
      <Path stroke="black" d="M274 128c0 1.8-.7 2-8.1 2h-8.2l.7 3.7c.3 2.1.6 4.6.6 5.5 0 1.2.8 1.8 2.5 1.8 2.2 0 2.5-.4 2.5-3.5v-3.6l11.5.7 11.5.7v-2.7c0-2.4-.3-2.6-4-2.6-3.3 0-4-.3-4-2 0-1.5-.7-2-2.5-2s-2.5.5-2.5 2zM368.8 153.9 354 167.5l25.2 25.2 25.2 25.2 2.2-2c1.9-1.8 3-2 7.3-1.4l5.1.7v4c0 2.8-.6 4.5-2 5.6-2.1 1.7-2 1.8 2.9 6.6 4.2 4.2 5.2 4.7 6.5 3.7.9-.8 1.3-1.7 1-2.2-.3-.5 1.5-.9 4-.9h4.6v5.3c0 2.9-.5 5.8-1.2 6.5-.9.9 3.4 5.5 18.3 20 10.7 10.3 22 21.2 25.2 24.1l5.7 5.4 13.8-13.4c7.5-7.3 13.8-13.6 14-13.9.1-.3-1.1-1.8-2.6-3.3-2.6-2.5-3-2.6-4.2-1.2-.9 1.1-1 1.8-.1 2.9.9 1.1-1 3.5-10.1 12L483.6 287l-8.6-8.2c-4.7-4.6-14-13.6-20.7-20.2l-12.1-11.9 11.1-10.8 11.2-10.8 14.1 14c13.2 13.2 14.1 13.9 15.6 12.2 1.5-1.7-.7-4.1-38.4-40.8-53.9-52.5-54.6-53.2-56.4-51.3-1.3 1.3.1 3 12.1 14.6 7.4 7.2 13.5 13.6 13.5 14.1 0 .6-5.2 5.6-11.6 11.2l-11.6 10.2-20.4-20.4c-11.2-11.2-20.4-20.6-20.4-21 0-.3 5-5.2 11-10.8 8.7-8.1 11.3-10.1 12.4-9.2 1.6 1.3 4.6.4 4.6-1.3 0-.7-1.2-2.4-2.7-3.8l-2.8-2.6-14.7 13.7zm76.7 53c14.8 14.7 15.5 15.5 13.9 17.2-1 1.1-2.2 1.9-2.9 1.9-.9 0-18.4-15.8-30.4-27.6l-2.5-2.3 2.4-2.6c1.3-1.4 2.7-2.4 3.1-2.3.4.2 7.8 7.2 16.4 15.7zM259 154c0 1.9-.7 2-26.3 2h-26.3l.4 11.5.5 11.5H193v-9.5c0-9.5 0-9.5 2.5-9.5 1.8 0 2.5-.5 2.5-2 0-2-.7-2-40.5-2s-40.5 0-40.5 2c0 1.9.7 2 20.5 2H158v19H96v-19h5.5c5.2 0 5.5-.1 5.5-2.5 0-2.5-.1-2.5-8-2.5h-8.1l.3 14.2.3 14.3 37.8.3 37.7.2v-2.5c0-1.8-.5-2.5-2-2.5-1.9 0-2-.7-2-9.5V160h15v9.5c0 8.8-.1 9.5-2 9.5-1.5 0-2 .7-2 2.5v2.5h40v-2.5c0-1.4-.4-2.5-1-2.5s-1-3.7-1-9v-9h28v18.9l-8-.6-8-.6V184h12c11.3 0 12-.1 12-2 0-1.1-.7-2-1.5-2-1.2 0-1.5-1.7-1.5-9.5V161h14v9.5c0 7.8-.3 9.5-1.5 9.5-.8 0-1.5.9-1.5 2s.7 2 1.5 2 1.5.9 1.5 2c0 1.5.7 2 2.5 2h2.5v-36h-2.5c-1.8 0-2.5.5-2.5 2zM345.2 250.3l-11 11-5.5-4.7c-4.8-4.1-5.6-4.4-6.7-3.1-1.1 1.4-.6 2.3 3.3 6.3 3.7 3.7 4.5 5 3.5 6-1.5 1.5-20.9 1.7-22.4.2-1.8-1.8-4 1.6-2.4 3.5 1 1.1 3.6 1.5 11.1 1.5 5.4 0 9.9.3 10.1.7.2.5.2 3.6 0 7l-.4 6.3h-20.2l-4.8-4.7c-4.5-4.5-4.9-4.6-6.5-3-1.7 1.6-1.5 2 3.7 6.5l5.4 4.7 11 .5 11.1.5.5 7.6.5 7.7 11.2 10.6 11.1 10.6H362v10.9c0 8.4.3 11.1 1.5 12.1 1.9 1.6 5.3-.6 3.5-2.4-.5-.5-1-5.3-1-10.8V326h14v6.9c0 7 1.1 9.4 3.3 7.2.7-.7 1.1-3.7.8-7.7-.3-6.5-.2-6.7 3.5-10.5l3.8-3.9 3.6 3.5c3.2 3.1 3.8 3.4 4.9 2.1 1.1-1.3.8-2.2-1.7-5.3l-3.1-3.8 9.6-9.7c8.3-8.4 9.5-9.9 8.3-11.3-.9-1.1-1.6-1.2-2.6-.4-1 .8-7-4.3-27.3-23.7l-26-24.8 2-2.2 2-2.1-2.5-.5c-2-.4-4.2 1.3-13.4 10.5zm59.3 42.9c2.8 2.6 2.8 2.9 1.2 4.5-1.9 1.9-1.6 2.2-35-30.6-17-16.6-18.7-18.6-17.2-19.8 1.6-1.1 4.4 1.3 24.9 20.9 12.7 12.2 24.4 23.4 26.1 25zm-28.1-16.8c20.7 20 25.4 25.1 24.5 26.2-.6.8-1.7 1.4-2.3 1.4-.6 0-12.6-11.2-26.6-24.9-22.9-22.3-25.4-25-24.1-26.5.8-.9 1.7-1.5 2.2-1.4.4.2 12.3 11.5 26.3 25.2zm-5.3 5.5 25 24.4-2 2-2 2-25.5-24.8c-24.5-23.7-25.5-24.9-23.9-26.7.9-1 2-1.7 2.5-1.6.4.2 12.1 11.3 25.9 24.7zm-5.6 6.1c23.4 23.3 24.4 24.5 22.8 26.2-1.7 1.7-2.9.6-27-23.4-20.1-20-25-25.4-24.1-26.5.6-.8 1.7-1.3 2.4-1.1.8.2 12.4 11.3 25.9 24.8zm-5.7 5.1c23.2 22.7 25 24.8 23.4 26.2-1.3 1.1-5.6 1.7-17.2 2.2l-15.5.7-10.8-10.3-10.8-10.2.7-15.1c.5-11.5 1-15.5 2.2-16.9.9-1 1.9-1.6 2.3-1.5.3.2 11.9 11.4 25.7 24.9zM470 368c0 12.3.1 13 2 13 1.1 0 2-.5 2-1 0-.6 4-1 10-1h10v16h-20v-2.5c0-1.8-.5-2.5-2-2.5-1.8 0-2 .7-2 7s.2 7 2 7c1.3 0 2-.7 2-2 0-1.9.7-2 10-2h10v11h-5.5c-5.2 0-5.5.1-5.5 2.5s.3 2.5 5.5 2.5h5.5v21h-19v-22h-5v65h2.5c1.6 0 2.5-.6 2.5-1.5 0-.8.5-1.5 1-1.5.6 0 1-1.1 1-2.5s-.4-2.5-1-2.5-1-4.2-1-10.5V451h6v6c0 5.7.1 6 2.5 6s2.5-.3 2.5-6v-6h8v21h-5c-4.7 0-5 .2-5 2.5s.3 2.5 5 2.5h5v17h-5c-4.7 0-5 .2-5 2.5s.3 2.5 5 2.5c4.9 0 5 .1 5 3v3h-19v-3c0-1.7.5-3 1-3 .6 0 1-1.1 1-2.5s-.4-2.5-1-2.5c-.5 0-1-.7-1-1.5 0-1-1-1.5-2.6-1.5-2.5 0-2.6.2-2 3.7.3 2.1.6 16.1.6 31V553h28v-30h-5v26h-19v-39h9.5c7.8 0 9.5.3 9.5 1.5 0 1 1 1.5 2.6 1.5h2.7l-.5-78c-.3-42.9-.7-78.2-.9-78.4-.2-.2-2.1-.7-4.1-1.1-3.6-.7-3.8-.6-3.8 1.9 0 1.9.5 2.6 2 2.6 1.8 0 2 .7 2 7v7h-20v-14h3.5c3.1 0 3.5-.3 3.5-2.5 0-2.4-.3-2.5-5.5-2.5H470v13zM80 426.7c-5.5 2.9-8 7.5-8 14.8 0 7.3 2.5 11.9 8 14.8 9.6 5 20-2.7 20-14.8 0-12.1-10.4-19.8-20-14.8zm12.7 4.7c2.6 2.3 2.8 2.9 2.8 10.1 0 7.2-.2 7.8-2.8 10.1-3.8 3.2-9.6 3.3-13.3.1-4.9-4.3-4.9-16.1.1-20.4 3.6-3.2 9.5-3.1 13.2.1zM199.6 426c-6.3 2-9.6 7.3-9.6 15.5 0 12.2 8.4 18.6 20 15.2 3.4-.9 4.6-1.8 4.8-3.5.4-2.6.3-2.6-3.4-.7-1.6.8-4.9 1.5-7.2 1.5-3.6 0-4.9-.6-7.2-3-4.7-5-4.4-15.5.5-19.7 3.1-2.7 9.5-3.1 13.9-.8 3.6 1.9 3.6 1.9 3.6-.5 0-1-.9-2.4-2-3-2.8-1.5-10.1-2.1-13.4-1zM44 441.5c0 13.1.2 15.5 1.5 15.5 1.2 0 1.5-1.4 1.5-6.5 0-5.6.3-6.5 1.8-6.5 1 0 4.7 2.9 8.2 6.5 4.3 4.3 7.2 6.5 8.8 6.5 2.1 0 1.5-.9-4.7-7.7-6.9-7.5-8.1-9.3-6.1-9.3.5 0 2.1-2.3 3.5-5 2-4 3-5 5-5 1.8 0 2.5-.5 2.5-2 0-4.3-7.1-1.5-9.5 3.7-2.3 4.9-5.4 8.3-7.7 8.3-1.6 0-1.8-.9-1.8-7 0-5.6-.3-7-1.5-7-1.3 0-1.5 2.4-1.5 15.5zM107 441.4c0 14.9.1 15.6 2 15.6 1.8 0 2-.7 2-6v-6h3.5c4.6 0 10.1-2.3 11.4-4.8 1.9-3.6 1.3-8.6-1.4-11.2-2-1.9-3.9-2.4-10-2.8l-7.5-.5v15.7zM133 441.5c0 14.8.1 15.5 2 15.5s2-.7 2-13.5V430h16v13.5c0 12.8.1 13.5 2 13.5s2-.7 2-15.5V426h-24v15.5zM162 426.5c0 .3 2.5 5.5 5.5 11.5s5.5 11.2 5.5 11.4c0 1.5-3.6 3.6-6.1 3.6-2.2 0-2.9.5-2.9 2 0 2.5 4.5 2.7 7.9.4 2-1.5 6.9-10.7 13.2-25.2 1.7-4 1.7-4.2.1-4.2-1.3 0-3.1 2.7-6.1 9.2l-4.3 9.3-4.6-9.3c-3.2-6.4-5.2-9.2-6.4-9.2-1 0-1.8.2-1.8.5zM276.6 434.5c-5.1 5.8-7.6 9.3-7.6 11 0 2.4.2 2.5 7.5 2.5h7.5v4.5c0 3.3.4 4.5 1.5 4.5s1.5-1.2 1.5-4.5c0-4.1.2-4.5 2.5-4.5 1.8 0 2.5-.5 2.5-2s-.7-2-2.5-2c-2.5 0-2.5-.1-2.5-9 0-7.1-.3-9-1.4-9-.8 0-4.9 3.8-9 8.5zM450 495v37h-5c-4.7 0-5 .2-5 2.5s.3 2.5 5 2.5h5v3.5c0 2.8.4 3.5 2 3.5 2 0 2-.7 2-43s0-43-2-43-2 .7-2 37zM47.5 479.4c-.5.3-2.2.7-3.7 1-2.1.5-2.8 1.2-2.8 3.1 0 2.3.1 2.3 2.8.9 4.5-2.3 11.6-1.8 15 1.1 1.6 1.4 3.2 3.4 3.5 4.5.5 1.9 0 2-7.9 2-7.7 0-8.4.2-8.4 2s.7 2 8.5 2c5.2 0 8.5.4 8.5 1 0 2.4-3 7.9-5.1 9.4-2.9 2-10.4 2.1-14.1.2-2.7-1.4-2.8-1.4-2.8.9 0 2.9 2.9 4 10.6 3.9 9.2 0 14.4-5.7 14.4-15.7 0-7-2-11.7-5.9-14-2.8-1.7-10.6-3-12.6-2.3zM69 482c0 1.8.7 2 5.5 2H80v13.5c0 12.8.1 13.5 2 13.5s2-.7 2-13.5V484h5.5c4.8 0 5.5-.2 5.5-2 0-1.9-.7-2-13-2s-13 .1-13 2zM102 494.2c-2.9 7.9-5.5 14.9-5.7 15.5-.3.8.3 1.3 1.4 1.3 1.4 0 2.4-1.2 3.3-4l1.3-4h14.4l1.6 4c.9 2.3 2.2 4 3.1 4 .9 0 1.6-.4 1.6-.9 0-.4-2.4-7.3-5.3-15.2-4.8-13-5.6-14.4-7.9-14.7-2.4-.3-2.8.4-7.8 14zM126 481.9c0 1.3.8 2.1 2.2 2.3 1.5.2 3.1 1.8 4.6 4.8 1.3 2.5 2.8 4.8 3.4 5.1 1.3.8.8 1.7-5.9 10.1-4.9 6.2-5.2 6.8-3.1 6.8 1.7-.1 3.8-2 7.6-7 6.9-9.1 8.2-9.1 8.2 0 0 6.3.2 7 2 7s2-.7 2-7c0-5 .4-7 1.3-7 .7 0 3.6 3.1 6.6 7 3.3 4.3 6 7 7.2 7 1 0 1.9-.3 1.9-.6 0-.4-2.5-3.8-5.7-7.7-4.6-5.8-5.4-7.3-4.4-8.6.6-.9 2-3.5 3.1-5.9 1.5-3.3 2.5-4.2 4.5-4.2 1.8 0 2.5-.5 2.5-2 0-4.3-7.5-1.4-9.6 3.7-1.9 4.5-4.2 7.3-6.1 7.3-.9 0-1.3-1.7-1.3-6.5 0-5.8-.2-6.5-2-6.5s-2 .7-2 6.5c0 9.1-2.9 8.7-7.8-1.1-1.9-3.8-4.2-5.3-7.9-5.4-.7 0-1.3.9-1.3 1.9zM228.2 482c-.7 1.1-2.3 2-3.7 2-1.8 0-2.5.5-2.5 2 0 1.6.7 2 3.5 2h3.5v19h-3.5c-2.8 0-3.5.4-3.5 2 0 1.8.7 2 8 2s8-.2 8-2c0-1.6-.7-2-3-2h-3v-13.5c0-10.2-.3-13.5-1.3-13.5-.7 0-1.8.9-2.5 2zM517 534c0 44.3 0 45 2 45s2-.7 2-45 0-45-2-45-2 .7-2 45z" />
      <Circle cx={START_POINT.x} cy={START_POINT.y} r={5} fill="green" />
      <Svg  width={SVG_WIDTH} height={SVG_HEIGHT} >
      {/* Рисуем сетку */}
        {grid.map((node, index) => (
        <Circle
          key={index}
          cx={node.x}
          cy={node.y}
          r={node.isObstacle ? 3 : 1}
          fill={node.isStart ? 'green' : node.isEnd ? 'red' : node.isObstacle ? 'gray' : 'white'}
          stroke="black"
          strokeWidth={0.2}
          
        />
      ))}

      </Svg>
      <G transform="translate(410 545)" >
        <Path stroke="black" onPress={() => setModalVisibleA103(!modalVisibleA103)}  d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z"  />
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA103} onRequestClose={() => { Alert.alert("Modal has been closed."); setModalVisibleA103(!modalVisibleA103);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity   onPress={() => setModalVisibleA103(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity ><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>

      <G transform="translate(410 470)">
          <Path stroke="black" onPress={() => setModalVisibleA104(!modalVisibleA104)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
          <Modal animationType="slide" transparent={true}  visible={modalVisibleA104} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleA104(!modalVisibleA104);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA104(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>

      <G  transform="translate(410 370)">
        <Path stroke="black" onPress={() => setModalVisibleA106(!modalVisibleA106)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA106} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleA106(!modalVisibleA106);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA106(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>
  
      <G transform="translate(235 245)">
        <Path stroke="black" onPress={() => setModalVisibleA112(!modalVisibleA112)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA112} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleA112(!modalVisibleA112);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA112(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity onPress={()=>handlePointPress(235, 105)} ><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>

      <G  transform="translate(175 245)">
        <Path  stroke="black" onPress={() => setModalVisibleA113(!modalVisibleA113)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA113} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleA113(!modalVisibleA113);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA113(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>     
     </G>

      <G transform="translate(130 245)">
        <Path stroke="black" onPress={() => setModalVisibleA114(!modalVisibleA114)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA114} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleA114(!modalVisibleA114);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA114(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>

      <G transform="translate(80 245)">
        <Path stroke="black" onPress={() => setModalVisibleA115(!modalVisibleA115)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA115} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleA115(!modalVisibleA115);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA115(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>
      {path && (
          <Path
            d={`M${path[0].x},${path[0].y} ${path.map((node) => `${node.x},${node.y}`).join(' ')}`}
            stroke="blue"
            strokeWidth={2}
            fill="none"
          />
        )} 
      <G transform="translate(75 105)">
        <Path stroke="black" onPress={() => setModalVisibleA123(!modalVisibleA123)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA123} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleA123(!modalVisibleA123);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA123(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity onPress={()=>handlePointPress(75, 105)} ><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>
     
      <G transform="translate(111 105)">
        <Path stroke="black" onPress={() => setModalVisibleA124(!modalVisibleA124)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA124} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleA124(!modalVisibleA124);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA124(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>

      <G transform="translate(183 105)">
        <Path stroke="black" onPress={() => setModalVisibleA127(!modalVisibleA127)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA127} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleA127(!modalVisibleA127);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA127(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>

      <G transform="translate(215 105)">
        <Path stroke="black" onPress={() => setModalVisibleA128(!modalVisibleA128)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA128} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleA128(!modalVisibleA128);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA128(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity onPress={()=>handlePointPress(200, 100)} ><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>

      <G transform="translate(250 105)">
        <Path stroke="black" onPress={() => setModalVisibleA129(!modalVisibleA129)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA129} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleISE(!modalVisibleA129);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA129(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>

      <G transform="translate(285 105)">
        <Path stroke="black" onPress={() => setModalVisibleA130(!modalVisibleA130)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA130} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleA130(!modalVisibleA130);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA130(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>

      <G transform="translate(325 105)">
        <Path stroke="black" onPress={() => setModalVisibleA131(!modalVisibleA131)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA131} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleA131(!modalVisibleA131);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA131(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>

      <G transform="translate(480 160)">
        <Path stroke="black" onPress={() => setModalVisibleA132(!modalVisibleA132)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA132} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleA132(!modalVisibleA132);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA132(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>

      <G transform="translate(550 305)">
        <Path stroke="black" onPress={() => setModalVisibleA136(!modalVisibleA136)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA136} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleA136(!modalVisibleA136);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA136(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>

      <G transform="translate(550 395)">
        <Path stroke="black" onPress={() => setModalVisibleA137(!modalVisibleA137)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA137} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleA137(!modalVisibleA137);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA137(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>

      <G transform="translate(550 445)">
        <Path stroke="black" onPress={() => setModalVisibleA138(!modalVisibleA138)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA138} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleA138(!modalVisibleA138);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA138(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>

      <G transform="translate(550 500)">
        <Path stroke="black" onPress={() => setModalVisibleA139(!modalVisibleA139)} d="M17.027,8 C17.027,3.5808656 13.4449707,0 9.027,0 C4.60902928,0 1.027,3.5808656 1.027,8 C1.027,12.4191344 4.60902928,16 9.027,16 C13.4449707,16 17.027,12.4191344 17.027,8 L17.027,8 Z M5.15423141,10 C4.94858953,9.81414406 4.94858953,9.22609194 5.15423141,9.03925264 L8.62117967,4.14012948 C8.827787,3.95329017 9.16183436,3.95329017 9.36651079,4.14012948 L12.8450445,9.03925264 C13.0516518,9.22510858 13.0516518,9.8131607 12.8450445,10 L5.15423141,10 L5.15423141,10 Z" /> 
        <Modal animationType="slide" transparent={true}  visible={modalVisibleA139} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleA139(!modalVisibleA139);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                  <TouchableOpacity onPress={() => setModalVisibleA139(false)}><Text>кнопка закрытие</Text></TouchableOpacity>
                  <TouchableOpacity><Text>кнопка отслеживания</Text></TouchableOpacity>
                  <Text>Описание</Text>
                </ScrollView>
            </View>
        </Modal>
      </G>    
     
    </Svg> 

  </View>
  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
