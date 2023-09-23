let arr=[]
const inputEl=document.getElementById("input-el")
const btnEl=document.getElementById("btn")
const delallBtn=document.getElementById("btn-all-del")
let ulEl=document.getElementById("ul-el")
let tabBtn=document.getElementById("tab-btn")


delallBtn.addEventListener('dblclick', function(){
    localStorage.clear()
    arr=[]
    render()
})

function delfunc(){
    // console.log("Delete");
    // JSON.parse(localStorage.getItem("Links"))
    const button=event.target.closest('button')
    let el=button.id.split("-")
    const idx=el[1]
    // console.log(arr[idx]);
    arr = arr.filter(item => item !== arr[idx])
    localStorage.setItem("Links",JSON.stringify(arr))
    render();
    console.log("Complete")
    // console.log(typeof());
}

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
    console.log("Saved");
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
        liItems+=`<li>
        <button id=${'btn-'+i} class="del-btn" onclick="delfunc()"><span  class="material-symbols-outlined">
        delete
        </span></button>
        <a target="_blank" href="${arr[i]}">${arr[i]}</a>
        </li><hr>`
    }
    ulEl.innerHTML=liItems
}

