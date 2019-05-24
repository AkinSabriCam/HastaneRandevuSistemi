using ModelLayer.DTOs;
using ModelLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MappingLayer.Mappers
{
    public class FavoriMapper
    {
        public List<FavoriDTO> MapAll(List<Favori> model)
        {
            var favoriler = new List<FavoriDTO>();
            foreach (var ent in model.ToList())
            {
                var favori = new FavoriDTO();
                favori.doktorAdi = ent.Doktor.adi;
                favori.doktorID = ent.doktorID;
                favori.doktorSoyadi = ent.Doktor.soyadi;
                favori.favoriID = ent.favoriID;
                favori.kullaniciAdi = ent.Kullanici.KullaniciBilgileri.adi;
                favori.kullaniciSoyadi = ent.Kullanici.KullaniciBilgileri.soyadi;
                favori.kullaniciID = ent.kullaniciID;
                favori.bolumAd = ent.Doktor.Bolum.bolumAdi;
                favori.hastaneAdi = ent.Doktor.Hastane.hastaneAdi;

                favoriler.Add(favori);
            }
            return favoriler;
        }
        public FavoriDTO Map(Favori ent)
        {
            var favori = new FavoriDTO();
            favori.doktorAdi = ent.Doktor.adi;
            favori.doktorID = ent.doktorID;
            favori.doktorSoyadi = ent.Doktor.soyadi;
            favori.favoriID = ent.favoriID;
            favori.kullaniciAdi = ent.Kullanici.KullaniciBilgileri.adi;
            favori.kullaniciSoyadi = ent.Kullanici.KullaniciBilgileri.soyadi;
            favori.kullaniciID = ent.kullaniciID;

            return favori;
        }
    }
}
