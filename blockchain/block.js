const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    toString() {
        return `
        Block - 
        Timestamp : ${this.timestamp}
        Last Hash : ${this.lastHash.substring(0,10)}
        Hash : ${this.hash.substring(0,10)}
        Data : ${this.data}
        `;
    }

    static genesis(){
        return new Block("Genesis_Time-04/01/2023", "-------", "f4h2-a3b4", "foo");
    }

    static mineBlock(lastBlock, data){
        const timestamp= Date.now();
        const lastHash=lastBlock.hash;
        const hash= Block.hash(timestamp, lastHash, data);
        return new Block(timestamp, lastHash, hash, data);

    }

    static hash(timestamp, lastHash, data){
        return new SHA256(`${timestamp}${lastHash}${data}`).toString();

    }

    static blockHash(block){
        const {timestamp, lastHash, data} = block;
        return Block.hash(timestamp, lastHash, data);
    }

}

module.exports = Block;