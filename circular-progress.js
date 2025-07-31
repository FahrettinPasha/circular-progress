// CircularProgress adında bir Web Component sınıfı tanımlıyoruz.
class CircularProgress extends HTMLElement {
  constructor() {
    super();
    // Shadow DOM'u açıyoruz. Bu, bileşenin stil ve JavaScript'inin sayfanın geri kalanından izole olmasını sağlar.
    this.attachShadow({ mode: 'open' });
  }

  // Hangi HTML niteliklerinin (attributes) değişikliklerini izleyeceğimizi belirtiyoruz.
  // Bu niteliklerden biri değiştiğinde attributeChangedCallback fonksiyonu çağrılır.
  static get observedAttributes() {
    return ['min', 'max', 'value', 'size', 'stroke-width', 'color', 'background-color'];
  }

  // İzlenen bir nitelik değiştiğinde çağrılır.
  attributeChangedCallback(name, oldValue, newValue) {
    // Bileşeni yeniden çiziyoruz (render ediyoruz).
    this.render();
  }

  // Bileşen DOM'a eklendiğinde çağrılır.
  connectedCallback() {
    // Bileşeni ilk kez çiziyoruz.
    this.render();
  }

  // Bileşenin içeriğini (HTML ve CSS) oluşturan ana fonksiyon.
  render() {
    // HTML niteliklerinden değerleri alıyoruz. Eğer nitelik yoksa varsayılan değerleri kullanıyoruz.
    const min = parseFloat(this.getAttribute('min') || 0);
    const max = parseFloat(this.getAttribute('max') || 100);
    const value = parseFloat(this.getAttribute('value') || 0);
    const size = parseFloat(this.getAttribute('size') || 100); // Bileşenin genişliği ve yüksekliği
    const strokeWidth = parseFloat(this.getAttribute('stroke-width') || 5); // Çember çizgisinin kalınlığı
    const color = this.getAttribute('color') || '#3498db'; // İlerleme çizgisinin rengi
    const backgroundColor = this.getAttribute('background-color') || '#ecf0f1'; // Arka plan çizgisinin rengi
    
    // Çemberin yarıçapını hesaplıyoruz. (Boyut - çizgi kalınlığı) / 2
    const radius = (size - strokeWidth) / 2;
    // Çemberin çevresini hesaplıyoruz (2 * Pi * yarıçap). Bu, stroke-dasharray için kullanılır.
    const circumference = 2 * Math.PI * radius;
    
    // İlerleme çubuğunun ne kadarının dolu olacağını (offset) hesaplıyoruz.
    // (max - min) aralığındaki value değerine göre çevrenin ne kadarının çizileceğini belirler.
    const offset = circumference - (circumference * (value - min)) / (max - min);

    // Shadow DOM'un içeriğini ayarlıyoruz.
    this.shadowRoot.innerHTML = `
      <style>
        /* :host, özel bileşenin kendisini hedefler. */
        :host {
          display: inline-block; /* Satır içi blok olarak davranmasını sağlar */
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%; /* Çembersel görünüm için */
          overflow: hidden; /* İçeriğin dışarı taşmasını engeller */
        }
        .circular-progress-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        svg {
          /* SVG'yi -90 derece döndürerek ilerlemenin yukarıdan başlamasını sağlıyoruz */
          transform: rotate(-90deg);
          position: absolute; /* Metnin üzerine gelmesini sağlar */
          top: 0;
          left: 0;
        }
        .circle-bg {
          fill: none; /* İçini doldurma */
          stroke: ${backgroundColor}; /* Arka plan rengi */
          stroke-width: ${strokeWidth}; /* Çizgi kalınlığı */
        }
        .circle {
          fill: none; /* İçini doldurma */
          stroke: ${color}; /* İlerleme rengi */
          stroke-width: ${strokeWidth}; /* Çizgi kalınlığı */
          stroke-linecap: round; /* Çizgi uçlarını yuvarlatır */
          transition: stroke-dashoffset 0.35s ease-out; /* Animasyon geçişi */
          stroke-dasharray: ${circumference}; /* Çemberin tamamını çizgi olarak tanımlar */
          stroke-dashoffset: ${offset}; /* Çizginin ne kadarının görünür olacağını belirler */
        }
        .progress-text {
          position: relative; /* SVG'nin üzerinde görünmesi için */
          font-family: 'Inter', sans-serif; /* Yazı tipi */
          font-weight: bold;
          font-size: ${size * 0.25}px; /* Boyuta göre yazı boyutu */
          color: #333; /* Yazı rengi */
          z-index: 1; /* Metnin SVG'nin üzerinde olmasını sağlar */
        }
      </style>
      <div class="circular-progress-container">
        <svg width="${size}" height="${size}">
          <!-- Arka plan çemberi -->
          <circle class="circle-bg" cx="${size / 2}" cy="${size / 2}" r="${radius}" />
          <!-- İlerleme çemberi -->
          <circle class="circle" cx="${size / 2}" cy="${size / 2}" r="${radius}" />
        </svg>
        <!-- İlerleme değerini gösteren metin -->
        <div class="progress-text">
          ${value}
        </div>
      </div>
    `;
  }
}

// Yeni özel HTML etiketimizi tanımlıyoruz.
// Artık HTML'de <circular-progress> olarak kullanabiliriz.
customElements.define('circular-progress', CircularProgress);
