import logo from './logo.svg';
import './App.css';
import {React, useRef, useEffect, useState} from 'react'
import {addScaleCorrector, motion, useScroll, useInView, delay} from 'framer-motion';
import {IoIosMail, IoLogoLinkedin} from 'react-icons/io';
import {BsGithub, BsFillTerminalFill} from 'react-icons/bs';





function Header2(props){
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return<motion.h2 ref={ref} style={{
    transform: isInView ? "none" : "translateX(-200px)",
    opacity: isInView ? 1 : 0,
    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"

  }} className='h2'>{props.name}</motion.h2>;
}

function ParsePic(props){
  const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:3000/" : "https://www.tomasperez.se/"
  const [text, setText] = useState(null);
  useEffect(()=>{
    fetch(baseUrl+props.file)
  //                         vvvv
      .then(response => response.blob())
      .then(imageBlob => {
      // Then create a local URL for that image and print it 
      const imageObjectURL = URL.createObjectURL(imageBlob);
      
      setText(imageObjectURL)
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
  return<img src = {text}></img>;
}

function Parse(props){
  
  //const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:3000/" : "https://www.tomasperez.se/"
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [text, setText] = useState("");
  useEffect(()=>{
    const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:3000/" : "https://tomasperez.se/"
    fetch(baseUrl+props.file, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        console.log(response)
        return response.text();
      }
      )
      .then(t => {console.error(t ? t : "no text loaded"); setText(t)}).catch(error => console.error(error))
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
  
  return<motion.p ref={ref} style={{
    transform: isInView ? "none" : "translateX(-200px)",
    opacity: isInView ? 1 : 0,
    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
  }} className='welcome'>{text ? text : "TEXT LOADING ERROR"}</motion.p>;
}

function Test(props){
  return <motion.div className='testsson' >
    <label for={props.id}>{props.name}</label>
    <motion.input whileHover={{
    scale: 1.2
  }} className = "test" type="checkbox" id={props.id} name={props.id}></motion.input>
  </motion.div>
}

function timer(ms){
  return new Promise(r => setTimeout(r, ms))
}

function App() {
  const [answered, setAnswered] = useState(false)
  async function checker(e){
    e.preventDefault()
    const length = e.target.childElementCount - 1
    let res = []
    for(let i=0; i<length; i++){
      res.push(e.target[i])
    }
    res.forEach(element => {
      if (element.checked){
        element.style.backgroundColor = "#02a855"
      }
      else {
        element.style.backgroundColor = "#f70905"
      }
    });
    setAnswered(true)
    await timer(2000)
    res.forEach(element => {
      element.style.backgroundColor = ""
      
    });
  }
  return (
    <div className="App">
      <div className='linksBack'>
        <div className='links'>
          <ul className='nav'>
            <motion.li whileHover = {{
              rotate: 360,
              transition: {type:"spring", duration : 1}
            }} className ="linkItem"  id = "linkedIn">
              <a className = 'lnk' href='https://www.linkedin.com/in/tomasjperez/'>
              <IoLogoLinkedin />
              </a>
            </motion.li>
            <motion.li whileHover = {{
              rotate: 360,
              transition: {type:"spring", duration : 1}
            }} className ="linkItem" id = "mail">
              <a className = 'lnk' href='mailto:tomas@perezjarnil.se'>
              <IoIosMail />
              </a>
            </motion.li>
            <motion.li whileHover = {{
              rotate: 360,
              transition: {type:"spring", duration : 1}
            }} className ="linkItem" id = "git">
              <a className = 'lnk' href='https://github.com/tomasote'>
              <BsGithub />
              </a>
              
            </motion.li>
            <motion.li whileHover = {{
              rotate: 360,
              transition: {type:"spring", duration : 1}
            }} className ="linkItem"  id = "terminal">
              <a className = 'lnk' href='https://www.tomasperez.se/terminal/'>
              <BsFillTerminalFill />
              </a>
            </motion.li>
          </ul>
        </div>
      </div>
      <div className="App-header">
        {/* <ParsePic className="star" file = "star.png" /> */}
        <motion.h1 animate = {{
          y: 0,
          scale: 1
        }} initial = {{
          y: -100,
          scale: 0
        }} className = "header1" id='hello'>Welcome!</motion.h1>
        
        <Parse className="welcome" file="welcome.txt"/>
        
      </div>
      <div className='App-header'>
        <motion.h2 animate = {{
          y: 0,
          scale: 1
        }} initial = {{
          y: -100,
          scale: 0
        }} className ="h2">About me</motion.h2>
        <Parse file="about.txt"/><br></br><Parse file="about2.txt"/><br></br>
        {<form id="minb" className='form' onSubmit={checker}>
          <Test id="Bar" name="Bartender"></Test>
          <Test id="kid" name="Kindergarten assistant"></Test>
          <Test id="sale" name="Salesman"></Test>
          <motion.button className='knapp' type="submit" form = "minb">Submit</motion.button>
        </form>}
        {answered&&<motion.p>All of the answers are correct!</motion.p>}
        {answered&&<Parse file="about3.txt"/>}
      </div>
      <div className="App-header">
        <Header2 className="h2" name="Experience"></Header2>
        <Parse className = "welcome" file = "experience.txt"/>
      </div>
      <div className="App-header">
        <Header2 className="h2" name="Contact"></Header2>
        <Parse className = "welcome" file = "contact.txt"/>
      </div>
    </div>
  );
}

export default App;
