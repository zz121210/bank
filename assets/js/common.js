// (1).
addComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

// (2). min 미만이 될 수 없으며, max를 초과할 수 없다.
randNum = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}   

// (3). a-z, A-Z 랜덤
randStr = (num) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const stringLength = num
    let randStr = ''
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length)
      randStr += chars.substring(rnum, rnum + 1)
    }
    return randStr
}

// (4). a-z, A-Z, 0-9 랜덤
randStrNum = (num) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const stringLength = num
    let randStr = ''
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length)
      randStr += chars.substring(rnum, rnum + 1)
    }
    return randStr
}

