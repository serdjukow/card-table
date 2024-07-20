const suits = {
  clubs: "&#9827;",
  hearts: "&#9829",
  diamonds: "&#9830;",
  spades: "&#9824;",
}
const ranks = ["T", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

const cardGrid = document.getElementById("cardGrid")
const cardForm = document.getElementById("cardForm")
const result = document.getElementById("result")

function generateGrid(activeValues = []) {
  for (const [suit, symbol] of Object.entries(suits)) {
    const rowDiv = document.createElement("div")
    rowDiv.className = "row"

    ranks.forEach((rank) => {
      const div = document.createElement("div")
      div.className = `grid-item ${suit}`
      div.innerHTML = `${rank}${symbol}`

      const input = document.createElement("input")
      input.type = "checkbox"
      input.name = `${rank}_${suit}`
      input.value = `${rank}_${suit}`
      input.style.display = "none"

      if (activeValues.includes(`${rank}_${suit}`)) {
        input.checked = true
        div.classList.add("selected")
      }

      div.addEventListener("click", () => {
        const selectedCount = document.querySelectorAll(
          ".grid-item.selected"
        ).length

        if (div.classList.contains("selected")) {
          div.classList.remove("selected")
          input.checked = false
        } else if (selectedCount < 4) {
          div.classList.add("selected")
          input.checked = true
        } else {
          alert("You can select up to 4 cards only.")
        }
      })

      div.appendChild(input)
      rowDiv.appendChild(div)
    })

    cardGrid.appendChild(rowDiv)
  }
}

cardForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const selectedValues = []
  const inputs = cardForm.querySelectorAll('input[type="checkbox"]:checked')
  inputs.forEach((input) => {
    selectedValues.push(input.value)
  })

  console.log("Selected values:", selectedValues)
  result.innerHTML = selectedValues
})

generateGrid(["7_clubs", "T_hearts", "8_diamonds", "12_spades"])
