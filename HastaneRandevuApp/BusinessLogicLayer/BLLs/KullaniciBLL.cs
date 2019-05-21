using DAL.Concretes;
using MappingLayer.Mappers;
using ModelLayer.DTOs;
using ModelLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.BLLs
{
    public class KullaniciBLL
    {
        KullaniciMapper kullaniciMapper = new KullaniciMapper();

        public List<KullaniciDTO> Get()
        {
            using (KullaniciRepository kullaniciRepo = new KullaniciRepository())
            {
                try
                {
                    var model = kullaniciRepo.Get(x => x.KullaniciBilgileri, x => x.Randevu, x => x.Rol, x => x.Favori).ToList();

                    return kullaniciMapper.MapAll(model);
                }
                catch
                {
                    throw;
                }
            }
        }
        public KullaniciDTO GetById(int id)
        {
            using (KullaniciRepository kullaniciRepo = new KullaniciRepository())
            {
                try
                {
                    var model = kullaniciRepo.GetById(id, x => x.KullaniciBilgileri, x => x.Randevu, x => x.Rol, x => x.Favori);

                    return kullaniciMapper.Map(model);
                }
                catch
                {
                    throw;
                }
            }
        }
        public void Add(KullaniciDTO model)
        {
            using (KullaniciRepository kullaniciRepo = new KullaniciRepository())
            {
                try
                {
                    var kullanici = new Kullanici();
                    kullanici.TCKN = model.TCKN;
                    kullanici.kullanicID = model.kullaniID;
                    kullanici.rolID = model.rolID;
                    kullanici.sifre = model.sifre;
                    kullaniciRepo.Add(kullanici);

                    using (KullaniciBilgileriRepository kullaniciBilRepo = new KullaniciBilgileriRepository())
                    {
                        try
                        {
                            var kulBil = new KullaniciBilgileri();
                            kulBil.acikAdres = model.acikAdres;
                            kulBil.adi = model.adi;
                            kulBil.cinsiyet = model.cinsiyet;
                            kulBil.dogumTarihi = model.dogumTarihi;
                            kulBil.ilceID = model.ilceID;
                            kulBil.ilID = model.ilID;
                            kulBil.kullaniID = kullanici.kullanicID;
                            kulBil.soyadi = model.soyadi;
                            kullaniciBilRepo.Add(kulBil);
                        }
                        catch
                        {
                            throw;
                        }
                    }
                 }
                catch
                {
                    throw;
                }
            }
        }
        public void Update(KullaniciDTO model)
        {
            using (KullaniciRepository kullaniciRepo = new KullaniciRepository())
            {
                try
                {
                    var kullanici = new Kullanici();
                    kullanici.TCKN = model.TCKN;
                    kullanici.kullanicID = model.kullaniID;
                    kullanici.rolID = model.rolID;
                    kullanici.sifre = model.sifre;
                    kullaniciRepo.Update(kullanici);

                    using (KullaniciBilgileriRepository kullaniciBilRepo = new KullaniciBilgileriRepository())
                    {
                        try
                        {
                            var kulBil = new KullaniciBilgileri();
                            kulBil.acikAdres = model.acikAdres;
                            kulBil.adi = model.adi;
                            kulBil.cinsiyet = model.cinsiyet;
                            kulBil.dogumTarihi = model.dogumTarihi;
                            kulBil.ilceID = model.ilceID;
                            kulBil.ilID = model.ilID;
                            kulBil.kullaniID = kullanici.kullanicID;
                            kulBil.soyadi = model.soyadi;
                            kullaniciBilRepo.Update(kulBil);
                        }
                        catch
                        {
                            throw;
                        }
                    }

                }
                catch
                {
                    throw;
                }
            }
        }
        public void Delete(int id)
        {
            using (KullaniciRepository kullaniciRepo = new KullaniciRepository())
            {
                try
                {
                    kullaniciRepo.Delete(id);

                    using(KullaniciBilgileriRepository kullaniciBilRepo = new KullaniciBilgileriRepository())
                    {
                        try
                        {
                            kullaniciBilRepo.Delete(id);
                        }
                        catch
                        {
                            throw;
                        }
                    }
                }
                catch
                {
                    throw;
                }
            }
        }
    }
}
