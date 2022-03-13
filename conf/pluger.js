// + page에 맞는 css script를 로드함. 211212 김진우.
// + 페이지에 맞는 css/script를 개별적으로 로드할 수 있게 설정 및 리팩토링. 220307 김진우
'use strict';

const set = {
    default : function(root_n1, root_n2) {
        let script_elem = document.createElement('script')
        script_elem.setAttribute('defer', 'defer')
        script_elem.setAttribute('src', `../../routes/${root_n1}/${root_n2}/js/script.js`)
        document.querySelector('head').appendChild(script_elem)
        document.querySelector('head').insertAdjacentHTML('beforeend', `<link rel="stylesheet" type="text/css" href="../../routes/${root_n1}/${root_n2}/css/style.css">`)
    },

    css : function(root_n1, root_n2, filename) {
        document.querySelector('head').insertAdjacentHTML('beforeend', `<link rel="stylesheet" type="text/css" href="../../routes/${root_n1}/${root_n2}/css/${filename}.css">`)
    },

    js : function(root_n1, root_n2, filename) {
        let script_elem = document.createElement('script')
        script_elem.setAttribute('defer', 'defer')
        script_elem.setAttribute('src', `../../routes/${root_n1}/${root_n2}/js/${filename}.js`)
        document.querySelector('head').appendChild(script_elem)
    }
}

let pathname = window.location.pathname
let root_n1, root_n2
let pathname_n

switch(pathname.split("/")[1]) {
    case "admin" :
        root_n1 = "admin"
        pathname_n = 2
        break

    default :
        root_n1 = "user"
        pathname_n = 1
        break
}

// user & admin의 root_n2 파악
if((pathname.split("/")[1] == root_n1 && pathname.split("/").length == 2) || pathname.split("/")[1] == "") {
    root_n2 = 'index'
} else {
    root_n2 = pathname.split("/")[pathname_n]
}


// default : style.css, script.js 로드
set.default(root_n1, root_n2)

// 개별적 로드
if( root_n1 == "user" && pathname_n == 1)  { // user
    switch(root_n2) {
        case "index" :
            set.css(root_n1, root_n2, "test")
            set.js(root_n1, root_n2, "test")

        case "join" :
            
            set.css(root_n1, root_n2, "test")
            set.js(root_n1, root_n2, "test")
    }
}

else if( root_n2 == "admin" && pathname_n == 2) { // admin
    switch(root_n2) {
        case "index" :
            set.css(root_n1, root_n2, "test")
            set.js(root_n1, root_n2, "test")

        case "join" :
            set.css(root_n1, root_n2, "test")
            set.js(root_n1, root_n2, "test")
    }
}