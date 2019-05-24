using ModelLayer.DTOs;
using ModelLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MappingLayer.Mappers
{
    public class DoktorMapper
    {
        public List<DoktorDTO> MapAll(List<Doktor> model)
        {
            var doktorlar = new List<DoktorDTO>();
            foreach (var ent in model.ToList())
            {
                var doktor = new DoktorDTO();
                doktor.adi = ent.adi;
                doktor.bolumAdi = ent.Bolum.bolumAdi;
                doktor.bolumID = ent.bolumID;
                doktor.doktorID = ent.doktorID;
                doktor.hastaneAdi = ent.Hastane.hastaneAdi;
                doktor.hastaneID = ent.hastaneID;
                doktor.sifre = ent.sifre;
                doktor.soyadi = ent.soyadi;
                doktor.TCKN = ent.TCKN;
                doktor.telNo = ent.cepTelefonu;

                doktorlar.Add(doktor);
            }
            return doktorlar;
        }
        public DoktorDTO Map(Doktor ent)
        {
            var doktor = new DoktorDTO();
            doktor.adi = ent.adi;
            doktor.bolumAdi = ent.Bolum.bolumAdi;
            doktor.bolumID = ent.bolumID;
            doktor.doktorID = ent.doktorID;
            doktor.hastaneAdi = ent.Hastane.hastaneAdi;
            doktor.hastaneID = ent.hastaneID;
            doktor.sifre = ent.sifre;
            doktor.soyadi = ent.soyadi;
            doktor.telNo = ent.cepTelefonu;
            doktor.TCKN = ent.TCKN;

            return doktor;
        }
    }
}
