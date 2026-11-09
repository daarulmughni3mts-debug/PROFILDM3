const KEY='pdm3_data_v1';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const hash=s=>{let h=5381;for(const c of s)h=(h*33)^c.charCodeAt(0);return String(h>>>0)};
const clone=o=>JSON.parse(JSON.stringify(o));
const svg=x=>'data:image/svg+xml;utf8,'+encodeURIComponent(x);
const AV=svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#e9efe9"/><circle cx="50" cy="38" r="17" fill="#9db3a2"/><path d="M16 100c2-26 18-38 34-38s32 12 34 38z" fill="#9db3a2"/></svg>');
const PH=svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#e9efe9"/><text x="200" y="160" font-size="22" text-anchor="middle" fill="#8aa092" font-family="sans-serif">Foto belum diatur</text></svg>');
const LOGO=svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#0f5132"/><path d="M62 28a24 24 0 1 0 0 44a19 19 0 1 1 0-44z" fill="#d4af37"/><path d="M70 50l3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" fill="#d4af37"/></svg>');
const seed=()=>`https://picsum.photos/seed/pdm${Date.now()}/900/650`;
const NEW={
 ustadz:()=>({name:"Ustadz Baru",role:"Mata Pelajaran",photo:""}),
 ustadzah:()=>({name:"Ustadzah Baru",role:"Mata Pelajaran",photo:""}),
 env:()=>({src:seed(),cap:"Keterangan foto"}),act:()=>({src:seed(),cap:"Keterangan foto"}),eks:()=>({src:seed(),cap:"Keterangan foto"}),
 putra:n=>({name:"Kelas "+(n+1)+" Putra",jumlah:40,wali:{name:"Ustadz Wali Kelas",bio:"Profil wali kelas putra.",photo:""}}),
 putri:n=>({name:"Kelas "+(n+1)+" Putri",jumlah:40,wali:{name:"Ustadzah Wali Kelas",bio:"Profil wali kelas putri.",photo:""}})
};
let S=load(),admin=sessionStorage.getItem('pdm3_adm')==='1',tab=0;
function migrate(d){(d.schools||[]).forEach(s=>{if(s.classes){s.putra=s.classes.map(c=>({name:c.name+" Putra",jumlah:+c.putra||0,wali:c.wali}));s.putri=s.classes.map(c=>({name:c.name+" Putri",jumlah:+c.putri||0,wali:clone(c.wali)}));delete s.classes}s.putra=s.putra||[];s.putri=s.putri||[]});return d}
function load(){try{const x=localStorage.getItem(KEY);if(x)return migrate(JSON.parse(x))}catch(e){}return migrate(clone(DEFAULT_DATA))}
function toast(m){let t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),1600)}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));toast('Tersimpan ✓')}catch(e){alert('Penyimpanan browser penuh. Gunakan foto lebih kecil, atau isi dengan URL/path gambar (mis. images/foto.jpg).')}}
const get=p=>p.split('.').reduce((o,k)=>o?.[k],S);
const set=(p,v)=>{const a=p.split('.'),l=a.pop();a.reduce((o,k)=>o[k],S)[l]=v};
const T=(p,tag='span',c='',ml=false,n=false)=>`<${tag} class="ed ${c}" data-p="${p}"${ml?' data-ml':''}${n?' data-n':''}>${esc(get(p))}</${tag}>`;
const IMG=(p,c='',k='img')=>`<span class="imw ${c}"><img data-i="${p}" data-k="${k}" src="${esc(get(p)||(k==='av'?AV:k==='logo'?LOGO:PH))}" alt="" loading="lazy"><i class="cam">✎ Ganti</i></span>`;
const ADD=(k,t)=>`<button class="add admin-only" data-add="${k}">＋ ${t}</button>`;
const DEL=k=>`<button class="del admin-only" data-del="${k}" title="Hapus">✕</button>`;
const LK=(p,l)=>`<button class="lk admin-only" data-link="${p}" data-label="${l}">✎ Edit link</button>`;
const IC={facebook:'<path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/>',
tiktok:'<path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9a7.3 7.3 0 0 0 4.3 1.4V7.3a4.3 4.3 0 0 1-3.2-1.5z"/>',
instagram:'<path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4zm9.7 1.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>',
wa:'<path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.300 1.200-1.800 1.200-.5.100-1 .200-3.300-.700-2.800-1.200-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.800s.7-2 1-2.300c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.9 2.100c.1.200.1.400 0 .5l-.4.600c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.200 1 2.100 1.300 2.400 1.500.3.100.5.100.6-.1l.9-1.100c.2-.3.400-.2.600-.1l2 .9c.3.200.5.200.5.400.100.200.100.800-.1 1.400z"/>'};
const yt=u=>{const m=(u||'').match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);return m&&m[1]};
const wa=n=>'https://wa.me/'+String(n).replace(/\D/g,'').replace(/^0/,'62');
const gal=(k,t)=>`<div class="gh rv"><h3>${t}</h3>${ADD(k,'Tambah Foto')}</div><div class="gal">${S[k].map((x,i)=>`<figure class="rv">${IMG(`${k}.${i}.src`)}${DEL(k+'.'+i)}<figcaption>${T(`${k}.${i}.cap`)}</figcaption></figure>`).join('')}</div>`;
const people=(k,t)=>`<h3 class="sub rv">${t} ${ADD(k,'Tambah '+t)}</h3><div class="tg2">${S[k].map((x,i)=>`<div class="tch rv">${IMG(`${k}.${i}.photo`,'','av')}${DEL(k+'.'+i)}${T(`${k}.${i}.name`,'h4')}${T(`${k}.${i}.role`,'p')}</div>`).join('')}</div>`;
const grp=(i,g,lbl,gr)=>`<div class="grp ${g}"><div class="gh2 rv"><h3>Kelas ${lbl} <small>Wali Kelas: ${gr}</small></h3><span class="gt">Total ${lbl}: <b data-gt="${i}.${g}">0</b></span>${ADD(`schools.${i}.${g}`,'Tambah Kelas '+lbl)}</div>
<div class="cg">${S.schools[i][g].map((c,j)=>`<div class="cls rv">${DEL(`schools.${i}.${g}.${j}`)}${T(`schools.${i}.${g}.${j}.name`,'h3')}
<div class="jm">${T(`schools.${i}.${g}.${j}.jumlah`,'b','',false,true)}<span>Santri ${lbl}</span></div>
<div class="wl">${IMG(`schools.${i}.${g}.${j}.wali.photo`,'','av')}<div><small>Wali Kelas (${gr})</small>${T(`schools.${i}.${g}.${j}.wali.name`,'h4')}<p>${T(`schools.${i}.${g}.${j}.wali.bio`,'span','',true)}</p></div></div></div>`).join('')}</div></div>`;
const NAV=[['profil','Profil'],['panca','Panca Jiwa'],['santri','Santri'],['pengajar','Pengajar'],['galeri','Galeri'],['video','Video'],['ppdb','PPDB'],['kontak','Kontak']];

function render(){
const s=S.site,y=new Date().getFullYear(),id=yt(S.video);
$('#app').innerHTML=`
<header id="hd"><div class="wrap nav"><a href="#beranda" class="brand">${IMG('site.logo','','logo')}<span>${esc(s.name)}</span></a><button id="mb" aria-label="Menu">☰</button><nav id="nv">${NAV.map(n=>`<a href="#${n[0]}">${n[1]}</a>`).join('')}</nav></div></header>
<section id="beranda" class="hero" style="background-image:url('${esc(s.heroBg)}')"><div class="wrap"><p class="bis">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
<h1>${T('site.name')}</h1><p class="tg">${T('site.tagline','span','',true)}</p>
<div class="btns"><a class="btn gold" href="#ppdb">Daftar PPDB</a><a class="btn line" href="#profil">Kenali Kami</a></div>
<div class="stats"><div><b data-st="all">0</b><span>Santri</span></div><div><b data-st="kls">0</b><span>Kelas</span></div><div><b data-st="guru">0</b><span>Ustadz & Ustadzah</span></div></div></div>
<button class="bgb admin-only" data-i="site.heroBg" data-k="bg">✎ Ganti Latar</button></section>

<section id="profil" class="sec"><div class="wrap"><div class="ttl rv"><small>Profil</small><h2>${T('about.title')}</h2></div>
<div class="two"><div class="abt rv"><p>${T('about.text','span','',true)}</p></div>
<div class="fnd rv">${IMG('founder.photo','','av')}<div class="eb">${T('founder.role')}</div><h3>${T('founder.name')}</h3><p>${T('founder.bio','span','',true)}</p></div></div>
${gal('env','Lingkungan Pesantren')}</div></section>

<section class="qt" style="background-image:url('${esc(s.quoteBg)}')"><blockquote class="rv"><p>${T('words.text','span','',true)}</p><cite>— ${T('words.by')}</cite></blockquote><button class="bgb admin-only" data-i="site.quoteBg" data-k="bg">✎ Ganti Latar</button></section>

<section id="panca" class="sec alt"><div class="wrap"><div class="ttl rv"><small>Nilai Pondok</small><h2>Panca Jiwa Pondok</h2></div>
<div class="pj">${S.panca.map((p,i)=>`<div class="pc rv"><i>${i+1}</i>${T(`panca.${i}.title`,'h3')}${T(`panca.${i}.desc`,'p','',true)}</div>`).join('')}</div></div></section>

<section id="santri" class="sec"><div class="wrap"><div class="ttl rv"><small>Data</small><h2>Profil Santri</h2></div>
<div class="tabs">${S.schools.map((x,i)=>`<button data-tab="${i}" class="${i===tab?'on':''}">${esc(x.name)}</button>`).join('')}</div>
${S.schools.map((x,i)=>`<div class="pnl ${i===tab?'on':''}"><p class="sum">${esc(x.full)} — Total santri: <b data-st="${i}">0</b></p>
${grp(i,'putra','Putra','Ustadz')}${grp(i,'putri','Putri','Ustadzah')}</div>`).join('')}</div></section>

<section id="pengajar" class="sec alt"><div class="wrap"><div class="ttl rv"><small>Asatidz</small><h2>Ustadz & Ustadzah</h2></div>${people('ustadz','Ustadz')}${people('ustadzah','Ustadzah')}</div></section>

<section id="galeri" class="sec"><div class="wrap"><div class="ttl rv"><small>Galeri</small><h2>Kegiatan & Ekstrakurikuler</h2></div>${gal('act','Kegiatan Santri')}${gal('eks','Ekstrakurikuler')}</div></section>

<section id="video" class="sec alt"><div class="wrap"><div class="ttl rv"><small>Tour</small><h2>Video Tour Pesantren</h2></div>
<div class="vid rv">${id?`<iframe src="https://www.youtube.com/embed/${id}" title="Video Tour" allowfullscreen loading="lazy"></iframe>`:`<div><h3>Video tour belum diatur</h3><p>Masuk Admin lalu klik “Edit link” untuk menempel link YouTube.</p></div>`}</div>
<p style="text-align:center">${LK('video','Tempel link video YouTube')}</p></div></section>

<section id="ppdb" class="sec"><div class="wrap"><div class="ppdb rv"><small class="eb">Pendaftaran Dibuka</small><h2>${T('ppdb.title')}</h2><p>${T('ppdb.text','span','',true)}</p>
<a class="btn gold" href="${esc(S.ppdb.url)}" target="_blank" rel="noopener">Daftar Sekarang — PPDB PPDM3</a> ${LK('ppdb.url','Link PPDB PPDM3')}</div></div></section>

<section id="kontak" class="sec alt"><div class="wrap"><div class="ttl rv"><small>Kontak</small><h2>Hubungi Kami</h2></div>
<div class="ct"><div class="ci rv"><h3>Kontak Pesantren</h3><p>📞 <b>${T('site.phone')}</b> ${LK('site.phone','Nomor telepon/WhatsApp')}</p><p>📍 ${T('site.address')}</p>
<a class="btn gold" href="${wa(s.phone)}" target="_blank" rel="noopener">Chat WhatsApp</a> <a class="btn" href="tel:${esc(s.phone)}" style="color:var(--g)">Telepon</a>
<div class="so">${['facebook','tiktok','instagram'].map(k=>`<a href="${esc(S.social[k])}" target="_blank" rel="noopener" aria-label="${k}"><svg viewBox="0 0 24 24">${IC[k]}</svg></a>${LK('social.'+k,'Link '+k)}`).join('')}</div>
<p style="margin-top:14px">${LK('site.map','Lokasi peta (mis. nama tempat)')}</p></div>
<div class="map rv"><iframe loading="lazy" title="Peta" src="https://www.google.com/maps?q=${encodeURIComponent(s.map)}&output=embed"></iframe></div></div></div></section>

<footer>© ${y} ${esc(s.name)} · ${esc(s.address)}. Seluruh hak cipta dilindungi. · <a href="#" id="adm">${admin?'Keluar Admin':'Admin'}</a></footer>

<div id="ab" class="admin-only"><b>MODE ADMIN</b> klik teks untuk mengedit, klik foto untuk mengganti
<button class="p" data-act="exp">⬇ Ekspor data.js (untuk online)</button><button data-act="imp">Impor</button><button data-act="pw">Ganti Password</button><button data-act="reset">Reset</button><button data-act="out">Keluar</button><input id="fi" type="file" accept=".js,.json" hidden></div><div id="toast"></div>`;
post()}

function updStats(){let all=0,k=0;S.schools.forEach((s,i)=>{let t=0;['putra','putri'].forEach(g=>{let gt=0;s[g].forEach(c=>{gt+=(+c.jumlah||0);k++});t+=gt;$$(`[data-gt="${i}.${g}"]`).forEach(e=>e.textContent=gt)});all+=t;$$(`[data-st="${i}"]`).forEach(e=>e.textContent=t)});
$$('[data-st="all"]').forEach(e=>e.textContent=all);$$('[data-st="kls"]').forEach(e=>e.textContent=k);$$('[data-st="guru"]').forEach(e=>e.textContent=S.ustadz.length+S.ustadzah.length)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
function post(){document.body.classList.toggle('adm',admin);$$('.ed').forEach(e=>e.contentEditable=admin);updStats();$$('.rv').forEach(e=>io.observe(e));onScroll()}
function onScroll(){const h=$('#hd');h&&h.classList.toggle('sc',scrollY>40)}
addEventListener('scroll',onScroll);

function modal(html){const m=document.createElement('div');m.className='modal';m.innerHTML=html;document.body.appendChild(m);return m}
function compress(file,max){return new Promise(r=>{const f=new FileReader();f.onload=()=>{const i=new Image();i.onload=()=>{const k=Math.min(1,max/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);r(c.toDataURL('image/jpeg',.8))};i.src=f.result};f.readAsDataURL(file)})}
function imgModal(p,k){const cur=get(p)||'',m=modal(`<div class="mb"><h3>Ganti Foto</h3><label class="btn gold">Unggah dari perangkat<input type="file" accept="image/*" hidden></label><p>atau tempel URL / path gambar (mis. images/foto.jpg)</p><input type="text" value="${cur.startsWith('data:')?'':esc(cur)}" placeholder="https://..."><div class="btns"><button data-a="ok">Pakai URL</button> <button data-a="rm">Kembalikan default</button> <button data-a="x">Batal</button></div></div>`);
const done=v=>{set(p,v);save();m.remove();render()};
$('input[type=file]',m).onchange=async e=>{const f=e.target.files[0];if(f)done(await compress(f,{av:480,logo:320,bg:1600}[k]||1000))};
m.onclick=e=>{const a=e.target.dataset.a;if(e.target===m||a==='x')m.remove();if(a==='ok')done($('input[type=text]',m).value.trim());if(a==='rm')done('')}}

document.addEventListener('click',e=>{const t=e.target;
 if(t.closest('#mb')){$('#nv').classList.toggle('open');return}
 if(t.closest('#nv a'))$('#nv').classList.remove('open');
 if(t.id==='adm'){e.preventDefault();if(admin)return setAdmin(false);const p=prompt('Masukkan password admin:');if(p===null)return;if(hash(p)===(S.pass||hash('admin123')))setAdmin(true);else alert('Password salah.');return}
 const tb=t.closest('[data-tab]');if(tb){tab=+tb.dataset.tab;$$('.tabs button').forEach((b,i)=>b.classList.toggle('on',i===tab));$$('.pnl').forEach((b,i)=>b.classList.toggle('on',i===tab));return}
 if(admin){
  const im=t.closest('[data-i]')||(t.closest('.imw')&&$('[data-i]',t.closest('.imw')));if(im){e.preventDefault();return imgModal(im.dataset.i,im.dataset.k)}
  const ad=t.closest('[data-add]');if(ad){const a=get(ad.dataset.add),k=ad.dataset.add.split('.').pop();a.push(NEW[k](a.length));save();return render()}
  const dl=t.closest('[data-del]');if(dl&&confirm('Hapus item ini?')){const a=dl.dataset.del.split('.'),i=+a.pop();get(a.join('.')).splice(i,1);save();return render()}
  const lk=t.closest('[data-link]');if(lk){const v=prompt(lk.dataset.label+':',get(lk.dataset.link));if(v!==null){set(lk.dataset.link,v.trim());save();render()}return}
  const ac=t.closest('[data-act]');if(ac)return act(ac.dataset.act);
  if(t.closest('.ed')&&t.closest('a'))e.preventDefault();
 }else if(t.tagName==='IMG'&&t.closest('.gal')){const m=modal(`<img src="${esc(t.src)}" alt="">`);m.classList.add('lb');m.onclick=()=>m.remove()}
});
document.addEventListener('focusout',e=>{const t=e.target;if(!admin||!t.classList?.contains('ed'))return;
 let v=t.hasAttribute('data-ml')?t.innerText.trim():t.textContent.trim();
 if(t.hasAttribute('data-n')){v=Math.max(0,parseInt(v)||0);t.textContent=v}
 set(t.dataset.p,v);save();updStats()});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.classList?.contains('ed')&&!e.target.hasAttribute('data-ml')){e.preventDefault();e.target.blur()}});
document.addEventListener('paste',e=>{if(admin&&e.target.classList?.contains('ed')){e.preventDefault();document.execCommand('insertText',false,e.clipboardData.getData('text/plain'))}});

function setAdmin(v){admin=v;sessionStorage.setItem('pdm3_adm',v?'1':'0');render();if(v)setTimeout(()=>toast('Mode Admin aktif'),100)}
function act(a){
 if(a==='out')return setAdmin(false);
 if(a==='exp'){const b=new Blob(['/* Dibuat dari mode Admin */\nwindow.DEFAULT_DATA='+JSON.stringify(S,null,1)+';'],{type:'text/javascript'}),l=document.createElement('a');l.href=URL.createObjectURL(b);l.download='data.js';l.click();alert('File data.js terunduh. Timpa file js/data.js di folder website/hosting Anda agar perubahan tampil untuk semua pengunjung.')}
 if(a==='imp'){const f=$('#fi');f.onchange=()=>{const r=new FileReader();r.onload=()=>{try{S=migrate(JSON.parse(r.result.replace(/^[^{]*/,'').replace(/;\s*$/,'')));save();render()}catch(x){alert('File tidak valid.')}};r.readAsText(f.files[0])};f.click()}
 if(a==='pw'){const p=prompt('Password baru:');if(p){S.pass=hash(p);save();alert('Password diganti. Ekspor data.js agar tersimpan permanen.')}}
 if(a==='reset'&&confirm('Kembalikan semua data ke awal? Perubahan di browser ini akan hilang.')){localStorage.removeItem(KEY);S=clone(DEFAULT_DATA);render()}
}
render();
