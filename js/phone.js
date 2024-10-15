


const FetchPhone = (phoneSearch, isshowAll)=> {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneSearch}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
    const phones = data.data
    DisplayPhones(phones, isshowAll)
    
     })
}

const innerTextValue = (innerIn, Value)=> {
    innerIn.innerText = Value
    return innerIn;
}

const innerHTMLValue = (innerOut, Value)=> {
    innerOut.innerHTML = Value
    return innerOut;
}
const SetElementById = (id)=> {
    return inputValue = document.getElementById(id)
}

const DisplayPhones = (phones, isshowAll )=> {
    // console.log(isshowAll);

    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ''
    // console.log(phones.length);

    // display show all button if there are more than one
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && isshowAll ) {
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    console.log("is show all container", isshowAll);
        // display only first 5 phones is not showall

    if(isshowAll){
        phones = phones.slice(0, 12);
    }
    
    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card hover:shadow-xl border`;
        phoneCard.innerHTML = `
            <figure class="px-10 pt-10">
                  <img
                    src=${phone.image}
                    alt="Shoes"
                    className="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                  <h2 class="card-title">${phone.phone_name}</h2>
                  <h2 class="flex gap-2"><strong>Brand:</strong> <p>${phone.brand}</p></h2>
                  <div className="card-actions">
                <button class="btn btn-primary" onclick="handleshowDetails('${phone.slug}')">Show Details</button>
                  </div>
             </div>
        `

        cardContainer.appendChild(phoneCard)
        loadingSpeaner(false);
    })

}

const phoneInput = SetElementById('phoneInput');
const searchBtn = SetElementById('search-btn');
searchBtn.addEventListener('click', handleSearch)

function handleSearch (isshowAll) {
    const searchQuery = phoneInput.value.trim();
    loadingSpeaner(true);
    FetchPhone(searchQuery, isshowAll);
}
// loading speener
const loadingSpeaner = (isLoading)=> {
    const loadingSpinner = SetElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleshowDetails = async(id)=> {

    if(!id){
        return alert('not show details')  // return early if modal is already open
    }
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url)
    const data = await res.json() 
    showphoneDetails(data.data);
}

const showphoneDetails = (phone)=>{
    // console.log(phone);
    const phoneName = SetElementById('phoneName')
    const releaseDate = SetElementById('releaseDate');
    const Storage = SetElementById('Storage');
    const dSize = SetElementById('dSize');
    const Memory = SetElementById('Memory');
    const Brand = SetElementById('Brand');
    const GPS = SetElementById('GPS');
    const showDetailFigure = document.getElementById('show-detail-figure')
    innerTextValue(phoneName, phone?.name)
    innerTextValue(releaseDate, phone?.releaseDate)
    innerTextValue(Storage, phone?.mainFeatures?.storage)
    innerTextValue(dSize, phone?.mainFeatures?.storage)
    innerTextValue(Memory, phone?.mainFeatures?.memory)
    innerTextValue(Brand, phone?.brand)
    innerTextValue(GPS, phone?.others?.GPS ? phone?.others?.GPS : "not available")
    innerTextValue(showDetailFigure)
    showDetailFigure.innerHTML = `

                <figure class=" bg-base-200 rounded-xl p-20 border" >
                  <img
                  
                    src=${phone.image}
                    alt=${phone.name}
                    title=${phone.name}
                    class="rounded-md " />
                </figure>
    `
    phonedetails.showModal()


}




// handle show all

const handleShowAll = ()=> {
    handleSearch(false)
}

FetchPhone();




