function addData(event) {
    event.preventDefault();
    let text = document.getElementById('todo-input');
    db.collection('items-todo').add({
       text: text.value,
        status: 'active'
    })
    text.value ="";
}



function getData() {
    db.collection("items-todo").onSnapshot((Snapshot) => {
           
            let items =[];
            Snapshot.docs.forEach((doc) => {
                
            items.push({
                id:doc.id,
                ...doc.data()
            })
            })
            generateItems(items);
           
    });
      
}





function generateItems(items) {
    let itemhtml ="";
    items.forEach((item)=>{
        itemhtml +=`
        <div class="items-list">

        <div class="items-main">
            <div data-id="${item.id}"= class="check-box ${item.status == "complete" ? "checked": " " }">
                 <img src="./assets/checkbox.png" alt="" />
            </div>
            <div class="todo-text ${item.status == "complete" ? "checked": " " }">
                 ${item.text}
            </div>
</div>
            <div class='delete'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-x-fill" viewBox="0 0 16 16">
            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6.854 6.146 8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 1 1 .708-.708z"/>
          </svg>
            </div>
        
          </div> 
        `
    })
    document.querySelector('.todo-items-wrapped').innerHTML=itemhtml;
createEventListener()
createEventListener()

}



function createEventListener() {
    let todoCheckmarks = document.querySelectorAll('.todo-items-wrapped .check-box');
    let deleteitem=document.querySelector('.todo-items-wrapped .delete');
    deleteitem.forEach((del_item)=>{
        del_item.addEventListener('click', function () {
        DeleteData(del_item.dataset.id) ;
        })
    })
    todoCheckmarks.forEach((checkmark)=>{
        checkmark.addEventListener('click', function () {
            markCompleted(checkmark.dataset.id);
        })
    })
}


function DeleteData(id) { 
    let deleteitem =db.collection('items-todo');
    deleteitem.remove(id)
}

function markCompleted(id) {
    let item = db.collection('items-todo').doc(id);
    item.get().then(function (doc) {
        if (doc.exists){
            let status = doc.data().status;
            if(status == "active"){
                item.update({
                    status: "complete"
                })
            
            }else if(status == "complete"){
                item.update({
                    status: "active"
                })
            }
        }
    
    })
}

getData();