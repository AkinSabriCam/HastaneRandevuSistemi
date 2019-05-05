using DAL.Concretes;
using ModelLayer.DTOs;
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
                    var ent = bolumRepo.GetById(id);
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

        }
        
    }
}
