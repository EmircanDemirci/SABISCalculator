document.addEventListener('DOMContentLoaded', function() {
    
    // --- ELEMENT TANIMLARI ---
    const tabs = document.querySelectorAll('.nav-item');
    const contents = document.querySelectorAll('.tab-content');
    
    // Switch Elementleri
    const extToggle = document.getElementById('extensionToggle');
    const extStatus = document.getElementById('extensionStatus');
    
    const darkToggle = document.getElementById('darkModeToggle');
    const darkStatus = document.getElementById('darkModeStatus');

    const notifToggle = document.getElementById('notificationToggle');
    const notifStatus = document.getElementById('notificationStatus');

    const notifList = document.getElementById('notifList');
    const clearBtn = document.getElementById('clearNotifs');
    const badge = document.getElementById('badge');

    // --- SEKME GEÇİŞLERİ ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
            
            // Bildirim sekmesine geçince ünlemi kaldır
            if(tab.dataset.tab === 'notifications') {
                chrome.action.setBadgeText({ text: "" });
                badge.style.display = 'none';
            }
        });
    });

    // --- AYARLARI YÜKLE ---
    chrome.storage.sync.get(['extensionEnabled', 'darkModeEnabled', 'notificationsEnabled'], (data) => {
        
        // 1. Hesaplayıcı Ayarı
        const isExt = data.extensionEnabled !== undefined ? data.extensionEnabled : true;
        extToggle.checked = isExt;
        updateLabel(extStatus, isExt);

        // 2. Karanlık Mod Ayarı
        const isDark = data.darkModeEnabled !== undefined ? data.darkModeEnabled : false;
        darkToggle.checked = isDark;
        updateLabel(darkStatus, isDark);
        if(isDark) document.body.classList.add('dark-theme');

        // 3. Bildirim Ayarı (YENİ)
        const isNotif = data.notificationsEnabled !== undefined ? data.notificationsEnabled : true;
        notifToggle.checked = isNotif;
        updateLabel(notifStatus, isNotif);
    });

    // --- DEĞİŞİKLİKLERİ KAYDET ---

    // Hesaplayıcı
    extToggle.addEventListener('change', (e) => {
        const val = e.target.checked;
        updateLabel(extStatus, val);
        chrome.storage.sync.set({ extensionEnabled: val });
    });

    // Karanlık Mod
    darkToggle.addEventListener('change', (e) => {
        const val = e.target.checked;
        updateLabel(darkStatus, val);
        chrome.storage.sync.set({ darkModeEnabled: val });
        val ? document.body.classList.add('dark-theme') : document.body.classList.remove('dark-theme');
    });

    // Bildirim Kontrolü (YENİ)
    notifToggle.addEventListener('change', (e) => {
        const val = e.target.checked;
        updateLabel(notifStatus, val);
        // Bu ayarı background.js okuyacak
        chrome.storage.sync.set({ notificationsEnabled: val });
    });

    // --- BİLDİRİMLERİ LİSTELE ---
    chrome.storage.local.get(['notifications'], (data) => {
        const notifs = data.notifications || [];
        
        if (notifs.length > 0) {
            notifList.innerHTML = '';
            // Rozet göster (Kırmızı nokta)
            badge.style.display = 'inline'; 
            
            notifs.forEach(n => {
                const item = document.createElement('div');
                item.className = 'notif-item';
                item.innerHTML = `
                    <div class="notif-title">
                        ${n.title} <span style="font-weight:normal; font-size:10px;">${n.date}</span>
                    </div>
                    <div class="notif-msg">${n.message}</div>
                `;
                notifList.appendChild(item);
            });
        }
    });

    // Bildirim Temizle
    clearBtn.addEventListener('click', () => {
        chrome.storage.local.set({ notifications: [] });
        notifList.innerHTML = '<div class="empty-state">Liste temizlendi.</div>';
        chrome.action.setBadgeText({ text: "" });
    });

    // Yardımcı Fonksiyon
    function updateLabel(el, isActive) {
        el.textContent = isActive ? 'Açık' : 'Kapalı';
        el.style.color = isActive ? 'var(--primary-blue)' : 'var(--text-sub)';
    }
});