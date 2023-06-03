const isIsoDate = (str) => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d) && d.toISOString() === str; // valid date
}

const paramCheck = (time)=>{
    const errorMessage = !time ? 'params: iso not exist' : !isIsoDate(time) && 'ios format not correct'
    return errorMessage
}

const unixtime = (params, res) => {
    const time = params.searchParams.get('iso')
    const paramsInvalidMsg = paramCheck(time)
    if (paramsInvalidMsg) {
        res.end(paramsInvalidMsg)
    }else {
        const message = { unixtime: new Date(time).valueOf()}
        res.end(JSON.stringify(message))
        console.log(params.pathname, message)
    }
}

const parseTime = (params, res) => {
    const time = params.searchParams.get('iso')
    const paramsInvalidMsg = paramCheck(time)
    if (paramsInvalidMsg) {
        res.end(paramsInvalidMsg)
    } else {
        const date = new Date(time)
        const message = {
            hour: date.getUTCHours(),
            minite: date.getUTCMinutes(),
            second: date.getUTCSeconds()
        }
        res.end(JSON.stringify(message))
        console.log(params.pathname, message)
    }
}


module.exports = {
    unixtime,
    parseTime
}