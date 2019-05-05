using DAL.Concretes;
using ModelLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.BLLs
{
    public class RandevuBLL
    {
        public List<RandevuDTO> Get()
        {
            using (RandevuRepository randevuRepo = new RandevuRepository())
            {
                try
                {
                    var model = randevuRepo.Get(x => x.Doktor, x => x.Kullanici, x => x.Doktor.Bolum, x => x.Doktor.Hastane);
                    var Randevular = new List<RandevuDTO>();
                    foreach (var ent in model)
                    {
                        var randevu = new RandevuDTO();
                        randevu.bolumAdi = ent.Doktor.Bolum.bolumAdi;
                        randevu.doktorAdi = ent.Doktor.adi;
                        randevu.doktorID = ent.doktorID;
                        randevu.doktorSoyadi = ent.Doktor.soyadi;
                        randevu.durum = ent.durum;
                        randevu.HastaneAdi = ent.Doktor.Hastane.hastaneAdi;
                        randevu.kullaniciAdi = ent.Kullanici.KullaniciBilgileri.adi;
                        randevu.kullaniciID = ent.kullaniciID;
                        randevu.kullaniciSoyadi = ent.Kullanici.KullaniciBilgileri.soyadi;
                        randevu.randevuID = ent.randevuID;
                        randevu.saat = ent.saat;
                        randevu.tarih = ent.tarih;

                        Randevular.Add(randevu);
                    }
                    return Randevular;
                }
                catch
                {
                    throw;
                }
            }
        }

        public RandevuDTO GetById(int id)
        {
            using (RandevuRepository randevuRepo = new RandevuRepository())
            {
                try
                {
                    var ent = randevuRepo.GetById(id, x => x.Doktor, x => x.Kullanici, x => x.Doktor.Bolum, x => x.Doktor.Hastane);
                    var randevu = new RandevuDTO();
                    randevu.bolumAdi = ent.Doktor.Bolum.bolumAdi;
                    randevu.doktorAdi = ent.Doktor.adi;
                    randevu.doktorID = ent.doktorID;
                    randevu.doktorSoyadi = ent.Doktor.soyadi;
                    randevu.durum = ent.durum;
                    randevu.HastaneAdi = ent.Doktor.Hastane.hastaneAdi;
                    randevu.kullaniciAdi = ent.Kullanici.KullaniciBilgileri.adi;
                    randevu.kullaniciID = ent.kullaniciID;
                    randevu.kullaniciSoyadi = ent.Kullanici.KullaniciBilgileri.soyadi;
                    randevu.randevuID = ent.randevuID;
                    randevu.saat = ent.saat;
                    randevu.tarih = ent.tarih;

                    return randevu;
                }
                catch
                {
                    throw;
                }

            }

        }

        public List<RandevuDTO> GetByDoktorId(int id)
        {
            using (RandevuRepository randevuRepo = new RandevuRepository())
            {
                try
                {
                    var model = randevuRepo.GetByFilter(x => x.doktorID == id, x => x.Doktor, x => x.Kullanici, x => x.Doktor.Bolum, x => x.Doktor.Hastane);
                    var Randevular = new List<RandevuDTO>();
                    foreach (var ent in model)
                    {
                        var randevu = new RandevuDTO();
                        randevu.bolumAdi = ent.Doktor.Bolum.bolumAdi;
                        randevu.doktorAdi = ent.Doktor.adi;
                        randevu.doktorID = ent.doktorID;
                        randevu.doktorSoyadi = ent.Doktor.soyadi;
                        randevu.durum = ent.durum;
                        randevu.HastaneAdi = ent.Doktor.Hastane.hastaneAdi;
                        randevu.kullaniciAdi = ent.Kullanici.KullaniciBilgileri.adi;
                        randevu.kullaniciID = ent.kullaniciID;
                        randevu.kullaniciSoyadi = ent.Kullanici.KullaniciBilgileri.soyadi;
                        randevu.randevuID = ent.randevuID;
                        randevu.saat = ent.saat;
                        randevu.tarih = ent.tarih;

                        Randevular.Add(randevu);
                    }


                    return Randevular;
                }
                catch
                {
                    throw;
                }
            }
        }

        public List<RandevuDTO> GetByUserId(int id)
        {
            using (RandevuRepository randevuRepo = new RandevuRepository())
            {
                try
                {
                    var model = randevuRepo.GetByFilter(x => x.kullaniciID == id, x => x.Doktor, x => x.Kullanici, x => x.Doktor.Bolum, x => x.Doktor.Hastane);
                    var Randevular = new List<RandevuDTO>();
                    foreach (var ent in model)
                    {
                        var randevu = new RandevuDTO();
                        randevu.bolumAdi = ent.Doktor.Bolum.bolumAdi;
                        randevu.doktorAdi = ent.Doktor.adi;
                        randevu.doktorID = ent.doktorID;
                        randevu.doktorSoyadi = ent.Doktor.soyadi;
                        randevu.durum = ent.durum;
                        randevu.HastaneAdi = ent.Doktor.Hastane.hastaneAdi;
                        randevu.kullaniciAdi = ent.Kullanici.KullaniciBilgileri.adi;
                        randevu.kullaniciID = ent.kullaniciID;
                        randevu.kullaniciSoyadi = ent.Kullanici.KullaniciBilgileri.soyadi;
                        randevu.randevuID = ent.randevuID;
                        randevu.saat = ent.saat;
                        randevu.tarih = ent.tarih;

                        Randevular.Add(randevu);
                    }


                    return Randevular;
                }
                catch
                {
                    throw;
                }
            }
        }
    }
}
