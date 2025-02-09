/* Step 1: using axios, send a GET request to the following URL
           (replacing the placeholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR
   github info! You will need to understand the structure of this
   data in order to use it to build your component function

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function,
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either
          follow this link in your browser https://api.github.com/users/<Your github name>/followers
          , manually find some other users' github handles, or use the list found
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.

          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/
/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
const me = ['derrick-mei']
const professors = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];
const followersArray = ['harrisonbrock', 'amyshackles','danteocualesjr', 'justfavian', 'gaearon'];

const allUsernames = [...me, ...professors, ...followersArray]

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/

function createElementAndAppend(type, textContent, className, parent) {
    let element = document.createElement(type);
    element.textContent = textContent;
    element.className = className;
    if (parent) {
      parent.appendChild(element)
    }
    return element;
}

function cardCreator(obj) {
    const cardContainer = createElementAndAppend('div', undefined, 'card');

    const img = createElementAndAppend('img', undefined, undefined, cardContainer);
    img.src = obj.avatar_url;

    const cardInfo = createElementAndAppend('div', undefined, 'card-info', cardContainer);
    const h3 = createElementAndAppend('h3', obj.name, 'card', cardInfo);
    const username = createElementAndAppend('p', obj.login, 'username', cardInfo);
    const location = createElementAndAppend('p', `Location: ${obj.location}`, cardInfo);
    const profile = createElementAndAppend('p', 'Profile: ', undefined, cardInfo);

    const aTag = createElementAndAppend('a', obj.url, undefined, profile);
    aTag.href = obj.url;

    const followers = createElementAndAppend('p', `Followers: ${obj.followers}`, undefined, cardInfo)
    const following = createElementAndAppend('p', `Following: ${obj.following}`, undefined, cardInfo)
    const bio = createElementAndAppend('p', `Bio: ${obj.bio}`, undefined, cardInfo)

    return cardContainer;
}

const cardDiv = document.querySelector('.cards')
allUsernames.forEach(element => {
  axios
      .get(`https://api.github.com/users/${element}`)
      .then(response => {
        cardDiv.appendChild(cardCreator(response.data))
      })
      .catch(err => console.log(err));
})