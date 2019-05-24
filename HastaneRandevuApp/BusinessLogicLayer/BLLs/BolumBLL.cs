using DAL.Concretes;
using ModelLayer.DTOs;
using ModelLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.BLLs
{
    public class BolumBLL
    {
        public List<BolumDTO> Get()
        {
            using (BolumRepository bolumRepo = new BolumRepository())
            {
                try
                {
                    var model = bolumRepo.Get(x => x.Doktor, x => x.HastaneBolum);
                    var Bolumler = new List<BolumDTO>();
                    foreach (var ent in model.ToList())
                    {
                        var bolum = new BolumDTO();
                        bolum.bolumAdi = ent.bolumAdi;
                        bolum.bolumID = ent.bolumID;
                       
                        Bolumler.Add(bolum);
                    }
                    return Bolumler;
                }
                catch
                {
                    throw;
                }
            }
        }

        public BolumDTO GetById(int id)
        {

            using(BolumRepository bolumRepo = new BolumRepository())
            {
                try
                {
                    var ent = bolumRepo.GetById(x=>x.bolumID==id);
                    var bolum = new BolumDTO();
                    bolum.bolumAdi = ent.bolumAdi;
                    bolum.bolumID = ent.bolumID;
                    
                    return bolum; 
                }
                catch
                {
                    throw;
                }

            }
        }
        public void Delete (int id)
        {
            using (BolumRepository bolumRepo = new BolumRepository())
            {
                try
                {
                    var bolum = bolumRepo.GetById(x=>x.bolumID==id ,x => x.Doktor, x => x.HastaneBolum);

                    HastaneBolumBLL hasbolBusiness = new HastaneBolumBLL();
                    hasbolBusiness.DeleteByBolum(bolum.HastaneBolum.ToList());

                    bolumRepo.Delete(id);
                }
                catch
                {
                    throw;
                }

            }
        }

        public void Add(Bolum model)
        {
            using (BolumRepository bolumRepo = new BolumRepository())
            {
                try
                {
                    bolumRepo.Add(model);
                }
                catch
                {
                    throw;
                }

            }
        }
        public void Update(Bolum model)
        {
            using(BolumRepository bolumRepo = new BolumRepository())
            {
                try
                {
                    bolumRepo.Update(model);
                }
                catch
                {
                    throw;
                }
            }

        }
        
    }
}
