function lookup(obj, path) {
  if (!obj) return "Error: Object is null or not defined";

  const keys = path.split(".");
  let value = { ...obj };

  try {
    for (var key of keys) {
      value = value[key];
    }
    return value === undefined ? "Error: Invalid path..." : value;
  } catch (err) {
    return "Error (null property): " + err;
  }
}

const obj = {
  person: {
    name: "Mirza",
    adress: { city: "Phnom Penh", number: 43, street: "Ize Gegaja" },
  },
};

console.log(lookup(obj, "person.adress.street"));
