import logo from './logo.svg';
import './App.css';
import Board from './components/ Board'
import Title from './components/Title';


function App() {
  return (
    <>
      <img className='absolute -z-10' src={'/MyImages/image2.jpg'} />
      <Title />
      <Board />
  
      {/* Photo by <a href="https://unsplash.com/it/@christopher__burns?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Christopher Burns</a> on <a href="https://unsplash.com/wallpapers/cool/abstract?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */}
      {/* Photo by <a href="https://unsplash.com/fr/@maximalfocus?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Maximalfocus</a> on <a href="https://unsplash.com/wallpapers/cool/abstract?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */}
    </>
  );
}

export default App;
