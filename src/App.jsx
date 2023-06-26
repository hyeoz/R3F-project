import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import Timer from "./Timer";
import Box from "./Box";
import CustomInput from "./CustomInput";

// export function App() {
//   const [number, setNumber] = useState(0); // (1)
//   const [isKorea, setIsKorea] = useState(true); // (2)
//   // const location = {country : isKorea ? "한국" : "외국"}; // (3)
//   const location = useMemo(() => {
//     return { country: isKorea ? "한국" : "외국" };
//   }, [isKorea]);

//   useEffect(() => {
//     console.log("useEffect 호출");
//   }, [location]);

//   // (4) 가 실행되면서 App() 이 re-rendering, (1) ~ (3) 이 새로 실행되는데
//   // useState hook 이 사용되면 새 주소에 할당되는 것을 막지만
//   // 변수로 할당한 location 은 실행될때마다 새 주소에 할당되기 때문에
//   // (4) 가 실행되더라도 useEffect 가 trigger 됨

//   return (
//     <div>
//       <h2>하루에 몇끼 먹어요?</h2>
//       <input
//         type="number"
//         value={number}
//         onChange={(e) => setNumber(e.target.value)} // (4)
//       />
//       <hr />
//       <h2>어느 나라에 있어요?</h2>
//       <p>나라: {location.country}</p>
//       <button onClick={() => setIsKorea(!isKorea)}>비행기 타자</button>
//     </div>
//   );
// }

// function App() {
//   const [size, setSize] = useState(100);
//   const [isDark, setIsDark] = useState(true);

//   const createBoxStyle = useCallback(() => {
//     return {
//       backgroundColor: "red",
//       width: size + "px",
//       height: size + "px",
//     }; // 객체 반환인데 useMemo 를 안쓰고 useCallback 을 쓰는 이유가 있는지?
//   }, [size]);

//   return (
//     <div style={{ background: isDark ? "#000" : "#fff" }}>
//       <input
//         type="number"
//         value={size}
//         onChange={(e) => setSize(+e.target.value)}
//       />
//       <Box createBoxStyle={createBoxStyle} />
//       <button onClick={() => setIsDark(!isDark)}>CHANGE THEME</button>
//     </div>
//   );
// }

function App() {
  const inputRef = useRef();

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>FOCUS</button>
    </div>
  );
}

export default App;
