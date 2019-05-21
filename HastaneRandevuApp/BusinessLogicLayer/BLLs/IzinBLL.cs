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
    public class IzinBLL
    {
        IzinMapper izinMapper = new IzinMapper();

        public List<IzinDTO> Get()
        {
            using (IzinRepository izinRepo = new IzinRepository())
            {
                try
                {
                    var model = izinRepo.Get(x => x.Doktor).ToList();

                    return izinMapper.MapAll(model);
                }
                catch
                {
                    throw;
                }
            } 
        }
        public IzinDTO GetById(int id)
        {
            using (IzinRepository izinRepo = new IzinRepository())
            {
                try
                {
                    var model = izinRepo.GetById(id ,x => x.Doktor);

                    return izinMapper.Map(model);
                }
                catch
                {
                    throw;
                }
            }
        }

        public List<IzinDTO> GetByDoktorId(int id)
        {
            using (IzinRepository izinRepo = new IzinRepository())
            {
                try
                {
                    var model = izinRepo.GetByFilter(x => x.doktorID == id).ToList();

                    return izinMapper.MapAll(model);
                }
                catch
                {
                    throw;
                }
            }
        }

        //public IzinDTO IzınKontrol(DateTime tarih, int doktorId)
        //{
        //    using (IzinRepository izinRepo = new IzinRepository())
        //    {
        //        try
        //        {
        //           var model = izinRepo.GetByFilter(x => x.doktorID == doktorId &&x.baslangicTarihi>=tarih && x.bitisTarihi<=tarih).ToList();

        //            return izinMapper.Map(model[0]);
        //        }
        //        catch
        //        {
        //            throw;
        //        }
        //    }
        //}

        public void Add(Izin model)
        {
            using (IzinRepository izinRepo = new IzinRepository())
            {
                try
                {
                    izinRepo.Add(model);
                    // izin ekleme işlemi yapıldı 
                    var gunFark = 0;
                    var saatFark = 0;
                    // saat farkını hesapla
                    // gün farkını hesapla
                    saatFark = model.bitisSaati.Value.Hours - model.baslangicSaati.Value.Hours;
                    gunFark = model.bitisTarihi.Value.Day - model.baslangicTarihi.Value.Day;
                    

                    if (gunFark == 0)
                    { 
                        while (model.baslangicSaati.Value.Hours < model.bitisSaati.Value.Hours)
                        {
                            if (model.baslangicSaati.Value.Hours!=12 || model.baslangicSaati.Value.Hours != 12.30)
                            {
                                var ts = TimeSpan.FromMinutes(30);
                                model.baslangicSaati = model.baslangicSaati.Value.Add(ts);
                                // burada başlangıx saati ile bitis saati arasında döngü yapıyor 30 dakika ekliyor her döngüde

                                var randevu = new Randevu();
                                randevu.doktorID = model.doktorID;
                                randevu.durum = true;
                                randevu.kullaniciID = 1;
                                randevu.saat = model.baslangicSaati;
                                randevu.tarih = model.baslangicTarihi;

                                RandevuBLL randBusiness = new RandevuBLL();
                                randBusiness.Add(1,(int)model.doktorID,(DateTime)model.baslangicTarihi,(TimeSpan)model.baslangicSaati);
                            }

                        }
                    }
                    else
                    {
                        while (model.baslangicTarihi.Value.Day<model.bitisTarihi.Value.Day)
                        {
                            if (model.baslangicTarihi.Value.DayOfWeek!=DayOfWeek.Saturday|| model.baslangicTarihi.Value.DayOfWeek != DayOfWeek.Sunday)
                            {
                                
                                while (model.baslangicSaati.Value.Hours < model.bitisSaati.Value.Hours)
                                {
                                    if (model.baslangicSaati.Value.Hours != 12 || model.baslangicSaati.Value.Hours != 12.30)
                                    {
                                        var ts = TimeSpan.FromMinutes(30);
                                        model.baslangicSaati = model.baslangicSaati.Value.Add(ts);
                                        // burada başlangıx saati ile bitis saati arasında döngü yapıyor 30 dakika ekliyor her döngüde

                                        var randevu = new Randevu();
                                        randevu.doktorID = model.doktorID;
                                        randevu.durum = true;
                                        randevu.kullaniciID = 1;
                                        randevu.saat = model.baslangicSaati;
                                        randevu.tarih = model.baslangicTarihi;

                                        RandevuBLL randBusiness = new RandevuBLL();
                                        randBusiness.Add(1, (int)model.doktorID, (DateTime)model.baslangicTarihi, (TimeSpan)model.baslangicSaati);
                                    }

                                }

                                model.baslangicTarihi = model.baslangicTarihi.Value.AddDays(1);

                            }

                        }


                    }
                    
                }
                catch
                {
                    throw;
                }
            }
        }
        public void Update(Izin model)
        {
            using (IzinRepository izinRepo = new IzinRepository())
            {
                try
                {
                    izinRepo.Update(model);
                }
                catch
                {
                    throw;
                }
            }
        }
        public void Delete(int id)
        {
            using (IzinRepository izinRepo = new IzinRepository())
            {
                try
                {
                    izinRepo.Delete(id);
                }
                catch
                {
                    throw;
                }
            }
        }
    }
}
