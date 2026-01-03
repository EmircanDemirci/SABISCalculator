// background.js - Sabis Ders Bazlı Not Bildirim Sistemi

// 1. Kurulumda Alarmı Başlat
chrome.runtime.onInstalled.addListener(() => {
  console.log("Sabis Bildirim Servisi Başlatıldı.");
  // Alarm ismi "checkGrades" olarak ayarlandı
  chrome.alarms.create("checkGrades", { periodInMinutes: 15 });
  
  // İlk yüklemede bildirim atmadan sadece verileri kaydet
  fetchGradesAndCompare(true); 
});

// 2. Alarm Tetiklendiğinde (Check-Gate Burası)
chrome.alarms.onAlarm.addListener((alarm) => {
  // Alarm isminin eşleşmesi ÇOK ÖNEMLİ
  if (alarm.name === "checkGrades") {
    
    // CHECK-GATE: Kullanıcı ayarını kontrol et
    chrome.storage.sync.get(['notificationsEnabled'], function(data) {
        
        // Varsayılan değer TRUE (Açık)
        const izniVarMi = data.notificationsEnabled !== undefined ? data.notificationsEnabled : true;

        if (izniVarMi === false) {
            console.log("⏹ Kullanıcı bildirimleri kapattığı için kontrol yapılmadı.");
            return; // FONKSİYONU DURDUR (İnternet harcamaz)
        }

        // İzin varsa asıl fonksiyonu çalıştır
        console.log("▶ Kontrol izni var, işlemler başlıyor...");
        fetchGradesAndCompare(false);
    });
  }
});

// 3. Not Kontrol Fonksiyonu
async function fetchGradesAndCompare(isFirstRun = false) {
  try {
    const targetUrl = "https://obs.sabis.sakarya.edu.tr/Ders";
    
    // Arka planda sayfayı çek
    const response = await fetch(targetUrl);
    
    // Oturum Kontrolü
    if (!response.ok || response.redirected || response.url.includes("login")) {
        console.log("Oturum kapalı, kontrol yapılamadı.");
        chrome.action.setBadgeText({ text: "?" });
        chrome.action.setBadgeBackgroundColor({ color: "#b2bec3" }); // Gri
        return; 
    }

    const text = await response.text();

    // --- HTML AYRIŞTIRMA ---
    const sections = text.split(/class=["']card-body["']/);
    sections.shift(); 

    let currentCoursesState = {}; 

    sections.forEach(section => {
        const nameRegex = /<a[^>]*class=["'][^"']*text-dark[^"']*["'][^>]*>([\s\S]*?)<\/a>/i;
        const nameMatch = section.match(nameRegex);

        if (nameMatch) {
            let courseName = nameMatch[1].replace(/<[^>]*>?/gm, '').trim();
            courseName = courseName.replace(/&amp;/g, '&').replace(/\s+/g, ' ');

            const gradeRegex = /<td[^>]*class=["'][^"']*text-right[^"']*["'][^>]*>([\s\S]*?)<\/td>/gi;
            const gradeMatches = [...section.matchAll(gradeRegex)];

            const validGrades = gradeMatches.map(m => {
                let val = m[1].replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, '').trim();
                return val;
            }).filter(val => {
                const isNumber = !isNaN(parseFloat(val)) && isFinite(val);
                const isCode = ["GR", "DZ", "MU", "YT", "YZ", "AA", "BA", "BB", "CB", "CC", "DC", "DD", "FD", "FF"].includes(val);
                return val !== "" && (isNumber || isCode);
            });

            currentCoursesState[courseName] = validGrades.length;
        }
    });

    console.log(`Kontrol Zamanı: ${new Date().toLocaleTimeString()}`);

    // --- KARŞILAŞTIRMA VE BİLDİRİM ---
    chrome.storage.local.get(['coursesState', 'notifications'], (data) => {
      const oldState = data.coursesState || {};
      let notifications = data.notifications || [];
      let hasChange = false;

      if (!isFirstRun) {
          for (const [courseName, count] of Object.entries(currentCoursesState)) {
              const oldCount = oldState[courseName] || 0;

              if (count > oldCount) {
                  const time = new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'});
                  const msgTitle = "📢 Not Açıklandı!";
                  const msgBody = `${courseName} dersinden not girişi yapıldı.`;

                  // Popup Listesi için
                  notifications.unshift({
                      id: Date.now() + Math.random(),
                      title: msgTitle,
                      message: msgBody,
                      date: time
                  });

                  // Masaüstü Bildirimi
                  chrome.notifications.create({
                      type: 'basic',
                      iconUrl: 'icon.png', // manifest.json'daki ikonunla aynı olmalı
                      title: msgTitle,
                      message: msgBody,
                      priority: 2
                  });

                  hasChange = true;
              }
          }

          if (hasChange) {
              if (notifications.length > 50) notifications.pop();
              chrome.storage.local.set({ notifications: notifications });
              
              chrome.action.setBadgeText({ text: "!" });
              chrome.action.setBadgeBackgroundColor({ color: "#e17055" }); 
          }
      }

      if (Object.keys(currentCoursesState).length > 0) {
          chrome.storage.local.set({ coursesState: currentCoursesState });
      }
    });

  } catch (error) {
    console.error("Arka plan hatası:", error);
  }
}