const pw1 = document.querySelector("#pw1")
const pw2 = document.querySelector("#pw2")
const msg1 = document.querySelector("#msg1")

pw1.addEventListener("keyup", () => {
    if( pw1.value !== pw2.value ) {
        if( pw2.value !== "" ) msg1.innerText = "비밀번호가 일치하지 않습니다."
    } else {
        msg1.innerText = ""
    }
})

pw2.addEventListener("keyup", () => {
    if( pw1.value !== pw2.value ) {
        msg1.innerText = "비밀번호가 일치하지 않습니다." 
    } else {
        msg1.innerText = ""
    }
})

const validCheck = () => {
    if(pw1.value === pw2.value) {
        return true;
    }
    return false;
}