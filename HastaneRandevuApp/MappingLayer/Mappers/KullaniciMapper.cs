using ModelLayer.DTOs;
using ModelLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MappingLayer.Mappers
{
    public class KullaniciMapper
    {
        public List<KullaniciDTO> MapAll(List<Kullanici> model)
        {
            var kullanicilar = new List<KullaniciDTO>();
            foreach (var ent in model.ToList())
            {
                var kullanici = new KullaniciDTO();
                kullanici.acikAdres = ent.KullaniciBilgileri.acikAdres;
                kullanici.adi = ent.KullaniciBilgileri.adi;
                kullanici.cinsiyet = ent.KullaniciBilgileri.cinsiyet;
                kullanici.dogumTarihi = ent.KullaniciBilgileri.dogumTarihi;
                kullanici.ilAdi = ent.KullaniciBilgileri.Il.ilAdi;
                kullanici.ilceAdi = ent.KullaniciBilgileri.Ilce.ilceAdi;
                kullanici.ilceID = ent.KullaniciBilgileri.ilceID;
                kullanici.ilID = ent.KullaniciBilgileri.ilID;
                kullanici.kullaniID = ent.kullaniciID;
                kullanici.soyadi = ent.KullaniciBilgileri.soyadi;
                kullanici.rolID = (int)ent.rolID;
                kullanici.email = ent.KullaniciBilgileri.email;
                kullanici.TCKN = ent.TCKN;
                kullanici.sifre = ent.sifre;
                kullanici.rol = ent.Rol.rolAdi;
                kullanici.telNo = ent.KullaniciBilgileri.cepTelefonu;

                kullanicilar.Add(kullanici);
            }
            return kullanicilar;
        }
        public KullaniciDTO Map(Kullanici ent)
        {
            var kullanici = new KullaniciDTO();
            kullanici.acikAdres = ent.KullaniciBilgileri.acikAdres;
            kullanici.adi = ent.KullaniciBilgileri.adi;
            kullanici.cinsiyet = ent.KullaniciBilgileri.cinsiyet;
            kullanici.dogumTarihi = ent.KullaniciBilgileri.dogumTarihi;
            kullanici.ilAdi = ent.KullaniciBilgileri.Il.ilAdi;
            kullanici.ilceAdi = ent.KullaniciBilgileri.Ilce.ilceAdi;
            kullanici.ilceID = ent.KullaniciBilgileri.ilceID;
            kullanici.ilID = ent.KullaniciBilgileri.ilID;
            kullanici.kullaniID = ent.kullaniciID;
            kullanici.soyadi = ent.KullaniciBilgileri.soyadi;
            kullanici.rolID = (int)ent.rolID;
            kullanici.email = ent.KullaniciBilgileri.email;
            kullanici.TCKN = ent.TCKN;
            kullanici.sifre = ent.sifre;
            kullanici.rol = ent.Rol.rolAdi;
            kullanici.telNo = ent.KullaniciBilgileri.cepTelefonu;


            return kullanici;
        }
    }
}
