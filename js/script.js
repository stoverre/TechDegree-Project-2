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
   let displayedList = [];
   
   //loop through the list of students. show students on the target
   //page and hide all others. 
   for(let i=0; i<studentList.length; i+=1){
      if(i>=startIndex && i<endIndex){
         studentList[i].style.display = '';
         //add each displayed student to the list to be returned later
         displayedList.push(studentList[i]);
      } else {
         studentList[i].style.display = 'none';
      }
   }
   return displayedList;
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
   //ad the newly created <ul> to the newly created <div>
   div.appendChild(newUl)
   //add the newly created <div> to the DOM as a child of the main <div>
   ul.parentNode.appendChild(div)

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
            showPage(studentList, pageNum)
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
   function doesItMatch(input, list){
      console.log(event.target)
      console.log(event.target.tagName)
      console.log(searchInput.value)
      console.log(list.length)
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
         doesItMatch(searchInput.value, list)
      }
   })
   //listen for a keyboard key release
   //then run the search
   div.addEventListener('keyup', (event) => {
      doesItMatch(searchInput.value, list)
   })
}

showPage(studentList, 1)
searchBar(studentList)
appendPageLinks(studentList)


// Remember to delete the comments that came with this file, and replace them with your own code comments.