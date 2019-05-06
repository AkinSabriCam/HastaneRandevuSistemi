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
        public void Add(Kullanici model)
        {
            using (KullaniciRepository kullaniciRepo = new KullaniciRepository())
            {
                try
                {
                    kullaniciRepo.Add(model);
                }
                catch
                {
                    throw;
                }
            }
        }
        public void Update(Kullanici model)
        {
            using (KullaniciRepository kullaniciRepo = new KullaniciRepository())
            {
                try
                {
                    kullaniciRepo.Update(model);
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
                }
                catch
                {
                    throw;
                }
            }
        }
    }
}
