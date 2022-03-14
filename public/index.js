
const titleEl = document.getElementById('title');
const bodyEl = document.getElementById('body1');
const outputEl = document.getElementById('output');
const myget = () => {
    fetch('/api/note', { method: 'GET' }).then((res) => res.json()).then((getdata) => {
        console.log('get data', typeof (getdata))
        getdata.forEach(element => {
            creatHTML(element)

        });
    })
}
myget();

const creatHTML = (data) => {
    const cardEL = document.createElement('div');
    cardEL.classList.add('card', 'border', 'border-success', 'p-5');
    const h3 = document.createElement('h5');
    h3.innerHTML = ` <b> ${data.userHeader} <b> <hr> ${data.userBody} <br>     <i class="fa fa-trash" onClick='deletee(${data.id})'></i>
    
 `;

    cardEL.appendChild(h3);
    outputEl.appendChild(cardEL);


};




const PostData = (data) => {
    fetch('/api/note', {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((result) => {
           creatHTML(result);
           alert('your note has been added')
        })

}
function Save() {
    const user = {
        userHeader: titleEl.value.trim(),
        userBody: bodyEl.value.trim()

    }
    PostData(user);
}
function addNew() {
    titleEl.value = '';
    bodyEl.value = '';
}
function deletee(id){
    fetch(`/api/note/${id}`,{method:'DELETE'}).then((res)=>res.json()).then((result)=> location.reload(),confirm('Are you sure you want to delete this note?'))
};

