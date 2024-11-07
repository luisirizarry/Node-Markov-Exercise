const { MarkovMachine } = require('./markov'); 

describe("MarkovMachine", () => {
  test('chains are correctly made from the input', () => {
    const mm = new MarkovMachine("quick brown fox");
    expect(mm.chains.has("quick")).toBeTruthy();
    expect(mm.chains.get("quick")).toContain("brown");
    expect(mm.chains.get("brown")).toContain("fox");
    expect(mm.chains.get("fox")).toContain(null);
  });

  test('makeText returns a string', () => {
    const mm = new MarkovMachine("quick brown fox");
    const text = mm.makeText();
    expect(typeof text).toBe("string");
  });

  test('makeText returns text of the length we want', () => {
    const mm = new MarkovMachine("quick brown fox");
    const text = mm.makeText(10);  // requesting 10 words
    expect(text.split(" ").length).toBeLessThanOrEqual(10);
  });
});
