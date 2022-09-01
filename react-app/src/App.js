import styles from "./App.module.css"
import {useEffect, useState} from "react";

function App() {
  const [counter, setValue] =useState(0);
  const [keyword, setKeyword] = useState("")
  const onClick = () => setValue((prev) => prev + 1)
  const onChange = (event) => setKeyword(event.target.value);

  console.log("i run all the time");
  useEffect(() => {
    console.log("CALL THE API...");
  },[]);
  
  useEffect(() => {
    if(keyword !== "" && keyword.length > 4){
      console.log("SEARCH FOR", keyword);
    }
    
  }, [keyword]);//특정 keyword update될 때만 코드 실행

  useEffect(() => {
    console.log("I run only 'counter' changes.")
  }, [counter]);

  useEffect(() => {
    console.log("I run only 'counter' & 'keyword' changes.")
  }, [counter, keyword]);
  return (
    <div>
      <input 
        value = {keyword}
        onChange = {onChange}
        type="text" 
        placeholder="Search here..."
        />
      <h1 className={styles.title}>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
