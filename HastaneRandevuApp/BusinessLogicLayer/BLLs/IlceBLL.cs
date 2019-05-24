using DAL.Concretes;
using MappingLayer.Mappers;
using ModelLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.BLLs
{
    public class IlceBLL
    {
        IlceMapper ilceMapper = new IlceMapper();


        public List<IlceDTO> Get()
        {
            using(IlceRepository ilceRepo = new IlceRepository())
            {
                try
                {
                    var model = ilceRepo.Get(x => x.Il, x => x.Hastane, x => x.KullaniciBilgileri).ToList();
                    return ilceMapper.MapAll(model);
                }
                catch
                {
                    throw;
                }

            }
        }

        public IlceDTO GetById(int id)
        {
            using(IlceRepository ilceRepo = new IlceRepository())
            {
                try
                {
                    var model = ilceRepo.GetById(x=>x.ilceID==id, x => x.Il, x => x.Hastane, x => x.KullaniciBilgileri);
                    return ilceMapper.Map(model);
                }
                catch
                {
                    throw;
                }
            }

        }


            public List<IlceDTO> GetByIlId(int id)
            {
                using(IlceRepository ilceRepo = new IlceRepository())
                {
                    try
                    {
                        var model = ilceRepo.GetByFilter(x => x.ilID == id, x => x.Hastane, x => x.KullaniciBilgileri).ToList();
                        return ilceMapper.MapAll(model);
                    }
                    catch
                    {
                        throw;
                    }
                }
            }
        
    }
}
