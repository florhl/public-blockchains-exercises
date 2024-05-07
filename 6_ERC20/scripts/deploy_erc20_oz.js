// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const MyERC20Factory = await hre.ethers.getContractFactory("ERC20_OZ"); 
  
    
  // Deploy the contract with the specified constructor arguments
  const myERC20 = await MyERC20Factory.deploy();
    
  // Wait for the deployment to be completed
  await myERC20.waitForDeployment();

  console.log("MyERC20_OZ deployed to ", myERC20.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
