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
                    var model = randevuRepo.Get(x => x.Doktor, x => x.Kullanici,x=>x.Kullanici.KullaniciBilgileri, x => x.Doktor.Bolum, x => x.Doktor.Hastane).ToList();
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
                    var ent = randevuRepo.GetById(x=>x.randevuID==id, x => x.Doktor, x => x.Kullanici, x => x.Kullanici.KullaniciBilgileri, x => x.Doktor.Bolum, x => x.Doktor.Hastane);

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
                    var model = randevuRepo.GetByFilter(x => x.doktorID == id && x.durum==true, x => x.Doktor, x => x.Kullanici,x=>x.Kullanici.KullaniciBilgileri ,x => x.Doktor.Bolum, x => x.Doktor.Hastane).ToList();

                    return randevuMapper.MapAll(model);

                }
                catch
                {
                    throw;
                }
            }
        }
        public List<RandevuDTO> GetOldByDoktorId(int id)
        {
            using (RandevuRepository randevuRepo = new RandevuRepository())
            {
                try
                {
                    var model = randevuRepo.GetByFilter(x => x.doktorID == id && x.durum == false, x => x.Doktor, x => x.Kullanici, x => x.Kullanici.KullaniciBilgileri, x => x.Doktor.Bolum, x => x.Doktor.Hastane).ToList();


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
                    var model = randevuRepo.GetByFilter(x => x.kullaniciID == id&& x.durum==true, x => x.Doktor,x => x.Kullanici,x => x.Kullanici.KullaniciBilgileri,x => x.Doktor.Bolum, x => x.Doktor.Hastane).ToList();

                   
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
                    var model = randevuRepo.GetByFilter(x => x.kullaniciID == id && x.durum==false, x => x.Doktor, x => x.Kullanici,x => x.Kullanici.KullaniciBilgileri, x => x.Doktor.Bolum, x => x.Doktor.Hastane).ToList();


                    return randevuMapper.MapAll(model);
                }
                catch
                {
                    throw;
                }
            }
        }


        public List<RandevuDonusDTO> GetForUser(DateTime tarih,int doktorId,int kullaniciId)
        {
            using (RandevuRepository randevuRepo = new RandevuRepository())
            {
                try
                {
                    var model = randevuRepo.GetByFilter(x => x.doktorID == doktorId && x.tarih == tarih && x.durum == true,x => x.Kullanici.KullaniciBilgileri, x => x.Doktor.Bolum, x => x.Doktor.Hastane).ToList();
                    if (model.Count < 16)
                    {
                          return randevuMapper.MapDonus(model);
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
                    var model = randevuRepo.GetById(x=>x.randevuID==randevuId, x => x.Doktor, x => x.Kullanici, x => x.Doktor.Bolum, x => x.Doktor.Hastane);
                    model.durum = false;
                    randevuRepo.Update(model);
                }
                catch
                {
                    throw;
                }
            }
        }

        public bool Add(Randevu model)
        {
            using (RandevuRepository randevuRepo = new RandevuRepository())
            {
                try
                {
                    if (CheckSameDate((int)model.kullaniciID, (DateTime)model.tarih, (TimeSpan)model.saat))
                    {
                        // hastanın aynı saatte başka bir doktordan randevusu yoksa  buraya girecektir
                        randevuRepo.Add(model);
                        return true;
                    }
                    else
                    {
                        return false;
                    }

                }
                catch
                {
                    throw;
                }

            }

        }
        
        public bool CheckSameDoctor(int kullaniciId,int doktorId,DateTime tarih)
        {
            using (RandevuRepository randevuRepo= new RandevuRepository())
            {
                try
                {
                    var model=randevuRepo.GetByFilter(x => x.kullaniciID == kullaniciId && x.doktorID == doktorId && x.tarih == tarih, x => x.Doktor, x => x.Kullanici, x => x.Doktor.Bolum, x => x.Doktor.Hastane).ToList();
                    if (model.Count == 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                catch
                {
                    throw;
                }
                
            }
        }
        public bool CheckSameDate(int kullaniciId, DateTime tarih,TimeSpan saat)
        {
            using (RandevuRepository randevuRepo = new RandevuRepository())
            {
                try
                {
                    var model = randevuRepo.GetByFilter(x => x.kullaniciID == kullaniciId && x.tarih == tarih && x.saat == saat,x => x.Doktor, x => x.Kullanici, x => x.Doktor.Bolum, x => x.Doktor.Hastane).ToList();
                    if (model.Count == 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
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
