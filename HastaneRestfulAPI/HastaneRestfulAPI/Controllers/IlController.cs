using BusinessLogicLayer.BLLs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HastaneRestfulAPI.Controllers
{
    public class IlController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            IlBLL ilBusiness = new IlBLL();
            var model = ilBusiness.Get().ToList();
            return Ok(model);
        }

        [HttpGet]
        public IHttpActionResult GetByIlId(int id)
        {
            IlBLL ilBusiness = new IlBLL();
            var model=ilBusiness.GetById(id);
            return Ok(model);
        }
    }
}
