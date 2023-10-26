"use strict";
console.log('AJAX EXERCISE')
const $showsList = $("#shows-list"); //grabbing the second div
const $episodesArea = $("#episodes-area"); //grabbing the section
const $searchForm = $("#search-form"); //grabbing the form
const form = document.querySelector('#search-form')
const input = document.querySelector('#search-query')
const MISSING_IMAGE_URL = "http://tinyurl.com/missing-tv";
const imageContainer = document.querySelector('#shows-list');




/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */



//after line 39 gets the data, this function turns the data we need into an object we can use.





//mine
// async function getShowsByTerm(val) {
//   // ADD: Remove placeholder & make request to TVMaze search shows API.
//   const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${val}`);
//   console.log(res.data);  //this gives me an array of two objects
//   if(res){ //if we get a result
//     const data = res.data; //set data to the array of two objects.
//     getData(data);  //call the function below to pass the array of two objects
//     }
// }



// function getData(data){
    //     data.forEach(element => {  //for each data element create a new object called shows
    //         // console.log(element)
    //         // console.log(element.show.id, element.show.name, element.show.summary, element.show.image);
    //         let shows = { //each new object gives me the 4 keys and values.
    //             id: element.show.id,
    //             name: element.show.name,
    //             summary: element.show.summary,
    //             image: element.show.image
    //         };
    //         console.log(shows);
    //         return shows;
    //     });   
    // }



    // function populateShows(shows){
    //     shows.forEach(show => {
    //         if(show.image && show.image.medium){
    //             const imageElement = document.createElement('img');
    //             imageElement.src = show.image.medium;
    //             imageContainer.appendChild(imageElement)
    //         }
    //     })
    // }



  //   form.addEventListener('submit', function(e){
  //     e.preventDefault();
  //     getShowsByTerm(input.value);
  // })

    
async function searchShows(query) {
    let response = await axios.get(
      `http://api.tvmaze.com/search/shows?q=${query}`);
  
    let shows = response.data.map(result => {
      let show = result.show;
      return {
        id: show.id,
        name: show.name,
        summary: show.summary,
        image: show.image ? show.image.medium : MISSING_IMAGE_URL,
      };
    });
  
    return shows;
  }

  
function populateShows(shows) {
    const $showsList = $("#shows-list");
    $showsList.empty();
  
    for (let show of shows) {
      let $item = $(
        `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
           <div class="card" data-show-id="${show.id}">
             <img class="card-img-top" src="${show.image}">
             <div class="card-body">
               <h5 class="card-title">${show.name}</h5>
               <p class="card-text">${show.summary}</p>
               <button class="btn btn-primary get-episodes">Episodes</button>
             </div>
           </div>  
         </div>
        `);
  
      $showsList.append($item);
    }
  }


  $("#search-form").on("submit", async function handleSearch (evt) {
    evt.preventDefault();
  
    let query = $("#search-query").val();
    if (!query) return;
  
    $("#episodes-area").hide();
  
    let shows = await searchShows(query);
  
    populateShows(shows);
  });
  
  
  /** Given a show ID, return list of episodes:
   *      { id, name, season, number }
   */
  
  async function getEpisodes(id) {
    let response = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  
    let episodes = response.data.map(episode => ({
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number,
    }));
  
    return episodes;
  }
  
  
  /** Populate episodes list:
   *     - given list of episodes, add espiodes to DOM
   */
  
  function populateEpisodes(episodes) {
    const $episodesList = $("#episodes-list");
    $episodesList.empty();
      
    for (let episode of episodes) {
      let $item = $(
        `<li>
           ${episode.name}
           (season ${episode.season}, episode ${episode.number})
         </li>
        `);
  
      $episodesList.append($item);
    }
  
    $("#episodes-area").show();
  }
  
  
  /** Handle click on show name. */
  
  $("#shows-list").on("click", ".get-episodes", async function handleEpisodeClick(evt) {
    let showId = $(evt.target).closest(".Show").data("show-id");
    let episodes = await getEpisodes(showId);
    populateEpisodes(episodes);
  });








/** Given list of shows, create markup for each and to DOM */





// function populateShows(shows) {
//     $showsList.empty();
  
//     for (let show of shows) {
//       const $show = $(
//           `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
//            <div class="media">
//              <img 
//                 src="http://static.tvmaze.com/uploads/images/medium_portrait/160/401704.jpg" 
//                 alt="Bletchly Circle San Francisco" 
//                 class="w-25 mr-3">
//              <div class="media-body">
//                <h5 class="text-primary">${show.name}</h5>
//                <div><small>${show.summary}</small></div>
//                <button class="btn btn-outline-light btn-sm Show-getEpisodes">
//                  Episodes
//                </button>
//              </div>
//            </div>  
//          </div>
//         `);
  
//       $showsList.append($show);  }
//   }



/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

// async function searchForShowAndDisplay() {
//   const term = $("#searchForm-term").val();
//   const shows = await getShowsByTerm(term);

//   $episodesArea.hide();
//   populateShows(shows);
// }

// $searchForm.on("submit", async function (evt) {
//   evt.preventDefault();
//   await searchForShowAndDisplay();
// });


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }













// return [
    //     {
    //       id: 1767,
    //       name: "The Bletchley Circle",
    //       summary:
    //         `<p><b>The Bletchley Circle</b> follows the journey of four ordinary 
    //            women with extraordinary skills that helped to end World War II.</p>
    //          <p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their 
    //            normal lives, modestly setting aside the part they played in 
    //            producing crucial intelligence, which helped the Allies to victory 
    //            and shortened the war. When Susan discovers a hidden code behind an
    //            unsolved murder she is met by skepticism from the police. She 
    //            quickly realises she can only begin to crack the murders and bring
    //            the culprit to justice with her former friends.</p>`,
    //       image:
    //           "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
    //     }
    //   ]