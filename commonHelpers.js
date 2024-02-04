import{S as b,i as L}from"./assets/vendor-46aac873.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const r={form:document.querySelector(".form"),input:document.querySelector(".input"),gallery:document.querySelector(".gallery"),button:document.querySelector(".button"),loader:document.querySelector(".loader")};async function p(t,a){const i="https://pixabay.com/api/",l="41991385-9b19b8bb3d6f1491499417d17";return(await axios.get(i,{params:{key:l,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:a}})).data}function y(t){return t.map(({webformatURL:a,largeImageURL:i,tags:l,likes:e,views:o,comments:c,downloads:h})=>`
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
              <li class="gallery-info-item">Downloads: <span class="descr-span">${h}</span></li>
            </ul> 
          </a>
        </li>`).join("")}function d(){window.scrollBy({top:2*document.querySelector(".gallery-item").getBoundingClientRect().height,behavior:"smooth"})}const g=new b(".gallery-item a",{captionsData:"alt",captionDelay:250}),s={query:"",page:0,maxPage:0,per_page:15};r.form.addEventListener("submit",q);r.button.addEventListener("click",w);s.maxPage=Math.ceil(s.totalHits/s.per_page);async function q(t){if(t.preventDefault(),s.query=t.currentTarget.elements.query.value.trim(),s.page=1,S(),f(),r.gallery.innerHTML="",!s.query){n("The search field can't be empty! Please, enter your request!"),u();return}try{const a=await p(s.query,s.page);if(a.hits.length===0){n("Sorry, there are no images matching your search query. Please try again!"),r.form.reset(),u();return}r.gallery.insertAdjacentHTML("beforeend",y(a.hits)),g.refresh(),a.hits.length>=15?(u(),m()):(f(),n("We're sorry, but you've reached the end of search results")),r.form.reset()}catch{f(),r.gallery.innerHTML="",n("Sorry, there is a problem with connection with the server")}finally{u(),r.form.reset(),s.page===s.maxPage&&n("We're sorry, but you've reached the end of search results!")}}async function w(){s.page+=1,m(),r.button.disabled=!0;try{const t=await p(s.query,s.page);if(r.button.disabled=!1,t.totalHits-s.page*s.per_page<0)r.gallery.insertAdjacentHTML("beforeend",y(t.hits)),f(),n("We're sorry, but you've reached the end of search results"),d();else if(t.hits.length>0){r.gallery.insertAdjacentHTML("beforeend",y(t.hits)),d();return}g.refresh(),r.form.reset()}catch{n("Sorry, there is a problem with connection with the server")}}function n(t){L.show({class:"error-svg",position:"topRight",icon:"error-svg",message:t,maxWidth:"432",messageColor:"#fff",messageSize:"16px",backgroundColor:"#4e75ff",close:!1,closeOnClick:!0,fontfamily:"Montserrat",fontsize:"16px"})}function u(){setTimeout(()=>{r.loader.style.display="none"},1e3)}function S(){r.loader.style.display="block"}function f(){r.button.style.display="none"}function m(){r.button.style.display="block"}
//# sourceMappingURL=commonHelpers.js.map
