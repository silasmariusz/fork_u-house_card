# 🏠 Fork U-House Card

## REQUIRED: 
1. Add `season.season` in integrations.
2. Add `sun.sun` sensor in integrations.
3. Using Google's API, add UV index and pollen sensors (google for this, it's free anyway).
4. You will need also from Google AQI sensors ;)
5. Add Google Weather or OpenWeatherMap integration - both are free (even if asked to add credit card for OpenWeatherAPI - just use a virtual card like Revolut and close it after).
   *If you have an old OpenWeatherMap API added before 2025 it may not report additional attributes (don't know if I'm right but had this issue).*
   
**NOTE:** Wind direction sensor is mandatory for cloud animation direction movement!

I know it's a lot, but if you don't use them then you did not unlock secret items. The journey will start now ;)

![msedge_bNu5APEUJq](https://github.com/user-attachments/assets/8405dc20-4e71-4588-a56a-044292b8ab87)

An advanced, glassmorphism-styled Home Assistant Lovelace card designed for monitoring home climate, weather conditions, and environmental hazards.

**Temperature monitoring, smart AI weather advice, and immersive visual effects.**

"Fork U" means I DON'T FCKING CARE, you have to mod this card as you need. (Weather effects based on Prism).

## 🤖 How Images Are Generated

House images are generated in OpenAI/Gemini with prompt:

```text
I am attaching reference photos of the house and a satellite view from Google Maps. The plot must be drawn isometrically in a video game style (e.g., Sim City or The Sims) but with a modern 2026 aesthetic. Below are the rules that must be strictly followed:

High resolution.

Dynamic point lighting.

Depth and strong contrasting shading.

The plot on which the house stands has a bottom layer in a glassmorphism style, and only on top of that is the soil layer depicting the scenery (for winter do not draw grass, only snow; for summer draw a manicured lawn; for spring draw spring grass with a small amount of spring flowers; for autumn, scatter a moderate amount of yellow-orange-brown autumn leaves on the grass).

Solid background #121212, easy to cut out.

Never draw anything outside the plot or on the background.

A delicate shadow of the plot extending slightly beyond it, but very minimal; the same applies to any weather variants—do not go outside the plot boundaries!

No solar panels on the roof.

The car is a black BMW X1, black gloss, light reflections on the car.

The car is facing the entrance gate.

Driveway and back of the house: concrete/pavement/slabs.

Specifications of variants and their rules depending on weather conditions:

Cloudless sky: Plot highly illuminated by golden sun rays.

Partly cloudy.

Overcast and gloomy.

Heavy rain: Draw a downpour in front of the house on the plot - always use light reflections, point lights reflecting on the plot.

Snowing: Draw intense snowfall in front of the house on the plot - always use light reflections, point lights reflecting on the plot.

Thunderstorms: Do not draw lightning bolts, but draw the house strongly overexposed by lightning flashes like in cartoons, low light source, visible tree shadows at a very low angle.

Fog: Draw fog, a delicate cloud, or slight smoke in front of the house and next to the car, but gently, suggesting fog.

Important: If night is generated, always apply a blue-dark navy-grey color variant to the plot suggesting night, turn on lights inside the house, and illuminate the driveway near the thujas where the car is parked.

NOW GENERATING:

Winter, Night, Snowing


Additionally:

Draw an igloo on the plot, a snowman draped with colorful fairy lights (light reflections), and Santa Claus sliding down the roof.
```

## ✨ Features

* **🧠 AI Smart Advisor:** A "storyteller" logic that analyzes forecast, wind, UV, AQI, and pollen data to provide human-readable, contextual advice (e.g., *"Wind Chill Warning: It's 5°C but feels like -2°C due to strong winds"*).
* **🌦️ Prism Weather Engine:**
    * **Rain/Snow:** Elegant, non-intrusive particle animations (Prism Classic style).
    * **Stars:** Automatically appear at night when the sky is clear.
    * **Fog:** Organic fog puffs appear during foggy weather or rainy nights.
    * **Clouds:** Dynamic cloud density based on the `cloud_coverage` entity.
    * **Wind Physics:** Clouds and rain/snow change direction and speed based on real wind sensor data.
* **🌗 Day/Night Cycle:** The house image dims automatically at night to match your dashboard's theme.
* **🎮 Gaming Ambient Mode:** A toggleable immersive mode that overlays soft, floating ambient lights (Magenta/Cyan/Purple) over the house image.
* **🌡️ Room Badges:** Positionable temperature badges for specific rooms overlaid on your house image.
* **🌍 Multi-language:** Built-in support for **English** and **Polish** (configurable).

## 📥 Installation

### Option 1: HACS (Recommended)

1.  Open **HACS** in Home Assistant.
2.  Go to **Frontend** > **Custom repositories** (top right menu).
3.  Add the URL of this repository.
4.  Select category: **Lovelace**.
5.  Click **Add** and then **Download**.
6.  Reload your resources/browser.

### Option 2: Manual

1.  Download `fork-u-house-card.js` from the latest release.
2.  Upload it to your Home Assistant `config/www/` directory.
3.  Add the resource in your Dashboard configuration:
    * URL: `/local/fork-u-house-card.js`
    * Type: `JavaScript Module`

## ⚙️ Configuration

Add the following to your Dashboard YAML configuration.

**Note:** You must upload a photo of your house (preferably with a transparent background or a dark sky) to your `www` folder.

```yaml
type: custom:fork-u-house-card
title: "My Residence" # Optional title (visual only)
language: "en"        # Options: 'en', 'pl'

img_winter_day_fog: true    # will look for winter_fog_day.png
img_winter_night_fog: false # will not look for winter_night_fog.png and fallback to winter_day.png
# remember to do the same for summer, winter, autumn, spring

# also please note xmas starts 14 dec to 14 jan
# remember to provide winter_xmas_day.png i winter_xmas_night.png 

# use test to check animations effects:
test_weather_state: fog # cloud, lightning, snowy, rainy, ...

# --- Core Entities --- REQUIRED
weather_entity: weather.forecast_home
season_entity: sensor.season
sun_entity: sun.sun
cloud_coverage_entity: sensor.openweathermap_cloud_coverage # Optional (0-100%)

# --- Feature Switches ---
party_mode_entity: input_boolean.gaming_mode  # Toggles the "Gaming Ambient" lights

# --- Environmental Sensors (For AI Logic) ---
# If you don't have specific sensors, you can leave them empty, 
# but AI advice will be less detailed.
aqi_entity: sensor.waqi_pm2_5           # Air Quality (PM2.5)
pollen_entity: sensor.pollen_level      # Pollen (High/Moderate or number)
uv_entity: sensor.uv_index              # UV Index
wind_speed_entity: sensor.wind_speed    # Wind Speed (km/h)
wind_direction_entity: sensor.wind_bearing # Wind Bearing (degrees)
precipitation_entity: sensor.openweathermap_rain_intensity # Current rain rate (mm/h), shown in the rain advice

# --- Rooms Configuration ---
# Define temperature sensors to display as badges over the house image.
# x: Horizontal position % (0 = left, 100 = right)
# y: Vertical position % (0 = top, 100 = bottom)
# weight: 1 = Include in "Home Average" calculation, 0 = Exclude (e.g. attic/basement)
rooms:
  - name: "Living Room"
    entity: sensor.living_room_temperature
    x: 50
    y: 70
    weight: 1

  - name: "Bedroom"
    entity: sensor.bedroom_temperature
    x: 20
    y: 30
    weight: 1

  - name: "Attic"
    entity: sensor.attic_temperature
    x: 50
    y: 10

    weight: 0
```

## 🖼️ Image Generation Workflow

### 🚀 Easy Generation with Google Colab (Recommended)

Generate all required house assets for free using Google's cloud infrastructure and the Gemini API. No installation required on your computer.

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/silasmariusz/fork_u-house_card/blob/main/colab_generator/generate_house_assets.ipynb)

**Steps:**
1. Click the **Open in Colab** button above.
2. Get a free API Key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3. Upload photos of your house when prompted.
4. Run the notebook (select `gemini-2.5-flash-image` for **Free Tier** generation).

---

### Local Generation (Advanced)

For automated or semi-automated generation using **Gemini 3 Pro** locally, use the `image_generation/` folder and the `generate_house_images.py` script.

### Required Output Files (42 images)

| Category | Count | Examples |
|---|---|---|
| Base | 8 | `winter_day.png`, `summer_night.png`, ... |
| Weather | 32 | `winter_rainy_day.png`, `summer_fog_night.png`, ... |
| Xmas | 2 | `winter_xmas_day.png`, `winter_xmas_night.png` |

### Workflow

1. **Reference Images** – Place photos of your house in `image_generation/reference/` (Street View, Satellite).
2. **Master** – Generate the master reference image (Summer, Day, Sunny) and save as `image_generation/master/_master_reference.png`.
3. **Variants** – Run the script (`python generate_house_images.py`) or use `--export-prompts` to export prompts for manual use in [Gemini](https://gemini.google.com).
4. **Results** – Copy `image_generation/output/*.png` to `images/` (or `www/` in Home Assistant).

Details: [image_generation/README.md](image_generation/README.md)


## Note for me (reddit questions) answer:

To be honest this is only the one thing fine I was looking for years and finally it was even coded by AI. I did my changes ofcourse and fixes

First I used google street view to take screenshot of my house The Google Maps satellite view to capture roof of my house

I used only free version of Gemini and asked to generate me Sims4 and Sim City like but modern 3d isometric asset of my home in weather and season condition: xxxxx

Where xxx is winter/autumn/spring/summer (add season integration in ha first) Where xxx also contains day and night to generate lights on from the window rooms (you need night shade sensor or use sun sensor from integration) Basically at this step you don’t need to do EXTRAS!!!! I recommend to do this after a week after fine tuning ;). Go to CONTINUE part

EXTRAS generate above with fog using clouds around house for each season and day/night, also rainy useful for spring time and autumn with orange/brown 🍂🍁 around the house

EXTRA2: ask for Xmas season fun things like add Santa snowing from the roof, penguins and iglo on front of your house

EXTRA3: immersive mode, kids birthdays: asked to do synthwave colors, reflection, kid playing on sofa with a gamepad controller, flying Delorin from Back to the Future with lights on and big screen for my kiddo

CONTINUE You are almost done. Download your graphics and move now to free ChatGPT, create a prompt: Asked Gemini with PROMPT written bellow to generate images of my house, but the resolution is too low. (Prompt you used) and that’s all (attach images from Gemini)

You have graphics now. Nice.

Fork my repo on GitHub! Necessary because would be nice if you could edit text strings to much your requirements. If you are newbie use GitHub by web to fork and later to edit files and commit changes - seriously super easy.

https://github.com/silasmariusz/fork_u-house_card

Enjoy


# **🚀 AI ASSET GENERATOR**
> [!TIP]
> 
> You don't need to manually create 40+ images! 
> We have created a **Free AI Tool** that generates all weather, season, and day/night variants for you in minutes.
> 
> [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/silasmariusz/fork_u-house_card/blob/main/colab_generator/generate_house_assets.ipynb) <br> *(Click above to start generating for free!)*
>
> Howto:
> ![ezgif-84e148d15543d035](https://github.com/user-attachments/assets/97116b93-1bc0-44ff-9ddd-b01cb8389c41)
>
> Result:
> <img width="1344" height="768" alt="winter_lightning_day" src="https://github.com/user-attachments/assets/26b3a9fa-f3ad-48c3-9ec6-ea43631a1614" />
>
> Source data (google maps, and streatview)
> <img width="646" height="349" alt="roof" src="https://github.com/user-attachments/assets/5029ba36-28d9-4630-8d0a-cd20161ad65e" />
![optional](https://github.com/user-attachments/assets/c6e87b26-6a0a-4e23-b5ea-b67d547e5c3e)
![ang3](https://github.com/user-attachments/assets/ccdf5ff7-f45f-4761-a081-9e5d279f9381)
![ang2](https://github.com/user-attachments/assets/02c2b669-5126-41c8-9b81-3aa998973e4f)
![ang1](https://github.com/user-attachments/assets/30630e89-f732-4a04-8e5a-631dcc8be960)


