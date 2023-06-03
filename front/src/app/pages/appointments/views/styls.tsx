export const borderNone = { border: 'none' }

export const showAppointViewStyle = {
  'main': { justifyContent: 'flex-start', flexDirection: 'column', padding: '8px', whiteSpace: 'pre-line', borderWidth: '0 1px 1px 1px' },
  'button': { paddingRight: '8px', color: 'blue' },
  'buttonPos': { position: 'absolute', right: '20px', ...borderNone }
}

export const makeAppointViewStyle = {
  'main': { flexDirection: 'column', height: 'auto', width: '90%', ...borderNone },
  'day': { flexDirection: 'row', borderWidth: '0 0 1px 0', flex: 1, alignItems: 'center' },
  'hour': { borderWidth: '0 1px 0 0', width: '2.083%', height: '45px' }
}
