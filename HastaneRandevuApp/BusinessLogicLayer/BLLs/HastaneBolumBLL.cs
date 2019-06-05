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
    public class HastaneBolumBLL
    {
        HastaneBolumMapper hasbolumMaper = new HastaneBolumMapper();
        public List<HastaneBolumDTO> Get(int hastaneId)
        {
            using(HastaneBolumRepository  hasbolRepo = new HastaneBolumRepository())
            {
                try
                {
                    var model= hasbolRepo.GetByFilter(x=>x.hastaneID==hastaneId,x=>x.Bolum,x=>x.Hastane).ToList();

                    return hasbolumMaper.MapAll(model);
                }
                catch
                {
                    throw;
                }

            }
        }

        public void Add(HastaneBolum model)
        {
            using(HastaneBolumRepository hasbolumRepo = new HastaneBolumRepository())
            {
                try
                {
                    hasbolumRepo.Add(model);
                }
                catch
                {
                    throw;
                }
                
            }
        }

        public void DeleteByHastane(List<HastaneBolum> model)
        {
            //hastaneden bölüm kaldırma işleminin yapıldığı metotdur.

            using(HastaneBolumRepository hasbolRepo = new HastaneBolumRepository())
            {
                try
                {
                    DoktorBLL doktorBusiness = new DoktorBLL();

                    foreach (var hasbolum in model.ToList())
                    {
                        var doktorlar=doktorBusiness.GetByBolumIdHastaneId((int)hasbolum.hastaneID, (int)hasbolum.bolumID).ToList();
                        // bu hastane ve bu bölümdeki doktorları getir

                        foreach (var doktor in doktorlar)
                        {  // bu doktorların herbirini doktor businessda ki delete metodu ile sil
                            doktorBusiness.Delete(doktor.doktorID);
                        }

                        hasbolRepo.Delete(hasbolum.hastaneBolumID);
                    }
                    
                }
                catch
                {
                    throw;
                }

            }
            
        }

        public void DeleteByBolum(List<HastaneBolum> model)
        {
            //bölüm silme işlemi yapılacak olan silme işlemidir

            using (HastaneBolumRepository hasbolRepo = new HastaneBolumRepository())
            {
                try
                {
                    DoktorBLL doktorBusiness = new DoktorBLL();

                    foreach (var hasbolum in model.ToList())
                    {
                       
                        
                        foreach (var doktor in hasbolum.Bolum.Doktor.ToList())
                        {  // bu doktorların herbirini doktor businessda ki delete metodu ile sil
                            doktorBusiness.Delete(doktor.doktorID);
                        }

                        hasbolRepo.Delete(hasbolum.hastaneBolumID);
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
