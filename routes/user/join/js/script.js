const pw1 = document.querySelector("#pw1")
const pw2 = document.querySelector("#pw2")
const msg2 = document.querySelector("#msg2")
const m_role = document.querySelector("#role")

pw1.addEventListener("keyup", () => {
    if( pw1.value !== pw2.value ) {
        if( pw2.value !== "" ) msg2.innerText = "비밀번호가 일치하지 않습니다."
    } else {
        msg2.innerText = ""
    }
})

pw2.addEventListener("keyup", () => {
    if( pw1.value !== pw2.value ) {
        msg2.innerText = "비밀번호가 일치하지 않습니다." 
    } else {
        msg2.innerText = ""
    }
})

const validCheck = () => {
    if(phone.dataset.valid === "true" && pw1.value === pw2.value && m_role.value !== "" && phone.dataset.valid === "true") {
        return true;
    }
    return false;
}

