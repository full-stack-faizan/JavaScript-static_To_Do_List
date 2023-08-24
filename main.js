let SubmitButton = document.getElementById('mainbtn')
let second = document.getElementById('show-list')
let ClearButton = document.getElementById('clr')
ClearButton.addEventListener('click', ClearLocalStorage)





function ClearLocalStorage() {
    let litem = document.querySelectorAll('.result')

    litem.forEach((e) => {
        
        second.removeChild(e)

    })
    localStorage.removeItem("ToDolist");
    ClearButton.style.display='none'
}

//eventlister to listen the submit buttons
SubmitButton.addEventListener('click', addValueToDOM)

window.addEventListener('DOMContentLoaded', DefaultAddedContent)
// the function of doing in the submit button and add the content to the dom
function addValueToDOM(e) {
    e.preventDefault()
    let inputbox = document.getElementById('inputbox')
    let inputvalue = inputbox.value.toString()
    let id = new Date().getTime().toString()
    
    if (inputvalue !== '') {
        SetValueToLocalStorage(id, inputvalue)
        const ResultDiv = document.createElement('div')

        ResultDiv.classList.add('result')
        let dataAttribute = document.createAttribute('data-id')
        dataAttribute.value = id
        ResultDiv.setAttributeNode(dataAttribute)

            ResultDiv.innerHTML = `<div class="resutl-pices">
        <p>${inputvalue}</p>
        <div class="button-div">
          <button class="edit" ><i class="fa-solid fa-file-pen"></i></button>
          <button class="delete" ><i class="fa-solid fa-trash"></i></button>
        </div>
        </div>`
            second.appendChild(ResultDiv)
            ResetDefault()
            ClearButton.style.display='block'
            let Dbtn =second.querySelectorAll('.delete')
        Dbtn.forEach((e)=>{
            e.addEventListener('click',DeleteItem)
        })
        let Ebtn =second.querySelectorAll('.edit')
        Ebtn.forEach((e)=>{
            e.addEventListener('click',EditItems)
        })
    }
        else {
            console.log('input is empty')
        }

    }
    
    // Here we can add the value with id into the local storage
    function SetValueToLocalStorage(id, value) {

        let obj = { id, value }

        let items = SetLocalStorage()
        //  console.log(items)
        items.push(obj)
        localStorage.setItem('ToDolist', JSON.stringify(items))

       

    }
    /// Here we can return the array from locaal storage and add the new values 
    function SetLocalStorage() {
        return localStorage.getItem('ToDolist') ? JSON.parse(localStorage.getItem('ToDolist')) : []

    }

    function ResetDefault() {
        inputbox.value = "";
        SubmitButton.textContent= "Submit"
    }


    function DefaultAddedContent(){
        let addeditems = SetLocalStorage()
        addeditems.forEach((e)=>{
          
            AddLocalStoragetoDOM(e.id, e.value)
        })
    }
    function AddLocalStoragetoDOM(id, value) {
        const ResultDiv = document.createElement('div')

        ResultDiv.classList.add('result')
        let dataAttribute = document.createAttribute('data-id')
        dataAttribute.value = id
        ResultDiv.setAttributeNode(dataAttribute)

        if (value !== undefined) {

            ResultDiv.innerHTML = `<div class="resutl-pices">
        <p>${value}</p>
        <div class="button-div">
          <button class="edit" ><i class="fa-solid fa-file-pen"></i></button>
          <button class="delete" ><i class="fa-solid fa-trash"></i></button>
        </div>
        </div>`
            second.appendChild(ResultDiv)
            ResetDefault()
        }
    
     
        let Dbtn =second.querySelectorAll('.delete')
        Dbtn.forEach((e)=>{
            e.addEventListener('click',DeleteItem)
        })


        let Ebtn =second.querySelectorAll('.edit')
        Ebtn.forEach((e)=>{
            e.addEventListener('click',EditItems)
        })
    }

   
    function DeleteItem(Delbtn){
       let parent = Delbtn.currentTarget.parentElement.parentElement.parentElement
       let parentId = parent.dataset.id
       removeItems(parentId)
      
       second.removeChild(parent)
       ResetDefault()
    }




    function EditItems(EditBtn){
        let parent = EditBtn.currentTarget.parentElement.parentElement.parentElement
        let parentId = parent.dataset.id
      

        let Editelement = EditBtn.currentTarget.parentElement.previousElementSibling
       let nvalue = inputbox.value = Editelement.innerHTML;
       SubmitButton.textContent= "Edit";
     
       
       udateEditedItems(parentId,nvalue)
       ResetDefault()

       
    }

    function udateEditedItems(id,value){
        let items = SetLocalStorage()
        items= items.map((e)=>{
            console.log(e.id)
         
        if(e.id === id)
        {
            e.value= value;
        }
        return items
        })
        localStorage.setItem('ToDolist', JSON.stringify(items))
    }


    function removeItems(id){
        let item = SetLocalStorage()
        item= item.filter((e)=>{
        if(e.id !== id)
        {
            return e
        }
        })
        localStorage.setItem('ToDolist', JSON.stringify(item))

    }




