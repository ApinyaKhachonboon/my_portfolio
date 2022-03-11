// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementsByClassName("myImg");
var modalImg = document.getElementById("img01");
let isClose = true;

var body = document.getElementsByTagName("BODY")[0];
body.setAttribute("onclick", "handleClick(event)");


for (var i=0;i<img.length; i++) {
    img[i].onclick  = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        let this_top = this.offsetTop - modal.offsetHeight / 3;
        if(this_top < 0)
        {
          this_top = 0;
        }
        modal.style.top =  this_top + "px";
      }
}


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
// span.onclick = function() { 
//   modal.style.display = "none";
// }

function handleClick(event){
  if(event.target != modalImg && modal.style.display == "block")
  {
    if(isClose)
    {
      isClose = false;
      return;
    }
    modal.style.display = "none";
    isClose = true;
  }
}