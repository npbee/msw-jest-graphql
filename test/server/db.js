let id = 0;
let makeId = () => (id += 1);

let data = {
  tweet: {},
};

let factories = {
  tweet: tweet => ({
    title: "A Post",
    likes: 0,
    ...tweet,
  }),
};

export let db = {
  clear() {
    data = {
      tweet: {},
    };
  },
  create(model, attrs) {
    let id = makeId();

    let thing = {
      id,
      ...attrs,
    };

    if (factories[model]) {
      thing = factories[model](thing);
    }

    data[model][id] = thing;

    return thing;
  },

  get(model, id) {
    let items = data[model];

    if (items) {
      return items[id];
    }
  },

  getAll(model) {
    return Object.values(data[model] || {});
  },

  update(model, id, attrs) {
    let item = db.get(model, id);

    if (!item) {
      throw new Error("Trying to update an item that doesn't exist");
    }

    item = {
      ...item,
      ...attrs,
    };

    data[model][id] = item;

    return item;
  },
};
