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
    public class HastaneBolumlerController : ApiController
    {
        public IHttpActionResult Get(int id)
        {
            HastaneBolumBLL hasbolBusiness = new HastaneBolumBLL();
            var model = hasbolBusiness.Get(id);
            return Ok(model);

        }
        public IHttpActionResult Add(HastaneBolum model)
        {
            HastaneBolumBLL hasbolBusiness = new HastaneBolumBLL();
            hasbolBusiness.Add(model);
            return Ok();

        }
    }
}
