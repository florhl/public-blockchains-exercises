// Ethers JS: Quiz Contract.
////////////////////////////

// Note: this script includes reading from command-line and it might not
// work well with Code Runner. Please run inside a terminal.

// Load dependencies.
/////////////////////

const path = require("path");

const ethers = require("ethers");

// Adjust path to your .env file.
const pathToDotEnv = path.join(__dirname, "..", ".env");
// console.log(pathToDotEnv);
require("dotenv").config({ path: pathToDotEnv });

const { getUserAnswer, extractQuestion } =
    require(path.join(__dirname, "quiz_helper.js"));

// Create Signer and Contract.
//////////////////////////////

const providerKey = process.env.ALCHEMY_KEY;
const sepoliaUrl = `${process.env.ALCHEMY_SEPOLIA_API_URL}${providerKey}`;
// console.log(sepoliaUrl);
const sepoliaProvider = new ethers.JsonRpcProvider(sepoliaUrl);

const signer = new ethers.Wallet(
    process.env.METAMASK_1_PRIVATE_KEY,
    sepoliaProvider
);

const quizABI = require(path.join(__dirname, "quiz_abi"));

// The address of the Quiz contract.
const contractAddress = "0x01FaE6a3E15b8cf2cb89C259b2d6e5bf7cf94782";

const quizContract = new ethers.Contract(contractAddress, quizABI, signer);

async function main() {

    // A. Ask question and get a transaction receipt.
    // Hint: method `askQuestion()`

    // Your code here.
    const tx = await quizContract.askQuestion();
    const receipt = await tx.wait()

    // From the transaction receipt we can extract useful information, such as
    // as the question's text and id that were stored in the logs
    // (we will understand logs in detail later in the course).
    const { text, id } = extractQuestion(quizContract, receipt);

    console.log(text, "\n", id);

    // Now YOU answer the question!
    // Capture user input from the terminal.
    const userAnswer = await getUserAnswer();

    // B. Send the answer to the smart contract.
    // Hint: method `answerQuestion`.

    // Your code here.
    await quizContract.answerQuestion(id, userAnswer);

    // C. Optional. Verify that the answer is correctly stored.
    // Hint: method `getAnswer(questionId)`
    const correctAnswer = await quizContract.getAnswer(id);
    console.log(correctAnswer);
    // Your code here.
}

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });

async function answerSpecificQ(id, answer) {
    const tx = await quizContract.answerQuestion(id, answer);
    const receipt = await tx.wait();
    console.log(receipt);

    let questionIds = [0n, 1n, 2n, 3n, 4n];

    questionIds.forEach(async function(element) {
        console.log(element, ":", await quizContract.getAnswer(element));  
    });
}

answerSpecificQ(3n, true);

// 0n :  Result(2) [ true, true ] Is Ethereum a decentralized platform?
// 1n :  Result(2) [ false, true ] Is a smart contract the same as a legal contract?
// 2n :  Result(2) [ true, true ] Does Proof of Work involve solving complex mathematical problems?
// 3n :  Result(2) [ true, true ] Is blockchain immutable? 
// 4n :  Result(2) [ true, true ] Can anyone view the details of a public blockchain transaction?