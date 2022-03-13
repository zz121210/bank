const m_id = document.querySelector("#id")
const url = `${location.href}/ajax/valid`
m_id.addEventListener("keyup", () => {
    var data = { 'm_id': m_id.value };
    data = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', "application/json");
    xhr.send(data);
    xhr.addEventListener('load', function () {
        let str = ""
        xhr.responseText === "true" ? str="중복된 이메일입니다.": str="사용가능합니다."
      document.querySelector("#msg").innerHTML = str
    });
})