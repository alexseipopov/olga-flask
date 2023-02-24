// CRUD
let root = document.querySelector("#root")
let modalWindow = document.querySelector(".modal-wrapper")
let modal = document.querySelector(".modal")
let calendar = document.createElement('div')
let body = document.querySelector("body")
let info = document.querySelector("#info")
calendar.className = "calendar"

const printNewModal = (event, i, j) => {
    console.log(event)
    const xOffset = event.target.clientWidth
    const yOffset = window.pageYOffset
    const top = event.target.offsetTop
    const left = event.target.offsetLeft

    fetch("http://127.0.0.1:5001/api", {
        method: "POST",
        body: JSON.stringify({
            "i": i,
            "j": j
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(res => {
        info.innerHTML = res["data"]
        event.target.classList.toggle("active")
        modalWindow.classList.toggle("active")
        body.classList.toggle("hidden")
        modal.style.top = `${top - yOffset}px`
        modal.style.left = `${left + xOffset}px`
    })
}

for (let i = 0; i < 7; i++) {
    let column = document.createElement("div")
    column.className = "cal_column"
    for (let j = 0; j < 24; j++) {
        let block = document.createElement('div') // <div></div>
        block.className = "block" // <div class="block"></div>
        block.innerText = j
        block.addEventListener("click", (event) => {
            printNewModal(event, i, j)
        })
        column.append(block)
    }
    calendar.append(column)
}

root.append(calendar)

// 
// 

// document.querySelectorAll(".btn").forEach((elem, i) => {
//     elem.addEventListener("click", e => {
//         document.querySelector("#info").innerHTML = i
//         modalWindow.classList.toggle("active")
//         body.classList.toggle("hidden")
//     })
// })

// for (let i = 0; i < document.querySelectorAll(".btn").length; i++) {
//     document.querySelectorAll(".btn")[i].addEventListener("click", e => {
//         document.querySelector("#info").innerHTML = i
//         modalWindow.classList.toggle("active")
//         body.classList.toggle("hidden")
//     })
// }


document.querySelector(".close_btn").addEventListener("click", () => {
    modalWindow.classList.toggle("active")
    body.classList.toggle("hidden")
})

modalWindow.addEventListener("click", e => {
    if (!e.target.closest(".modal")) {
        modalWindow.classList.toggle("active")
        body.classList.toggle("hidden")
    }
})

// function name() {
//     console.log("success")
// }
// // modalWindow.addEventListener("click", name)

// const exec = (func) => {
//     func()
// }

// exec(name)

