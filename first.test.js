const sourceData = [
  140517,
  61738,
  141916,
  78376,
  69208,
  131761,
  67212,
  137805,
  79089,
  100457,
  108707,
  75235,
  51118,
  149457,
  68888,
  85722,
  91418,
  74481,
  93441,
  124911,
  75441,
  101542,
  149092,
  83149,
  139256,
  83398,
  76398,
  132252,
  137763,
  142758,
  136279,
  126238,
  102888,
  108723,
  119982,
  65216,
  61412,
  120894,
  118761,
  100221,
  67132,
  115494,
  95623,
  52819,
  78612,
  125505,
  80523,
  97774,
  67569,
  114514,
  131671,
  149811,
  77679,
  65540,
  98415,
  60595,
  105589,
  81927,
  60249,
  62514,
  139506,
  149532,
  146885,
  148831,
  142896,
  106300,
  106313,
  101456,
  96521,
  67104,
  142037,
  128258,
  128769,
  135081,
  93181,
  50735,
  147720,
  73775,
  58113,
  53478,
  96705,
  122060,
  135329,
  121513,
  54539,
  62404,
  66334,
  116924,
  90977,
  135383,
  51479,
  87581,
  124040,
  64048,
  78616,
  128068,
  148184,
  71714,
  58847,
  84640
];

describe("Tests", () => {
  it("should work", () => {
    let runningTotal = 0;

    sourceData.forEach(item => {
      const second = Math.floor(item / 3);
      const third = second - 2;
      runningTotal += third;
    });

    expect(runningTotal).toEqual(3339288);
  });

  it("should not be shit", () => {
    const calculate = (result, first) => {
      const second = Math.floor(first / 3);
      const third = second - 2;

      if (third <= 0) {
        return;
      }

      result.push(third);

      return calculate(result, third);
    };

    const sum = input => input.reduce((acc, current) => acc + current, 0);

    let total = 0;
    sourceData.forEach(item => {
      const result = [];
      calculate(result, item);

      total += sum(result);
    });

    expect(total).toEqual(5006064);
  });
});
