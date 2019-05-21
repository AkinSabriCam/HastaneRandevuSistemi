using ModelLayer.DTOs;
using ModelLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MappingLayer.Mappers
{
    public class IlceMapper
    {
        public List<IlceDTO> MapAll(List<Ilce> model)
        {
            var Ilceler = new List<IlceDTO>();
            foreach (var ent in model.ToList())
            {
                var ilce = new IlceDTO();
                ilce.ilceAdi = ent.ilceAdi;
                ilce.ilceID = ent.ilceID;
                ilce.ilID = ent.ilID;

                Ilceler.Add(ilce);
            }
            return Ilceler;
        }
        public IlceDTO Map(Ilce ent)
        {
            var ilce = new IlceDTO();
            ilce.ilceAdi = ent.ilceAdi;
            ilce.ilceID = ent.ilceID;
            ilce.ilID = ent.ilID;
            return ilce;
        }
    }
}
