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
            generateItems(items)
           
    });
      
}


function generateItems(items) {
    let itemhtml ="";
    items.forEach((item)=>{
        itemhtml +=`
        <div class="items-list">
            <div data-id="${item.id}"= class="check-box ${item.status == "complete" ? "checked": " " }">
              <img src="./assets/checkbox.png" alt="" />
            </div>
            <div class="todo-text    ${item.status == "complete" ? "checked": " " }">
            ${item.text}
            
            </div>
          </div> 
        `
    })
  
    document.querySelector('.todo-items-wrapped').innerHTML=itemhtml;
createEventListener()
createEventListener1()

}



function createEventListener() {
    let todoCheckmarks = document.querySelectorAll('.todo-items-wrapped .check-box');
    todoCheckmarks.forEach((checkmark)=>{
        checkmark.addEventListener('click', function () {
    

            
         
            markCompleted(checkmark.dataset.id);
        })
    })
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