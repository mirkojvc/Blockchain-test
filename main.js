const sha256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, prevHash = '') {
        this.index      = index;
        this.timestamp  = timestamp;
        this.data       = data;
        this.prevHash   = prevHash;
        this.hash       = this.calculateHash();
    }

    calculateHash() {
        return sha256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenisisBlock()];
    }

    createGenisisBlock() {
        return new Block(0, "22/05/2018", "First block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();

        this.chain.push(newBlock);
    }
}

let mirkoCoin = new BlockChain();

mirkoCoin.addBlock(new Block(1, "22/05/2018", {amount: 3}));
mirkoCoin.addBlock(new Block(2, "22/05/2018", {amount: 23}));