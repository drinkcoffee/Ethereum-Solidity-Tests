/**
 * Measure gas usage of storage for various types in various scenarios.
 *
 * The Truffle output with side notes:
 *
 *   Contract: Simple value storage
 Gas Used (setUint256): 41933                            21000 base transaction code + 20000 sstore when word blank.
 ✓ setUint256 (56ms)
 Gas Used (setUint256 memory initialised): 26933         21000 base transaction code + 5000 sstore update existing value.
 ✓ setUint256 memory initialised (89ms)
 Gas Used (setUint256 write same value): 26933           Re-writing same value no saving over writing a new value.
 ✓ setUint256 write same value (75ms)
 Gas Used (setTwoUint256): 61683                         21000 base transaction code + 2 * 20000 sstore when word blank.
 ✓ setTwoUint256 (51ms)
 Gas Used (setTwoUint256 memory initialised): 31683      21000 base transaction code + 2 * 5000 sstore update existing value.
 ✓ setTwoUint256 memory initialised (101ms)
 Gas Used (setThreeUint256): 81807                       21000 base transaction code + 3 * 20000 sstore when word blank.
 ✓ setThreeUint256 (58ms)
 Gas Used (setThreeUint256 memory initialised): 36807    21000 base transaction code + 3 * 5000 sstore update existing value.
 ✓ setThreeUint256 memory initialised (86ms)
 Gas Used (setBytes32): 41929                            21000 base transaction code + 20000 sstore when word blank.
                                                         Curiously, not identical to (setUint256): 41933
 ✓ setBytes32 (49ms)
 Gas Used (setBytes32 memory initialised): 26929         21000 base transaction code + 5000 sstore update existing value.
 ✓ setBytes32 memory initialised (88ms)
 Gas Used (setTwoBytes32): 61908                         21000 base transaction code + 2 * 20000 sstore when word blank.
 ✓ setTwoBytes32 (59ms)
 Gas Used (setTwoBytes32 memory initialised): 31908      21000 base transaction code + 2 * 5000 sstore update existing value.
 ✓ setTwoBytes32 memory initialised (92ms)
 Gas Used (setThreeBytes32): 81953                       21000 base transaction code + 3 * 20000 sstore when word blank.
 ✓ setThreeBytes32 (57ms)
 Gas Used (setThreeBytes32 memory initialised): 36953    21000 base transaction code + 3 * 5000 sstore update existing value.
 ✓ setThreeBytes32 memory initialised (82ms)
 Gas Used (setUint128): 41950                            21000 base transaction code + 20000 sstore when word blank.
 ✓ setUint128 (54ms)
 Gas Used (setUint128 memory initialised): 26950         21000 base transaction code + 5000 sstore update existing value.
 ✓ setUint128 memory initialised (81ms)
 Gas Used (setTwoUint128): 62261                         21000 base transaction code + 2 * 20000 sstore when word blank.
                                                         Curious how much extra this is compared to (setTwoUint256): 61683
 ✓ setTwoUint128 (52ms)
 Gas Used (setTwoUint128 memory initialised): 32261      21000 base transaction code + 2 * 5000 sstore update existing value.
 ✓ setTwoUint128 memory initialised (81ms)
 Gas Used (setThreeUint128): 82550                       21000 base transaction code + 3 * 20000 sstore when word blank.
 ✓ setThreeUint128 (51ms)
 Gas Used (setThreeUint128 memory initialised): 37550    21000 base transaction code + 3 * 5000 sstore update existing value.
 ✓ setThreeUint128 memory initialised (80ms)
 Gas Used (setUint128Scenario2): 42060                   21000 base transaction code + 20000 sstore when word blank.
 ✓ setUint128Scenario2 (53ms)
 Gas Used (setUint128Scenario2 memory initialised): 27060  21000 base transaction code + 5000 sstore update existing value.
 ✓ setUint128Scenario2 memory initialised (116ms)
 Gas Used (setTwoUint128Scenario2): 47421                21000 base transaction code + 20000 sstore when word blank + 5000 sstore update existing.
                                                         Note: If the combining the two uint128s was done in memory, this would save the 5000 gas.
 ✓ setTwoUint128Scenario2 (57ms)
 Gas Used (setTwoUint128Scenario2 memory initialised): 32421   21000 base transaction code + 2 * 5000 sstore update existing value.
 ✓ setTwoUint128Scenario2 memory initialised (86ms)
 Gas Used (setUint8): 41972                              21000 base transaction code + 20000 sstore when word blank.
 ✓ setUint8 (59ms)
 Gas Used (setUint8 memory initialised): 26972           21000 base transaction code + 5000 sstore update existing value.
 ✓ setUint8 memory initialised (83ms)

 */
const Simple = artifacts.require("./Simple.sol");


contract('Simple value storage', function(accounts) {
    const two = "0x2";


    it("setUint256", async function() {
        let simple = await Simple.new();
        let transactionResult = await simple.setUint256(two);
        console.log("Gas Used (setUint256): " + transactionResult.receipt.gasUsed);
    });
    it("setUint256 memory initialised", async function() {
        let simple = await Simple.new();
        await simple.initialiseAllMemoryFirst();
        let transactionResult = await simple.setUint256(two);
        console.log("Gas Used (setUint256 memory initialised): " + transactionResult.receipt.gasUsed);
    });
    it("setUint256 write same value", async function() {
        let simple = await Simple.new();
        await simple.setUint256(two);
        let transactionResult = await simple.setUint256(two);
        // The value should be the same as for the previous test.
        console.log("Gas Used (setUint256 write same value): " + transactionResult.receipt.gasUsed);
    });


    it("setTwoUint256", async function() {
        let simple = await Simple.new();
        let transactionResult = await simple.setTwoUint256(two);
        console.log("Gas Used (setTwoUint256): " + transactionResult.receipt.gasUsed);
    });
    it("setTwoUint256 memory initialised", async function() {
        let simple = await Simple.new();
        await simple.initialiseAllMemoryFirst();
        let transactionResult = await simple.setTwoUint256(two);
        console.log("Gas Used (setTwoUint256 memory initialised): " + transactionResult.receipt.gasUsed);
    });


    it("setThreeUint256", async function() {
        let simple = await Simple.new();
        let transactionResult = await simple.setThreeUint256(two);
        console.log("Gas Used (setThreeUint256): " + transactionResult.receipt.gasUsed);
    });
    it("setThreeUint256 memory initialised", async function() {
        let simple = await Simple.new();
        await simple.initialiseAllMemoryFirst();
        let transactionResult = await simple.setThreeUint256(two);
        console.log("Gas Used (setThreeUint256 memory initialised): " + transactionResult.receipt.gasUsed);
    });


    it("setBytes32", async function() {
        let simple = await Simple.new();
        let transactionResult = await simple.setBytes32(two);
        console.log("Gas Used (setBytes32): " + transactionResult.receipt.gasUsed);
    });
    it("setBytes32 memory initialised", async function() {
        let simple = await Simple.new();
        await simple.initialiseAllMemoryFirst();
        let transactionResult = await simple.setBytes32(two);
        console.log("Gas Used (setBytes32 memory initialised): " + transactionResult.receipt.gasUsed);
    });


    it("setTwoBytes32", async function() {
        let simple = await Simple.new();
        let transactionResult = await simple.setTwoBytes32(two);
        console.log("Gas Used (setTwoBytes32): " + transactionResult.receipt.gasUsed);
    });
    it("setTwoBytes32 memory initialised", async function() {
        let simple = await Simple.new();
        await simple.initialiseAllMemoryFirst();
        let transactionResult = await simple.setTwoBytes32(two);
        console.log("Gas Used (setTwoBytes32 memory initialised): " + transactionResult.receipt.gasUsed);
    });

    it("setThreeBytes32", async function() {
        let simple = await Simple.new();
        let transactionResult = await simple.setThreeBytes32(two);
        console.log("Gas Used (setThreeBytes32): " + transactionResult.receipt.gasUsed);
    });
    it("setThreeBytes32 memory initialised", async function() {
        let simple = await Simple.new();
        await simple.initialiseAllMemoryFirst();
        let transactionResult = await simple.setThreeBytes32(two);
        console.log("Gas Used (setThreeBytes32 memory initialised): " + transactionResult.receipt.gasUsed);
    });

    it("setUint128", async function() {
        let simple = await Simple.new();
        let transactionResult = await simple.setUint128(two);
        console.log("Gas Used (setUint128): " + transactionResult.receipt.gasUsed);
    });
    it("setUint128 memory initialised", async function() {
        let simple = await Simple.new();
        await simple.initialiseAllMemoryFirst();
        let transactionResult = await simple.setUint128(two);
        console.log("Gas Used (setUint128 memory initialised): " + transactionResult.receipt.gasUsed);
    });

    it("setTwoUint128", async function() {
        let simple = await Simple.new();
        let transactionResult = await simple.setTwoUint128(two);
        console.log("Gas Used (setTwoUint128): " + transactionResult.receipt.gasUsed);
    });
    it("setTwoUint128 memory initialised", async function() {
        let simple = await Simple.new();
        await simple.initialiseAllMemoryFirst();
        let transactionResult = await simple.setTwoUint128(two);
        console.log("Gas Used (setTwoUint128 memory initialised): " + transactionResult.receipt.gasUsed);
    });

    it("setThreeUint128", async function() {
        let simple = await Simple.new();
        let transactionResult = await simple.setThreeUint128(two);
        console.log("Gas Used (setThreeUint128): " + transactionResult.receipt.gasUsed);
    });
    it("setThreeUint128 memory initialised", async function() {
        let simple = await Simple.new();
        await simple.initialiseAllMemoryFirst();
        let transactionResult = await simple.setThreeUint128(two);
        console.log("Gas Used (setThreeUint128 memory initialised): " + transactionResult.receipt.gasUsed);
    });

    it("setUint128Scenario2", async function() {
        let simple = await Simple.new();
        let transactionResult = await simple.setUint128Scenario2(two);
        console.log("Gas Used (setUint128Scenario2): " + transactionResult.receipt.gasUsed);
    });
    it("setUint128Scenario2 memory initialised", async function() {
        let simple = await Simple.new();
        await simple.initialiseAllMemoryFirst();
        let transactionResult = await simple.setUint128Scenario2(two);
        console.log("Gas Used (setUint128Scenario2 memory initialised): " + transactionResult.receipt.gasUsed);
    });


    it("setTwoUint128Scenario2", async function() {
        let simple = await Simple.new();
        let transactionResult = await simple.setTwoUint128Scenario2(two);
        console.log("Gas Used (setTwoUint128Scenario2): " + transactionResult.receipt.gasUsed);
    });
    it("setTwoUint128Scenario2 memory initialised", async function() {
        let simple = await Simple.new();
        await simple.initialiseAllMemoryFirst();
        let transactionResult = await simple.setTwoUint128Scenario2(two);
        console.log("Gas Used (setTwoUint128Scenario2 memory initialised): " + transactionResult.receipt.gasUsed);
    });


    it("setUint8", async function() {
        let simple = await Simple.new();
        let transactionResult = await simple.setUint8(two);
        console.log("Gas Used (setUint8): " + transactionResult.receipt.gasUsed);
    });
    it("setUint8 memory initialised", async function() {
        let simple = await Simple.new();
        await simple.initialiseAllMemoryFirst();
        let transactionResult = await simple.setUint8(two);
        console.log("Gas Used (setUint8 memory initialised): " + transactionResult.receipt.gasUsed);
    });

});
