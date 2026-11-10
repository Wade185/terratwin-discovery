import './style.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import {
  analyzeTerrain,
  demoElevationGrid
} from './terrain.js'

// ==========================================
// TERRATWIN TERRAIN ANALYSIS ENGINE
// ==========================================

// These are demonstration values, NOT NASA measurements.
const terrainResults = analyzeTerrain(demoElevationGrid)

console.log('TERRATWIN TERRAIN ANALYSIS - DEMO DATA')
console.table(terrainResults)

// ==========================================
// CANDIDATE ENVIRONMENTS
// ==========================================

const sites = {
  atacama: {
    id: 'TT-001',
    name: 'Atacama Desert',
    country: 'Chile',
    region: 'South America',
    type: 'Hyper-arid desert',
    coordinates: [-23.65, -69.25],
    description: 'An exceptionally dry environment of interest for studying instruments and technologies in arid conditions.',
    research: 'Dry-environment technology testing',
    question: 'How do exploration systems operate in extremely dry environments?'
  },

  ladakh: {
    id: 'TT-002',
    name: 'Ladakh',
    country: 'India',
    region: 'Himalayan region',
    type: 'High-altitude mountainous terrain',
    coordinates: [34.15, 77.58],
    description: 'A high-altitude region with varied mountainous terrain that may support field robotics and mobility research.',
    research: 'Rover mobility and rugged terrain',
    question: 'How do robotic systems navigate complex rocky terrain?'
  },

  hawaii: {
    id: 'TT-003',
    name: 'Hawaiian Basalt',
    country: 'United States',
    region: 'Hawaii',
    type: 'Volcanic basalt landscape',
    coordinates: [19.42, -155.29],
    description: 'A volcanic landscape with basaltic materials that may support geological instrument research.',
    research: 'Volcanic geology and instrument testing',
    question: 'How can instruments identify and study basaltic materials?'
  }
}

// ==========================================
// MAIN APPLICATION INTERFACE
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

    <!-- HERO SECTION -->

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
            ENTER RESEARCH EXPLORER <span>↗</span>
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

    <!-- SEARCH SECTION -->

    <section class="search-section">
      <div class="search-heading">
        <div>
          <span class="eyebrow">RESEARCH DATABASE</span>
          <h2>What are you investigating?</h2>
          <p>Search candidate environments, research themes and data resources.</p>
        </div>

        <span class="database-label">EXPLORER / 001</span>
      </div>

      <form id="search-form" class="search-bar">
        <span class="search-symbol">⌕</span>

        <input
          id="site-search"
          type="search"
          placeholder="Search locations, terrain, geology or research..."
          aria-label="Search research locations"
        >

        <button type="submit">
          SEARCH <span>↗</span>
        </button>
      </form>

      <div class="search-filters">
        <span>EXPLORE BY:</span>
        <a href="#explorer" data-filter="all">All environments</a>
        <a href="#explorer" data-filter="desert">Desert</a>
        <a href="#explorer" data-filter="mountain">Mountain terrain</a>
        <a href="#explorer" data-filter="volcanic">Volcanic geology</a>
      </div>
    </section>

    <!-- RESEARCH EXPLORER -->

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

    <!-- MISSION CONFIGURATION -->

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

          <p>
            Select a target world and research objective to prepare an investigation.
          </p>
        </div>
      </div>
    </section>

    <!-- ANALOGUE PASSPORT -->

    <section class="passport-section" id="passport">
      <div class="section-heading">
        <div>
          <span class="eyebrow">03 / FIELD RESEARCH RECORD</span>
          <h2>Analogue Passport</h2>
          <p>A structured research record for each candidate environment.</p>
        </div>

        <span class="section-index">FIELD RECORD / 001</span>
      </div>

      <div class="passport-card">

        <div class="passport-top">
          <div>
            <span class="eyebrow" id="passport-country">
              INDIA / EARTH
            </span>

            <h3 id="passport-name">Ladakh</h3>

            <p id="passport-type">
              High-altitude mountainous terrain
            </p>
          </div>

          <div class="passport-id">
            <small>FIELD IDENTIFIER</small>
            <strong id="passport-id">TT-002</strong>
          </div>
        </div>

        <div class="passport-description" id="passport-description">
          A high-altitude region with varied mountainous terrain that may
          support field robotics and mobility research.
        </div>

        <!-- DYNAMIC TERRAIN METRICS -->

        <div class="metric-grid">

          <article class="metric-card">
            <span>01 / ELEVATION</span>
            <strong id="metric-elevation">Demo</strong>
            <small id="metric-elevation-note">
              Illustrative grid, not NASA data
            </small>
          </article>

          <article class="metric-card">
            <span>02 / SLOPE</span>
            <strong id="metric-slope">Pending</strong>
            <small id="metric-slope-note">
              Requires real elevation processing
            </small>
          </article>

          <article class="metric-card">
            <span>03 / RUGGEDNESS</span>
            <strong id="metric-ruggedness">Pending</strong>
            <small id="metric-ruggedness-note">
              Requires real elevation processing
            </small>
          </article>

          <article class="metric-card">
            <span>04 / COMPARISON</span>
            <strong id="passport-world">Moon</strong>
            <small id="planetary-dataset">
              LOLA data not connected
            </small>
          </article>

        </div>

        <div class="research-direction">
          <span class="eyebrow">POTENTIAL RESEARCH DIRECTION</span>

          <h4 id="passport-research">
            Rover mobility and rugged terrain
          </h4>

          <p id="passport-question">
            How do robotic systems navigate complex rocky terrain?
          </p>
        </div>

        <div class="evidence-panel">
          <div class="evidence-heading">
            <h4>Evidence and validation</h4>
            <span>VALIDATION PENDING</span>
          </div>

          <div class="evidence-row">
            <span>Earth elevation measurements</span>
            <strong>Not connected</strong>
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
          SCIENTIFIC LIMITATION / A candidate environment is not automatically
          equivalent to a planetary surface. Comparisons require compatible
          measurements, documented methods and explicit uncertainty.
        </p>

      </div>
    </section>

    <!-- DATA OBSERVATORY -->

    <section class="data-section" id="data">
      <div class="section-heading">
        <div>
          <span class="eyebrow">04 / OPEN SCIENCE INFRASTRUCTURE</span>
          <h2>Data Observatory</h2>
          <p>Scientific datasets planned for the terrain-comparison pipeline.</p>
        </div>

        <span class="section-index">DATA CATALOGUE</span>
      </div>

      <div class="data-grid">

        <article class="data-card">
          <span class="data-number">EARTH / 001</span>

          <div class="data-icon">⊕</div>

          <h3>NASADEM</h3>

          <p>
            Earth elevation data for terrain characterization and derived slope analysis.
          </p>

          <a
            href="https://earthdata.nasa.gov/data/catalog"
            target="_blank"
            rel="noreferrer"
          >
            NASA EARTHDATA ↗
          </a>
        </article>

        <article class="data-card">
          <span class="data-number">MARS / 002</span>

          <div class="data-icon">◉</div>

          <h3>MOLA</h3>

          <p>
            Mars Orbiter Laser Altimeter data for investigating Martian topography.
          </p>

          <a
            href="https://pds-geosciences.wustl.edu/"
            target="_blank"
            rel="noreferrer"
          >
            PDS GEOSCIENCES ↗
          </a>
        </article>

        <article class="data-card">
          <span class="data-number">MOON / 003</span>

          <div class="data-icon">◐</div>

          <h3>LOLA</h3>

          <p>
            Lunar elevation measurements for topographic comparison with Earth environments.
          </p>

          <a
            href="https://pds-geosciences.wustl.edu/"
            target="_blank"
            rel="noreferrer"
          >
            PDS GEOSCIENCES ↗
          </a>
        </article>

      </div>
    </section>

    <!-- SCIENTIFIC INTEGRITY -->

    <section class="integrity-banner">
      <span>!</span>

      <div>
        <strong>Scientific integrity is part of the system.</strong>

        <p>
          This prototype identifies potential research candidates.
          It does not yet calculate validated planetary similarity scores.
          Demonstration terrain values are not real-world measurements.
        </p>
      </div>
    </section>

  </main>

  <!-- FOOTER -->

  <footer class="site-footer">
    <div>
      <strong>TERRATWIN DISCOVERY</strong>
      <span>PROJECT TERRA LUNA 2K26</span>
    </div>

    <p>
      EARTH OBSERVATION · OPEN DATA · PLANETARY EXPLORATION
    </p>
  </footer>
`

// ==========================================
// INTERACTIVE EARTH MAP
// ==========================================

const map = L.map('earth-map', {
  scrollWheelZoom: true
}).setView([20, 10], 2)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 18
}).addTo(map)

const markers = {}

Object.entries(sites).forEach(([key, site]) => {
  const marker = L.marker(site.coordinates).addTo(map)

  marker.bindPopup(
    `<strong>${site.name}</strong><br>${site.country}`
  )

  marker.on('click', () => selectSite(key))

  markers[key] = marker
})

// ==========================================
// TERRAIN PASSPORT DISPLAY
// ==========================================

function updateTerrainPassport() {
  const elevation = document.querySelector('#metric-elevation')
  const elevationNote = document.querySelector('#metric-elevation-note')

  const slope = document.querySelector('#metric-slope')
  const slopeNote = document.querySelector('#metric-slope-note')

  const ruggedness = document.querySelector('#metric-ruggedness')
  const ruggednessNote = document.querySelector('#metric-ruggedness-note')

  if (
    !elevation ||
    !elevationNote ||
    !slope ||
    !slopeNote ||
    !ruggedness ||
    !ruggednessNote
  ) {
    return
  }

  // Display the demonstration grid's calculated range.
  elevation.textContent =
    `${terrainResults.minimumElevation}–${terrainResults.maximumElevation}`

  elevationNote.textContent =
    'Demo values, not measured metres'

  // Do not invent slope measurements.
  // These need real georeferenced elevation data.
  slope.textContent = 'Pending'

  slopeNote.textContent =
    'Awaiting real elevation data'

  // Do not invent ruggedness measurements.
  ruggedness.textContent = 'Pending'

  ruggednessNote.textContent =
    'Awaiting real elevation data'
}

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

    markers[key].openPopup()
  })
})

// ==========================================
// RESEARCH CONFIGURATION
// ==========================================

document.querySelector('#prepare-research').addEventListener('click', () => {
  const world = document.querySelector('#world').value

  const objective =
    document.querySelector('#objective').value

  const site = sites[selectedSite]

  document.querySelector('#passport-world').textContent =
    world

  document.querySelector('#planetary-dataset').textContent =
    world === 'Moon'
      ? 'LOLA data not connected'
      : 'MOLA data not connected'

  document.querySelector('#research-result').innerHTML = `
    <span class="result-symbol">◎</span>

    <div>
      <strong>Investigation configuration prepared</strong>

      <p>
        Target: ${world} · Objective: ${objective} · Candidate: ${site.name}.
        Scientific comparison is pending real dataset integration.
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

  const match = Object.entries(sites).find(([key, site]) =>
    `${site.name} ${site.country} ${site.type} ${site.research}`
      .toLowerCase()
      .includes(query)
  )

  if (!query) {
    document.querySelector('#site-search').focus()
    return
  }

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
        <strong>No matching candidate in the current catalogue</strong>

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
// INITIALIZE APPLICATION
// ==========================================

selectSite('ladakh', false)

window.addEventListener('load', () => {
  setTimeout(() => {
    map.invalidateSize()
  }, 200)
})

console.log('TERRATWIN DISCOVERY INITIALIZED')
console.log('Selected candidate:', selectedSite)
console.log('Terrain engine:', terrainResults)
