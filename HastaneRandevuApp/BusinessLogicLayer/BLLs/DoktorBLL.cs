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
    public class DoktorBLL
    {
        DoktorMapper doktorMapper = new DoktorMapper();
        public List<DoktorDTO> Get()
        {
            using (DoktorRepository doktorRepo = new DoktorRepository())
            {
                try
                {
                    var model = doktorRepo.Get(x => x.Bolum, x => x.Favori, x => x.Hastane, x => x.Randevu).ToList();

                    return doktorMapper.MapAll(model);
                }
                catch
                {
                    throw;
                }

            }

        }

        public DoktorDTO GetById(int id)
        {
            using (DoktorRepository doktorRepo = new DoktorRepository())
            {
                try
                {
                    var model = doktorRepo.GetById(id, x => x.Bolum, x => x.Favori, x => x.Hastane, x => x.Randevu);

                    return doktorMapper.Map(model);
                }
                catch
                {
                    throw;
                }
            }
        }
        public List<DoktorDTO> GetByBolumId(int id)
        {
            using (DoktorRepository doktorRepo = new DoktorRepository())
            {
                try
                {
                    var model = doktorRepo.GetByFilter(x => x.bolumID == id).ToList();

                    return doktorMapper.MapAll(model);
                }
                catch
                {
                    throw;
                }
            }
        }
        public List<DoktorDTO> GetByBolumIdHastaneId(int hastaneId,int bolumId)
        {
            using (DoktorRepository doktorRepo = new DoktorRepository())
            {
                try
                {
                    var model = doktorRepo.GetByFilter(x => x.bolumID == bolumId && x.hastaneID==hastaneId).ToList();

                    return doktorMapper.MapAll(model);
                }
                catch
                {
                    throw;
                }
            }
        }


        public void Add(Doktor model)
        {
            using (DoktorRepository doktorRepo = new DoktorRepository())
            {
                try
                {
                    doktorRepo.Add(model);
                }
                catch
                {
                    throw;
                }
            }
        }

        public void Update(Doktor model)
        {
            using (DoktorRepository doktorRepo = new DoktorRepository())
            {
                try
                {
                    doktorRepo.Update(model);
                }
                catch
                {
                    throw;
                }
            }
        }

        public void Delete(int id)
        {
            using(DoktorRepository doktorRepo = new DoktorRepository())
            {
                try
                {
                    var model = doktorRepo.GetById(id, x => x.Bolum, x => x.Hastane, x => x.Randevu, x => x.Favori);

                    RandevuBLL randevuBusiness = new RandevuBLL();

                    foreach(var rand in model.Randevu.ToList())
                    {
                        randevuBusiness.Delete(rand.randevuID);
                        // doktorun tüm randevularını ilgili business'daki ilgili metota yönlendirdik.
                    }

                    doktorRepo.Delete(id);
                }
                catch
                {
                    throw;
                }


            }
        }
    }
}
