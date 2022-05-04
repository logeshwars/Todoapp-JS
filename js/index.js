const addbtn = document.getElementById("addButton");
const closebtn = document.querySelector(".close");
const popup = document.querySelector(".popup");
const listName = document.querySelector("#name");
const listTime = document.querySelector("#dt");
const listDesc = document.querySelector("#desc");
const pptitle = document.querySelector("#pptitle");
const crtbtn = document.querySelector(".ct");
const randColor = [
    "linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)",
    "linear-gradient( 135deg, #FEB692 10%, #EA5455 100%)",
    "linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%)",
    "linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%)",
    "linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%)",
    "linear-gradient( 135deg, #FCCF31 10%, #F55555 100%)",
    "linear-gradient( 135deg, #FDEB71 10%, #F8D800 100%)",
];
let showpop = false;
let editTodoIndex = -1;
addbtn.addEventListener("click", () => {
    pptitle.innerHTML = "Create ToDo";
    showpopup();
});

closebtn.addEventListener("click", () => {
    showpopup();
});
if (localStorage.todo != undefined && localStorage.todo != '[null]')
    var data = JSON.parse(localStorage.todo);
else
    var data = []

function showpopup() {
    if (showpop) {
        showpop = false;
        popup.style.display = "none";
    } else {
        popup.style.display = "grid";
        showpop = true;
    }
}

function addAndRefresh(d, mode) {
    d = JSON.stringify(d);
    localStorage.setItem("todo", d);
    if (mode == "delete")
        localStorage.todo.length -= 1;
    console.log(localStorage)
    location.reload();
}

function createEl(tag) {
    return document.createElement(tag);
}
const deleteFromList = (i) => {
    delete data[i];
    addAndRefresh(data, "delete");
};


// data = JSON.stringify(data);
// localStorage.setItem("todo", data);



let list = document.querySelector('.list');
data.map((d, index) => {
    if (d !== null) {
        let container = createEl('div');
        container.className = "container";
        container.style.background =
            randColor[Math.ceil(Math.random() * randColor.length - 1)];
        let heading = createEl('h3');
        heading.innerHTML = d.name;
        let desc = createEl('p');
        desc.innerHTML = d.desc;
        let subdiv = createEl('div');
        let time = createEl('h4');
        time.innerHTML = `<i class="bi bi-alarm"></i>${d.time}`;
        let edtbtn = createEl('button')
        edtbtn.classList.add("editButton");
        edtbtn.onclick = () => editTodo(index);
        let edicon = createEl('i');
        edicon.classList.add('bi');
        edicon.classList.add("bi-pencil-square");
        edtbtn.appendChild(edicon);
        let delbtn = createEl("button");
        delbtn.classList.add("deleteButton");
        delbtn.onclick = () => deleteFromList(index)
        let delcon = createEl("i");
        delcon.classList.add("bi");
        delcon.classList.add("bi-check2-circle");
        delbtn.appendChild(delcon);
        subdiv.appendChild(time)
        subdiv.appendChild(edtbtn);
        subdiv.appendChild(delbtn);
        container.appendChild(heading);
        container.appendChild(desc);
        container.appendChild(subdiv);
        list.appendChild(container)
    }
})

function editTodo(index) {
    editTodoIndex = index;
    pptitle.innerHTML = "Edit ToDo";
    showpopup();
    listName.value = data[index].name;
    listTime.value = data[index].time;
    listDesc.value = data[index].desc;
}
crtbtn.addEventListener('click', () => {
    if (editTodoIndex == -1) {
        crtbtn.innerText = "Create"
        var todo = {
            name: listName.value,
            time: listTime.value,
            desc: listDesc.value,
        }
        data = [...data, todo];
    } else {
        crtbtn.innerText = "Edit";
        data[editTodoIndex].name = listName.value;
        data[editTodoIndex].time = listTime.value;
        data[editTodoIndex].desc = listDesc.value
        editTodoIndex = -1
    }
    console.log(crtbtn)
    addAndRefresh(data, "create");
});