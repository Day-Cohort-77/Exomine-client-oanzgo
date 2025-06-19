
export const governorsOptions = async () => {
    const response = await fetch("http://localhost:8088/governors")
    const governors = await response.json()



    let governorOptionsHTML = "<h2>Governor Options</h2>"
    governorOptionsHTML += '<select id="govt">'
    governorOptionsHTML += '<option value="0">Select a Governor</option>'

    const govArray = governors.map(
        (governor) => {
            if (governor.status === "active") {
                return `<option value ="${governor.id}">${governor.name}</option>`
            }
        }
    )
    governorOptionsHTML += govArray.join("")
    governorOptionsHTML += "</select>"

    return governorOptionsHTML
}