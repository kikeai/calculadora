import { useState } from 'react'
import Borrar from './assets/Borrar'

type Operation = {
  num1: number | null
  simbol: string
}

function App () {
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [opText, setOpText] = useState<string>('0')
  const [operation, setOperation] = useState<Operation>({
    num1: null,
    simbol: ''
  })

  const handleSwitch = () => {
    darkMode ? setDarkMode(false) : setDarkMode(true)
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { innerHTML } = e.currentTarget
    const { value } = e.currentTarget
    if (innerHTML === 'C') {
      setOperation({
        num1: null,
        simbol: ''
      })
      setOpText('0')
    } else if (value === 'CL') {
      if (opText.length === 1 || opText === 'Infinity') {
        setOpText('0')
      } else {
        setOpText(opText.slice(0, opText.length - 1))
      }
    } else if (innerHTML === '±') {
      if (opText === 'Infinity') {
        setOpText(opText)
      } else if (opText !== '0') {
        if (opText[0] !== '-') {
          setOpText('-' + opText)
        } else {
          setOpText(opText.slice(1, opText.length))
        }
      }
    } else {
      if (opText === '0' || opText === 'Infinity') {
        setOpText(innerHTML)
      } else {
        setOpText(opText + innerHTML)
      }
    }
  }

  const handleSimbol: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { innerHTML } = e.currentTarget
    if (opText === 'Infinity') {
      return
    }
    if (opText === '0' && operation.num1 === null) {
      return
    }
    if (operation.num1 === null) {
      setOperation({
        ...operation,
        num1: parseFloat(opText),
        simbol: innerHTML
      })
      setOpText('0')
    } else if (operation.num1 !== null) {
      if (opText === '0') {
        setOperation({
          ...operation,
          simbol: innerHTML
        })
        return
      }
      let num: number
      switch (operation.simbol) {
        case '+':
          num = operation.num1 + parseFloat(opText)
          break
        case '-':
          num = operation.num1 - parseFloat(opText)
          break
        case 'x':
          num = operation.num1 * parseFloat(opText)
          break
        case '÷':
          num = operation.num1 / parseFloat(opText)
          break
        case '%':
          num = operation.num1 % parseFloat(opText)
          break
        default:
          num = operation.num1
      }
      setOperation({
        ...operation,
        num1: num,
        simbol: innerHTML
      })
      setOpText('0')
    }
  }

  const handleResult = () => {
    if (operation.num1 !== null) {
      switch (operation.simbol) {
        case '+':
          setOpText((operation.num1 + parseFloat(opText)).toString())
          setOperation({
            ...operation,
            num1: null,
            simbol: ''
          })
          break
        case '-':
          setOpText((operation.num1 - parseFloat(opText)).toString())
          setOperation({
            ...operation,
            num1: null,
            simbol: ''
          })
          break
        case 'x':
          setOpText((operation.num1 * parseFloat(opText)).toString())
          setOperation({
            ...operation,
            num1: null,
            simbol: ''
          })
          break
        case '÷':
          try {
            setOpText((operation.num1 / parseFloat(opText)).toString())
            setOperation({
              ...operation,
              num1: null,
              simbol: ''
            })
          } catch (error) {
            setOpText('Syntax error')
          }
          break
        case '%':
          try {
            setOpText((operation.num1 % parseFloat(opText)).toString())
            setOperation({
              ...operation,
              num1: null,
              simbol: ''
            })
          } catch (error) {
            setOpText('Syntax error')
          }
          break
        default:
          break
      }
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen back'>
      <div>
        <div className={`flex flex-col h-screen md:h-[650px] justify-between w-[99vw] md:w-[320px] transition-all duration-300 ${darkMode ? 'bg-[#0C0C17]' : 'bg-gray-200'} md:rounded-2xl drop-shadow-xl`}>
          <div className='flex justify-center mt-6'>
            <label className='switch'>
              <input type='checkbox' onClick={handleSwitch} checked={darkMode}/>
              <span className='slider'></span>
            </label>
          </div>
          <div className='flex flex-col justify-end'>
            <span className={`font-notoMono font-normal text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'} text-2xl md:text-xl mr-2 mb-3`}>{operation.num1} {operation.simbol}</span>
            <span className={`font-notoMono font-normal text-right ${darkMode ? 'text-white' : 'text-black'} text-6xl md:text-4xl mx-2 mb-3 overflow-x-auto overflow-y-hidden textcal`}>{opText}</span>
            <div className='flex'>
              <button onClick={handleClick} className={`w-[25vw] h-[25vw] md:w-20 md:h-20 border ${darkMode ? 'bg-[#303443]' : 'bg-white'} font-notoMono font-medium text-xl ${darkMode ? 'text-white' : 'text-black'} border-none rounded-tl-3xl transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}>C</button>
              <button onClick={handleClick} className={`w-[25vw] h-[25vw] md:w-20 md:h-20 border ${darkMode ? 'bg-[#303443]' : 'bg-white'} font-notoMono font-medium text-2xl ${darkMode ? 'text-white' : 'text-black'} border-none transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}>±</button>
              <button onClick={handleSimbol} className={`w-[25vw] h-[25vw] md:w-20 md:h-20 border ${darkMode ? 'bg-[#303443]' : 'bg-white'} font-notoMono font-medium text-xl ${darkMode ? 'text-white' : 'text-black'} border-none transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}>%</button>
              <button onClick={handleSimbol} className='w-[25vw] h-[25vw] md:w-20 md:h-20 border bg-[#FF7B00] font-notoMono font-medium text-2xl border-none rounded-tr-3xl transition-all duration-300 hover:brightness-75'>÷</button>
            </div>

            <div className='flex'>
              <button onClick={handleClick} className={`w-[25vw] h-[25vw] md:w-20 md:h-20 border ${darkMode ? 'bg-[#303443]' : 'bg-white'} font-notoMono font-medium text-xl ${darkMode ? 'text-white' : 'text-black'} border-none transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}>7</button>
              <button onClick={handleClick} className={`w-[25vw] h-[25vw] md:w-20 md:h-20 border ${darkMode ? 'bg-[#303443]' : 'bg-white'} font-notoMono font-medium text-xl ${darkMode ? 'text-white' : 'text-black'} border-none transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}>8</button>
              <button onClick={handleClick} className={`w-[25vw] h-[25vw] md:w-20 md:h-20 border ${darkMode ? 'bg-[#303443]' : 'bg-white'} font-notoMono font-medium text-xl ${darkMode ? 'text-white' : 'text-black'} border-none transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}>9</button>
              <button onClick={handleSimbol} className='w-[25vw] h-[25vw] md:w-20 md:h-20 border bg-[#FEE440] font-notoMono font-medium text-xl border-none transition-all duration-300 hover:brightness-75'>x</button>
            </div>

            <div className='flex'>
              <button onClick={handleClick} className={`w-[25vw] h-[25vw] md:w-20 md:h-20 border ${darkMode ? 'bg-[#303443]' : 'bg-white'} font-notoMono font-medium text-xl ${darkMode ? 'text-white' : 'text-black'} border-none transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}>4</button>
              <button onClick={handleClick} className={`w-[25vw] h-[25vw] md:w-20 md:h-20 border ${darkMode ? 'bg-[#303443]' : 'bg-white'} font-notoMono font-medium text-xl ${darkMode ? 'text-white' : 'text-black'} border-none transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}>5</button>
              <button onClick={handleClick} className={`w-[25vw] h-[25vw] md:w-20 md:h-20 border ${darkMode ? 'bg-[#303443]' : 'bg-white'} font-notoMono font-medium text-xl ${darkMode ? 'text-white' : 'text-black'} border-none transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}>6</button>
              <button onClick={handleSimbol} className='w-[25vw] h-[25vw] md:w-20 md:h-20 border bg-[#00BBF9] font-notoMono font-medium text-xl border-none transition-all duration-300 hover:brightness-75'>-</button>
            </div>

            <div className='flex'>
              <button onClick={handleClick} className={`w-[25vw] h-[25vw] md:w-20 md:h-20 border ${darkMode ? 'bg-[#303443]' : 'bg-white'} font-notoMono font-medium text-xl ${darkMode ? 'text-white' : 'text-black'} border-none transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}>1</button>
              <button onClick={handleClick} className={`w-[25vw] h-[25vw] md:w-20 md:h-20 border ${darkMode ? 'bg-[#303443]' : 'bg-white'} font-notoMono font-medium text-xl ${darkMode ? 'text-white' : 'text-black'} border-none transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}>2</button>
              <button onClick={handleClick} className={`w-[25vw] h-[25vw] md:w-20 md:h-20 border ${darkMode ? 'bg-[#303443]' : 'bg-white'} font-notoMono font-medium text-xl ${darkMode ? 'text-white' : 'text-black'} border-none transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}>3</button>
              <button onClick={handleSimbol} className='w-[25vw] h-[25vw] md:w-20 md:h-20 border bg-[#9B5DE5] font-notoMono font-medium text-xl border-none transition-all duration-300 hover:brightness-75'>+</button>
            </div>

            <div className='flex'>
              <button onClick={handleClick} className={`w-[25vw] h-[25vw] md:w-20 md:h-20 border ${darkMode ? 'bg-[#303443]' : 'bg-white'} font-notoMono font-medium text-xl ${darkMode ? 'text-white' : 'text-black'} border-none transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'} md:rounded-bl-2xl`}>.</button>
              <button onClick={handleClick} className={`w-[25vw] h-[25vw] md:w-20 md:h-20 border ${darkMode ? 'bg-[#303443]' : 'bg-white'} font-notoMono font-medium text-xl ${darkMode ? 'text-white' : 'text-black'} border-none transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}>0</button>
              <button onClick={handleClick} className={`flex justify-center items-center w-[25vw] h-[25vw] md:w-20 md:h-20 border ${darkMode ? 'bg-[#303443]' : 'bg-white'} font-notoMono font-medium text-xl border-none transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`} value='CL'><Borrar darkMode={darkMode}/></button>
              <button onClick={handleResult} className={`w-[25vw] h-[25vw] md:w-20 md:h-20 border ${darkMode ? 'bg-white text-black' : 'bg-black text-white'} font-notoMono font-medium text-xl border-none transition-all duration-300 md:rounded-br-2xl`}>=</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
