/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
Richard Stover
4/17/2020
******************************************/
   

let studentList = document.querySelector('ul').children;
let showPerPage = 10;


/**
 * @function showPage - takes in a list of students and a page # and hides 
 *                      all students except for that page
 * 
 * @param {array} list - list of students
 * @param {integer} page - the page to display
 * @return {array} - return a list of the displayed students. This should help 
 *                   with the extra credit
 */
function showPage(list, page){
   //start and end indexes of the page to be display
   //allows the function to be flexible for all list
   //lengths, page sizes, and page to be displayed
   let startIndex = (page*showPerPage)-showPerPage;
   let endIndex = page*showPerPage;
   
   //if this is an appended list of the original list (ie: a searched list)
   //hide the entire original list so the next loop can show only results of 
   //the passed in list
   if(list.length<studentList.length){
      for(let i=0; i<studentList.length; i+=1){
         studentList[i].style.display = 'none'
      }      
   }
   //loop through the passed in list of students. show students on the target
   //page and hide all others. 
   for(let i=0; i<list.length; i+=1){
      
      if(i>=startIndex && i<endIndex){
         list[i].style.display = '';
      } else{
         list[i].style.display = 'none';
      }
   }
}

/**
 * @function createPageLinks - Creates a <div> and appends an <li> with an embedded
 *                             <a> for each display page. Then updates the DOM with 
 *                             the new <div>
 * 
 * @param {array} list - list of students
 */

function appendPageLinks(list){
   //get a reference to the master html list
   let ul = document.querySelector('ul')
   //create the <div> to be added to the DOM.
   let div = document.createElement('div')
   div.className = 'pagination'
   //determine how many total pages are necessary
   let pageCount = Math.floor(list.length/showPerPage)+1
   let newUl = document.createElement('ul')

   //loop through the passed in list and create an <li>. with an embedded <a>
   //for each page
   for(let i=0; i<pageCount; i+=1){
      let a = document.createElement('a')
      let li = document.createElement('li')
      a.textContent = [i+1]
      a.href = '#'
      //set the first page as the active one
      if(i===0){
         a.className = 'active'
      }
      li.appendChild(a)
      newUl.appendChild(li)
   }
   //check if there is already a <div> for page links and replace it
   
   //ad the newly created <ul> to the newly created <div>
   div.appendChild(newUl)
   //add the newly created <div> to the DOM as a child of the main <div>
   //or replace it if a page links <div> already exists
   if(ul.parentNode.lastElementChild.className === 'pagination'){
      ul.parentNode.replaceChild(div,ul.parentNode.lastElementChild)
   }else{
      ul.parentNode.appendChild(div)
   }


   //add an event listener to the new <div>
   div.lastElementChild.addEventListener('click', (event) => {
   //make sure we clicked on a page <a>
   if(event.target.tagName === 'A'){
      let pageNum = parseInt(event.target.textContent)
      //loop through all the page <li>s 
      for(let i=0; i<newUl.children.length; i+=1){
         if(i===pageNum-1){
            //set the class = "active" for the clicked page <a>
            newUl.children[i].firstElementChild.className = 'active';
            showPage(list, pageNum)
         }else{
            //set the class = "" for all other page <a>
            newUl.children[i].firstElementChild.className = '';
         }
      }
   }
})
}

/**
 * @function searchBar - create a search bar 
 * 
 * @param {} none
 * @return {} - none
 */
function searchBar(list){
   //get a reference to the master page header <div>
   let headerDiv = document.querySelector('.page-header')
   //create the new <div> to contain the <input> and <button>
   let div = document.createElement('div')
   div.className = 'student-search'
   //create the input to be added to the <div>
   let searchInput = document.createElement('input')
   searchInput.placeholder = 'Search for students...'
   
   //create the search button
   let searchButton = document.createElement('button')
   searchButton.textContent = 'Search'

   let ul = document.querySelector('ul')

   //search bar functionality
   /**
    * if search bar button is clicked
    *    store the input into a variable
    * endif
    * loop through all the students (not just the page)
    *    if the name contains the input
    *       string.includes(searchValue, start), return boolean
    *       display = ''
    *    else
    *       display = 'none'
    *    endif
    * endloop
    */
   function doesNameMatch(input){
      let searchResults = [];

      //loop through all the students
      for(let i=0; i<list.length; i+=1){
         //pull the student name from the li element
         let h3Name = list[i].querySelector('h3')
         let name = h3Name.textContent
         //if any part of the name includes the input text
         if(name.includes(input)){
            //show that student
            list[i].style.display = '';
            searchResults.push(list[i]);
         } else{
            //hide the rest
            list[i].style.display = 'none';
         }
      }

      function createErrorMessage(reason){
         let li = document.createElement('li')
         li.className = "student-item"
         let div = document.createElement('div')
         div.className = "student-details"
         let h3 = document.createElement('h3')
         h3.textContent = [reason]
         
         

         div.appendChild(h3)
         li.appendChild(div)
         ul.appendChild(li)


         return li
      }

      
      function validInput(){
         let isNotValid = false;
         let invalidChars = [0,1,2,3,4,5,6,7,8,9,"/","*","-","+",".","?","<",">",
                              "`","~","!","@","#","$","%","^","&",","," "]
         for(let i=0; i<input.length; i+=1){
            console.log(input.charAt(i))
            for(let j=0; j<invalidChars.length; j+=1){
               if(input.charAt(i) === invalidChars[j].toString()){
                  isNotValid = true;
               }
            }
         }
         console.log(isNotValid)
         return isNotValid   
      }

      //if the input is valid and/or there are no results from the search show a message
      //otherwise run the display logic
      if (validInput()){
         searchResults.push(createErrorMessage('The Input May Only Contain Letters'))
         showPage(searchResults, 1)
         appendPageLinks(searchResults)
      }else if(searchResults.length === 0){
         searchResults.push(createErrorMessage('No Results Found'))
         showPage(searchResults, 1)
         appendPageLinks(searchResults)
      }else {
         showPage(searchResults, 1)
         appendPageLinks(searchResults)
      }
      
   }

   //add the <input> and <button> to the <div>
   div.appendChild(searchInput)
   div.appendChild(searchButton)
   //add the <div> to the header <div>
   headerDiv.appendChild(div)
   
   //listen for a mouse click on the search <button>
   //then run the search
   div.addEventListener('click', (event) => {
      if(event.target.tagName === 'BUTTON'){
         doesNameMatch(searchInput.value)
      }
   })
   //listen for a keyboard key release
   //then run the search
   div.addEventListener('keyup', (event) => {
      //if an error message exists as the last student, remove it from the DOM
      if (ul.lastElementChild.querySelector('h3').textContent === "No Results Found"){
         ul.removeChild(ul.lastElementChild)
      }
      doesNameMatch(searchInput.value)
   })
}

showPage(studentList, 1)
searchBar(studentList)
appendPageLinks(studentList)


// Remember to delete the comments that came with this file, and replace them with your own code comments.