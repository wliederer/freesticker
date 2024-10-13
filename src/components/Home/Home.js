import React, {useState} from 'react';
import Hero from './Hero';
import SendEmail from '../SendEmail/SendEmail';
import Faq from '../Faq/Faq';

const Home = () => {
const [isSent, setIsSent] = useState(true)
  return (
    <div>
      <Hero/>
      <SendEmail setIsSent={setIsSent}/>
      <Faq/>
    </div>
  );
};

export default Home;