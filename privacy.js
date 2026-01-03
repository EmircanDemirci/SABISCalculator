document.addEventListener('DOMContentLoaded', function() {
    
    // --- TAB GEÇİŞ MANTIĞI ---
    const buttons = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.content-section');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Butonlardaki aktif sınıfını kaldır
            buttons.forEach(b => b.classList.remove('active'));
            // Tıklanan butona ekle
            btn.classList.add('active');

            // Bölümleri gizle
            sections.forEach(sec => sec.classList.remove('active'));
            
            // Hedef bölümü göster
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- KARANLIK MOD MANTIĞI ---
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    const body = document.body;

    // 1. Eklentinin hafızasından kayıtlı temayı kontrol et
    // Eğer chrome.storage kullanılamıyorsa (eklenti dışı açıldıysa) localStorage kullan
    if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.sync.get('darkModeEnabled', function(data) {
            if (data.darkModeEnabled) {
                enableDarkMode();
            }
        });
    } else if (localStorage.getItem('sabis_dark_mode') === 'true') {
        enableDarkMode();
    }

    // 2. Butona tıklayınca değiştir
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add('dark-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        // Tercihi kaydet
        if(typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.sync.set({ darkModeEnabled: true });
        }
        localStorage.setItem('sabis_dark_mode', 'true');
    }

    function disableDarkMode() {
        body.classList.remove('dark-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        // Tercihi kaydet
        if(typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.sync.set({ darkModeEnabled: false });
        }
        localStorage.setItem('sabis_dark_mode', 'false');
    }
});