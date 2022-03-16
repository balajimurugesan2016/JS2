let output = [
  { key: ["id"], value: "0001" },
  { key: ["type"], value: "donut" },
  { key: ["name"], value: "Cake" },
  { key: ["ppu"], value: 0.55 },
  {
    key: ["batters", "batter"],
    value: [
      { id: "1001", type: "Regular" },
      { id: "1002", type: "Chocolate" },
      { id: "1003", type: "Blueberry" },
      { id: "1004", type: "Devil's Food" },
    ],
  },
  {
    key: ["topping"],
    value: [
      { id: "5001", type: "None" },
      { id: "5002", type: "Glazed" },
      { id: "5005", type: "Sugar" },
      { id: "5007", type: "Powdered Sugar" },
      { id: "5006", type: "Chocolate with Sprinkles" },
      { id: "5003", type: "Chocolate" },
      { id: "5004", type: "Maple" },
    ],
  },
];

let data = {
  id: "0001",
  type: "donut",
  name: "Cake",
  ppu: 0.55,
  batters: {
    batter: [
      { id: "1001", type: "Regular" },
      { id: "1002", type: "Chocolate" },
      { id: "1003", type: "Blueberry" },
      { id: "1004", type: "Devil's Food" },
    ],
  },
  topping: [
    { id: "5001", type: "None" },
    { id: "5002", type: "Glazed" },
    { id: "5005", type: "Sugar" },
    { id: "5007", type: "Powdered Sugar" },
    { id: "5006", type: "Chocolate with Sprinkles" },
    { id: "5003", type: "Chocolate" },
    { id: "5004", type: "Maple" },
  ],
};

var flattenedarray = [],
  outputarray = [];
var currentkey = null;

flattenData(data);
outputflattenedData(flattenedarray);

function outputflattenedData(farray) {
    let outrecord = {
        key: [],
        value: [],
      };
  farray.forEach((fdata) => {
    if (fdata.includes("$")) {
      let record = fdata.split("$");
      let keys = record[0].split("/");
      if (currentkey !== record[0]) {
        outrecord.key = [];
        outrecord.value = [];
        currentkey = record[0];
        let localoutrecord = {...outrecord};
        outputarray = [...outputarray,localoutrecord]
        keys.forEach((key) => localoutrecord.key = [...localoutrecord.key,key]);
        console.log();
        
      }
      let values = record[1].split("-");
      let valuerecord = {};
      valuerecord[values[0]] = values[1];
      outputarray[outputarray.length - 1].value = [...outputarray[outputarray.length - 1].value,valuerecord]

     
    } else {
        let outrecord = {
            key: [],
            value: [],
          };
      let values = fdata.split("-");
      let valuerecord = {};
      outrecord.key = [...outrecord.key,values[0]];
      outrecord.value = [...outrecord.value,values[1]];
      outputarray = [...outputarray,outrecord];
    }
  });
 return outputarray;
}

function flattenData(data, pkey) {
  const keys = Object.keys(data);
  keys.forEach((key) => {
    if (data[key] instanceof Object) {
      if (Array.isArray(data[key])) {
        //flattenedarray.push(`${key} ${"-"}`);
        data[key].forEach((datum) => {
          if (pkey) {
            flattenData(datum, `${pkey} ${"/"} ${key}`);
          } else {
            flattenData(datum, `${key}`);
          }
        });
      } else {
        //flattenedarray.push(`${key} ${"-"}`);
        if (pkey) {
          flattenData(data[key], `${pkey} ${"/"} ${key}`);
        } else {
          flattenData(data[key], `${key}`);
        }
        //flattenData(data[key]);
      }
    } else {
      if (pkey) {
        flattenedarray = [...flattenedarray,`${pkey} ${"$"} ${key} ${"-"} ${data[key]}`];
      } else {
        flattenedarray = [...flattenedarray,`${key} ${"-"} ${data[key]}`];
      }
    }
  });
}
