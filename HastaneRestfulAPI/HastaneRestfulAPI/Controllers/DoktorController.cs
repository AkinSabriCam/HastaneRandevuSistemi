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
    public class DoktorController : ApiController
    {
        public IHttpActionResult Get()
        {
            DoktorBLL doktorBusiness = new DoktorBLL();
            var model=doktorBusiness.Get();
            return Ok(model);
        }
        public IHttpActionResult GetById(int id)
        {
            DoktorBLL doktorBusiness = new DoktorBLL();
            var model = doktorBusiness.GetById(id);
            return Ok(model);
        }

        public IHttpActionResult GetByBolumIdHasId(int hastaneid,int bolumid)
        {
            DoktorBLL doktorBusiness = new DoktorBLL();
            var model = doktorBusiness.GetByBolumIdHastaneId(hastaneid,bolumid);
            return Ok(model);
        }

        public IHttpActionResult Add(Doktor model)
        {
            DoktorBLL doktorBusiness = new DoktorBLL();
            doktorBusiness.Add(model);
            return Ok();
        }
        [HttpPut]
        public IHttpActionResult Update(Doktor model)
        {
            DoktorBLL doktorBusiness = new DoktorBLL();
            doktorBusiness.Update(model);
            return Ok();
        }
        public IHttpActionResult Delete(int id)
        {
            DoktorBLL doktorBusiness = new DoktorBLL();
            doktorBusiness.Delete(id);
            return Ok();
        }

    }
}
