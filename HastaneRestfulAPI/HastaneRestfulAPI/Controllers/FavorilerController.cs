using BusinessLogicLayer.BLLs;
using ModelLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HastaneRestfulAPI.Controllers
{
    public class FavorilerController : ApiController
    {
        public IHttpActionResult GetById(int id)
        {
            FavoriBLL favoriBusiness = new FavoriBLL();
            var model = favoriBusiness.GetById(id);

            return Ok(model);
        }

        public IHttpActionResult GetByUserId(int id)
        {
            FavoriBLL favoriBusiness = new FavoriBLL();
            var model=favoriBusiness.GetBtKullaniciId(id);
            
            return Ok(model);
        }
        public IHttpActionResult Add(Favori model)
        {
            FavoriBLL favoriBusiness= new FavoriBLL();
            favoriBusiness.Add(model);
            return Ok();
        }
        public IHttpActionResult Delete(int id)
        {
            FavoriBLL favoriBusiness = new FavoriBLL();
            favoriBusiness.Delete(id);
            return Ok();
        }
    }
}
