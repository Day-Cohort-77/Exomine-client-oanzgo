import { purchaseMineral } from "./TransientState.js";


const handleOrderSubmission = (clickEvent) => {
   if (clickEvent.target.id === "submission-button") {
       console.log("Button clicked!")
       purchaseMineral();
   }
}


export const OrderButton = () => {
   document.addEventListener("click", handleOrderSubmission)
   return `<button id='submission-button'>Create Order</button>`
}
