// CURSOR
const cur=document.getElementById('cur'), curf=document.getElementById('curf');
let fx=0,fy=0,mx=0,my=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function aF(){fx+=(mx-fx)*.12;fy+=(my-fy)*.12;curf.style.left=fx+'px';curf.style.top=fy+'px';requestAnimationFrame(aF);})();
document.querySelectorAll('a,button,.pc,.sk,.cc,.lang-it').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.width='20px';cur.style.height='20px';curf.style.width='60px';curf.style.height='60px';});
  el.addEventListener('mouseleave',()=>{cur.style.width='12px';cur.style.height='12px';curf.style.width='40px';curf.style.height='40px';});
});

// NAV
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('sc',scrollY>80));

// REVEAL
const ro=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');ro.unobserve(x.target);}});},{threshold:.08,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

// COUNTER
function cUp(el,tgt,sfx){let v=0;const s=tgt/120;const t=setInterval(()=>{v+=s;if(v>=tgt){el.textContent=tgt+sfx;clearInterval(t);return;}el.textContent=Math.floor(v)+sfx;},30);}
const so=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.querySelectorAll('.stat-num').forEach(n=>{const originalText=n.textContent;const num=parseInt(originalText.replace(/\D/g,''));const sfx=originalText.replace(/\d/g,'');n.textContent='0';cUp(n,num,sfx);});so.unobserve(x.target);}});},{threshold:.5});
const hs=document.querySelector('.hero-stats');if(hs)so.observe(hs);

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth'});}));

// PARALLAX
window.addEventListener('scroll',()=>{const img=document.querySelector('#hero .hero-bg img');if(img)img.style.transform=`scale(1.07) translateY(${scrollY*.28}px)`;});

// CHATBOT - DISABLED
/*
const chatbotToggle=document.getElementById('chatbotToggle');
const chatbotPopup=document.getElementById('chatbotPopup');
const chatbotClose=document.getElementById('chatbotClose');
const chatbotInput=document.getElementById('chatbotInput');
const chatbotSend=document.getElementById('chatbotSend');
const chatbotMessages=document.getElementById('chatbotMessages');

let resumeText='';
let isProcessing=false;

// Toggle chatbot
chatbotToggle.addEventListener('click',()=>{
  chatbotPopup.classList.toggle('active');
  if(chatbotPopup.classList.contains('active')&&resumeText===''){
    loadResumeContent();
  }
});

chatbotClose.addEventListener('click',()=>{
  chatbotPopup.classList.remove('active');
});

// Load resume content
async function loadResumeContent(){
  try{
    const response=await fetch('Varun Petekar.pdf');
    const arrayBuffer=await response.arrayBuffer();
    const pdfText=await extractTextFromPDF(arrayBuffer);
    resumeText=pdfText;
  }catch(error){
    console.error('Error loading resume:',error);
    resumeText=getWebsiteContent();
  }
}

// Extract text from PDF using PDF.js
async function extractTextFromPDF(arrayBuffer){
  try{
    // Load PDF.js library
    await loadPDFJS();
    
    // Load the PDF document
    const pdfDoc=await pdfjsLib.getDocument({data: arrayBuffer}).promise;
    let fullText='';
    
    // Extract text from all pages
    for(let pageNum=1;pageNum<=pdfDoc.numPages;pageNum++){
      const page=await pdfDoc.getPage(pageNum);
      const textContent=await page.getTextContent();
      const pageText=textContent.items.map(item=>item.str).join(' ');
      fullText+=pageText+'\n';
    }
    
    return fullText.trim();
  }catch(error){
    console.error('Error extracting PDF text:',error);
    throw error;
  }
}

// Load PDF.js library dynamically
async function loadPDFJS(){
  if(typeof pdfjsLib!=='undefined')return;
  
  return new Promise((resolve,reject)=>{
    const script=document.createElement('script');
    script.src='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload=()=>{
      pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      resolve();
    };
    script.onerror=reject;
    document.head.appendChild(script);
  });
}

// Get website content as fallback
function getWebsiteContent(){
  return `
Varun Petekar - AI Developer & Data Engineer

CURRENT ROLE:
AI Developer & Data Analyst at Execiva (Sept 2024 - Present)
Location: Mumbai, Maharashtra, India

SKILLS:
- Generative AI & LLMs: LangChain, LangGraph, LangFlow, Google Gemini API, FAISS, Ollama, Mistral, Deepseek, Airia.ai, AI Agents
- Automation & Scraping: n8n, Apify, Selenium, Web Scraping, PyInstaller, REST API Development, Third-party API Integration
- Data Engineering: Python, Pandas, NumPy, ETL Pipelines, SQL, BigQuery, PostgreSQL, MySQL, Firebase
- Cloud & Infrastructure: Google Cloud (GCP), Azure, Databricks, BigQuery, Azure Data Studio, SSMS, Scalable Data Architectures
- BI & Analytics: Power BI, Tableau, Excel, Google Analytics 4, GTM, Google Search Console, SEO Analytics, GBP, VBA
- Dev Tools & CRM: Git, VS Code, Cursor, Windsurf, Jupyter, PyCharm, HubSpot, Concord CRM, MySQL Workbench

EXPERIENCE:
EXECIVA - AI Developer & Data Analyst (Sept 2024 - Present)
- Built a BigQuery-powered AI chatbot allowing non-technical users to query databases in natural language (NLP)
- Developed an AI Sales Agent for automated lead generation, qualification, and predictive lead analysis
- Created a no-code AI website generator to pitch leads dynamically
- Designed AI-powered automation flows integrating customer interactions, data pipelines, and reporting
- Built interactive Power BI dashboards for real-time decision support across 10+ active US clients
- Developed data scraping and pipeline automation processing 500K+ records/month
- Wrote Python scripts for ETL, data cleaning, analytics, and ML-based predictive insights
- Architected and manage cloud infrastructure on GCP (BigQuery) and Microsoft Azure

PACECON - Application Developer Intern (June 2024 - Sept 2024)
- Led full-stack development, building and hosting Python APIs solo
- Fixed 15+ critical data bugs and optimised cross-platform handling, improving app stability by 40%
- Designed data models and integrated 3 third-party APIs, boosting data retrieval speed by 50%

PROJECTS:
1. BigQuery NLP AI Chatbot - Production AI chatbot powered by BigQuery for natural language database queries
2. AI Lead Scraping & Proposal Automation - n8n automation scraping 50,000+ leads/month with AI-generated proposals
3. Spotify Music Metadata & Lyrics Scraper - Scraped 800M+ songs extracting metadata, playcount, lyrics, and credits
4. Cloud-Powered Power BI Dashboards - Real-time dashboards connected to BigQuery and PostgreSQL for 50+ clients
5. AI Lead Intelligence & Outreach Automation - End-to-end AI automation using n8n and Apify for B2B lead generation
6. No-Code AI Website Generator - AI-powered system that dynamically builds personalized pitch websites

EDUCATION:
- B.Sc. Information Technology - Android Development, Pragati College, Mumbai University (Jan 2021 – Apr 2024)
- HSC Commerce, S. H. Jhondhale Polytechnic, Mumbai University (2019–2021)

CERTIFICATIONS:
- Google Cloud Platform (GCP) Fundamentals, Udemy (Feb 2025)
- Microsoft Power BI: Data Analysis & Visualization, Udemy (Jan 2025)

LANGUAGES:
- Marathi: Native / Bilingual
- Hindi: Native / Bilingual  
- English: Full Professional

CONTACT:
- Email: varunpetekar28@gmail.com
- Phone: +91 93243 42207
- LinkedIn: https://www.linkedin.com/in/varun-petekar/

ACHIEVEMENTS:
- Process 500K+ records/month
- Scraped 800M+ songs
- Support 10+ US clients
- Improved reporting efficiency by ~60%
- Increased app stability by 40%
- Boosted data retrieval speed by 50%
  `.trim();
}

// Send message
async function sendMessage(){
  const message=chatbotInput.value.trim();
  if(!message||isProcessing)return;
  
  // Add user message
  addMessage(message,'user');
  chatbotInput.value='';
  isProcessing=true;
  
  // Add typing indicator
  const typingId=addMessage('Thinking...','bot');
  
  try{
    const response=await callGeminiAPI(message);
    removeMessage(typingId);
    addMessage(response,'bot');
  }catch(error){
    removeMessage(typingId);
    addMessage('Sorry, I encountered an error. Please try again.','bot');
  }
  
  isProcessing=false;
}

// Call Gemini API
async function callGeminiAPI(message){
  const apiKey='AIzaSyBav5AcGAdZ2ZtjLsCVgOOmzYcZwnnX9Eo'; // Replace with your actual API key
  
  // Check if we have resume content
  if(!resumeText||resumeText.trim()===''){
    throw new Error('Resume content not loaded. Please refresh and try again.');
  }
  
  const prompt=`
You are a friendly, slightly humorous AI Developer & Data Engineer who loves to chat! Answer questions from your first-person perspective with personality and wit. Base your answers on the following resume information:

${resumeText}

Guidelines:
- Answer in first person (use "I", "my", "me") - never refer to yourself by name
- Keep responses SHORT and professional by default
- Match user's tone: be friendly only if user is friendly (uses emojis, casual language)
- Be professional and approachable for serious questions
- Use emojis sparingly - only when user uses them or asks casual questions
- For weird/funny questions: respond with appropriate humor but maintain professionalism
- If asked about skills not in your resume: acknowledge honestly but show enthusiasm to learn
- For new technologies: express interest in learning and growing your skillset
- Sound like a professional conversation, not casual texting
- Be direct and to the point but maintain professional tone
- Add emojis only when it feels natural and matches user's style

Example vibe:
- Professional user asks: "What's your experience?" → "I'm an AI Developer & Data Analyst at Execiva, specializing in automation and data pipelines."
- Friendly user asks: "what's your experience? 😄" → "I'm an AI Developer & Data Analyst at Execiva! 🚀 I build cool automation stuff and data pipelines!"
- User asks about Rust: "Ever worked with Rust?" → "I haven't worked with Rust yet, but I'm really interested in learning it! I love exploring new technologies and Rust's performance focus sounds fascinating."
- Weird question: "Share price predictions?" → "I focus on data pipelines rather than stock predictions, but I can help with data analysis!"

User Question: ${message}
`;

  try{
    const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        contents:[{
          parts:[{
            text:prompt
          }]
        }]
      })
    });
    
    if(!response.ok){
      const errorData=await response.json();
      console.error('API Error:', errorData);
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message||'Unknown error'}`);
    }
    
    const data=await response.json();
    console.log('API Response:', data);
    
    if(data.candidates&&data.candidates[0]?.content?.parts?.[0]?.text){
      return data.candidates[0].content.parts[0].text;
    }
    
    console.error('Invalid API response structure:', data);
    throw new Error('Invalid API response structure');
    
  }catch(error){
    console.error('Gemini API call failed:', error);
    
    // For API failures, provide a friendly, dynamic response based on the question
    const lowerMessage=message.toLowerCase();
    
    if(error.message.includes('API Error')&&error.message.includes('403')){
      return 'Oops! There\'s a little issue with my API setup. Let me try to help you anyway! 😊 What would you like to know about my skills or experience?';
    }else if(error.message.includes('API Error')&&error.message.includes('404')){
      return 'Hmm, my AI brain seems to be taking a break! 😄 But I can still chat with you! Ask me anything about my work or projects!';
    }else if(error.message.includes('CORS')){
      return 'Network hiccups! 🌐 But don\'t worry, I\'m still here to help! What can I tell you about my tech journey?';
    }
    
    // Dynamic friendly response that encourages further conversation
    const friendlyResponses=[
      `Hey! I'm having some technical issues with my AI brain right now, but I'd love to chat! 😊 What would you like to know about my work as an AI Developer & Data Engineer?`,
      `Oops! My AI connection is a bit shaky at the moment! 😄 But I'm still here and happy to help! Ask me about my projects, skills, or anything tech-related!`,
      `Technical difficulties! 🤖 But don't worry, I'm still here! I'm an AI Developer & Data Engineer who loves building cool stuff. What interests you most?`,
      `My AI powers are charging up! 🔋 But I can still tell you all about my journey in tech! What would you like to explore - my projects, skills, or experience?`
    ];
    return friendlyResponses[Math.floor(Math.random()*friendlyResponses.length)];
  }
}

// Add message to chat
function addMessage(text,sender){
  const messageDiv=document.createElement('div');
  messageDiv.className=`message ${sender}-message`;
  messageDiv.textContent=text;
  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop=chatbotMessages.scrollHeight;
  return messageDiv;
}

// Remove message
function removeMessage(messageElement){
  if(messageElement&&messageElement.parentNode){
    messageElement.parentNode.removeChild(messageElement);
  }
}

// Event listeners
chatbotSend.addEventListener('click',sendMessage);
chatbotInput.addEventListener('keypress',(e)=>{
  if(e.key==='Enter')sendMessage();
});
*/
