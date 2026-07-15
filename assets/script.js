function toggleMobileNav(){
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('navToggle').classList.toggle('open');
}
function closeMobileNav(){
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('navToggle').classList.remove('open');
  document.getElementById('navDropdown').classList.remove('open');
}
function toggleNavDropdown(e){
  if(window.innerWidth<=768){
    e.stopPropagation();
    document.getElementById('navDropdown').classList.toggle('open');
  }
}
document.addEventListener('click',function(e){
  var nav=document.querySelector('nav');
  if(nav && !nav.contains(e.target)){closeMobileNav();}
});
function switchKS(btn,contentId){
  var container=btn.closest('section')||btn.closest('.page');
  container.querySelectorAll('.ks-tab').forEach(function(t){t.classList.remove('active');});
  container.querySelectorAll('.ks-content').forEach(function(c){c.classList.remove('active');});
  btn.classList.add('active');
  var c=document.getElementById(contentId);
  if(c)c.classList.add('active');
}
function toggleFAQ(el){
  var ans=el.nextElementSibling;
  var arrow=el.querySelector('.faq-arrow');
  var isOpen=ans.classList.contains('open');
  var list=el.closest('.faq-list');
  list.querySelectorAll('.faq-a').forEach(function(a){a.classList.remove('open');});
  list.querySelectorAll('.faq-arrow').forEach(function(a){a.classList.remove('open');});
  if(!isOpen){ans.classList.add('open');if(arrow)arrow.classList.add('open');}
}
function toggleEmail(el){
  var body=el.nextElementSibling;
  var arrow=el.querySelector('.toggle-arrow');
  var isOpen=body.classList.contains('open');
  body.classList.toggle('open',!isOpen);
  if(arrow)arrow.classList.toggle('open',!isOpen);
}
function filterTestimonials(cat,btn){
  document.querySelectorAll('#testi-filters .filter-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  document.querySelectorAll('#testi-grid .testi-card').forEach(function(card){
    card.style.display=(cat==='all'||card.dataset.cat.includes(cat))?'flex':'none';
  });
}
function filterResources(cat,btn){
  document.querySelectorAll('.resources-filters .filter-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  document.querySelectorAll('#resources-grid .blog-card').forEach(function(card){
    card.style.display=(cat==='all'||card.dataset.cat.includes(cat))?'block':'none';
  });
}
function validateEnquiryForm(){
  var name=document.getElementById('f-name').value.trim();
  var email=document.getElementById('f-email').value.trim();
  var consent=document.getElementById('f-consent').checked;
  if(!name||!email){showNotif('Please fill in your name and email address.');return false;}
  if(!consent){showNotif('Please tick the consent checkbox to proceed.');return false;}
  var btn=document.querySelector('.btn-submit');
  if(btn){btn.disabled=true;btn.textContent='Sending…';}
  return true;
}
if(location.search.indexOf('sent=1')!==-1){
  var wrap=document.getElementById('contact-form-wrap');
  var msg=document.getElementById('success-msg');
  if(wrap && msg){wrap.style.display='none';msg.style.display='block';}
}
function showNotif(msg){
  var n=document.getElementById('notif');
  n.textContent=msg;n.classList.add('show');
  setTimeout(function(){n.classList.remove('show');},4000);
}
