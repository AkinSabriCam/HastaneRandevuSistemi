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
    public class HastanelerController : ApiController
    {

        public IHttpActionResult Get()
        {
            HastaneBLL hastaneBusiness = new HastaneBLL();
            var model = hastaneBusiness.Get();
            return Ok(model);
        }

        public IHttpActionResult GetById(int id)
        {
            HastaneBLL hastaneBusiness = new HastaneBLL();
            var model = hastaneBusiness.GetById(id);
            return Ok(model);
        }

        public IHttpActionResult GetByLocation(int ilId,int ilceId)
        {
            HastaneBLL hastaneBusiness = new HastaneBLL();
            var model = hastaneBusiness.GetByLocation(ilId, ilceId);
            return Ok(model);
        }
        [HttpPut]
        public IHttpActionResult Update(Hastane model)
        {
            HastaneBLL hastaneBusiness = new HastaneBLL();
            hastaneBusiness.Update(model);
            return Ok();
        }

        [HttpPost]
        public IHttpActionResult Add(Hastane model)
        {
            HastaneBLL hastaneBusiness = new HastaneBLL();
            hastaneBusiness.Add(model);
            return Ok();
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            HastaneBLL hastaneBusiness = new HastaneBLL();
            hastaneBusiness.Delete(id);
            return Ok();
        }
    }
}
