let arr=[]
const inputEl=document.getElementById("input-el")
const btnEl=document.getElementById("btn")
const delBtn=document.getElementById("btn-del")
let ulEl=document.getElementById("ul-el")
let tabBtn=document.getElementById("tab-btn")

delBtn.addEventListener('dblclick', function(){
    localStorage.clear()
    arr=[]
    render()
})

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        // arr.push(tabs[0].url)
        arr.push(tabs[0].url)
        localStorage.setItem("Links",JSON.stringify(arr))
        render()
    })

})


let myLinks=JSON.parse(localStorage.getItem("Links"))
if (myLinks){
    arr=myLinks
    render()
}

btnEl.addEventListener("click", function(){
    let str=inputEl.value.trim()
    if (str.length>0){
        arr.push(str)
        inputEl.value=""
        localStorage.setItem("Links",JSON.stringify(arr))
    }
    render()
})


function render(){
    let liItems=""
    for(let i=0;i<arr.length;i++){
        liItems+=`<li><a target="_blank" href="${arr[i]}">${arr[i]}</a></li><hr>`
    }
    ulEl.innerHTML=liItems
}



