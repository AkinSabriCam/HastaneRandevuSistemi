using DAL.Concretes;
using MappingLayer.Mappers;
using ModelLayer.DTOs;
using ModelLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.BLLs
{
    public class IlBLL
    {
        IlMapper ilmapper = new IlMapper();
        public List<IlDTO> Get()
        {
            using(IlRepository ilRepo = new IlRepository())
            {
                try
                {
                    var model = ilRepo.Get(x => x.Hastane, x => x.KullaniciBilgileri).ToList();
                    return ilmapper.MapAll(model);
                }
                catch
                {
                    throw;
                }

            }
        }

        public IlDTO GetById(int id)
        {
            using (IlRepository ilRepo = new IlRepository())
            {
                try
                {
                    var model = ilRepo.GetById(id,x=>x.Hastane,x=>x.KullaniciBilgileri);
                    return ilmapper.Map(model);
                }
                catch
                {
                    throw;
                }

            }
        }

        public void Add(Il model)
        {
            using (IlRepository ilRepo = new IlRepository())
            {
                try
                {
                    ilRepo.Add(model);
                }
                catch
                {
                    throw;
                }
            }
        }


    }
}
