const baseURL = "https://api.openweathermap.org/data/2.5/weather?"
const apiKEY = "bac3d81f894d260e1b3ce2ddfab67d33"
const urlSuffix = `&units=metric&APPID=${apiKEY}`

const getCords =()=> new Promise((res) =>
       navigator.geolocation.getCurrentPosition(pos => res(pos.coords))

)

const fetchWeather=(url)=>{
  const xhr = new XMLHttpRequest()
    xhr.open('GET',url)
    xhr.send()
    xhr.addEventListener('readystatechange',()=>{
      if (xhr.status===200){
        if (xhr.readyState===4){
          const res = JSON.parse(xhr.responseText)
          console.log(res)
          place.innerHTML=`${res.name}, ${res.sys.country}`
          temp.innerHTML=`${Math.round(res.main.temp)} °С`
          desc.innerHTML=res.weather[0].description
          fetchImage(`${res.weather[0].description} ${res.name}`)
          
        }
      }
    })
}

const fetchImage=(query)=>{
  const xhr = new XMLHttpRequest()
  xhr.open('GET',`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=xlH67DcN-27-QPfamY3R6W3aOYaEv7fz3kw4iGYHrSE`)
  xhr.send()
  xhr.addEventListener('readystatechange',()=>{
    if (xhr.status===200){
      if (xhr.readyState===4){
        const res = JSON.parse(xhr.responseText)
        console.log(res)
        document.body.style.backgroundImage=`url(${res.results[0].urls.regular})`
      }
    }
  })
}
getCords().then(res=>{
  const url = `${baseURL}lon=${res.longitude}&lat=${res.latitude}${urlSuffix}`
  fetchWeather(url)
})
btn.addEventListener('click', ()=>{
  const url = `${baseURL}q=${inp1.value}${urlSuffix}`
  fetchWeather(url)
})


// 
// https://api.openweathermap.org/data/2.5/weather?q=string/lat=number&lon=number&units=metric&APPID=
// navigator.geolocation.getCurrentPosition(pos => res(pos.coords))
// return new Promise((res) =>
//       navigator.geolocation.getCurrentPosition(pos => res(pos.coords))
//     )
// https://github.com/korovindn/putin-weather/blob/dev/src/App.js