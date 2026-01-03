# 🎓 SABISCalculator

<div align="center">
  <img src="icon.png" alt="SABISCalculator Logo" width="120" height="120">
  <br>
  <h3>Sakarya Üniversitesi & SUBÜ Öğrencileri İçin Gelişmiş Not Hesaplayıcı</h3>
  <p>
    Ders ortalaması, Çan eğrisi simülasyonu ve Transkript GNO hesaplama aracı.
  </p>
</div>

---

## 📑 İçindekiler

1. [Proje Hakkında](#-proje-hakkında)
2. [Özellikler](#-özellikler)
3. [Kurulum](#-kurulum)
4. [Nasıl Kullanılır?](#-nasıl-kullanılır) 👈 *(Tıkla ve Git)*
5. [Gizlilik Politikası](#-gizlilik-politikası) 👈 *(Tıkla ve Git)*
6. [İletişim](#-iletişim)

---

## 🚀 Proje Hakkında

**SABISCalculator**, Sakarya Üniversitesi (SAÜ) ve Sakarya Uygulamalı Bilimler Üniversitesi (SUBÜ) öğrencilerinin kullandığı SABİS (OBS) sistemi üzerinde çalışan, açık kaynaklı bir Chrome eklentisidir.

Bu proje, temel altyapısı **[osmntahir/SabisAverageCalculator](https://github.com/osmntahir/SabisAverageCalculator)** reposundan fork'lanarak; **Venoox** tarafından modern arayüz, performans iyileştirmeleri, **Transkript GNO Hesaplama**, **Çan Eğrisi Simülasyonu** ve **Karanlık Mod** gibi kapsamlı özelliklerle yeniden geliştirilmiştir.

Eklenti tamamen **istemci taraflı (client-side)** çalışır ve verilerinizi hiçbir sunucuya göndermez.

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

Bu eklenti şu an geliştirici modunda kurulabilir:

1.  Bu projeyi **ZIP** olarak indirin veya `git clone` ile çekin.
2.  Google Chrome'da adres çubuğuna `chrome://extensions/` yazın.
3.  Sağ üstteki **"Geliştirici Modu"**nu açın.
4.  **"Paketlenmemiş öğe yükle"** butonuna tıklayın.
5.  İndirdiğiniz proje klasörünü seçin.
6.  Tebrikler! Eklenti kuruldu. SABİS'e giriş yapabilirsiniz.

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


  <p>
    <em>
      Bu proje, orijinal fikir sahibi <strong><a href="https://github.com/osmntahir">osmntahir</a></strong> olan 
      <strong><a href="https://github.com/osmntahir/SabisAverageCalculator">SabisAverageCalculator</a></strong> 
      projesi temel alınarak geliştirilmiştir.
    </em>
  </p>
