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

ulEl.addEventListener('click', function (event) {
    // Check if the clicked element has the class "del-btn"
    if (event.target.classList.contains('del-btn')) {
        // Execute the delete function
        delfunc(event);
    }
});

function render(){
    let liItems=""
    for(let i=0;i<arr.length;i++){
        liItems+=`<li>
        <span id=${'btn-'+i} class="material-symbols-outlined del-btn">
        delete
        </span></button>
        <a target="_blank" href="${arr[i]}">${arr[i]}</a>
        </li><hr>`
    }
    ulEl.innerHTML=liItems
}

function delfunc(event){
    console.log("Delete");
    // JSON.parse(localStorage.getItem("Links"))
    // const button=event.target.closest('button')
    const button_id=event.target.id
    if (button_id) {
        let el = button_id.split("-");
        const idx = el[1];
        console.log(idx);
        // Create a new array without the element to be removed
        const newArr = arr.filter((item, index) => index !== parseInt(idx));
        
        // Update the local storage and the 'arr' variable
        localStorage.setItem("Links", JSON.stringify(newArr));
        arr = newArr;
        
        render();
        // console.log("Complete");
    }
}


// const btns = document.querySelectorAll('.del-btn');
// btns.forEach(btn => {
//     btn.addEventListener('click', delfunc);
//     console.log("Event listener added to button:", btn.id);
// });

