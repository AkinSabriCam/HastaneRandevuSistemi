using ModelLayer.DTOs;
using ModelLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MappingLayer.Mappers
{
    public class HastaneMapper
    {
        public List<HastaneDTO> MapAll(List<Hastane> model)
        {
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
        public HastaneDTO Map(Hastane ent)
        {
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

    }
}
