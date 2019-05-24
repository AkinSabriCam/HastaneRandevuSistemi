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
    public class HastaneBLL
    {
        HastaneMapper hastaneMapper = new HastaneMapper();
        public List<HastaneDTO> Get()
        {
            using (HastaneRepository hastaneRepo = new HastaneRepository())
            {
               
                
                var model = hastaneRepo.Get(x => x.HastaneBolum, x => x.Doktor, x => x.Il, x => x.Ilce).ToList();

                return hastaneMapper.MapAll(model);
                   
            }
        }


        public HastaneDTO GetById(int id)
        {
            using(HastaneRepository hastaneRepo = new HastaneRepository())
            {
                try
                {  
                    var ent = hastaneRepo.GetById(x=>x.hastaneID==id,x=>x.Il,x=>x.Ilce, x => x.HastaneBolum, x => x.Doktor);

                   return  hastaneMapper.Map(ent);
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
                    var model = hastaneRepo.GetByFilter(x => x.ilceID == ilceId && x.ilID == ilId, x => x.HastaneBolum, x => x.Doktor, x => x.Il, x => x.Ilce).ToList();

                    return hastaneMapper.MapAll(model);

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
            using(HastaneRepository hastaneRepo = new HastaneRepository())
            {
                try
                {
                    var model = hastaneRepo.GetById(x=>x.hastaneID==id, x => x.Doktor, x => x.HastaneBolum, x => x.Il, x => x.Ilce);

                    HastaneBolumBLL hastanebolBusiness = new HastaneBolumBLL();
                    hastanebolBusiness.DeleteByHastane(model.HastaneBolum.ToList());

                    hastaneRepo.Delete(id);
                }
                catch
                {
                    throw;
                }


            }
        }
    }
}
