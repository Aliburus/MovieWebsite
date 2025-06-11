# MovieZone

MovieZone, modern ve şık bir arayüze sahip, React tabanlı bir film keşif platformudur. Kullanıcılar popüler filmleri, en yüksek puanlı filmleri, yakında çıkacak filmleri, haftalık trendleri ve rastgele film önerilerini görebilir. Ayrıca oyuncu/aktris detaylarına ve oynadıkları filmlere ulaşabilirler.

## Özellikler

- **Ana Sayfa:**

  - Popüler filmler, en yüksek puanlı filmler, yakında çıkacak filmler ve haftalık trend filmler slider olarak gösterilir.
  - Rastgele film önerisi bölümü.
  - Popüler aktörler/aktrisler grid görünümünde listelenir.

- **Arama:**

  - Navbar'da modern ve beyaz arama kutusu.
  - Yazarken otomatik arama (autocomplete) ve modalda sonuç gösterimi.

- **Film Detay Sayfası:**

  - Film hakkında detaylı bilgiler, oyuncu kadrosu ve benzer filmler.
  - Oyuncu kartına tıklayınca aktör/aktris detay sayfasına yönlendirme.

- **Aktör/Aktris Detay Sayfası:**

  - Profil fotoğrafı, biyografi (kısaltılmış ve 'Devamını Gör' ile açılır), doğum tarihi ve yeri.
  - Oynadığı filmler listesi, film kartına tıklayınca film detayına yönlendirme.

- **Navbar:**
  - Siyah arka plan, modern ikonlar (favori ve hesap), kategori butonları.

## Kurulum

1. Depoyu klonlayın:
   ```bash
   git clone <repo-url>
   cd MovieWebsite/frontend
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. .env dosyası oluşturun ve TMDB API anahtarınızı ekleyin:
   ```env
   REACT_APP_TMDB_API_KEY=your_api_key_here
   ```
4. Uygulamayı başlatın:
   ```bash
   npm start
   ```

## Kullanılan Teknolojiler

- React
- React Router
- Axios
- TailwindCSS
- React Icons
- The Movie Database (TMDB) API

## Güvenlik ve Notlar

- API anahtarı .env dosyasında tutulur, güvenlik için paylaşmayınız.
- Çerez ve kullanıcı verisi saklanmaz.

## Katkı

Katkıda bulunmak için fork'layıp pull request gönderebilirsiniz.

---

MovieZone © 2024
