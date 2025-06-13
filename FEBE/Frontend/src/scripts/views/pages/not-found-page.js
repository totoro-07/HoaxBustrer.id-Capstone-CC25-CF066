export default class NotFoundPage {
    async render() {
      return `
          <div class="not-found-container">
            <div class="not-found-content">
              <h1>404</h1>
              <h2>Page Not Found</h2>
              <p>The page nya engga ada nih.</p>
              <a href="#/" class="not-found-button">Back to Home</a>
            </div>
          </div>
      `;
    }
  
    async afterRender() {
    }
  }