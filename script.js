function newBoard() {
    Promise.all([
        fetch('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value, solution}}}')
        // fetch('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{solution}}}'),
        // fetch('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},results,message}}')
    ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function (data) {
        // Log the data to the console
        // You would do something with both sets of data here
        let left = document.querySelector('.left')
        let counter = document.querySelector('.counter')
        counter.innerText = '0'
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
    
        console.log(data[0].newboard.grids[0].solution)
        let x = 1
        let y = 9
        let z = 0 //# of times incremented
    
        squareSection.forEach(sec => {
            for (let i = 0; i < 9; i++) {
                let square = document.createElement('div')
                square.classList.add('square')
                square.dataset.immutable = 'false'
                if (data[0].newboard.grids[0].value[z][i] != 0) {
                    square.innerText = data[0].newboard.grids[0].value[z][i]
                    square.dataset.immutable = 'true'
                }
                square.dataset.x = x
                square.dataset.y = y
                square.dataset.active = 'false'
                square.dataset.answer = data[0].newboard.grids[0].solution[z][i]
                if ((i + 1) % 3 == 0) {
                    square.classList.add('rightB')
                }
                if ((z + 1) % 3 == 0) {
                    square.classList.add('bottomB')
                }
                x++
                sec.append(square)
            }
            i = 0
            y--
            x = 1
            z++
    
        })
    
        let squareArr = []
        let noteArr = []
        let square = document.querySelectorAll('.square')
        let note = document.querySelectorAll('.noteBox')
    
        square.forEach(sq => {
            squareArr.push(sq)
        })

        console.log(squareArr)
    
        note.forEach(n => {
            noteArr.push(n)
        })
    
    
        //activating cells
        document.querySelectorAll(".square").forEach(sq =>
            sq.addEventListener("click", event => {
                if (!event.target.classList.contains('noteBox')) {
                    if (event.target.dataset.active == 'true') {
                        squareArr.forEach(s => {
                            s.classList.add('default')
                            s.classList.remove('grayed')
                            s.classList.remove('selected')
                        })
                        event.target.dataset.active = 'false'
                    }
                    else {
                        let x = parseInt(event.target.dataset.x)
                        let y = parseInt(event.target.dataset.y)
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
                        })
                        event.target.classList.add('selected')
                        event.target.dataset.active = 'true'
                    } 
                } 
        }))
    
        // document.body.onclick = function() {
        //     squareArr.forEach(sq => {
    
        //     })
        // }
    
        //adding number to cells
        let numContainer = document.querySelector('.numContainer')
        numContainer.removeChild(numContainer.firstChild)
        let numPad = document.createElement('div')
        numPad.classList.add('numPad')
        for (let k = 0; k < 9; k++) {
            let div = document.createElement('div')
            let h1 = document.createElement('h1')
            div.classList.add('num')
            h1.dataset.n = k + 1
            h1.innerText = k + 1
            div.append(h1)
            numPad.append(div)
        }
        numContainer.append(numPad)
        
        let numbers = document.querySelectorAll('.num')
        numbers.forEach(num =>
            num.addEventListener('click', event => {
                if (!event.target.classList.contains('num')) {
                    for (let i = 0; i < squareArr.length; i++) {
                        if (squareArr[i].dataset.active == 'true' && squareArr[i].dataset.immutable != 'true') {
                            let number = parseInt(event.target.dataset.n)
                            if (num.classList.contains('note')) {
                                noteTake(i, number)
                            }
                            else {
                                numberCheck(i, number)
                            } 
                        }
                    }
                }
            }))
    
            function numberCheck(i, num) {
                let rowArr = []
                console.log(squareArr[i])
                squareArr.forEach(sq => {
                    if (sq != squareArr[i]) {
                        if (sq.dataset.x == squareArr[i].dataset.x) {
                            rowArr.push(sq.dataset.answer)
                        }
                        if (sq.dataset.y == squareArr[i].dataset.y) {
                            rowArr.push(sq.dataset.answer)
                        }
                    }
                })
                const result = rowArr.filter(val => val == num)
                console.log(result)
                if (result.length > 0) {
                    console.log('incorrect')
                    squareArr[i].classList.add('incorrect')
                    squareArr[i].innerText = num
                    let x = parseInt(counter.innerText)
                    x++
                    counter.innerText = x
                    if (x >= 3) {
                        alert('You Lost')
                        newBoard()
                    }
                }
                else {
                    if (squareArr[i].classList.contains('incorrect')) {
                        squareArr[i].classList.remove('incorrect')
                    }
                    squareArr[i].classList.add('correct')
                    squareArr[i].innerText = num
                }
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
                console.log('hi')
                squareArr.forEach(sq => {
                    if (sq.dataset.active == 'true' && sq.dataset.immutable != 'true') {
                        sq.innerText = ''
                    }
                })
            })
    
            function noteTake(i, number) {
                console.log('hi')
                if (!squareArr[i].firstChild) {
                    let note = document.createElement('div')
                    note.classList.add('noteBox')
                    note.innerText = number
                    squareArr[i].append(note)
                }
                else {
                    let text = squareArr[i].firstChild.innerText.toString()
                    for (let j = 0; j < text.length; j++) {
                        if (text[j] == number.toString()) {
                            let newText = text.replace(`${text[j]}`, '')
                            squareArr[i].firstChild.innerText = newText
                            return
                        }
                    }
                    squareArr[i].firstChild.innerText += number
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
                console.log('hi')
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
            })
    
    
    
    }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
    });
}

newBoard()
let newButton = document.querySelector('.newBtn')

newButton.addEventListener('click', () => {
    newBoard()
})






    
