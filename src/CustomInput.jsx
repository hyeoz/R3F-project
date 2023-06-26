import { forwardRef } from "react"

function CustomInput(props, ref) {
    return (
        <input ref={ref} />
    )
}

export default forwardRef(CustomInput) // 부모 - 자식 간 ref 넘기는 경우 forwardRef 로 감싸줌