import { useEffect, useRef } from "react";

function Timer(props) {
    
    useEffect(() => {
        const timer = setInterval(() => {
          console.log("TIMER WORKS");
        }, 1000);

        return () => {
            clearInterval(timer)
            console.log('CLEAN UP')
        }
    }, [])


  return (
    <div>
      <span>타이머를 시작합니다.</span>
    </div>
  );
}

export default Timer;
