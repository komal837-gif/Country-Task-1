
const cl =console.log;

const params = new URLSearchParams(window.location.search)

const CODE = params.get("code").replace(/"/g,"").trim();

const API_URL = `https://restcountries.com/v3.1/alpha/${CODE}`;


function snackBar(title,icon){
    Swal.fire({
        title,
        icon,
        timer:3000
    })
}

function toggleSpinner(flag){
   if(flag){
     loader.classList.remove("d-none")
   }else{
    loader.classList.add("d-none")
   }
}


const patchData=(data)=>{

    document.getElementById("flagImg").src = data[0].flags.png
    document.getElementById("flagImg").alt = data[0].flags.alt
    document.getElementById("OfficialName").innerText = data[0].name.common
    document.getElementById("Capital").innerText = data[0].capital?.[0] || "N/A"
    document.getElementById("Region").innerText = data[0].region
    document.getElementById("subRegion").innerText = data[0].subregion
    document.getElementById("Population").innerText = data[0].population
    document.getElementById("Area").innerText = data[0].area
    document.getElementById("Maps").href = data[0].maps.googleMaps
    document.getElementById("Maps").innerText= "Open in Map"
    document.getElementById("Languages").innerText = Object.values(data[0].languages || {}.join(","))
    document.getElementById("Currencies").innerText = Object.values(data[0].currencies || {}).map(cur=> 
        `${cur.name} (${cur.symbol})`).join(", ")

    
   
        if(data[0].borders){
        document.getElementById("Borders").innerHTML = data[0].borders.map(c=>{
            return `<a href="country.html?code=${c}" class="btn btn-link">${c}</a>`
        }).join(" ");
    }else{
        document.getElementById("Borders").innerHTML = `<strong class="text-info">No Borders!!!</strong>`;
    }
}

async function loadCountry(){

    toggleSpinner(true)
     try{
        let res = await fetch(API_URL,{
        method:"GET",
        body:null,
        headers:{
            auth:"Token from LS",
            "content-type":"application/json"
        }
    })

    let data = await res.json();
     cl(data)

    if(!res.ok){
        throw new Error(data.message);
    }

    patchData(data);

    }
    catch(err){
        snackBar(err,"error")
    }
    finally{
        toggleSpinner(false)
    }
}

loadCountry()