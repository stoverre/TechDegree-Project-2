/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

let studentList = document.querySelector('ul').children;
let showPerPage = 10;

let pg1Test = [];
for(let index=0; index<10; index+=1){
   pg1Test.push(studentList[index]);
}

let pg2Test = [];
for(let index=10; index<20; index+=1){
   pg2Test.push(studentList[index]);
}

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

/**
 * @function showPage takes in a list of students and a page # and hides all students
 * except for that list
 * 
 * @param {array} list - list of students
 * @param {integer} page - the page to display
 * @return {array} - return a list of the displayed students
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


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/





// Remember to delete the comments that came with this file, and replace them with your own code comments.