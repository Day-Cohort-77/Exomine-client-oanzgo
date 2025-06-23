import { governorsOptions } from "./governors.js";
import { facilityOptions, chooseMineral } from "./miningFacility.js";
import { OrderButton } from "./orderButton.js";

const container = document.querySelector("#container");//We declare a new variable and give its value the container id within our index.HTML


const render = async () => {//declared a variable render, gave it the value of an async function
    const governorHTML = await governorsOptions()//we create a new variable that invokes our governorsOptions function, but by using AWAIT, will only give the return of that function once our promises are cleared.
    const facilityHTML = await facilityOptions()
    const buttonHTML =  OrderButton()
    const mineralHTML = await chooseMineral()
  const composedHTML = //new variable that holds our HTML. we use this to build the framework of our basic html and make section tags to be able to add in our variables that invoke our option functions to insert our innerHTML.
  ` 
        <h1>The GMA</h1>


        <article id="flex">
            <section class="governors">
                <h2>Governors</h2>
                ${governorHTML}
            </section>


            <section>
                <h2>Mining Facilities</h2>
             ${facilityHTML}
             ${mineralHTML}
            </section>


            <section>               
            <h2></h2>
                ${buttonHTML}
            </section>


            <section>
                <h2></h2>
               
            </section>
        </article>


        <article>
            
        </article>


        <article>
            <h2></h2>
        </article>
    `;


  container.innerHTML = composedHTML;//we are selecting our previously defined variable container and selecting ONLY its innerHTML attribute. we then set that attribute's value to our html string
};

document.addEventListener("stateChanged", render)//we add an event listener to listen for our stateChanged custom event, and on that change of state, update our render function.

render()