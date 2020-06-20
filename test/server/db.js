let id = 0;
let makeId = () => (id += 1);

let data = {
  posts: {},
};

export let db = {
  create(model, attrs) {
    let id = makeId();

    let post = {
      id,
      ...attrs,
    };

    data[model][id] = post;

    return post;
  },

  get(model, id) {
    let items = data[model];

    if (items) {
      return items[id];
    }
  },

  update(model, id, attrs) {
    let item = db.get(model, id);

    if (!item) {
      throw new Error("Trying to get an item that doesn't exist");
    }

    item = {
      ...item,
      ...attrs,
    };

    data[model][id] = item;

    return item;
  },
};
