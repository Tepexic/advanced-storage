const AdvancedStorage = artifacts.require("AdvancedStorage");

let instance = null;
before(async () => {
  instance = await AdvancedStorage.deployed();
});

const newElement = [10, 20];

contract("AdvancedStorage", () => {
  it("should add elements to the ids array", async () => {
    await instance.add(newElement[0]);
    const result = await instance.ids(0);
    assert(newElement[0] === result.toNumber());
  });

  it("should get elements by position", async () => {
    await instance.add(newElement[1]);
    const position = 1;
    await instance.get(position);
    const result = await instance.ids(position);
    assert(newElement[1] === result.toNumber());
  });

  it("should get all elements from ids array", async () => {
    const rawResult = await instance.getAll();
    const result = rawResult.map((r) => r.toNumber());
    assert.deepEqual(newElement, result);
  });

  it("should get the length of the ids array", async () => {
    const result = await instance.length();
    assert(result.toNumber() === newElement.length);
  });
});
