    var header = document.querySelector('header');
    var section = document.querySelector('section');
  
    var requestURL = 'https://bellerophons-pegasus.github.io/lobib/test.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    
    request.onload = function() {
      var glypticLiterature = request.response;
      showLiterature(glypticLiterature);
    }

function showLiterature(jsonObj) {
  var litlist = jsonObj['literature'];
      
  for (var i = 0; i < litlist.length; i++) {
    var bibReference = document.createElement('div');
    bibReference.className = "referenceEntry";
    var myH2 = document.createElement('h2');
    var myPara1 = document.createElement('p');
    var myPara2 = document.createElement('p');
    var myList = document.createElement('ul');

    myH2.textContent = litlist[i].date;
    myPara1.textContent = 'Title: ' + litlist[i].workLabel;
    myPara2.textContent = 'topics: ' + litlist[i].topics;
        
/*    var superPowers = litlist[i].powers;
    for (var j = 0; j < superPowers.length; j++) {
      var listItem = document.createElement('li');
      listItem.textContent = superPowers[j];
      myList.appendChild(listItem);
    }
*/

    bibReference.appendChild(myH2);
    bibReference.appendChild(myPara1);
    bibReference.appendChild(myPara2);
    bibReference.appendChild(myList);

    section.appendChild(bibReference);
  }
}

function searchAllFun() {
  // Declare variables
  var input, filter, searchArea, ref, a, i, txtValue;
  input = document.getElementById('searchAllSlot');
  filter = input.value.toUpperCase();
  searchArea = querySelector('section');
  ref = searchArea.getElementsByClassName("referenceEntry");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < ref.length; i++) {
    a = ref[i].getElementsByTagName("p")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      ref[i].style.display = "";
    } else {
      ref[i].style.display = "none";
    }
  }
}
