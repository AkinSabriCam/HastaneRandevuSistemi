using BusinessLogicLayer.BLLs;
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
    }
}
