const cl =  console.log;

const countryContainer = document.getElementById("countryContainer")

const BASE_URL = `https://restcountries.com/v3.1/all`;

const COUNTRY_URL = `${BASE_URL}/?fields=name,cca2,flags,region`;



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

async function fetchAllCountries(){
    toggleSpinner(true)
   try{
     let res = await fetch(COUNTRY_URL,{
        method:"GET",
        body:null,
        headers:{
            "content-type":"application/json"
        }
    })
    let data = await res.json()
    cl(data)
    if(!res.ok){
        throw new Error(data.message || data.error)
    }
    
    data.map(c=>{
        let col = document.createElement("div")
            col.className = `col-lg-4 col-md-3 col-sm-2 col-12 mt-3 `;
            col.innerHTML = `<div class="card" data-id="${c.cca2}" role="button">
                            <img src="${c.flags.png}" alt="${c.flags.alt}" title="${c.flags.alt}"></img>
                        </div>
                        <div class="card-body display-flex justify-content-end align-items-center">
                            <h5>${c.name.common || c.name.official}</h5>
                            <p><small>code: <span class="fw-bold">${c.cca2}</span></p>
                        </div>`

        
            col.addEventListener("click",()=>{
                 window.location.href = `country.html?code=${c.cca2}`
            })
        countryContainer.append(col)
      })

     
    }
   catch(err){
        snackBar(err,"error")
   }
   finally{
    toggleSpinner(false)
   }

}

fetchAllCountries()