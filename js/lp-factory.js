/**
 * LP Factory Pattern
 * Generates dynamic LP pages from JSON data
 */

class LPFactory {
  constructor() {
    this.lpData = null;
    this.platformsData = null;
    this.currentLP = null;
  }

  /**
   * Initialize factory with LP and platforms data
   */
  async init() {
    try {
      const [lpResponse, platformsResponse] = await Promise.all([
        fetch('../../data/lps-data.json'),
        fetch('../../data/platforms-icons.json')
      ]);
      
      const lpDataJson = await lpResponse.json();
      const platformsJson = await platformsResponse.json();
      
      this.lpData = lpDataJson.lps;
      this.platformsData = platformsJson.platforms;
      
      // Extract LP ID from current URL
      const lpId = this.extractLPIdFromURL();
      this.currentLP = this.lpData.find(lp => lp.id === lpId);
      
      if (!this.currentLP) {
        console.error(`LP with id "${lpId}" not found`);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Failed to load LP data:', error);
      return false;
    }
  }

  /**
   * Extract LP ID from URL path
   */
  extractLPIdFromURL() {
    const pathparts = window.location.pathname.split('/');
    const filename = pathparts[pathparts.length - 1].replace('.html', '');
    return filename;
  }

  /**
   * Build main content structure
   */
  buildMainContent() {
    return `
      <div class="content-block">
        <h2>${this.currentLP.heading}</h2>
        <p>Escuta agora 🌷</p>
      </div>
      ${this.buildSpotifySection()}
      ${this.buildYoutubeSection()}
      ${this.buildPlatformsSection()}
    `;
  }

  /**
   * Build Spotify section
   */
  buildSpotifySection() {
    if (!this.currentLP.spotify) return '';
    
    return `
      <div class="content-block">
        <h3 style="color: #6b629d; margin-bottom: 20px;">(ᯤ) Spotify</h3>
        <iframe 
          data-testid="embed-iframe" 
          style="border-radius:12px" 
          src="https://open.spotify.com/embed/track/${this.currentLP.spotify}?utm_source=generator" 
          width="100%" 
          height="352" 
          frameBorder="0" 
          allowfullscreen="" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy">
        </iframe>
      </div>
    `;
  }

  /**
   * Build YouTube section
   */
  buildYoutubeSection() {
    if (!this.currentLP.youtube) return '';
    
    return `
      <div class="content-block">
        <h3 style="color: #6b629d; margin-bottom: 20px;">▶️ Youtube</h3>
        <iframe 
          src="https://www.youtube.com/embed/${this.currentLP.youtube}"
          title="YouTube video player"
          frameborder="0"
          width="100%" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen>
        </iframe>
      </div>
    `;
  }

  /**
   * Build platforms section with links
   */
  buildPlatformsSection() {
    const platformKeys = ['deezer', 'applemusic', 'amazonmusic'];
    const availablePlatforms = platformKeys.filter(key => this.currentLP[key]);
    
    if (availablePlatforms.length === 0) {
      return '';
    }

    const platformLinks = availablePlatforms
      .map(key => {
        const platform = this.platformsData[key];
        const userId = this.currentLP[key];
        let url = '';
        
        if (key === 'applemusic') {
          url = `https://music.apple.com/br/artist/pedroluz/${userId}`;
        } else if (key === 'amazonmusic') {
          url = `https://music.amazon.com/artists/${userId}`;
        } else if (key === 'deezer') {
          url = `https://www.deezer.com/artist/${userId}`;
        }
        
        return `
          <a href="${url}" target="_blank" rel="noopener noreferrer">
            <img src="${platform.icon}" alt="${platform.name}" style="height: 32px; border-radius: 4px;">
          </a>
        `;
      })
      .join('\n<hr class="content-divider">\n');

    return `
      <div class="content-block">
        <h3 style="color: #6b629d; margin-bottom: 20px;">Outras plataformas</h3>
        <hr class="content-divider">
        ${platformLinks}
      </div>
    `;
  }

  /**
   * Build complete page and render it
   */
  render() {
    if (!this.currentLP) {
      console.error('No LP data available for rendering');
      return false;
    }

    // Update page title
    document.title = `${this.currentLP.title} 🎸`;

    // Render main content
    const mainElement = document.querySelector('main.content');
    if (mainElement) {
      mainElement.innerHTML = this.buildMainContent();
    }

    return true;
  }

  /**
   * Get all LPs
   */
  getAllLPs() {
    return this.lpData;
  }

  /**
   * Get current LP data
   */
  getCurrentLP() {
    return this.currentLP;
  }
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', async function() {
  const factory = new LPFactory();
  const initialized = await factory.init();
  
  if (initialized) {
    factory.render();
  } else {
    console.error('Failed to initialize LP Factory');
  }
});
