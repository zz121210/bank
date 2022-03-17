const phone = document.querySelector("#phone").value

const mphoneUrl = `${location.href}/ajax/findEmail`
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