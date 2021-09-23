const AdvancedStorage = artifacts.require("AdvancedStorage");

contract("AdvancedStorage", () => {
  it("should add elements to the ids array", async () => {
    const instance = await AdvancedStorage.deployed();
    const newElement = 10;
    await instance.add(newElement);
    const result = await instance.ids(0);
    assert(newElement === result.toNumber());
  });

  it("should get elements by position", async () => {
    const instance = await AdvancedStorage.deployed();
    const newElement = 20;
    await instance.add(newElement);
    const position = 1;
    await instance.get(position);
    const result = await instance.ids(position);
    assert(newElement === result.toNumber());
  });

  it("should get all elements from ids array", async () => {
    const instance = await AdvancedStorage.deployed();
    const rawResult = await instance.getAll();
    const result = rawResult.map((r) => r.toNumber());
    assert.deepEqual([10, 20], result);
  });

  it("should get the length of the ids array", async () => {
    const instance = await AdvancedStorage.deployed();
    const result = await instance.length();
    assert(result.toNumber() === 2);
  });
});
