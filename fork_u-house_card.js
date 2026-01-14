/**
 * Fork_U-House_Card v11.0 (AI Storyteller Edition)
 * * FEATURE: Long, descriptive, "AI-like" status messages with context & reasoning.
 * * FEATURE: Pollen support restored & integrated into advice logic.
 * * FEATURE: Wind Chill logic (Wind + Cold temp = specific advice).
 * * VISUALS: Prism Classic (Stars, Fog, No-Glow Rain) + Gaming Ambient Mode.
 */

const TRANSLATIONS = {
    en: {
        loading: "Analyzing environmental data...",
        home_median: "Home Avg",
        
        // Conditions
        clear_night: "Clear Night", cloudy: "Cloudy", fog: "Fog", hail: "Hail",
        lightning: "Thunderstorm", lightning_rainy: "Thunderstorm & Rain",
        partlycloudy: "Partly Cloudy", pouring: "Pouring Rain", rainy: "Rainy",
        snowy: "Snowy", sunny: "Sunny", windy: "Windy",
        
        // --- AI NARRATIVES ---
        
        // 1. DANGER / STORM
        alert_storm: "⚠️ CRITICAL ALERT: A storm with lightning is active nearby. Strong winds and heavy rain are expected. Please secure loose objects outside and stay indoors for safety.",
        
        // 2. HEALTH (AQI / POLLEN)
        alert_aqi_bad: "😷 SMOG ALERT: Air quality is critical (PM2.5: {val}). Prolonged exposure is dangerous. Keep windows closed and run your air purifier.",
        alert_aqi_mod: "😶 AIR QUALITY WARNING: PM2.5 levels are elevated ({val}). Sensitive groups should limit outdoor exertion today.",
        alert_pollen: "🤧 ALLERGY ALERT: High pollen concentration detected. If you suffer from allergies, keep windows shut and have your medication ready.",
        
        // 3. FORECAST (FUTURE RAIN/SNOW)
        advice_rain_soon: "☂️ PLAN AHEAD: Rain is approaching and expected around {time} (approx. {val} mm). Don't leave without an umbrella.",
        advice_snow_soon: "❄️ WINTER ALERT: Snowfall is expected around {time}. Road conditions may deteriorate rapidly. Drive with caution.",
        
        // 4. CURRENT WEATHER
        advice_rain_now: "🌧️ CURRENTLY RAINING: Intensity is {val} mm/h. Wet surfaces and reduced visibility. Drive safely and wear waterproof gear.",
        advice_snow_now: "🌨️ SNOWING: Snow is falling right now. Enjoy the view, but dress warmly if you head out.",
        
        // 5. UV / SUN
        alert_uv_high: "☀️ HIGH UV RADIATION: The UV Index is {val}. Unprotected skin can burn quickly. Use sunscreen and wear sunglasses if you go out.",
        
        // 6. TEMPERATURE + WIND (Wind Chill)
        advice_cold_wind: "🥶 WIND CHILL WARNING: It's {val}°C, but the strong wind makes it feel much colder. Wear windproof layers and a hat.",
        advice_cold: "🧣 COLD WEATHER: Outside temperature is {val}°C. It's chilly—make sure to zip up your jacket and keep warm.",
        
        advice_hot: "🔥 HEAT ADVISORY: Temperatures have reached {val}°C. Avoid strenuous activity in direct sunlight and drink plenty of water.",
        advice_nice: "😎 COMFORTABLE CONDITIONS: Weather is stable at {val}°C with moderate wind. Great time for a walk or airing out the house.",
        
        advice_gaming: "🎮 GAMING MODE: Immersive lighting active. Notifications silenced.",
    },
    pl: {
        loading: "Analizuję dane środowiskowe...",
        home_median: "Dom",
        
        // Warunki
        clear_night: "Bezchmurnie", cloudy: "Pochmurno", fog: "Mgła", hail: "Grad",
        lightning: "Burza", lightning_rainy: "Burza z deszczem",
        partlycloudy: "Częściowe zachm.", pouring: "Ulewa", rainy: "Deszcz",
        snowy: "Śnieg", sunny: "Słonecznie", windy: "Wietrznie",
        
        // --- AI NARRACJA ---
        
        // 1. ZAGROŻENIE
        alert_storm: "⚠️ OSTRZEŻENIE KRYTYCZNE: W pobliżu wykryto burzę. Spodziewaj się wyładowań i silnego wiatru. Zabezpiecz przedmioty na zewnątrz i pozostań w domu.",
        
        // 2. ZDROWIE (SMOG / PYŁKI)
        alert_aqi_bad: "😷 ALARM SMOGOWY: Jakość powietrza jest fatalna (PM2.5: {val}). Wyjście na zewnątrz grozi problemami oddechowymi. Zamknij okna i włącz oczyszczacz.",
        alert_aqi_mod: "😶 OSTRZEŻENIE: Podwyższone stężenie pyłów (PM2.5: {val}). Jakość powietrza jest przeciętna. Osoby wrażliwe powinny unikać wysiłku na zewnątrz.",
        alert_pollen: "🤧 ALARM DLA ALERGIKÓW: Wykryto bardzo wysokie stężenie pyłków. Przygotuj leki przeciwhistaminowe i unikaj wietrzenia sypialni.",
        
        // 3. PROGNOZA (NADCHODZĄCE)
        advice_rain_soon: "☂️ PLANUJ Z WYPRZEDZENIEM: Nadciągają opady deszczu. Spodziewaj się ich ok. godziny {time} (prognozowane {val} mm). Weź parasol.",
        advice_snow_soon: "❄️ OSTRZEŻENIE ZIMOWE: Ok. godziny {time} zacznie padać śnieg. Warunki drogowe mogą się gwałtownie pogorszyć. Zachowaj ostrożność.",
        
        // 4. AKTUALNA POGODA
        advice_rain_now: "🌧️ PADA DESZCZ: Aktualny opad to {val} mm. Jest mokro i ślisko. Jeśli musisz wyjść, koniecznie weź kurtkę przeciwdeszczową.",
        advice_snow_now: "🌨️ PADA ŚNIEG: Na zewnątrz sypie śnieg. Jest malowniczo, ale pamiętaj o ciepłym ubraniu i czapce.",
        
        // 5. UV
        alert_uv_high: "☀️ WYSOKIE PROMIENIOWANIE: Indeks UV wynosi {val}. Skóra może ulec poparzeniu. Koniecznie użyj kremu z filtrem i okularów przeciwsłonecznych.",
        
        // 6. TEMPERATURA + WIATR
        advice_cold_wind: "🥶 CZYNNIK WIATRU: Jest {val}°C, ale silny wiatr sprawia, że temperatura odczuwalna jest znacznie niższa. Ubierz się „na cebulkę” i chroń uszy.",
        advice_cold: "🧣 JEST ZIMNO: Temperatura wynosi {val}°C. Zalecam ciepłą kurtkę przed wyjściem. Warto też sprawdzić, czy okna są szczelne.",
        
        advice_hot: "🔥 FALA CIEPŁA: Temperatura osiągnęła {val}°C. Unikaj słońca w godzinach szczytu, pij dużo wody i zasłoń rolety, aby nie nagrzewać domu.",
        advice_nice: "😎 DOBRE WARUNKI: Pogoda jest stabilna, temperatura przyjemna ({val}°C). To idealny moment na spacer lub przewietrzenie mieszkania.",
        
        advice_gaming: "🎮 GAMING MODE: Tryb immersyjny aktywny. Powiadomienia wyciszone.",
    }
};

class ForkUHouseCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._hass = null;
      this._config = {};
      this._animationFrame = null;
      this._canvas = null;
      this._ctx = null;
      this._resizeObserver = null;
      
      // Visuals
      this._particles = []; 
      this._clouds = [];
      this._stars = [];
      this._fogParticles = [];
      
      // Lightning
      this._lightningTimer = 0;
      this._flashOpacity = 0;
      this._lightningBolt = null;
    }
  
    static getStubConfig() {
      return {
        language: "pl",
        image: "/local/community/fork-u-house-card/images/autumn_day.jpg",
        
        // Entities
        weather_entity: "weather.forecast_home",
        sun_entity: "sun.sun",
        cloud_coverage_entity: "sensor.openweathermap_cloud_coverage",
        party_mode_entity: "input_boolean.gaming_mode",  // enables gaming ambient
        
        // AI Sensors
        aqi_entity: "sensor.waqi_pm2_5", 
        pollen_entity: "sensor.pollen_level", // Returns: 'High', 'Moderate', or number
        uv_entity: "sensor.uv_index",
        wind_speed_entity: "sensor.wind_speed",
        wind_direction_entity: "sensor.wind_bearing",

        rooms: [{ name: "Salon", entity: "sensor.salon_temp", x: 50, y: 50, weight: 1 }]
      };
    }
  
    setConfig(config) {
      if (!config.rooms || !Array.isArray(config.rooms)) throw new Error("Missing 'rooms' list.");
      this._config = config;
      this._lang = config.language || 'en';
      this._render();
    }
  
    set hass(hass) {
      this._hass = hass;
      this._updateData();
    }

    _t(key, repl = {}) {
        let txt = TRANSLATIONS[this._lang]?.[key] || TRANSLATIONS['en'][key] || key;
        Object.keys(repl).forEach(k => { txt = txt.replace(`{${k}}`, repl[k]); });
        return txt;
    }
  
    connectedCallback() {
      if (this.shadowRoot && !this._resizeObserver) {
          const card = this.shadowRoot.querySelector('.card');
          if (card) {
              this._resizeObserver = new ResizeObserver(() => this._resizeCanvas());
              this._resizeObserver.observe(card);
          }
      }
    }
  
    disconnectedCallback() {
      if (this._resizeObserver) this._resizeObserver.disconnect();
      if (this._animationFrame) cancelAnimationFrame(this._animationFrame);
    }
  
    // --- DATA LOGIC ---
    _updateData() {
      if (!this._hass || !this.shadowRoot.querySelector('.card')) return;
  
      // Rooms & Median
      const roomsData = this._config.rooms.map(r => {
        const s = this._hass.states[r.entity];
        const v = s ? parseFloat(s.state) : null;
        return { ...r, value: v, valid: !isNaN(v) };
      });
      
      const weighted = roomsData.filter(r => r.valid && (r.weight === undefined || r.weight > 0)).map(r => r.value).sort((a,b)=>a-b);
      let median = 0;
      if (weighted.length > 0) {
        const mid = Math.floor(weighted.length/2);
        median = weighted.length % 2 !== 0 ? weighted[mid] : (weighted[mid-1]+weighted[mid])/2;
      }
  
      // Updates
      this._updateBadges(roomsData);
      this._handleGamingMode();
      this._handleDayNight();
      this._generateAIStatus(median);
  
      // Animation Loop
      if (!this._animationFrame && this._canvas) {
        this._initStars();
        this._animate();
      }
    }
  
    _updateBadges(rooms) {
      const container = this.shadowRoot.querySelector('.badges-layer');
      if (!container) return;
      container.innerHTML = rooms.map(room => {
        if (!room.valid) return '';
        const top = room.y ?? 50; const left = room.x ?? 50;
        const colorClass = this._getTempColorClass(room.value);
        return `
          <div class="badge ${colorClass}" style="top: ${top}%; left: ${left}%;">
            <div class="badge-dot"></div>
            <div class="badge-content">
              <span class="badge-name">${room.name}</span>
              <span class="badge-val">${room.value.toFixed(1)}°</span>
            </div>
          </div>`;
      }).join('');
    }
    
    _getTempColorClass(t) {
      if (t < 19) return 'is-cold'; if (t < 23) return 'is-optimal'; if (t < 25) return 'is-warm'; return 'is-hot';
    }

    _handleGamingMode() {
        const partyEntity = this._config.party_mode_entity;
        const isGaming = partyEntity && this._hass.states[partyEntity]?.state === 'on';
        const card = this.shadowRoot.querySelector('.card');
        if (card) {
            isGaming ? card.classList.add('gaming-active') : card.classList.remove('gaming-active');
        }
        return isGaming;
    }

    _handleDayNight() {
        const sunEnt = this._config.sun_entity || 'sun.sun';
        const isNight = this._hass.states[sunEnt]?.state === 'below_horizon';
        const dimLayer = this.shadowRoot.querySelector('.dim-layer');
        if (dimLayer) dimLayer.style.opacity = isNight ? '0.5' : '0';
        return isNight;
    }

    // --- AI STATUS LOGIC (Detailed & Explained) ---
    _generateAIStatus(median) {
        const wObj = this._hass.states[this._config.weather_entity];
        if (!wObj) return;

        const condition = this._config.test_weather_state || wObj.state;
        const temp = wObj.attributes.temperature;
        const forecast = wObj.attributes.forecast || [];
        
        // Sensory
        const aqiVal = this._getStateVal(this._config.aqi_entity);
        const uvVal = this._getStateVal(this._config.uv_entity);
        const { speed: windSpeed } = this._getWindData();
        
        // Pollen Logic
        let isHighPollen = false;
        if (this._config.pollen_entity) {
            const pState = this._hass.states[this._config.pollen_entity]?.state;
            if (pState) {
                // Obsługa tekstowa (high) lub liczbowa (>50)
                if (['high', 'very_high', 'extreme', 'red'].includes(pState.toLowerCase())) isHighPollen = true;
                if (!isNaN(parseFloat(pState)) && parseFloat(pState) > 50) isHighPollen = true;
            }
        }

        let msg = "";
        let level = "normal";

        // Check for Gaming Mode
        const isGaming = this._handleGamingMode();

        // --- HIERARCHIA WAŻNOŚCI ---
        
        // 1. ZAGROŻENIE ŻYCIA (Burze)
        if (['lightning', 'lightning-rainy', 'hail'].includes(condition)) {
            msg = this._t('alert_storm'); 
            level = "danger";
        }
        // 2. ZDROWIE: SMOG
        else if (aqiVal !== null && aqiVal > 50) {
             if (aqiVal > 100) {
                 msg = this._t('alert_aqi_bad', {val: aqiVal});
                 level = "danger";
             } else {
                 msg = this._t('alert_aqi_mod', {val: aqiVal});
                 level = "warn";
             }
        }
        // 3. ZDROWIE: PYŁKI
        else if (isHighPollen) {
            msg = this._t('alert_pollen');
            level = "warn";
        }
        // 4. PLANOWANIE: NADCHODZĄCY DESZCZ/ŚNIEG
        else {
            const nextRain = forecast.slice(0, 3).find(f => ['rainy', 'pouring', 'snowy'].includes(f.condition) || (f.precipitation > 0));
            
            // Jeśli ma padać w ciągu 3h
            if (nextRain) {
                const time = new Date(nextRain.datetime).getHours() + ":00";
                const p = nextRain.precipitation || "~";
                msg = nextRain.condition === 'snowy' 
                    ? this._t('advice_snow_soon', {time}) 
                    : this._t('advice_rain_soon', {time, val: p});
                level = "warn";
            }
            // 5. BIEŻĄCE WARUNKI
            else if (['rainy', 'pouring'].includes(condition)) {
                msg = this._t('advice_rain_now', {val: wObj.attributes.precipitation || "~"}); 
                level = "warn";
            }
            else if (['snowy', 'snowy-rainy'].includes(condition)) {
                msg = this._t('advice_snow_now'); 
                level = "warn";
            }
            // 6. UV (LATO)
            else if (uvVal !== null && uvVal > 6) {
                msg = this._t('alert_uv_high', {val: uvVal}); 
                level = "warn";
            }
            // 7. TEMPERATURA + WIATR (ZIMA)
            else if (temp < 10 && windSpeed > 20) {
                // Jest zimno i wieje - Wind Chill
                msg = this._t('advice_cold_wind', {val: temp});
            }
            else if (temp < 5) {
                msg = this._t('advice_cold', {val: temp});
            } else if (temp > 28) {
                msg = this._t('advice_hot', {val: temp}); 
                level = "warn";
            } 
            // 8. STABILNIE
            else {
                msg = this._t('advice_nice', {val: temp});
            }
        }
        
        // Append Gaming status
        if (isGaming && level === 'normal') {
            msg = this._t('advice_gaming');
        }

        const medianEl = this.shadowRoot.querySelector('.median-pill');
        const statusEl = this.shadowRoot.querySelector('.footer-content');
        const footer = this.shadowRoot.querySelector('.footer');

        if (medianEl) medianEl.innerHTML = `${this._t('home_median')}: <b>${median.toFixed(1)}°C</b>`;
        if (statusEl) statusEl.innerHTML = msg;
        if (footer) footer.setAttribute('data-status', level);
    }

    _getStateVal(id) {
        if (!id || !this._hass.states[id]) return null;
        const v = parseFloat(this._hass.states[id].state);
        return isNaN(v) ? null : v;
    }

    _getWindData() {
        let speed = 10, bearing = 270;
        if(this._config.wind_speed_entity && this._hass.states[this._config.wind_speed_entity]) 
            speed = parseFloat(this._hass.states[this._config.wind_speed_entity].state);
        else if(this._hass.states[this._config.weather_entity]?.attributes?.wind_speed) 
            speed = parseFloat(this._hass.states[this._config.weather_entity].attributes.wind_speed);

        if(this._config.wind_direction_entity && this._hass.states[this._config.wind_direction_entity]) 
            bearing = parseFloat(this._hass.states[this._config.wind_direction_entity].state);
        else if(this._hass.states[this._config.weather_entity]?.attributes?.wind_bearing) 
            bearing = parseFloat(this._hass.states[this._config.weather_entity].attributes.wind_bearing);
            
        return { speed: isNaN(speed)?5:speed, bearing: isNaN(bearing)?270:bearing };
    }

    _getCloudCoverage() {
        const cloudEnt = this._config.cloud_coverage_entity;
        if (cloudEnt && this._hass.states[cloudEnt]) {
            const val = parseFloat(this._hass.states[cloudEnt].state);
            return isNaN(val) ? 0 : val;
        }
        return 0;
    }

    // --- RENDER (Prism Classic + Gaming Ambient) ---
    _render() {
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: block; --fork-u-bg: #1e2024; --color-cold: #60A5FA; --color-opt: #34D399; --color-warm: #FBBF24; --color-hot: #F87171; }
          .card {
              position: relative; display: flex; flex-direction: column; width: 100%; height: 350px;
              overflow: hidden;
              text-shadow: var(--primary-background-color) 0 1px 0px;
              /* Please style borders and box shadow manually */
              /*
              background: var(--fork-u-bg);
              border-radius: 20px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.3); 
              font-family: 'Roboto', sans-serif;
              border: 1px solid rgba(255,255,255,0.1);
              */
              background: var(--card-background-color,--fork-u-bg);
              border-radius: var(--ha-card-border-radius,var(--ha-border-radius-lg,20px));
              clip-path: inset(0 0 0 0 round var(--ha-card-border-radius,var(--ha-border-radius-lg,20px)));
          }
          
          .bg-image {
              position: absolute; top: 0; left: 0; width: 100%; height: 100%;
              background-image: url('${this._config.image}'); background-size: cover; background-position: center;
              z-index: 0; transition: all 0.5s ease;
          }
          .dim-layer {
              position: absolute; top: 0; left: 0; width: 100%; height: 100%;
              background: #000; opacity: 0; z-index: 1; pointer-events: none; transition: opacity 2s ease;
          }
          
          /* GAMING AMBIENT LAYER */
          .ambient-layer {
              position: absolute; top: 0; left: 0; width: 100%; height: 100%;
              z-index: 2; pointer-events: none; opacity: 0; transition: opacity 1.5s ease;
          }
          .card.gaming-active .ambient-layer { opacity: 1; }
          
          .ambient-light {
             position: absolute; border-radius: 50%; filter: blur(70px);
             mix-blend-mode: color-dodge; animation-iteration-count: infinite; animation-timing-function: ease-in-out;
          }
          .blob-1 { top: 20%; left: 10%; width: 300px; height: 300px; background: radial-gradient(circle, rgba(120,50,255,0.8) 0%, rgba(0,0,0,0) 70%); animation: float-1 6s infinite alternate; }
          .blob-2 { bottom: 10%; right: 10%; width: 350px; height: 350px; background: radial-gradient(circle, rgba(255,0,150,0.7) 0%, rgba(0,0,0,0) 70%); animation: float-2 7s infinite alternate; }
          .blob-3 { top: 40%; left: 40%; width: 250px; height: 250px; background: radial-gradient(circle, rgba(0,255,255,0.5) 0%, rgba(0,0,0,0) 70%); animation: pulse-3 5s infinite; mix-blend-mode: overlay; }

          @keyframes float-1 { 0% { transform: translate(0,0) scale(1); opacity: 0.7; } 100% { transform: translate(20px, 30px) scale(1.1); opacity: 0.9; } }
          @keyframes float-2 { 0% { transform: translate(0,0) scale(1); opacity: 0.6; } 100% { transform: translate(-30px, -20px) scale(1.15); opacity: 0.8; } }
          @keyframes pulse-3 { 0% { transform: scale(0.9); opacity: 0.4; } 50% { transform: scale(1.2); opacity: 0.7; } 100% { transform: scale(0.9); opacity: 0.4; } }

          canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 3; }
          
          .badges-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 5; pointer-events: none; }
          .badge {
              position: absolute; transform: translate(-50%, -50%);
              background: rgba(20, 20, 25, 0.75); backdrop-filter: blur(8px);
              border: 1px solid rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 16px;
              display: flex; align-items: center; gap: 8px; pointer-events: auto; box-shadow: 0 4px 8px rgba(0,0,0,0.4);
          }
          .badge-dot { width: 8px; height: 8px; border-radius: 50%; }
          .is-cold .badge-dot { background: var(--color-cold); box-shadow: 0 0 5px var(--color-cold); }
          .is-optimal .badge-dot { background: var(--color-opt); box-shadow: 0 0 5px var(--color-opt); }
          .is-warm .badge-dot { background: var(--color-warm); box-shadow: 0 0 5px var(--color-warm); }
          .is-hot .badge-dot { background: var(--color-hot); box-shadow: 0 0 5px var(--color-hot); }
          .badge-content { display: flex; flex-direction: column; line-height: 1; }
          .badge-name { font-size: 0.55rem; color: #aaa; text-transform: uppercase; margin-bottom: 2px; }
          .badge-val { font-size: 0.80rem; font-weight: 700; color: #fff; }
          
          .footer {
              position: absolute; bottom: 0; left: 0; width: 100%; z-index: 5;
              background: rgba(10, 10, 15, 0.25); backdrop-filter: blur(15px);
              border-top: 1px solid rgba(255,255,255,0.1); padding: 12px 16px;
              display: flex; align-items: center; gap: 12px; box-sizing: border-box; transition: background 0.3s;
              min-height: 60px; /* Space for multi-line text */
          }
          .footer[data-status="warn"] { background: rgba(80, 50, 10, 0.65); border-top-color: var(--color-warm); }
          .footer[data-status="danger"] { background: rgba(80, 20, 20, 0.65); border-top-color: var(--color-hot); }
          
          .median-pill { background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 6px; font-size: 0.8rem; color: #ddd; white-space: nowrap; flex-shrink: 0; align-self: flex-start; margin-top: 2px;}
          .median-pill b { color: #fff; }
          
          /* Allow multi-line text for verbose AI messages */
          .footer-content { 
              font-size: 0.85rem; color: #ccc; 
              white-space: normal; line-height: 1.4; 
              display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
          }
        </style>
        <div class="card">
          <div class="bg-image"></div>
          <div class="dim-layer"></div>
          <div class="ambient-layer">
              <div class="ambient-light blob-1"></div>
              <div class="ambient-light blob-2"></div>
              <div class="ambient-light blob-3"></div>
          </div>
          <canvas id="weatherCanvas"></canvas>
          <div class="badges-layer"></div>
          <div class="footer" data-status="normal">
              <div class="median-pill">Dom: --</div>
              <div class="footer-content">${this._t('loading')}</div>
          </div>
        </div>
      `;
      this._canvas = this.shadowRoot.getElementById('weatherCanvas');
      this._ctx = this._canvas.getContext('2d');
      setTimeout(() => this._resizeCanvas(), 100);
      this.connectedCallback();
    }
  
    _resizeCanvas() {
      if (!this._canvas) return;
      const card = this.shadowRoot.querySelector('.card');
      if (card) { this._canvas.width = card.clientWidth; this._canvas.height = card.clientHeight; }
    }

    // --- ANIMATIONS ---
    _initStars() {
        this._stars = [];
        for (let i = 0; i < 60; i++) {
            this._stars.push({
                x: Math.random() * (this._canvas ? this._canvas.width : 300),
                y: Math.random() * (this._canvas ? this._canvas.height : 200),
                size: Math.random() * 1.5, opacity: Math.random(), speed: 0.01 + Math.random() * 0.02
            });
        }
    }

    _animate() {
      if (!this._ctx) return;
      
      const wEnt = this._config.weather_entity;
      let wState = this._config.test_weather_state || (wEnt ? this._hass.states[wEnt]?.state : "");
      const { speed, bearing } = this._getWindData();
      const windDirX = (bearing > 180 || bearing < 0) ? 1 : -1;
      let moveSpeed = speed / 15; if (moveSpeed < 0.2) moveSpeed = 0.2; if (moveSpeed > 6) moveSpeed = 6;
      
      const sunEnt = this._config.sun_entity || 'sun.sun';
      const isNight = this._hass.states[sunEnt]?.state === 'below_horizon';
      const coverage = this._getCloudCoverage();

      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

      if (isNight) this._drawStars(coverage);
      if (wState === 'fog' || (isNight && ['rainy','cloudy'].includes(wState))) this._drawFog(moveSpeed);

      if ((wState && !['clear-night','sunny'].includes(wState)) || coverage > 20) {
         let density = 1; if(coverage>50) density=1.5; if(coverage>80) density=2;
         this._drawClouds(windDirX, moveSpeed, density);
      }
      if (['rainy','pouring','lightning','lightning-rainy'].includes(wState)) {
          this._drawRain(wState === 'pouring' ? 2 : 1, windDirX, moveSpeed);
      } else if (['snowy','snowy-rainy'].includes(wState)) {
          this._drawSnow(windDirX, moveSpeed);
      } 
      if (['lightning','lightning-rainy'].includes(wState) || wState === 'lightning') this._handleLightning();
      
      if (this._flashOpacity > 0) {
          this._ctx.fillStyle = `rgba(255, 255, 255, ${this._flashOpacity})`;
          this._ctx.fillRect(0,0, this._canvas.width, this._canvas.height);
          this._flashOpacity -= 0.05;
      }

      this._animationFrame = requestAnimationFrame(() => this._animate());
    }

    _drawStars(coverage) {
        const visibility = Math.max(0, 1 - (coverage / 80)); 
        if (visibility <= 0) return;
        this._ctx.fillStyle = "#FFF";
        this._stars.forEach(star => {
            this._ctx.globalAlpha = Math.abs(Math.sin(Date.now() * 0.001 * star.speed + star.x)) * star.opacity * visibility;
            this._ctx.beginPath();
            this._ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this._ctx.fill();
        });
        this._ctx.globalAlpha = 1.0;
    }

    _drawFog(speed) {
        // FIXED: Organic Fog (Puffs) instead of Rectangular Bar
        if (this._fogParticles.length < 10) {
            this._fogParticles.push({
                x: Math.random() * this._canvas.width,
                y: this._canvas.height - (Math.random() * 50),
                radius: 50 + Math.random() * 50,
                speed: (Math.random() * 0.2) + 0.05
            });
        }
        
        this._fogParticles.forEach(f => {
            f.x += f.speed * (speed * 0.5);
            if (f.x > this._canvas.width + 100) f.x = -100;
            
            const g = this._ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
            g.addColorStop(0, 'rgba(200, 200, 210, 0.15)');
            g.addColorStop(1, 'rgba(200, 200, 210, 0)');
            
            this._ctx.fillStyle = g;
            this._ctx.beginPath();
            this._ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
            this._ctx.fill();
        });
    }

    _drawClouds(dirX, baseSpeed, density) {
        const target = Math.floor(5 * density);
        if (this._clouds.length < target) {
             const newCloud = this._createCloud(false); newCloud.x = dirX > 0 ? -200 : this._canvas.width + 200;
             this._clouds.push(newCloud);
        }
        if (this._clouds.length > target) this._clouds.pop();
        this._clouds.forEach((cloud, index) => {
            cloud.x += baseSpeed * 0.3 * dirX; 
            if ((dirX > 0 && cloud.x > this._canvas.width + 200) || (dirX < 0 && cloud.x < -200)) { this._clouds.splice(index, 1); return; }
            this._ctx.save(); this._ctx.translate(cloud.x, cloud.y); this._ctx.scale(cloud.scale, cloud.scale);
            cloud.puffs.forEach(puff => {
                const gradient = this._ctx.createRadialGradient(puff.xOffset, puff.yOffset, 0, puff.xOffset, puff.yOffset, puff.radius);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${puff.opacity * 0.8})`); gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                this._ctx.fillStyle = gradient; this._ctx.beginPath(); this._ctx.arc(puff.xOffset, puff.yOffset, puff.radius, 0, Math.PI * 2); this._ctx.fill();
            });
            this._ctx.restore();
        });
    }
    _createCloud(randomX) {
        const puffs = []; const numPuffs = 4 + Math.floor(Math.random() * 4); const cloudWidth = 100 + Math.random() * 80;
        for (let j = 0; j < numPuffs; j++) puffs.push({ xOffset: (Math.random() * cloudWidth) - (cloudWidth/2), yOffset: (Math.random() * 30) - 15, radius: 25 + Math.random() * 20, opacity: 0.1 + Math.random() * 0.2 });
        return { x: randomX ? Math.random() * (this._canvas ? this._canvas.width : 300) : -150, y: Math.random() * 100, scale: 0.8 + Math.random() * 0.4, puffs: puffs };
    }

    _drawRain(intensity, windDirX, windSpeed) {
      if (this._particles.length < 150 * intensity) this._particles.push({ x: Math.random() * this._canvas.width, y: -20, speed: 15 + windSpeed, length: 15 + Math.random() * 10 });
      this._ctx.strokeStyle = 'rgba(174, 194, 224, 0.6)'; this._ctx.lineWidth = 1; this._ctx.beginPath();
      const angleX = windDirX * (windSpeed * 1.5);
      for (let i = 0; i < this._particles.length; i++) {
          const p = this._particles[i];
          this._ctx.moveTo(p.x, p.y); this._ctx.lineTo(p.x + angleX, p.y + p.length);
          p.y += p.speed; p.x += angleX;
          if (p.y > this._canvas.height || p.x > this._canvas.width + 50 || p.x < -50) { this._particles.splice(i, 1); i--; }
      }
      this._ctx.stroke();
    }

    _drawSnow(windDirX, windSpeed) {
      if (this._particles.length < 100) this._particles.push({ x: Math.random() * this._canvas.width, y: -10, speed: 1 + Math.random(), radius: 1.5 + Math.random() });
      this._ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; this._ctx.beginPath();
      for (let i = 0; i < this._particles.length; i++) {
          const p = this._particles[i];
          this._ctx.moveTo(p.x, p.y); this._ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          p.y += p.speed; p.x += (Math.sin(p.y * 0.03) * 0.5) + (windDirX * windSpeed * 0.5);
          if (p.y > this._canvas.height || p.x > this._canvas.width + 50 || p.x < -50) { this._particles.splice(i, 1); i--; }
      }
      this._ctx.fill();
    }
    
    _handleLightning() {
        this._lightningTimer++;
        if (this._lightningTimer > 200 && Math.random() > 0.98) { this._triggerLightning(); this._lightningTimer = 0; }
        if (this._lightningBolt && this._lightningBolt.life > 0) { this._drawBolt(this._lightningBolt); this._lightningBolt.life--; }
    }
    _triggerLightning() {
        const startX = Math.random() * this._canvas.width; const path = [{x: startX, y: 0}]; let currX = startX, currY = 0;
        while(currY < this._canvas.height * 0.8) { currY += Math.random() * 40 + 20; currX += (Math.random() * 60) - 30; path.push({x: currX, y: currY}); }
        this._lightningBolt = { path, life: 10 }; this._flashOpacity = 0.5;
    }
    _drawBolt(bolt) {
        this._ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'; this._ctx.lineWidth = 2; this._ctx.beginPath();
        this._ctx.moveTo(bolt.path[0].x, bolt.path[0].y); for(let p of bolt.path) this._ctx.lineTo(p.x, p.y); this._ctx.stroke();
    }
  }
  
  customElements.define('fork-u-house-card', ForkUHouseCard);
  window.customCards = window.customCards || [];
  window.customCards.push({ type: "fork-u-house-card", name: "Fork U-House Card V11.0", description: "AI Storyteller Edition" });
