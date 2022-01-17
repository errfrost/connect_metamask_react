import logo from './logo.svg';
import './App.css';
import WalletCard from "./WalletCard.js"; //импортируем функцию WalletCard из WalletCard.js

function App() {
  return (
    <div className="App">
      <WalletCard/> {/* импортируемая функция тег */}
    </div>
  );
}

export default App; // expose the App component to other modules
