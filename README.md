# Jectx'e hoşgeldiniz 👋👋

Jectx front-end github repo'sudur. Dosyayı kendinize klonladıktan sonra dosyayı açın, terminalinize ilgili dosyaya uzantısına gidin ve terminalinize ilk öncelikle;
```bash
npm install
```
yapın tüm npm paketleri indirin. Tüm paketleri indirdikten sonra;
```bash
npm run dev
```
yazıp dosyayı çalıştırabilirsiniz, genellikle "http://localhost:5173/" lokalinizde çalıştırır fakat o localhost doluysa başka host'a geçer zaten terminalinizde hangi hostta çalıştığını size verir.

Proje'nin altyapısı Vue.js, Vuetify ve Vuexy üzerine inşa edilmiştir. Proje de State Management ve LocalStorage ile verilerin dağıtımı gerçekleştirilmiştir. Gelen verilerin çalışması için ilk önce Login olmanız gerekmektedir çünkü login olduğunuzda veriler LocalStorage'ye yüklenir. Veriler Axios ile çekilmiştir. İlk gösterilen veriler ise o günün dün verisini getirir.

Proje içerisinde istatistik kartları için Chartjs ve ApexChart kütüphaneleri kullanılmıştır. 📈📈

Proje de iconları tabler icons kullanılmıştır.

Yüklenen paketleri daha detaylı görmek isterseniz package.json dosyasına bakabilirsin.



# Misafir Dağılım 🏨🛏️

Gelen misafirlerimizin dağılımlarını gösteren kartların listelendiği gösteren sayfadır.


## 1-) Yatak Dağılım 🛏️🌟
Burada seçili tarihi aralığında kullanılan yatak sayısını verir. 

Tek => Adı üzerinde tek bir kişinin tarafından kullanılan yatak Sayısı verir.

Çift => İki kişinin ya da Dört kişinin kullandığı yatak sayısını verir.

Aile => 5 kişiden 10 kişiye kadar kullanılan yatak sayısını verir.

Grup => +10 kişiye kadar kullanılan yatak sayısını verir.



## 2-) Geceleme Dağılım 🌙🛏️
Burada seçili tarihi aralığında kullanılan geceleme sayısını verir. 

Tek => Adı üzerinde tek bir kişinin tarafından kullanılan geceleme Sayısı verir.

Çift => İki kişinin ya da Dört kişinin kullandığı geceleme sayısını verir.

Aile => 5 kişiden 10 kişiye kadar kullanılan geceleme sayısını verir.

Grup => +10 kişiye kadar kullanılan geceleme sayısını verir.


## 3-) Ülkelere Göre Dağılım 🌍🏨

Burada seçili tarih aralığında gelen ziyaretçilerin hangi ülkeden olduğunu listeleyen bir karttır.

Sol tarafta ziyaretçilerin nereden geldiğini gösteren bayrak, o ülkeden gelen ziyaretçi sayısını ve o ülkenin adının kısaltılmışını verir.
Bayraklar tabler icondan gelir fakat şöyle bir durum vardır bize gelen datanın icon'un yapısına uygun değildir o yüzden ona uygun bir şekilde bayrak çıkartması için "iso3166" paketini kullanırız ve 3 harfli gelen ülke kısaltmasını biz 2 harfli kısaltmaya çevirerek iconun düzgün çıkmasını sağlarız. 🚩🚩

Sağ taraftaki rakamlar ise sol taraftan sırasıyla

Geceleme Sayısı, Oran, Adr sayısını verir.

## 4-) Oda Tipi Dağılımı 🏨🛏️

Burada seçili tarih aralığında gelen ziyaretçilerin hangi oda tipi kullandıklarını listeleyen bir karttır.

Sol tarafta oda tiplerini verir, sağ tarafta ise odada kaç kişinin kaldığı ve toplam geceleme ile oranına bakılıp bir oran verilir.



# Doluluk Dağılım 🛎️🔒

Otele gelen misafirlerin doluluklarının nasıl olduklarını gösteren kartların bulunduğu sayfadır.



## 1-) Rez Analiz 📊🏨

Rezervasyonların dağılımlarını gösteren bir karttır. 

Adet => Rezervasyon Adetlerini gösterir.

Geceleme => Rezervasyonların geceleme miktarını gösterir.

Oran => Geceleme ve Rezervasyon miktarının bölümünün oranını gösterir.

Gelir => Bu rezervasyon ve geceleme miktarlının gelirini gösterir.

## 2-) İptal Analiz ❌🏨

Rezervasyonların iptallerinin dağılımlarını gösteren karttır.

Adet => Rezervasyon Adetlerinin iptallerini gösterir.

Geceleme => Rezervasyonların geceleme iptallerinin miktarını gösterir.

Oran => Geceleme ve Rezervasyon iptallerinin miktarının bölümünün oranını gösterir.

Gelir => Bu rezervasyon ve geceleme iptal miktarlarının gelirini gösterir.

## 3-) İptal Edilebilir Analiz 💳🏨
İptal edilenlerin geri ödenebilenleri ve geri ödenemezleri gösteren karttır.
NRF=> Geri Ödenmez
RF=> Geri ödenir

Aşağıda seçili tarihteki NRF ve RF adetlerini gösterir.
Yukarıdaki istatistik bar ise seçili tarihin ortasını bulur ve 7 ay olacak şekilde istatistiğini verir.

## 4-) Geçmiş Doluluk ⏪⏪
Seçtiğiniz tarihin öncesindeki günü alır ve ardından bu tarihten başlayarak son bir haftalık dönemi, bar şeklinde geçmiş verileri istatistik olarak size gösterir.

İki tarih seçiyorsunuz, örneğin 2023-06-05 ile 2023-06-10 arası. Bu durumda, istatistik 2023-06-09 tarihinden başlayarak, son seçili olan tarihten bir önceki haftayı gösterir.

Eğer 2 aydan fazla bir tarih seçtiğiniz zaman size 1 yıllık bir istatistik verir.

## 5-) Gelecek Doluluk 🔮🏨
Seçtiğiniz tarihin öncesindeki günü alır ve ardından bu tarihten başlayarak son bir haftalık dönemi, bar şeklinde gelecek verileri istatistik olarak size gösterir.

İki tarih seçiyorsunuz, örneğin 2023-06-05 ile 2023-06-10 arası. Bu durumda, istatistik 2023-06-11 tarihinden başlayarak, son seçili olan tarihten bir sonraki haftayı gösterir.

Eğer 2 aydan fazla bir tarih seçtiğiniz zaman size 1 yıllık bir istatistik verir.

# Rezervasyon Gelir 💰🏨
Rezervasyonlardan edilen gelirleri gösteren kartların bulunduğu sayfadır.

## 1-) Aylık Kazanç Durumu 📅💰
Aylık olarak kazançları gösteren karttır.
Sol üstte Kazancı ve hedef ile oranlarımasını gösteriyor. Sağ üstte ise ayların kazançlarını gösteren bir bar istatistiği mevcut.

Aşağıda ise Hedef ve kazancı vermiştir, sağda ise ne kadar kayıp yaşadığını verir.
Aşağıdaki yan çizgi yüzde doluluk olan bar ise hedef'e ne kadar yakınlaştığını gösterir.

## 2-) Günlük Takip 📈📊
Gelirlerin günlük olarak gösteren karttır.
Sol üstte Rezervasyon miktarını gösterir.
Sol altta ise üstten alttağı şekilde;
ADR => Günlük Ortalama satış fiyat
Gelir => Günlük Geliri
Kayıp => Günlük Kayıp
Sağ tarafta ise ne kadar doluluk oranı olduğunu gösteriyor

## 3-) Kanal Dağılım Gelirler 📈💰
Kanallara göre aylık gelirleri gösteren karttır.


# Rezervasyon Analiz 📊🏨

## 1-) Rezerv Miktarı 🔢🏨
Seçili tarihin rezervasyon miktarını gösteren karttır.
Soldaki yerde ne kadar kişinin rezervasyon yapıldığını gösteren, seçili tarihin misafir ve öbür aylardan gelen verilerdeki misafirlare göre başarı oranını gösteriyor.
Sağ taraftaki pasta dilimi olan istatistik tablosunda misafirlerin hangi kanallardan geldiğini gösteriyor. Ortasında ise geceleme miktarını gösteriyor.

## 2-) Kanallara Göre Rezerv Dağılımı 📊 🏨
Seçili tarihlerde gelen misafirlerin hangi kanallarda geldiğini gösteren karttır. Rakamlar gelen misafir rakamını veriyor

## 3-) Onl Rezerv 📝🏨

Seçili tarihin rezervasyon miktarını gösteren karttır.
Soldaki yerde ne kadar kişinin rezervasyon yapıldığını gösteren, seçili tarihin misafir ve öbür aylardan gelen verilerdeki misafirlare göre başarı oranını gösteriyor.
Sağ taraftaki pasta dilimi olan istatistik tablosunda misafirlerin internette hangi kanallardan geldiğini gösteriyor. Ortasında ise geceleme miktarını gösteriyor.

## 4-) Sırasıyla Doluluk Bar 📈🏨
Sırasıyla barlarda

Seçili tarihteki Gecelemeyi verir ve gecelemede odaların doluluk oranını verir.
Seçili tarihteki son 1 haftanın Gecelemeyi verir ve gecelemede odaların doluluk oranını verir.
Seçili tarihteki son 1 ayın Gecelemeyi verir ve gecelemede odaların doluluk oranını verir.
Seçili tarihteki son 7 ayın Gecelemeyi verir ve gecelemede odaların doluluk oranını verir.

## 5-) Geçmiş Rezervasyon ⏪⏪
Son haftanın geçmiş rezervasyon verilerini veren istatistik bar olarak veren karttır.

## 6-) CSV Çıktı 📝📝
Gelen kanallara göre listeleyen ve filtereleyerek listeyi görebileceğiniz yerdir.
Burada Csv çıktısı da alabilirsiniz.

# Geçmiş Karşılaştırma 🔄🏨
Burası rezervasyon karşılaştırmasıdır. 7 aylık ve 1 haftalık olmak üzere iki tane çizgili karşılaştırma istatistik tablomuz vardır. Değerleri o günün tarihinin bir önceki günden alıp başlar, çizgilerin bir tanesi günümüzü bir tanesi de geçen yılı gösterir. Seçili tarihe göre değişkenlik göstermez ❗️❗️
