# 🎓 SABISCalculator

<div align="center">
  <img width="200" height="200" alt="icon" src="https://github.com/user-attachments/assets/dca2e3d6-550f-4430-8139-dd4d25d28858" />
  <br>
  <h3>SABİS İçin Gelişmiş Not Hesaplayıcı</h3>
  <p>
    Ders ortalaması, Çan eğrisi simülasyonu ve Transkript GNO hesaplama aracı.
  </p>
</div>

---

## 📑 İçindekiler

1. [Proje Hakkında](#-proje-hakkında)
2. [Özellikler](#-özellikler)
3. [Kurulum](#-kurulum)
4. [Nasıl Kullanılır?](#-nasıl-kullanılır) 
5. [Gizlilik Politikası](#-gizlilik-politikası) 
6. [İletişim](#-iletişim)

---

## 🚀 Proje Hakkında

**SABISCalculator**, Sakarya Üniversitesi (SAÜ) öğrencilerinin kullandığı SABİS (OBS) sistemi üzerinde çalışan, açık kaynaklı bir Chrome eklentisidir.

Bu eklenti tamamen **istemci taraflı (client-side)** çalışır ve verilerinizi hiçbir sunucuya göndermez. Kısacası; sadece sizin tarayıcınızda çalışır, dışarıya bilgi sızdırmaz.

---

## ✨ Özellikler

* 🧮 **Otomatik Ortalama Hesaplama:** Ağırlıklı notları (Vize, Final, Ödev vb.) otomatik algılar ve hesaplar.
* 🔔 **Çan Eğrisi Simülasyonu:** "DD Sınırı"nı elle girerek harf notunuzun (AA, BA, BB...) nasıl değişeceğini anlık görebilirsiniz.
* 📝 **Transkript GNO Hesaplama:** Transkript ekranında derslerin harf notlarını ve kredilerini değiştirerek GNO'nuzu tahmin edebilirsiniz.
* 🚫 **Final Barajı Kontrolü:** Final notu 40'ın altındaysa otomatik olarak **FF** uyarısı verir.
* ⚖️ **Akıllı Ortalama:** Toplam etki oranı %100'ü geçerse (örn: %120), notunuzu otomatik olarak normalize eder.
* 🌙 **Karanlık Mod:** Göz yormayan, SABİS ile tam uyumlu modern karanlık tema.

---

## 🛠 Kurulum

Bu eklenti şu an Chrome Mağazası'nda olmadığı için **manuel** kurmanız gerekiyor. Çok basit, aşağıdaki adımları sırasıyla yapmanız yeterli:

### Adım 1: Dosyayı İndirin
1.  Bu sayfanın sağ üst köşesindeki yeşil renkli **"<> Code"** butonuna tıklayın.
2.  Açılan menüden **"Download ZIP"** seçeneğine tıklayın.
3.  Bilgisayarınıza bir dosya inecek.

### Adım 2: Klasöre Çıkartın (⚠️ EN ÖNEMLİ ADIM)
1.  İndirdiğiniz o ZIP dosyasına **sağ tıklayın**.
2.  **"Klasöre Ayıkla"** veya **"Tümünü Ayıkla"** diyerek dosyaları dışarı çıkarın.
3.  Elinizde artık fermuarlı (zipli) olmayan, normal sarı bir klasör olmalı.
    * *Dikkat: ZIP dosyasını direkt seçerseniz çalışmaz! Klasöre çıkarmalısınız.*

### Adım 3: Chrome Uzantılar Sayfasını Açın
1.  Google Chrome tarayıcınızı açın.
2.  Adres çubuğuna şunu yazın ve Enter'a basın:
    `chrome://extensions/`
3.  (Veya sağ üstteki yapboz parçasına tıklayıp "Uzantıları Yönet" diyebilirsiniz.)

### Adım 4: Geliştirici Modunu Açın
1.  Açılan sayfanın **sağ üst köşesinde** bulunan **"Geliştirici Modu"** (Developer Mode) anahtarını açık konuma getirin (Mavi olsun).

### Adım 5: Eklentiyi Yükleyin
1.  Sol üstte yeni beliren butonlardan **"Paketlenmemiş öğe yükle"** (Load Unpacked) butonuna tıklayın.
2.  Açılan pencereden, **Adım 2'de klasöre çıkardığınız** o sarı klasörü bulun ve seçin.
3.  **"Klasörü Seç"** butonuna basın.

🎉 **Tebrikler!** Eklenti tarayıcınıza kuruldu. Artık SABİS'e girip kullanmaya başlayabilirsiniz.

---

## 📖 Nasıl Kullanılır?

Eklentiyi kurduktan sonra SABİS OBS sistemine giriş yapmanız yeterlidir.

### 1. Ders İçi Not Hesaplama
* **Not Listesi** veya **Sınav Sonuçları** ekranına gidin.
* Henüz girilmemiş not kutucuklarının yanında beliren gri alanlara **tahmini notunuzu** yazın.
* Siz yazdıkça ortalamanız anlık olarak hesaplanacaktır.

### 2. Çan Eğrisi (Harf Notu) Ayarı
* Her dersin hesaplama satırında **"Çan (DD Sınırı)"** kutucuğu bulunur (Varsayılan: 50).
* Hocanın belirlediği veya tahmin ettiğiniz geçme notunu (Örn: 35, 40) buraya girin.
* Eklenti, bu sınıra göre **Harf Notunuzu** (AA, BA, BB...) ve rengini güncelleyecektir.

### 3. Transkript Hesaplama
* **Transkript** sayfasına gidin.
* Derslerin kredilerinin ve harf notlarının **açılır menüye (dropdown)** dönüştüğünü göreceksiniz.
* "Bu dersten AA alırsam ortalamam ne olur?" senaryolarını buradan deneyebilirsiniz.
* Genel ortalamanız sağ alt köşedeki kutucukta anlık gösterilir.

---

## 🔒 Gizlilik Politikası

Kullanıcı gizliliği bu projenin temel taşıdır. **SABISCalculator** tamamen şeffaf ve güvenlidir.

### 1. Veri Toplanmaz
* Eklenti, girdiğiniz notları, öğrenci numaranızı, şifrenizi veya kişisel hiçbir verinizi **TOPLAMAZ**.
* Hiçbir sunucuya veri gönderilmez. Eklenti internet bağlantısı olmadan da (arayüz yüklendikten sonra) çalışabilir.

### 2. Yerel Çalışma Prensibi
* Tüm hesaplamalar tarayıcınızın belleğinde (RAM) o anlık yapılır.
* Sayfayı kapattığınızda veya yenilediğinizde girdiğiniz geçici veriler silinir.
* Sadece "Karanlık Mod" ve "Eklenti Açık/Kapalı" tercihiniz tarayıcınızın yerel hafızasında (LocalStorage) tutulur.

### 3. Açık Kaynak (Open Source)
* Bu projenin kodları tamamen açıktır. Dileyen herkes kodları inceleyebilir ve herhangi bir zararlı yazılım veya arka kapı (backdoor) olmadığını teyit edebilir.

---

## 📞 İletişim

Sorularınız, önerileriniz veya katkıda bulunmak için:

* **Geliştirici:** Venoox (Emircan Demirci)
* **GitHub:** [github.com/EmircanDemirci](https://github.com/EmircanDemirci)
* **E-posta:** emircandemirci12@gmail.com
