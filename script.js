const quoteContainer= document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText= document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader= document.getElementById('loader');

let apiQuotes = [];


function showLoadingSpinner() {
    loader.hidden= false;
    quoteContainer.hidden= true;
}

function removeLoadingSpinner() {
    if(!loader.hidden){
        quoteContainer.hidden= false;
        loader.hidden =true;
    }
}

//Show new Quote
function newQuote() {
    showLoadingSpinner();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
    authorText.textContent = quote.author;
    
}

//Check quote length to determine styling
if(quoteText.length > 50) {
    quoteText.classList.add('long-quote');
} else {
    quoteText.classList.remove('long-quote');
}
//Set Quote, Hide Loader
quoteText.textContent= quote.text;
removeLoadingSpinner();
}


//Get Quote from API
showLoadingSpinner();
async function getQuotes() {
   
    const apiUrl= 'https://type.fit/api/quotes';

    try {
        
        
        const response= await fetch( apiUrl);
        apiQuotes= await response.json();
        newQuote();
        

    } catch(error){
   
    }
        
        
    }

       // Tweet Quote
    function tweetQuote() {
        const quote= quoteText.innerText;
        const author = authorText.innerText;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author}`;

        window.open(twitterUrl, '_blank');

    }
    // Event Listeners
    newQuoteBtn.addEventListener('click', getQuotes);
    twitterBtn.addEventListener('click', tweetQuote);



//On Load
 getQuotes();
