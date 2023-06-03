export const pagesStyle = {
    medium: { border: 'none', height: 'auto' },
    textDiv: { width: '10%', borderWidth: '0 1px 1px 1px', alignItems: 'center' }
}
export const partitionStyle = {
    main: { width: '90%', flexDirection: 'column', borderWidth: '0 1px 1px 0' },
    text: { flex: 1, borderRight: 'solid 1px lightgray', textAlign: 'center' },
    hourDiv: { borderWidth: '0 1px 0 0', width: '4.165%' }
}

export const weekStyle = {
    main: { borderWidth: '0 1px 0 1px', width: '10%', height: 'auto', flexDirection: 'column' },
    text: { flexDirection: 'row', borderWidth: '0 0 1px 0', flex: 1, alignItems: 'center' },
}


const div = {
    width: '20px',
    height: ' 16%',
    margin: 'auto 0 auto 0',
    borderRadius:'5px'
}
export const headStyle = {
    head: { flex: ' 0 0 auto', width: '100%', height: '45px', justifyContent:'flex-end' },
    notSelected: { 
        ...div,
        background: 'lightgrey'
    },
    selected: {
        ...div,
        background: 'blue'
    },
    text:{
        alignSelf:'center',
        padding: '8px'
    }
}
