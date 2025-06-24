const state = {               // initializing and defining varible state 
                                    //along with its specific properties. 
                                    //Of which are intergers.  
selectedGovernor: 0,
selectedFacility: 0,
selectedMineral: 0
}
export const setGovernor = (governorId) => {
    //initializing and export our setGovernor Function, with governorId as it argument.
    state.selectedGovernor = governorId
    //updating the object property selected governor with governorId. 
    document.dispatchEvent(new CustomEvent("stateChanged"))
    // we dispatch a custom event resulting in a change in state.
}

export const setFacility = (facilityId) => {
    state.selectedFacility = facilityId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setMineral = (mineralId) => {
    state.selectedMineral = mineralId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getSelectedFacility = () =>{
    return state.selectedFacility
}
// GETTER FUNCTION! we are initializing the getSelectedFacility
//  function to return the current value of selectedFacility 

export const getSelectedGovernor = () => {
    return state.selectedGovernor}

export const purchaseMineral = async () => {
    // we a initializing the asyncronus function purchaseMineral.
    
    const orderOptions = {
       method: "POST",
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify(state)
   }
   //  initializing OrderOptions and defining our parameters for our POST Request
    const response = await fetch("http://localhost:8088/colonyMinerals", orderOptions)
    
    // Defining our post Request with the variable response. Running the function orderOptions with our post request.  
    
    
    
    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */



    document.dispatchEvent(new CustomEvent("stateChanged"))
}
