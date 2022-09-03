React JS 는 어플리케이션이 interative하게 만들어주고

react-dom은 React element를 HTML body에 두는 역할

render()사용자에게 보여주는 역할

HTML에는 root라는 id만 생성해주면 HTML 코드 끝, root에 element를 가져다 놓음

바닐라 js는 HTML을 먼저, JS로 찾아서 가져옴, 그리고 HTML다시 업데이트 함 

React JS는 JS에서 먼저 element를 만들어 시작하고 HTML에 가져다 놓음

## JSX

1. React 요소 만들 수 있도록 함, HTML과 비슷해서 편리

```js
const root = document.getElementById("root");
    const Title = <h3 id ="title" onMouseEnter={() => console.log("mouse enter")}>Hello I'm a span</h3>
    const Button = <button style={{
        backgroundClor: "tomato"
    }}
        onClick={() => console.log("im clicked")}
    >Click me</button>
```

2. 브라우저가 이해하도록 변환해야함
- Babel standalone 설치
  
  ```html
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  ```
3. createEliment대신 JSx 방식으로 render
   
   - arrowfunction 으로 element 구현
     
     - 사용자 정의 태그는 대문자로 시작해야함, 소문자로 시작한 태그는 html 태그가 되어버림
     
     - 태그는 닫혀있어야함
     
     - 최상위 태그 하나만
   
   ```js
   <!DOCTYPE html>
   <html>
   <body>
       <!-- react-dom이 element를 가져다 두는 곳 -->
       <div id="root"></div>
   </body>
   <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
   <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
   <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
   <script type="text/babel">
       const root = document.getElementById("root");
   
       const Title = () => (
           <h3 id ="title" onMouseEnter={() => console.log("mouse enter")}>Hello I'm a span</h3>
       );
   
       const Button = () =>(
           <button style={{
           backgroundClor: "tomato"
       }}
           onClick={() => console.log("im clicked")}
       >Click me</button>
       ); 
   
       const container = (
           <div>
               <Title/>
               <Button/>
           </div>
       );
       ReactDOM.render(container, root);
   </script>
   </html>
   
   ```

## State

1. 이벤트 리스너를 prop으로 줌

```js
<!DOCTYPE html>
<html>
<body>
    <!-- react-dom이 element를 가져다 두는 곳 -->
    <div id="root"></div>
</body>
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
    const root = document.getElementById("root");
    let counter = 0;
    function countUp() {
        counter = counter + 1;
        ReactDOM.render(<Container />, root);
    }
    const Container = () => (
        <div>
            <h3>Total clicks: {counter}</h3>
            <button onClick ={countUp}>Click me</button> 
        </div>//onClick prop으로 이벤트 리스너 연결
    ); // 사용자 정의 태그, 컴포넌트는 첫글자 대문자여야 함
    ReactDOM.render(<Container />, root);
</script>
</html>
```

2. 하지만 클릭했을때 바로 UI가 변하지 않음
   
   - Countainer를 rendering 한 번 하고 하서 UI를 새로고침하지 않음
   
   - rerendering이 필요함 render  함수를 만들어 호출
   
   - 값이 바뀔 때 마다 계속 render 함수를 써서 호출하는것 좋지 않음 더 좋은 방식 있음
   
   - Container 컴포넌트의 html element<button>는 업데이트 되지 않음(중요한 부분!!  UI에서 바뀌는 부분'total clicks'만 바뀌면 됨)
   
   ```js
   <!DOCTYPE html>
   <html>
   <body>
       <!-- react-dom이 element를 가져다 두는 곳 -->
       <div id="root"></div>
   </body>
   <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
   <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
   <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
   <script type="text/babel">
       const root = document.getElementById("root");
       let counter = 0;
       function countUp() {
           counter = counter + 1;
           render();
       }
       const Container = () => (
           <div>
               <h3>Total clicks: {counter}</h3>
               <button onClick ={countUp}>Click me</button> 
           </div>//onClick prop으로 이벤트 리스너 연결
       ); // 사용자 정의 태그, 컴포넌트는 첫글자 대문자여야 함
       render();
   
       function render(){
           ReactDOM.render(<Container />, root);
       }//Container를 root에 담음
   
   </script>
   </html>
   
   ```
- 렌더링을 하기 위한 React.js의 기능
  
  - React.useState()
  
  - data의 초깃값 0 을 넣음
  
  - 콘솔에 array로 [data값, data를 변경할 때 쓰는 함수] 가 출력됨
  
  ```js
  <script type="text/babel">
      const root = document.getElementById("root");
      let counter = 0;
      function App() {
          const data = React.useState(0);
          console.log(data);
          return (
              <div>
                  <h3>Total clicks: 0</h3>
                  <button>Click me</button> 
              </div>
          );
      }
      ReactDOM.render(<App />, root); //App 컴포넌트를 root에 전달
  
  </script>
  ```

- data의 첫번째 요소에 counter을 주고, 두번째 요소 함수에 +1을 하는 함수를 주면 됨
  
  - array의 요소를 꺼내는 방식1
  
  ```js
  function App() {
          const data = React.useState(0);
          const counter = data[0];
          const modifier = data[1];
          return (
              <div>
                  <h3>Total clicks: {counter}</h3>
                  <button>Click me</button> 
              </div>
          );
      }
      ReactDOM.render(<App />, root); //App 컴포넌트를 root에 전달 
  ```

- 더 짧은 코드로 가능
  
  - 요소 하나하나를 변수 지정!
  
  ```js
   function App() {
          const data = React.useState(0);
          const [counter, modifier] = data; //요소에 변수를 할당하기
          console.log(counter);
  
          return (
              <div>
                  <h3>Total clicks: {counter}</h3>
                  <button>Click me</button> 
              </div>
          );
      }
  ```
  
  - 더 짧게 한 줄로 작성
  
  ```js
  function App() {
          const [counter, modifier] = React.useState(0); //요소에 변수를 할당하기
          console.log(counter);
  
          return (
              <div>
                  <h3>Total clicks: {counter}</h3>
                  <button>Click me</button> 
              </div>
          );
  ```
3. onClick 함수

```js
  function App() {
    let [counter, modifier] = React.useState(0); //요소에 변수를 할당하기
    const onClick = () => {
        counter = counter + 1;
    };

    return (
        <div>
            <h3>Total clicks: {counter}</h3>
            <button onClick ={onClick}>Click me</button> 
        </div>
    );
}
ReactDOM.render(<App />, root); //App 컴포넌트를 root에 전달
```

- 마찬가지로 컴포넌트를 리렌더링 해야함

- modifier(새로운 값)을 통해 counter에 새로운 값도 주고, 컴포넌트 리렌더링도 가능함!

- setCounter에서 값을 직접 지정해서 state를 바꿈

```js
 function App() {
        const [counter, setCounter] = React.useState(0); //요소에 변수를 할당하기
        const onClick = () => {
            setCounter(counter + 1);
        };

        return (
            <div>
                <h3>Total clicks: {counter}</h3>
                <button onClick ={onClick}>Click me</button> 
            </div>
        );
    }
    ReactDOM.render(<App />, root); //App 컴포넌트를 root에 전달
```

4. state을 바꾸는 다른 방식
   
   - 현재 counter값을 가지고 다음 state를 계산하고 싶다면 setCounter를 똑같이 쓰되, 함수를 사용
   
   - argument로 현재 counter값을 받아서 함수를 이용
   
   ```js
   function App() {
           const [counter, setCounter] = React.useState(0); //state
           const onClick = () => {
               setCounter((counter) => counter + 1);
           };
   
           return (
               <div>
                   <h3>Total clicks: {counter}</h3>
                   <button onClick ={onClick}>Click me</button> 
               </div>
           );
       }
       ReactDOM.render(<App />, root); //App 컴포넌트를 root에 전달
   ```

## Input and State

1. JavaScript 언어와 다름
   
   - class, for 등 사용하면 안됨 -> htmlFor

2. useState을 이용해 현재 state로서 input value값 minutes와 값을 변경하게 해주는 함수 setMinutes 선언

```js
function App() {
        const [minutes, setMinutes] = React.useState()
        return (
            <div>
                <h1>Super Converter</h1>
                <label htmlFor="minutes">Minutes</label>
                <input  
                    value={minutes} 
                    id="minutes" 
                    placeholder="Minutes" 
                    type="number"/>
                <label htmlFor="hours">Minutes</label>
                <input for="hours" placeholder="Hours" type="number"/>
            </div>
        );
    }
    ReactDOM.render(<App />, root); //App 컴포넌트를 root에 전달
```

3. 유저가 Input에 새로운 값을 입력할 때마다 state업데이트 하기
   
   - input은 onChange 함수를 리스닝하고 
   
   - onChange함수에서 setState로 사용자가 입력하는 input data를 minutes로 업데이트 함
   
   ```js
   function App() {
           const [minutes, setMinutes] = React.useState();
           const onChange = (event) => {
               setMinutes(event.target.value); //이거 안 하면 UI 안바뀜
               // console.log(event.target.value);
           };
           return (
               <div>
                   <h1 className="hi">Super Converter</h1>
                   <label htmlFor="minutes">Minutes</label>
                   <input  
                       value={minutes} 
                       id="minutes" 
                       placeholder="Minutes" 
                       type="number"
                       onChange={onChange}
                       />
                   <h4>you want to convert {minutes}</h4>
                   <label htmlFor="hours">Minutes</label>
                   <input for="hours" placeholder="Hours" type="number"/>
               </div>
           );
       }
       ReactDOM.render(<App />, root); //App 컴포넌트를 root에 전달
   ```

4. hours의 input의 props인 value에 minutes/60 state값을 줌
   
   - 단 onChange event설정 안해서 hours input에서는 값을 수정할 수 없음

```js
function App() {
        const [minutes, setMinutes] = React.useState(0);//state
        const onChange = (event) => {
            setMinutes(event.target.value); //data 업데이트
            // console.log(event.target.value);
        };
        return (
            <div>
                <div>

                </div>
                <h1 className="hi">Super Converter</h1>
                <label htmlFor="minutes">Minutes</label>
                <input  
                    value={minutes} //UI 바뀜
                    id="minutes" 
                    placeholder="Minutes" 
                    type="number"
                    onChange={onChange}
                    />
                <div>
                   <label htmlFor="hours">Minutes</label>
                    <input 
                    value={minutes / 60}
                    id="hours"
                    placeholder="Hours" 
                    type="number"/> 
                </div>

            </div>
        );
    }
    ReactDOM.render(<App />, root); //App 컴포넌트를 root에 전달
```

5. reset 버튼
   
   - reset event가 minutes를 0으로 초기화함

```js
function App() {
        const [minutes, setMinutes] = React.useState(0);//state
        const onChange = (event) => {
            setMinutes(event.target.value); //data 업데이트
            // console.log(event.target.value);
        };
        const reset = (event) => {
            setMinutes(0);
        };
        return (
            <div>
                <div>

                </div>
                <h1 className="hi">Super Converter</h1>
                <label htmlFor="minutes">Minutes</label>
                <input  
                    value={minutes} //UI 바뀜
                    id="minutes" 
                    placeholder="Minutes" 
                    type="number"
                    onChange={onChange}
                    />
                <div>
                   <label htmlFor="hours">Hours</label>
                    <input 
                    value={Math.round(minutes / 60)}
                    id="hours"
                    placeholder="Hours" 
                    type="number"/> 
                </div>
                <button onClick={reset}>Reset</button>
            </div>
        );
    }
    ReactDOM.render(<App />, root); //App 컴포넌트를 root에 전달
```

7. flip converter
   
   - 새로운 flipped state array를 만들어줌
   
   - flipped는 true나 false인 값
   
   - onFlip은 버튼을 누르면 flipped값을 반대로 바꿈
   
   - flipped 버튼을 누르면 hours는 입력 가능(disable(false)), minutes는 입력 불가(disabled(true))
   
   - flipped의 default값이 false이므로 (flipped === false) -> true
   
   - default에서는 minutes가 input이 보이고, hours input 안 보임
   
   - Flip버튼을 누르면 반대로 state값 변하고, input 입력 가능도 반대로
   
   ```js
     function App() {
           const [minutes, setMinutes] = React.useState(0);//default값
           const [flipped, setFlipped] = React.useState(false);
           const onChange = (event) => {
               setMinutes(event.target.value); //data 업데이트
               // console.log(event.target.value);
           };
           const reset = (event) => {
               setMinutes(0);
           };
           const onFlip = (event) => {
               setFlipped(current => !current)
           };
           return (
               <div>
                   <div>
   
                   </div>
                   <h1 className="hi">Super Converter</h1>
                   <label htmlFor="minutes">Minutes</label>
                   <input  
                       value={minutes} //UI 바뀜
                       id="minutes" 
                       placeholder="Minutes" 
                       type="number"
                       onChange={onChange}
                       disabled={flipped === true}
                       />
                   <div>
                      <label htmlFor="hours">Hours</label>
                       <input 
                       value={Math.round(minutes / 60)}
                       id="hours"
                       placeholder="Hours" 
                       type="number"
                       disabled={flipped === false} //flipped === false -> true:입력못하도록 막음 false: 입력 가능
                       /> 
                   </div>
                   <button onClick={reset}>Reset</button>
                   <button onClick={onFlip}>Flip</button>
               </div>
           );
       }
       ReactDOM.render(<App />, root); //App 컴포넌트를 root에 전달
   ```

8. Hours input value 업데이트
   
   - Hour의 input에 직접 숫자를 입력할 때는 단위 변환이 일어나지 않아야 함
   
   - 조건문 이용:  flipped의 상태이면 -> 단위 변환 X 
   
   - minutes -> amount hours에도 value값으로 쓰기 때문에 이름 변경
   
   - minutes input에서도 flipped상태이면 hour값을 *60해서 단위 변환
   
   - flipped했을 때 reset되도록 reset 함수 호출
   
   ```js
   value={flipped ? amount: Math.round(amount / 60)}
   ```

```js
    function App() {
        const [amount, setAmount] = React.useState(0);//default값
        const [flipped, setFlipped] = React.useState(false);
        const onChange = (event) => {
            setAmount(event.target.value); //data 업데이트
            // console.log(event.target.value);
        };
        const reset = () => {
            setAmount(0);
        };
        const onFlip = () => {
            reset()
            setFlipped(current => !current)
        };
        return (
            <div>
                <div>

                </div>
                <h1 className="hi">Super Converter</h1>
                <label htmlFor="minutes">Minutes</label>
                <input  
                    value={flipped ? amount*60 : amount} //UI 바뀜
                    id="minutes" 
                    placeholder="Minutes" 
                    type="number"
                    onChange={onChange}
                    disabled={flipped === true}
                    />
                <div>
                   <label htmlFor="hours">Hours</label>
                    <input 
                    value={flipped ? amount: Math.round(amount / 60)}
                    id="hours"
                    placeholder="Hours" 
                    type="number"
                    onChange = {onChange}
                    disabled={flipped === false} //flipped === false -> true:입력못하도록 막음 false: 입력 가능
                    /> 
                </div>
                <button onClick={reset}>Reset</button>
                <button onClick={onFlip}>Flip</button>
            </div>
        );
    }
    ReactDOM.render(<App />, root); //App 컴포넌트를 root에 전달
```

9. 새로운 Converter만들기
   
   - MinutesToHours 함수형 컴포넌트 분리해서 App에 태그
   
   - KmToMiles함수형 컴포넌트 새로 만들어서 App에 태그
   
   - 사용자가 두 select에서 Converter중 하나를 선택하면 App의 state가 변하고, 둘 중 하나의 Converter를 화면에서 쓸 수 있음
   
   - HTML 그 자체인 select 태그
   
   ```js
   <select>
                       <option value="0">Minutes & Hours</option>
                       <option value="1">Km & Miles</option>
                   </select>
   ```
-   option 선택하면 이벤트 리스닝 -> select한 option의 value를 cosole에 출력

```js
function App() {
        const [Index, setIndex] = React.useState(0)
        const onSelect = (event) => {
            console.log(event.target.value);
        };
        return (  
                <div>
                <h1 className="hi">Super Converter</h1>
                <select onChange={onSelect}>
                    <option value="0">Minutes & Hours</option>
                    <option value="1">Km & Miles</option>
                </select>
                </div>
        );
    }
```

- setIndex로 select한 option의 value를 index state에 업데이트 하기
  
  ```js
  function App() {
          const [Index, setIndex] = React.useState(0)
          const onSelect = (event) => {
              setIndex(event.target.value);
          };
          return (  
                  <div>
                  <h1 className="hi">Super Converter</h1>
                  <select value={Index} onChange={onSelect}>
                      <option value="0">Minutes & Hours</option>
                      <option value="1">Km & Miles</option>
                  </select>
                  </div>
          );
      }
  ```

- index가 0이면 MinutesToHours, 1이면 KmToMiles
  
  ```js
  function App() {
          const [index, setIndex] = React.useState("0")
          const onSelect = (event) => {
              setIndex(event.target.value);
          };
          return (  
                  <div>
                  <h1 className="hi">Super Converter</h1>
                  <select value={index} onChange={onSelect}>
                      <option value="0">Minutes & Hours</option>
                      <option value="1">Km & Miles</option>
                  </select>
                  {index === "0" ? <MinutesToHours /> : null}
                  {index === "1" ? <KmToMiles /> : null}
                  </div>
          );
      }
  ```

- Km <-> Miles converter 실습

```js
function KmToMiles() {
        const [length, setLength] = React.useState(0);
        const onChange = (event) => {
            setLength(event.target.value);
        };
        const [flipped, setFlipped] = React.useState(false);
        const reset = () => {
            setLength(0);
        }
        const onFlip = () => {
            reset();
            setFlipped(current => !current);
        };
        return (
            <div>
                <div>
                    <label htmlFor="km">Km</label>
                    <input 
                        value={flipped ? length*1/609 : length }
                        id="km"
                        type="number"
                        onChange={onChange}
                        disabled={flipped === true}/>
                </div>
                <div>
                    <label htmlFor="miles">Miles</label>
                    <input 
                    value={flipped ? length : length/1.609}
                    id="miles"
                    type="number"
                    onChange={onChange}
                    disabled={flipped === false}/>
                </div>
                <button onClick={reset}>Reset</button>
                <button onClick={onFlip}>Flip</button>

            </div>

        );
    }
```

## Props

1. React 에서 버튼 컴포넌트 style주기
   
   - 방법1: style을 복붙해서 두 버튼 컴포넌트에 모두 준다.
   
   ```js
       function SaveBtn() {
           return <button style={{
               backgroundColor: "tomato",
               color:"white",
               padding:"10px 20px",
               borderRadius: 10,
               border: 0
           }}>Save Changes</button>
       }
   
       function ConfirmBtn(){
           return <button style={{
               backgroundColor: "tomato",
               color:"white",
               padding:"10px 20px",
               borderRadius: 10,
               border: 0}}>Confirm</button>
       }
   
       function App() {
           return (  
               <div>
                   <SaveBtn />
                   <ConfirmBtn />
               </div>
           );
       }
   ```
-    방법2: 조금 더 설정 가능하도록 button 컴포넌트를 만들고, 부모 컴포넌트에서 props를 준다.
  
  - 부모 컴포넌트에서 자식 컴포넌트에 다양한 속성, 데이터를 주어 하나의 컴포넌트를 다양하게 재사용할 수 있음
  
  - 자식 컴포넌트에서 props로 전송한 데이터를 함수의 인자(argument)로 받아 사용함 -> 인자는 객체 type 이므로 key가 존재함
  
  - {props.key} -> 이렇게 안 쓰고 바로 중괄호를 열어서 key이름을 바로 쓸 수 있음{}
  
  ```js
  const root = document.getElementById("root");
      function Btn(props) {
          console.log(props);
          return <button style={{
              backgroundColor: "tomato",
              color:"white",
              padding:"10px 20px",
              borderRadius: 10,
              border: 0
          }}>{props.text}</button>
      }
  
      function App() {
          return (  
              <div>
                  <Btn text="Save Changes" />
                  <Btn text="Continue" />
              </div>
          );
      }
  ```
  
  - style안에서 props를 기반으로 if else 사용
  
  ```js
     function Btn({text, big}) {
          return <button style={{
              backgroundColor: "tomato",
              color:"white",
              padding:"10px 20px",
              borderRadius: 10,
              border: 0,
              fontSize: big ? 18 : 16
          }}>{text}</button>
      }
  
      function App() {
          return (  
              <div>
                  <Btn text="Save Changes" big={true}/>
                  <Btn text="Continue" big={false}/>
              </div>
          );
      }
  ```

- props에 string , boolean뿐만 아니라 함수를 넣을 수 있음
  
  - onClick  함수로 App 컴포넌트 state바꾸기-> 재 render
  
  - props를 state화
  
  - 함수를 props로 준다고 해서 바로 이벤트 리스너처럼 실행되는것 아님, 자식 컴포넌트에서 데이터를 가져와서 return에 적어서 써야함 
  
  ```js
   function Btn({text, onClick}) {
          return <button 
          onClick={onClick} 
          style={{
              backgroundColor: "tomato",
              color:"white",
              padding:"10px 20px",
              borderRadius: 10,
              border: 0,
              fontSize: 16
          }}>{text}</button>
      }
  
      function App() {
          const [value, setValue] = React.useState("Save Changes"); //state
          const changeValue = () => setValue("Revert Changes");
          return (  
              <div>
                  <Btn text={value} onClick={changeValue}/>
                  <Btn text="Continue" />
              </div>
          );
      }
  ```
  
  2. React Memo
     
     - 부모 컴포넌트가 state 변경될때 모든 자식 컴포넌트를 다 re-render 하지 않음, props가 변하는 컴포넌트만 render다시 진행
  
  3. Props Types
     
     ```js
     <script src="https://unpkg.com/prop-types@15.7.2/prop-types.js"></script>
     ```
     
     ```js
     Btn.propTypes = {
             text:PropTypes.string.isRequired,
             fontSize: PropTypes.number,
     ```
     
     - console에서 props type, 필수 여부를 틀리면 warning 알려줌

## Create react app

1. 에러 해결

cmd에서  npx create-react-app my-app

terminal - npm run start 했는데 에러가 뜸

```
PS C:\Users\user\2022.2학기\nomadCoders_React\my-app>  npm run start
npm ERR! Missing script: "start"
npm ERR! 
npm ERR! Did you mean one of these?
npm ERR!     npm star # Mark your favorite packages
npm ERR!     npm stars # View packages marked as favorites
npm ERR! 
npm ERR! To see a list of scripts, run:
npm ERR!   npm run

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\user\AppData\Local\npm-cache\_logs\2022-08-30T11_46_58_347Z-debug-0.log
```

- package.json에 scripts가 누락되었다는 것 같음 -> 그런데 다시 보니 폴더에 src, public 폴더도 누락되어 있었음

- 찾아보니 이유가 create-react-app 이 업데이트 되었고 global 전역 설치도 지원하지 않아서 그 전걸 지워야 했음

- npm uninstall -g create-react-app을 하고, 다시 create-react-app 을 해봐도 오류가 해결되지 않음

- 그래서 내가 전역으로 설치를 않했던건 아닐까? 하고 npm uninstall create-react-app 을 했더니!

- 전 버전이 잘 지워지고, 다시 npx create-react-app my-app 으로 설치완료~!

- terminal에서 npm run start으로 브라우저에 보이게 함 
2. Button component
   
   - Button.js
   
   ```js
   import PropTypes from "prop-types";
   
   function Button ({text}){
       return <button>{text}</button>
   }
   
   export default Button;
   
   Button.propTypes = {
       text: PropTypes.string
   }
   ```
-    style prop 사용

```js
function Button ({text}){
    return <button style={{
        backgroundColor:"tomato",
        color:"white",
        border: "none",
        borderRadius: "20px",
        padding:"10px 15px"
    }}>{text}</button>
}
```

-    Button.module.css
  
  - 컴포넌트를 분리해서 독립적인 css 모듈을 만들 수 있음
  
  - class에 style작성
  
  ```css
  .btn {
      color: white;
      background-color: tomato;
  }
  ```
  
  - App.js에 import 하지 않고, Button.js에 import함
  
  - button 태그에 className={styles.btn} 

## useEffect

1. state값이 변하면 함수 모든 code가 다시 실행됨, render
   
   - rendering을component가 처음 실행될때만 render되게할 수 있음
   
   - API call을 처음 한번만

2. useEffect  함수 이용
   
   - state가 변해도 처음 한번만 코드를 실행함

```js
function App() {
  const [counter, setValue] =useState(0);
  const onClick = () => setValue((prev) => prev + 1)
  console.log("i run all the time");
  const iRunOnlyOnce = () => {
    console.log("i run only once.");
  };
  useEffect(iRunOnlyOnce,[]); //state가 변해도 처음 한번만 코드를 실행함
  return (
```

3. search bar
   
   - search input 값이 변할 때만! SEARCH FOR keyword를 출력하고 싶음
   
   - counter 버튼을 눌렀을 때는 코드 실행 안 하도록 -> 특정 부분만 변했을 때만 원하는 코드를 실행하고 싶음 
     
     ```js
      function App() {
       const [counter, setValue] =useState(0);
       const [keyword, setKeyword] = useState("")
       const onClick = () => setValue((prev) => prev + 1)
       const onChange = (event) => setKeyword(event.target.value);
     
       console.log("i run all the time");
       useEffect(() => {
         console.log("CALL THE API...");
       },[]);
       console.log("SEARCH FOR", keyword);
     
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
     ```
-    useEffect

```js
 useEffect(() => {
    console.log("SEARCH FOR", keyword);
  }, [keyword]); //keyword가 변할 때만 실행
```

## Cleanup

1. state가 바뀔 때 component를 보이게 하거나, 숨기기

```js
function Hello() {
  return <h1>Hello</h1>
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing(prev => !prev);
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick ={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}
```

- 다시 component를 보여줄 때(create) useEffect 함수 실행됨 

```js
function Hello() {
  useEffect(() => {
    console.log("I'm here");
  }, []);
  return <h1>Hello</h1>
}
```

2. component가 destroy될 때도 함수를 실행할 수 있음(cleanup function)
   
   - useEffect에서 return 하기
     
     ```js
     function Hello() {
       useEffect(() => {
         console.log("created :>");
         return () => console.log("destroyed :<");
       }, []);
       return <h1>Hello</h1>
     }
     ```
   
   - function 따로 만들어서 return하기
   
   ```js
   function Hello() {
     function byFn() {
       console.log("bye :<");
     }
   
     function hiFn() {
       console.log("created :>");
       return byFn;
     }
   
     useEffect(hiFn, []);
     return <h1>Hello</h1>
   }
   
   ```

    

## To Do List part 1

1. input 에 todo 입력, state 변경

2. from submit 시 다시 input value 빈칸

```js
function App() {
  const [toDo, setToDo] = useState("");
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === ""){
      return;
    }
    setToDo("");
  };


  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
        onChange={onChange}
        value = {toDo}
        type="text" 
        placeholder="Write your to do..."/>
        <button>Add To Do</button>
      </form>

    </div>
  );
```

3. todo를 받을 array

```js
const [toDos, setToDos] = useState([]);
```

- state를 바로 변경 할 수 없기에 바로 toDos.push 이런 식으로 작성 하지 않고, setToDos 같이 수정하는 함수를 활용

- array에 element를 추가하는 방식

```js
const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === ""){
      return;
    }
    setToDos((currentArray) => [toDo, ...currentArray]); //기존 array에 새로운 data 넣기
    console.log(toDos);
    setToDo("");
  };
```

- map 함수 : array.map() ->array의 모든 element에 함수를 실행해 다른 값으로 바꾸게 해줌, 새로운 array를 return

- Each child in a list should have a unique "key" prop.
  
  - component의 list 를 render 할 때 고유한 key값을 넣어야함
