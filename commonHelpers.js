import{S as b,i as L}from"./assets/vendor-46aac873.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const r={form:document.querySelector(".form"),input:document.querySelector(".input"),gallery:document.querySelector(".gallery"),button:document.querySelector(".button"),loader:document.querySelector(".loader")};async function p(s,a){const i="https://pixabay.com/api/",l="41991385-9b19b8bb3d6f1491499417d17";return(await axios.get(i,{params:{key:l,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:a}})).data}function y(s){return s.map(({webformatURL:a,largeImageURL:i,tags:l,likes:e,views:o,comments:c,downloads:m})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${i}">
            <img
              class="gallery-image"
              src="${a}"
              alt="${l}"
            />
            <ul class="gallery-info">
              <li class="gallery-info-item">Likes: <span class="descr-span">${e}</span></li>
              <li class="gallery-info-item">Views: <span class="descr-span">${o}</span></li>
              <li class="gallery-info-item">Comments: <span class="descr-span">${c}</span></li>
              <li class="gallery-info-item">Downloads: <span class="descr-span">${m}</span></li>
            </ul> 
          </a>
        </li>`).join("")}function d(){window.scrollBy({top:2*document.querySelector(".gallery-item").getBoundingClientRect().height,behavior:"smooth"})}const g=new b(".gallery-item a",{captionsData:"alt",captionDelay:250}),t={query:"",page:0,maxPage:0,per_page:15};r.form.addEventListener("submit",q);r.button.addEventListener("click",w);t.maxPage=Math.ceil(t.totalHits/t.per_page);async function q(s){if(s.preventDefault(),t.query=s.currentTarget.elements.query.value.trim(),t.page=1,S(),f(),r.gallery.innerHTML="",!t.query){n("The search field can't be empty! Please, enter your request!"),u();return}try{const a=await p(t.query,t.page);if(a.hits.length===0){n("Sorry, there are no images matching your search query. Please try again!"),r.form.reset(),u();return}r.gallery.insertAdjacentHTML("beforeend",y(a.hits)),g.refresh(),a.hits.length>=15?(u(),h()):(f(),n("We're sorry, but you've reached the end of search results")),r.form.reset()}catch{f(),r.gallery.innerHTML="",n("Sorry, there is a problem with connection with the server")}finally{u(),r.form.reset(),t.page===t.maxPage&&n("We're sorry, but you've reached the end of search results!")}}async function w(){t.page+=1,h(),r.button.disabled=!0;try{const s=await p(t.query,t.page);if(r.button.disabled=!1,s.totalHits-t.page*t.per_page<0)r.gallery.insertAdjacentHTML("beforeend",y(s.hits)),f(),n("We're sorry, but you've reached the end of search results"),d();else if(s.hits.length>0){r.gallery.insertAdjacentHTML("beforeend",y(s.hits)),d();return}g.refresh(),r.form.reset()}catch{n("Sorry, there is a problem with connection with the server")}finally{u(),r.form.reset(),t.page===t.maxPage&&n("We're sorry, but you've reached the end of search results!")}}function n(s){L.show({class:"error-svg",position:"topRight",icon:"error-svg",message:s,maxWidth:"432",messageColor:"#fff",messageSize:"16px",backgroundColor:"#4e75ff",close:!1,closeOnClick:!0,fontfamily:"Montserrat",fontsize:"16px"})}function u(){setTimeout(()=>{r.loader.style.display="none"},1e3)}function S(){r.loader.style.display="block"}function f(){r.button.style.display="none"}function h(){r.button.style.display="block"}
//# sourceMappingURL=commonHelpers.js.map
