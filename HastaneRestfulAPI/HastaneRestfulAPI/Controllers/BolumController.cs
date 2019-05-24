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
    public class BolumController : ApiController
    {
        public IHttpActionResult Get()
        {
            BolumBLL bolumBusiness = new BolumBLL();
            var model = bolumBusiness.Get();
            return Ok(model);
        }

        public IHttpActionResult GetById(int id)
        {
            BolumBLL bolumBusiness = new BolumBLL();
            var model = bolumBusiness.GetById(id);
            return Ok(model);
        }
        [HttpPost]
        public IHttpActionResult Add(Bolum model)
        {
            BolumBLL bolumBusiness = new BolumBLL();
            bolumBusiness.Add(model);
            return Ok();
        }
        [HttpPut]
        public IHttpActionResult Update(Bolum model)
        {
            BolumBLL bolumBusiness = new BolumBLL();
            bolumBusiness.Update(model);
            return Ok();
        }

        public IHttpActionResult Delete(int id)
        {
            BolumBLL bolumBusiness = new BolumBLL();
            bolumBusiness.Delete(id);
            return Ok();
        }

    }
}
