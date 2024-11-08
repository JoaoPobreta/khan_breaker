const ver = "V1.1";

let device = {
    mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile|Tablet|Kindle|Silk|PlayBook|BB10/i.test(navigator.userAgent),
    apple: /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent)
};

/* User */
// Discaimer: user parameters were managed by the main injector.
// This will not change automatically.
let user = {
    username: "your_name_here",
    nickname: "@Khan Breaker",
    UID: 1
}

let loadedPlugins = [];

/* Elements */
const unloader = document.createElement('unloader');
const dropdownMenu = document.createElement('dropDownMenu');
const watermark = document.createElement('watermark');
const statsPanel = document.createElement('statsPanel');
const splashScreen = document.createElement('splashScreen');

/* Globals */
window.features = {
    questionSpoof: true,
    videoSpoof: true,
    showAnswers: false,
    autoAnswer: false,
    customBanner: false,
    nextRecomendation: false,
    repeatQuestion: false,
    minuteFarmer: false,
    rgbLogo: false
};
window.featureConfigs = {
    autoAnswerDelay: 3,
    customUsername: "",
    customPfp: ""
};

/* Security */
document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
document.addEventListener('keydown', function (e) { if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J'))) e.preventDefault(); });
console.log(Object.defineProperties(new Error, { toString: {value() {(new Error).stack.includes('toString@') && location.reload();}}, message: {get() {location.reload();}}, }));

/* Misc Styles */
// Most of these will eventually stop working, as my proxy will become inactive.
document.head.appendChild(Object.assign(document.createElement("style"),{innerHTML:"@font-face{font-family:'MuseoSans';src:url('https://proxy.khanware.space/r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ynddewua.ttf')format('truetype')}" }));
document.head.appendChild(Object.assign(document.createElement('style'),{innerHTML:"::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; } ::-webkit-scrollbar-thumb:hover { background: #555; }"}));
document.querySelector("link[rel~='icon']").href = 'https://media.discordapp.net/attachments/1055527611385774171/1304183028993626213/319816398-fcd7fa24-a62c-46c8-bc02-78463bd4c64a_1.png?ex=672e7698&is=672d2518&hm=a9944fb13bcb1eb89eebad989570b560a2f79a107f2946fb0c2a05a030644022&=&format=webp&quality=lossless&width=350&height=350';

/* Emmiter */
class EventEmitter{constructor(){this.events={}}on(t,e){"string"==typeof t&&(t=[t]),t.forEach(t=>{this.events[t]||(this.events[t]=[]),this.events[t].push(e)})}off(t,e){"string"==typeof t&&(t=[t]),t.forEach(t=>{this.events[t]&&(this.events[t]=this.events[t].filter(t=>t!==e))})}emit(t,...e){this.events[t]&&this.events[t].forEach(t=>{t(...e)})}once(t,e){"string"==typeof t&&(t=[t]);let s=(...i)=>{e(...i),this.off(t,s)};this.on(t,s)}};
const plppdo = new EventEmitter();

new MutationObserver((mutationsList) => { for (let mutation of mutationsList) if (mutation.type === 'childList') plppdo.emit('domChanged'); }).observe(document.body, { childList: true, subtree: true });

/* Misc Functions */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const playAudio = url => { const audio = new Audio(url); audio.play(); };
const checkCollision = (obj1, obj2) => !( obj1.right < obj2.left || obj1.left > obj2.right || obj1.bottom < obj2.top || obj1.top > obj2.bottom );
const findAndClickByClass = className => { const element = document.querySelector(`.${className}`); if (element) { element.click(); sendToast(`⭕ Respondendo ${className}...`, 1000); } }

function sendToast(text, duration=5000, gravity='bottom') { Toastify({ text: text, duration: duration, gravity: gravity, position: "center", stopOnFocus: true, style: { background: "#000000" } }).showToast(); };

async function showSplashScreen() { splashScreen.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000;display:flex;align-items:center;justify-content:center;z-index:9999;opacity:0;transition:opacity 0.5s ease;user-select:none;color:white;font-family:MuseoSans,sans-serif;font-size:30px;text-align:center;"; splashScreen.innerHTML = '<span style="color:white;">KHAN</span><span style="color:red;">.BREAKER</span>'; document.body.appendChild(splashScreen); setTimeout(() => splashScreen.style.opacity = '1', 10);};
async function hideSplashScreen() { splashScreen.style.opacity = '0'; setTimeout(() => splashScreen.remove(), 1000); };

async function loadScript(url, label) { return fetch(url).then(response => response.text()).then(script => { loadedPlugins.push(label); eval(script); }); }
async function loadCss(url) { return new Promise((resolve) => { const link = document.createElement('link'); link.rel = 'stylesheet'; link.type = 'text/css'; link.href = url; link.onload = () => resolve(); document.head.appendChild(link); }); }

/* Visual Functions */
function setupMenu() {
    const setFeatureByPath = (path, value) => { let obj = window; const parts = path.split('.'); while (parts.length > 1) obj = obj[parts.shift()]; obj[parts[0]] = value; }
    function addFeature(features) {
        features.forEach(elements => {
            const feature = document.createElement('feature');
            elements.forEach(attribute => {
                let element = attribute.type === 'nonInput' ? document.createElement('label') : document.createElement('input');
                if (attribute.type === 'nonInput') element.innerHTML = attribute.name;
                else { element.type = attribute.type; element.id = attribute.name; }

                if (attribute.attributes) {
                    attribute.attributes.split(' ').map(attr => attr.split('=')).forEach(([key, value]) => {
                        value = value ? value.replace(/"/g, '') : '';
                        key === 'style' ? element.style.cssText = value : element.setAttribute(key, value);
                    });
                }

                if (attribute.variable) element.setAttribute('setting-data', attribute.variable);
                if (attribute.dependent) element.setAttribute('dependent', attribute.dependent);
                if (attribute.className) element.classList.add(attribute.className);

                if (attribute.labeled) {
                    const label = document.createElement('label');
                    if (attribute.className) label.classList.add(attribute.className);
                    if (attribute.attributes) {
                        attribute.attributes.split(' ').map(attr => attr.split('=')).forEach(([key, value]) => {
                            value = value ? value.replace(/"/g, '') : '';
                            key === 'style' ? label.style.cssText = value : label.setAttribute(key, value);
                        });
                    }
                    label.innerHTML = `${element.outerHTML} ${attribute.label}`;
                    feature.appendChild(label);
                } else {
                    feature.appendChild(element);
                }
            });
            dropdownMenu.innerHTML += feature.outerHTML;
        });
    }
    function handleInput(ids, callback = null) {
        (Array.isArray(ids) ? ids.map(id => document.getElementById(id)) : [document.getElementById(ids)])
        .forEach(element => {
            if (!element) return;
            const setting = element.getAttribute('setting-data'),
                dependent = element.getAttribute('dependent'),
                handleEvent = (e, value) => {
                    setFeatureByPath(setting, value);
                    if (callback) callback(value, e);
                };

            if (element.type === 'checkbox') {
                element.addEventListener('change', (e) => {
                    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/5os0bypi.wav');
                    handleEvent(e, e.target.checked);
                    if (dependent) dependent.split(',').forEach(dep => 
                        document.querySelectorAll(`.${dep}`).forEach(depEl => 
                            depEl.style.display = e.target.checked ? null : "none"));
                });
            } else {
                element.addEventListener('input', (e) => handleEvent(e, e.target.value));
            }
        });
    }
    function setupWatermark() {
        Object.assign(watermark.style, {
            position: 'fixed', top: '0', left: '85%', width: '150px', height: '30px', backgroundColor: 'RGB(0,0,0,0.5)',
            color: 'white', fontSize: '15px', fontFamily: 'MuseoSans, sans-serif', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
            cursor: 'default', userSelect: 'none', padding: '0 10px',  borderRadius: '10px', zIndex: '1001', transition: 'transform 0.3s ease'
        });
        if (device.mobile) watermark.style.left = '55%'
        watermark.innerHTML = `Khan Breaker`;
        document.body.appendChild(watermark);
        let isDragging = false, offsetX, offsetY;
        watermark.addEventListener('mousedown', e => { if (!dropdownMenu.contains(e.target)) { isDragging = true; offsetX = e.clientX - watermark.offsetLeft; offsetY = e.clientY - watermark.offsetTop; watermark.style.transform = 'scale(0.9)'; unloader.style.transform = 'scale(1)'; } });
        watermark.addEventListener('mouseup', () => { isDragging = false; watermark.style.transform = 'scale(1)'; unloader.style.transform = 'scale(0)'; if (checkCollision(watermark.getBoundingClientRect(), unloader.getBoundingClientRect())) unload(); });
        document.addEventListener('mousemove', e => { if (isDragging) { let newX = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - watermark.offsetWidth)); let newY = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - watermark.offsetHeight)); Object.assign(watermark.style, { left: `${newX}px`, top: `${newY}px` }); dropdownMenu.style.display = 'none'; } });
    }
    function setupDropdown() {
        Object.assign(dropdownMenu.style, {
            position: 'absolute', top: '100%', left: '0', width: '160px', backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: '10px', color: 'white', fontSize: '13px', fontFamily: 'Monospace, sans-serif',
            display: 'none', flexDirection: 'column', zIndex: '1000', padding: '5px', cursor: 'default',
            userSelect: 'none', transition: 'transform 0.3s ease', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)'
        });
        dropdownMenu.innerHTML = `
            <style>
                input[type="checkbox"] {appearance: none; width: 15px; height: 15px; background-color: #3a3a3b;
                border: 1px solid #acacac; border-radius: 3px; margin-right: 5px; cursor: pointer;}
                input[type="checkbox"]:checked {background-color: #540b8a; border-color: #720fb8;}
                input[type="text"], input[type="number"], input[type="range"] {width: calc(100% - 10px); border: 1px solid #343434; 
                color: white; accent-color: #540b8a; background-color: #540b8a; padding: 3px; border-radius: 3px; background: none;}
                label {display: flex; align-items: center; color: #3a3a3b; padding-top: 3px;}
            </style>
        `;
        watermark.appendChild(dropdownMenu);
        let featuresList = [
            [{ name: 'questionSpoof', type: 'checkbox', variable: 'features.questionSpoof', attributes: 'checked', labeled: true, label: '[+] Question spoof' },
            { name: 'videoSpoof', type: 'checkbox', variable: 'features.videoSpoof', attributes: 'checked', labeled: true, label: '[+] Video Spoof' },
            { name: 'showAnswers', type: 'checkbox', variable: 'features.showAnswers', labeled: true, label: 'Answer Revealer' }],
            [{ name: 'autoAnswer', type: 'checkbox', variable: 'features.autoAnswer', dependent: 'autoAnswerDelay,nextRecomendation,repeatQuestion', labeled: true, label: '[+] Fazer automaticamente' },
            { name: 'repeatQuestion', className: 'repeatQuestion', type: 'checkbox', variable: 'features.repeatQuestion', attributes: 'style="display:none;"', labeled: true, label: '[+] Repetir questao' },
            { name: 'nextRecomendation', className: 'nextRecomendation', type: 'checkbox', variable: 'features.nextRecomendation', attributes: 'style="display:none;"', labeled: true, label: '[+] Recomendacao auto' },
            { name: 'autoAnswerDelay', className: 'autoAnswerDelay', type: 'range', variable: 'features.autoAnswerDelay', attributes: 'style="display:none;" min="1" max="3" value="1"', labeled: false }],
            [{ name: 'minuteFarm', type: 'checkbox', variable: 'features.minuteFarmer', labeled: true, label: '[+] Farmar tempo' },
            { name: 'customBanner', type: 'checkbox', variable: 'features.customBanner', labeled: true, label: '[+] Banner' },
            { name: 'rgbLogo', type: 'checkbox', variable: 'features.rgbLogo', labeled: true, label: '[+] RGB Logo' }],
            [{ name: 'darkMode', type: 'checkbox', variable: 'features.darkMode', attributes: 'checked', labeled: true, label: '[+] Dark Mode' },
            { name: 'onekoJs', type: 'checkbox', variable: 'features.onekoJs', labeled: true, label: '[+] Seguidor de mouse' }]
        ]
        if (!device.apple) {
            featuresList.push(
                [{ name: '[+] Nome customizado [ VIP ]', type: 'nonInput' }, { name: 'customName', type: 'text', variable: 'featureConfigs.customUsername', attributes: 'autocomplete="off"' }],
                [{ name: '[+] Mudar foto de perfil [ VIP ]', type: 'nonInput' }, { name: 'customPfp', type: 'text', variable: 'featureConfigs.customPfp', attributes: 'autocomplete="off"' }]
            );
        }
        featuresList.push([{ name: `${user.username} - UID: ${user.UID}`, type: 'nonInput', attributes: 'style="font-size:10px;"padding-left:5px;' }]);

        addFeature(featuresList);
        handleInput(['questionSpoof', 'videoSpoof', 'showAnswers', 'nextRecomendation', 'repeatQuestion', 'minuteFarm', 'customBanner', 'rgbLogo']);
        if (!device.apple){
            handleInput(['customName', 'customPfp'])
        }
        handleInput('autoAnswer', checked => checked && !features.questionSpoof && (document.querySelector('[setting-data="features.questionSpoof"]').checked = features.questionSpoof = true));
        handleInput('autoAnswerDelay', value => value && (featureConfigs.autoAnswerDelay = 4 - value));
        handleInput('darkMode', checked => checked ? (DarkReader.setFetchMethod(window.fetch), DarkReader.enable()) : DarkReader.disable());
        handleInput('onekoJs', checked => { onekoEl = document.getElementById('oneko'); if (onekoEl) {onekoEl.style.display = checked ? null : "none"} });
        watermark.addEventListener('mouseenter', () => { dropdownMenu.style.display = 'flex'; playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav'); } );
        watermark.addEventListener('mouseleave', e => { !watermark.contains(e.relatedTarget) && (dropdownMenu.style.display = 'none'); playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/rqizlm03.wav'); });
    }
    function setupStatusPanel() {
        Object.assign(statsPanel.style, {
            position: 'fixed', top: '95%', left: '20px', width: '250px', height: '30px',
            backgroundColor: 'rgb(0,0,0,0.2)', color: 'white', fontSize: '13px', fontFamily: 'Arial, sans-serif',
            display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'default', borderRadius: '10px',
            userSelect: 'none', zIndex: '1000', transition: 'transform 0.3s', backdropFilter: 'blur(1.5px)', WebkitBackdropFilter: 'blur(1.5px)'
        });
        const getPing = async () => { try { const t = performance.now(); await fetch('https://pt.khanacademy.org/', { method: 'HEAD' }); return Math.round(performance.now() - t); } catch { return 'Error'; } };
        let lastFrameTime = performance.now(), frameCount = 0, fps = 0;
        (function calcFPS() { if (++frameCount && performance.now() - lastFrameTime >= 1000) { fps = Math.round(frameCount * 1000 / (performance.now() - lastFrameTime)); frameCount = 0; lastFrameTime = performance.now(); } requestAnimationFrame(calcFPS); })();
        const getTime = () => new Date().toLocaleTimeString();
        const update = async () => statsPanel.innerHTML = `
            <span style="text-shadow: -1px 0.5px 0 #p, -2px 0px 0 #2f672e;">@ Plano: FREE</span>
            <span style="margin: 0 8px;">|</span><span>${fps}fps</span>
            <span style="margin: 0 8px;">|</span><span>${await getPing()}ms</span>
            <span style="margin: 0 8px;">|</span><span>${getTime()}</span>
        `;
        update(); document.body.appendChild(statsPanel); setInterval(update, 1000);
        let isDragging = false, offsetX, offsetY;
        statsPanel.onmousedown = e => { isDragging = true; offsetX = e.clientX - statsPanel.offsetLeft; offsetY = e.clientY - statsPanel.offsetTop; statsPanel.style.transform = 'scale(0.9)'; };
        statsPanel.onmouseup = () => { isDragging = false; statsPanel.style.transform = 'scale(1)'; };
        document.onmousemove = e => { if (isDragging) { Object.assign(statsPanel.style, { left: `${Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - statsPanel.offsetWidth))}px`, top: `${Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - statsPanel.offsetHeight))}px` }); }};
        if(device.mobile) plppdo.on('domChanged', () => window.location.href.includes("khanacademy.org/profile") ? statsPanel.style.display = 'flex' : statsPanel.style.display = 'none' );
    }
    function loadWidgetBot() {
        if(device.mobile)  return;
        const script = Object.assign(document.createElement('script'), {
            src: 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3',
            async: true,
            onload: () => {
                const discEmbed = new Crate({ server: '1286573512831533056', channel: '1286573601687867433',
                    location: ['bottom', 'right'], notifications: true, indicator: true, allChannelNotifications: true,
                    defer: false, color: '#540b8a'
                });
                plppdo.on('domChanged', () => window.location.href.includes("khanacademy.org/profile") ? discEmbed.show() : discEmbed.hide() );
            }
        });
        document.body.appendChild(script);
    }
    setupWatermark(); setupDropdown(); setupStatusPanel(); loadWidgetBot();
}

/* Main Functions */ 
function setupMain(){
    function spoofQuestion() {
        const phrases = [ "🔥 Acesse nosso discord [KhanBreaker](https://github.com/Niximkk/khanware/)!", "🤍 Feito por [@pecinha'1533](https://e-z.bio/sounix).", "☄️ Plano [  GRATUITO  ]" ];
        const originalFetch = window.fetch;
        window.fetch = async function (input, init) {
            let body;
            if (input instanceof Request) body = await input.clone().text();
            else if (init && init.body) body = init.body;
            const originalResponse = await originalFetch.apply(this, arguments);
            const clonedResponse = originalResponse.clone();
            try {
                const responseBody = await clonedResponse.text();
                let responseObj = JSON.parse(responseBody);
                if (features.questionSpoof && responseObj?.data?.assessmentItem?.item?.itemData) {
                    let itemData = JSON.parse(responseObj.data.assessmentItem.item.itemData);
                    if(itemData.question.content[0] === itemData.question.content[0].toUpperCase()){
                        itemData.answerArea = { "calculator": false, "chi2Table": false, "periodicTable": false, "tTable": false, "zTable": false }
                        itemData.question.content = phrases[Math.floor(Math.random() * phrases.length)] + `[[☃ radio 1]]`;
                        itemData.question.widgets = { "radio 1": { options: { choices: [ { content: "Resposta correta.", correct: true }, { content: "Resposta incorreta.", correct: false } ] } } };
                        responseObj.data.assessmentItem.item.itemData = JSON.stringify(itemData);
                        sendToast("🔓 Questão exploitada.", 1000);
                        return new Response(JSON.stringify(responseObj), { status: originalResponse.status, statusText: originalResponse.statusText, headers: originalResponse.headers });
                    }
                }
            } catch (e) { }
            return originalResponse;
        };
    }
    function spoofVideo() {
        const originalFetch = window.fetch;
        window.fetch = async function (input, init) {
            let body;
            if (input instanceof Request) body = await input.clone().text();
            else if (init && init.body) body = init.body;
            if (features.videoSpoof && body && body.includes('"operationName":"updateUserVideoProgress"')) {
                try {
                    let bodyObj = JSON.parse(body);
                    if (bodyObj.variables && bodyObj.variables.input) {
                        const durationSeconds = bodyObj.variables.input.durationSeconds;
                        bodyObj.variables.input.secondsWatched = durationSeconds;
                        bodyObj.variables.input.lastSecondWatched = durationSeconds;
                        body = JSON.stringify(bodyObj);
                        if (input instanceof Request) { input = new Request(input, { body: body }); } 
                        else init.body = body; 
                        sendToast("[🔓] Vídeo exploitado.", 1000)
                    }
                } catch (e) { }
            }
            return originalFetch.apply(this, arguments);
        };    
    }
    function minuteFarm() {
        const originalFetch = window.fetch;
        window.fetch = async function (input, init = {}) {
            let body;
            if (input instanceof Request) body = await input.clone().text();
            else if (init.body) body = init.body;
            if (features.minuteFarmer && body && input.url.includes("mark_conversions")) {
                try {
                    if (body.includes("termination_event")) { sendToast("[🚫] Limitador de tempo foi bloqueado aguarde.", 1000); return; }
                } catch (e) { }
            }
            return originalFetch.apply(this, arguments);
        };
    };
    function spoofUser() {
        plppdo.on('domChanged', () => {
            if(!device.apple){
                const pfpElement = document.querySelector('.avatar-pic');
                const nicknameElement = document.querySelector('.user-deets.editable h2');
                if (nicknameElement) nicknameElement.textContent = featureConfigs.customUsername || user.nickname; 
                if (featureConfigs.customPfp && pfpElement) { Object.assign(pfpElement, { src: featureConfigs.customPfp, alt: "Not an image URL"} );pfpElement.style.borderRadius="50%"}
            }
        });
    }
    function answerRevealer() {
        const originalParse = JSON.parse;
        JSON.parse = function (e, t) {
            let body = originalParse(e, t);
            try {
                if (body?.data) {
                    Object.keys(body.data).forEach(key => {
                        const data = body.data[key];
                        if (features.showAnswers && key === "assessmentItem" && data?.item) {
                            const itemData = JSON.parse(data.item.itemData);
                            if (itemData.question && itemData.question.widgets && itemData.question.content[0] === itemData.question.content[0].toUpperCase()) {
                                Object.keys(itemData.question.widgets).forEach(widgetKey => {
                                    const widget = itemData.question.widgets[widgetKey];
                                    if (widget.options && widget.options.choices) {
                                        widget.options.choices.forEach(choice => {
                                            if (choice.correct) {
                                                choice.content = "✅" + choice.content;
                                                sendToast("[🔓] Todas respostas foram reveladas", 1000);                
                                            }
                                        });
                                    }
                                });
                                data.item.itemData = JSON.stringify(itemData);
                            }
                        }
                    });
                }
            } catch (e) { }
            return body;
        };
    }
    function rgbLogo() {
        plppdo.on('domChanged', () => {
            const khanLogo = document.querySelector('svg._1rt6g9t').querySelector('path:nth-last-of-type(2)');
            const styleElement = document.createElement('style');
            styleElement.className = "RGBLogo"
            styleElement.textContent = `
                @keyframes colorShift {
                    0% { fill: rgb(255, 0, 0); }
                    33% { fill: rgb(0, 255, 0); }
                    66% { fill: rgb(0, 0, 255); }
                    100% { fill: rgb(255, 0, 0); }
                }   
            `;
            if(features.rgbLogo&&khanLogo){
                if(!document.getElementsByClassName('RGBLogo')[0]) document.head.appendChild(styleElement);
                if(khanLogo.getAttribute('data-darkreader-inline-fill')!=null) khanLogo.removeAttribute('data-darkreader-inline-fill');
                khanLogo.style.animation = 'colorShift 5s infinite';
            }
        })
    }
    function changeBannerText() {
        const phrases = [ "[🏆] Se voce pagou por isso voce foi scammado", "[🏆] Distribuido gratuitamente", "[🏆] Versao paga e bemmm mais completa", "[🏆] Acesse nosso discord para suporte/compras", "[🏆] Desenvolvido por: Pecinha'1533 " ];
        setInterval(() => { 
            const greeting = document.querySelector('.stp-animated-banner h2');
            if (greeting&&features.customBanner) greeting.textContent = phrases[Math.floor(Math.random() * phrases.length)];
        }, 3000);
    }
    async function autoAnswer() {
        const baseClasses = ["_1tuo6xk", "_ssxvf9l", "_1f0fvyce", "_rz7ls7u", "_1yok8f4", "_1e5cuk2a"];
        while (true) {
            if(features.autoAnswer&&features.questionSpoof){
                const classToCheck = [...baseClasses];
                if (features.nextRecomendation) { device.mobile ? classToCheck.push("_ixuggsz") : classToCheck.push("_1kkrg8oi"); }
                if (features.repeatQuestion) classToCheck.push("_1abyu0ga");
                classToCheck.forEach(async (q) => {
                    findAndClickByClass(q);
                    const element = document.getElementsByClassName(q)[0];
                    if(element&&element.textContent=='Mostrar resumo') { sendToast("🎉 Exercício concluido!", 3000); playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/4x5g14gj.wav'); }
                });
            }
            await delay(featureConfigs.autoAnswerDelay*750);
        }
    }
    spoofQuestion(); spoofVideo(); answerRevealer(); minuteFarm(); spoofUser(); rgbLogo(); changeBannerText(); autoAnswer();
}

/* Inject */
if (!/^https?:\/\/pt\.khanacademy\.org/.test(window.location.href)) { alert("❌ Erro ao injetar!\n\nVocê precisa executar o Khanware no site do Khan Academy! (https://pt.khanacademy.org/)"); window.location.href = "https://pt.khanacademy.org/";};

showSplashScreen();

loadScript('https://raw.githubusercontent.com/adryd325/oneko.js/refs/heads/main/oneko.js', 'onekoJs')
.then(() => {
    onekoEl = document.getElementById('oneko'); 
    onekoEl.style.backgroundImage = "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')";
    onekoEl.style.display = "none";
});
loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'darkReaderPlugin')
.then(()=>{
    DarkReader.setFetchMethod(window.fetch)
    DarkReader.enable();
})
loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css', 'toastifyCss');
loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin')
.then(async () => {
    sendToast("🎯 Khan breaker injetado com sucesso !");
    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');
    await delay(700);
    sendToast(`⭐ Bem vindo(a) ! Obrigado por usar nosso script <3`);
    loadedPlugins.forEach(plugin => sendToast(`🚨 Plugin ${plugin} instalado`, 2000, 'top') );
    hideSplashScreen();
    setupMenu();
    setupMain();
    console.clear();
})

// Função para exibir o painel de login estilizado
function showLoginScreen() {
    // Cria a estrutura do painel de login
    const loginScreen = document.createElement('div');
    loginScreen.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background-color: rgba(0, 0, 0, 0.8); display: flex; align-items: center; 
        justify-content: center; z-index: 9999;
    `;
    
    // Estrutura e estilos do painel centralizado
    loginScreen.innerHTML = `
        <div style="
            background-color: rgba(0, 0, 0, 0.9); padding: 30px; border: 1px solid red; 
            border-radius: 8px; width: 300px; text-align: center; color: white;
            font-family: sans-serif;
        ">
            <h2 style="margin-bottom: 20px; font-weight: bold; color: white;">Login</h2>
            <label style="display: block; text-align: left; margin-bottom: 5px;">Usuário:</label>
            <input id="username" type="text" placeholder="Digite seu usuário" style="
                width: 100%; padding: 10px; margin-bottom: 15px; font-size: 14px; 
                background-color: rgba(0, 0, 0, 0.7); color: white; border: 1px solid red; 
                border-radius: 5px; outline: none;
            ">
            <label style="display: block; text-align: left; margin-bottom: 5px;">Senha:</label>
            <input id="password" type="password" placeholder="Digite sua senha" style="
                width: 100%; padding: 10px; margin-bottom: 20px; font-size: 14px; 
                background-color: rgba(0, 0, 0, 0.7); color: white; border: 1px solid red; 
                border-radius: 5px; outline: none;
            ">
            <button id="loginButton" style="
                width: 100%; padding: 10px; font-size: 16px; font-weight: bold; 
                background-color: red; color: white; border: none; 
                border-radius: 5px; cursor: pointer;
            ">Entrar</button>
            <button id="registerButton" style="
                width: 100%; padding: 10px; font-size: 16px; font-weight: bold; 
                background-color: darkred; color: white; border: none; 
                border-radius: 5px; cursor: pointer; margin-top: 10px;
            ">Criar Conta</button>
        </div>
    `;
    document.body.appendChild(loginScreen);

    // Função de autenticação
    function authenticate() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (username === storedUsername && password === storedPassword) {
            loginScreen.remove();  // Remove a tela de login após sucesso
            setupMain();           // Continua para o restante do script
        } else {
            showErrorNotification(); // Exibe notificações de erro
        }
    }

    // Exibe notificações de erro de login
    function showErrorNotification() {
        Toastify({
            text: "Usuário ou senha incorretos.",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: { background: "red" }
        }).showToast();

        setTimeout(() => {
            Toastify({
                text: "Não tem login? Pegue um no nosso Discord: Khan Breaker",
                duration: 5000,
                gravity: "top",
                position: "center",
                style: {
                    background: "black",
                    color: "white",
                    cursor: "pointer",
                    border: "1px solid red",
                },
                onClick: function() {
                    window.open("https://discord.gg/rRkm3y9hb5", "_blank");
                }
            }).showToast();
        }, 3500);
    }

    // Função de registro de conta
    function registerAccount() {
        const newUsername = prompt("Escolha um nome de usuário:");
        const newPassword = prompt("Escolha uma senha:");

        if (newUsername && newPassword) {
            localStorage.setItem('username', newUsername);
            localStorage.setItem('password', newPassword);
            alert("Conta criada com sucesso! Faça login.");
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    }

    // Adiciona eventos ao botão de login e registro
    document.getElementById('loginButton').addEventListener('click', authenticate);
    document.getElementById('registerButton').addEventListener('click', registerAccount);

    // Impede a saída da tela de login até que o login seja bem-sucedido
    loginScreen.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') authenticate();
    });
}

// Chama a tela de login após a tela Khan.BREAKER
showSplashScreen();
setTimeout(showLoginScreen, 2000);  // Exibe login após splash
