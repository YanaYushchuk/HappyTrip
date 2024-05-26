const g = typeof globalThis === "object"
    ? globalThis
    : typeof window === "object"
        ? window
        : typeof global === "object"
            ? global
            : null; // Causes an error on the next line
g.userWalletAddress = null;


const modalLoad = async () =>{
  // 2.1 check if ethereum extension is installed
  
  if (g.ethereum) {

    // 3. create web3 instance
    g.web3 = new Web3(g.ethereum);

  } else {

    // 4. prompt user to install Metamask
    alert("Please install MetaMask or any Ethereum Extension Wallet");
  }

  // 5. check if user is already logged in and update the global userWalletAddress variable
  g.userWalletAddress = g.localStorage.getItem("userWalletAddress");

  // 6. show the user dashboard
  refreshLoggedIn();
};

// 1. Web3 login function
const loginWithEth = async () => {
    // 1.1 check if there is global g.web3 instance
    if (g.web3) {
      try {
        // 2. get the user's ethereum account - prompts metamask to login
        const selectedAccount = await g.ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then((accounts) => accounts[0])
          .catch(() => {
            // 2.1 if the user cancels the login prompt
            throw Error("Please select an account");
          });
  
        // 3. set the global userWalletAddress variable to selected account
        g.userWalletAddress = selectedAccount;
  
        // 4. store the user's wallet address in local storage
        g.localStorage.setItem("userWalletAddress", selectedAccount);
  
        // 5. show the user dashboard
        refreshLoggedIn();
  
      } catch (error) {
        alert(error);
      }
    } else {
      alert("wallet not found");
    }
  };


  // function to show the user dashboard
const refreshLoggedIn = async () => {
    $("#loginModal").modal("toggle");
    // if the user is not logged in - userWalletAddress is null
    if (!g.userWalletAddress) {
      
      logout();
      // return from the function
      return false;
    }
    document.getElementById("login-btn").addEventListener("click", logout);
    document.getElementById("login-btn").textContent = "Log Out"
  };

  // web3 logout function
const logout = () => {
    // set the global userWalletAddress variable to null
    g.userWalletAddress = null;
  
    // remove the user's wallet address from local storage
    g.localStorage.removeItem("userWalletAddress");
  
    document.getElementById("login-btn").addEventListener("click", modalLoad);
    document.getElementById("login-btn").textContent = "Log In"    
  };
  
  
document.getElementById("login-btn").addEventListener("click", modalLoad);
document.querySelector(".login-btn").addEventListener("click", loginWithEth);
