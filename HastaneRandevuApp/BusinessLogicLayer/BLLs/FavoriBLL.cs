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
    public class FavoriBLL
    {
        FavoriMapper favoriMapper = new FavoriMapper();
        
        public List<FavoriDTO> Get()
        {
            using (FavoriRepository favoriRepo = new FavoriRepository())
            {
                try
                {
                    var model = favoriRepo.Get(x => x.Doktor, x => x.Kullanici).ToList();

                    return favoriMapper.MapAll(model);
                }
                catch
                {
                    throw;
                }
            }
        } 

        public FavoriDTO GetById(int id)
        {
            using (FavoriRepository favoriRepo = new FavoriRepository())
            {
                try
                {
                    var model = favoriRepo.GetById(id, x => x.Doktor, x => x.Kullanici);

                    return favoriMapper.Map(model);
                }
                catch
                {
                    throw;
                }
            }
        }

        public List<FavoriDTO> GetBtKullaniciId(int id)
        {
            using (FavoriRepository favoriRepo = new FavoriRepository())
            {
                try
                {
                    var model = favoriRepo.GetByFilter(x => x.kullaniciID == id).ToList();

                    return favoriMapper.MapAll(model);
                }
                catch
                {
                    throw;
                }
            }
        }

        public void Add(Favori model)
        {
            using (FavoriRepository favoriRepo = new FavoriRepository())
            {
                try
                {
                    favoriRepo.Add(model);
                }
                catch
                {
                    throw;
                }
            }
        }
        public void Update(Favori model)
        {
            using (FavoriRepository favoriRepo = new FavoriRepository())
            {
                try
                {
                    favoriRepo.Update(model);
                }
                catch
                {
                    throw;
                }
            }
        }
        public void Delete(int id)
        {
            using (FavoriRepository favoriRepo = new FavoriRepository())
            {
                try
                {
                    favoriRepo.Delete(id);
                }
                catch
                {
                    throw;
                }
            }
        }


    }
}
