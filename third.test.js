describe("Crossed wires", () => {
  const characterMap = {
    R: "-",
    L: "-",
    U: "|",
    D: "|",
    Junction: "+",
    Spacer: ".",
    CentralPort: "o",
    CrossedWires: "X"
  };

  const createGrid = (columns, rows, position) => {
    const grid = JSON.parse(
      JSON.stringify(Array(rows).fill(Array(columns).fill(characterMap.Spacer)))
    );

    grid[position.row][position.column] = characterMap.CentralPort;

    return grid;
  };

  const patchIfNeeded = (current, next) =>
    current === characterMap.Spacer ? next : characterMap.CrossedWires;

  const patchGrid = (grid, direction, moves, position, last) => {
    switch (direction) {
      case "R":
        for (let i = 1; i < moves; i++) {
          grid[position.row][(position.column += 1)] = patchIfNeeded(
            grid[position.row][position.column],
            characterMap[direction]
          );
        }
        grid[position.row][(position.column += 1)] = last
          ? characterMap[direction]
          : characterMap.Junction;
        break;
      case "U":
        for (let i = 1; i < moves; i++) {
          grid[(position.row -= 1)][position.column] = patchIfNeeded(
            grid[position.row][position.column],
            characterMap[direction]
          );
        }
        grid[(position.row -= 1)][position.column] = last
          ? characterMap[direction]
          : characterMap.Junction;
        break;
      case "L":
        for (let i = 1; i < moves; i++) {
          grid[position.row][(position.column -= 1)] = patchIfNeeded(
            grid[position.row][position.column],
            characterMap[direction]
          );
        }
        grid[position.row][(position.column -= 1)] = last
          ? characterMap[direction]
          : characterMap.Junction;
        break;
      case "D":
        for (let i = 1; i < moves; i++) {
          grid[(position.row += 1)][position.column] = patchIfNeeded(
            grid[position.row][position.column],
            characterMap[direction]
          );
        }
        grid[(position.row += 1)][position.column] = last
          ? characterMap[direction]
          : characterMap.Junction;
        break;
    }
  };

  const drawGrid = grid => {
    return grid.map(row => row.join("")).join("\n");
  };

  it("first example", () => {
    const columns = 11;
    const rows = 10;

    let position = {
      row: rows - 2,
      column: 1
    };

    const grid = createGrid(columns, rows, position);
    let instructions = ["R8", "U5", "L5", "D3"];

    instructions.forEach((instruction, index) => {
      const direction = instruction.substr(0, 1);
      const moves = Number.parseInt(instruction.substr(1, 1));
      patchGrid(
        grid,
        direction,
        moves,
        position,
        index === instructions.length - 1
      );
    });

    expect(drawGrid(grid)).toEqual(`...........
...........
...........
....+----+.
....|....|.
....|....|.
....|....|.
.........|.
.o-------+.
...........`);

    // Restart for second wire

    position = {
      row: rows - 2,
      column: 1
    };

    instructions = ["U7", "R6", "D4", "L4"];

    instructions.forEach((instruction, index) => {
      const direction = instruction.substr(0, 1);
      const moves = Number.parseInt(instruction.substr(1, 1));
      patchGrid(
        grid,
        direction,
        moves,
        position,
        index === instructions.length - 1
      );
    });

    expect(drawGrid(grid)).toEqual(`...........
.+-----+...
.|.....|...
.|..+--X-+.
.|..|..|.|.
.|.-X--+.|.
.|..|....|.
.|.......|.
.o-------+.
...........`);
  });
});
