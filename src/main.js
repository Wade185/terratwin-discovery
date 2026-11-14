
import './style.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// ==========================================
// TERRATWIN DISCOVERY
// NASADEM TERRAIN INTEGRATION
// PROJECT TERRA LUNA 2K26
// ==========================================

const BASE = import.meta.env.BASE_URL

const sites = {
  ladakh: {
    id: 'TT-002',
    name: 'Ladakh',
    country: 'India',
    region: 'Himalayan region',
    type: 'High-altitude mountainous terrain',
    coordinates: [34.15, 77.58],
    description: 'A high-altitude Himalayan environment investigated for terrain characterization, rover mobility research and planetary analogue studies.',
    research: 'Rover mobility and rugged terrain',
    question: 'How do robotic exploration systems navigate complex mountainous terrain?'
  },

  atacama: {
    id: 'TT-001',
    name: 'Atacama Desert',
    country: 'Chile',
    region: 'South America',
    type: 'Hyper-arid desert',
    coordinates: [-23.65, -69.25],
    description: 'An exceptionally dry environment relevant to research into arid planetary conditions.',
    research: 'Dry-environment technology testing',
    question: 'How do exploration systems operate in extremely dry environments?'
  },

  hawaii: {
    id: 'TT-003',
    name: 'Hawaiian Basalt',
    country: 'United States',
    region: 'Hawaii',
    type: 'Volcanic basalt landscape',
    coordinates: [19.42, -155.29],
    description: 'A volcanic environment with basaltic materials relevant to geological instrument research.',
    research: 'Volcanic geology and instrument testing',
    question: 'How can instruments identify and study basaltic materials?'
  }
}

// ==========================================
// APPLICATION INTERFACE
// ==========================================

document.querySelector('#app').innerHTML = `

<header class="site-header">
  <a class="brand" href="#home">
    <span class="brand-mark">T</span>
    <span class="brand-copy">
      <strong>TERRATWIN</strong>
      <small>PLANETARY ANALOGUE DISCOVERY</small>
    </span>
  </a>

  <nav class="main-nav">
    <a class="nav-active" href="#home">Overview</a>
    <a href="#explorer">Research Explorer</a>
    <a href="#passport">Analogue Passports</a>
    <a href="#data">Data Observatory</a>
  </nav>

  <div class="header-status">
    <span class="status-dot"></span>
    RESEARCH SYSTEM
  </div>
</header>

<main id="home">

  <section class="hero">
    <div class="hero-content">

      <div class="hero-kicker">
        <span></span> EARTH OBSERVATION / PLANETARY SCIENCE
      </div>

      <h1>
        Earth is our laboratory.<br>
        <span>Other worlds are our frontier.</span>
      </h1>

      <p class="hero-description">
        Discover and investigate terrestrial environments that can help
        researchers test technologies and study conditions relevant to
        future lunar and Martian exploration.
      </p>

      <div class="hero-actions">
        <a class="primary-action" href="#explorer">
          ENTER RESEARCH EXPLORER ↗
        </a>

        <a class="secondary-action" href="#data">
          EXPLORE DATA SOURCES
        </a>
      </div>

      <div class="hero-footnote">
        AN OPEN-DATA PLANETARY ANALOGUE RESEARCH INITIATIVE
      </div>

    </div>

    <div class="hero-coordinate">
      <span>MISSION DOMAIN</span>
      <strong>EARTH → MOON → MARS</strong>
      <small>PROJECT TERRA LUNA 2K26</small>
    </div>
  </section>

  <section class="search-section">

    <div class="search-heading">
      <div>
        <span class="eyebrow">RESEARCH DATABASE</span>
        <h2>What are you investigating?</h2>
        <p>Search candidate environments and research themes.</p>
      </div>

      <span class="database-label">EXPLORER / 001</span>
    </div>

    <form id="search-form" class="search-bar">
      <span class="search-symbol">⌕</span>

      <input
        id="site-search"
        type="search"
        placeholder="Search locations, terrain or geology..."
      >

      <button type="submit">SEARCH ↗</button>
    </form>

    <div class="search-filters">
      <span>EXPLORE BY:</span>
      <a href="#explorer" data-filter="all">All environments</a>
      <a href="#explorer" data-filter="desert">Desert</a>
      <a href="#explorer" data-filter="mountain">Mountain terrain</a>
      <a href="#explorer" data-filter="volcanic">Volcanic geology</a>
    </div>

  </section>

  <section class="explorer-section" id="explorer">

    <div class="section-heading">
      <div>
        <span class="eyebrow">01 / GLOBAL FIELD INTELLIGENCE</span>
        <h2>Earth Research Explorer</h2>
        <p>Explore preliminary terrestrial candidate environments.</p>
      </div>
      <span class="section-index">INTERACTIVE GEOGRAPHY</span>
    </div>

    <div class="explorer-layout">

      <div class="map-frame">

        <div class="map-toolbar">
          <span><i class="live-indicator"></i> GLOBAL LOCATION VIEW</span>
          <span>OPENSTREETMAP BASEMAP</span>
        </div>

        <div id="earth-map"></div>

        <div class="map-caption">
          <span>EARTH / FIELD LOCATIONS</span>
          <span>SELECT A MARKER TO INVESTIGATE</span>
        </div>

      </div>

      <aside class="location-panel">

        <div class="panel-heading">
          <span class="eyebrow">FIELD DIRECTORY</span>
          <span class="record-count">03 RECORDS</span>
        </div>

        <h3>Candidate environments</h3>

        <p class="panel-intro">
          Select a location to inspect its research profile.
        </p>

        <div class="location-list">

          <button class="location-item active" data-site="ladakh">
            <span class="location-number">01</span>
            <span class="location-copy">
              <strong>Ladakh</strong>
              <small>India · Mountain terrain</small>
            </span>
            <span class="location-arrow">↗</span>
          </button>

          <button class="location-item" data-site="atacama">
            <span class="location-number">02</span>
            <span class="location-copy">
              <strong>Atacama Desert</strong>
              <small>Chile · Arid environment</small>
            </span>
            <span class="location-arrow">↗</span>
          </button>

          <button class="location-item" data-site="hawaii">
            <span class="location-number">03</span>
            <span class="location-copy">
              <strong>Hawaiian Basalt</strong>
              <small>USA · Volcanic terrain</small>
            </span>
            <span class="location-arrow">↗</span>
          </button>

        </div>

        <div class="selected-location" id="site-info">
          <span class="eyebrow">SELECTED FIELD SITE</span>
          <h4>Ladakh</h4>
          <p>India · Himalayan region</p>
          <span class="candidate-status">PRELIMINARY CANDIDATE</span>
        </div>

      </aside>
    </div>
  </section>

  <section class="mission-section">

    <div class="section-heading">
      <div>
        <span class="eyebrow">02 / RESEARCH CONFIGURATION</span>
        <h2>Define your investigation</h2>
        <p>Choose a planetary destination and research objective.</p>
      </div>
      <span class="section-index">MISSION PARAMETERS</span>
    </div>

    <div class="mission-panel">

      <div class="mission-field">
        <label for="world">TARGET WORLD</label>
        <select id="world">
          <option value="Moon">The Moon</option>
          <option value="Mars">Mars</option>
        </select>
      </div>

      <div class="mission-field">
        <label for="objective">RESEARCH OBJECTIVE</label>
        <select id="objective">
          <option>Rover mobility</option>
          <option>Geological research</option>
          <option>Habitat technology testing</option>
          <option>Terrain characterization</option>
        </select>
      </div>

      <button id="prepare-research" class="prepare-button">
        PREPARE INVESTIGATION ↗
      </button>

    </div>

    <div id="research-result" class="research-result">
      <span class="result-symbol">◎</span>
      <div>
        <strong>Awaiting research configuration</strong>
        <p>Select a target world and research objective.</p>
      </div>
    </div>

  </section>

  <section class="passport-section" id="passport">

    <div class="section-heading">
      <div>
        <span class="eyebrow">03 / FIELD RESEARCH RECORD</span>
        <h2>Analogue Passport</h2>
        <p>A structured scientific record for candidate environments.</p>
      </div>
      <span class="section-index">FIELD RECORD / 001</span>
    </div>

    <div class="passport-card">

      <div class="passport-top">
        <div>
          <span class="eyebrow" id="passport-country">INDIA / EARTH</span>
          <h3 id="passport-name">Ladakh</h3>
          <p id="passport-type">High-altitude mountainous terrain</p>
        </div>

        <div class="passport-id">
          <small>FIELD IDENTIFIER</small>
          <strong id="passport-id">TT-002</strong>
        </div>
      </div>

      <div class="passport-description" id="passport-description">
        Loading research profile...
      </div>

      <!-- REAL TERRAIN METRICS -->

      <div class="metric-grid">

        <article class="metric-card">
          <span>01 / MEAN ELEVATION</span>
          <strong id="metric-elevation">Loading</strong>
          <small id="metric-elevation-note">NASADEM</small>
        </article>

        <article class="metric-card">
          <span>02 / MEAN SLOPE</span>
          <strong id="metric-slope">Loading</strong>
          <small id="metric-slope-note">NASADEM derived analysis</small>
        </article>

        <article class="metric-card">
          <span>03 / LOCAL RELIEF</span>
          <strong id="metric-ruggedness">Loading</strong>
          <small id="metric-ruggedness-note">3 × 3 neighbourhood</small>
        </article>

        <article class="metric-card">
          <span>04 / COMPARISON</span>
          <strong id="passport-world">Moon</strong>
          <small id="planetary-dataset">LOLA data not connected</small>
        </article>

      </div>

      <!-- NASADEM ELEVATION VISUALIZATION -->

      <div class="terrain-visual" style="
        margin-top:30px;
        padding:20px;
        background:#101a29;
        border:1px solid rgba(255,255,255,.12);
        border-radius:12px;
      ">

        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          flex-wrap:wrap;
          gap:10px;
          margin-bottom:16px;
        ">
          <div>
            <span class="eyebrow">SATELLITE-DERIVED TERRAIN</span>
            <h3 style="margin-top:8px;color:white">
              Ladakh Elevation Model
            </h3>
          </div>

          <span id="terrain-image-status"
            style="color:#7ee0b0;font-size:11px">
            NASADEM VISUALIZATION
          </span>
        </div>

        <img
          id="terrain-elevation-image"
          src="${BASE}ladakh_elevation_map.png"
          alt="NASADEM-derived elevation visualization of Ladakh"
          loading="lazy"
          style="
            display:block;
            width:100%;
            max-height:540px;
            object-fit:contain;
            background:#080d16;
            border-radius:8px;
          "
        >

        <div style="
          display:flex;
          flex-wrap:wrap;
          justify-content:space-between;
          gap:12px;
          margin-top:16px;
          color:#aebdce;
          font-size:12px;
        ">
          <span>WEST: 77.000° E</span>
          <span>EAST: 78.500° E</span>
          <span>SOUTH: 33.500° N</span>
          <span>NORTH: 35.000° N</span>
        </div>

        <p style="
          color:#9baabd;
          font-size:12px;
          line-height:1.7;
          margin-top:14px;
        ">
          Elevation visualization generated from the downloaded NASADEM
          digital elevation model. Geographic coverage is approximately
          1.5° × 1.5°. The displayed image is a processed visualization,
          not a live satellite feed.
        </p>

      </div>

      <!-- DATASET INFORMATION -->

      <div style="
        margin-top:24px;
        padding:20px;
        background:rgba(30,110,160,.08);
        border:1px solid rgba(100,170,220,.2);
        border-radius:10px;
      ">

        <span class="eyebrow">DATASET METADATA</span>

        <div class="evidence-row">
          <span>Elevation dataset</span>
          <strong>NASADEM</strong>
        </div>

        <div class="evidence-row">
          <span>Coordinate reference system</span>
          <strong>EPSG:4326</strong>
        </div>

        <div class="evidence-row">
          <span>Raster dimensions</span>
          <strong>5400 × 5400 pixels</strong>
        </div>

        <div class="evidence-row">
          <span>Valid elevation samples</span>
          <strong>29,160,000</strong>
        </div>

        <div class="evidence-row">
          <span>Elevation range</span>
          <strong>2,918–7,647 m</strong>
        </div>

        <div class="evidence-row">
          <span>Terrain analysis method</span>
          <strong>3 × 3 neighbourhood</strong>
        </div>

        <div class="evidence-row">
          <span>Valid analysis pixels</span>
          <strong>29,138,404</strong>
        </div>

      </div>

      <div class="research-direction">
        <span class="eyebrow">POTENTIAL RESEARCH DIRECTION</span>
        <h4 id="passport-research">Rover mobility and rugged terrain</h4>
        <p id="passport-question">
          How do robotic exploration systems navigate complex terrain?
        </p>
      </div>

      <div class="evidence-panel">

        <div class="evidence-heading">
          <h4>Evidence and validation</h4>
          <span id="validation-status">EARTH DATA LOADING</span>
        </div>

        <div class="evidence-row">
          <span>Earth elevation measurements</span>
          <strong id="elevation-evidence">Loading</strong>
        </div>

        <div class="evidence-row">
          <span>Earth slope measurements</span>
          <strong id="slope-evidence">Loading</strong>
        </div>

        <div class="evidence-row">
          <span>Planetary elevation measurements</span>
          <strong>Not connected</strong>
        </div>

        <div class="evidence-row">
          <span>Compatible measurements</span>
          <strong>Not calculated</strong>
        </div>

        <div class="evidence-row">
          <span>Analogue suitability</span>
          <strong>Not assessed</strong>
        </div>

      </div>

      <p class="science-note">
        SCIENTIFIC LIMITATION / A terrestrial environment is not
        automatically equivalent to a planetary surface. Comparisons
        require compatible datasets, documented methods and uncertainty
        analysis. Earth measurements alone cannot establish analogue
        suitability.
      </p>

    </div>
  </section>

  <section class="data-section" id="data">

    <div class="section-heading">
      <div>
        <span class="eyebrow">04 / OPEN SCIENCE INFRASTRUCTURE</span>
        <h2>Data Observatory</h2>
        <p>Scientific datasets used or planned for the research pipeline.</p>
      </div>
      <span class="section-index">DATA CATALOGUE</span>
    </div>

    <div class="data-grid">

      <article class="data-card">
        <span class="data-number">EARTH / 001</span>
        <div class="data-icon">⊕</div>
        <h3>NASADEM</h3>
        <p>Earth elevation data used for the Ladakh terrain characterization.</p>
        <a href="https://earthdata.nasa.gov/data/catalog"
          target="_blank" rel="noreferrer">
          NASA EARTHDATA ↗
        </a>
      </article>

      <article class="data-card">
        <span class="data-number">MARS / 002</span>
        <div class="data-icon">◉</div>
        <h3>MOLA</h3>
        <p>Mars Orbiter Laser Altimeter data for future Martian topographic comparison.</p>
        <a href="https://pds-geosciences.wustl.edu/"
          target="_blank" rel="noreferrer">
          PDS GEOSCIENCES ↗
        </a>
      </article>

      <article class="data-card">
        <span class="data-number">MOON / 003</span>
        <div class="data-icon">◐</div>
        <h3>LOLA</h3>
        <p>Lunar elevation measurements for future lunar terrain comparison.</p>
        <a href="https://pds-geosciences.wustl.edu/"
          target="_blank" rel="noreferrer">
          PDS GEOSCIENCES ↗
        </a>
      </article>

    </div>
  </section>

  <section class="integrity-banner">
    <span>!</span>
    <div>
      <strong>Scientific integrity is part of the system.</strong>
      <p>
        This prototype characterizes an Earth terrain dataset.
        Planetary comparison and validated analogue suitability
        scores have not yet been calculated.
      </p>
    </div>
  </section>

</main>

<footer class="site-footer">
  <div>
    <strong>TERRATWIN DISCOVERY</strong>
    <span>PROJECT TERRA LUNA 2K26</span>
  </div>
  <p>EARTH OBSERVATION · OPEN DATA · PLANETARY EXPLORATION</p>
</footer>
`

// ==========================================
// NASADEM DATA LOADER
// ==========================================

let nasaTerrain = null
let nasaSlope = null

async function loadNASADEM() {

  const status = document.querySelector('#validation-status')

  try {

    status.textContent = 'LOADING NASADEM DATA'

    const [terrainResponse, slopeResponse] = await Promise.all([
      fetch(`${BASE}ladakh_terrain_stats.json`),
      fetch(`${BASE}ladakh_slope_stats.json`)
    ])

    if (!terrainResponse.ok) {
      throw new Error('Could not load elevation statistics')
    }

    if (!slopeResponse.ok) {
      throw new Error('Could not load slope statistics')
    }

    const [terrain, slope] = await Promise.all([
      terrainResponse.json(),
      slopeResponse.json()
    ])

    nasaTerrain = terrain
    nasaSlope = slope

    updateTerrainPassport()

    status.textContent = 'EARTH DATA LOADED'

    console.log('TERRATWIN NASADEM DATA')
    console.log('Elevation statistics:', nasaTerrain)
    console.log('Slope statistics:', nasaSlope)

  } catch (error) {

    console.error('NASADEM loading error:', error)

    status.textContent = 'DATA LOADING ERROR'

    document.querySelector('#metric-elevation').textContent = 'Unavailable'
    document.querySelector('#metric-slope').textContent = 'Unavailable'
    document.querySelector('#metric-ruggedness').textContent = 'Unavailable'

  }
}

// ==========================================
// TERRAIN PASSPORT UPDATE
// ==========================================


// ==========================================
// INTERACTIVE EARTH MAP
// ==========================================

const map = L.map('earth-map', {
  preferCanvas: true,
  zoomControl: true,
  minZoom: 2,
  maxZoom: 18,
  worldCopyJump: true
}).setView([20, 10], 2)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 18,
  updateWhenIdle: true,
  updateWhenZooming: false,
  keepBuffer: 2
}).addTo(map)

// ==========================================
// LOCATION SELECTION
// ==========================================

let selectedSite = 'ladakh'

function selectSite(key, fly = true) {
  const site = sites[key]

  if (!site) return

  selectedSite = key

  if (fly) {
    map.flyTo(site.coordinates, 6, {
      duration: 1
    })
  }

  document.querySelectorAll('.location-item').forEach(button => {
    button.classList.toggle(
      'active',
      button.dataset.site === key
    )
  })

  document.querySelector('#site-info').innerHTML = `
    <span class="eyebrow">SELECTED FIELD SITE</span>
    <h4>${site.name}</h4>
    <p>${site.country} · ${site.region}</p>
    <span class="candidate-status">PRELIMINARY CANDIDATE</span>
  `

  document.querySelector('#passport-country').textContent =
    `${site.country.toUpperCase()} / EARTH`

  document.querySelector('#passport-name').textContent =
    site.name

  document.querySelector('#passport-type').textContent =
    site.type

  document.querySelector('#passport-id').textContent =
    site.id

  document.querySelector('#passport-description').textContent =
    site.description

  document.querySelector('#passport-research').textContent =
    site.research

  document.querySelector('#passport-question').textContent =
    site.question

  updateTerrainPassport()
}

// ==========================================
// LOCATION BUTTON EVENTS
// ==========================================

document.querySelectorAll('.location-item').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.site

    selectSite(key)

    if (markers[key]) {
      markers[key].openPopup()
    }
  })
})

// ==========================================
// RESEARCH CONFIGURATION
// ==========================================

document.querySelector('#prepare-research').addEventListener('click', () => {
  const world = document.querySelector('#world').value
  const objective = document.querySelector('#objective').value
  const site = sites[selectedSite]

  document.querySelector('#passport-world').textContent = world

  document.querySelector('#planetary-dataset').textContent =
    world === 'Moon'
      ? 'LOLA data not connected'
      : 'MOLA data not connected'

  document.querySelector('#research-result').innerHTML = `
    <span class="result-symbol">◎</span>
    <div>
      <strong>Investigation configuration prepared</strong>
      <p>
        Target: ${world} · Objective: ${objective} ·
        Candidate: ${site.name}.
        Planetary comparison requires additional datasets.
      </p>
    </div>
  `
})

// ==========================================
// SEARCH SYSTEM
// ==========================================

document.querySelector('#search-form').addEventListener('submit', event => {
  event.preventDefault()

  const query = document.querySelector('#site-search').value
    .trim()
    .toLowerCase()

  if (!query) {
    document.querySelector('#site-search').focus()
    return
  }

  const match = Object.entries(sites).find(([key, site]) =>
    `${site.name} ${site.country} ${site.type} ${site.research}`
      .toLowerCase()
      .includes(query)
  )

  if (match) {
    selectSite(match[0])

    markers[match[0]].openPopup()

    document.querySelector('#explorer').scrollIntoView({
      behavior: 'smooth'
    })
  } else {
    document.querySelector('#research-result').innerHTML = `
      <span class="result-symbol">?</span>
      <div>
        <strong>No matching candidate found</strong>
        <p>
          Try Ladakh, Atacama, Hawaii, mountain, desert or volcanic.
        </p>
      </div>
    `
  }
})

// ==========================================
// SEARCH FILTERS
// ==========================================

document.querySelectorAll('[data-filter]').forEach(link => {
  link.addEventListener('click', () => {
    const filter = link.dataset.filter

    const keys = {
      all: 'ladakh',
      desert: 'atacama',
      mountain: 'ladakh',
      volcanic: 'hawaii'
    }

    selectSite(keys[filter])
  })
})

// ==========================================
// INITIALIZATION
// ==========================================

selectSite('ladakh', false)

loadNASADEM()

window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    map.invalidateSize()
  })
})

console.log('====================================')
console.log('TERRATWIN DISCOVERY INITIALIZED')
console.log('PROJECT TERRA LUNA 2K26')
console.log('NASADEM INTEGRATION ENABLED')
console.log('====================================')
