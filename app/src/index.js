import Web3 from "web3";
import AdvancedStorage from "../../build/contracts/AdvancedStorage.json";

let web3 = null;
let advancedStorage = null;

const initWeb3 = () => {
  return new Promise(async (resolve, reject) => {
    // case 1: new metamask is present
    if (typeof window.ethereum !== undefined) {
      // ask user permission to connect metamask
      try {
        await window.ethereum.enable();
        resolve(new Web3(window.ethereum));
      } catch (e) {
        console.error(e);
        reject(e);
      }
    }
    // case 2: old metamas is present
    if (typeof window.web3 !== undefined) {
      resolve(new Web3(window.web3.currentProvider));
    }
    // case3: no metamask - connect to ganache
    resolve(new Web3("http://localhost:8545"));
  });
};

const initContract = () => {
  const deploymentKey = Object.keys(AdvancedStorage.networks)[0];
  return new web3.eth.Contract(
    AdvancedStorage.abi,
    AdvancedStorage.networks[deploymentKey].address
  );
};

const initApp = async () => {
  const $addData = document.getElementById("add-data");
  const $data = document.getElementById("data");
  const accounts = await web3.eth.getAccounts();

  const response = await advancedStorage.methods.getAll().call();
  $data.innerHTML = response.join(", ");

  $addData.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = e.target.elements[0].value;
    await advancedStorage.methods.add(data).send({ from: accounts[0] });
    const response = await advancedStorage.methods.getAll().call();
    $data.innerHTML = response.join(", ");
  });
};

window.onload = async function () {
  try {
    web3 = await initWeb3();
    advancedStorage = initContract();
    initApp();
  } catch (e) {
    console.error(e);
  }
};
