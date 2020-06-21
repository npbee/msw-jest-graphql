import faker from "faker";

let data = createDatabase();

function createDatabase() {
  return new Map([["tweet", new Map()]]);
}

let factories = {
  tweet: tweet => ({
    body: "A toot!",
    likes: 0,
    ...tweet,
  }),
};

export let db = {
  clear() {
    data = createDatabase();
  },
  create(model, attrs) {
    let id = faker.random.uuid();

    let thing = {
      id,
      ...attrs,
    };

    if (factories[model]) {
      thing = factories[model](thing);
    }

    data.get(model).set(id, thing);

    return thing;
  },

  get(model, id) {
    return data.get(model).get(id);
  },

  getAll(model) {
    return [...data.get(model).values()];
  },

  update(model, id, updater) {
    let item = db.get(model, id);

    if (!item) {
      throw new Error("Trying to update an item that doesn't exist");
    }

    item = updater(item);

    data.get(model).set(id, item);

    return item;
  },
};
