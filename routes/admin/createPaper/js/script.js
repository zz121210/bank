drag = (ev) => {
    let problem = document.querySelectorAll(".problem")
    problem.forEach((elem, number) => {
        elem.innerHTML = "문제를 놓아주세요."
    })
}

dragEnd = (ev) => {
    let problem = document.querySelectorAll(".problem")
    problem.forEach((elem, number) => {
        elem.innerHTML = "문제를 드래그해서 놓아주세요"
    })
}