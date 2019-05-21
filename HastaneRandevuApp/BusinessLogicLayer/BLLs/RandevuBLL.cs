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
    public class RandevuBLL
    {
        RandevuMapper randevuMapper = new RandevuMapper();
        public List<RandevuDTO> Get()
        {
            using (RandevuRepository randevuRepo = new RandevuRepository())
            { 

                try
                {
                    var model = randevuRepo.Get(x => x.Doktor, x => x.Kullanici, x => x.Doktor.Bolum, x => x.Doktor.Hastane).ToList();
                    return randevuMapper.MapAll(model);
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

                    return randevuMapper.Map(ent);
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
                    var model = randevuRepo.GetByFilter(x => x.doktorID == id, x => x.Doktor, x => x.Kullanici, x => x.Doktor.Bolum, x => x.Doktor.Hastane).ToList();

                    return randevuMapper.MapAll(model);

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
                    var model = randevuRepo.GetByFilter(x => x.kullaniciID == id, x => x.Doktor, x => x.Kullanici, x => x.Doktor.Bolum, x => x.Doktor.Hastane).ToList();

                   
                    return randevuMapper.MapAll(model);
                }
                catch
                {
                    throw;
                }
            }
        }
        public List<RandevuDTO> GetOldByUserId(int id)
        {
            using (RandevuRepository randevuRepo = new RandevuRepository())
            {
                try
                {
                    var model = randevuRepo.GetByFilter(x => x.kullaniciID == id && x.durum==false, x => x.Doktor, x => x.Kullanici, x => x.Doktor.Bolum, x => x.Doktor.Hastane).ToList();


                    return randevuMapper.MapAll(model);
                }
                catch
                {
                    throw;
                }
            }
        }


        public List<RandevuDTO> GetForUser(DateTime tarih,int doktorId)
        {
            using (RandevuRepository randevuRepo = new RandevuRepository())
            {
                try
                {
                    var model = randevuRepo.GetByFilter(x => x.doktorID == doktorId && x.tarih == tarih).ToList();
                    if (model.Count < 19)
                    {
                        // bu tarihteki ilgili doktorun tüm randevularını döndü 

                        return randevuMapper.MapAll(model);
                    }
                    else
                    {
                        return null;
                    }
                }
                catch
                {
                    throw;
                }
            }
        }
        public  void Delete (int randevuId)
        {
            using (RandevuRepository randevuRepo = new RandevuRepository())
            {
                try
                {
                    var model = randevuRepo.GetById(randevuId, x => x.Doktor, x => x.Kullanici, x => x.Doktor.Bolum, x => x.Doktor.Hastane);
                    model.durum = false;
                }
                catch
                {
                    throw;
                }
            }
        }

        public void Add(int kullaniciId,int doktorId,DateTime tarih,TimeSpan saat)
        {
            using (RandevuRepository randevuRepo = new RandevuRepository())
            {
                try
                {
                    var randevu = new Randevu();

                    randevu.doktorID = doktorId;
                    randevu.kullaniciID = kullaniciId;
                    randevu.durum = true;
                    randevu.tarih = tarih;
                    randevu.saat = saat;
                    randevuRepo.Add(randevu);

                }
                catch
                {
                    throw;
                }

            }

        }
        
    }
}
