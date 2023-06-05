let realEvent
let start = new Date()
let current
let clock
let correctArr = []
let unset = false
let counter = document.querySelector('.counter')

let startDif = "Medium"
newBoard(startDif)

let difOptions = document.querySelectorAll('.dif')

difOptions.forEach(e => {
    e.addEventListener('click', event => {
        let difficulty = event.target.dataset.dif
        document.querySelector('.popUp').classList.add('hide')
        document.querySelector('.popUp').classList.remove('show')
        document.querySelector('.wrapper').classList.remove('fade')
        newBoard(difficulty)
    })
})


let newButton = document.querySelector('.newBtn')

newButton.addEventListener('click', () => {
    document.querySelector('.popUp').classList.add('show')
    document.querySelector('.popUp').classList.remove('hide')
    document.querySelector('.wrapper').classList.add('fade')
})

document.querySelector('.x').addEventListener('click', () => {
    document.querySelector('.popUp').classList.add('hide')
    document.querySelector('.popUp').classList.remove('show')
    document.querySelector('.wrapper').classList.remove('fade')
})





window.onload = () => {
    let left = document.querySelector('.left')
    let squareBody = document.createElement('div')
    squareBody.classList.add('squareBody')
    for (let b = 0; b < 9; b++) {
        let sec = document.createElement('div')
        sec.classList.add('squareSection')
        squareBody.append(sec)
    }
    left.removeChild(left.firstChild)
    left.append(squareBody)
    let squareSection = document.querySelectorAll('.squareSection')
    
    squareSection.forEach(sec => {
        if (sec.firstChild != null) {
            sec.removeChild(sec.firstChild)
        } 
    })

    let x = 1
    let y = 9
    let z = 0 //# of times incremented
    let n = 1 //tracks quadrant. +1 every 3 iterations of i
    let r = 0 //tracks going into new row of quadrants

    squareSection.forEach(sec => {
        for (let i = 0; i < 9; i++) {
            let square = document.createElement('div')
            square.classList.add('square')
            square.dataset.immutable = 'false'
            square.dataset.x = x
            square.dataset.y = y
            square.dataset.active = 'false'
            if (i % 3 == 0 && i != 0) {
                square.classList.add('leftB')
                n = (i / 3) + 1
            }
            if (z % 3 == 0 && z != 0) {
                square.classList.add('topB')
                r = z
            }
            square.dataset.quadrant = n + r
            x++
            sec.append(square)
        }
        i = 0
        y--
        x = 1
        n = 1
        z++

    })
}

function newBoard(difficulty) {
    Promise.all([
        // fetch('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value, solution}}}')
        // fetch('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{solution}}}'),
        fetch('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},results,message}}')
    ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
            console.log(responses)
            return response.json();
        }));
    }).then(function (data) {
        console.log(difficulty)
        if (data[0].newboard.grids[0].difficulty != difficulty) {
            newBoard(difficulty)
            return
        }

       let square = document.querySelectorAll('.square')
       square.forEach(sq => {
        sq.dataset.immutable = 'false'
        sq.dataset.active = 'false'
        sq.innerText = ''
        sq.classList.remove('correct')
        sq.classList.remove('incorrect')
       })

       let i = 0
       let z = 0

       for (let a = 0; a < square.length; a++) {
        console.log('a before: ' + a)
        console.log('z before: ' + z)
        console.log('i before: ' + i)
        if (data[0].newboard.grids[0].value[z][i] != 0) {
            square[a].innerText = data[0].newboard.grids[0].value[z][i]
            square[a].dataset.immutable = 'true'
        }
        square[a].dataset.answer = data[0].newboard.grids[0].solution[z][i] 
        i++
        if (i == 9) {
            i = 0
            z++
        }
       }

       start = new Date()
    correctArr.length = 0
    // Log the data to the console
    // You would do something with both sets of data here
   
    let topMenu = document.querySelector('.topMenu')
    console.log(topMenu.firstChild)
    topMenu.removeChild(topMenu.firstChild)
    let timer = document.createElement('h2')
    topMenu.insertBefore(timer, topMenu.firstChild)
    clock = setInterval(function(){
    var current = new Date();
    var minutes = Math.floor((current.getTime()-start.getTime())/1000/60);
    var seconds = Math.floor((current.getTime()-start.getTime())/1000%60);
    if (seconds < 10) {
    seconds = "0" + seconds;
    }

    document.querySelectorAll(".topMenu h2")[0].innerText = minutes + ":" + seconds;
    },100)
    
       counter.innerText = 0
       square.forEach(sq => {
        if (sq.innerText == sq.dataset.answer) {
            correctArr.push(sq)
        }
    })
       //set event listeners
       if (unset == false) {
        setEventListeners()
        unset = true
       }

}).catch(function (error) {
    // if there's an error, log it
    console.log(error);
});
}

function setEventListeners() {
    

    let squareArr = []
    let noteArr = []
    let square = document.querySelectorAll('.square')
    let note = document.querySelectorAll('.noteBox')

    square.forEach(sq => {
        squareArr.push(sq)
    })

    note.forEach(n => {
        noteArr.push(n)
    })


    //activating cells
    document.querySelectorAll(".square").forEach(sq =>
        sq.addEventListener("click", event => {
            console.log('hell')
             realEvent = event.target
            if (brushButton.classList.contains('active')) {
                numberInput(parseInt(realEvent.innerText), parseInt(realEvent.innerText - 1))
            }
            if (event.target.parentElement.parentElement.classList.contains('square')) {
                realEvent = event.target.parentElement.parentElement
            }

                if (realEvent.dataset.active == 'true') {
                    squareArr.forEach(s => {
                        s.classList.add('default')
                        s.classList.remove('grayed')
                        s.classList.remove('selected')
                    })
                    realEvent.dataset.active = 'false'
                }
                else {
                    let x = parseInt(realEvent.dataset.x)
                    let y = parseInt(realEvent.dataset.y)
                    let quadrant = parseInt(realEvent.dataset.quadrant)
                    squareArr.forEach(s => {
                        s.classList.add('default')
                        s.classList.remove('grayed')
                        s.classList.remove('selected')
                        s.dataset.active = 'false'
                        if (s.dataset.x == x) {
                            s.classList.remove('default')
                            s.classList.add('grayed')
                        }
                        if (s.dataset.y == y) {
                            s.classList.remove('default')
                            s.classList.add('grayed')
                        }
                        if (s.dataset.quadrant == quadrant) {
                            s.classList.remove('default')
                            s.classList.add('grayed')
                        }
                    })
                    realEvent.classList.add('selected')
                    realEvent.dataset.active = 'true'
                } 
             
    }))

   

    //de-select square if you click outside of it
    window.onclick = function (event) {
        let myBox = document.querySelector('.squareBody');
 
        if (event.target.contains(myBox) && event.target !== myBox) {
            squareArr.forEach(sq => {
                        sq.classList.remove('active')
                        sq.classList.remove('selected')
                        sq.dataset.active = 'false'
                        sq.classList.remove('grayed')
                        sq.classList.add('default')
                    })
            
        }
        
 }

    //adding number to cells
    let numPad = document.querySelector('.numPad')
    numPad.remove()
    let buttonSection = document.querySelector('.buttonSection')
    let pad = document.createElement('div')
    pad.classList.add('numPad')
    for (let k = 0; k < 9; k++) {
        let div = document.createElement('div')
        let h1 = document.createElement('h1')
        div.classList.add('num')
        h1.dataset.n = k + 1
        h1.innerText = k + 1
        div.append(h1)
        pad.append(div)
    }
    buttonSection.parentNode.insertBefore(pad, buttonSection.nextSibling)
    
    let numbers = document.querySelectorAll('.num')
    numbers.forEach( num =>
        num.addEventListener('click', event => {
            let number = parseInt(event.target.dataset.n)
            if (!event.target.classList.contains('num')) {
                numberInput(number)
            }
        }))

        console.log(document)
            window.addEventListener('keydown', function keydown(event)  {
                if (event.key >= 1 && event.key <= 9) {
                    console.log('key: ' + event.key)
                    numberInput(event.key)
                }
            })

        
        function numberInput(number) {
            console.log(number)
                if (realEvent.dataset.active == 'true' && realEvent.dataset.immutable != 'true' || numbers[number - 1].classList.contains('brush')) {
                    console.log(realEvent)
                    let doubleCheck = realEvent.innerText
                    if (numbers[number - 1].classList.contains('brush')) {
                        brushNumber(number)
                        return
                    }
                    if (parseInt(doubleCheck) == number && !realEvent.querySelector('.noteBox')) {
                        return
                    }
                    if (numbers[number - 1].classList.contains('note')) {
                        console.log('note running')
                        noteTake(number)
                        return
                    }
                    else {
                        numberCheck(number)
                    } 
                }
            
        }

        function numberCheck(num) {
            console.log('check')
            let rowArr = []
            squareArr.forEach(sq => {
                if (sq != realEvent) {
                    if (sq.dataset.x == realEvent.dataset.x) {
                        rowArr.push(sq.dataset.answer)
                    }
                    if (sq.dataset.y == realEvent.dataset.y) {
                        rowArr.push(sq.dataset.answer)
                    }
                }
            })
            const result = rowArr.filter(val => val == num)
            if (result.length > 0) {
                realEvent.classList.add('incorrect')
                realEvent.innerText = num
                let x = parseInt(counter.innerText)
                x++
                counter.innerText = x
                // if (x >= 3) {
                //     alert('You Lost')
                //     setTimeout(() => {
                //         newBoard()
                //     }, 3000)
                //     squareArr.forEach(sq => {
                //         sq.innerText = sq.dataset.answer
                //     })
                // }
            }
            else {
                if (realEvent.classList.contains('incorrect')) {
                    realEvent.classList.remove('incorrect')
                }
                realEvent.classList.add('correct')
                realEvent.innerText = num
                if (!correctArr.includes(realEvent)) {
                    correctArr.push(realEvent)
                }
                if (correctArr.length == 81) {
                    alert('Congratulations! You won in ' + document.querySelector('.topMenu h2').innerText + '!')
                    correctArr.length = 0
                    document.querySelector('.popUp').classList.add('show')
                    document.querySelector('.popUp').classList.remove('hide')
                    document.querySelector('.wrapper').classList.add('fade')
                    clearInterval(clock)
                }
            }
        }

        function brushNumber(num) {
            let brushArr = []
            squareArr.forEach(sq => {
                sq.classList.remove('brushed')
                sq.classList.remove('darkGrayed')
                if (sq.innerText == num && sq.dataset.answer == num && !sq.querySelector('.noteBox')) {
                    sq.classList.add('brushed')
                    brushArr.push(sq)
                }
            })
            brushArr.forEach(e => {
                squareArr.forEach(sq => {
                    if (e != sq) {
                        if (e.dataset.x == sq.dataset.x) {
                            sq.classList.add('darkGrayed')
                        }
                        if (e.dataset.y == sq.dataset.y) {
                            sq.classList.add('darkGrayed')
                        }
                        // if (e.dataset.quadrant == sq.dataset.quadrant) {
                        //     sq.classList.add('darkGrayed')
                        // }
                    }
                })
            })
        }   

        //erase button
        let eraseHolder = document.querySelector('.eraseHolder')

        //reset event listener
        while (eraseHolder.firstChild) {
            eraseHolder.removeChild(eraseHolder.firstChild)
        }
        let eraseI = document.createElement('i')
        let eraseText = document.createElement('h2')
        eraseI.classList.add('fa', 'fa-eraser', 'erase')
        eraseText.innerText = 'Erase'
        eraseHolder.append(eraseI)
        eraseHolder.append(eraseText)

        document.querySelector('.erase').addEventListener('click', ()=> {
            squareArr.forEach(sq => {
                if (sq.dataset.active == 'true' && sq.dataset.immutable != 'true') {
                    sq.innerText = ''
                }
            })
        })

        function noteTake(number) {
            if (!realEvent.firstChild) {
                let note = document.createElement('div')
                note.classList.add('noteBox')
                // note.innerText = number
                for (let p = 0; p < 9; p++) {
                    let h2 = document.createElement('h2')
                    h2.classList.add('noteChild')
                    h2.innerText = ''   
                    note.append(h2)
                }
                realEvent.append(note)
                realEvent.querySelectorAll('.noteChild')[number - 1].innerText = number
                
            }
            else {
                let children = realEvent.querySelectorAll('.noteChild')
                for (let u = 0; u < children.length; u++) {
                    if (children[u].innerText == number && number != '') {
                        children[u].innerText = ''
                        return
                    }
                }
                // let text = squareArr[i].firstChild.innerText.toString()
                // for (let j = 0; j < text.length; j++) {
                //     if (text[j] == number.toString()) {
                //         console.log('equal')
                //         let newText = text.replace(`${text[j]}`, '')
                //         squareArr[i].firstChild.innerText = newText
                //         return
                //     }
                // }

                // text += number
                // let nArr = [...text]
                // nArr.sort((a, b) => a - b)
                // let newText = ''
                // nArr.forEach(n => {
                //     newText += n
                // })
                // squareArr[i].firstChild.innerText = newText
                realEvent.querySelectorAll('.noteChild')[number - 1].innerText = number
            }
           
        }

        //notes button
        let noteHolder = document.querySelector('.noteHolder')
        
        //reset event listener
        while (noteHolder.firstChild) {
            noteHolder.removeChild(noteHolder.firstChild)
        }
        let noteI = document.createElement('i')
        let noteText = document.createElement('h2')
        noteI.classList.add('fa', 'fa-pencil', 'note')
        noteText.innerText = 'Notes'
        noteHolder.append(noteI)
        noteHolder.append(noteText)
        let noteButton = document.querySelector('.note')
        noteButton.addEventListener('click', () => {
            if (!brushButton.classList.contains('active')) {
                if (noteButton.classList.contains('active')) {
                    noteButton.classList.remove('active')
                    numbers.forEach(num => {
                        num.classList.remove('note')
                    })
                }
                else {
                    noteButton.classList.add('active')
                    numbers.forEach(num => {
                        num.classList.add('note')
                    })
                }
            }
            
        })

        //brush
        let brushHolder = document.querySelector('.brushHolder')

        //reset event listener
        while (brushHolder.firstChild) {
            brushHolder.removeChild(brushHolder.firstChild)
        }
        let brushI = document.createElement('i')
        let brushText = document.createElement('h2')
        brushI.classList.add('fa', 'fa-paint-brush', 'brush')
        brushText.innerText = 'Brush'
        brushHolder.append(brushI)
        brushHolder.append(brushText)

        let brushButton = document.querySelector('.brush')
        brushButton.addEventListener('click', () => {
            if (!noteButton.classList.contains('active')) {
                if (brushButton.classList.contains('active')) {
                    brushButton.classList.remove('active')
                    squareArr.forEach(sq => {
                        sq.classList.remove('brushed')
                        sq.classList.remove('darkGrayed')
                    })
                    numbers.forEach(num => {
                        num.classList.remove('brush')
                    })
                }
                else {
                    brushButton.classList.add('active')
                    numbers.forEach(num => {
                        num.classList.add('brush')
                    })
                }
            }
            if (!realEvent.firstChild) {
                numberInput(parseInt(realEvent.innerText))
            }
        })
}









    
