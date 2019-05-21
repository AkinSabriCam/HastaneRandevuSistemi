using ModelLayer.DTOs;
using ModelLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MappingLayer.Mappers
{
    public class IlMapper
    {
        public List<IlDTO> MapAll(List<Il> model)
        {
            var Iller = new List<IlDTO>();
            foreach (var ent in model.ToList())
            {
                var il = new IlDTO();
                il.ilAdi = ent.ilAdi;
                il.ilID = ent.ilID;

                Iller.Add(il);
            }
            return Iller;
        }
        public IlDTO Map(Il ent)
        {
            var il = new IlDTO();
            il.ilAdi = ent.ilAdi;
            il.ilID = ent.ilID;
            
            return il;
        }
    }
}
