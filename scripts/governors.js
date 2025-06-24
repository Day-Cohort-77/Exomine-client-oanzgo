import { setGovernor, getSelectedGovernor } from "./TransientState.js"


const chooseGovernor = (event) => {
    if (event.target.id === "govt"){
    const chosenGov = parseInt(event.target.value)
        setGovernor(chosenGov)
    }
}


export const governorsOptions = async () => {
    const response = await fetch("http://localhost:8088/governors")
    const governors = await response.json()
    const selectedGovernor = getSelectedGovernor()
    document.addEventListener("change", chooseGovernor)

    let governorOptionsHTML = "<h2>Governor Options</h2>"
    governorOptionsHTML += '<select id="govt">'
    governorOptionsHTML += '<option value="0">Select a Governor</option>'

    const govArray = governors.map(
        (governor) => {
            if (governor.is_active) {
                return `<option ${selectedGovernor !== 0 ? "selected" : ""} value ="${governor.id}">${governor.name}</option>`
            }
        }
    )
    governorOptionsHTML += govArray.join("")
    governorOptionsHTML += "</select>"

    return governorOptionsHTML
}