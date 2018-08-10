/**
 * Check gas for scenarios with values stored in separate maps or all in the one map.
 *
 * When looking at the gas costs, recall that at the moment (August 2018), sstore for a new location costs 20000,
 * reusing a location costs 5000, and the base transaction cost is 21000.
 *
 * The Truffle output was:                                           Notes
 *
 *   Contract: Map Scenarios: Gas Usage
 Gas Used (setUsingRecord): 83500
 Gas Used (setUsingRecord, after first storage): 38500
 Gas Used (setUsingRecord, storing based on new key): 83500          Storing against new keys costs the same as against the first key. For comparison see (setUsingRecord): 83500
 Gas Used (setUsingRecord, second use of new key): 38500
 ✓ setUsingRecord (134ms)
 Gas Used (setOneUsingRecord): 53024                                 Storing zeros for some values means that it costs substantially less than storing values. For comparison see (setUsingRecord): 83500
 Gas Used (setOneUsingRecord, after first storage): 38024
 ✓ setOneUsingRecord (83ms)
 Gas Used (setTwoUsingRecord): 68185
 Gas Used (setTwoUsingRecord): 38185
 ✓ setTwoUsingRecord (89ms)
 Gas Used (getOneUsingRecordFakeView): 21993
 Gas Used (getOneUsingRecordFakeView, for unused key): 21993        View for a used or unused key costs the same. See (getOneUsingRecordFakeView): 21993
 ✓ getOneUsingRecordFakeView (108ms)
 Gas Used (setUsingSeparate): 83437                                 It costs (surprisingly) slightly less to store in three separate maps. For comparison see (setUsingRecord): 83500
 Gas Used (setUsingSeparate, after first storage): 38437
 Gas Used (setUsingSeparate, storing based on new key): 83437
 Gas Used (setUsingSeparate, second use of new key): 38437
 ✓ setUsingSeparate (137ms)
 Gas Used (setOneUsingSeparate): 42227                              It costs substantially less to just store one value using separate maps: For comparison see (setOneUsingRecord): 53024
 Gas Used (setOneUsingSeparate): 27227
 ✓ setOneUsingSeparate (82ms)
 Gas Used (setTwoUsingSeparate): 62887                              It costs substantially less to just store two values using separate maps: For comparison see (setTwoUsingRecord): 68185
 Gas Used (setTwoUsingSeparate, after first storage): 32887
 ✓ setTwoUsingSeparate (87ms)
 Gas Used (getOneUsingRecordFakeView): 22119                        Curiously it costs slightly more to read from a map with a single address, rather than one with three values...
 Gas Used (getOneUsingRecordFakeView, for unused key): 22119         For comparison see Gas Used (getOneUsingRecordFakeView): 21993
 ✓ getOneUsingSeparateFakeView (103ms)
 *
 */
const MapScenarios = artifacts.require("./MapScenarios.sol");


contract('Map Scenarios: Gas Usage', function(accounts) {

    const zero = "0x0";

    const key = "0x1";
    const key2 = "0x2";
    const addr1 = "0x2";
    const addr2 = "0x3";
    const addr3 = "0x4";


    it("setUsingRecord", async function() {
        let maps = await MapScenarios.new();
        let transactionResult = await maps.setUsingRecord(key, addr1, addr2, addr3);
        console.log("Gas Used (setUsingRecord): " + transactionResult.receipt.gasUsed);
        transactionResult = await maps.setUsingRecord(key, addr1, addr2, addr3);
        console.log("Gas Used (setUsingRecord, after first storage): " + transactionResult.receipt.gasUsed);
        transactionResult = await maps.setUsingRecord(key2, addr1, addr2, addr3);
        console.log("Gas Used (setUsingRecord, storing based on new key): " + transactionResult.receipt.gasUsed);
        transactionResult = await maps.setUsingRecord(key2, addr1, addr2, addr3);
        console.log("Gas Used (setUsingRecord, second use of new key): " + transactionResult.receipt.gasUsed);
    });

    it("setOneUsingRecord", async function() {
        let maps = await MapScenarios.new();
        let transactionResult = await maps.setOneUsingRecord(key, addr1);
        console.log("Gas Used (setOneUsingRecord): " + transactionResult.receipt.gasUsed);
        transactionResult = await maps.setOneUsingRecord(key, addr1);
        console.log("Gas Used (setOneUsingRecord, after first storage): " + transactionResult.receipt.gasUsed);
    });

    it("setTwoUsingRecord", async function() {
        let maps = await MapScenarios.new();
        let transactionResult = await maps.setTwoUsingRecord(key, addr1, addr2);
        console.log("Gas Used (setTwoUsingRecord): " + transactionResult.receipt.gasUsed);
        transactionResult = await maps.setTwoUsingRecord(key, addr1, addr2);
        console.log("Gas Used (setTwoUsingRecord): " + transactionResult.receipt.gasUsed);
    });


    it("getOneUsingRecordFakeView", async function() {
        let maps = await MapScenarios.new();
        let transactionResult = await maps.setUsingRecord(key, addr1, addr2, addr3);
        transactionResult = await maps.getOneUsingRecordFakeView(key);
        console.log("Gas Used (getOneUsingRecordFakeView): " + transactionResult.receipt.gasUsed);
        transactionResult = await maps.getOneUsingRecordFakeView(key2);
        console.log("Gas Used (getOneUsingRecordFakeView, for unused key): " + transactionResult.receipt.gasUsed);
    });



    it("setUsingSeparate", async function() {
        let maps = await MapScenarios.new();
        let transactionResult = await maps.setUsingSeparate(key, addr1, addr2, addr3);
        console.log("Gas Used (setUsingSeparate): " + transactionResult.receipt.gasUsed);
        transactionResult = await maps.setUsingSeparate(key, addr1, addr2, addr3);
        console.log("Gas Used (setUsingSeparate, after first storage): " + transactionResult.receipt.gasUsed);
        transactionResult = await maps.setUsingSeparate(key2, addr1, addr2, addr3);
        console.log("Gas Used (setUsingSeparate, storing based on new key): " + transactionResult.receipt.gasUsed);
        transactionResult = await maps.setUsingSeparate(key2, addr1, addr2, addr3);
        console.log("Gas Used (setUsingSeparate, second use of new key): " + transactionResult.receipt.gasUsed);
    });

    it("setOneUsingSeparate", async function() {
        let maps = await MapScenarios.new();
        let transactionResult = await maps.setOneUsingSeparate(key, addr1);
        console.log("Gas Used (setOneUsingSeparate): " + transactionResult.receipt.gasUsed);
        transactionResult = await maps.setOneUsingSeparate(key, addr1);
        console.log("Gas Used (setOneUsingSeparate): " + transactionResult.receipt.gasUsed);
    });

    it("setTwoUsingSeparate", async function() {
        let maps = await MapScenarios.new();
        let transactionResult = await maps.setTwoUsingSeparate(key, addr1, addr2);
        console.log("Gas Used (setTwoUsingSeparate): " + transactionResult.receipt.gasUsed);
        transactionResult = await maps.setTwoUsingSeparate(key, addr1, addr2);
        console.log("Gas Used (setTwoUsingSeparate, after first storage): " + transactionResult.receipt.gasUsed);
    });

    it("getOneUsingSeparateFakeView", async function() {
        let maps = await MapScenarios.new();
        let transactionResult = await maps.setUsingSeparate(key, addr1, addr2, addr3);
        transactionResult = await maps.getOneUsingSeparateFakeView(key);
        console.log("Gas Used (getOneUsingRecordFakeView): " + transactionResult.receipt.gasUsed);
        transactionResult = await maps.getOneUsingSeparateFakeView(key2);
        console.log("Gas Used (getOneUsingRecordFakeView, for unused key): " + transactionResult.receipt.gasUsed);
    });
});
