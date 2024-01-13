const Blockchain= require(".");
const Block = require("./block");

describe("Blockchain", ()=>{
    let blockchain, secondBlockchain;

    beforeEach(()=>{
        blockchain = new Blockchain();
        secondBlockchain = new Blockchain();
    });

    it("block starts with a genesis block", ()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it("add new block in blockchain", ()=>{
        const data ="foo";
        blockchain.addBlock(data);
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(data);
    });


    it("validates a chain", ()=>{
        secondBlockchain.addBlock("foo");
        expect(blockchain.isValidChain(secondBlockchain.chain)).toBe(true);
    });

    it("invalidates a chain with incorrect genesis block", ()=>{
        secondBlockchain.chain[0].data="bad data";
        expect(blockchain.isValidChain(secondBlockchain.chain)).toBe(false);
    });

    it("invalidates a corrupt chain", ()=>{
        secondBlockchain.addBlock("foo");
        secondBlockchain.chain[1].data="not foo";
        expect(blockchain.isValidChain(secondBlockchain.chain)).toBe(false);
    });

    it("replaces a valid chain on other blockchain", ()=>{
        secondBlockchain.addBlock("foo");
        blockchain.replaceChain(secondBlockchain.chain);
        expect(blockchain.chain).toEqual(secondBlockchain.chain);
    });

    it("rejects an invalid chain on other blockchain", ()=>{
        secondBlockchain.addBlock("foo");
        secondBlockchain.replaceChain(blockchain.chain);
        expect(blockchain.chain).not.toEqual(secondBlockchain.chain);
    });


});