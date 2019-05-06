using ModelLayer.DTOs;
using ModelLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MappingLayer.Mappers
{
    public class IzinMapper
    {
        public List<IzinDTO> MapAll(List<Izin> model)
        {
            var izinler = new List<IzinDTO>();
            foreach (var ent in model.ToList())
            {
                var izin = new IzinDTO();
                izin.baslangicSaati = ent.baslangicSaati;
                izin.baslangicTarihi = ent.baslangicTarihi;
                izin.bitisSaati = ent.bitisSaati;
                izin.bitisTarihi = ent.bitisTarihi;
                izin.doktorAdi = ent.Doktor.adi;
                izin.doktorID = ent.doktorID;
                izin.izinID = ent.izinID;
                izin.doktorSoyadi = ent.Doktor.soyadi;

                izinler.Add(izin);
            }
            return izinler;
        }
        public IzinDTO Map(Izin ent)
        {
            var izin = new IzinDTO();
            izin.baslangicSaati = ent.baslangicSaati;
            izin.baslangicTarihi = ent.baslangicTarihi;
            izin.bitisSaati = ent.bitisSaati;
            izin.bitisTarihi = ent.bitisTarihi;
            izin.doktorAdi = ent.Doktor.adi;
            izin.doktorID = ent.doktorID;
            izin.izinID = ent.izinID;
            izin.doktorSoyadi = ent.Doktor.soyadi;

            return izin;
        }
    }
}
