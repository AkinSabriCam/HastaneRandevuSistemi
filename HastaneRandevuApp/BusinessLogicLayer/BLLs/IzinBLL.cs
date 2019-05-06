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
    public class IzinBLL
    {
        IzinMapper izinMapper = new IzinMapper();

        public List<IzinDTO> Get()
        {
            using (IzinRepository izinRepo = new IzinRepository())
            {
                try
                {
                    var model = izinRepo.Get(x => x.Doktor).ToList();

                    return izinMapper.MapAll(model);
                }
                catch
                {
                    throw;
                }
            } 
        }
        public IzinDTO GetById(int id)
        {
            using (IzinRepository izinRepo = new IzinRepository())
            {
                try
                {
                    var model = izinRepo.GetById(id ,x => x.Doktor);

                    return izinMapper.Map(model);
                }
                catch
                {
                    throw;
                }
            }
        }

        public List<IzinDTO> GetByDoktorId(int id)
        {
            using (IzinRepository izinRepo = new IzinRepository())
            {
                try
                {
                    var model = izinRepo.GetByFilter(x => x.doktorID == id).ToList();

                    return izinMapper.MapAll(model);
                }
                catch
                {
                    throw;
                }
            }
        }

        public void Add(Izin model)
        {
            using (IzinRepository izinRepo = new IzinRepository())
            {
                try
                {
                    izinRepo.Add(model);
                }
                catch
                {
                    throw;
                }
            }
        }
        public void Update(Izin model)
        {
            using (IzinRepository izinRepo = new IzinRepository())
            {
                try
                {
                    izinRepo.Update(model);
                }
                catch
                {
                    throw;
                }
            }
        }
        public void Delete(int id)
        {
            using (IzinRepository izinRepo = new IzinRepository())
            {
                try
                {
                    izinRepo.Delete(id);
                }
                catch
                {
                    throw;
                }
            }
        }
    }
}
