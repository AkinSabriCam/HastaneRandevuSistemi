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

    }
}
