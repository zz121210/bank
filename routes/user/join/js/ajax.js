const m_id = document.querySelector("#id")
const phone = document.querySelector("#phone")
const msg1 = document.querySelector("#msg1")
const msg3 = document.querySelector("#msg3")

const mIdUrl = `${location.href}/ajax/idValid`
m_id.addEventListener("keyup", () => {
    var data = { 'm_id': m_id.value };
    data = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', mIdUrl);
    xhr.setRequestHeader('Content-type', "application/json");
    xhr.send(data);
    xhr.addEventListener('load', function () {
        let str = ""
        if(xhr.responseText === "true") {
            m_id.dataset.valid = false
            str="중복된 이메일입니다."
        } else {
            m_id.dataset.valid = true
            str=""
        }
        msg1.innerHTML = str
    });
})

const mPhoneUrl = `${location.href}/ajax/phoneValid`
phone.addEventListener("keyup", () => {
    var data = { 'm_phone': phone.value };
    data = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', mPhoneUrl);
    xhr.setRequestHeader('Content-type', "application/json");
    xhr.send(data);
    xhr.addEventListener('load', function () {


        let str = ""
        if(xhr.responseText === "true") {
            phone.dataset.valid = false
            str="중복된 전화번호입니다."
        } else {
            phone.dataset.valid = true
            str=""
        } 
        msg3.innerHTML = str
    });
})



