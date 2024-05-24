const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const selects = document.querySelectorAll('select')
const button = document.querySelector("button")
const currFrom = document.querySelector("#fromSelect")
const currTo = document.querySelector("#toSelect")
const displayResult = document.querySelector("div .msg")

const validText = document.querySelector(".warning")

selects.forEach((select)=>{
    for (const cCode in countryList) {
        let newOption = document.createElement('option')
        newOption.innerText = cCode
        newOption.setAttribute("value",cCode)
        if(select.name === "from" && cCode === "USD")
            newOption.selected ="selected";
        else if (select.name === "to" && cCode === "INR")
          newOption.selected = "selected";
        select.append(newOption)
    }
    select.addEventListener('change',(e)=>{
       let currCode = e.target.value
       let countryCode = countryList[currCode]
       let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`
       let updateImg = e.target.parentElement
       let img = updateImg.querySelector('img')
       img.setAttribute("src",newSrc)

    })
})
let input = document.querySelector(" input");
input.addEventListener("input", function() {
  let currentValue = input.value;
  if(currentValue === ""){
    validText.innerText = "Please enter a valid amount"
    button.disabled = true;
    button.style.backgroundColor = "#5dacf6";
  }
  else if(currentValue <= 0){
    validText.innerText = "Please enter amount greater than 0";
    button.disabled = true;
    button.style.backgroundColor = "#5dacf6";
  }
  else {
    validText.innerText = ""
    button.disabled = false;
    button.addEventListener("mouseover",()=>{
        button.style.backgroundColor = "#2697FF";
    })
  }
})


button.addEventListener("click",async (e)=>{
    e.preventDefault()
    let amount = document.querySelector(" input")
    let amountVal = amount.value

    const url = `${BASE_URL}/${currFrom.value.toLowerCase()}.json`;
    let respons = await fetch(url)
    let data = await respons.json()
    let rate = data[currFrom.value.toLowerCase()][currTo.value.toLowerCase()]
    
    let result = rate * amountVal;

    displayResult.innerText = `${amountVal} ${currFrom.value} = ${result} ${currTo.value}`;
    
})

