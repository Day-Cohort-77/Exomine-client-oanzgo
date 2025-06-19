import { governorsOptions } from "./governors.js";


const container = document.querySelector("#container");


const render = async () => {
    const govenorHTML = await governorsOptions()
 


  const composedHTML = `
        <h1>The GMA</h1>


        <article id="flex">
            <section class="govenors">
                <h2>Govenors</h2>
                ${govenorHTML}
            </section>


            <section>
                <h2></h2>
             
            </section>


            <section>               
            <h2></h2>
                
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

render()