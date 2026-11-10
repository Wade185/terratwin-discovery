
import './style.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const sites = {
  atacama: {
    name: 'Atacama Desert',
    country: 'Chile',
    coordinates: [-23.65, -69.25],
    type: 'Hyper-arid desert',
    description: 'An extremely dry environment that may support research into dry-environment technologies.',
    research: 'Dry-environment testing',
    questions: 'How do exploration systems perform in very dry environments?'
  },
  ladakh: {
    name: 'Ladakh',
    country: 'India',
    coordinates: [34.15, 77.58],
    type: 'High-altitude mountainous terrain',
    description: 'A mountainous region with varied terrain that may support field robotics research.',
    research: 'Terrain and rover mobility research',
    questions: 'How do robotic systems navigate rugged terrain?'
  },
  hawaii: {
    name: 'Hawaiian Basalt',
    country: 'United States',
    coordinates: [19.42, -155.29],
    type: 'Volcanic basalt landscape',
    description: 'A volcanic environment that may support geological instrument testing.',
    research: 'Basalt and geological instrument research',
    questions: 'How can instruments study volcanic rocks and terrain?'
  }
}

document.querySelector('#app').innerHTML = `
  <header class="topbar">
    <div class="brand">
      <div class="logo">T</div>
      <div>
        <h1>TERRATWIN <span>DISCOVERY</span></h1>
        <p>PLANETARY ANALOGUE RESEARCH SYSTEM</p>
      </div>
    </div>
    <div class="status"><i></i> SYSTEM ONLINE</div>
  </header>

  <main>
    <section class="hero">
      <p class="eyebrow">EARTH OBSERVATION × PLANETARY SCIENCE</p>
      <h2>Earth is our laboratory.<br>
      <span>Other worlds are our destination.</span></h2>
      <p class="intro">
        Discover terrestrial environments that can help researchers
        test technologies designed for lunar and Martian exploration.
      </p>
    </section>

    <section class="control-panel">
      <div class="field">
        <label for="world">TARGET WORLD</label>
        <select id="world">
          <option value="Moon">Moon</option>
          <option value="Mars">Mars</option>
        </select>
      </div>

      <div class="field">
        <label for="mission">MISSION OBJECTIVE</label>
        <select id="mission">
          <option>Rover mobility</option>
          <option>Geological research</option>
          <option>Habitat testing</option>
        </select>
      </div>

      <button id="explore">PREPARE RESEARCH ↗</button>
    </section>

    <section class="section-title">
      <div>
        <p class="eyebrow">GLOBAL FIELD INTELLIGENCE</p>
        <h2>Explore Earth</h2>
      </div>
      <span class="tag">INTERACTIVE MAP</span>
    </section>

    <section class="map-layout">
      <div id="earth-map"></div>

      <aside class="map-sidebar">
        <p class="eyebrow">RESEARCH LOCATIONS</p>
        <h3>Candidate sites</h3>

        <button class="site-button" data-site="atacama">
          <span>01</span>
          <div><strong>Atacama Desert</strong><small>Chile</small></div>
        </button>

        <button class="site-button" data-site="ladakh">
          <span>02</span>
          <div><strong>Ladakh</strong><small>India</small></div>
        </button>

        <button class="site-button" data-site="hawaii">
          <span>03</span>
          <div><strong>Hawaiian Basalt</strong><small>United States</small></div>
        </button>

        <div id="site-info" class="site-info">
          <strong>Select a location</strong>
          <p>Choose a candidate to explore its research profile.</p>
        </div>
      </aside>
    </section>

    <section class="section-title passport-heading">
      <div>
        <p class="eyebrow">PLANETARY FIELD DATABASE</p>
        <h2>Analogue Passport</h2>
        <p class="intro">A research profile for every candidate environment.</p>
      </div>
      <span class="tag">RESEARCH PROFILE</span>
    </section>

    <section class="passport">
      <div class="passport-top">
        <div>
          <p class="eyebrow" id="passport-country">INDIA · EARTH</p>
          <h2 id="passport-name">Ladakh</h2>
          <p id="passport-type">High-altitude mountainous terrain</p>
        </div>
        <div class="passport-id">
          <span>FIELD ID</span>
          <strong id="passport-id">TT-002</strong>
        </div>
      </div>

      <div class="passport-description">
        <p id="passport-description">
          A mountainous region with varied terrain that may support field robotics research.
        </p>
      </div>

      <div class="passport-grid">
        <article class="metric">
          <span>ELEVATION DATA</span>
          <strong>Pending</strong>
          <small>NASADEM integration</small>
        </article>
        <article class="metric">
          <span>SLOPE ANALYSIS</span>
          <strong>Pending</strong>
          <small>Requires elevation processing</small>
        </article>
        <article class="metric">
          <span>TERRAIN RUGGEDNESS</span>
          <strong>Pending</strong>
          <small>Requires terrain analysis</small>
        </article>
        <article class="metric">
          <span>PLANETARY COMPARISON</span>
          <strong id="passport-world">Moon</strong>
          <small id="passport-reference">LOLA data not yet connected</small>
        </article>
      </div>

      <div class="research-box">
        <div>
          <p class="eyebrow">POTENTIAL RESEARCH DIRECTION</p>
          <h3 id="passport-research">Terrain and rover mobility research</h3>
          <p id="passport-question">
            How do robotic systems navigate rugged terrain?
          </p>
        </div>
      </div>

      <div class="evidence-box">
        <div class="evidence-title">
          <h3>Scientific evidence tracker</h3>
          <span class="pending-label">VALIDATION PENDING</span>
        </div>
        <div class="evidence-row">
          <span>Earth elevation dataset</span>
          <strong>Not connected</strong>
        </div>
        <div class="evidence-row">
          <span>Planetary elevation dataset</span>
          <strong>Not connected</strong>
        </div>
        <div class="evidence-row">
          <span>Comparable measurements</span>
          <strong>Not calculated</strong>
        </div>
        <div class="evidence-row">
          <span>Analogue suitability</span>
          <strong>Not assessed</strong>
        </div>
      </div>

      <p class="scientific-note">
        SCIENTIFIC NOTE: Candidate locations are exploratory research leads.
        A geographical resemblance does not establish that an environment
        is equivalent to the Moon or Mars.
      </p>
    </section>

    <section class="section-title">
      <div>
        <p class="eyebrow">OPEN SCIENCE</p>
        <h2>Our data foundations</h2>
      </div>
      <span class="tag">PLANNED INTEGRATIONS</span>
    </section>

    <section class="data-sources">
      <article>
        <span>01 / EARTH</span>
        <h3>NASADEM</h3>
        <p>Earth elevation measurements for terrain analysis.</p>
      </article>
      <article>
        <span>02 / MARS</span>
        <h3>MOLA</h3>
        <p>Mars Orbiter Laser Altimeter elevation data.</p>
      </article>
      <article>
        <span>03 / MOON</span>
        <h3>LOLA</h3>
        <p>Lunar Orbiter Laser Altimeter elevation data.</p>
      </article>
    </section>

    <section id="report" class="report">
      <span>ⓘ</span>
      <p>
        <strong>Research configuration</strong><br>
        Choose a target world and mission objective to prepare a research profile.
      </p>
    </section>
  </main>

  <footer>
    <span>TERRATWIN DISCOVERY</span>
    <span>PROJECT TERRA LUNA 2K26</span>
  </footer>
`

const map = L.map('earth-map').setView([20, 10], 2)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 18
}).addTo(map)

const markers = {}

const siteIds = {
  atacama: 'TT-001',
  ladakh: 'TT-002',
  hawaii: 'TT-003'
}

let selectedSite = 'ladakh'

function selectSite(id) {
  const site = sites[id]
  selectedSite = id

  map.flyTo(site.coordinates, 7, { duration: 1.2 })

  document.querySelector('#site-info').innerHTML = `
    <strong>${site.name}</strong>
    <p>${site.country}</p>
    <p>${site.description}</p>
    <small>Preliminary candidate. Validation required.</small>
  `

  document.querySelector('#passport-country').textContent =
    `${site.country.toUpperCase()} · EARTH`

  document.querySelector('#passport-name').textContent = site.name
  document.querySelector('#passport-type').textContent = site.type
  document.querySelector('#passport-id').textContent = siteIds[id]
  document.querySelector('#passport-description').textContent = site.description
  document.querySelector('#passport-research').textContent = site.research
  document.querySelector('#passport-question').textContent = site.questions

  document.querySelectorAll('.site-button').forEach(button => {
    button.classList.toggle('active', button.dataset.site === id)
  })
}

Object.entries(sites).forEach(([id, site]) => {
  const marker = L.marker(site.coordinates).addTo(map)

  marker.bindPopup(`<strong>${site.name}</strong><br>${site.country}`)
  marker.on('click', () => selectSite(id))

  markers[id] = marker
})

document.querySelectorAll('.site-button').forEach(button => {
  button.addEventListener('click', () => {
    const id = button.dataset.site
    selectSite(id)
    markers[id].openPopup()
  })
})

function updateResearchConfiguration() {
  const world = document.querySelector('#world').value
  const mission = document.querySelector('#mission').value

  document.querySelector('#passport-world').textContent = world

  document.querySelector('#passport-reference').textContent =
    world === 'Moon'
      ? 'LOLA data not yet connected'
      : 'MOLA data not yet connected'

  document.querySelector('#report').innerHTML = `
    <span>◎</span>
    <p>
      <strong>Research configuration prepared</strong><br>
      Target world: ${world}<br>
      Mission objective: ${mission}<br>
      Candidate: ${sites[selectedSite].name}<br>
      The next stage will compare real terrain measurements.
      No similarity score has been calculated.
    </p>
  `
}

document.querySelector('#explore').addEventListener(
  'click',
  updateResearchConfiguration
)

selectSite('ladakh')
