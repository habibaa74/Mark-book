// all input
var siteNameInput = document.getElementById("sitename");
var siteUrlInput = document.getElementById("siteurl")


// check data
var sitearray=[];

if(localStorage.getItem("site")==null){
    sitearray = [];
}
else{
sitearray=JSON.parse(localStorage.getItem("site"))
dispaly()
}
// dispaly 
function dispaly(){
    var cartona="";
    for(var i=0;i<sitearray.length;i++){
        cartona +=`
          <div class="row bg-light py-2 text-center fw-bold align-items-center justify-content-center my-1">
            <div class="col-3">
           <p>${i+1}</p>
            </div>
            <div class="col-3">${sitearray[i].name}</div>
            <div class="col-3">
            <button class="btn btn-success"<a onclick="window.open('${sitearray[i].url}', '_blank');"></a><i class="fa-regular fa-eye me-2"></i>Visit</button>
            </div>
            <div class="col-3">
                <button onclick="deletesite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can me-2"></i>Delete</button>
            </div>
        </div>
         `
    }
    document.getElementById("sitedata").innerHTML=cartona;
}
// add data
function addSite(){
   if(siteNameInput.classList.contains("is-valid")&&
   siteUrlInput.classList.contains("is-valid")){
    var site ={
        name: siteNameInput.value,
        url: siteUrlInput.value,
    };
    sitearray.push(site)
    localStorage.setItem("site",JSON.stringify(sitearray))
    dispaly();
    clear();
}
else{
    Swal.fire({
        icon: "error",
        title: "Please follow the rules",
        text:`Site name must contain at least 3 characters and Site URL must be a valid one`,
      });
} 
}
// clear data
function clear(){
    siteNameInput.value=null;
    siteUrlInput.value=null;
}
// delete
function deletesite(index){
    sitearray.splice(index,1);
    localStorage.setItem("site",JSON.stringify(sitearray))
    dispaly()    
}

// regex
function validateinputs(element){
   var regex={
    sitename:/^[a-z]{3,}$/i,
    siteurl:/^https?:\/\/\w{3,}.com$/gm
   }
   if(regex[element.id].test(element.value)==true){
    element.classList.add("is-valid")
    element.classList.remove("is-invalid")
    element.nextElementSibling.classList.add("d-none")
   }
   else{
    element.classList.add("is-invalid")
    element.classList.remove("is-valid")
    element.nextElementSibling.classList.remove("d-none")
   }
}

