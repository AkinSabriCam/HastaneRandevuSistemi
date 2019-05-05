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
    public class HastaneBLL
    {
        public List<HastaneDTO> Get()
        {
            using (HastaneRepository hastaneRepo = new HastaneRepository())
            {

                var model = hastaneRepo.Get(x => x.Bolum, x => x.Doktor, x => x.Il, x => x.Ilce).ToList();
               
                    var hastaneler = new List<HastaneDTO>();
                    foreach (var ent in model.ToList())
                    {
                        var hastane = new HastaneDTO();
                        hastane.acikAdres = ent.acikAdres;
                        hastane.hastaneAdi = ent.hastaneAdi;
                        hastane.hastaneID = ent.hastaneID;
                        hastane.ilAdi = ent.Il.ilAdi;
                        hastane.ilceAdi = ent.Ilce.ilceAdi;
                        hastane.ilceID = ent.ilceID;
                        hastane.ilID = ent.ilID;

                        hastaneler.Add(hastane);
                    }
                    return hastaneler;
            }
        }


        public HastaneDTO GetById(int id)
        {
            using(HastaneRepository hastaneRepo = new HastaneRepository())
            {
                try
                {
                    var ent = hastaneRepo.GetById(id);

                    var hastane = new HastaneDTO();
                    hastane.acikAdres = ent.acikAdres;
                    hastane.hastaneAdi = ent.hastaneAdi;
                    hastane.hastaneID = ent.hastaneID;
                    hastane.ilAdi = ent.Il.ilAdi;
                    hastane.ilceAdi = ent.Ilce.ilceAdi;
                    hastane.ilceID = ent.ilceID;
                    hastane.ilID = ent.ilID;

                    return hastane;
                }
                catch 
                {
                    throw;
                }


            }
        }
        public List<HastaneDTO> GetByLocation(int ilId ,int ilceId)
        {
            using(HastaneRepository hastaneRepo = new HastaneRepository())
            {
                try
                {
                    var model = hastaneRepo.GetByFilter(x => x.ilceID == ilceId && x.ilID == ilId).ToList();

                    var hastaneler = new List<HastaneDTO>();
                    foreach (var ent in model.ToList())
                    {
                        var hastane = new HastaneDTO();
                        hastane.acikAdres = ent.acikAdres;
                        hastane.hastaneAdi = ent.hastaneAdi;
                        hastane.hastaneID = ent.hastaneID;
                        hastane.ilAdi = ent.Il.ilAdi;
                        hastane.ilceAdi = ent.Ilce.ilceAdi;
                        hastane.ilceID = ent.ilceID;
                        hastane.ilID = ent.ilID;

                        hastaneler.Add(hastane);
                    }
                    return hastaneler;

                }
                catch
                {
                    throw;
                }

            }

        }
        public void Add(Hastane model)
        {
            using (HastaneRepository hastaneRepo = new HastaneRepository())
            {
                try
                {
                    hastaneRepo.Add(model);
                }
                catch
                {
                    throw;
                }
            }
        }

        public void Update (Hastane model)
        {
            using(HastaneRepository hastaneRepo = new HastaneRepository())
            {
                try
                {
                    hastaneRepo.Update(model);
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
