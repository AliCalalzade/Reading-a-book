let todos = []
let okundu = []
function eklemestorage(inputtext) {
    reset()
    todos.push(inputtext);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function addokundutostorage(inputtext) {
    if (localStorage.getItem("okundu") == null) {
        okundu = []
    } else {
        okundu = JSON.parse(localStorage.getItem("okundu"))
    }
    okundu.push(inputtext);
    localStorage.setItem("okundu", JSON.stringify(okundu))
}

function addokundutoUi(inputtext) {
    let kitap = document.querySelector("#kitap-okundu")
    let kitaplar = document.createElement("div")
    let icon = document.createElement("i")
    let isim = document.createElement("li")
    let input = document.querySelector(".ekleme")
    let silme = document.createElement("button")
    silme.className = "sil"
    icon.className = "fa-solid fa-book"
    kitaplar.className = "kitap"
    kitaplar.appendChild(icon)
    kitaplar.appendChild(isim)
    kitaplar.appendChild(silme)
    isim.textContent = inputtext
    kitap.appendChild(kitaplar)
    silme.textContent = "Delete"
    silme.addEventListener("click", removeokundu)
}

function removeokundu(e) {
    let silinecek = e.target.parentElement
    silinecek.remove()
    okundustorage(silinecek.children[1].textContent)
    showAlert("rgb(166, 0, 11)", "deleted", "#ff858d")
}

function okundustorage(removetext) {
    if (localStorage.getItem("okundu") == null) {
        okundu = []
    } else {
        okundu = JSON.parse(localStorage.getItem("okundu"))
    }
    okundu = JSON.parse(localStorage.getItem("okundu"))
    okundu.forEach(function (silinecekmi, index) {
        if (silinecekmi == removetext) {
            okundu.splice(index, 1)
        }
        localStorage.setItem("okundu", JSON.stringify(okundu))
    })
}

function reset() {
    if (localStorage.getItem("todos") == null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
}
function loaded() {
    document.addEventListener("DOMContentLoaded", yenileme)
    document.addEventListener("DOMContentLoaded", okunanload)
}
loaded()

function okunanload() {
    if (localStorage.getItem("okundu") == null) {
        okundu = []
    } else {
        okundu = JSON.parse(localStorage.getItem("okundu"))
    }
    okundu.forEach(function (kitap) {
        addokundutoUi(kitap)
    })
}

function yenileme() {
    reset()
    todos.forEach(function (todo) {
        eklemeui(todo)
    })

}
function addtodo() {
    let input = document.querySelector(".ekleme")
    if (input.value.trim() == null || input.value.trim() == "") {
        showAlert("#ffd500", "Enter value", "#594a00")
        input.value = ""
    } else {
        eklemeui(input.value)
        eklemestorage(input.value)
        input.value = ""
        showAlert("rgb(0, 230, 0)", "Successfully added", "rgb(0, 92, 12)")
    }
}

function eklemeui(inputtext) {
    let kitap = document.querySelector("#kitap")
    let kitaplar = document.createElement("div")
    let icon = document.createElement("i")
    let isim = document.createElement("li")
    let input = document.querySelector(".ekleme")
    let silme = document.createElement("button")
    silme.className = "okudum"
    icon.className = "fa-solid fa-book"
    kitaplar.className = "kitap"
    kitaplar.appendChild(icon)
    kitaplar.appendChild(isim)
    kitaplar.appendChild(silme)
    isim.textContent = inputtext
    kitap.appendChild(kitaplar)
    silme.textContent = "Readings"
    silme.addEventListener("click", removeui)
}
function removeui(e) {
    let todo = e.target.parentElement
    todo.remove()
    showAlert("#ff6f00", "Congratulations", "#542500")
    removetoStorage(todo.children[1].textContent)
    addokundutostorage(todo.children[1].textContent)
    addokundutoUi(todo.children[1].textContent)

}

function removetoStorage(todotext) {
    reset()
    todos = JSON.parse(localStorage.getItem("todos"))
    todos.forEach(function (storage) {
        if (storage == todotext) {
            // console.log(todos[todos.indexOf(storage)])

            // console.log(todos.indexOf(storage))

            todos.splice(todos.indexOf(storage), 1)
            // .remove() Arraylere ait deyil
        }
        localStorage.setItem("todos", JSON.stringify(todos))
    })

}

function showAlert(renk, text, renkText) {
    let alert = document.querySelector(".alert")
    let div = document.createElement("div")
    div.className = `inAlert`
    let hAttiribiute = document.createElement("h3")
    hAttiribiute.style.textAlign = "center"
    hAttiribiute.style.fontFamily = "Arial, Helvetica, sans-serif"
    div.appendChild(hAttiribiute)
    div.style.backgroundColor = renk
    div.style.color = renkText
    div.style.width = "80%"
    div.style.height = "20px"
    // div.style.marginLeft = "10%"
    div.style.borderRadius = "10px"
    hAttiribiute.textContent = text
    alert.appendChild(div)
    setTimeout(function () {
        div.remove()
    }, 1000);
}
// showAlert("blue", "hoş geldiniz")

// function kontrol() {
//     let kitap = document.querySelector("#kitap-okundu")
//     if (kitap.innerHTML = " ") {
//         kitap.innerHTML = "hiç kitap okunmadı"
//         kitap.style.textAlign = "center"
//     } else {
//         console.log("no")
//     }
// }