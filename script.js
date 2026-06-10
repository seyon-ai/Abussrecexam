
function getData(){
 return JSON.parse(localStorage.getItem('abussExamV2')||'[]');
}

function submitExam(){
 const d={
  id:Date.now(),
  name:document.getElementById('name').value,
  q1:q1.value,q2:q2.value,q3:q3.value,q4:q4.value,q5:q5.value,q6:q6.value,
  time:new Date().toLocaleString()
 };
 let arr=getData();
 arr.push(d);
 localStorage.setItem('abussExamV2',JSON.stringify(arr));
 alert('Recruit Accepted Into Evaluation Queue');
 location.reload();
}

function render(){
 const box=document.getElementById('submissions');
 if(!box) return;

 let arr=getData();
 let s=(document.getElementById('search').value||'').toLowerCase();

 arr=arr.filter(x=>x.name.toLowerCase().includes(s));

 document.getElementById('stats').innerHTML=
 '<h2>Total Candidates: '+getData().length+'</h2>';

 box.innerHTML=arr.map(x=>`
 <div class="card">
 <h2>${x.name}</h2>
 <small>${x.time}</small>
 <p><b>Q1</b><br>${x.q1}</p>
 <p><b>Q2</b><br>${x.q2}</p>
 <p><b>Q3</b><br>${x.q3}</p>
 <p><b>Q4</b><br>${x.q4}</p>
 <p><b>Q5</b><br>${x.q5}</p>
 <p><b>FINAL</b><br>${x.q6}</p>
 <button onclick="removeCandidate(${x.id})">ELIMINATE</button>
 </div>`).join('');
}

function removeCandidate(id){
 let arr=getData().filter(x=>x.id!==id);
 localStorage.setItem('abussExamV2',JSON.stringify(arr));
 render();
}

function clearAll(){
 if(confirm('PURGE ENTIRE DATABASE?')){
 localStorage.removeItem('abussExamV2');
 render();
 }
}

render();
