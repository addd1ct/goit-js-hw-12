import{a as g,S as y}from"./assets/vendor-DxnlFHFt.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const L="48228691-89796883a04c0782a049fa841",w="https://pixabay.com/api/";async function v(t,s=1,i=15){const n=`${w}?key=${L}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${s}&per_page=${i}`,{data:e}=await g.get(n);return e}function S(t){const s=document.querySelector(".images-container"),i=t.map(({webformatURL:n,tags:e,likes:o,views:r,comments:m,downloads:h,largeImageURL:p})=>`
    <li class="image-card">
      <a href="${p}">
        <img src="${n}" alt="${e}" />
        <div class="image-info">
            <p><span>Likes:</span> ${o}</p>
            <p><span>Views:</span> ${r}</p>
            <p><span>Comments:</span> ${m}</p>
            <p><span>Downloads:</span> ${h}</p>
        </div>
      </a>
    </li>
    `).join("");s.insertAdjacentHTML("beforeend",i)}function c(t){const s=document.querySelector(".load-more");t?s.classList.remove("is-hidden"):s.classList.add("is-hidden")}function $(){iziToast.show({title:"Notice",message:"Sorry, there are no images matching your search query. Please try again."})}function u(){iziToast.show({title:"Notice",message:"We're sorry, but you've reached the end of search results."})}let d;function b(){d?d.refresh():d=new y(".images-container a")}let a=1,l="";document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector(".load-more"),s=document.querySelector(".search-form"),i=document.querySelector(".search-input"),n=document.querySelector(".loader");t.classList.add("is-hidden"),n.classList.add("is-hidden"),s.addEventListener("submit",async function(e){e.preventDefault(),l=i.value.trim(),l!==""&&(t.classList.add("is-hidden"),n.classList.add("is-hidden"),a=1,document.querySelector(".images-container").innerHTML="",await f(),n.classList.add("is-hidden"))}),t.addEventListener("click",async function(){a++,n.classList.remove("is-hidden"),await f(),n.classList.add("is-hidden"),q()})});async function f(){try{const t=await v(l,a);t.hits.length===0?($(),c(!1)):(S(t.hits),b(),a*15>=t.totalHits?(c(!1),u()):c(!0))}catch(t){console.log(t),u()}}function q(){const t=document.querySelector(".images-container img");if(t){const s=t.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
