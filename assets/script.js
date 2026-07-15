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
function submitForm(){
  var name=document.getElementById('f-name').value.trim();
  var email=document.getElementById('f-email').value.trim();
  var phone=document.getElementById('f-phone').value.trim();
  var child=document.getElementById('f-child').value.trim();
  var year=document.getElementById('f-year').value;
  var source=document.getElementById('f-source').value;
  var message=document.getElementById('f-message').value.trim();
  var consent=document.getElementById('f-consent').checked;
  var honey=document.getElementById('f-honey').value;
  var subjects=Array.prototype.slice.call(document.querySelectorAll('#f-subject-group input:checked')).map(function(cb){return cb.value;});
  if(!name||!email){showNotif('Please fill in your name and email address.');return;}
  if(!consent){showNotif('Please tick the consent checkbox to proceed.');return;}
  if(honey){return;}
  var btn=document.querySelector('.btn-submit');
  var originalText=btn.textContent;
  btn.disabled=true;btn.textContent='Sending…';
  fetch('https://formsubmit.co/ajax/info@horizontuitionredbridge.co.uk',{
    method:'POST',
    headers:{'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify({
      _subject:'New enquiry from horizontuitionredbridge.co.uk',
      'Parent Name':name,
      'Email':email,
      'Phone':phone,
      'Child\'s Name':child,
      'Year Group':year||'(not specified)',
      'How they heard about us':source||'(not specified)',
      'Subjects of interest':subjects.length?subjects.join(', '):'(not specified)',
      'Message':message||'(none)'
    })
  }).then(function(r){return r.json();}).then(function(){
    document.getElementById('contact-form-wrap').style.display='none';
    document.getElementById('success-msg').style.display='block';
    showNotif('Enquiry sent! We\'ll be in touch within 24 hours. ✓');
  }).catch(function(){
    btn.disabled=false;btn.textContent=originalText;
    showNotif('Something went wrong sending your enquiry — please call us on 02080586815.');
  });
}
function showNotif(msg){
  var n=document.getElementById('notif');
  n.textContent=msg;n.classList.add('show');
  setTimeout(function(){n.classList.remove('show');},4000);
}
