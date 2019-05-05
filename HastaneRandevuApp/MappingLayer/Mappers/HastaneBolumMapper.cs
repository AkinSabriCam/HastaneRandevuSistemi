using ModelLayer.DTOs;
using ModelLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MappingLayer.Mappers
{
    public class HastaneBolumMapper
    {
        public List<HastaneBolumDTO> MapAll(List<HastaneBolum> model)
        {
            var Bolumler = new List<HastaneBolumDTO>();
            foreach(var hasbolum  in model)
            {
                var hasbolumdto = new HastaneBolumDTO();
                hasbolumdto.bolumAdi = hasbolum.Bolum.bolumAdi;
                hasbolumdto.bolumID = hasbolum.bolumID;
                hasbolumdto.hastaneBolumID = hasbolum.hastaneBolumID;
                hasbolumdto.hastaneID = hasbolum.hastaneID;

                Bolumler.Add(hasbolumdto);
            }

            return Bolumler;
        }

        public HastaneBolumDTO Map(HastaneBolum hasbolum)
        {
            var Bolumler = new List<HastaneBolumDTO>();
            
                var hasbolumdto = new HastaneBolumDTO();
                hasbolumdto.bolumAdi = hasbolum.Bolum.bolumAdi;
                hasbolumdto.bolumID = hasbolum.bolumID;
                hasbolumdto.hastaneBolumID = hasbolum.hastaneBolumID;
                hasbolumdto.hastaneID = hasbolum.hastaneID;

                Bolumler.Add(hasbolumdto);
            
            return hasbolumdto;
        }

    }
}
