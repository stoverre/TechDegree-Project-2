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
 *                      all students on the list except for that page
 * 
 * @param {array} list - list of students
 * @param {integer} page - the page to display
 */
function showPage(list, page){
   //start and end list indexes of the page to be displayed
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
   //loop through the passed in list of students. show only students on the target
   //page.
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
 * @param {array} list - list of students
 */

function appendPageLinks(list){
   //get a reference to the master html list
   let ul = document.querySelector('ul')
   
   //create the <div> and new child <ul> to be added to the DOM.
   let div = document.createElement('div')
   div.className = 'pagination'
   let newUl = document.createElement('ul')
   
   //determine how many total pages are necessary
   let pageCount = Math.floor(list.length/showPerPage)+1

   //create an <li>. with an embedded <a> for each page
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
   
   //add the newly assembled <ul> to the newly created <div>
   div.appendChild(newUl)

   //add the newly created <div> to the DOM as the last child of the main <div>
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
         //get the page number that was clicked into integer form and show that page
         let pageNum = parseInt(event.target.textContent)
         showPage(list, pageNum)
         //loop through all the page <li>s and set to inactive 
         for(let i=0; i<newUl.children.length; i+=1){
            newUl.children[i].firstElementChild.className = '';
         }   
         //set pageNum page <a> to active
         newUl.children[pageNum-1].firstElementChild.className = 'active'
      }
   })
}

/**
 * @function searchBar - 1. create a search bar and button. 
 *                       2. check validity of the input validateInput()
 *                       3. check if input matches anyone in the list doesNameMatch()
 *                       4. create error or no result message createErrorMessage()
 * @param {array} list - gets passed the studentList in to compare the searchBar
 *                       logic against
 * @return {} - none
 */
function searchBar(list){
   //get a reference to the master page header <div> and assign the sibling ul
   let headerDiv = document.querySelector('.page-header')
   let ul = headerDiv.nextElementSibling

   //create the new <div> to contain the <input> and <button>
   let div = document.createElement('div')
   div.className = 'student-search'
   //create the input to be added to the <div>
   let searchInput = document.createElement('input')
   searchInput.placeholder = 'Search for students...'   
   //create the search button to be added to the <div>
   let searchButton = document.createElement('button')
   searchButton.textContent = 'Search'
   
   //flag to keep track if an error message has been displayed
   let messageAdded = false;
   //initialize the searchResults array of <li>s
   let searchResults = [];

    //nest the new button, input, and div into the header
    div.appendChild(searchInput)
    /**
     * The button was intentionally removed once the live search function was
     * implemented. But all the correct logic remains in the code.
     */
    //div.appendChild(searchButton)
    headerDiv.appendChild(div)

   /**
    * @function prepareToValidate - DRY function to handle some conditional house 
    *                               cleaning when the 2nd-nth search events occur
    * @param {} - none
    * @return {} - none
    */
   function prepareToValidate(){
      //if a no result or error message had been displayed (messageAdded)
       //remove the last list item from the DOM
       if (messageAdded){
          ul.removeChild(ul.lastElementChild)
          messageAdded = false;
       }
       searchResults = []
       validateInput(searchInput.value)
    }

   /**
    * @function validateInput - determines if the search input contains any invalid 
    *                           characters. If input is valid then check against
    *                           the list
    * @param {} - none //note: uses the parent doesNameMatch() list argument
    * @return {boolean} isNotValid- returns true if the input contains an invalid 
    *                     character as defined in invalidChar[]
    */
   function validateInput(input){
      //initialize the flag and compare each input char to the invalid chars
      let inputIsValid = true;
      let invalidChars = [0,1,2,3,4,5,6,7,8,9,"/","*","-","+",".","?","<",">",
                           "`","~","!","@","#","$","%","^","&",","," "]
      for(let i=0; i<input.length; i+=1){
         for(let j=0; j<invalidChars.length; j+=1){
            if(input.charAt(i) === invalidChars[j].toString()){
               inputIsValid = false;
            }
         }
      }
      //if the flag was set false, the input is not valid and we need to display a 
      //message. Else check the input against the list
      if (!inputIsValid){
         searchResults.push(createErrorMessage('The Input May Only Contain Letters'))
         showPage(searchResults, 1)
         appendPageLinks(searchResults)
      }else {
         doesNameMatch(input)
      }
   }

   /**
    * @function doesNameMatch - compares a passed in string and compares it to the
    *                           entire list of students. Update the searchResult list
    *                           with any students that match the input. Create a
    *                           message if no results are found
    * @param {string} input - a passed in string to search for
    * @return {} - none
    */
   function doesNameMatch(input){

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

      //if the search finds no matches, create a no result message
      if(searchResults.length === 0){
         searchResults.push(createErrorMessage('No Results Found'))
      }

      //update the page with the search results
      showPage(searchResults, 1)
      appendPageLinks(searchResults)
   }

   /**
    * @function createErrorMessage - creates a new <li> to add to the DOM. This <li>
    *                                will display a message instead of a student and
    *                                is of the same format as a student <li>
    * @param {string} reason - gets passed a reason for the message to be created.
    * @return {object} li - returns the newly created <li>
    */
   function createErrorMessage(reason){
      //create the new parent <li> and child elements
      let li = document.createElement('li')
      li.className = "student-item cf"
      li.style.borderBottom = '1px solid #eaeaea'
      li.style.padding = '0 0 38px 0'
      let div = document.createElement('div')
      div.className = "student-details"
      let h3 = document.createElement('h3')
      h3.textContent = [reason]
      
      //nest the new <h3>, <div>, and <li>
      div.appendChild(h3)
      li.appendChild(div)
      ul.appendChild(li)
      messageAdded = true;

      return li
   }

   //listen for a mouse click on the search <button> and prepare to validate 
   div.addEventListener('click', (event) => {
      if(event.target.tagName === 'BUTTON'){
         prepareToValidate()
      }
   })

   //listen for a keyboard key release and prepare to validate
   div.addEventListener('keyup', () => {prepareToValidate()})

}

showPage(studentList, 1)
searchBar(studentList)
appendPageLinks(studentList)
