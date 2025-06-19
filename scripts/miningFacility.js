
const mineralRadioOption = async (event) =>{
    const mineralResponse = await fetch("http://localhost:8088/minerals")
    const facilityMineralResponse = await fetch("http://localhost:8088/facility_minerals")
    const minerals = await mineralResponse.json()
    const facilityInventory = await facilityMineralResponse.json()

    let mineralHTML = ""

    const facilityArray = facilityInventory.map(
        (inventory) => {            
            {const mineralArray = minerals.map(
        (mineral) => {
            if (inventory.facility_id === event.target.value) {
                if (inventory.mineral_id === mineral.id){
                    if(event.target.name === "minerals"){
                mineralHTML += `<input type='radio' name='minerals'/>${mineral.quantity} tons of ${mineral.name}`
                    }
                }
            }
        }
    )
     mineralHTML += mineralArray.join("")      
            }
        }
    )
    mineralHTML += facilityArray.join("")
    return mineralHTML
}





export const facilityOptions = async () => {
    const response = await fetch("http://localhost:8088/mining_facilities")
    const facilities = await response.json()

    document.addEventListener("change", mineralRadioOption)

    let facilityOptionsHTML = "<h2>Facility Options</h2>"
    facilityOptionsHTML += '<select id="facility">'
    facilityOptionsHTML += '<option value="0">Select a Facility</option>'

    const facilityArray = facilities.map(
        (facility) => {
            if (facility.status === "active") {
                return `<option value ="${facility.id}">${facility.name}</option>`
            }
        }
    )
    facilityOptionsHTML += facilityArray.join("")
    facilityOptionsHTML += "</select>"

    return facilityOptionsHTML
}
