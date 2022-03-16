const validCheck = () => {
    const firstPw = document.querySelector("#pw1").value
    const secondPw = document.querySelector("#pw2").value
    const m_role = document.querySelector("#role").value
    if(firstPw === secondPw && m_role !== "") {
        alert("pass")
        return true;
    }

    alert("no")
    return false;
}



