'use strict';
/**  /// -- selection -- ///*/
const navbar = document.querySelector('.nav-bar');
const home = document.querySelector('.home');
const featuresSection = document.querySelector('.features');

  // for  smooth scroll 
const navLinkContaier = document.querySelector('.nav-list')
const linkHome = document.querySelector('.link-home');

  // for the popup
  const btnOpens = document.querySelectorAll('.open-account');
  const popupForm = document.querySelector('.popup');
  const btnClosepopUp = document.querySelector('.btn-close-popup');
  const popupOverlay = document.querySelector('.overlay');

   // for tab selection inoperations section
const operationbtnContainer = document.querySelector('.operations-btns');
const operationbnts = document.querySelectorAll('.btn-operations');
const operationTabConents = document.querySelectorAll('.operation-tab-content');
   
   // for slider in testimonials
const  slides = document.querySelectorAll('.testimonail-card');
const dotContainer = document.querySelector('.dot-numbering');
const dotBtns = document.querySelectorAll('.btn-circle');
const  rightArrowBtn = document.querySelector('.btn-arrow-right');
const  leftArrowBtn = document.querySelector('.btn-arrow-left');
  // for the all section 
 const allSections = document.querySelectorAll('section');

{ /* ///-- makigng the nav sticky. --/// */ 
  // first way
  {
     window.addEventListener('scroll',function(){
    if(window.scrollY > home.clientHeight )
      navbar.classList.add('fix-header')
    else
      navbar.classList.remove('fix-header')

  }) 
  }
  // second way
  {
  //    window.addEventListener('scroll',function(){
  //   if(featuresSection.getBoundingClientRect().top < navbar.clientHeight )
  //     navbar.classList.add('fix-header')
  //   else
  //     navbar.classList.remove('fix-header')

  // }) 
  }
  // using intersecionObserver way
  {
  //   const observerCallback = function(entries){
  //   const [entry] =entries;
  //   if(!entry.isIntersecting)
  //     navbar.classList.add('fix-header');
  //  else
  //   navbar.classList.remove('fix-header');
      

  //   };
  //   const observer = new IntersectionObserver(observerCallback,
  //     {
  //       root:null,
  //       treshold:0,
  //       rootMargin: `-${navbar.clientHeight}px`
  //     });
  //     observer.observe(home)
  }


}
{  /*///-- hover  on the nav links --/// */

  // function 
  const handleHover =  function(e){
    if(!e.target.classList.contains('link-nav')) return;
    const clikedLink = e.target;
    const parent = clikedLink .closest('.nav-bar');
   const otherLinks =  parent.querySelectorAll('.link-nav'); 
   const logoName =  parent.querySelector('h1');
     otherLinks.forEach(link =>{
       if(link !== clikedLink )
       link.style.opacity = this;
     })
     logoName.style.opacity = this;
  }
   navLinkContaier.addEventListener('mouseover',handleHover.bind(.5));

   navLinkContaier.addEventListener('mouseout',handleHover.bind(1));
}
{ /** /// -- smooth scroll with js --/// */
   // nav link scroll with event delegation.
   navLinkContaier.addEventListener('click',function(e){
    if(!e.target.classList.contains('link'))
    return;
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
     document.querySelector(`${targetId}`).scrollIntoView({behavior:'smooth'})
   })
    // leanmore btn scroll
    linkHome.addEventListener('click',function(e){
      e.preventDefault();
      window.scrollTo({
        left:0,
        top:`${home.clientHeight + 30} `,
        behavior: 'smooth',
      });
    })
  

}

{ /** /// -- working popup --/// */

    // functions 
    
    const removePopup = function(){
      popupForm.classList.remove('visible')
      popupOverlay.classList.remove('visible')
    }
    const createPopup = function(){
      popupForm.classList.add('visible')
      popupOverlay.classList.add('visible')
    }

    // event handlers
 btnOpens.forEach(btn => btn.addEventListener('click',createPopup));

 btnClosepopUp.addEventListener('click',removePopup)

 popupOverlay.addEventListener('click',removePopup)

 window.addEventListener('keydown',function(e){
    if(e.key === 'Escape'&& popupForm.classList.contains('visible'))
      removePopup();
  })
}

{ /** /// -- operation tab selection --/// */
   operationbtnContainer.addEventListener('click',function(e){
    if(!e.target.classList.contains('btn')) return;
    const btnClicked = e.target;

    operationTabConents.forEach(tab => {
      tab.classList.remove('operation-tab-content-active');
    });

    operationbnts.forEach(tab => {
      tab.classList.remove('btn-tab-active');
    });
 
    btnClicked.classList.add('btn-tab-active');
     //selected tab
    document.querySelector(`.operation-tab-content-${btnClicked.dataset.tab}`).classList.add('operation-tab-content-active')
   })
}

{  /** /// --slider in  testimoials --/// */
 
  let currentSlide = 0;
  const maxSlide = slides.length-1;

     //functions
  const goTOSlide = function(currentSlide){
    slides.forEach((slide,index) => {
      slide.style.transform = `translateX(${(index -currentSlide) * 100}rem)`;

      dotBtns.forEach(dotBtn => {
        dotBtn.classList.remove('btn-circle-active');
      });
      document.querySelector(`.btn-circle-${currentSlide+1}`).classList.add('btn-circle-active');

  })
};
  const nextSlide = function(){
    if(currentSlide === maxSlide)
      currentSlide = 0;
    else 
      currentSlide ++;

  goTOSlide(currentSlide)
};
const previousSlide = function(){
  if(currentSlide === 0)
  currentSlide = maxSlide;
  else 
  currentSlide --;

  goTOSlide(currentSlide)
};   
   // initials 
   goTOSlide(currentSlide)
// event handlers
   leftArrowBtn.addEventListener('click',previousSlide);
   rightArrowBtn.addEventListener('click',nextSlide);
   dotContainer.addEventListener('click',function(e){
    if(!e.target.classList.contains('btn')) return;
      const btnClicked = e.target;
      currentSlide = btnClicked.dataset.dot-1;
      goTOSlide(currentSlide)
   })


}

{  /** /// --first showup of sections--/// */

  const sectionCallback = function(entries,observer){
    const [entry] = entries;
  console.log(
    entry.target,
    entry.target.getBoundingClientRect().top, document.documentElement.clientHeight)

    if(entry.isIntersecting ||
      entry.target.getBoundingClientRect().top< document.documentElement.clientHeight) {    
      entry.target.classList.remove('section-hidden');
      observer.unobserve(entry.target);
    }
    else return;
  }
    const sectionObserver = new IntersectionObserver(
      sectionCallback,{
        root:null,
        treshold: .15,
      }
   );
   allSections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section-hidden');
   // if already shown disable hiding
    if(section.getBoundingClientRect().top< document.documentElement.clientHeight) {     
      section.classList.remove('section-hidden');
    }
   
   })
  
}
// window.addEventListener('load',window.scrollTo(0,0))
