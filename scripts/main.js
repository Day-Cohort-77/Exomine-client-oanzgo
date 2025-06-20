import { governorsOptions } from "./governors.js";
import { facilityOptions } from "./miningFacility.js";
import { OrderButton } from "./orderButton.js";

const container = document.querySelector("#container");


const render = async () => {
    const governorHTML = await governorsOptions()
    const facilityHTML = await facilityOptions()
    const buttonHTML = await OrderButton()

  const composedHTML = `
        <h1>The GMA</h1>


        <article id="flex">
            <section class="governors">
                <h2>Governors</h2>
                ${governorHTML}
            </section>


            <section>
                <h2>Mining Facilities</h2>
             ${facilityHTML}
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


  container.innerHTML = composedHTML;
};

document.addEventListener("stateChanged", render)

render()