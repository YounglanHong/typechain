import * as CryptoJS from "crypto-js";
// npm install crypto-js

/* ⭐️
   1. 예측 가능한 함수 인자 타입, 리턴 타입
   2. static
   3. class 배열 타입 지정
*/

class Block {
  /* static: Block 클래스 안에서 항상 사용 가능 
     (Block을 생성하지 않아도 클래스 밖에서 사용 가능) */

  // 구조 재정렬: static - else - contructor

  //* Block 해시 연산
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  //* Block 구조 체크
  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  //* 생성자
  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

/* static method: 클래스 밖에서 사용 가능 */
// Block.calculateBlockHash()

//* Block 생성(new)
const genesisBlock: Block = new Block(0, "2020202020202", "", "Hello", 123456);

//* Blockchain: Array of blocks(블록의 연결)
// TS로 블록만 블록체인에 추가하도록 체크
// [ERROR] blockchain.push("stuff")

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

//* 새로운 블록 생성
const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );

  // 블록 생성될 때마다 blockchain에 추가
  addBlock(newBlock);
  return newBlock;
};

//* Block 해시 가져오기
const getHashforBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data
  );

//* Block (연결된 블록 간) 유효성 체크
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  // 구조 검증
  if (!Block.validateStructure(candidateBlock)) {
    return false;
    // 연결성 검증
    // (이전 블록 인덱스 + 1 이 비교하려는 블록 인덱스와 같지 않다면,)
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
    // 해시 검증
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

//* Block 추가
// return 값 없음(void)
const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);

export {};
