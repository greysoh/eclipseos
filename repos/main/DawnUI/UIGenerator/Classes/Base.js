// Do not use! This is just a template, based on TextLabel.

class BaseTemplate {
  constructor(data, x, y, params) {
    this.pos = {
      x: x,
      y: y
    };

    this.someData = data;
    this.drawItems = params.drawItems;

    this.objRef = uuidv4();
    this.drawItems.push({
      type: "amogus",

      someData: this.someData,

      objRef: this.objRef,
      pos: this.pos
    });
  }

  #fetchDefaultConfiguration() {
    return {
      type: "amogus",

      someData: this.someData,

      objRef: this.objRef,
      pos: this.pos
    };
  }

  #update(newContents) {
    const contents = this.#fetchDefaultConfiguration();

    const item = this.drawItems.find(i => i.objRef == this.objRef);
    this.drawItems.splice(this.drawItems.indexOf(item), 1, newContents);
  }

  updatePos(x, y) {
    this.pos = {
      x: typeof x == "number" ? x : this.pos.x, 
      y: typeof y == "number" ? x : this.pos.y
    }

    this.#update();
  }

  updateSomeData(data) {
    this.someData = typeof data == "string" ? data : this.someData;

    this.#update();
  }
}