using ModelLayer.DTOs;
using ModelLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MappingLayer.Mappers
{
    public class RandevuMapper
    {
        public List<RandevuDTO> MapAll(List<Randevu> model)
        {
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
        public RandevuDTO Map(Randevu ent)
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
            
            return randevu;
        }

        public List<RandevuDonusDTO> MapDonus(List<Randevu> model)
        {
            var Randevular = new List<RandevuDonusDTO>();
            foreach(var ent in model)
            {
                var randevu = new RandevuDonusDTO();
                randevu.doktorID = ent.doktorID;
                randevu.randevuID= ent.randevuID;
                randevu.saat = ent.saat;
                randevu.tarih = ent.tarih;

                Randevular.Add(randevu);
            }

            return Randevular;
        }

    }
}
