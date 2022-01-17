
import React, {useState} from 'react' // get the React object from the react module
import {ethers} from 'ethers'
import './WalletCard.css'

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null); //таким образом объявляются переменные
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  const connectWalletHandler = () => {  //так объявляются функции
    if (window.ethereum && window.ethereum.isMetaMask) {//if metamask intalled
      console.log('MetaMask Here!');

      window.ethereum.request({method: 'eth_requestAccounts'}) //обращаемся к функции метамаска

      .then(result => { //then выполняется после успешного выполнения вышеобозначенной функции
        accountChangedHandler(result[0]);
        setConnButtonText('Wallet Connected');
      })

      .catch(error => {
				setErrorMessage(error.message);
			});

    } else {
      console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
    }
  }

  const accountChangedHandler = (newAccount) => {
      setDefaultAccount(newAccount);
      getUserBalance(newAccount.toString());
  }

  const getUserBalance = (address) => {
    window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})  //обращаемся к функции метамаска

    .then (balance => {
      setUserBalance(ethers.utils.formatEther(balance));
    })

    .catch(error => {
			setErrorMessage(error.message);
		});
  }

  const chainChangedHandler = () => {
    window.location.reload();
  }

  window.ethereum.on('accountsChanged', accountChangedHandler); //обработка событий
  window.ethereum.on('chainChanged', chainChangedHandler);

  return (
    <div className='WalletCard'>
      <h4>{"Connection to MetaMask using window.ethereum method"}</h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>

      <div className='accountDisplay'>
        <h3>Address: {defaultAccount}</h3>
      </div>

      <div className='balanceDisplay'>
        <h3>Balance: {userBalance}</h3>
      </div>

      {errorMessage}
    </div>
  )
}

export default WalletCard;  // expose the WalletCard component to other modules
