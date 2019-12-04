describe("Intcode tests", () => {
  const memory = [
    1,
    0,
    0,
    3,
    1,
    1,
    2,
    3,
    1,
    3,
    4,
    3,
    1,
    5,
    0,
    3,
    2,
    9,
    1,
    19,
    1,
    5,
    19,
    23,
    2,
    9,
    23,
    27,
    1,
    27,
    5,
    31,
    2,
    31,
    13,
    35,
    1,
    35,
    9,
    39,
    1,
    39,
    10,
    43,
    2,
    43,
    9,
    47,
    1,
    47,
    5,
    51,
    2,
    13,
    51,
    55,
    1,
    9,
    55,
    59,
    1,
    5,
    59,
    63,
    2,
    6,
    63,
    67,
    1,
    5,
    67,
    71,
    1,
    6,
    71,
    75,
    2,
    9,
    75,
    79,
    1,
    79,
    13,
    83,
    1,
    83,
    13,
    87,
    1,
    87,
    5,
    91,
    1,
    6,
    91,
    95,
    2,
    95,
    13,
    99,
    2,
    13,
    99,
    103,
    1,
    5,
    103,
    107,
    1,
    107,
    10,
    111,
    1,
    111,
    13,
    115,
    1,
    10,
    115,
    119,
    1,
    9,
    119,
    123,
    2,
    6,
    123,
    127,
    1,
    5,
    127,
    131,
    2,
    6,
    131,
    135,
    1,
    135,
    2,
    139,
    1,
    139,
    9,
    0,
    99,
    2,
    14,
    0,
    0
  ];

  it("should work", () => {
    const input = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];

    for (let i = 0; i < input.length; i += 4) {
      let opcode = input[i];
      let firstInputPosition = i + 1;
      let secondInputPosition = i + 2;
      let outputPosition = input[i + 3];

      let result = 0;

      if (opcode === 1) {
        result =
          input[input[firstInputPosition]] + input[input[secondInputPosition]];
      } else if (opcode === 2) {
        result =
          input[input[firstInputPosition]] * input[input[secondInputPosition]];
      } else if (opcode === 99) {
        return;
      }

      input[outputPosition] = result;
    }

    expect(input).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
  });

  it("small program 1", () => {
    const input = [1, 0, 0, 0, 99];
    let opcode = input[0];
    let firstInputPosition = 1;
    let secondInputPosition = 2;
    let outputPosition = input[3];

    let result = 0;

    if (opcode === 1) {
      result =
        input[input[firstInputPosition]] + input[input[secondInputPosition]];
    } else if (opcode === 2) {
      result =
        input[input[firstInputPosition]] * input[input[secondInputPosition]];
    } else if (opcode === 99) {
      return;
    }

    input[outputPosition] = result;

    expect(input).toEqual([2, 0, 0, 0, 99]);
  });

  it("small program 2", () => {
    const input = [2, 3, 0, 3, 99];
    let opcode = input[0];
    let firstInputPosition = 1;
    let secondInputPosition = 2;
    let outputPosition = input[3];

    let result = 0;

    if (opcode === 1) {
      result =
        input[input[firstInputPosition]] + input[input[secondInputPosition]];
    } else if (opcode === 2) {
      result =
        input[input[firstInputPosition]] * input[input[secondInputPosition]];
    } else if (opcode === 99) {
      return;
    }

    input[outputPosition] = result;

    expect(input).toEqual([2, 3, 0, 6, 99]);
  });

  it("small program 3", () => {
    const input = [2, 4, 4, 5, 99, 0];
    let opcode = input[0];
    let firstInputPosition = 1;
    let secondInputPosition = 2;
    let outputPosition = input[3];

    let result = 0;

    if (opcode === 1) {
      result =
        input[input[firstInputPosition]] + input[input[secondInputPosition]];
    } else if (opcode === 2) {
      result =
        input[input[firstInputPosition]] * input[input[secondInputPosition]];
    } else if (opcode === 99) {
      return;
    }

    input[outputPosition] = result;

    expect(input).toEqual([2, 4, 4, 5, 99, 9801]);
  });

  it("small program 4", () => {
    const input = [1, 1, 1, 4, 99, 5, 6, 0, 99];
    let opcode = input[0];
    let firstInputPosition = 1;
    let secondInputPosition = 2;
    let outputPosition = input[3];

    let result = 0;

    if (opcode === 1) {
      result =
        input[input[firstInputPosition]] + input[input[secondInputPosition]];
    } else if (opcode === 2) {
      result =
        input[input[firstInputPosition]] * input[input[secondInputPosition]];
    } else if (opcode === 99) {
      return;
    }

    input[outputPosition] = result;

    opcode = input[4];
    firstInputPosition = 5;
    secondInputPosition = 6;
    outputPosition = input[7];

    if (opcode === 1) {
      result =
        input[input[firstInputPosition]] + input[input[secondInputPosition]];
    } else if (opcode === 2) {
      result =
        input[input[firstInputPosition]] * input[input[secondInputPosition]];
    } else if (opcode === 99) {
      return;
    }

    input[outputPosition] = result;

    expect(input).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  });

  const calculate = memory => {
    for (let i = 0; i < memory.length; i += 4) {
      let instruction = memory[i];
      let firstInputAddress = i + 1;
      let secondInputAddress = i + 2;
      let outputAddress = memory[i + 3];

      let result = 0;

      if (instruction === 1) {
        result =
          memory[memory[firstInputAddress]] +
          memory[memory[secondInputAddress]];
      } else if (instruction === 2) {
        result =
          memory[memory[firstInputAddress]] *
          memory[memory[secondInputAddress]];
      } else if (instruction === 99) {
        break;
      }

      memory[outputAddress] = result;
    }

    return memory;
  };

  it("part 1", () => {
    const memoryCopy = memory.slice();
    memoryCopy[1] = 12;
    memoryCopy[2] = 2;

    const result = calculate(memoryCopy);

    expect(result[0]).toEqual(5110675);
  });

  it("part 2", () => {
    for (let noun = 0; noun < 100; noun++) {
      for (let verb = 0; verb < 100; verb++) {
        const memoryCopy = memory.slice();
        memoryCopy[1] = noun;
        memoryCopy[2] = verb;

        const result = calculate(memoryCopy);

        if (result[0] === 19690720) {
          console.log(`Result: ${100 * noun + verb}`);
          break;
        }
      }
    }
  });
});
